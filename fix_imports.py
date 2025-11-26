import os

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    replacements = {
        '@/components/shared/markdown-content': '@/components/visualizer/ExplanationPanel',
        '@/components/shared/code-display': '@/components/visualizer/CodePanel',
        '@/components/shared/universal-visualizer-controls': '@/components/visualizer/PlaybackControls',
        '@/lib/algorithms/code-snippets': '@/lib/code-snippets'
    }
    
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        print(f"Updating {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    root_dir = r'd:\o_jha\N\components\visualizer'
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx'):
                replace_in_file(os.path.join(subdir, file))

if __name__ == '__main__':
    main()
