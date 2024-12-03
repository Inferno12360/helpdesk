import os
import shutil
import subprocess
import re

def convert_markdown_to_html(input_md_path, output_html_path, img_rewrite_func):
    """
    Converts a markdown file to an HTML5 file using Pandoc, adjusts image paths, 
    and ensures line breaks are converted to <br> tags.
    """
    # Read the markdown content
    with open(input_md_path, 'r', encoding='utf-8') as file:
        markdown_content = file.read()
    
    # Rewrite image paths
    markdown_content = img_rewrite_func(markdown_content, input_md_path)
    
    # Replace line breaks with <br>
    markdown_content = markdown_content.replace('\n', '<br>\n')
    
    # Temporary file to hold the modified markdown
    temp_md_path = input_md_path + '.temp'
    with open(temp_md_path, 'w', encoding='utf-8') as temp_file:
        temp_file.write(markdown_content)
    
    try:
        # Convert Markdown to HTML using Pandoc
        subprocess.run([
            'pandoc', temp_md_path, '-o', output_html_path, '-s', '--metadata', 'charset=utf-8',
            '--standalone', '--to', 'html5'
        ], check=True)
        print(f"Converted {input_md_path} -> {output_html_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error converting {input_md_path} to HTML: {e}")
    finally:
        # Clean up the temporary file
        os.remove(temp_md_path)

def rewrite_image_paths(content, markdown_file_path):
    """
    Rewrites image paths to point to the ../../img directory relative to the current Markdown file.
    """
    img_directory = "./img/"
    # Regex to find Markdown image links: ![alt text](path/to/image)
    pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    
    def replace_img_path(match):
        alt_text = match.group(1)
        img_path = match.group(2)
        # Replace the image path with a relative path to the new img directory
        new_img_path = os.path.join(img_directory, os.path.basename(img_path))
        return f"![{alt_text}]({new_img_path})"
    
    return re.sub(pattern, replace_img_path, content)

def ensure_directory_structure(base_dir, target_dir, relative_path):
    """
    Ensures the same folder structure in the target directory as the base directory.
    """
    new_folder_path = os.path.join(target_dir, relative_path)
    os.makedirs(new_folder_path, exist_ok=True)
    return new_folder_path

def process_directory_recursively(base_dir, target_dir, overwrite=False):
    """
    Recursively traverses the directory and converts Markdown files to HTML5, preserving folder structure.
    """
    for root, _, files in os.walk(base_dir):
        relative_path = os.path.relpath(root, base_dir)
        target_folder = ensure_directory_structure(base_dir, target_dir, relative_path)
        
        for file in files:
            if file.endswith('.md'):
                input_md_path = os.path.join(root, file)
                output_html_path = os.path.join(target_folder, os.path.splitext(file)[0] + '.html')
                
                # Skip conversion if the HTML file exists and overwrite is False
                if os.path.exists(output_html_path) and not overwrite:
                    print(f"Skipping {output_html_path} (already exists)")
                    continue
                
                # Convert the Markdown file to HTML
                convert_markdown_to_html(input_md_path, output_html_path, rewrite_image_paths)

def main():
    base_dir = './online'
    target_dir = './option'
    overwrite = True  # Set to True to overwrite existing HTML files
    
    if not os.path.exists(base_dir):
        print(f"Directory {base_dir} does not exist. Please ensure the correct path.")
        return
    
    # Ensure the target directory exists
    os.makedirs(target_dir, exist_ok=True)
    
    process_directory_recursively(base_dir, target_dir, overwrite)
    print("Markdown to HTML5 conversion completed with folder structure preserved.")

if __name__ == "__main__":
    main()
