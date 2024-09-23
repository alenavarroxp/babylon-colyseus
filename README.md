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

