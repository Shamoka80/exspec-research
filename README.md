# Ex-Spec Research Initiative

## Project Overview
This repository contains a one-page static landing site for the **Ex-Spec Academic & Industry Research Initiative**, presented under **Wrek’d Tech | Ex-Spec**. The site is intentionally built with vanilla HTML, CSS, and JavaScript for reliable GitHub Pages branch-based deployment without framework or build dependencies.

Repository: https://github.com/Shamoka80/exspec-research  
Live URL: https://shamoka80.github.io/exspec-research/

## Live URL
- https://shamoka80.github.io/exspec-research/

## File Structure
```text
.
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── docs/
    │   ├── README.md
    │   └── Wrekd-Tech-ExSpec-NDA.pdf
    ├── images/
    │   ├── Omni_ExSRobots_2.jpg
    │   ├── README.md
    │   ├── Smart_Omni_ExSRobot.jpg
    │   └── recovered_ree_equip.jpg
    └── logos/
        ├── README.md
        ├── exspec_name_primary.png
        ├── exspec_primary.png
        ├── exspec_primary_mark.png
        ├── wrekdtech_primary_med.png
        ├── wrekdtech_primary_stacked.jpg
        └── wrekdtech_primary_tag.png
```

## GitHub Pages Deployment (Branch-Based Only)
Use GitHub Pages with these settings:
- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/root**

### Deployment Warning (Required)
⚠️ **Do not use GitHub Actions deployment for this repository.**
- Do not create `.github/workflows`.
- Do not use `actions/deploy-pages`.
- Do not introduce workflow-based deployment.

## Theme System Summary
The site includes a user-selectable, keyboard-accessible theme selector with localStorage persistence:
1. Dark Technical (default)
2. Dark Research
3. Light Institutional

Implementation notes:
- CSS variables drive all theme colors.
- Theme changes are applied without page reload.
- Selection is stored in localStorage key `exspec-theme`.
- The implementation respects `prefers-reduced-motion`.

## Apps Script URL in Use
https://script.google.com/macros/s/AKfycbx8B0xEWk-KF6TVYvaAhVP0G-3yvjApVWe36u4OtIxU5oCE5C96ju0dxDxLAlTmaqdQ/exec

## Form Data Destination Requirements
Required Google Sheet tab: **Responses**

Required columns:
- Timestamp
- First Name
- Last Name
- Institution / Organization
- Title / Role
- Email Address
- Phone Number
- Department
- Area of Interest
- Message / Interest Note / Description
- Consent Confirmation

## NDA PDF Path
`assets/docs/Wrekd-Tech-ExSpec-NDA.pdf`

## Form Testing Checklist
- Open the live site.
- Confirm no Google Form iframe exists.
- Confirm default theme is Dark Technical.
- Confirm Dark Research theme can be selected.
- Confirm Light Institutional theme can be selected.
- Confirm selected theme persists after refresh.
- Confirm header logo uses exspec_primary.
- Confirm hero / brand support logo uses wrekdtech_primary_tag.
- Submit a test inquiry form.
- Confirm success message appears.
- Confirm NDA download section appears after successful submission.
- Confirm the Google Sheet receives the submitted test row.
- Confirm Download NDA opens `/assets/docs/Wrekd-Tech-ExSpec-NDA.pdf`.
- Confirm mobile layout is readable.
- Confirm keyboard focus is visible.

## Asset Usage Notes
- Header logo is loaded from `assets/logos/exspec_primary.png`.
- Hero support logo is loaded from `assets/logos/wrekdtech_primary_tag.png`.
- NDA download uses `assets/docs/Wrekd-Tech-ExSpec-NDA.pdf`.
- Existing uploaded assets are preserved and not deleted.

## Remaining TODOs
- Validate end-to-end Apps Script response behavior against the production Google Sheet (manual live test).
- Optional: Add additional internal QA pass for content/legal language review.
