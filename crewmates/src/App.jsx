import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";
import CreateCrewmate from "./components/create";
import CrewmateGallery from "./components/crewmateGallery";
import EditCrewmate from "./components/editCrewmate";
import CrewmateDetail from "./components/crewmateDetail";
import walk from "./assets/walking.webp";

const Home = () => (
    <div>
        <h1>Welcome to Crewmate Creator!</h1>
        <h2>
            Here is where you can create your very own set of crewmates before
            sending them off into space!
        </h2>
        <img src={walk} alt='Among Us Crewmates' />
    </div>
);

function App() {
    return (
        <Router>
            <Navbar />
            <div className='main-content'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='/create-crewmate'
                        element={<CreateCrewmate />}
                    />
                    <Route
                        path='/crewmate-gallery'
                        element={<CrewmateGallery />}
                    />
                    <Route path='/edit/:id' element={<EditCrewmate />} />
                    <Route
                        path='/crewmate/:id'
                        element={<CrewmateDetail />}
                    />{" "}
                    {/* Add the new route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
