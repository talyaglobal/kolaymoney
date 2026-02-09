import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, ShoppingCart, Truck, Factory, Wheat, Package } from "lucide-react";

/**
 * Design Philosophy: Finansal Brutalizm
 * - High contrast black/white/blue palette
 * - Modular grid system with mathematical precision
 * - Bold typography for authority and trust
 * - Minimal animations (slide-in only)
 */

export default function Home() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-black">
              <span className="text-white font-black text-xl">K</span>
            </div>
            <span className="font-black text-xl">KolayMoney.com</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#how-it-works" className="font-semibold hover:text-primary transition-colors">Nasıl Çalışır?</a>
            <a href="#sectors" className="font-semibold hover:text-primary transition-colors">Sektörler</a>
            <a href="#references" className="font-semibold hover:text-primary transition-colors">Referanslar</a>
            <Button 
              onClick={scrollToContact}
              className="bg-black text-white border-2 border-black hover:bg-primary hover:border-primary font-bold px-6"
            >
              İletişim
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative min-h-[600px] flex items-center border-b-2 border-black"
        style={{
          backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310419663029191411/dcxVlwUMFiXFwtvo.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/90"></div>
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-block bg-primary text-white px-4 py-2 mb-6 border-2 border-black">
              <span className="mono-text font-bold">VDMK İHRAÇLARI</span>
            </div>
            <h1 className="heading-1 mb-6">
              İşletmeniz için Hızlı ve Alternatif Finansman
            </h1>
            <p className="body-text text-gray-800 mb-8 max-w-2xl">
              Dönen varlıklarınızı, alacaklarınızı veya kira gelirlerinizi sermaye piyasalarında nakde çevirin. 
              <strong> OMG Capital Advisors</strong> stratejik ortaklığı ile güvenli ve hızlı finansmana erişin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={scrollToContact}
                className="bg-black text-white border-2 border-black hover:bg-primary hover:border-primary font-bold text-lg px-8 py-6"
              >
                Hemen Başvur <ArrowRight className="ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={scrollToHowItWorks}
                className="bg-white text-black border-2 border-black hover:bg-black hover:text-white font-bold text-lg px-8 py-6"
              >
                Daha Fazla Bilgi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* VDMK Nedir Section */}
      <section id="how-it-works" className="py-20 border-b-2 border-black">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">VDMK Nedir?</h2>
            <p className="body-text text-gray-700 max-w-3xl mx-auto">
              Varlığa Dayalı Menkul Kıymet (VDMK), alacaklarınızı veya düzenli nakit akışı sağlayan varlıklarınızı 
              menkul kıymet haline getirerek yatırımcılara sunar.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Kaynak Kuruluş", desc: "Alacaklarınızı belirleyin" },
              { step: "02", title: "Varlık Fonu", desc: "Alacaklarınızı fona devredin" },
              { step: "03", title: "İhraç", desc: "OMG Capital uzmanlığıyla VDMK'lar ihraç edilsin" },
              { step: "04", title: "Nakit Akışı", desc: "Anında finansmana ulaşın" }
            ].map((item, idx) => (
              <div key={idx} className="brutalist-card">
                <div className="mono-text text-4xl font-bold text-primary mb-4">{item.step}</div>
                <h3 className="heading-3 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hedef Sektörler Section */}
      <section id="sectors" className="py-20 bg-gray-50 border-b-2 border-black">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Hedef Sektörler</h2>
            <p className="body-text text-gray-700 max-w-3xl mx-auto">
              B2C ve B2B sektörlerinde vadeli satış yapan işletmelere özel finansman çözümleri sunuyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* B2C */}
            <div className="brutalist-card">
              <h3 className="heading-3 mb-6 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                B2C Sektörleri
              </h3>
              <ul className="space-y-3">
                {[
                  "Beyaz Eşya & Küçük Ev Aletleri (6-12 ay)",
                  "Elektronik (Telefon, Laptop, TV) (3-12 ay)",
                  "Mobilya & Dekorasyon (6-18 ay)",
                  "Otomotiv (Servis/Aksesuar) (6-18 ay)",
                  "Sağlık (Özel Hastane/Diş Estetik) (3-12 ay)",
                  "Eğitim (Özel Okul/Kurs) (6-12 ay)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* B2B */}
            <div className="brutalist-card">
              <h3 className="heading-3 mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                B2B Sektörleri
              </h3>
              <ul className="space-y-3">
                {[
                  "FMCG & Toptan Dağıtım (1-4 ay)",
                  "İnşaat Malzemeleri (2-6 ay)",
                  "Otomotiv Yedek Parça / Lastik (1-4 ay)",
                  "Makine-Ekipman & Endüstriyel Tedarik (2-6 ay)",
                  "Tarım Girdileri (Gübre, Yem, Zirai İlaç) (3-6 ay)",
                  "Lojistik / Taşımacılık (1-3 ay)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alacak Türleri */}
          <div className="brutalist-card bg-white">
            <h3 className="heading-3 mb-6">Alınacak Teminat ve Alacak Türleri</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: <Package className="w-8 h-8" />, title: "Fatura Alacağı", desc: "Vadeli satış faturaları" },
                { icon: <Factory className="w-8 h-8" />, title: "Senet / Çek", desc: "Ciro/temlik edilebilir alacaklar" },
                { icon: <ShoppingCart className="w-8 h-8" />, title: "POS Taksit Alacağı", desc: "Taksitli satış alacakları" },
                { icon: <Wheat className="w-8 h-8" />, title: "Sözleşmeye Bağlı", desc: "Eğitim, sağlık paketleri" }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-3 text-primary">{item.icon}</div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Başarı Hikayeleri (Referanslar) */}
      <section id="references" className="py-20 border-b-2 border-black">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Başarı Hikayeleri</h2>
            <p className="body-text text-gray-700 max-w-3xl mx-auto">
              OMG Capital Advisors tarafından yapılandırılmış VDMK projeleri
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Hepsiburada",
                amount: "500M+ TL",
                detail: "E-ticaret & BNPL Alacakları",
                rating: "TR A1 Notu"
              },
              {
                name: "Seyidoğlu Otomotiv",
                amount: "350M TL",
                detail: "Ticari Alacaklar",
                rating: "TurkRating A1"
              },
              {
                name: "Maygold Otomotiv",
                amount: "600M TL",
                detail: "Otomotiv Sektörü",
                rating: "10. İhraç"
              },
              {
                name: "Tarfin",
                amount: "120M TL",
                detail: "Tarım Tedarik Zinciri",
                rating: "860 Çiftçi"
              }
            ].map((ref, idx) => (
              <div key={idx} className="brutalist-card">
                <div className="mb-4">
                  <h3 className="heading-3 mb-2">{ref.name}</h3>
                  <div className="mono-text text-2xl font-bold text-primary">{ref.amount}</div>
                </div>
                <p className="text-gray-700 mb-2">{ref.detail}</p>
                <div className="inline-block bg-black text-white px-3 py-1 text-sm font-bold">
                  {ref.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır - 3 Adım */}
      <section className="py-20 bg-gray-50 border-b-2 border-black">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Nasıl Çalışır?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Ön Başvuru",
                desc: "Web sitesindeki kısa formu doldurun. Ekibimiz 24 saat içinde size geri dönüş yapacaktır."
              },
              {
                step: "2",
                title: "Değerlendirme & Sunum",
                desc: "Verilerinizi analiz edelim ve size özel Manus AI destekli sunumu hazırlayalım."
              },
              {
                step: "3",
                title: "Yapılandırma & İhraç",
                desc: "OMG Capital uzmanları ile VDMK yapınız oluşturulsun ve ihraç tamamlansın."
              }
            ].map((item, idx) => (
              <div key={idx} className="brutalist-card text-center">
                <div className="w-16 h-16 bg-primary border-2 border-black flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-black text-3xl">{item.step}</span>
                </div>
                <h3 className="heading-3 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stratejik Ortak */}
      <section className="py-12 bg-white border-b-2 border-black">
        <div className="container text-center">
          <p className="mono-text text-sm mb-4 text-gray-600">Stratejik İş Ortağımız</p>
          <h3 className="heading-2">OMG Capital Advisors</h3>
          <p className="body-text text-gray-700 mt-2 max-w-2xl mx-auto">
            70+ işlem tecrübesi | Uçtan uca süreç yönetimi | SPK uyumlu yapılar
          </p>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="py-20 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6 text-white">Finansmana Erişimin Kolay Yoluyla Tanışın</h2>
            <p className="body-text mb-8 text-white/90">
              Hemen başvurun, ekibimiz 24 saat içinde size özel bir değerlendirme sunumu hazırlasın.
            </p>

            <form className="grid md:grid-cols-2 gap-4 mb-8">
              <input 
                type="text" 
                placeholder="Firma Adı" 
                className="px-4 py-3 border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white"
              />
              <input 
                type="text" 
                placeholder="Yetkili Adı" 
                className="px-4 py-3 border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white"
              />
              <input 
                type="email" 
                placeholder="E-posta" 
                className="px-4 py-3 border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white"
              />
              <input 
                type="tel" 
                placeholder="Telefon" 
                className="px-4 py-3 border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white"
              />
              <select className="px-4 py-3 border-2 border-white bg-transparent text-white focus:outline-none focus:border-white md:col-span-2">
                <option value="" className="text-black">Ciro Aralığı Seçin</option>
                <option value="1" className="text-black">0-10 Milyon TL</option>
                <option value="2" className="text-black">10-50 Milyon TL</option>
                <option value="3" className="text-black">50-100 Milyon TL</option>
                <option value="4" className="text-black">100 Milyon TL+</option>
              </select>
              <Button 
                type="submit"
                size="lg"
                className="md:col-span-2 bg-black text-white border-2 border-white hover:bg-white hover:text-primary font-bold text-lg py-6"
              >
                Başvuruyu Gönder <ArrowRight className="ml-2" />
              </Button>
            </form>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white/90">
              <a href="mailto:info@talya.vc" className="mono-text hover:text-white transition-colors">
                info@talya.vc
              </a>
              <span className="hidden md:inline">|</span>
              <a href="tel:+905327943077" className="mono-text hover:text-white transition-colors">
                +90 532 794 30 77
              </a>
              <span className="hidden md:inline">|</span>
              <a href="https://www.kolaymoney.com" className="mono-text hover:text-white transition-colors">
                www.kolaymoney.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white">
        <div className="container text-center">
          <p className="mono-text text-sm">
            © 2026 KolayMoney.com - Tüm hakları saklıdır. | OMG Capital Advisors Stratejik Ortaklığı
          </p>
        </div>
      </footer>
    </div>
  );
}
