import React from "react";

const CardItem = ({ cardData, index, onClick }) => {
    return (
        <div
            className="cardItem"
            onClick={() => {
                onClick(index);
            }}
        >
            <img src={cardData.imgUrl} alt="" />
        </div>
    );

    
};

CardItem.defaultProps = {
    onClick: () => {},
}

export default CardItem;
