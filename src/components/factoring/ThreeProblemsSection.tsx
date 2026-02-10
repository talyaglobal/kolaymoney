/**
 * Three Problems Section
 * Black background with 3 key solutions
 */

export function ThreeProblemsSection() {
  const problems = [
    {
      number: '01',
      icon: '🚀',
      title: 'Limit Sorunu Yok',
      description: 'Finansman, yatırımcı talebiyle büyür.',
      detail: 'Factoring şirketinin bilanço limitleri yerine, sermaye piyasasının derinliğinden faydalanırsınız.'
    },
    {
      number: '02',
      icon: '📊',
      title: 'Bilanço Rahatlığı',
      description: 'Borçluluk oranları bozulmaz.',
      detail: 'VDMK işlemi gerçek satış niteliğinde olduğundan bilanço dışı kalır, kredi notunuzu etkilemez.'
    },
    {
      number: '03',
      icon: '🎯',
      title: 'Stratejik Finansman',
      description: 'Günlük nakit çözümü değil, sürdürülebilir yapı.',
      detail: 'Tek seferlik değil, tekrarlanabilir finansman altyapısı kurarsınız.'
    }
  ]

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-600 text-white px-6 py-2 mb-4 border-2 border-blue-600">
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              ÇÖZÜM
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Neden Factoring'e Alternatif?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Kolaymoney modeli, factoring'in çözemediği üç temel problemi ortadan kaldırır:
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-white text-black border-2 border-white p-8 hover:translate-y-[-8px] hover:shadow-[0px_8px_0px_0px_rgba(0,255,255,1)] transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="bg-blue-600 text-white font-mono text-2xl font-black px-4 py-2 inline-block mb-4 border-2 border-black">
                {problem.number}
              </div>
              
              {/* Icon */}
              <div className="text-5xl mb-4">{problem.icon}</div>
              
              {/* Title */}
              <h3 className="text-2xl font-black mb-3">{problem.title}</h3>
              
              {/* Description */}
              <p className="text-xl font-bold text-blue-600 mb-4">
                {problem.description}
              </p>
              
              {/* Detail */}
              <p className="text-gray-600 leading-relaxed">
                {problem.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
