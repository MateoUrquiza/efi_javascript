📝 EFI – Práctica Profesionalizante I (JavaScript)
Frontend en React + Vite consumiendo API Flask con JWT

Este proyecto corresponde al trabajo final integrador de la materia Práctica Profesionalizante I – JavaScript.
El frontend está desarrollado con React + Vite, consumiendo una API REST construida en Flask con autenticación JWT.

🚀 Tecnologías Utilizadas

- React + Vite
- React Router DOM
- Bootstrap 5
- React Toastify
- Context API (manejo global de autenticación)
- Fetch API
- JWT (Bearer Token)

⚙️ Instalación y Ejecución

1️⃣ Clonar el repositorio
```bash
git clone git@github.com:MateoUrquiza/efi_javascript.git
cd efi_javascript
```
2️⃣ Instalar dependencias
```bash
npm install
```
3️⃣ Crear archivo .env
```bash
En la raíz del proyecto:

VITE_API_URL="http://127.0.0.1:5000"
```
4️⃣ Iniciar la aplicación
```bash
npm run dev
```
🔐 Autenticación

- El sistema utiliza JSON Web Tokens (JWT):
- Login y registro consumen la API Flask
- El token se guarda en localStorage
- AuthContext controla sesión, usuario y cierre de sesión
- Las rutas protegidas requieren token válido

🧩 Funcionalidades Principales

- Autenticación
- Registro de usuario
- Inicio de sesión
- Redirección automática
- Cierre de sesión

👥 Integrantes

- Mateo Urquiza

- Sebastián Maldonado

🏫 Institución

ITEC Río Cuarto
Práctica Profesionalizante I – JavaScript
