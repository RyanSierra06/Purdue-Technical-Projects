import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from "./components/NavBar.jsx"
import HomePage from "./pages/HomePage.jsx"
import WireMeshBackground from "./components/WireMeshBackground.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import ClubsPage from "./pages/ClubsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import SubmitPage from "./pages/SubmitPage.jsx";

function AppRoutes() {
    return (
        <>
            <WireMeshBackground />
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/Events" element={<EventsPage />}/>
                <Route path="/Clubs" element={<ClubsPage />}/>
                <Route path="/Projects" element={<ProjectsPage />}/>
                <Route path="/Submit" element={<SubmitPage />}/>
            </Routes>
        </>
    )
}

export default function App() {
    return (
        <BrowserRouter basename="/Purdue-Technical-Projects">
            <AppRoutes />
        </BrowserRouter>
    )
}
