# 🎨 Real-Time Collaborative Whiteboard

A simple, real-time collaborative whiteboard application built with Node.js, Express, and Socket.IO. This project allows multiple users to draw on the same canvas simultaneously, with changes appearing instantly on everyone's screen.

## ✨ Features

- **Real-Time Collaboration**: Drawings are synchronized across all connected clients in real-time.
- **Color Picker**: Choose your desired brush color.
- **Adjustable Line Width**: Control the thickness of your lines.
- **Clear Canvas**: A button to clear the whiteboard for all users.
- **Simple & Lightweight**: Built with a minimal set of technologies for easy understanding and setup.

## 🛠️ Technology Stack

- **Backend**:
  - **Node.js**: JavaScript runtime environment.
  - **Express**: Web framework for serving the application.
  - **Socket.IO**: Library for real-time, bidirectional, and event-based communication.
- **Frontend**:
  - **HTML5 Canvas**: For the drawing interface.
  - **CSS3**: For styling the application.
  - **JavaScript**: To handle user interactions and client-side socket communication.

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd whiteboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    node server.js
    ```

4.  **Open the application:**
    Open your web browser and navigate to `http://localhost:3000`. To see the real-time collaboration in action, open the same URL in another browser window or on another device.

## 📝 How It Works

1.  **Server Setup**: An Express server is set up to serve the static frontend files (`index.html`, `style.css`, `client.js`).
2.  **WebSocket Connection**: When a user opens the application, the client-side JavaScript establishes a WebSocket connection to the server using Socket.IO.
3.  **Drawing**:
    - When a user draws on the canvas, the client captures the mouse events.
    - The drawing coordinates, along with color and line width, are packaged into a data object.
    - This data is sent to the server via a `drawing` event.
4.  **Broadcasting**:
    - The server listens for `drawing` events from any client.
    - Upon receiving a `drawing` event, the server broadcasts the data to **all other connected clients**.
5.  **Synchronization**:
    - Each client listens for incoming `drawing` events from the server.
    - When a client receives drawing data, it renders the line on its own canvas, thus keeping all whiteboards in sync.

## 📂 Project Structure
```
/whiteboard
|-- /public
|   |-- index.html      # The main HTML file
|   |-- style.css       # CSS for styling
|   |-- client.js       # Frontend JavaScript for drawing and socket logic
|-- node_modules/       # Project dependencies (ignored by Git)
|-- .gitignore          # Specifies files to be ignored by Git
|-- package.json        # Project metadata and dependencies
|-- package-lock.json   # Records exact versions of dependencies
|-- server.js           # The backend server code
|-- README.md           # This file
``` 