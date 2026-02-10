/**
 * Service Types
 * TypeScript interfaces for KolayMoney service pages
 */

export interface ServiceFeature {
  icon: string
  title: string
  description: string
}

export interface ServiceOutput {
  label: string
  detail: string
}

export interface ServiceProcess {
  step: number
  title: string
  description: string
  duration?: string
}

export interface ServiceBenefit {
  audience: string
  benefit: string
}

export interface PainPoint {
  icon: string
  title: string
  description: string
}

export interface ServiceHeroData {
  badge: string
  icon: string
  title: string
  subtitle: string
  description: string
  primaryCTA: string
  secondaryCTA: string
}

export interface ProblemStatementData {
  title: string
  pain_points: PainPoint[]
}

export interface AudienceData {
  icon: string
  title: string
  description: string
  benefits: string[]
}

export interface StatData {
  stat: string
  label: string
}

export interface ValuePropositionData {
  title: string
  points: StatData[]
  conclusion: string
}

export interface PricingTier {
  tier: string
  price: string
  includes: string[]
}

export interface PricingModelData {
  title: string
  model: string
  description: string
  tiers: PricingTier[]
  note?: string
}

export interface ScoringComponent {
  component: string
  weight: string
  measures: string[]
}

export interface ScoreGrade {
  grade: string
  range: string
  description: string
  recommendation: string
}

export interface ScoreOutputData {
  title: string
  grades: ScoreGrade[]
  additional_outputs: string[]
}
