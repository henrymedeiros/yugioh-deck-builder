const CardItem = ({ name, type, race, attribute, level, atk, def, imgUrl }) => {
  return (
    <div className="cardItem">
      <div>
        <img src={imgUrl} alt="" />
        <div>{name}</div>
        <div>{type}</div>
        <div>
          {type.toLowerCase().includes("monster") ? (
            <div>
              <span>{attribute}</span>-<span>{race}</span>
              <div>{level}</div>
              <span>
                {atk}/{def}
              </span>
            </div>
          ) : (
            <span>Spell/Trap</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;
