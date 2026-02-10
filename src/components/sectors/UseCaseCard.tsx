/**
 * Use Case Card Component
 * Tek bir finansman senaryosunu gösterir
 */

import { SectorUseCase, SectorSlug } from '@/types/sector'
import { useState } from 'react'

interface UseCaseCardProps {
  useCase: SectorUseCase
  index: number
  sectorSlug: SectorSlug
}

export function UseCaseCard({ useCase, index, sectorSlug }: UseCaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white border-4 border-black">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 border-b-4 border-black">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-bold mb-2">SENARYO #{index + 1}</div>
            <h3 className="text-2xl font-black">{useCase.title}</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-white text-blue-600 font-bold border-2 border-black hover:bg-gray-100 transition-colors"
          >
            {isExpanded ? 'Kapat' : 'Detay'}
          </button>
        </div>
      </div>

      {/* Company Profile */}
      <div className="p-6 border-b-2 border-gray-200">
        <div className="text-sm font-bold text-gray-600 mb-2">ŞİRKET PROFİLİ</div>
        <p className="text-base">{useCase.companyProfile}</p>
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <>
          {/* Situation */}
          <div className="p-6 border-b-2 border-gray-200 bg-gray-50">
            <div className="text-sm font-bold text-gray-600 mb-3">📋 MEVCUT DURUM</div>
            <ul className="space-y-2">
              {useCase.situation.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VDMK Solution */}
          <div className="p-6 border-b-2 border-gray-200 bg-green-50">
            <div className="text-sm font-bold text-gray-600 mb-3">✓ VDMK ÇÖZÜMÜ</div>
            <ul className="space-y-2">
              {useCase.vdmkSolution.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Financial Impact - Always Visible */}
      <div className="p-6">
        <div className="text-sm font-bold text-gray-600 mb-4">💰 FİNANSAL ETKİ</div>
        <div className="space-y-3">
          {useCase.financialImpact.map((impact, i) => (
            <div 
              key={i}
              className={`p-4 border-2 ${
                impact.highlight 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-300 bg-white'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm">{impact.label}</span>
                <span className={`text-xl font-black ${
                  impact.highlight ? 'text-blue-600' : 'text-black'
                }`}>
                  {impact.value}
                </span>
              </div>
              {impact.detail && (
                <div className="text-xs text-gray-600 mb-1">{impact.detail}</div>
              )}
              {impact.savingsVsBank && (
                <div className="text-xs text-green-600 font-bold">
                  Banka tasarrufu: {impact.savingsVsBank}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 bg-gray-100 border-t-4 border-black">
        <a 
          href={`/sektor/${sectorSlug}/senaryo/${useCase.id}/basvuru`}
          className="block w-full px-6 py-4 bg-blue-600 text-white text-center font-bold text-lg hover:bg-blue-700 transition-colors border-2 border-black"
        >
          📞 Bu Senaryo İçin Sizi Arayalım
        </a>
      </div>
    </div>
  )
}
