import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import "./styles/GlobalStyles.scss";
import { PersistGate } from "redux-persist/integration/react";
import { AlertProvider } from "./hooks/AlertContext.jsx";
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <AlertProvider>
                    <App />
                </AlertProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
