const CardContentColumn = ({ cardHovered }) => {
  if (cardHovered == null) return <span>Nada</span>
  return (
    <div>
      <span>{cardHovered.name}</span>
      <img src={cardHovered.imgUrl}></img>
      
    </div>
  );
};

export default CardContentColumn;
