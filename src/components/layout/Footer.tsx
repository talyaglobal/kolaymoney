import { Link } from 'wouter'

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Company */}
          <div className="space-y-4">
            <Link href="/">
              <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-blue-600 flex items-center justify-center border-2 border-black">
                  <span className="text-white font-black text-2xl">₺</span>
                </div>
                <span className="font-black text-xl">KolayMoney.com</span>
              </a>
            </Link>
            <p className="mono-text text-sm text-gray-600">
              VDMK Alternatif Finansman Platformu
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="font-black text-lg mb-4">Hizmetler</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/hizmetler/on-basvuru-degerlendirme">
                  <a className="mono-text text-sm hover:text-blue-600 transition-colors">
                    Ön Başvuru & Değerlendirme
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/fonlara-referral">
                  <a className="mono-text text-sm hover:text-blue-600 transition-colors">
                    Fonlara Referral
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/originator-scoring">
                  <a className="mono-text text-sm hover:text-blue-600 transition-colors">
                    Originator Scoring
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Sektörler */}
          <div>
            <h3 className="font-black text-lg mb-4">Sektörler</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sektorler">
                  <a className="mono-text text-sm hover:text-blue-600 transition-colors">
                    Tüm Sektörler
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/neden-factoring-degil">
                  <a className="mono-text text-sm hover:text-blue-600 transition-colors">
                    Neden Factoring Değil?
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="mono-text text-sm hover:text-blue-600 transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim & Admin */}
          <div>
            <h3 className="font-black text-lg mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:info@kolaymoney.com"
                  className="mono-text text-sm hover:text-blue-600 transition-colors"
                >
                  info@kolaymoney.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+905551234567"
                  className="mono-text text-sm hover:text-blue-600 transition-colors"
                >
                  +90 555 123 45 67
                </a>
              </li>
              <li className="pt-2">
                <Link href="/admin/login">
                  <a className="inline-block px-3 py-1 border-2 border-black bg-gray-100 hover:bg-black hover:text-white transition-colors mono-text text-xs font-medium">
                    Admin Girişi
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t-2 border-black">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="mono-text text-sm text-gray-600">
              © 2026 KolayMoney.com - Tüm hakları saklıdır
            </p>
            <div className="flex gap-4">
              <Link href="/gizlilik-politikasi">
                <a className="mono-text text-xs text-gray-600 hover:text-black transition-colors">
                  Gizlilik Politikası
                </a>
              </Link>
              <Link href="/kullanim-kosullari">
                <a className="mono-text text-xs text-gray-600 hover:text-black transition-colors">
                  Kullanım Koşulları
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}