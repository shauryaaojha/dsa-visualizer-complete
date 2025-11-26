import os

def check_and_fix_use_client(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'useState' in content and '"use client"' not in content and "'use client'" not in content:
        print(f"Adding 'use client' to {filepath}")
        new_content = '"use client"\n\n' + content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    root_dir = r'd:\o_jha\N\components\visualizer'
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx'):
                check_and_fix_use_client(os.path.join(subdir, file))

if __name__ == '__main__':
    main()
