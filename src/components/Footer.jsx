import React from 'react'
import { getYear } from '../utils/helpers'

function Footer() {
    return (
        <footer className="text-center text-[12px]">
            <span>Developed by </span>{" "}
            <a
                href="https://github.com/henrymedeiros"
                target="_blank"
                className="hover-link"
            >
                Henry Medeiros
            </a>{" "}
            | API Data by{" "}
            <a
                href="https://ygoprodeck.com/"
                target="_blank"
                className="hover-link"
            >
                YGOPRODeck
            </a>
        </footer>
    )
}

export default Footer