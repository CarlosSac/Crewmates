import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const CrewmateDetail = () => {
    const { id } = useParams();
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
            }
        };

        fetchCrewmate();
    }, [id]);

    if (!crewmate) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{crewmate.name}</h1>
            <img
                src={colorToImageMap[crewmate.color] || "/assets/white.webp"}
                alt={crewmate.name}
                className='crewmate-image'
            />
            <p>Speed: {crewmate.speed}</p>
            <p>Color: {crewmate.color}</p>
        </div>
    );
};

export default CrewmateDetail;
