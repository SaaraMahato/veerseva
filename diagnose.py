import os
import sys
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent / 'backend'
sys.path.insert(0, str(backend_path))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'veerseva.settings')

import django
django.setup()

from django.apps import apps

print("=" * 70)
print("📋 MODEL INSPECTION")
print("=" * 70)

# Check Veterans models
print("\n🦅 VETERANS APP MODELS:")
try:
    vet_app = apps.get_app_config('veterans')
    for model in vet_app.get_models():
        print(f"\n✅ Model: {model.__name__}")
        fields = [f.name for f in model._meta.fields]
        print(f"   Fields: {fields}")
except Exception as e:
    print(f"❌ Error: {e}")

# Check Documents models
print("\n📄 DOCUMENTS APP MODELS:")
try:
    doc_app = apps.get_app_config('documents')
    for model in doc_app.get_models():
        print(f"\n✅ Model: {model.__name__}")
        fields = [f.name for f in model._meta.fields]
        print(f"   Fields: {fields}")
except Exception as e:
    print(f"❌ Error: {e}")

# Check Grievances models
print("\n⚖️ GRIEVANCES APP MODELS:")
try:
    griev_app = apps.get_app_config('grievances')
    for model in griev_app.get_models():
        print(f"\n✅ Model: {model.__name__}")
        fields = [f.name for f in model._meta.fields]
        print(f"   Fields: {fields}")
except Exception as e:
    print(f"❌ Error: {e}")

print("\n" + "=" * 70)