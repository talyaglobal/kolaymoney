# AI Context-Aware Visual Asset Protocol (UNIVERSAL STANDARD)

## 1. Amaç
Bu dosya, projenin görsel varlıklarının (assets) **Google Imagen 4.0** (v1beta) altyapısı kullanılarak otomatik üretilmesi için gerekli tüm kuralları ve kaynak kodları içerir.

## 2. Model Stratejisi (Hybrid Architecture)
AI Asistanı, görselin kullanım yerine göre aşağıdaki `model_type` değerlerini seçmelidir:

| Model Tipi | Parametre | Kullanım Alanı | Endpoint (v1beta) |
| :--- | :--- | :--- | :--- |
| **ULTRA** | `"ultra"` | Hero, Landing Page, Portre, Kritik Görseller | `imagen-4.0-ultra-generate-001` |
| **STANDARD** | `"standard"` | Blog, Kartlar, Genel İçerik (Varsayılan) | `imagen-4.0-generate-001` |
| **FAST** | `"fast"` | İkonlar, Mockup, Basit Vektörler | `imagen-4.0-fast-generate-001` |

## 3. Çalışma Talimatı (AI İçin)
Kullanıcı görsel üretimi istediğinde şu adımları izle:
1.  **Analiz:** Proje kodlarını tara, eksik görselleri belirle.
2.  **Dosya Oluşturma:** Aşağıdaki **"MASTER SCRIPT"** bölümündeki Python kodunu birebir kopyalayarak `generate_assets.py` dosyasını oluştur (veya varsa güncelle).
3.  **Task Güncelleme:** Scriptin içindeki `tasks = []` listesini, analiz ettiğin eksik görsellerle doldur.
4.  **Çalıştırma:** Terminalde `python generate_assets.py` komutunu çalıştır.

---

## 4. MASTER SCRIPT (Python)
*Bu kod değiştirilemez, sadece `tasks` listesi güncellenir.*

```python
import os
import json
import requests
import base64
import shutil
import argparse
import concurrent.futures
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv
from PIL import Image
import io

# ==========================================
# ⚙️ SİSTEM AYARLARI
# ==========================================
# .env dosyasını güvenli yükle
load_dotenv(dotenv_path=".env.local")
if not os.environ.get("GEMINI_API_KEY"):
    load_dotenv() 

API_KEY = os.environ.get("GEMINI_API_KEY")
LOG_FILE = Path("assets_manifest.json")

# HİBRİT MODEL YAPILANDIRMASI (IMAGEN 4.0 - v1beta)
MODELS = {
    "standard": f"[https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=](https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=){API_KEY}",
    "ultra":    f"[https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=](https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=){API_KEY}",
    "fast":     f"[https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=](https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=){API_KEY}"
}

def load_manifest():
    if LOG_FILE.exists():
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_manifest(data):
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def process_single_task(task, force_mode):
    """Görsel üretim motoru"""
    original_path = Path(task["path"])
    output_path = original_path.with_suffix(".webp")
    prompt = task["prompt"]
    aspect_ratio = task.get("ratio", "16:9")
    
    # Model Seçimi (Varsayılan: Standard)
    requested_type = task.get("model_type", "standard").lower()
    if requested_type not in MODELS: requested_type = "standard"
    api_url = MODELS[requested_type]

    should_force = task.get("force", False) or force_mode

    # Cache Kontrolü
    if output_path.exists() and not should_force:
        return f"⏩ Mevcut (Atlandı): {output_path.name}"

    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Yedekleme
    if output_path.exists():
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = output_path.parent / ".backup" / f"{output_path.stem}_{timestamp}.webp"
        backup_path.parent.mkdir(exist_ok=True)
        shutil.copy2(output_path, backup_path)

    # Prompt Zenginleştirme
    if requested_type == "ultra":
        enhanced_prompt = f"{prompt}, award winning photography, 8k, highly detailed, masterpiece, photorealistic"
    elif requested_type == "fast":
        enhanced_prompt = f"{prompt}, simple, clean, vector style, no text"
    else:
        enhanced_prompt = f"{prompt}, photorealistic, 4k, high quality"

    try:
        if not API_KEY: return "❌ HATA: API Key bulunamadı."
        
        headers = {'Content-Type': 'application/json'}
        payload = {
            "instances": [{"prompt": enhanced_prompt}],
            "parameters": {"sampleCount": 1, "aspectRatio": aspect_ratio}
        }
        
        print(f"🎨 Üretiliyor [{requested_type.upper()}]: {output_path.name}...")
        response = requests.post(api_url, headers=headers, json=payload)
        
        if response.status_code != 200:
            return f"❌ API HATASI ({response.status_code}): {response.text}"

        data = response.json()
        if "predictions" not in data: return f"❌ VERİ YOK: {data}"

        image_bytes = base64.b64decode(data["predictions"][0]["bytesBase64Encoded"])
        img = Image.open(io.BytesIO(image_bytes))
        
        # Kalite Ayarı
        q = 95 if requested_type == "ultra" else 85
        img.save(output_path, "WEBP", quality=q)
        
        return {
            "status": "success", 
            "path": str(output_path), 
            "meta": {"prompt": prompt, "model": f"imagen-4.0-{requested_type}", "date": datetime.now().isoformat()}
        }
        
    except Exception as e:
        return f"❌ SİSTEM HATASI ({output_path.name}): {str(e)}"

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--force-all", action="store_true", help="Tüm görselleri yeniden üret")
    args = parser.parse_args()
    manifest = load_manifest()

    # ==========================================
    # 📝 GÖREV LİSTESİ (AI BURAYI DOLDURACAK)
    # ==========================================
    tasks = [
        # Örnek:
        # { "path": "public/img/hero.jpg", "prompt": "...", "model_type": "ultra" }
    ]
    # ==========================================

    print(f"🚀 {len(tasks)} görev işleniyor...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        future_to_task = {executor.submit(process_single_task, task, args.force_all): task for task in tasks}
        for future in concurrent.futures.as_completed(future_to_task):
            res = future.result()
            if isinstance(res, dict) and res["status"] == "success":
                print(f"✅ OK: {res['path']}")
                manifest[res['path']] = res['meta']
            elif isinstance(res, str): print(res)
    
    save_manifest(manifest)
    print("🏁 İşlem tamamlandı.")