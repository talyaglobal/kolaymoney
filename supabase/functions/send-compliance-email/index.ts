/**
 * Send Compliance Email Edge Function
 * Sends email notifications using Resend API
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const ADMIN_EMAIL = 'hq@talya.vc'

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      applicationId,
      recipientEmail,
      companyName,
      score,
      isPassed,
      type
    } = await req.json()

    let subject = ''
    let htmlContent = ''

    switch (type) {
      case 'application_received':
        subject = `KolayMoney - Başvurunuz Alındı (Puan: ${Math.round(score)})`
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #000; color: #fff; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">KolayMoney.com</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <h2>Başvurunuz Alındı!</h2>
              <p>Sayın ${companyName},</p>
              <p>VDMK finansman başvurunuz başarıyla alınmıştır.</p>
              
              <div style="background: ${isPassed ? '#d4edda' : '#fff3cd'}; border: 4px solid ${isPassed ? '#28a745' : '#ffc107'}; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Uygunluk Puanınız</h3>
                <div style="font-size: 48px; font-weight: bold; text-align: center; margin: 10px 0;">
                  ${Math.round(score)}/100
                </div>
                <p style="text-align: center; font-weight: bold; margin: 0;">
                  ${isPassed ? '✓ UYGUN' : '⚠ EŞİK ALTINDA'}
                </p>
              </div>

              <h3>Sonraki Adımlar</h3>
              <ul>
                <li>Başvurunuz ${isPassed ? '1-2 iş günü' : '3-5 iş günü'} içinde değerlendirilecektir</li>
                <li>Eksik bilgi durumunda sizinle iletişime geçilecektir</li>
                <li>Onay sonrası detaylı finansman teklifi sunulacaktır</li>
              </ul>

              <p><strong>Başvuru ID:</strong> ${applicationId}</p>
              
              <p>Sorularınız için: <a href="mailto:hq@talya.vc">hq@talya.vc</a></p>
            </div>
            <div style="background: #000; color: #fff; padding: 15px; text-align: center; font-size: 12px;">
              <p style="margin: 0;">© 2026 KolayMoney.com - Tüm hakları saklıdır</p>
            </div>
          </div>
        `
        break

      case 'under_review':
        subject = 'KolayMoney - Başvurunuz İnceleniyor'
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Başvurunuz İnceleniyor</h2>
            <p>Sayın ${companyName},</p>
            <p>VDMK başvurunuz detaylı inceleme aşamasına alınmıştır.</p>
            <p>En kısa sürede size dönüş yapılacaktır.</p>
          </div>
        `
        break

      case 'approved':
        subject = 'KolayMoney - Başvurunuz Onaylandı! 🎉'
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #28a745;">Tebrikler! Başvurunuz Onaylandı</h2>
            <p>Sayın ${companyName},</p>
            <p>VDMK finansman başvurunuz onaylanmıştır.</p>
            <p>Detaylı teklif ve sözleşme için en kısa sürede sizinle iletişime geçeceğiz.</p>
          </div>
        `
        break

      case 'rejected':
        subject = 'KolayMoney - Başvuru Sonucu'
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Başvuru Sonucu</h2>
            <p>Sayın ${companyName},</p>
            <p>Başvurunuz değerlendirilmiş ancak şu an için onaylanamamıştır.</p>
            <p>Detaylı bilgi için bizimle iletişime geçebilirsiniz: <a href="mailto:hq@talya.vc">hq@talya.vc</a></p>
          </div>
        `
        break

      case 'more_info':
        subject = 'KolayMoney - Ek Bilgi Gerekli'
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Ek Bilgi Gerekli</h2>
            <p>Sayın ${companyName},</p>
            <p>Başvurunuzun değerlendirilmesi için ek bilgi ve belgelere ihtiyacımız var.</p>
            <p>Lütfen en kısa sürede bizimle iletişime geçiniz.</p>
          </div>
        `
        break
    }

    // Send to applicant
    const applicantResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'KolayMoney <onboarding@resend.dev>',
        to: [recipientEmail],
        subject: subject,
        html: htmlContent
      })
    })

    // Send notification to admin
    if (type === 'application_received') {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'KolayMoney <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: `Yeni VDMK Başvurusu - ${companyName} (${Math.round(score)} puan)`,
          html: `
            <h2>Yeni Başvuru</h2>
            <p><strong>Şirket:</strong> ${companyName}</p>
            <p><strong>E-posta:</strong> ${recipientEmail}</p>
            <p><strong>Puan:</strong> ${Math.round(score)}/100</p>
            <p><strong>Durum:</strong> ${isPassed ? 'UYGUN' : 'EŞİK ALTINDA'}</p>
            <p><strong>ID:</strong> ${applicationId}</p>
            <p><a href="https://kolaymoney.com/admin/compliance-applications">Başvuruyu İncele</a></p>
          `
        })
      })
    }

    if (!applicantResponse.ok) {
      const errorData = await applicantResponse.json()
      console.error('Resend API error:', errorData)
      throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`)
    }

    const applicantData = await applicantResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true,
        applicantEmailId: applicantData.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
