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
if not API_KEY:
    API_KEY = "AIzaSyApdCS6lSVtmhDjcy0ttycmYP3nsX7ypLs"  # Kullanıcının verdiği key

LOG_FILE = Path("assets_manifest.json")

# HİBRİT MODEL YAPILANDIRMASI (IMAGEN 4.0 - v1beta)
MODELS = {
    "standard": f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key={API_KEY}",
    "ultra":    f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key={API_KEY}",
    "fast":     f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key={API_KEY}"
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
        response = requests.post(api_url, headers=headers, json=payload, timeout=60)
        
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
        # Hero Section - Ultra kalite
        {
            "path": "public/img/hero-background.jpg",
            "prompt": "Modern financial technology concept, abstract geometric shapes in blue and black, professional corporate style, clean minimalist design, Turkish business atmosphere, high contrast, brutalist aesthetic",
            "model_type": "ultra",
            "ratio": "16:9"
        },
        
        # Blog Post Images - Standard kalite
        {
            "path": "public/img/blog/vdmk-guide.jpg",
            "prompt": "Professional business handshake, financial documents on modern desk, Turkish businesspeople, corporate office setting, natural lighting, professional photography",
            "model_type": "standard",
            "ratio": "16:9"
        },
        {
            "path": "public/img/blog/business-growth.jpg",
            "prompt": "Growing business chart with upward arrow, modern office background, financial success concept, blue and green colors, professional corporate photography",
            "model_type": "standard",
            "ratio": "16:9"
        },
        {
            "path": "public/img/blog/sector-solutions.jpg",
            "prompt": "Multiple industry sectors represented, manufacturing, retail, logistics icons, modern infographic style, professional business illustration",
            "model_type": "standard",
            "ratio": "16:9"
        },
        {
            "path": "public/img/blog/receivables-financing.jpg",
            "prompt": "Invoice and payment documents, calculator and financial charts, cash flow concept, professional desk setup, business photography",
            "model_type": "standard",
            "ratio": "16:9"
        },
        {
            "path": "public/img/blog/sme-financing.jpg",
            "prompt": "Small business owner in modern office, laptop with financial dashboard, confident entrepreneur, Turkish business setting, natural light",
            "model_type": "standard",
            "ratio": "16:9"
        },
        {
            "path": "public/img/blog/cash-flow.jpg",
            "prompt": "Money flow visualization, financial graphs and charts, cash management concept, blue and green colors, modern business illustration",
            "model_type": "standard",
            "ratio": "16:9"
        },
        
        # Sector Icons - Fast kalite
        {
            "path": "public/img/sectors/electronics.jpg",
            "prompt": "Modern electronics store interior, smartphones and gadgets display, clean retail environment, professional photography, blue lighting",
            "model_type": "fast",
            "ratio": "4:3"
        },
        {
            "path": "public/img/sectors/furniture.jpg",
            "prompt": "Modern furniture showroom, elegant sofas and tables, clean minimalist design, professional interior photography, warm lighting",
            "model_type": "fast",
            "ratio": "4:3"
        },
        {
            "path": "public/img/sectors/automotive.jpg",
            "prompt": "Modern car dealership showroom, luxury vehicles on display, clean professional environment, automotive photography",
            "model_type": "fast",
            "ratio": "4:3"
        },
        {
            "path": "public/img/sectors/construction.jpg",
            "prompt": "Modern construction site, crane and building structure, professional construction photography, blue sky background",
            "model_type": "fast",
            "ratio": "4:3"
        },
        {
            "path": "public/img/sectors/logistics.jpg",
            "prompt": "Modern logistics warehouse, organized storage system, delivery trucks, professional industrial photography",
            "model_type": "fast",
            "ratio": "4:3"
        },
        
        # About/Contact Page
        {
            "path": "public/img/team-office.jpg",
            "prompt": "Modern Turkish financial advisory office, professional team working together, glass office interior, natural lighting, corporate photography",
            "model_type": "standard",
            "ratio": "16:9"
        },
        
        # Success Stories
        {
            "path": "public/img/success-story-1.jpg",
            "prompt": "Successful Turkish business owner in retail store, confident smile, modern shop interior, professional portrait photography",
            "model_type": "standard",
            "ratio": "4:3"
        },
        {
            "path": "public/img/success-story-2.jpg",
            "prompt": "Manufacturing facility interior, modern production line, Turkish industrial setting, professional photography",
            "model_type": "standard",
            "ratio": "4:3"
        }
    ]
    # ==========================================

    print(f"🚀 {len(tasks)} görev işleniyor...")
    print(f"🔑 API Key: {'✓ Mevcut' if API_KEY else '✗ Bulunamadı'}")
    print("")
    
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        future_to_task = {executor.submit(process_single_task, task, args.force_all): task for task in tasks}
        for future in concurrent.futures.as_completed(future_to_task):
            res = future.result()
            if isinstance(res, dict) and res["status"] == "success":
                print(f"✅ OK: {res['path']}")
                manifest[res['path']] = res['meta']
                results.append(("success", res['path']))
            elif isinstance(res, str): 
                print(res)
                results.append(("skipped" if "Atlandı" in res else "error", res))
    
    save_manifest(manifest)
    
    # Özet
    print("\n" + "="*50)
    print("🏁 İşlem Tamamlandı")
    print("="*50)
    success_count = len([r for r in results if r[0] == "success"])
    skipped_count = len([r for r in results if r[0] == "skipped"])
    error_count = len([r for r in results if r[0] == "error"])
    print(f"✅ Başarılı: {success_count}")
    print(f"⏩ Atlandı: {skipped_count}")
    print(f"❌ Hata: {error_count}")
    print(f"📁 Manifest: {LOG_FILE}")
