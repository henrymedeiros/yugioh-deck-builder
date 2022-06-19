const CardItem = ({ cardData, index}) => {
  return (
    <div className="cardItem" >
        {/*<div>INDEX: {index}</div>*/}
        {/*cardData.id*/}
        <img src={cardData.imgUrl} alt="" />
        
        
      
    </div>
  );
};

export default CardItem;
