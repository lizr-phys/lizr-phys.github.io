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
|-- blog/
|   |-- index.html
|   |-- blog.css
|   `-- about-this-blog/
|       `-- index.html
|-- assets/
|   |-- avatar.jpg
|   |-- qingdao-university-logo.jpg
|   |-- tal-education-logo.png
|   `-- resume.pdf
`-- README.md
```

The CV PDF is stored at `assets/resume.pdf`.

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

Edit the profile links in the `<aside>` element of `index.html` to update Email, GitHub, Blog, CV, or other links.

The blog is part of the same GitHub Pages site at `/blog/`. Edit `blog/index.html` to update the post list and add each article in its own folder under `blog/`.

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
