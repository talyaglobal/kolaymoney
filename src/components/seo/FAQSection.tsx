/**
 * FAQ Section Component
 * Accordion-style FAQ with structured data for rich snippets
 */

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { generateFAQSchema, injectStructuredData } from '@/lib/seo/structuredData'

interface FAQ {
  question: string
  answer: string
}

const FAQS: FAQ[] = [
  {
    question: 'VDMK nedir?',
    answer: 'VDMK (Varlığa Dayalı Menkul Kıymet), işletmelerin dönen varlıklarını, alacaklarını veya gelir getiren varlıklarını sermaye piyasalarında menkul kıymetleştirerek nakde çevirme yöntemidir. Geleneksel banka kredilerine alternatif, hızlı ve esnek bir finansman çözümüdür.'
  },
  {
    question: 'VDMK başvurusu için hangi belgeler gerekir?',
    answer: 'Temel olarak şirket bilgileri (vergi levhası, ticaret sicil gazetesi), son 2 yıllık finansal tablolar, alacak listesi, stok raporu ve talep edilen finansman tutarı bilgisi gerekmektedir. Detaylı liste başvuru sürecinde size iletilecektir.'
  },
  {
    question: 'VDMK onay süreci ne kadar sürer?',
    answer: 'Ön değerlendirme 3-5 iş günü içinde tamamlanır. Onay sonrası ihraç süreci 1-2 hafta içinde gerçekleşir. Bu süre, geleneksel banka kredilerine göre çok daha hızlıdır.'
  },
  {
    question: 'Minimum ve maksimum VDMK tutarı nedir?',
    answer: 'Minimum 500.000 TL\'den başlayan VDMK ihraçları yapılabilir. Maksimum tutar işletmenizin varlık büyüklüğüne ve sektörüne göre değişir, genellikle 50-100 milyon TL\'ye kadar çıkabilir.'
  },
  {
    question: 'Hangi sektörler VDMK\'dan yararlanabilir?',
    answer: 'Beyaz eşya, elektronik, mobilya, otomotiv, FMCG, inşaat, lojistik, tarım, makine-ekipman gibi birçok sektör VDMK finansmanından yararlanabilir. Her sektör için özelleştirilmiş çözümler sunuyoruz.'
  },
  {
    question: 'VDMK maliyeti nasıl hesaplanır?',
    answer: 'VDMK maliyeti, işletmenizin risk profili, varlık kalitesi, finansman tutarı ve vadesi gibi faktörlere göre belirlenir. Genellikle banka kredilerine göre daha rekabetçi oranlar sunulur. Detaylı teklif için başvuru yapmanız gerekmektedir.'
  },
  {
    question: 'VDMK ile banka kredisi arasındaki fark nedir?',
    answer: 'VDMK, banka kredisine göre daha hızlı onay süreci, daha esnek yapılandırma, daha az teminat gereksinimi ve genellikle daha uygun maliyetler sunar. Ayrıca sermaye piyasası aracı olduğu için bilanço optimizasyonu sağlar.'
  },
  {
    question: 'VDMK geri ödeme planı nasıl çalışır?',
    answer: 'Geri ödeme planı, işletmenizin nakit akışına göre özelleştirilebilir. Genellikle 3-24 ay arası vadelerle çalışılır. Aylık, üç aylık veya altı aylık ödeme planları oluşturulabilir.'
  },
  {
    question: 'VDMK başvurusu reddedilirse ne olur?',
    answer: 'Başvurunuz değerlendirilir ve ret durumunda gerekçesi size iletilir. Alternatif finansman çözümleri veya eksikliklerin giderilmesi için öneriler sunulur. Ayrıca, belirli bir süre sonra tekrar başvuru yapabilirsiniz.'
  },
  {
    question: 'VDMK için teminat gerekli mi?',
    answer: 'VDMK\'da teminat, menkul kıymetleştirilen varlıkların kendisidir (alacaklar, stoklar, gelir akışları). Ek teminat gereksinimi, işletmenizin risk profiline göre değişebilir ancak genellikle banka kredilerine göre çok daha düşüktür.'
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const analytics = useAnalytics()

  // Add FAQ structured data
  useEffect(() => {
    injectStructuredData(generateFAQSchema(FAQS), 'faq-schema')
  }, [])

  const toggleFAQ = (index: number) => {
    const newIndex = openIndex === index ? null : index
    setOpenIndex(newIndex)
    
    if (newIndex !== null) {
      analytics.trackFAQExpand(FAQS[index].question)
    }
  }

  return (
    <section className="py-20 bg-gray-50 border-t-4 border-b-4 border-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            VDMK finansmanı hakkında merak ettikleriniz
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className="border-4 border-black bg-white"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-black text-lg pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-6 h-6 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 pb-6 border-t-4 border-black">
                  <p className="text-gray-700 leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Başka sorularınız mı var?
          </p>
          <a 
            href="https://wa.me/905558681634?text=Merhaba,%20VDMK%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackWhatsAppClick('FAQ Section')}
            className="inline-block px-8 py-4 bg-[#25D366] text-white border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all font-bold"
          >
            WhatsApp ile Sorun
          </a>
        </div>
      </div>
    </section>
  )
}
