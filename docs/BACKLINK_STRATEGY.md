# Backlink & Domain Authority Acquisition Strategy

**Target Asset:** [Muhammed Sahil Portfolio](https://mhdsahil.vercel.app/)  
**Target Niches:** Cybersecurity Engineering, Threat Intelligence Platforms, Systems Programming, Full-Stack Architecture  
**Target Canonical URL:** `https://mhdsahil.vercel.app/`  

---

## 1. Executive Strategy & Objectives

The goal of this backlink acquisition plan is to build organic domain authority (DA/DR), establish topical authority in cybersecurity engineering and systems development, and secure indexation priority on Google and Bing for targeted search queries:
- Primary Brand Queries: `Muhammed Sahil`, `Muhammed Sahil Cybersecurity`, `mhdsahil`
- Topical Queries: `Xerova Threat Intelligence`, `Nyota OS kernel`, `Full-Stack Cybersecurity Engineer`

This plan prioritizes **high-authority, organic, do-follow links** from reputable technical ecosystems over spam or artificial PBNs.

---

## 2. Tier 1: Foundational High-Authority Profile Links (Immediate)

These are baseline links from trusted domains with high Domain Authority (DA 80–99) that provide search crawlers with immediate co-citation and identity graph verification:

| Platform | Target Profile Placement | Expected Anchor Text | Link Status |
| :--- | :--- | :--- | :--- |
| **GitHub** | Profile Bio + `mhdsahil1/README.md` | `https://mhdsahil.vercel.app/` | Direct Profile Link (dofollow) |
| **LinkedIn** | "Contact Info" Website + "Featured" Link | `Muhammed Sahil — Cybersecurity & Systems Portfolio` | Bio Link / Social Graph |
| **Dev.to / Hashnode** | Author Bio & Profile Links | `Muhammed Sahil (Portfolio)` | Dofollow in author profile |
| **Medium** | Author About page & custom bio link | `mhdsahil.vercel.app` | Profile link |
| **Substack** | Publication About & Author Profile | `Author Portfolio` | Outbound profile link |
| **Twitter / X** | Header profile website field | `mhdsahil.vercel.app` | Bio link |
| **Discord** | Bio / Linked accounts | `mhdsahil.vercel.app` | Personal link |

---

## 3. Tier 2: Cybersecurity & Systems Domain Authority

Google gives heavy ranking weight to contextual, niche-specific backlinks. These sources prove technical expertise in security and kernel engineering:

### A. Security Research & Vulnerability Disclosures
- **GitHub Security Advisories (GHSA)**: When reporting or mitigating vulnerabilities in open-source libraries, include author attribution pointing back to `https://mhdsahil.vercel.app/`.
- **Packet Storm / Exploit-DB / Bugcrowd**: If publishing proof-of-concept (PoC) security scripts or CVE writeups, include author link in metadata headers.
- **CTF & Security Writeups**:
  - Publish walkthroughs on **HackTheBox**, **TryHackMe**, and **CTFtime**.
  - Host supplementary analysis on your portfolio or link the portfolio at the end of each writeup: *"Authored by Muhammed Sahil — read more security research at [mhdsahil.vercel.app](https://mhdsahil.vercel.app/)"*.

### B. Curated Awesome Lists & Tool Indexes
Submit PRs to popular, high-star GitHub curated directories:
- `vinta/awesome-python` or security-specific lists (`sbilly/awesome-security`, `tonybaloney/security-cheatsheets`).
- Operating system lists (`awesome-osdev`, `awesome-operating-system-development`) citing **Nyota OS**.
- Threat intelligence repositories citing **Xerova**.

---

## 4. Tier 3: Open-Source Project Ecosystems

Every open-source project Muhammed Sahil maintains should serve as a high-intent backlink hub:

### A. Repository Level Links
In the root `README.md` of every repository (`Xerova`, `Nyota OS`, `Zline`):
```markdown
[![Portfolio](https://img.shields.io/badge/Portfolio-Muhammed%20Sahil-E10600?style=flat&logo=safari)](https://mhdsahil.vercel.app/)
```
- In the **About section** (right sidebar of GitHub repositories), set the "Website" field to:
  - Repository-specific section: `https://mhdsahil.vercel.app/#projects`

### B. Package Registries & Container Registries
- If releasing tools on **PyPI** (`setup.py` / `pyproject.toml`):
  ```toml
  [project.urls]
  "Homepage" = "https://mhdsahil.vercel.app/"
  "Documentation" = "https://mhdsahil.vercel.app/#projects"
  ```
- If publishing **npm** packages (`package.json`):
  ```json
  "author": {
    "name": "Muhammed Sahil",
    "url": "https://mhdsahil.vercel.app/"
  }
  ```
- Docker Hub / GHCR descriptions referencing author homepage.

---

## 5. Tier 4: Technical Community Launches & Showcases

Execute structured showcase posts to generate initial link velocity and referral traffic:

| Channel | Format | Recommended Strategy |
| :--- | :--- | :--- |
| **Hacker News** | `Show HN: Nyota OS – An experimental 32/64-bit kernel` | Focus on architectural hurdles, technical lessons learned, and link directly to repo and portfolio. |
| **Reddit r/netsec** | Technical deep dive on threat intel parsing | Share original findings or methodology from building Xerova, with author credit to the portfolio. |
| **Reddit r/osdev** | Kernel architecture discussion | Discuss Nyota OS memory management, paging, or bootloader setup. |
| **Daily.dev / Hashnode** | "Building a Production Threat Intelligence Feed" | Publish full tutorial with canonical link back to `https://mhdsahil.vercel.app/#projects`. |

---

## 6. Tier 5: Academic & Institutional Links (.edu / .ac)

Educational backlinks carry the highest trust metrics in Google's PageRank algorithm:
- **Yenepoya University Alumni / Student Showcase**: Request listing on university student showcase pages or computer science department student portfolios.
- **Academic Whitepapers & Preprints**: Upload research papers or implementation architectures to **arXiv**, **Zenodo**, or **ResearchGate** with DOI attribution and portfolio website citations.

---

## 7. Natural Anchor Text Distribution Strategy

To avoid Google Penguin / over-optimization algorithmic penalties, maintain a natural anchor text profile:

- **Branded Anchors (60–70%)**:
  - `Muhammed Sahil`
  - `mhdsahil`
  - `mhdsahil.vercel.app`
  - `Muhammed Sahil Portfolio`
- **Topical / Entity Anchors (15–20%)**:
  - `Cybersecurity Engineer`
  - `Threat Intelligence Architect`
  - `Nyota OS developer`
  - `Full-Stack Systems Engineer`
- **Natural / Generic Anchors (10–15%)**:
  - `portfolio`
  - `website`
  - `project page`
  - `author profile`

---

## 8. Ongoing Monitoring & Search Console Protocol

1. **Verify Search Console**: Ensure verification meta tag in `index.html` is validated via Google Search Console.
2. **Submit Sitemap**: Submit `https://mhdsahil.vercel.app/sitemap.xml` inside GSC.
3. **Monitor Links**: Set up a free account on **Ahrefs Webmaster Tools** or **Semrush** to track referring domains, anchor distribution, and index status.
4. **Disavow Protection**: Periodically inspect incoming backlinks to disavow spam scraping domains if detected.

