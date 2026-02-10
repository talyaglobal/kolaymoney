/**
 * Transition CTA Component
 * Yellow button linking to factoring transition guide
 */

import { Link } from 'wouter'

export function TransitionCTA() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Info Box */}
        <div className="bg-white text-black p-8 md:p-12 border-2 border-white">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Icon */}
            <div className="text-6xl shrink-0">📋</div>
            
            <div className="flex-1">
              {/* Heading */}
              <h3 className="text-2xl md:text-3xl font-black mb-4">
                Factoring Kullanıyorsanız
              </h3>
              
              {/* Description */}
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Factoring'den VDMK'ye geçiş yapmak istiyorsanız, 
                <span className="font-bold"> adım adım rehberimizi</span> inceleyin. 
                Hangi şirketler için uygun, geçiş süreci nasıl işler, 
                nelere dikkat edilmeli — hepsini detaylıca anlattık.
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-black text-lg">✓</span>
                  <span className="text-sm">4 adımlık geçiş süreci</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-black text-lg">✓</span>
                  <span className="text-sm">Factoring'in sınıra dayandığı noktalar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-black text-lg">✓</span>
                  <span className="text-sm">CFO'lar için geçiş stratejisi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-black text-lg">✓</span>
                  <span className="text-sm">Bilanço dışı finansmana geçiş yol haritası</span>
                </li>
              </ul>

              {/* CTA Button - YELLOW BACKGROUND + BLACK TEXT */}
              <Link href="/factoring-gecis-rehberi">
                <a className="
                  block w-full md:w-auto
                  bg-yellow-400 text-black 
                  px-10 py-5 
                  font-black text-xl 
                  border-4 border-black
                  hover:bg-yellow-300
                  hover:translate-x-2 hover:translate-y-2 
                  hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                  transition-all duration-200 
                  uppercase tracking-wider
                  text-center
                  group
                ">
                  <span className="flex items-center justify-center gap-3">
                    <span>Factoring'den Geçiş Rehberi</span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </span>
                </a>
              </Link>

              {/* Helper Text */}
              <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
                5 dakikalık okuma • CFO'lar için hazırlandı
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
