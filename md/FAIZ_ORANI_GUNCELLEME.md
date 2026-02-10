# Faiz Oranı Güncelleme Rehberi

## Merkezi Konfigürasyon Sistemi

KolayMoney.com'da tüm finansal veriler merkezi bir konfigürasyon dosyasından yönetilir:

**Dosya:** `src/lib/config/financialData.ts`

## Faiz Oranını Güncelleme

### 1. Tek Bir Yerden Güncelleme

Faiz oranını güncellemek için sadece bir dosyayı düzenlemeniz yeterlidir:

```typescript
// src/lib/config/financialData.ts

export const FINANCIAL_DATA: FinancialDataConfig = {
  // ...
  rates: {
    interestRates: {
      commercialLoan: {
        value: 46.00,  // ← BURADAN DEĞİŞTİRİN
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'Ticari kredi yıllık faiz'
      },
      // ...
    }
  }
}
```

### 2. Otomatik Güncellenen Yerler

Bu değeri değiştirdiğinizde, aşağıdaki tüm bileşenler **otomatik olarak** güncellenir:

#### ✅ Hesap Makineleri
- Ana sayfa hesap makinesi
- Tüm sektör sayfalarındaki hesap makineleri (10 sektör)
- Karşılaştırma tabloları

#### ✅ Use Case Hesaplamaları
- Beyaz Eşya sektörü (2 use case)
- Elektronik sektörü (2 use case)
- Mobilya sektörü (2 use case)
- Otomotiv B2C (2 use case)
- Otomotiv B2B (2 use case)
- FMCG (2 use case)
- İnşaat (2 use case)
- Lojistik (2 use case)
- Tarım (2 use case)
- Makine & Ekipman (2 use case)

**Toplam:** 20 use case, tümü otomatik güncellenir!

#### ✅ Finansal Göstergeler
- ROI hesaplamaları
- Net tasarruf hesaplamaları
- Efektif maliyet karşılaştırmaları
- Banka kredisi vs VDMK karşılaştırmaları

## Güncel Değerler (10 Şubat 2026)

### Finansman Maliyetleri Karşılaştırması
- **Banka Kredisi:** %42.00 (en ucuz)
- **VDMK:** %46.00 (orta - sizin ürününüz) ⭐
- **Faktoring:** %50.00 (en pahalı)

### Diğer Faiz Oranları
- **TCMB Politika:** %37.00
- **KOBİ Kredisi:** %40.00
- **Tüketici Kredisi:** %45.00
- **Kredi Kartı:** %50.00

### VDMK Parametreleri
- **İskonto Oranı:** %46.00
- **Komisyon:** %0.50
- **Minimum Tutar:** 500.000 TL
- **Maksimum Vade:** 180 gün

## Diğer Güncellenebilir Veriler

Aynı dosyadan aşağıdaki verileri de güncelleyebilirsiniz:

### Döviz Kurları
```typescript
currencies: {
  usdTry: { value: 43.59, ... },
  eurTry: { value: 51.70, ... }
}
```

### VDMK Parametreleri
```typescript
vdmk: {
  discountRate: { value: 35.00, ... },
  commission: { value: 0.50, ... },
  minAmount: { value: 500000, ... }
}
```

### Faktoring Oranları
```typescript
factoring: {
  discountRate: { value: 36.00, ... },
  commission: { value: 1.50, ... }
}
```

### Tedarikçi İskonto Oranları
```typescript
supplierDiscounts: {
  days10: { value: 2.00, ... },
  days20: { value: 3.50, ... },
  days30: { value: 5.00, ... }
}
```

## Veri Güncelliği Kontrolü

Sistem otomatik olarak veri eskiliğini kontrol eder:

```typescript
// 30 günden eski veriler için uyarı
if (isDataStale(date)) {
  // ⚠️ ESKİ VERİ uyarısı gösterilir
}
```

## Best Practices

### ✅ Yapılması Gerekenler
1. Her güncelleme sonrası `date` alanını güncelleyin
2. `source` alanına veri kaynağını yazın
3. `note` alanına açıklama ekleyin
4. Değişiklik sonrası tüm hesaplayıcıları test edin

### ❌ Yapılmaması Gerekenler
1. Sektör dosyalarındaki hardcoded değerleri değiştirmeyin
2. Hesaplama fonksiyonlarını değiştirmeyin
3. Birden fazla yerde aynı değeri tanımlamayın

## Test Checklist

Faiz oranını güncelledikten sonra kontrol edin:

- [ ] Ana sayfa hesap makinesi doğru değeri gösteriyor
- [ ] Sektör sayfaları hesap makineleri güncellendi
- [ ] Use case finansal etki hesaplamaları doğru
- [ ] Karşılaştırma tabloları güncellendi
- [ ] Tüm sayfalarda tutarlı değerler görünüyor

## Deployment

Değişiklikler otomatik olarak deploy edilir:

```bash
git add src/lib/config/financialData.ts
git commit -m "Update interest rate to 46%"
git push origin main
```

Vercel otomatik olarak yeni versiyonu deploy eder (~2 dakika).

## Sorun Giderme

### Problem: Hesap makinesi eski değeri gösteriyor
**Çözüm:** Tarayıcı cache'ini temizleyin (Ctrl+Shift+R veya Cmd+Shift+R)

### Problem: Bazı sayfalar güncellenmedi
**Çözüm:** Build cache'ini temizleyin:
```bash
pnpm clean
pnpm build
```

### Problem: TypeScript hatası
**Çözüm:** Type tanımlarını kontrol edin:
```bash
pnpm type-check
```

## İletişim

Sorularınız için:
- **Email:** dev@kolaymoney.com
- **Slack:** #dev-team

---

**Son Güncelleme:** 10 Şubat 2026
**Güncel Oranlar:**
- Banka: %42.00
- VDMK: %46.00
- Faktoring: %50.00
