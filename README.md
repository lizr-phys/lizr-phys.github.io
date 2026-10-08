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
|-- materials/
|   |-- index.html
|   |-- materials.css
|   |-- access.js
|   `-- files/
|       `-- *.pdf
|-- blog/
|   |-- index.html
|   |-- blog.css
|   `-- about-this-blog/
|       `-- index.html
|-- assets/
|   |-- avatar.jpg
|   |-- qingdao-university-logo.jpg
|   |-- tal-education-logo.png
|   |-- uestc-logo.webp
|   `-- resume.pdf
`-- README.md
```

The CV PDF is stored at `assets/resume.pdf`.

## Update Personal Information

Edit `index.html` to update the name, email address, university, education details, internship entries, research interests, Physlib contributions, publications, and other academic information.

Do not add unverified positions, awards, publications, DOI links, arXiv links, or dates.

## Replace the CV

Place the real PDF file at:

```text
assets/resume.pdf
```

The "Download CV" link in `index.html` already points to that file.

## Update Links

Edit the profile links in the `<aside>` element of `index.html` to update Email, GitHub, Blog, CV, or other links.

The blog is part of the same GitHub Pages site at `/blog/`. Edit `blog/index.html` to update the post list and add each article in its own folder under `blog/`.

## Recommended Learning Resources

The academic motto opens a short question before navigating to the learning resources page at `/materials/`. On smaller screens, the same entry appears below the profile information. Press Enter or select Continue to submit; Cancel, Escape, or clicking outside closes the dialog.

Edit the question and accepted names in `index.html`. The small validation script is included in the homepage to avoid a separate script request. Answers are matched locally without a network request, ignoring case, whitespace, and common name punctuation. The signature uses a native dialog button; if JavaScript is disabled, the dialog explains how to enable verification and Continue stays disabled. The question is an entry interaction, not access control: the source, the materials page, and direct PDF links remain public on GitHub Pages.

`materials/access.js` is retained for compatibility with previously cached homepage HTML; the current homepage does not load it.

The page separates Courses from Textbooks. Add courses in the `courses` group of `materials/index.html`, including the course title, instructor, subject, a brief personal note, and verified links to videos, lecture notes, slides, or official course pages. The John Watrous course links to the author's overview, the complete Qiskit YouTube playlist, lecture notes, slides, and IBM Quantum Learning. Course resources are linked externally rather than embedded or copied into the repository.

Place textbook PDFs in `materials/files/`, using only the English book title as the filename. Edit `materials/index.html` to add or update the book title, verified authors, edition, corresponding course, file size, and download link. Encode spaces in link URLs as `%20` and keep the `download` filename equal to the actual PDF filename.

Files published here are publicly downloadable. PDFs are fetched only when a visitor chooses a download, so their size does not affect the homepage's initial load.

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

## Image Sources

- The profile image was supplied by Zhuoran Li.
- The Qingdao University emblem is from the university's official visual identity page.
- The TAL Education Group logo is from the company's official investor relations website.

## Local Backup

The previous site files were moved locally into `backup_old_site/` before cleanup. That directory is ignored by Git and should not be pushed to GitHub Pages.
<!-- rebuild pages -->
