import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CrewmateGallery = () => {
    const [crewmates, setCrewmates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCrewmates = async () => {
            const { data, error } = await supabase
                .from("crewmates")
                .select()
                .order("created_at", { ascending: true });

            if (error) {
                console.error("Error fetching crewmates:", error);
            } else {
                setCrewmates(data);
            }
        };

        fetchCrewmates();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id) => {
        const { error } = await supabase
            .from("crewmates")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting crewmate:", error);
        } else {
            setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
        }
    };

    const handleViewDetail = (id) => {
        navigate(`/crewmate/${id}`);
    };

    return (
        <div>
            <h1>Crewmate Gallery</h1>
            <div className='crewmate-gallery'>
                {crewmates.map((crewmate) => (
                    <div key={crewmate.id} className='crewmate-card'>
                        <img
                            src={colorToImageMap[crewmate.color] || white}
                            alt={crewmate.name}
                            className='crewmate-image'
                            onClick={() => handleViewDetail(crewmate.id)}
                            style={{ cursor: "pointer" }}
                        />
                        <h2>{crewmate.name}</h2>
                        <p>Speed: {crewmate.speed} mph</p>
                        <p>Color: {crewmate.color}</p>
                        <button onClick={() => handleEdit(crewmate.id)}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(crewmate.id)}>
                            Delete/Eject
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CrewmateGallery;
