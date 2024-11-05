import React, { useState } from "react";
import { supabase } from "../client/client";
import colors from "../assets/colors.webp";

const colorOptions = {
    red: "Red",
    blue: "Blue",
    green: "Green",
    brown: "Brown",
    orange: "Orange",
    yellow: "Yellow",
    cyan: "Cyan",
    lime: "Lime",
    pink: "Pink",
    purple: "Purple",
    white: "White",
};

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
        <div className='create-crewmate-card'>
            <h1>Create a Crewmate</h1>
            <img src={colors} alt='Among Us Crewmate Colors' />
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
                    <select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                    >
                        <option value=''>Select a color</option>
                        {Object.entries(colorOptions).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    );
};

export default CreateCrewmate;
