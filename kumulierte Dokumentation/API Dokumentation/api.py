import os, re, shutil



def search_files_recursively(folder):
    if not os.path.exists("./endpoints"):
        raise NotADirectoryError("There are no endpoints, so you can't create no Markdown files...")
    
    os.chdir("endpoints")
    data = []
    for root, dirs, files in os.walk(folder):
        for file in files:
            data.append(os.path.join(root, file))
    os.chdir("..")
    return data

def search_files_recursively_change_to_md(folder):
    data = search_files_recursively(folder)
    data = [filename.replace('.php', '.md') for filename in data]
    return data

def getMarkdownNames(data: str):
    names = []
    for file in data:
        file = file.replace(".php", "").replace(".", "").replace("/", "")
        names.append(file)
    return names 

def extract_params_from_file(file_path):
    """Extract keys and types from $params and $params2 in a PHP file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    params_pattern = r'\$(params\d?)\s*=\s*array\s*\((.*?)\);'
    matches = re.findall(params_pattern, content, re.DOTALL)

    result = {}
    for name, body in matches:
        key_value_pattern = r'"([^"]+)"\s*=>\s*\[\s*"value"\s*=>\s*[^,]+,\s*"type"\s*=>\s*"([^"]+)"'
        keys_and_types = re.findall(key_value_pattern, body)
        
        for key, value_type in keys_and_types:
            result[key] = value_type

    return result
def process_php_files(file_paths):
    
    os.chdir("endpoints")
    """Process PHP files given an array of file paths."""
    results = {}

    for file_path in file_paths:
        params = extract_params_from_file(file_path)
        results[file_path] = params

    os.chdir("..")
    return results

def getTableName(path: str):
    path_parts = path.strip("./").split(os.sep)
    
    if(len(path_parts) > 1):
        return path_parts[1]
    
def getActionInGerman(path: str):
    switch_dict = {
        'update': "aktualisieren",
        "set": "erstellen",
        "get": "holen",
        "delete": "löschen"
    }
    
    path_parts = path.strip('./').split(os.sep)

    if len(path_parts) > 0:
        first_part = path_parts[0]
        result = switch_dict.get(first_part, "Unknown")
        return result
    
def addParams(params: dict, text: str):
    if not params:
        return text
    text += "\nDieser Endpunkt muss mit folgenden Parametern aufgerufen werden:"
    
    for key, value in params.items():
        if key == "key":
            text += f"\n`{key}`(Rot markiert im Bild) mit Type `{value}`"
        else:
            text += f"\n`{key}` mit Type `{value}`"
    
    return text
    
def markdownWriter(files: list, fileNames: list, params: dict):
    os.chdir("markdown")
    for index, file in enumerate(files):
        current_name = fileNames[index]
        table = getTableName(file)
        
        text=f"Der Endpoint `{current_name}` kann in `{table}` {getActionInGerman(file)}."
        text = addParams(params.get(file), text)
        
        
        with open(current_name + ".md", "a") as file:
            file.write(f"![Database Image of Table {table}](../img/{current_name}.png)\n")
            file.write(f"\n<hr>\nMethod: `{current_name}`\n")
            file.write(text)
    os.chdir("../")
    
def markdownWriterToPath(files: list, fileNames: list, params: dict, path: str):
    for index, file in enumerate(files):
        current_name = fileNames[index]
        table = getTableName(file)
        
        # Construct the markdown content text
        text = f"Der Endpoint `{current_name}` kann in `{table}` {getActionInGerman(file)}."
        orgFile = str(file).replace(".md", ".php")
        text = addParams(params.get(orgFile), text)
        
        # Construct the full file path
        file_path = os.path.join(path, file)  # Assuming `file` contains the full path (e.g., 'update/mitarbeiter/main.md')
        
        # Ensure the directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        # Open and write to the markdown file
        with open(file_path, "a") as f:
            f.write(f"![Database Image of Table {table}](../img/{current_name}.png)\n")
            f.write(f"\n<hr>\nMethod: `{current_name}`\n")
            f.write(text)

def main():
    dir_path = './markdown'

    if os.path.exists(dir_path) and os.path.isdir(dir_path):
        shutil.rmtree(dir_path)
        print("Directory './markdown' deleted.")

    os.makedirs(dir_path, exist_ok=True)
    
    dir_path2 = './online'

    if os.path.exists(dir_path2) and os.path.isdir(dir_path2):
        shutil.rmtree(dir_path2)
        print("Directory './online' deleted.")

    os.makedirs(dir_path2, exist_ok=True)
    
    
    

    
    data = search_files_recursively(".")
    names = getMarkdownNames(data)
    file_params = process_php_files(data)
    markdownWriter(data, names, file_params)
    
    online_doc_paths = search_files_recursively_change_to_md(".")
    online_doc = "./online"
    markdownWriterToPath(online_doc_paths, names, file_params, online_doc)


main()
