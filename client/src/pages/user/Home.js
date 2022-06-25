import React, { useEffect } from 'react'
import { Header, Footer, Banner } from '../../components';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate('/login');
        } else {
            if (localStorage.getItem("type") !== "user") {
                navigate('/company/create-job');
            }
        };
    }, []);

    return (
        <div className="">
            <div className="fixed z-[5] w-full"><Header /></div>
            <Banner />
            <Footer />
        </div>
    )
}

export default Home