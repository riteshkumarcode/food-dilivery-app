import os
import shutil

src_dirs = ['css', 'js']
src_files = ['index.html']
dest_roots = [
    'www',
    os.path.join('android', 'app', 'src', 'main', 'assets', 'public')
]

for dest_root in dest_roots:
    os.makedirs(dest_root, exist_ok=True)

    for d in src_dirs:
        dest_dir = os.path.join(dest_root, d)
        if os.path.exists(dest_dir):
            shutil.rmtree(dest_dir)
        shutil.copytree(d, dest_dir)
        print(f"Copied directory {d} -> {dest_dir}")

    for f in src_files:
        shutil.copy2(f, os.path.join(dest_root, f))
        print(f"Copied file {f} -> {os.path.join(dest_root, f)}")

# Also copy capacitor.config.json to android assets
cap_config_src = 'capacitor.config.json'
cap_config_dest = os.path.join('android', 'app', 'src', 'main', 'assets', 'capacitor.config.json')
if os.path.exists(cap_config_src):
    shutil.copy2(cap_config_src, cap_config_dest)
    print(f"Copied {cap_config_src} -> {cap_config_dest}")

print("Assets synced to Android project successfully.")
