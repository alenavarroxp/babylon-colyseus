# 🌐 Client-Server Project in Real Time with Node.js, Express, Babylon.js y Colyseus.js

This project implements a **client-server** architecture that enables real-time communication, using **Node.js** and **Express** on the server side, **Babylon.js** on the client for 3D rendering, and **Colyseus.js** for multiplayer event synchronization.

## 🚀 Technologies Used

### Backend (Server) 🖥️
- **Node.js** ![Node.js version](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-green)
- **Express.js** ![Express.js version](https://img.shields.io/badge/Express.js-%5E4.17.1-blue)
- **Colyseus** ![Colyseus version](https://img.shields.io/badge/Colyseus-0.15.17-yellow)

### Frontend (Client) 🎮
- **Babylon.js** ![Babylon.js version](https://img.shields.io/badge/Babylon.js-7.26.2-orange)
- **Colyseus.js** ![Colyseus.js version](https://img.shields.io/badge/Colyseus.js-0.15.26-yellow)

## 📁 Project Structure

The project is divided into two main components: **client** and **server**. Below is the basic project structure:

```
📦 Project
├── client/                # Client source code (Vite + Babylon.js)
│   ├── public/            # Client static files
│   └── src/               # Client source code
│       ├── core/          # Scene and graphics engine configuration
│       ├── network/       # Real-time communication with Colyseus.js
│       └── player/        # Player-related logic
└── server/                # Server source code (Node.js + Colyseus)
    ├── rooms/             # Colyseus room logic
    ├── routes/            # HTTP route definitions with Express
    ├── services/          # Server auxiliary services
    └── types/             # Types and definitions for TypeScript
```

## 🛠️ Installation and Usage

### Prerequisites

Make sure you have the following programs installed:

- [Node.js](https://nodejs.org/) (>=14.0.0)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/alenavarroxp/babylon-colyseus.git
    cd babylon-colyseus
    ```

2. Install server and client dependencies:

    ```bash
    # Install server dependencies from parent directory
    cd server
    npm install
    # or yarn install

    # Install client dependencies from parent directory
    cd client
    npm install
    # or yarn install
    ```

### Usage

1. Start the server in one terminal:

    ```bash
    npm run server
    # or yarn server
    ```

2. Start the client in another terminal:

    ```bash
    npm run client
    # or yarn client
    ```

3. Open your browser and navigate to `http://localhost:3000/colyseus` to see the Colyseus console.
4. Open a new tab and navigate to `http://localhost:5173` to access the system as a client.

## 🤝 Contributions

Contributions are welcome! If you want to contribute, please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to your fork (`git push origin feature/new-feature`).
5. Open a Pull Request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

