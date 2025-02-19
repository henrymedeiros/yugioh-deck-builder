import React from 'react'

function AreaTitle({id, title, areaCardCount}) {
  return (
    <div id={id} className='border-1 border-black'>{title} { areaCardCount != null && <span>[{areaCardCount}]</span> }</div>
  )
}

AreaTitle.defaultProps = {
  areaCardCount: null
}

export default AreaTitle