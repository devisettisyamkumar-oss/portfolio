<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:111827,50:1D4ED8,100:0E7490&height=170&section=header&text=Personal%20Portfolio&fontSize=36&fontColor=FFFFFF&fontAlignY=38&animation=fadeIn" alt="Portfolio banner" />
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=19&pause=1000&color=22D3EE&center=true&vCenter=true&width=650&height=45&lines=A+responsive+developer+portfolio;Showcasing+skills%2C+projects+and+experience;Built+with+HTML%2C+CSS+and+JavaScript" alt="Animated portfolio tagline" />
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  </p>
</div>

## Overview

A responsive personal portfolio website built with HTML, CSS, and vanilla JavaScript. It presents my introduction, education, technical skills, selected projects, GitHub activity, and contact information.

## Features

- Hero section with resume actions and profile image
- About section with education timeline
- Skill and tool logos rendered from local assets
- Project cards with technology labels
- GitHub statistics, language summary, and contribution calendar loaded dynamically
- Contact form interface with name, email, and message fields
- Responsive navigation, scroll progress, and motion-aware animation behavior

## Tech Stack

<p>
  <img src="https://skillicons.dev/icons?i=html,css,js,github" alt="HTML CSS JavaScript GitHub" />
</p>

## Project Structure

```text
portfolio/
├── assets/
│   ├── icons/
│   ├── Syamkumar_Devisetti_Resume.pdf
│   ├── photo.jpg
│   └── project illustrations
├── index.html
├── script.js
└── style.css
```

## Run Locally

No package installation is required. Open `index.html` in a browser, or run a local web server:

```bash
python3 -m http.server 5500
```

Open `http://localhost:5500` in your browser.

## Configuration Before Publishing

The current source contains values that must be replaced before all portfolio actions work:

1. In `script.js`, set `GITHUB_USER` to `devisettisyamkumar-oss` so GitHub statistics load from the correct account.
2. In `index.html`, replace the placeholder Google Drive URL in the **View Resume** button with the real public resume URL. The downloadable PDF is already stored at `assets/Syamkumar_Devisetti_Resume.pdf`.
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with a real Web3Forms key. Until then, the contact form cannot deliver messages.
4. Replace the placeholder LinkedIn URL with the correct profile URL.
5. Confirm the displayed phone number and location are still correct before publishing.

## Author

**Syamkumar Devisetti** · [GitHub](https://github.com/devisettisyamkumar-oss) · [Email](mailto:devisettisyamkumar@gmail.com)

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0E7490,50:1D4ED8,100:111827&height=90&section=footer" alt="Footer wave" />
</div>
