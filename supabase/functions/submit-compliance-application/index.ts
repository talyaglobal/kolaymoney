/**
 * Submit Compliance Application Edge Function
 * POST endpoint to submit and score application
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const applicationData = await req.json()

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Insert application
    const { data: application, error: insertError } = await supabaseClient
      .from('compliance_applications')
      .insert({
        company_name: applicationData.companyName,
        tax_number: applicationData.taxNumber,
        company_type: applicationData.companyType,
        sector: applicationData.sector,
        founding_year: applicationData.foundingYear,
        contact_name: applicationData.contactName,
        contact_title: applicationData.contactTitle,
        contact_email: applicationData.contactEmail,
        contact_phone: applicationData.contactPhone,
        company_address: applicationData.companyAddress,
        city: applicationData.city,
        annual_revenue: applicationData.annualRevenue,
        credit_sales_ratio: applicationData.creditSalesRatio,
        average_payment_term: applicationData.averagePaymentTerm,
        average_basket_size: applicationData.averageBasketSize,
        monthly_receivables: applicationData.monthlyReceivables,
        requested_amount: applicationData.requestedAmount,
        requested_term: applicationData.requestedTerm,
        purpose: applicationData.purpose,
        question_responses: applicationData.questionResponses,
        compliance_score: applicationData.complianceScore,
        is_passed: applicationData.isPassed,
        scoring_details: applicationData.scoringDetails,
        status: 'pending',
        source: applicationData.source,
        utm_source: applicationData.utmSource,
        utm_medium: applicationData.utmMedium,
        utm_campaign: applicationData.utmCampaign
      })
      .select('id, compliance_score, is_passed, contact_email, company_name')
      .single()

    if (insertError) {
      throw insertError
    }

    // Trigger email notification
    try {
      await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-compliance-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`
        },
        body: JSON.stringify({
          applicationId: application.id,
          recipientEmail: application.contact_email,
          companyName: application.company_name,
          score: application.compliance_score,
          isPassed: application.is_passed,
          type: 'application_received'
        })
      })
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the application submission if email fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        applicationId: application.id,
        score: application.compliance_score,
        isPassed: application.is_passed
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
