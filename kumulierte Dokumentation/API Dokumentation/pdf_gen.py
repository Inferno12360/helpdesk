import os
import subprocess
from collections import defaultdict

# Function to create the Table of Contents (TOC) based on the specified groups
def create_toc(markdown_files):
    toc = "# Inhaltsverzeichnis\n\n"
    for group, files in markdown_files.items():
        toc += f"## {group.capitalize()}\n\n"
        for filename in files:
            toc += f"- [{filename}](#{filename.replace(' ', '-').lower()})\n"
        toc += "\n"
    toc += "\n"
    return toc

# Function to combine the markdown files based on their grouping
def combine_markdown_files(markdown_dir):
    markdown_files = defaultdict(list)
    valid_groups = ['delete', 'update', 'set', 'get']  # Groups to categorize files under
    intro_file = os.path.join(markdown_dir, 'Intro.md')  # Path to Intro.md
    combined_markdown = ""

    # Check if Intro.md exists and include it at the start
    if os.path.exists(intro_file):
        with open(intro_file, 'r') as intro:
            combined_markdown += intro.read()
        combined_markdown += "\n\n\\newpage\n\n"  # Add a page break after the intro

    # Group files based on whether they contain 'delete', 'update', 'set', or 'get' in the filename
    for f in os.listdir(markdown_dir):
        if f.endswith(".md") and f != 'Intro.md':  # Skip Intro.md as it is already included
            group_found = False
            for group in valid_groups:
                if group in f.lower():
                    markdown_files[group].append(f)
                    group_found = True
                    break
            if not group_found:
                markdown_files['unknown'].append(f)

    # Sort files alphabetically within each group
    for group in markdown_files:
        markdown_files[group].sort()

    # Add Table of Contents after Intro.md
    toc = create_toc(markdown_files)
    combined_markdown += toc

    # Combine grouped markdown files
    first_file = True
    for group, files in markdown_files.items():
        for filename in files:
            if not first_file:
                combined_markdown += "\n\n\\newpage"  # Add page break for all files except the first one
            first_file = False
            with open(os.path.join(markdown_dir, filename), 'r') as file:
                combined_markdown += f"\n\n# {filename}\n"
                combined_markdown += f"[Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)\n\n"
                content = file.read().replace("\n", "\n\n")  # Ensure proper line breaks
                combined_markdown += content

    return combined_markdown

# Function to convert combined markdown to PDF using Pandoc
def convert_markdown_to_pdf(combined_markdown, output_pdf, img_dir):
    with open('combined.md', 'w') as file:
        file.write(combined_markdown)
    subprocess.run([
        'pandoc', 'combined.md', '-o', output_pdf, '--pdf-engine=xelatex', '--resource-path', img_dir,
        '--variable', 'linkcolor=blue', '--variable', 'colorlinks=true'
    ])

# Main function to orchestrate the conversion
def main():
    markdown_dir = './markdown'
    img_dir = './img'
    output_pdf = 'output.pdf'
    combined_markdown = combine_markdown_files(markdown_dir)
    convert_markdown_to_pdf(combined_markdown, output_pdf, img_dir)
    os.remove('combined.md')
    print(f"PDF generated successfully: {output_pdf}")

if __name__ == "__main__":
    main()
