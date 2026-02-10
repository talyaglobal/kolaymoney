import { MessageCircle } from 'lucide-react'
import { useAnalytics } from '@/contexts/AnalyticsContext'

export function WhatsAppButton() {
  const analytics = useAnalytics()
  const phoneNumber = '905558681634' // +90 555 868 16 34
  const message = 'Merhaba, VDMK finansman hakkında bilgi almak istiyorum.'
  
  const handleClick = () => {
    analytics.trackWhatsAppClick(window.location.pathname)
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 group"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="w-8 h-8 animate-pulse group-hover:animate-none" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-black text-white text-sm mono-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-2 border-black">
        WhatsApp ile yazın
        <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
      </div>
    </button>
  )
}
