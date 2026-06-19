# Orion AI

Orion AI is a full-stack AI application built to explore real-world cloud deployment, backend infrastructure, and self-hosted Large Language Model (LLM) serving.

The project combines a Next.js frontend with a cloud-hosted backend that exposes locally hosted AI models through a REST API. The primary goal of this project was to gain hands-on experience with VPS management, LLM deployment, API architecture, and production-like cloud workflows.

---

## System Architecture

```text
Client
   │
   ▼
Next.js Frontend (Vercel)
   │
   ▼
Custom REST API
   │
   ▼
Google Cloud VPS
   │
   ▼
Ollama Runtime
   │
   ├── LLaMA
   └── Qwen
```

---

## Features

* AI-powered conversational interface
* Self-hosted LLM inference using Ollama
* REST API-based architecture
* Cloud-hosted backend deployment
* Frontend and backend separation
* Rate limiting and API protection
* Responsive web interface
* Production-style deployment workflow

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* REST API

### AI Infrastructure

* Ollama
* LLaMA
* Qwen

### Cloud & Deployment

* Google Cloud VPS
* Vercel
* SSH
* Linux

---

## Engineering Highlights

### VPS Deployment

Configured and managed a remote Linux VPS on Google Cloud to host AI inference services.

### Self-Hosted LLM Serving

Installed and configured Ollama to run open-source language models locally on the server.

### API Development

Built a backend API layer that exposes model inference through structured HTTP endpoints.

### Frontend Integration

Integrated the Next.js frontend with backend inference APIs to provide a seamless user experience.

### Security & Reliability

Implemented rate limiting and deployment best practices to protect backend resources and ensure stable operation.

---

## What I Learned

This project helped me gain practical experience with:

* Cloud infrastructure management
* VPS deployment and administration
* SSH-based remote server management
* Self-hosted AI systems
* REST API design
* Full-stack application architecture
* Production deployment workflows
* AI model serving using Ollama

---

## Project Status

This project was developed as a learning-focused deployment to explore cloud infrastructure and self-hosted AI systems.

The original deployment may be modified, redeployed, or taken offline as part of ongoing experimentation and learning.

---

## Screenshots

*Add project screenshots here.*

---

## Author

**Bishal Adhikari**

Full Stack Web & Mobile Developer

* MERN Stack
* React Native
* Node.js
* Express.js
* MongoDB
