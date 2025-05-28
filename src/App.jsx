import "../src/styles/globals.scss";

import CardInfo from "./components/CardInfo.jsx";
import CardsSearch from "./components/CardsSearch.jsx";
import Decks from "./components/Decks.jsx";

import NavBar from "./components/NavBar.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router } from "react-router-dom";

import { getYear } from "./utils/helpers.js";
import Footer from "./components/Footer.jsx";
import React from "react";

function App() {
    return (
        <Router>
            <div className="app">
                <ToastContainer
                    position="bottom-left"
                    autoClose={2000}
                    theme="dark"
                    limit={1}
                    preventDuplicates
                />
                <NavBar></NavBar>
                <div className="appSections">
                    <CardInfo></CardInfo>

                    <Decks></Decks>
                    <SearchProvider>
                        <CardsSearch></CardsSearch>
                    </SearchProvider>
                </div>
                <Footer></Footer>
            </div>
        </Router>
    );
}
export default App;
