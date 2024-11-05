import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client/client";
import red from "../assets/red.webp";
import blue from "../assets/blue.webp";
import green from "../assets/green.webp";
import brown from "../assets/bown.webp";
import orange from "../assets/orange.webp";
import yellow from "../assets/yellow.webp";
import cyan from "../assets/cyan.webp";
import lime from "../assets/lime.webp";
import pink from "../assets/pink.webp";
import purple from "../assets/purple.webp";
import white from "../assets/white.webp";

const colorToImageMap = {
    red: red,
    blue: blue,
    green: green,
    brown: brown,
    orange: orange,
    yellow: yellow,
    cyan: cyan,
    lime: lime,
    pink: pink,
    purple: purple,
    white: white,
};

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

const EditCrewmate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [speed, setSpeed] = useState("");
    const [color, setColor] = useState("");
    const [crewmate, setCrewmate] = useState(null);

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase
                .from("crewmates")
                .select()
                .eq("id", id)
                .single();

            if (error) {
                console.error("Error fetching crewmate:", error);
            } else {
                setCrewmate(data);
                setName(data.name);
                setSpeed(data.speed);
                setColor(data.color);
            }
        };

        fetchCrewmate();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from("crewmates")
            .update({ name, speed, color })
            .eq("id", id);

        if (error) {
            console.error("Error updating crewmate:", error);
        } else {
            navigate("/crewmate-gallery");
        }
    };

    if (!crewmate) {
        return <div>Loading...</div>;
    }

    return (
        <div className='edit-crewmate-card'>
            <h1>Edit Crewmate</h1>
            <img
                src={colorToImageMap[crewmate.color] || white}
                alt={crewmate.name}
                className='crewmate-image'
            />
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
                <button type='submit'>Save</button>
            </form>
        </div>
    );
};

export default EditCrewmate;
