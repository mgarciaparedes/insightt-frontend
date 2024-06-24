import ReactDOM from "react-dom/client";
import App from "./router/App.tsx";
import "./index.css";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = baseUrl;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
