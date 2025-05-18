import React from "react";

const CardItem = ({ cardData, index, onClick, onLoad }) => {
    return (
        <div
            className="cardItem"
            onClick={() => {
                onClick(index);
            }}
        >
            <img src={cardData.imgUrl} alt="" onLoad={onLoad}/>
        </div>
    );

    
};

CardItem.defaultProps = {
    onClick: () => {},
}

export default CardItem;
