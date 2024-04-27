import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import useAuthStore from "./services/store/authStore.ts";
 
useAuthStore.getState().currentUser();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <App />
);
