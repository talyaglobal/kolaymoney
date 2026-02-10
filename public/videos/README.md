# KolayMoney Video Dosyaları

Bu klasöre optimize edilmiş video dosyalarını ekleyin.

## Gerekli Dosyalar:

### 1. kolaymoney-intro.mp4
- **Format**: MP4 (H.264 codec)
- **Çözünürlük**: 1920x1080 (Full HD) veya 1280x720 (HD)
- **Bitrate**: 2-5 Mbps (web için optimize)
- **Süre**: 1-3 dakika önerilir
- **Boyut**: Max 50MB

### 2. kolaymoney-intro.webm (Opsiyonel - daha iyi sıkıştırma)
- **Format**: WebM (VP9 codec)
- **Çözünürlük**: 1920x1080 veya 1280x720
- **Bitrate**: 1-3 Mbps
- **Boyut**: Max 30MB

## Video İçeriği Önerileri:

1. **Giriş (0-15 saniye)**
   - KolayMoney logosu
   - "VDMK ile Bilanço Dışı Finansman"

2. **Problem (15-45 saniye)**
   - Factoring'in limitleri
   - Nakit akışı sorunları
   - Büyüme engelleri

3. **Çözüm (45-90 saniye)**
   - VDMK modeli nasıl çalışır
   - Bilanço dışı avantajları
   - Sermaye piyasası erişimi

4. **Sonuç (90-120 saniye)**
   - Başarı hikayeleri
   - CTA: "Hemen Başvurun"

## Video Optimizasyon Komutları:

### FFmpeg ile MP4 Optimizasyonu:
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k -movflags +faststart kolaymoney-intro.mp4
```

### FFmpeg ile WebM Optimizasyonu:
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 2M -c:a libopus -b:a 128k kolaymoney-intro.webm
```

### Thumbnail Oluşturma:
```bash
ffmpeg -i kolaymoney-intro.mp4 -ss 00:00:05 -vframes 1 kolaymoney-intro-thumb.jpg
```

## Test:

Video dosyalarını bu klasöre ekledikten sonra:
1. Ana sayfayı açın
2. Navbar'da "Video İzle" butonuna tıklayın
3. Video modal'ı açılmalı ve otomatik oynatılmalı

## Placeholder Video:

Gerçek video hazır olana kadar, test için bir placeholder video kullanabilirsiniz:
- https://sample-videos.com/ (test videoları)
- Veya kendi demo videonuzu ekleyin
