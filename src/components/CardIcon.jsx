import React from 'react'
import { mainDeckTypes, extraDeckMonsterTypes } from '../lib/constants'

function CardIcon({cardType}) {
    let bgColor = ''
    if (cardType === mainDeckTypes.EFFECT_MONSTER) {
        bgColor = 'bg-[#b35627]'
    }
    if (cardType === mainDeckTypes.SPELL_CARD) {
        bgColor = 'bg-[#279891]'
    }
    if (cardType === mainDeckTypes.TRAP_CARD) {
        bgColor = 'bg-[#a61b71]'
    }
    if (cardType === mainDeckTypes.NORMAL_MONSTER) {
        bgColor = 'bg-[#bb9443]'
    }
    if (cardType === mainDeckTypes.RITUAL_MONSTER || cardType === mainDeckTypes.RITUAL_EFFECT_MONSTER) {
        bgColor = 'bg-[#4a72b6]'
    }
    if (cardType === extraDeckMonsterTypes.XYZ_MONSTER) {
        bgColor = 'bg-[#1c1b1d]'
    }
    if (cardType === extraDeckMonsterTypes.SYNCHRO_MONSTER) {
        bgColor = 'bg-[#e1dfde]'
    }
    if (cardType === extraDeckMonsterTypes.FUSION_MONSTER) {
        bgColor = 'bg-[#8c4c9a]'
    }
    if (cardType === extraDeckMonsterTypes.LINK_MONSTER) {
        bgColor = 'bg-[#0c427d]'
    }
  return (
    <div className={`${bgColor} h-[24px] w-[17px] flex items-center justify-center`}>
        <div className='bg-black rounded-[50%] w-[50%] h-[60%]'></div>
    </div>
  )
}

export default CardIcon