import React, {useContext} from 'react';
import { HoverCardContext } from '../contexts/HoverCardContext';

const CardContentColumn = () => {
const {cardHovered} = useContext(HoverCardContext)

if (cardHovered === null) return <div></div>
  return (
    <div>
     {cardHovered.name}
     <img src={cardHovered.imgUrl} alt="" />
    </div>
  );
};

export default CardContentColumn;
