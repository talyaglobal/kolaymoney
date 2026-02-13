/**
 * Reusable Navigation Component
 * Finansal Brutalizm design system
 * Hizmetler: mega menu (hover + click, mouse üzerindeyken kapanmaz)
 */

import { Link } from 'wouter'
import { useState, useRef, useCallback } from 'react'
import { Menu, X, ChevronDown, FileCheck, Share2, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavigationProps {
  variant?: 'default' | 'minimal'
  onContactClick?: () => void
  onVideoClick?: () => void
}

interface NavItem {
  href: string
  label: string
  scrollTo?: boolean
  badge?: string
  highlight?: boolean
  dropdown?: {
    label: string
    href: string
    description: string
    icon?: 'file' | 'share' | 'chart'
  }[]
}

const navItems: NavItem[] = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '#how-it-works', label: 'Nasıl Çalışır?', scrollTo: true },
  { href: '/sektorler', label: 'Sektörler' },
  { 
    href: '#', 
    label: 'Hizmetler',
    dropdown: [
      {
        label: 'Ön Başvuru & Değerlendirme',
        href: '/hizmetler/on-basvuru-degerlendirme',
        description: 'Danışmanlar için kaynak sağlayıcı değerlendirme',
        icon: 'file'
      },
      {
        label: 'Fonlara Referral',
        href: '/hizmetler/fonlara-referral',
        description: 'VDMK fonları için nitelikli deal flow',
        icon: 'share'
      },
      {
        label: 'Originator Scoring',
        href: '/hizmetler/originator-scoring',
        description: 'Objektif kaynak sağlayıcı kredi skoru',
        icon: 'chart'
      }
    ]
  },
  { 
    href: '/neden-factoring-degil', 
    label: 'Neden Factoring Değil?',
    badge: 'KARŞILAŞTIR',
    highlight: true
  },
  { href: '/blog', label: 'Blog' },
  { href: '#video', label: 'Video İzle', scrollTo: true },
  { href: '#contact', label: 'İletişim', scrollTo: true }
]

const MEGA_MENU_HOVER_DELAY_MS = 200

export function Navigation({ variant = 'default', onContactClick, onVideoClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openServices = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setServicesOpen(true)
  }, [])

  const closeServicesDelayed = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setServicesOpen(false), MEGA_MENU_HOVER_DELAY_MS)
  }, [])

  const cancelCloseServices = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }, [])

  const handleNavClick = (item: NavItem) => {
    if (item.scrollTo && item.href.startsWith('#')) {
      const element = document.getElementById(item.href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    if (item.href === '#contact' && onContactClick) {
      onContactClick()
    }
    
    if (item.href === '#video' && onVideoClick) {
      onVideoClick()
    }
    
    setMobileMenuOpen(false)
  }

  return (
    <nav className="border-b-2 border-black bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-blue-600 flex items-center justify-center border-2 border-black">
                <span className="text-white font-black text-2xl">₺</span>
              </div>
              <span className="font-black text-xl">KolayMoney.com</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  // Mega menu for Hizmetler: click açar/kapatır, hover ile açılır, menü üzerindeyken kapanmaz
                  <div
                    className="relative pt-2 -mt-2 pb-0"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServicesDelayed}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      className="font-semibold hover:text-blue-600 transition-colors flex items-center gap-1 py-1"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {servicesOpen && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-1 z-50 min-w-[320px] sm:min-w-[480px]"
                        onMouseEnter={cancelCloseServices}
                        onMouseLeave={closeServicesDelayed}
                      >
                        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                          <div className="grid sm:grid-cols-3 divide-x-2 divide-black">
                            {item.dropdown.map((dropItem, dropIndex) => {
                              const Icon = dropItem.icon === 'share' ? Share2 : dropItem.icon === 'chart' ? BarChart3 : FileCheck
                              return (
                                <Link key={dropIndex} href={dropItem.href}>
                                  <a
                                    className="group block px-5 py-5 hover:bg-blue-600 hover:text-white transition-colors duration-150 border-b-0"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="shrink-0 w-10 h-10 border-2 border-black flex items-center justify-center bg-white group-hover:bg-blue-100 group-hover:border-blue-600 transition-colors">
                                        <Icon className="w-5 h-5" />
                                      </div>
                                      <div>
                                        <div className="font-black text-sm mb-1">{dropItem.label}</div>
                                        <div className="text-xs opacity-90 leading-snug">{dropItem.description}</div>
                                      </div>
                                    </div>
                                  </a>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : item.scrollTo ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`font-semibold hover:text-blue-600 transition-colors ${
                      item.highlight ? 'text-blue-600' : ''
                    } ${item.badge ? 'pr-20' : ''}`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="absolute top-0 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 font-mono font-black border border-black whitespace-nowrap">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link href={item.href}>
                    <a className={`font-semibold hover:text-blue-600 transition-colors relative inline-block ${
                      item.highlight ? 'text-blue-600' : ''
                    } ${item.badge ? 'pr-20' : ''}`}>
                      {item.label}
                      {item.badge && (
                        <span className="absolute top-0 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 font-mono font-black border border-black whitespace-nowrap">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </Link>
                )}
              </div>
            ))}
            
            {variant === 'default' && (
              <Button 
                onClick={() => {
                  if (onContactClick) {
                    onContactClick()
                  } else {
                    const contact = document.getElementById('contact')
                    if (contact) {
                      contact.scrollIntoView({ behavior: 'smooth' })
                    }
                  }
                }}
                className="bg-black text-white border-2 border-black hover:bg-blue-600 hover:border-blue-600 font-bold px-6"
              >
                İletişim
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border-2 border-black hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t-2 border-black pt-4">
            <div className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    // Mobile dropdown for Hizmetler
                    <div>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="w-full text-left font-semibold py-2 px-4 border-2 border-black hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <span className="text-xs">{servicesOpen ? '▲' : '▼'}</span>
                      </button>
                      {servicesOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((dropItem, dropIndex) => (
                            <Link key={dropIndex} href={dropItem.href}>
                              <a 
                                onClick={() => {
                                  setMobileMenuOpen(false)
                                  setServicesOpen(false)
                                }}
                                className="block py-2 px-4 border-2 border-black hover:bg-blue-600 hover:text-white transition-colors"
                              >
                                <div className="font-bold text-sm">{dropItem.label}</div>
                                <div className="text-xs opacity-70">{dropItem.description}</div>
                              </a>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : item.scrollTo ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`w-full text-left font-semibold py-2 px-4 border-2 border-black hover:bg-gray-100 transition-colors relative ${
                        item.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
                      }`}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 text-[10px] font-mono font-black">
                          [{item.badge}]
                        </span>
                      )}
                    </button>
                  ) : (
                    <Link href={item.href}>
                      <a 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block w-full text-left font-semibold py-2 px-4 border-2 border-black hover:bg-gray-100 transition-colors ${
                          item.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
                        }`}
                      >
                        {item.label}
                        {item.badge && (
                          <span className="ml-2 text-[10px] font-mono font-black">
                            [{item.badge}]
                          </span>
                        )}
                      </a>
                    </Link>
                  )}
                </div>
              ))}
              
              {variant === 'default' && (
                <Button 
                  onClick={() => {
                    if (onContactClick) {
                      onContactClick()
                    } else {
                      const contact = document.getElementById('contact')
                      if (contact) {
                        contact.scrollIntoView({ behavior: 'smooth' })
                      }
                    }
                    setMobileMenuOpen(false)
                  }}
                  className="bg-black text-white border-2 border-black hover:bg-blue-600 hover:border-blue-600 font-bold w-full"
                >
                  İletişim
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
