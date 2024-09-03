import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeContext } from "./context/ThemeContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ThemeContext>
        <App />
      </ThemeContext>
    </DndProvider>
  </React.StrictMode>
);
