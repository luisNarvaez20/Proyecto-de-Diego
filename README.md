# Proyecto de Login

Este proyecto implementa un sistema de autenticación y autorización utilizando Node.js, Express, MongoDB y JWT.

### Requisitos Previos

- Node.js
- Docker
- Kubernetes

### Integrantes

- Diego Riofrio
- Ronald Cuenca
- Kevin Jaramillo

### Variables de Entorno

Variables necesarias para el funcionamiento del login:

- `MONGO_URI`: URI de conexión con MongoDB (obligatorio)
- `JWT_SECRET`: Frase secreta para JsonWebToken (obligatorio)
- `NODE_SENDING_EMAIL_ADDRESS`: Email para envío de correo
- `NODE_SENDING_EMAIL_PASSWORD`: Contraseña del correo (requiere Contraseña de aplicación)
- `HMAC_VERIFICATION_CODE_SECRET`: Frase secreta para generar hashes por HMAC (obligatorio)
- `NODE_TLS_REJECT_UNAUTHORIZED`: (0/1) Permite el tráfico de TLS no verificado (recomendado solo para desarrollo)

### Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/DJRP-U/PIS6TO_microservicios.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd ./Servicios/Login
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

### Uso

1. Configura las variables de entorno en un archivo `.env` en la raíz del proyecto.
2. Inicia el servidor:
    ```sh
    npm start
    ```

### Endpoints

- `POST /signup`: Registro de nuevos usuarios.
- `POST /signin`: Inicio de sesión de usuarios.
- `POST /signout`: Cierre de sesión de usuarios.
- `POST /sendVerificationEmail`: Envío de correo de verificación.
- `POST /verifyVerificationCode`: Verificación del código de verificación.
- `POST /resetPassword`: Restablecimiento de contraseña. (WIP)
- `POST /changePasswordEmail`: Cambio de contraseña mediante correo electrónico. (WIP)
- `POST /verifyPasswordEmailCode`: Verificación del código de cambio de contraseña. (WIP)

### Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.
