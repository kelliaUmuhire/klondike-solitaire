import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import { PageContext } from "./context/CardContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <PageContext>
        <App />
      </PageContext>
    </DndProvider>
  </React.StrictMode>
);
