import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";
import CreateCrewmate from "./components/create";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const Home = () => <div>Home Page</div>;
const CrewmateGallery = () => <div>Crewmate Gallery Page</div>;

function App() {
    const [count, setCount] = useState(0);

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
