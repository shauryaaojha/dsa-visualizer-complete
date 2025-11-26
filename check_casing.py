import os
import re

root_dir = r"d:\o_jha\N"
components_ui_dir = os.path.join(root_dir, "components", "ui")

# Get actual file names in components/ui
ui_files = os.listdir(components_ui_dir)
ui_files_lower = {f.lower(): f for f in ui_files}

print("Scanning for casing mismatches...")

for dirpath, dirnames, filenames in os.walk(root_dir):
    if "node_modules" in dirpath or ".next" in dirpath:
        continue
        
    for filename in filenames:
        if not filename.endswith(".tsx") and not filename.endswith(".ts"):
            continue
            
        file_path = os.path.join(dirpath, filename)
        
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
                
            # Find imports from @/components/ui/...
            matches = re.findall(r'from "@/components/ui/([^"]+)"', content)
            for match in matches:
                # match is the filename part, e.g. "Button" or "input"
                import_name = match
                possible_filename = import_name + ".tsx"
                
                if possible_filename.lower() in ui_files_lower:
                    actual_filename = ui_files_lower[possible_filename.lower()]
                    if possible_filename != actual_filename:
                        print(f"Mismatch in {file_path}: imports '{import_name}' but file is '{actual_filename}'")
                else:
                    # Maybe it's a directory?
                    pass
                    
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
