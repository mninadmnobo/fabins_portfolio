# 🔬 FABINS — AI-Powered Fabric Defect Inspection System

<p align="center">
  <strong>An AI-Powered Optical Inspection System for Textile Manufacturing & Export Mills</strong><br />
  Developed by <strong>Saturn Textiles Limited — Research & Development Department</strong>
</p>

<p align="center">
  <a href="#-technology-stack"><img src="https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js" alt="Next.js 16" /></a>
  <a href="#-technology-stack"><img src="https://img.shields.io/badge/Spring_Boot-3.4.2-brightgreen?style=for-the-badge&logo=spring" alt="Spring Boot 3" /></a>
  <a href="#-technology-stack"><img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk" alt="Java 21" /></a>
  <a href="#-technology-stack"><img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  <a href="#-technology-stack"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS v4" /></a>
</p>

---

## 📌 About FABINS

**FABINS** (*Fabric Inspection Automation*) is an end-to-end industrial machine-vision system built to replace error-prone manual fabric grading in textile export mills.

Instead of importing expensive foreign inspection machines that require replacing factory infrastructure, FABINS **retrofits onto the inspection frames mills already own**. It captures high-speed moving fabric via line-scan optical sensors, detects sub-millimeter defects in real-time, sizes them in millimeters, and automatically generates ASTM D5430 Four-Point quality inspection reports without human intervention.

---

## 🏛️ System Architecture

This repository is structured as a clean **Full-Stack Monorepo** comprising a high-performance Next.js 16 web application and a production-grade Spring Boot 3 REST API backend.

```text
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                             WEB CLIENT (BROWSER)                            │
 │  Next.js 16 App Router · React 19 · Framer Motion · Tailwind CSS v4          │
 └──────────────────────────────────────┬──────────────────────────────────────┘
                                        │
                                        │ HTTP REST / JSON
                                        ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                         SPRING BOOT 3 REST BACKEND                          │
 │  Java 21 · Spring Security · Spring Data JPA · MapStruct · RFC 9457 Errors  │
 └──────────────────────────────────────┬──────────────────────────────────────┘
                                        │
                                        │ JDBC SQL
                                        ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                           PERSISTENCE LAYER (DATABASE)                      │
 │  H2 In-Memory (Dev Profile) / PostgreSQL 16 (Production Profile)            │
 └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Repository Directory Layout

```text
fabins_portfolio/
├── frontend/                 # Next.js 16 Single-Page Marketing & Product Web App
│   ├── app/                  # App Router: layout, page, globals.css tokens
│   ├── components/           # UI Primitives, Sections, Layout Shell
│   ├── lib/                  # Data fixtures, Selectors (DAL), API boundary
│   └── types/                # Strict domain model TypeScript interfaces
│
├── backend/                  # Spring Boot 3.4 REST API Service
│   ├── src/main/java/        # Controllers, Services, Repositories, Entities, DTOs
│   ├── src/main/resources/   # application.yml configuration & database schemas
│   ├── pom.xml               # Maven dependencies & build configuration
│   └── mvnw / mvnw.cmd       # Cross-platform Maven Wrappers
│
└── docs/                     # 📚 Central Documentation & Learning Guides
    ├── FRONTEND_ARCHITECTURE_GUIDE.md  # Complete React/Next.js learning guide
    ├── BACKEND_LEARNING_GUIDE.md       # Complete Spring Boot & JPA learning guide
    └── SYSTEM_SPECIFICATION.md         # FABINS industrial optical specification
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: v20.0+ and `pnpm` (or `npm`)
* **Java JDK**: Version 21

---

### Step 1: Run the Spring Boot Backend (Terminal 1)

```bash
cd backend
./mvnw spring-boot:run          # On Windows PowerShell: .\mvnw.cmd spring-boot:run
```

* **API Base URL**: `http://localhost:8080/api/v1`
* **Interactive Swagger UI**: `http://localhost:8080/swagger-ui.html`
* **H2 Database Console**: `http://localhost:8080/h2-console` *(JDBC: `jdbc:h2:mem:fabins`, User: `sa`, No Password)*

---

### Step 2: Run the Next.js Frontend (Terminal 2)

```bash
cd frontend
cp .env.example .env.local      # Points API requests at http://localhost:8080
pnpm install
pnpm dev
```

* Open **`http://localhost:3000`** in your web browser.

---

## 🛠️ Technology Stack & Layering

| Tier | Component | Description |
| :--- | :--- | :--- |
| **Frontend UI** | Next.js 16 (App Router) | High-performance React 19 SSR/SSG rendering framework |
| **Styling** | Tailwind CSS v4 | Utility-first CSS engine with custom cyber-grid design tokens |
| **Animations** | Framer Motion | Fluid scroll entrance presets & interactive modal transitions |
| **Backend API** | Spring Boot 3.4 | Production-grade Java 21 REST API framework |
| **Security** | Spring Security 6 | CORS policy control, CSRF protection, and endpoint role isolation |
| **Persistence** | Spring Data JPA | Automatic SQL mapping for H2 (in-memory) & PostgreSQL |
| **Documentation** | OpenAPI 3.0 / Swagger | Automated interactive REST API documentation |

---

## 📚 Central Learning & Educational Documentation

This repository was specifically built as a **flagship educational reference** for students and developers learning full-stack web and backend development:

* 📖 **[Frontend Architecture Guide](docs/FRONTEND_ARCHITECTURE_GUIDE.md)**: Teaches clean 3-layer React architecture, state composition, data selectors, and custom design primitives.
* ☕ **[Spring Boot Learning Guide](docs/BACKEND_LEARNING_GUIDE.md)**: Line-by-line explanation of Spring Boot annotations, Controller-Service-Repository patterns, DTO mapping, and RFC 9457 error handling.

---

## 🔌 API Endpoints Summary

| Method | Endpoint Path | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/deployment-requests` | **Public** | Submit deployment assessment request from website form |
| `GET` | `/api/v1/deployment-requests` | Admin | List deployment requests (paginated, filterable by status) |
| `GET` | `/api/v1/deployment-requests/{id}` | Admin | Retrieve details of a specific deployment request |
| `PATCH` | `/api/v1/deployment-requests/{id}/status` | Admin | Update request status (`PENDING` ➔ `APPROVED` / `REJECTED`) |

---

## 👥 Authors & Credits

Developed by **Saturn Textiles Limited — Research & Development Department**:

* **Md. Rahinur Rahman** — Lead AI Systems Engineer (*EEE, BUET Graduate*)
* **Mohammad Ninad Mahmud Nobo** — Lead AI Software Engineer (*CSE, BUET Graduate*)

---

<p align="center">
  <sub>Built with precision for the Ready-Made Garment (RMG) export industry of Bangladesh.</sub>
</p>