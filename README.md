# 🌐 Proyecto Cliente-Servidor en Tiempo Real con Node.js, Express, Babylon.js y Colyseus.js

Este proyecto implementa una arquitectura **cliente-servidor** que permite la comunicación en tiempo real, utilizando **Node.js** y **Express** en el lado del servidor, **Babylon.js** en el cliente para la representación 3D, y **Colyseus.js** para la sincronización de eventos multijugador.

## 🚀 Tecnologías Utilizadas

### Backend (Servidor) 🖥️
- **Node.js** ![Node.js version](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-green)
- **Express.js** ![Express.js version](https://img.shields.io/badge/Express.js-%5E4.17.1-blue)
- **Colyseus** ![Colyseus version](https://img.shields.io/badge/Colyseus-0.15.17-yellow)

### Frontend (Cliente) 🎮
- **Babylon.js** ![Babylon.js version](https://img.shields.io/badge/Babylon.js-7.26.2-orange)
- **Colyseus.js** ![Colyseus.js version](https://img.shields.io/badge/Colyseus.js-0.15.26-yellow)

## 📁 Estructura del Proyecto

El proyecto está dividido en dos componentes principales: **cliente** y **servidor**. A continuación se detalla la estructura básica del proyecto:

```
📦 Proyecto
├── client/                # Código fuente del cliente (Vite + Babylon.js)
│   ├── public/            # Archivos estáticos del cliente
│   └── src/               # Código fuente del cliente
│       ├── core/          # Configuración de la escena y motor gráfico
│       ├── network/       # Comunicación en tiempo real con Colyseus.js
│       └── player/        # Lógica relacionada con los jugadores
└── server/                # Código fuente del servidor (Node.js + Colyseus)
    ├── rooms/             # Lógica de las salas de Colyseus
    ├── routes/            # Definición de rutas HTTP con Express
    ├── services/          # Servicios auxiliares del servidor
    └── types/             # Tipos y definiciones para TypeScript
```

## 🛠️ Instalación y Uso

### Prerrequisitos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (>=14.0.0)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/alenavarroxp/babylon-colyseus.git
    cd babylon-colyseus
    ```

2. Instala las dependencias del servidor y del cliente:

    ```bash
    # Instalar dependencias del servidor desde directorio padre
    cd server
    npm install
    # o yarn install

    # Instalar dependencias del cliente desde directorio padre
    cd client
    npm install
    # o yarn install
    ```

### Uso

1. Inicia el servidor en una terminal:

    ```bash
    npm run server
    # o yarn server
    ```

2. Inicia el cliente en otra terminal:

    ```bash
    npm run client
    # o yarn client
    ```

3. Abre tu navegador y navega a `http://localhost:3000/colyseus` para ver la consola de colyseus.
4. Abre una nueva pestaña y navega a `http://localhost:5173` para acceder al sistema como cliente.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

