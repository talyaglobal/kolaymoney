/**
 * Supabase Client Utilities for Compliance System
 */

import { createClient } from '@supabase/supabase-js'
import { ComplianceApplication, SectorQuestion } from '@/types/compliance'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Get active questions for a specific sector
 */
export async function getQuestionsBySector(sectorSlug: string): Promise<SectorQuestion[]> {
  const { data, error } = await supabase
    .from('sector_questions')
    .select('*')
    .eq('sector_slug', sectorSlug)
    .eq('is_active', true)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching questions:', error)
    throw error
  }

  // Map database columns to TypeScript types
  return (data || []).map(q => ({
    id: q.id,
    sectorSlug: q.sector_slug,
    questionText: q.question_text,
    questionType: q.question_type as any,
    options: q.options,
    weight: q.weight,
    category: q.category as any,
    isRequired: q.is_required,
    orderIndex: q.order_index,
    isActive: q.is_active,
    helpText: q.help_text,
    placeholder: q.placeholder,
    validationRules: q.validation_rules
  }))
}

/**
 * Submit a compliance application
 */
export async function submitComplianceApplication(
  applicationData: Partial<ComplianceApplication>
): Promise<{ id: string; score: number }> {
  const { data, error } = await supabase
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
    .select('id, compliance_score')
    .single()

  if (error) {
    console.error('Error submitting application:', error)
    throw error
  }

  return {
    id: data.id,
    score: data.compliance_score
  }
}

/**
 * Get applications with filters (admin only)
 */
export async function getApplications(filters?: {
  sector?: string
  status?: string
  minScore?: number
  maxScore?: number
  searchTerm?: string
  limit?: number
  offset?: number
}): Promise<{ applications: ComplianceApplication[]; total: number }> {
  let query = supabase
    .from('compliance_applications')
    .select('*', { count: 'exact' })

  // Apply filters
  if (filters?.sector) {
    query = query.eq('sector', filters.sector)
  }
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.minScore !== undefined) {
    query = query.gte('compliance_score', filters.minScore)
  }
  if (filters?.maxScore !== undefined) {
    query = query.lte('compliance_score', filters.maxScore)
  }
  if (filters?.searchTerm) {
    query = query.or(`company_name.ilike.%${filters.searchTerm}%,contact_email.ilike.%${filters.searchTerm}%,tax_number.ilike.%${filters.searchTerm}%`)
  }

  // Pagination
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  // Order by created_at desc
  query = query.order('created_at', { ascending: false })

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching applications:', error)
    throw error
  }

  // Map to TypeScript types
  const applications = (data || []).map(mapDatabaseToApplication)

  return {
    applications,
    total: count || 0
  }
}

/**
 * Get a single application by ID (admin only)
 */
export async function getApplicationById(id: string): Promise<ComplianceApplication | null> {
  const { data, error } = await supabase
    .from('compliance_applications')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching application:', error)
    throw error
  }

  return data ? mapDatabaseToApplication(data) : null
}

/**
 * Update application status (admin only)
 */
export async function updateApplicationStatus(
  id: string,
  status: string,
  reviewNotes?: string,
  rejectionReason?: string
): Promise<void> {
  const { error } = await supabase
    .from('compliance_applications')
    .update({
      status,
      review_notes: reviewNotes,
      rejection_reason: rejectionReason,
      reviewed_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating application status:', error)
    throw error
  }
}

/**
 * Get application statistics (admin only)
 */
export async function getApplicationStatistics(): Promise<{
  total: number
  pending: number
  approved: number
  rejected: number
  averageScore: number
  passRate: number
}> {
  const { data, error } = await supabase
    .from('compliance_applications')
    .select('status, compliance_score, is_passed')

  if (error) {
    console.error('Error fetching statistics:', error)
    throw error
  }

  const total = data?.length || 0
  const pending = data?.filter(a => a.status === 'pending').length || 0
  const approved = data?.filter(a => a.status === 'approved').length || 0
  const rejected = data?.filter(a => a.status === 'rejected').length || 0
  const averageScore = total > 0
    ? data.reduce((sum, a) => sum + (a.compliance_score || 0), 0) / total
    : 0
  const passRate = total > 0
    ? (data.filter(a => a.is_passed).length / total) * 100
    : 0

  return {
    total,
    pending,
    approved,
    rejected,
    averageScore: Math.round(averageScore * 10) / 10,
    passRate: Math.round(passRate * 10) / 10
  }
}

/**
 * Helper: Map database row to Application type
 */
function mapDatabaseToApplication(row: any): ComplianceApplication {
  return {
    id: row.id,
    companyName: row.company_name,
    taxNumber: row.tax_number,
    companyType: row.company_type,
    sector: row.sector,
    foundingYear: row.founding_year,
    contactName: row.contact_name,
    contactTitle: row.contact_title,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone,
    companyAddress: row.company_address,
    city: row.city,
    annualRevenue: row.annual_revenue,
    creditSalesRatio: row.credit_sales_ratio,
    averagePaymentTerm: row.average_payment_term,
    averageBasketSize: row.average_basket_size,
    monthlyReceivables: row.monthly_receivables,
    requestedAmount: row.requested_amount,
    requestedTerm: row.requested_term,
    purpose: row.purpose,
    questionResponses: row.question_responses,
    complianceScore: row.compliance_score,
    isPassed: row.is_passed,
    scoringDetails: row.scoring_details,
    status: row.status,
    rejectionReason: row.rejection_reason,
    reviewNotes: row.review_notes,
    reviewedBy: row.reviewed_by,
    reviewedAt: row.reviewed_at,
    documents: row.documents,
    source: row.source,
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}
