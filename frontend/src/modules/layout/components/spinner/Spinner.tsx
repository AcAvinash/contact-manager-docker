import React from 'react';
import spinImg from "../../../../assets/img/spinner.gif";

export const Spinner: React.FC = () => {
    return (
        <>
            <div className="spinner">
                <img src={spinImg} alt=""/>
            </div>
        </>
    )
};
export default Spinner;