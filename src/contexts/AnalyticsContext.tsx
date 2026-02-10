/**
 * Analytics Context
 * Provides analytics tracking throughout the application
 */

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useLocation } from 'wouter'
import {
  initGA4,
  trackPageView,
  ApplicationEvents,
  SectorEvents,
  CTAEvents,
  NavigationEvents,
  ContentEvents,
  ErrorEvents,
  setUserProperties,
  setUserId,
} from '@/lib/analytics/ga4'

interface AnalyticsContextType {
  // Application tracking
  trackApplicationStart: (sector?: string) => void
  trackApplicationStep: (step: number, stepName: string) => void
  trackApplicationSubmit: (sector: string, amount: number, score?: number) => void
  trackApplicationAbandon: (step: number) => void

  // Sector tracking
  trackSectorView: (sector: string) => void
  trackCalculatorUse: (sector: string, amount: number) => void

  // CTA tracking
  trackCTAClick: (ctaName: string, location: string) => void
  trackWhatsAppClick: (location: string) => void
  trackEmailClick: (location: string) => void
  trackPhoneClick: (location: string) => void

  // Navigation tracking
  trackMenuClick: (menuItem: string) => void
  trackFooterClick: (linkName: string) => void
  trackBreadcrumbClick: (path: string) => void

  // Content tracking
  trackBlogView: (postSlug: string, postTitle: string) => void
  trackFAQExpand: (question: string) => void
  trackVideoPlay: (videoTitle: string) => void

  // Error tracking
  trackError: (errorMessage: string, errorLocation: string) => void
  trackFormValidationError: (fieldName: string, errorType: string) => void

  // User properties
  setUserProps: (properties: Record<string, any>) => void
  identifyUser: (userId: string) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [location] = useLocation()

  // Initialize GA4 on mount
  useEffect(() => {
    const initialized = initGA4()
    if (initialized) {
      // Track initial page view
      trackPageView(location)
    }
  }, [])

  // Track page views on route change
  useEffect(() => {
    trackPageView(location)
  }, [location])

  const value: AnalyticsContextType = {
    // Application tracking
    trackApplicationStart: ApplicationEvents.start,
    trackApplicationStep: ApplicationEvents.stepComplete,
    trackApplicationSubmit: ApplicationEvents.submit,
    trackApplicationAbandon: ApplicationEvents.abandon,

    // Sector tracking
    trackSectorView: SectorEvents.view,
    trackCalculatorUse: SectorEvents.calculatorUse,

    // CTA tracking
    trackCTAClick: CTAEvents.click,
    trackWhatsAppClick: CTAEvents.whatsapp,
    trackEmailClick: CTAEvents.email,
    trackPhoneClick: CTAEvents.phone,

    // Navigation tracking
    trackMenuClick: NavigationEvents.menuClick,
    trackFooterClick: NavigationEvents.footerClick,
    trackBreadcrumbClick: NavigationEvents.breadcrumbClick,

    // Content tracking
    trackBlogView: ContentEvents.blogView,
    trackFAQExpand: ContentEvents.faqExpand,
    trackVideoPlay: ContentEvents.videoPlay,

    // Error tracking
    trackError: ErrorEvents.track,
    trackFormValidationError: ErrorEvents.formValidation,

    // User properties
    setUserProps: setUserProperties,
    identifyUser: setUserId,
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

/**
 * Hook to use analytics throughout the app
 */
export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    // Return no-op functions if analytics is not initialized
    return {
      trackApplicationStart: () => {},
      trackApplicationStep: () => {},
      trackApplicationSubmit: () => {},
      trackApplicationAbandon: () => {},
      trackSectorView: () => {},
      trackCalculatorUse: () => {},
      trackCTAClick: () => {},
      trackWhatsAppClick: () => {},
      trackEmailClick: () => {},
      trackPhoneClick: () => {},
      trackMenuClick: () => {},
      trackFooterClick: () => {},
      trackBreadcrumbClick: () => {},
      trackBlogView: () => {},
      trackFAQExpand: () => {},
      trackVideoPlay: () => {},
      trackError: () => {},
      trackFormValidationError: () => {},
      setUserProps: () => {},
      identifyUser: () => {},
    } as AnalyticsContextType
  }
  return context
}
