# Portfolio issues found during the checklist review

These are source-code issues in the existing `portfolio` repository. The GitHub connection rejected writes with HTTP 403, so these changes have **not** been applied.

## 1. Fix the GitHub username in `script.js`

Current value:

```js
const GITHUB_USER = "devisettisyamkumar";
```

Replace with:

```js
const GITHUB_USER = "devisettisyamkumar-oss";
```

This corrects the account used for GitHub stats and all project-card links generated from that constant.

## 2. Fix the GitHub link in `index.html`

Replace the old profile URL `https://github.com/devisettisyamkumar` with:

```text
https://github.com/devisettisyamkumar-oss
```

## 3. Replace the LinkedIn placeholder in `index.html`

The current URL contains `YOUR-LINKEDIN-ID`. The profile README already has this LinkedIn URL:

```text
https://www.linkedin.com/in/devisetti-syamkumar-682570321
```

Confirm that it opens your actual LinkedIn profile before publishing it.

## 4. Fix the View Resume button

The current `href` is `https://drive.google.com/YOUR_RESUME_LINK`, which is a placeholder. The repository already contains `assets/Syamkumar_Devisetti_Resume.pdf`.

To open that PDF in a new tab, use:

```html
<a class="btn btn-primary" id="viewResume" href="assets/Syamkumar_Devisetti_Resume.pdf" target="_blank" rel="noopener noreferrer">View Resume</a>
```

The existing Download Resume button already points to the local PDF asset.

## 5. Activate the contact form

The hidden field currently contains `YOUR_WEB3FORMS_ACCESS_KEY`. Obtain your own key from Web3Forms and replace the placeholder. Do not publish the form as working until a test submission is received successfully.

## 6. Other checklist observations

- Skills and tool logos are rendered from arrays in `script.js` and local SVG files under `assets/icons/`.
- The contact section already contains phone number, email, social links, and name/email/message form fields.
- The resume PDF exists in `assets/`.
- The LinkedIn link, View Resume link, contact-form key, and GitHub account name need correction before those items can be considered complete.
