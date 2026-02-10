import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ApplicationEmailData {
  to: string
  company_name: string
  contact_person: string
  application_id: string
  financing_amount: number
  sector: string
  phone: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, company_name, contact_person, application_id, financing_amount, sector, phone }: ApplicationEmailData = await req.json()

    // Send email to applicant
    const applicantEmail = await resend.emails.send({
      from: 'KolayMoney <onboarding@resend.dev>',
      to: [to],
      subject: '✅ VDMK Başvurunuz Alındı - KolayMoney.com',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #000; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0047FF; color: white; padding: 30px; text-align: center; border: 2px solid #000; }
            .content { background: white; padding: 30px; border: 2px solid #000; border-top: none; }
            .info-box { background: #f5f5f5; padding: 20px; border: 2px solid #000; margin: 20px 0; }
            .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
            .info-label { font-weight: 600; color: #666; }
            .info-value { font-weight: 700; color: #000; }
            .cta-button { display: inline-block; background: #0047FF; color: white; padding: 15px 30px; text-decoration: none; border: 2px solid #000; margin: 20px 0; font-weight: 700; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">📞 Bilgileriniz Alındı!</h1>
            </div>
            <div class="content">
              <p>Sayın <strong>${contact_person}</strong>,</p>
              
              <p>VDMK başvurunuz başarıyla kaydedildi. OMG Capital Advisors ekibimiz en kısa sürede sizi arayarak finansman detaylarını görüşecektir.</p>
              
              <div class="info-box">
                <h3 style="margin-top: 0; color: #0047FF;">📋 Başvuru Detayları</h3>
                <div class="info-row">
                  <span class="info-label">Başvuru No:</span>
                  <span class="info-value">${application_id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Şirket:</span>
                  <span class="info-value">${company_name}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Sektör:</span>
                  <span class="info-value">${sector}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Finansman Tutarı:</span>
                  <span class="info-value">${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(financing_amount)}</span>
                </div>
              </div>
              
              <div style="background: #FFF9E6; border: 2px solid #000; padding: 20px; margin: 20px 0;">
                <h4 style="margin-top: 0;">📞 Sonraki Adımlar:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Ekibimiz 1-2 iş günü içinde sizi arayacak</li>
                  <li>Finansman detayları görüşülecek</li>
                  <li>Gerekli belgeler talep edilecek</li>
                </ul>
              </div>
              
              <p style="margin-top: 30px;">
                <strong>İletişim:</strong><br>
                📞 Telefon: <a href="tel:+905558681634" style="color: #0047FF;">+90 555 868 16 34</a><br>
                📧 E-posta: <a href="mailto:hq@talya.vc" style="color: #0047FF;">hq@talya.vc</a><br>
                🌐 Web: <a href="https://www.kolaymoney.com" style="color: #0047FF;">www.kolaymoney.com</a>
              </p>
            </div>
            <div class="footer">
              <p>© 2026 KolayMoney.com - OMG Capital Advisors Stratejik Ortaklığı</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: 'KolayMoney <onboarding@resend.dev>',
      to: ['hq@talya.vc'],
      subject: `🔔 Yeni VDMK Başvurusu - ${company_name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #000; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: white; padding: 30px; text-align: center; border: 2px solid #000; }
            .content { background: white; padding: 30px; border: 2px solid #000; border-top: none; }
            .info-box { background: #f5f5f5; padding: 20px; border: 2px solid #000; margin: 20px 0; }
            .info-row { padding: 10px 0; border-bottom: 1px solid #ddd; }
            .info-label { font-weight: 600; color: #666; display: inline-block; width: 150px; }
            .info-value { font-weight: 700; color: #000; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🔔 Yeni VDMK Başvurusu</h1>
            </div>
            <div class="content">
              <div class="info-box">
                <div class="info-row">
                  <span class="info-label">Başvuru No:</span>
                  <span class="info-value">${application_id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Şirket Adı:</span>
                  <span class="info-value">${company_name}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Yetkili:</span>
                  <span class="info-value">${contact_person}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">E-posta:</span>
                  <span class="info-value">${to}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Telefon:</span>
                  <span class="info-value">${phone}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Sektör:</span>
                  <span class="info-value">${sector}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Finansman Tutarı:</span>
                  <span class="info-value" style="color: #0047FF; font-size: 18px;">${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(financing_amount)}</span>
                </div>
              </div>
              
              <p style="margin-top: 30px;">
                <a href="https://kolaymoney.com/admin/applications/${application_id}" style="display: inline-block; background: #0047FF; color: white; padding: 15px 30px; text-decoration: none; border: 2px solid #000; font-weight: 700;">
                  Başvuruyu İncele →
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        applicantEmailId: applicantEmail.data?.id,
        adminEmailId: adminEmail.data?.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
