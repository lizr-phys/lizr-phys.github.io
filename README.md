# Zhuoran Li Personal Homepage

This repository contains the source code for Zhuoran Li's personal academic homepage.

The site is intended for GitHub Pages and the target address is:

```text
https://lizr-phys.github.io
```

## Project Structure

```text
lizr-phys.github.io/
|-- index.html
|-- style.css
|-- assets/
|   `-- resume.pdf
`-- README.md
```

`assets/resume.pdf` is not included yet. Add the real CV PDF at that path when it is ready.

## Update Personal Information

Edit `index.html` to update the name, email address, university, education details, research interests, publications, and other academic information.

Do not add unverified positions, awards, publications, DOI links, arXiv links, or dates.

## Replace the CV

Place the real PDF file at:

```text
assets/resume.pdf
```

The "Download CV" link in `index.html` already points to that file.

## Update Links

Edit the "More" section in `index.html` to update GitHub, Bilibili, or other links.

External links should use:

```html
target="_blank" rel="noopener noreferrer"
```

## Deploy to GitHub Pages

1. Create or use a GitHub repository named `lizr-phys.github.io`.
2. Push this static site to the `main` branch.
3. Open the repository on GitHub.
4. Go to `Settings` > `Pages`.
5. Use the `main` branch and the repository root as the Pages source.
6. Visit `https://lizr-phys.github.io`.

## Local Preview

Open `index.html` directly in a browser.

No build step, framework, package manager, backend, database, login system, or server is required.

## Local Backup

The previous site files were moved locally into `backup_old_site/` before cleanup. That directory is ignored by Git and should not be pushed to GitHub Pages.
