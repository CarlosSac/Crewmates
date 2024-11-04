import React, { useState } from "react";
import { supabase } from "../client/client";

const CreateCrewmate = () => {
    const [name, setName] = useState("");
    const [speed, setSpeed] = useState("");
    const [color, setColor] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("crewmates")
            .insert([{ name, speed, color }]);

        if (error) {
            console.error("Error creating crewmate:", error);
        } else {
            console.log("New Crewmate:", data);
            window.location = "/";
        }
    };

    return (
        <div>
            <h2>Create a Crewmate</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Speed:</label>
                    <input
                        type='number'
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Color:</label>
                    <input
                        type='text'
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Create Crewmate</button>
            </form>
        </div>
    );
};

export default CreateCrewmate;
