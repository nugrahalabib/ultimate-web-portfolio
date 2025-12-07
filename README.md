# Ultimate Web Portfolio 🚀

![Project Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-Fiber-white?style=for-the-badge&logo=three.js)
![Directus](https://img.shields.io/badge/Directus-Headless%20CMS-6644FF?style=for-the-badge&logo=directus)

> A high-performance, visually stunning personal portfolio website built with the latest web technologies. Featuring a 3D interactive background, bento-grid layouts, and a fully integrated Headless CMS.

## ✨ Key Features

*   **🎨 Immersive 3D Experience**: Interactive "Jelly" object and particle system using `@react-three/fiber` and `@react-three/drei`.
*   **📱 Bento Grid Layout**: Modern, responsive showcase section for projects and skills.
*   **📝 Dynamic Blog System**: Full-featured blog with categories, tags, SEO optimization, and highlighted posts.
*   **🛣️ Scrollytelling Journey**: Interactive timeline to showcase professional experience and education.
*   **⚡ High Performance**: Built on Next.js 16 with Turbopack, optimized for speed and SEO (JSON-LD included).
*   **🛠️ Full CMS Control**: All content (text, images, SEO, projects, blog) is managed via **Directus**, a powerful Headless CMS.
*   **🔗 Link-in-Bio Page**: A dedicated, neo-brutalist style page for social links (`/linkbio`).
*   **🐳 Dockerized**: Production-ready setup with Docker Compose for easy deployment.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
*   **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
*   **CMS**: [Directus](https://directus.io/) (Self-hosted)
*   **Database**: SQLite (Embedded in Directus container)
*   **Deployment**: Docker & Nginx

## 🚀 Getting Started

### Prerequisites

*   Node.js 18+
*   Docker & Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/nugrahalabib/ultimate-web-portfolio.git
cd ultimate-web-portfolio
```

### 2. Setup Environment Variables

Copy the example environment file:

```bash
cp env.example .env
```

Update `.env` with your secure credentials (for Directus admin).

### 3. Run Development Server

You can run the frontend and CMS separately or together.

**Option A: Full Stack (Docker)**
```bash
# Starts Next.js (3000) and Directus (8055)
docker compose up -d
```

**Option B: Hybrid (Local Frontend + Docker CMS)**
```bash
# 1. Start CMS only
npm run cms

# 2. Start Frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the website and [http://localhost:8055](http://localhost:8055) for the CMS.

## 📦 Deployment

This project is designed to be deployed on a VPS using Docker.

1.  **Push** your changes to GitHub.
2.  **SSH** into your VPS.
3.  **Clone** and run `docker compose -f docker-compose.prod.yml up -d --build`.

See [DEPLOY.md](./DEPLOY.md) for the complete step-by-step deployment guide.

## 📂 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components (3D, UI, etc.)
│   ├── lib/              # Utilities & Directus SDK
│   └── styles/           # Global styles
├── directus/             # CMS data & uploads
├── public/               # Static assets
├── scripts/              # Helper scripts (migrations, etc.)
├── Dockerfile            # Production build definition
└── docker-compose.yml    # Dev & Prod orchestration
```

## 👤 Author

**Nugraha Labib**

*   Website: [nugrahalabib.com](https://nugrahalabib.com)
*   GitHub: [@nugrahalabib](https://github.com/nugrahalabib)

---

*Built with ❤️ and ☕.*
