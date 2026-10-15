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

The page organizes resources by course. Add entries in the `courses` group of `materials/index.html`, including verified links to video lectures, lecture notes, exercises, and recommended English textbooks. These English textbooks are personal recommendations for more detailed self-study, not prescribed references for the video courses. Chinese-language textbooks and notes accompany the Chinese-language lectures.

Each entry uses the same order: course title, Video lectures, Course reference textbook when identified, Course materials when available, and Recommended English textbook when available. Reuse `resource-block` and `resource-files` for every resource group. Textbook and PDF entries display the resource title followed by its author(s), separated by an em dash, with the edition when known and PDF format for downloadable files. Resource entries omit language and file size labels. Reference textbooks without supplied PDFs are plain text without links. For textbook-based video courses, the named authors refer to the textbook rather than the video instructor.

General Physics links to Yunwenjun's Bilibili channel and five knowledge-summary PDFs. Theoretical Mechanics links to Yanyu Ren's course; Electrodynamics links to Lei Zhou's course and lecture notes; Quantum Mechanics links to the video course, Esheng Chen's problem book and practice workbook, and two worked-solution video series. Thermodynamics and Statistical Physics links to Qingdao University's video course and the recommended English textbook. The John Watrous course retains its overview, complete YouTube playlist, lecture notes, slides, and IBM Quantum Learning links. Videos are linked externally and never embedded.

Group Theory links to the ongoing Chinese-language video course based on Qizhi Han and Hongzhou Sun's textbook and the supplied textbook PDF. Mathematical Methods in Physics links to the Chinese-language video course based on Kunmiao Liang's textbook. Linear Algebra links to the supplied first lecture of Linear Algebra for Science Students and Si Li's Linear Algebra: Principles and Applications PDF. The two supplied PDFs are copied unchanged under English filenames.

Theoretical Mechanics lists Yanbai Zhou's A Course in Theoretical Mechanics (5th edition); Mathematical Methods in Physics lists Kunmiao Liang's textbook (5th edition, revised by Fa Liu, Guoqing Miao, and Lubing Shao); Thermodynamics and Statistical Physics lists Zhicheng Wang's textbook (6th edition). These three course references have no download links. Quantum Mechanics explicitly has no specified reference textbook for the video course and retains the independently recommended English textbook.

Place resource PDFs in `materials/files/`, using descriptive English titles as filenames. Textbook filenames use the book title; lecture notes, summaries, and workbooks identify the resource type or topic. Keep the supplied PDF contents unchanged. Edit `materials/index.html` to update the verified author, edition, and download link under the corresponding course. Encode spaces in link URLs as `%20` and keep the `download` filename equal to the actual PDF filename.

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
