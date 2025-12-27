import React from 'react';

interface IProps {
    message: string;
}

export const ErrorMessage: React.FC<IProps> = (props) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <small className="text-danger">{props.message}</small>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ErrorMessage;