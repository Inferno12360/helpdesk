#!/bin/bash

# Output file for the Table of Contents
toc_file="table_of_contents.md"

# Initialize the TOC file with a header
echo "# Table of Contents" > "$toc_file"
echo "" >> "$toc_file"

# Loop through all .md files in the current directory
for file in *.md; do
    # Skip the TOC file itself
    if [[ "$file" == "$toc_file" ]]; then
        continue
    fi
    
    # Add a link to the file in the TOC
    echo "## [$file](#${file%%.*})" >> "$toc_file"

    # Extract headings (lines that start with a single #)
    headings=$(grep '^# ' "$file")

    # For each heading in the file, add a corresponding link to the TOC
    while IFS= read -r heading; do
        # Clean the heading text for use in a link (convert spaces to dashes, lowercase)
        link=$(echo "$heading" | sed 's/ /-/g' | sed 's/#//g' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9\-]//g')
        # Append the heading as a link to the TOC
        echo "  - [$heading](#${file%%.*}-$link)" >> "$toc_file"
    done <<< "$headings"

    # Add a new line for separation
    echo "" >> "$toc_file"
done

# Convert the TOC and all .md files to one PDF using pandoc
# Ensure pandoc is installed and has the necessary PDF support (via LaTeX, wkhtmltopdf, or other)
pandoc $toc_file *.md -o output.pdf

# Inform the user
echo "Table of contents created and PDF generated as output.pdf"
