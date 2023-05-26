import React, { useEffect, useState } from 'react';

export const Home = () => {

    const [username, setUsername] = useState("");

    useEffect(() => {
        let user = localStorage.getItem("loggedInUser");
        if (user) user = JSON.parse(user);
        setUsername(user ? user.username : '');
    }, []);

    return <h1>{username ? `Welcome ${username}` : "You are not logged-in"}</h1>
}