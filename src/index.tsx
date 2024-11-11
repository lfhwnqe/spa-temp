import './wdyr';
import { createRoot } from "react-dom/client";
import App from "@pages/app";
import Todo from '@pages/todo/todo'
import { BrowserRouter } from "react-router-dom";
import "./style.css";

const container = document.getElementById("app");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <App /> */}
    <Todo />
    
  </BrowserRouter>
  // </React.StrictMode>
);
