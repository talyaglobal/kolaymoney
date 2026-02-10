/**
 * Bank Limit Problem Section
 * Highlights VDMK advantage when bank limits are exhausted
 */

import { FINANCIAL_DATA } from '@/lib/config/financialData'

export function BankLimitProblem() {
  return (
    <section className="py-20 bg-red-600">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Problem Statement */}
        <div className="text-center mb-12">
          <div className="inline-block bg-black text-white px-6 py-3 mb-6 border-4 border-white">
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              ⚠️ BÜYÜK SORUN
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            "Banka Limitim Doldu"
          </h2>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto">
            Türkiye'de KOBİ'lerin %73'ü banka kredi limitlerinin dolması nedeniyle 
            büyüme fırsatlarını kaçırıyor.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border-4 border-black p-8">
            <div className="text-5xl mb-4">🚫</div>
            <h3 className="text-2xl font-black mb-3">Limit Tıkanması</h3>
            <p className="text-gray-700">
              Mevcut banka kredileri doldu, yeni kredi alamıyorsunuz. 
              Büyüme duruyor, fırsatlar kaçıyor.
            </p>
          </div>

          <div className="bg-white border-4 border-black p-8">
            <div className="text-5xl mb-4">📉</div>
            <h3 className="text-2xl font-black mb-3">Bilanço Baskısı</h3>
            <p className="text-gray-700">
              Daha fazla banka kredisi = daha fazla borç. 
              Finansal oranlarınız bozuluyor, yeni kredi alamıyorsunuz.
            </p>
          </div>

          <div className="bg-white border-4 border-black p-8">
            <div className="text-5xl mb-4">⏱️</div>
            <h3 className="text-2xl font-black mb-3">Zaman Kaybı</h3>
            <p className="text-gray-700">
              Yeni banka bulmak, başvuru yapmak, onay beklemek... 
              2-3 ay geçiyor, fırsat gidiyor.
            </p>
          </div>
        </div>

        {/* Solution */}
        <div className="bg-black text-white p-12 border-4 border-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-blue-600 text-white px-6 py-2 mb-4 border-2 border-white">
                <span className="font-mono text-sm font-black uppercase tracking-wider">
                  ✅ ÇÖZÜM
                </span>
              </div>
              <h3 className="text-4xl font-black mb-4">
                VDMK: Banka Limitlerinden Bağımsız Finansman
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Why VDMK Works */}
              <div className="space-y-4">
                <h4 className="text-xl font-black text-blue-400 mb-4">
                  Neden VDMK Çalışır?
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <div className="font-bold">Bilanço Dışı</div>
                      <div className="text-sm text-gray-300">
                        Borç olarak görünmez, finansal oranlarınızı bozmaz
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <div className="font-bold">Sermaye Piyasası</div>
                      <div className="text-sm text-gray-300">
                        Banka değil, yatırımcılardan finansman
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <div className="font-bold">Ölçeklenebilir</div>
                      <div className="text-sm text-gray-300">
                        Alacak portföyünüz büyüdükçe limit artar
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <div className="font-bold">Hızlı</div>
                      <div className="text-sm text-gray-300">
                        7 gün içinde onay ve finansman
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Real Example */}
              <div className="bg-blue-600 p-6 border-2 border-white">
                <h4 className="text-xl font-black mb-4">Gerçek Örnek</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-b border-white/20 pb-2">
                    <div className="text-white/70">Şirket:</div>
                    <div className="font-bold">Elektronik Perakende Zinciri</div>
                  </div>
                  <div className="border-b border-white/20 pb-2">
                    <div className="text-white/70">Durum:</div>
                    <div className="font-bold">3 bankadan toplam 50M TL limit - DOLU</div>
                  </div>
                  <div className="border-b border-white/20 pb-2">
                    <div className="text-white/70">İhtiyaç:</div>
                    <div className="font-bold">Kampanya için 30M TL ek finansman</div>
                  </div>
                  <div className="border-b border-white/20 pb-2">
                    <div className="text-white/70">VDMK Çözümü:</div>
                    <div className="font-bold">126M TL taksit alacağı → VDMK</div>
                  </div>
                  <div className="bg-white text-blue-600 p-3 font-black text-lg text-center mt-4">
                    Banka limitlerine dokunmadan büyüdü! 🚀
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t-2 border-white/20">
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">
                  {FINANCIAL_DATA.rates.vdmk.marketSize.value}B TL
                </div>
                <div className="text-sm text-gray-300">
                  VDMK Piyasa Büyüklüğü
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">
                  7 GÜN
                </div>
                <div className="text-sm text-gray-300">
                  Ortalama Onay Süresi
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">
                  %{FINANCIAL_DATA.rates.vdmk.discountRate.value}
                </div>
                <div className="text-sm text-gray-300">
                  Yıllık Maliyet
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <a
                href="/basvuru-yeni"
                className="inline-block bg-blue-600 text-white px-12 py-5 font-black text-xl border-4 border-white hover:bg-blue-700 transition-colors uppercase"
              >
                Banka Limiti Doldu mu? Hemen Başvur →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-sm">
            * Banka kredileriniz devam eder, VDMK ek bir finansman kanalıdır
          </p>
        </div>
      </div>
    </section>
  )
}
