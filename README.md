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
|-- resources/
|   |-- index.html
|   `-- resources.css
|-- materials/
|   |-- index.html
|   |-- materials.css
|   |-- access.js
|   `-- files/
|       `-- *.pdf
|-- blog/
|   |-- index.html
|   |-- blog.css
|   |-- before-the-proof/
|   |   `-- index.html
|   `-- about-this-blog/
|       `-- index.html
|-- assets/
|   |-- avatar.jpg
|   |-- qingdao-university-logo.jpg
|   |-- tal-education-logo.png
|   |-- uestc-logo.webp
|   `-- Zhuoran_Li.pdf
`-- README.md
```

The CV PDF is stored at `assets/Zhuoran_Li.pdf`.

## Update Personal Information

Edit `index.html` to update the name, email address, university, education details, internship entries, research interests, Physlib contributions, publications, and other academic information.

Do not add unverified positions, awards, publications, DOI links, arXiv links, or dates.

## Replace the CV

Place the real PDF file at:

```text
assets/Zhuoran_Li.pdf
```

The "Download CV" links on the homepage, blog pages, and resources page all point to that file.

## Update Links

Edit the profile links in the `<aside>` element of `index.html` to update Email, GitHub, Blog, CV, or other links.

The blog is part of the same GitHub Pages site at `/blog/`. Edit `blog/index.html` to update the post list and add each article in its own folder under `blog/`.

Browser tab titles match their page paths or a title keyword:

| Browser tab title | Page path |
| --- | --- |
| Blog | `/blog/` |
| Before the Proof | `/blog/before-the-proof/` |
| About This Blog | `/blog/about-this-blog/` |
| Resources | `/resources/` |

## Recommended Learning Resources

The academic motto opens a short question before navigating to the learning resources page at `/resources/`. On smaller screens, the same entry appears below the profile information. Press Enter or select Continue to submit; Cancel, Escape, or clicking outside closes the dialog.

The legacy `/materials/` page redirects to `/resources/`, preserving its query string and fragment. The page source and styles are now `resources/index.html` and `resources/resources.css`; the old `materials/materials.css` URL imports the current styles for cached pages.

Edit the question and accepted names in `index.html`. The small validation script is included in the homepage to avoid a separate script request. Answers are matched locally without a network request, ignoring case, whitespace, and common name punctuation. The signature uses a native dialog button; if JavaScript is disabled, the dialog explains how to enable verification and Continue stays disabled. The question is an entry interaction, not access control: the source, the resources page, and direct PDF links remain public on GitHub Pages.

`materials/access.js` is retained for compatibility with previously cached homepage HTML; the current homepage does not load it.

The page organizes resources by course. Add entries in the `courses` group of `resources/index.html`, including verified links to video lectures, lecture notes, exercises, and recommended English textbooks. These English textbooks are personal recommendations for more detailed self-study, not prescribed references for the video courses. Chinese-language textbooks and notes accompany the Chinese-language lectures.

David Tong's theoretical physics collection appears immediately before John Watrous's quantum information course, with a personal recommendation and all 23 courses currently listed on his teaching page. The resource list has no separate visible Courses heading.

Individual course entries use the same order: course title, Video lectures, Course reference textbook when identified, Course materials when available, and Recommended English textbook when available. Reuse `resource-block` and `resource-files` for every resource group. Textbook and PDF entries display the resource title followed by its author(s), separated by an em dash, with the edition when known and PDF format for downloadable files. Resource entries omit language and file size labels. Reference textbooks without supplied PDFs are plain text without links.

General Physics links to Yunwenjun's Bilibili channel and five knowledge-summary PDFs. Theoretical Mechanics links to Yanyu Ren's course; Electrodynamics links to Lei Zhou's course and lecture notes; Quantum Mechanics links to the main video course, Guangshan Tian's quantum mechanics and advanced quantum mechanics courses, Esheng Chen's problem book and practice workbook, and two worked-solution video series. The discussion identifies the Tian courses and Zeng's fifth-edition volumes as resources not studied in full, without a formal personal recommendation. Thermodynamics and Statistical Physics links to Qingdao University's video course and the recommended English textbook. The John Watrous course retains its overview, complete YouTube playlist, lecture notes, slides, and IBM Quantum Learning links. Videos are linked externally and never embedded.

Group Theory links to the Chinese-language video course based on Qizhi Han and Hongzhou Sun's textbook and the supplied textbook PDF. Mathematical Methods in Physics links to the Chinese-language video course based on Kunmiao Liang's textbook and the supplied fifth-edition textbook PDF. Linear Algebra links to the supplied first lecture of Linear Algebra for Science Students and Si Li's Linear Algebra: Principles and Applications PDF. It opens with a personal recommendation for studying linear algebra again and links to 3Blue1Brown's Essence of Linear Algebra on YouTube and Bilibili. Its supplementary reading includes Ordinary Differential Equations by Si Li and Mathematical Analysis by Pin Yu. All supplied PDFs are copied unchanged under English filenames.

Theoretical Mechanics lists Yanbai Zhou's A Course in Theoretical Mechanics (5th edition); Mathematical Methods in Physics provides Kunmiao Liang's textbook (5th edition) as a PDF; Thermodynamics and Statistical Physics lists Zhicheng Wang's textbook (6th edition). The theoretical mechanics and thermodynamics course reference textbooks have no download links. Quantum Mechanics explains that the main video course is independent of any prescribed textbook and does not cover all of advanced quantum mechanics. Its plain-text book entries include Quantum Mechanics, Volumes I and II by Jinyan Zeng (5th edition); the user's own A Course in Quantum Mechanics by Jinyan Zeng (3rd edition) and Advanced Quantum Mechanics by Xinglin Ka (2nd edition); and A Course in Quantum Mechanics by Shixun Zhou (3rd edition). It retains the independently recommended English textbook and the existing problem-book downloads.

Place resource PDFs in `materials/files/`, using the English resource title with a `.pdf` extension as the filename. This download location is retained so existing PDF links keep working. Replace title colons with ` - ` in filenames. Textbook filenames use the book title; lecture notes, summaries, and workbooks identify the resource type or topic. Keep the supplied PDF contents unchanged. Edit `resources/index.html` to update the verified author, edition, and download link under the corresponding course, using `../materials/files/` for local PDFs. Encode spaces in link URLs as `%20` and keep the `download` filename equal to the actual PDF filename.

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
