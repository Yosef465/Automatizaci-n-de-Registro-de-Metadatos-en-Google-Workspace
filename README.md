# 📁 Automatización de Registro de Metadatos en Google Workspace

Este proyecto integra Google Cloud Run y Google Apps Script para automatizar el registro de metadatos de archivos subidos a un bucket de Google Cloud Storage, almacenarlos en una hoja de cálculo de Google Sheets y enviar notificaciones por correo electrónico.

---

## 🎯 Objetivos del Proyecto

- Automatizar el registro de metadatos de archivos cargados en Cloud Storage.
- Centralizar esta información en una hoja de Google Sheets.
- Notificar por correo electrónico cada evento de carga.
- Aplicar buenas prácticas de integración entre servicios en la nube.

---

## ⚙️ Funcionalidades Desarrolladas

- Activación de una Cloud Function al subir un archivo a un bucket.
- Extracción y envío de metadatos (nombre, tipo, tamaño).
- Recepción de datos por Google Apps Script.
- Registro en Google Sheets con marca de tiempo.
- Envío automático de correo electrónico con detalles del archivo.

---

## 📋 Tecnologías Utilizadas

- **Google Cloud Platform**:
  - Cloud Storage
  - Cloud Run (usando Functions Framework)
- **Google Apps Script**:
  - SpreadsheetApp (Google Sheets)
  - GmailApp (correo)
- **Lenguajes**:
  - Python 3.10 (Cloud Run)
  - JavaScript (Apps Script)
- **Control de versiones**:
  - Git y GitHub

---

## 🧩 Desarrollo del Proyecto

### 1. Configuración del entorno en GCP

- Creación de un proyecto en GCP.
- Habilitación de APIs: Cloud Storage, Cloud Run, Logging.
- Configuración de permisos IAM y ciclo de vida del bucket.

### 2. Desarrollo en Cloud Run (Python)

- Se desarrolló una función en Python que se ejecuta al detectar un evento de subida.
- Extrae nombre, tamaño y tipo MIME del archivo.
- Envía estos datos a un script de Google Apps Script mediante una solicitud `POST` con token de autenticación.

### 3. Desarrollo en Google Apps Script

- El script recibe los metadatos del archivo.
- Los registra en una hoja de Google Sheets.
- Envía una notificación por correo electrónico al usuario especificado.

---

## 🔐 Medidas de Seguridad

- Validación de datos en cada etapa.
- Uso de token de autenticación en la comunicación entre servicios.
- Separación de responsabilidades: GCP gestiona ejecución segura; Apps Script actúa como receptor validado.

---

## 📝 Instrucciones de Ejecución

1. **Cloud Run**
   - Desplegar `main.py` con `functions-framework`.
   - Incluir `requirements.txt` con:
     ```
     functions-framework
     requests
     ```
   - Variables importantes:
     - `URL_SCRIPT`: URL del Web App de Apps Script.
     - `TOKEN_SECRETO`: valor compartido entre ambos servicios.

2. **Apps Script**
   - Crear un nuevo proyecto en [Google Apps Script](https://script.google.com/).
   - Reemplazar el contenido con el script provisto.
   - Publicar como Web App permitiendo acceso anónimo o autenticado.
   - Agregar el ID correcto de la hoja de cálculo y correo de destino.

---

## 📂 Estructura del Repositorio
├── main.py # Código Python para Cloud Run
├── requirements.txt # Dependencias para Functions Framework
├── apps_script.js # Código fuente del Google Apps Script
├── README.md # Documentación del proyecto
└── images/ # Capturas del funcionamiento

