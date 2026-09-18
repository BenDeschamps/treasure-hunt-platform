import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import DecoderPage from "./pages/decoderPage";
import Menu from "./components/menu/menu";

function App() {
    return (
        <BrowserRouter>
            <Menu />

            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/decoders" element={<DecoderPage />} />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;