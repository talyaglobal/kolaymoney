/**
 * Finansal Hesaplama Utilities - KolayMoney.com
 * Tüm VDMK finansman hesaplamaları
 */

import { FINANCIAL_DATA } from '@/lib/config/financialData'
import type { CalculationResult } from '@/types/financial'

/**
 * VDMK Finansman Maliyeti Hesaplama
 * @param principal - Ana para (TL)
 * @param annualRate - Yıllık iskonto oranı (%) - opsiyonel, config'den çekilir
 * @param days - Vade (gün)
 * @param commission - Komisyon oranı (%) - opsiyonel, config'den çekilir
 * @returns Toplam maliyet (TL)
 */
export function calculateVDMKCost(
  principal: number,
  annualRate?: number,
  days: number = 90,
  commission?: number
): number {
  const rate = annualRate ?? FINANCIAL_DATA.rates.vdmk.discountRate.value
  const comm = commission ?? FINANCIAL_DATA.rates.vdmk.commission.value
  
  const dailyRate = rate / 365
  const discountCost = principal * (dailyRate / 100) * days
  const commissionCost = principal * (comm / 100)
  
  return discountCost + commissionCost
}

/**
 * Banka Kredisi Maliyeti Hesaplama
 * @param principal - Ana para (TL)
 * @param annualRate - Yıllık faiz oranı (%)
 * @param days - Vade (gün)
 * @returns Toplam maliyet (TL)
 */
export function calculateBankLoanCost(
  principal: number,
  annualRate: number,
  days: number
): number {
  const dailyRate = annualRate / 365
  return principal * (dailyRate / 100) * days
}

/**
 * Tedarikçi Erken Ödeme İskontosu Hesaplama
 * @param invoiceAmount - Fatura tutarı (TL)
 * @param discountRate - İskonto oranı (%)
 * @returns Kazanılan iskonto (TL)
 */
export function calculateSupplierDiscount(
  invoiceAmount: number,
  discountRate: number
): number {
  return invoiceAmount * (discountRate / 100)
}

/**
 * Net Tasarruf Hesaplama (VDMK vs Banka Kredisi)
 * @param principal - Ana para (TL)
 * @param vdmkRate - VDMK yıllık iskonto %
 * @param bankRate - Banka yıllık faiz %
 * @param days - Vade (gün)
 * @param commission - VDMK komisyon %
 * @param supplierDiscount - Tedarikçi iskonto tutarı (TL)
 * @returns Net tasarruf (TL)
 */
export function calculateNetSavings(
  principal: number,
  vdmkRate: number,
  bankRate: number,
  days: number,
  commission: number = 0.5,
  supplierDiscount: number = 0
): number {
  const vdmkCost = calculateVDMKCost(principal, vdmkRate, days, commission)
  const bankCost = calculateBankLoanCost(principal, bankRate, days)
  return (bankCost - vdmkCost) + supplierDiscount
}

/**
 * ROI Hesaplama (%)
 * @param netSavings - Net tasarruf (TL)
 * @param principal - Ana para (TL)
 * @returns ROI yüzdesi
 */
export function calculateROI(netSavings: number, principal: number): number {
  return (netSavings / principal) * 100
}

/**
 * Efektif Yıllık Maliyet Hesaplama
 * @param cost - Toplam maliyet (TL)
 * @param principal - Ana para (TL)
 * @param days - Vade (gün)
 * @returns Efektif yıllık maliyet %
 */
export function calculateEffectiveRate(
  cost: number,
  principal: number,
  days: number
): number {
  return ((cost / principal) * (365 / days)) * 100
}

/**
 * Net Finansman Tutarı Hesaplama
 * @param principal - Ana para (TL)
 * @param vdmkRate - VDMK iskonto %
 * @param days - Vade (gün)
 * @param commission - Komisyon %
 * @returns Elde edilen net nakit (TL)
 */
export function calculateNetFinancing(
  principal: number,
  vdmkRate?: number,
  days: number = 90,
  commission?: number
): number {
  const cost = calculateVDMKCost(principal, vdmkRate, days, commission)
  return principal - cost
}

/**
 * Nakit Döngüsü İyileşme Hesaplama
 * @param oldCycle - Eski döngü (gün)
 * @param newCycle - Yeni döngü (gün)
 * @returns İyileşme (gün)
 */
export function calculateCashCycleImprovement(
  oldCycle: number,
  newCycle: number
): number {
  return oldCycle - newCycle
}

/**
 * Tam Hesaplama - Tüm metrikleri döndür
 * @param principal - Ana para (TL)
 * @param days - Vade (gün)
 * @param bankRate - Banka faizi %
 * @param supplierInvoice - Tedarikçi fatura tutarı (TL)
 * @param supplierDiscountRate - Tedarikçi iskonto %
 * @returns CalculationResult
 */
export function calculateFullFinancing(
  principal: number,
  days: number,
  bankRate: number,
  supplierInvoice: number = 0,
  supplierDiscountRate: number = 0
): CalculationResult {
  const vdmkRate = FINANCIAL_DATA.rates.vdmk.discountRate.value
  const commission = FINANCIAL_DATA.rates.vdmk.commission.value
  
  const vdmkCost = calculateVDMKCost(principal, vdmkRate, days, commission)
  const bankCost = calculateBankLoanCost(principal, bankRate, days)
  const supplierDiscount = supplierInvoice > 0 
    ? calculateSupplierDiscount(supplierInvoice, supplierDiscountRate)
    : 0
  const netSavings = (bankCost - vdmkCost) + supplierDiscount
  const roi = calculateROI(netSavings, principal)
  const netFinancing = calculateNetFinancing(principal, vdmkRate, days, commission)
  const effectiveRate = calculateEffectiveRate(vdmkCost, principal, days)
  
  return {
    vdmkCost,
    bankCost,
    supplierDiscount,
    netSavings,
    roi,
    netFinancing,
    effectiveRate
  }
}

/**
 * Faktoring - Net Nakit Hesaplama
 * Faktoring'de iskonto ve komisyon peşin kesilir
 */
export function calculateFactoringNetCash(
  principal: number,
  annualRate: number = 50,
  days: number,
  commission: number = 1.5
): {
  grossAmount: number
  discountDeduction: number
  commissionDeduction: number
  totalDeduction: number
  netCashReceived: number
  cashUtilizationRate: number
  effectiveRate: number
} {
  const dailyRate = annualRate / 365
  const discountDeduction = principal * (dailyRate / 100) * days
  const commissionDeduction = principal * (commission / 100)
  const totalDeduction = discountDeduction + commissionDeduction
  const netCashReceived = principal - totalDeduction
  const cashUtilizationRate = (netCashReceived / principal) * 100
  const effectiveRate = (totalDeduction / netCashReceived) * (365 / days) * 100
  return {
    grossAmount: principal,
    discountDeduction,
    commissionDeduction,
    totalDeduction,
    netCashReceived,
    cashUtilizationRate,
    effectiveRate
  }
}

/**
 * VDMK - Net Nakit Hesaplama
 * VDMK'de alacağın %100'ü şirkete girer, maliyet vade sonunda ödenir
 */
export function calculateVDMKNetCash(
  principal: number,
  annualRate: number = 46,
  days: number,
  commission: number = 0.5
): {
  grossAmount: number
  upfrontCash: number
  discountCost: number
  commissionCost: number
  totalCost: number
  dueAtMaturity: number
  netAfterMaturity: number
  cashUtilizationRate: number
  effectiveRate: number
} {
  const dailyRate = annualRate / 365
  const discountCost = principal * (dailyRate / 100) * days
  const commissionCost = principal * (commission / 100)
  const totalCost = discountCost + commissionCost
  const dueAtMaturity = principal + totalCost
  const netAfterMaturity = principal - totalCost
  return {
    grossAmount: principal,
    upfrontCash: principal,
    discountCost,
    commissionCost,
    totalCost,
    dueAtMaturity,
    netAfterMaturity,
    cashUtilizationRate: 100,
    effectiveRate: (totalCost / principal) * (365 / days) * 100
  }
}

/**
 * VDMK vs Faktoring Detaylı Karşılaştırma
 */
export function compareVDMKvsFactoring(
  principal: number,
  days: number,
  vdmkRate: number = 46,
  factoringRate: number = 50
): {
  factoring: ReturnType<typeof calculateFactoringNetCash>
  vdmk: ReturnType<typeof calculateVDMKNetCash>
  cashDifference: number
  cashDifferencePercent: number
  costDifference: number
  costSavingsPercent: number
  utilizationDifference: number
  summary: {
    title: string
    description: string
    highlights: string[]
  }
} {
  const factoring = calculateFactoringNetCash(principal, factoringRate, days, 1.5)
  const vdmk = calculateVDMKNetCash(principal, vdmkRate, days, 0.5)
  const cashDifference = vdmk.upfrontCash - factoring.netCashReceived
  const cashDifferencePercent = (cashDifference / factoring.netCashReceived) * 100
  const costDifference = factoring.totalDeduction - vdmk.totalCost
  const costSavingsPercent = (costDifference / factoring.totalDeduction) * 100
  const utilizationDifference = vdmk.cashUtilizationRate - factoring.cashUtilizationRate
  return {
    factoring,
    vdmk,
    cashDifference,
    cashDifferencePercent,
    costDifference,
    costSavingsPercent,
    utilizationDifference,
    summary: {
      title: 'VDMK ile Çift Avantaj',
      description: `${formatCurrency(cashDifference)} daha fazla nakit + ${formatCurrency(costDifference)} daha düşük maliyet`,
      highlights: [
        `İlk gün ${formatCurrency(cashDifference)} daha fazla nakit`,
        `Toplam ${formatCurrency(costDifference)} tasarruf (%${costSavingsPercent.toFixed(1)})`,
        'Bilanço dışı finansman',
        'Ölçeklenebilir yapı'
      ]
    }
  }
}

/**
 * Para Formatı
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Yüzde Formatı
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `%${value.toFixed(decimals)}`
}

/**
 * Sayı Formatı (virgüllü)
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('tr-TR').format(value)
}

/**
 * Kısa Para Formatı (1M, 5M, 1.5M)
 */
export function formatCurrencyShort(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M TL`
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}K TL`
  }
  return formatCurrency(amount)
}
