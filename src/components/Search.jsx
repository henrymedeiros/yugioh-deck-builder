import React from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useEffect } from "react";
import axios from "axios";
import { API_RESULTS_LIMIT, ATTRIBUTES, LEVELS } from "../lib/constants";
import { useDebounce } from "../hooks/hooks";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    const { search, setSearch } = useSearchContext();
    const [searchParams, setSearchParams] = useSearchParams({});

    const fname = searchParams.get("fname") || "";
    const level = searchParams.get("level") || "";
    const attribute = searchParams.get("attribute") || "";
    const num = searchParams.get("num") || "";
    const offset = searchParams.get("offset") || "";

    const debouncedFname = useDebounce(fname, 400);

    const getData = (url, mode='search') => {
        setSearch((prev) => ({
            ...prev,
            loadingSearch: true, // Set loading to true at the start
        }));
        axios
            .get(url)
            .then((response) => {
                const data = response.data;
                const cardsData = data.data;
                const metaData = data.meta;
                setSearch((prev) => ({
                    ...prev,
                    searchResults: mode==="search" ? cardsData : [...prev.searchResults, ...cardsData] ,
                    searchResultsMetaData: metaData,
                    loadingSearch: false, // Set loading to false on successful response
                }));
            })
            .catch((err) => {
                console.error("ERROR", err);
                setSearch((prev) => ({
                    ...prev,
                    loadingSearch: false, // Set loading to false on error
                }));
            });
    };
    useEffect(() => {
        if (!debouncedFname || debouncedFname.length === 0) {
            return;
        }

        const queryString = searchParams.toString();

        getData(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${queryString}`, 'search');

    }, [debouncedFname, level, attribute]); 

    useEffect(() => {
        if (!debouncedFname || debouncedFname.length === 0) {
            return;
        }

        const queryString = searchParams.toString();
        getData(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${queryString}`, 'loadMore');
    }, [num, offset]); // Only depend on the values that matter

    const handleSearchParamChange = (paramName, value) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            if (value && value !== "no_level" && value !== "no_attribute") {
                newParams.set(paramName, value);
            } else {
                newParams.delete(paramName);
            }
            newParams.set("num", API_RESULTS_LIMIT);
            newParams.set("offset", 0);
            return newParams;
        });
    };

    return (
        <div className="Search">
            <input
                type="text"
                placeholder="Enter a card name..."
                value={fname}
                onChange={(e) =>
                    handleSearchParamChange("fname", e.target.value)
                }
            ></input>
            <div className="search-filters">
                Filters:
                <div className="filters-container">
                    <div className="level-filter filter-option">
                        Level:
                        <select
                            name="filterLevel"
                            id="filterLevel"
                            value={level || "no_level"}
                            onChange={(e) =>
                                handleSearchParamChange("level", e.target.value)
                            }
                            className="p-1.5"
                        >
                            {LEVELS.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="attribute-filter filter-option">
                        Attribute:
                        <select
                            name="filterAttribute"
                            id="filterAttribute"
                            defaultValue={"no_attribute"}
                        >
                            {ATTRIBUTES.map((attribute) => (
                                <option key={attribute} value={attribute}>
                                    {attribute}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
