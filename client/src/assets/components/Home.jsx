import React from "react";
import Login from "./Login";
import Register from "./Register";

function Home() {
    return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch',
                justifyContent: 'space-around',
                height:'80vh'
            }}>
                <Login />
                <Register />
            </div>
    )
}

export default Home