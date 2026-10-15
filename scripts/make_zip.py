import os
import zipfile

zip_name = 'swigaato-client-preview.zip'
with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('www'):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, 'www')
            zipf.write(file_path, arcname)
            print(f"Added {arcname} to zip")

print(f"Zip created successfully: {zip_name} ({os.path.getsize(zip_name)} bytes)")
