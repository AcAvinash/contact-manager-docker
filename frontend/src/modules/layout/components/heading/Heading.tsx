import React from 'react';

interface IProps {
    heading: string;
    color: string;
}

export const Heading: React.FC<IProps> = (props) => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className={`h3 ${props.color}`}>{props.heading}</p>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
                            facere fugit itaque labore,
                            maiores, maxime nobis quasi quisquam quod sapiente tempora tempore voluptatem. Debitis ea
                            enim et fuga nihil possimus qui. Corporis dolorem laborum magnam quam reiciendis, tempora
                            voluptate voluptates?</p>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Heading;