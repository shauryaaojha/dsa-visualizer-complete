import os

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('@/components/shared/universal-visualizer-controls', '@/components/visualizer/PlaybackControls')
        
    if new_content != content:
        print(f"Updating {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    root_dir = r'd:\o_jha\N\lib\algorithms'
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.ts'):
                replace_in_file(os.path.join(subdir, file))

if __name__ == '__main__':
    main()
