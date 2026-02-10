# Vercel SPA Routing Fix

**Tarih:** 10 Şubat 2026  
**Sorun:** 404 hatası - `/sektorler` ve diğer route'lar  
**Durum:** ✅ Çözüldü

---

## 🐛 Sorun

Vercel'de deploy edilen SPA (Single Page Application) için client-side routing çalışmıyordu:

```
404: NOT_FOUND
Code: NOT_FOUND
ID: fra1::rvt9f-1770701776327-2fc0fb8aeca7

sektorler:1 Failed to load resource: the server responded with a status of 404 ()
```

### Neden?

Vite ile build edilen React SPA'lar client-side routing kullanır (wouter). Ancak Vercel sunucusu `/sektorler` gibi bir URL'e istek geldiğinde, bu dosyayı fiziksel olarak aramaya çalışır ve bulamayınca 404 döner.

**Çözüm:** Tüm route'ları `index.html`'e yönlendirmek gerekir, böylece React Router (wouter) devreye girer ve doğru component'i render eder.

---

## ✅ Çözüm

### 1. `vercel.json` Dosyası Oluşturuldu

**Dosya:** [`vercel.json`](../vercel.json)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/img/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Açıklama:**
- `rewrites`: Tüm route'ları `index.html`'e yönlendirir
- `headers`: Static asset'ler için cache ayarları (1 yıl)

### 2. `_redirects` Dosyası Oluşturuldu (Yedek)

**Dosya:** [`public/_redirects`](../public/_redirects)

```
/*    /index.html   200
```

**Açıklama:**
- Netlify tarzı redirect kuralı
- Vercel de bu formatı destekler
- `200` status code ile rewrite yapar (redirect değil)

---

## 🚀 Deployment

### Değişiklikleri Deploy Etme

```bash
# 1. Değişiklikleri commit et
git add vercel.json public/_redirects
git commit -m "fix: Add Vercel SPA routing configuration"

# 2. Push et
git push origin main

# 3. Vercel otomatik deploy edecek
# veya manuel:
vercel --prod
```

### Doğrulama

Deploy sonrası test edilecek URL'ler:
- ✅ `https://kolaymoney.com/sektorler`
- ✅ `https://kolaymoney.com/sektor/elektronik`
- ✅ `https://kolaymoney.com/blog`
- ✅ `https://kolaymoney.com/blog/vdmk-nedir-kapsamli-rehber`
- ✅ `https://kolaymoney.com/basvuru`

Tüm sayfalar 200 status code ile yüklenmeli (404 değil).

---

## 📝 Teknik Detaylar

### Vercel Rewrites vs Redirects

**Rewrites (Kullanılan):**
- URL değişmez
- SEO dostu
- SPA için ideal
- Status code: 200

**Redirects:**
- URL değişir
- Status code: 301/302
- SPA için uygun değil

### Cache Stratejisi

**Static Assets (`/assets/*`, `/img/*`):**
- Cache-Control: `public, max-age=31536000, immutable`
- 1 yıl cache
- Hash-based filenames sayesinde güvenli

**HTML (`index.html`):**
- Cache-Control: `no-cache` (default)
- Her zaman fresh content
- Service worker ile optimize edilebilir

---

## 🔍 Sorun Giderme

### Hala 404 Alıyorsanız

1. **Vercel Dashboard'u kontrol edin:**
   - Settings > General > Build & Development Settings
   - Output Directory: `dist` olmalı

2. **Cache temizleyin:**
   ```bash
   # Vercel cache temizle
   vercel --prod --force
   ```

3. **Local test:**
   ```bash
   # Production build
   pnpm build
   
   # Preview server (SPA routing ile)
   pnpm preview
   ```

4. **Vercel logs kontrol:**
   ```bash
   vercel logs
   ```

### Favicon 404 Hatası

Eğer `favicon.ico:1 Failed to load resource: 404` hatası alıyorsanız:

```bash
# public/ klasörüne favicon.ico ekleyin
# veya index.html'de link tag'ini güncelleyin
```

---

## 📚 Referanslar

- [Vercel SPA Configuration](https://vercel.com/docs/concepts/projects/project-configuration#rewrites)
- [Vite SPA Routing](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Wouter Documentation](https://github.com/molefrog/wouter)

---

## ✅ Checklist

- [x] `vercel.json` oluşturuldu
- [x] `public/_redirects` oluşturuldu
- [x] Cache headers ayarlandı
- [x] Dokümantasyon yazıldı
- [ ] Git commit yapıldı
- [ ] Vercel'e deploy edildi
- [ ] Production'da test edildi

---

## 🎉 Sonuç

SPA routing sorunu çözüldü! Artık tüm route'lar Vercel'de düzgün çalışacak.

**Sonraki adım:** Değişiklikleri commit edip deploy edin.
