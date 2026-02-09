/**
 * Admin Panel - Finansal Veri Yönetimi
 * Merkezi finansal verileri görüntüleme ve güncelleme
 */

import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { FINANCIAL_DATA, formatDate, isDataStale } from '@/lib/config/financialData'
import { Button } from '@/components/ui/button'
import { AlertCircle, Calendar, Database, TrendingUp, DollarSign, Percent } from 'lucide-react'

export function FinancialDataManager() {
  const [editMode, setEditMode] = useState(false)

  // Veri kategorileri
  const categories = [
    {
      id: 'currencies',
      title: 'Döviz Kurları',
      icon: <DollarSign className="w-5 h-5" />,
      data: FINANCIAL_DATA.rates.currencies
    },
    {
      id: 'interestRates',
      title: 'Faiz Oranları',
      icon: <Percent className="w-5 h-5" />,
      data: FINANCIAL_DATA.rates.interestRates
    },
    {
      id: 'vdmk',
      title: 'VDMK Oranları',
      icon: <TrendingUp className="w-5 h-5" />,
      data: FINANCIAL_DATA.rates.vdmk
    },
    {
      id: 'factoring',
      title: 'Faktoring Oranları',
      icon: <Database className="w-5 h-5" />,
      data: FINANCIAL_DATA.rates.factoring
    },
    {
      id: 'supplierDiscounts',
      title: 'Tedarikçi İskontoları',
      icon: <Percent className="w-5 h-5" />,
      data: FINANCIAL_DATA.rates.supplierDiscounts
    },
    {
      id: 'collectionRates',
      title: 'Sektörel Tahsilat Oranları',
      icon: <TrendingUp className="w-5 h-5" />,
      data: FINANCIAL_DATA.rates.collectionRates
    }
  ]

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-black mb-2">Finansal Veri Yönetimi</h1>
              <p className="text-gray-600">
                Merkezi finansal verileri görüntüle ve güncelle
              </p>
            </div>
            <Button
              onClick={() => setEditMode(!editMode)}
              className={`${
                editMode 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-bold border-2 border-black`}
            >
              {editMode ? 'İptal Et' : 'Düzenleme Modu'}
            </Button>
          </div>

          {/* Metadata */}
          <div className="bg-blue-50 border-4 border-black p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm font-bold text-gray-600 mb-1">
                  SON GÜNCELLEME
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-bold">
                    {formatDate(FINANCIAL_DATA.metadata.lastUpdated)}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-600 mb-1">
                  VERSİYON
                </div>
                <div className="font-bold">{FINANCIAL_DATA.metadata.version}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-600 mb-1">
                  VERİ KAYNAĞI
                </div>
                <div className="font-bold">{FINANCIAL_DATA.metadata.dataSource}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Mode Warning */}
        {editMode && (
          <div className="mb-6 bg-yellow-50 border-4 border-yellow-600 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-yellow-900 mb-1">
                  ⚠️ Düzenleme Modu Aktif
                </div>
                <p className="text-sm text-yellow-800">
                  Bu modda yaptığınız değişiklikler <strong>demo amaçlıdır</strong>. 
                  Gerçek güncelleme için <code>src/lib/config/financialData.ts</code> dosyasını düzenleyin.
                  Değişiklikler sayfa yenilendiğinde kaybolacaktır.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Data Categories */}
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white border-4 border-black">
              {/* Category Header */}
              <div className="bg-gray-900 text-white p-4 border-b-4 border-black">
                <div className="flex items-center gap-3">
                  {category.icon}
                  <h2 className="text-xl font-black">{category.title}</h2>
                </div>
              </div>

              {/* Data Grid */}
              <div className="p-6">
                <div className="grid gap-4">
                  {Object.entries(category.data).map(([key, value]) => {
                    const isStale = isDataStale(value.date)
                    
                    return (
                      <div
                        key={key}
                        className={`p-4 border-2 ${
                          isStale 
                            ? 'border-red-600 bg-red-50' 
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        <div className="grid md:grid-cols-5 gap-4 items-center">
                          {/* Key Name */}
                          <div className="md:col-span-1">
                            <div className="font-bold text-sm text-gray-600 mb-1">
                              {key.toUpperCase()}
                            </div>
                            {value.note && (
                              <div className="text-xs text-gray-500">
                                {value.note}
                              </div>
                            )}
                          </div>

                          {/* Value */}
                          <div className="md:col-span-1">
                            <div className="text-sm font-bold text-gray-600 mb-1">
                              DEĞER
                            </div>
                            {editMode ? (
                              <input
                                type="number"
                                defaultValue={value.value}
                                step="0.01"
                                className="w-full px-3 py-2 border-2 border-black font-bold text-lg"
                              />
                            ) : (
                              <div className="text-2xl font-black text-blue-600">
                                {typeof value.value === 'number' 
                                  ? value.value.toLocaleString('tr-TR', {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })
                                  : value.value}
                              </div>
                            )}
                          </div>

                          {/* Date */}
                          <div className="md:col-span-1">
                            <div className="text-sm font-bold text-gray-600 mb-1">
                              TARİH
                            </div>
                            {editMode ? (
                              <input
                                type="date"
                                defaultValue={value.date}
                                className="w-full px-3 py-2 border-2 border-black font-bold"
                              />
                            ) : (
                              <div className="font-bold">
                                {formatDate(value.date)}
                                {isStale && (
                                  <span className="ml-2 text-red-600 text-xs">
                                    ⚠️ ESKİ
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Source */}
                          <div className="md:col-span-1">
                            <div className="text-sm font-bold text-gray-600 mb-1">
                              KAYNAK
                            </div>
                            {editMode ? (
                              <input
                                type="text"
                                defaultValue={value.source || ''}
                                placeholder="Kaynak"
                                className="w-full px-3 py-2 border-2 border-black font-bold"
                              />
                            ) : (
                              <div className="font-bold text-sm">
                                {value.source || '-'}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          {editMode && (
                            <div className="md:col-span-1">
                              <Button
                                size="sm"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold border-2 border-black"
                              >
                                Kaydet
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gray-50 border-4 border-black p-6">
          <h3 className="text-xl font-black mb-4">💡 Nasıl Güncellenir?</h3>
          <div className="space-y-3 text-sm">
            <p>
              <strong>1. Dosya Düzenleme (Önerilen):</strong> 
              <code className="ml-2 px-2 py-1 bg-gray-200 border border-gray-400">
                src/lib/config/financialData.ts
              </code> dosyasını düzenleyin.
            </p>
            <p>
              <strong>2. Otomatik Güncelleme:</strong> Tüm sektör sayfaları ve hesap makineleri 
              otomatik olarak yeni verileri kullanır.
            </p>
            <p>
              <strong>3. Tarih Takibi:</strong> Her veri için <code>date</code> ve <code>source</code> 
              bilgisi ekleyin. 30 günden eski veriler otomatik olarak işaretlenir.
            </p>
            <p>
              <strong>4. Versiyon:</strong> Büyük değişikliklerde <code>metadata.version</code> 
              değerini artırın.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border-4 border-black p-4">
            <div className="text-3xl font-black mb-2">
              {Object.keys(FINANCIAL_DATA.rates.currencies).length}
            </div>
            <div className="text-sm font-bold text-gray-600">Döviz Kuru</div>
          </div>
          <div className="bg-white border-4 border-black p-4">
            <div className="text-3xl font-black mb-2">
              {Object.keys(FINANCIAL_DATA.rates.interestRates).length}
            </div>
            <div className="text-sm font-bold text-gray-600">Faiz Oranı</div>
          </div>
          <div className="bg-white border-4 border-black p-4">
            <div className="text-3xl font-black mb-2">
              {Object.keys(FINANCIAL_DATA.rates.collectionRates).length}
            </div>
            <div className="text-sm font-bold text-gray-600">Sektör Oranı</div>
          </div>
          <div className="bg-white border-4 border-black p-4">
            <div className="text-3xl font-black mb-2">
              {Object.values(FINANCIAL_DATA.rates).reduce((acc, category) => 
                acc + Object.keys(category).length, 0
              )}
            </div>
            <div className="text-sm font-bold text-gray-600">Toplam Veri</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
