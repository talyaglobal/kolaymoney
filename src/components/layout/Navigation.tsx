/**
 * Reusable Navigation Component
 * Finansal Brutalizm design system
 */

import { Link } from 'wouter'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
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
}

const navItems: NavItem[] = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '#how-it-works', label: 'Nasıl Çalışır?', scrollTo: true },
  { href: '/sektorler', label: 'Sektörler' },
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

export function Navigation({ variant = 'default', onContactClick, onVideoClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
                {item.scrollTo ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`font-semibold hover:text-blue-600 transition-colors ${
                      item.highlight ? 'text-blue-600' : ''
                    }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 font-mono font-black border border-black">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link href={item.href}>
                    <a className={`font-semibold hover:text-blue-600 transition-colors relative inline-block ${
                      item.highlight ? 'text-blue-600' : ''
                    }`}>
                      {item.label}
                      {item.badge && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 font-mono font-black border border-black whitespace-nowrap">
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
                  {item.scrollTo ? (
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
