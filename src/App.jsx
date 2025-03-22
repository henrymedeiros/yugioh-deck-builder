import "../src/styles/globals.scss";

import CardInfo from "./components/CardInfo.jsx";
import CardsSearch from "./components/CardsSearch.jsx";
import Decks from "./components/Decks.jsx";

import NavBar from "./components/NavBar.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx";
import { ToastContainer } from "react-toastify";

import { getYear } from "./utils/helpers.js";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <div className="app">
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                theme="dark"
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
    );
}
export default App;
