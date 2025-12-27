import React from 'react';
import NavBar from "../navbar/NavBar";
import image from "../../../../assets/img/404.jpg";

export const NotFound404: React.FC = () => {
    return (
        <>
            <NavBar heading={"React Routing"} color={'bg-success'}/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <img src={image} alt="" className="m-auto d-block"/>
                    </div>
                </div>
            </div>
        </>
    )
};
export default NotFound404;