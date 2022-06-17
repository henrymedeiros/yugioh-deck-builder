const CardItem = ({ cardData, index}) => {
  return (
    <div className="cardItem" >
        {/*<div>INDEX: {index}</div>*/}
        <img src={cardData.imgUrl} alt="" />
        
        
      
    </div>
  );
};

export default CardItem;
