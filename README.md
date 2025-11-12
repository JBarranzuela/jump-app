# 🚀 Jump App

Backend de **Jump**, la plataforma para la nueva generación de eventos underground en Lima y Latinoamérica 🌌

Construido con **Ruby on Rails 7** y **PostgreSQL**, en modo API.  
Este backend maneja la gestión de experiencias, tickets y promotores para la escena electrónica alternativa.

---

## 🧩 Stack técnico
- **Ruby** 3.3.5  
- **Rails** 7.1.5.2 (API mode)  
- **PostgreSQL** como base de datos  
- **Puma** como servidor  
- **Docker ready** (opcional)

---

## ⚙️ Cómo correr el proyecto localmente

```bash
bundle install
rails db:create db:migrate
rails s

---

## 🧠 Endpoints de ejemplo

Una vez que el servidor esté corriendo (`rails s`), puedes probar el API base:

### 🔹 Listar experiencias

> Devuelve un arreglo JSON con todas las experiencias creadas.

### 🔹 Crear una experiencia (ejemplo)

---

## 🚀 Despliegue futuro
- Preparado para **Docker** o despliegue en **Render**, **Fly.io**, o **Heroku (Buildpacks)**.
- API lista para conectar con **frontend React / Next.js / Vite** en la carpeta `frontend/`.

---

## 💡 Autor
**Jeremy André Barranzuela Condori**  
Proyecto: *Jump — Event Management Platform for Underground Scenes*  
GitHub: [@JBarranzuela](https://github.com/JBarranzuela)
