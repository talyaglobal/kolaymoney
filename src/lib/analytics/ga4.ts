/**
 * Google Analytics 4 Service
 * Handles all GA4 tracking events and initialization
 */

import ReactGA from 'react-ga4'

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID

interface EventParams {
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

/**
 * Initialize Google Analytics 4
 */
export function initGA4() {
  if (!GA4_MEASUREMENT_ID) {
    console.warn('GA4 Measurement ID not found. Analytics will not be tracked.')
    return false
  }

  try {
    ReactGA.initialize(GA4_MEASUREMENT_ID, {
      gaOptions: {
        anonymizeIp: true,
      },
      gtagOptions: {
        send_page_view: false, // We'll handle page views manually
      },
    })
    console.log('GA4 initialized successfully')
    return true
  } catch (error) {
    console.error('Failed to initialize GA4:', error)
    return false
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
  if (!GA4_MEASUREMENT_ID) return

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  })
}

/**
 * Track custom event
 */
export function trackEvent(eventName: string, params?: EventParams) {
  if (!GA4_MEASUREMENT_ID) return

  ReactGA.event(eventName, params)
}

/**
 * Application Events
 */
export const ApplicationEvents = {
  start: (sector?: string) => {
    trackEvent('application_start', {
      category: 'Application',
      sector: sector || 'unknown',
    })
  },

  stepComplete: (step: number, stepName: string) => {
    trackEvent('application_step_complete', {
      category: 'Application',
      step_number: step,
      step_name: stepName,
    })
  },

  submit: (sector: string, amount: number, score?: number) => {
    trackEvent('application_submit', {
      category: 'Application',
      sector,
      value: amount,
      compliance_score: score,
    })
  },

  abandon: (step: number) => {
    trackEvent('application_abandon', {
      category: 'Application',
      step_number: step,
    })
  },
}

/**
 * Sector Events
 */
export const SectorEvents = {
  view: (sector: string) => {
    trackEvent('sector_view', {
      category: 'Sector',
      sector,
    })
  },

  calculatorUse: (sector: string, amount: number) => {
    trackEvent('calculator_use', {
      category: 'Calculator',
      sector,
      value: amount,
    })
  },
}

/**
 * CTA Events
 */
export const CTAEvents = {
  click: (ctaName: string, location: string) => {
    trackEvent('cta_click', {
      category: 'CTA',
      cta_name: ctaName,
      location,
    })
  },

  whatsapp: (location: string) => {
    trackEvent('whatsapp_click', {
      category: 'Contact',
      location,
    })
  },

  email: (location: string) => {
    trackEvent('email_click', {
      category: 'Contact',
      location,
    })
  },

  phone: (location: string) => {
    trackEvent('phone_click', {
      category: 'Contact',
      location,
    })
  },
}

/**
 * Navigation Events
 */
export const NavigationEvents = {
  menuClick: (menuItem: string) => {
    trackEvent('menu_click', {
      category: 'Navigation',
      menu_item: menuItem,
    })
  },

  footerClick: (linkName: string) => {
    trackEvent('footer_click', {
      category: 'Navigation',
      link_name: linkName,
    })
  },

  breadcrumbClick: (path: string) => {
    trackEvent('breadcrumb_click', {
      category: 'Navigation',
      path,
    })
  },
}

/**
 * Content Events
 */
export const ContentEvents = {
  blogView: (postSlug: string, postTitle: string) => {
    trackEvent('blog_view', {
      category: 'Content',
      post_slug: postSlug,
      post_title: postTitle,
    })
  },

  faqExpand: (question: string) => {
    trackEvent('faq_expand', {
      category: 'Content',
      question,
    })
  },

  videoPlay: (videoTitle: string) => {
    trackEvent('video_play', {
      category: 'Content',
      video_title: videoTitle,
    })
  },
}

/**
 * Error Events
 */
export const ErrorEvents = {
  track: (errorMessage: string, errorLocation: string) => {
    trackEvent('error', {
      category: 'Error',
      error_message: errorMessage,
      error_location: errorLocation,
    })
  },

  formValidation: (fieldName: string, errorType: string) => {
    trackEvent('form_validation_error', {
      category: 'Form',
      field_name: fieldName,
      error_type: errorType,
    })
  },
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, any>) {
  if (!GA4_MEASUREMENT_ID) return

  ReactGA.set(properties)
}

/**
 * Set user ID (for logged-in users)
 */
export function setUserId(userId: string) {
  if (!GA4_MEASUREMENT_ID) return

  ReactGA.set({ userId })
}

/**
 * Track timing (performance metrics)
 */
export function trackTiming(
  category: string,
  variable: string,
  value: number,
  label?: string
) {
  if (!GA4_MEASUREMENT_ID) return

  trackEvent('timing_complete', {
    category,
    name: variable,
    value,
    label,
  })
}

/**
 * E-commerce tracking (for future use)
 */
export const EcommerceEvents = {
  viewItem: (itemId: string, itemName: string, value: number) => {
    trackEvent('view_item', {
      currency: 'TRY',
      value,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
        },
      ],
    })
  },

  beginCheckout: (value: number, items: any[]) => {
    trackEvent('begin_checkout', {
      currency: 'TRY',
      value,
      items,
    })
  },

  purchase: (transactionId: string, value: number, items: any[]) => {
    trackEvent('purchase', {
      currency: 'TRY',
      transaction_id: transactionId,
      value,
      items,
    })
  },
}
