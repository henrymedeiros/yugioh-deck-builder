import React from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useEffect } from "react";
import axios from "axios";
import { ATTRIBUTES, LEVELS } from "../lib/constants";

const Search = () => {
    const { search, setSearch } = useSearchContext();

    const getData = (url) => {
        axios
            .get(url)
            .then((response) => {
                let data = response.data.data;
                console.log(data);
                // Update only the searchResults
                setSearch((prev) => ({
                    ...prev,
                    searchResults: data,
                    searchError: false,
                }));
            })
            .catch((err) => {
                console.error("ERROR", err.response.data.error);
                setSearch((prev) => ({
                    ...prev,
                    searchResults: [],
                    searchError: true,
                }));
            });
    };

    useEffect(() => {
        if (search.searchQuery.length >= 3) {
            getData(
                `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${search.searchQuery}`
            );
        } else {
            return;
        }
    }, [search.searchQuery]);

    const handleSearchBarInput = (e) => {
        let currentQuery = search.searchQuery;
        let cardNameValue = e.target.value;

        let newQuery = currentQuery.replace(
            currentQuery.split("&")[0],
            cardNameValue
        );

        return newQuery;
    };

    const handleQueryParam = (e, prevQuery, queryParam) => {
        console.log("e.target.value", e.target.value);
        console.log("prevQuery", prevQuery);

        if (!prevQuery.includes(queryParam)) {
            let newQuery = prevQuery + "&" + queryParam + "=" + e.target.value;
            console.log("newQuery", newQuery);
            return newQuery;
        }

        let params = prevQuery.split("&");

        for (let param of params) {
            if (param.includes(queryParam)) {
                console.log("need to replace this param: ", param);
                return prevQuery.replace(
                    param,
                    queryParam + "=" + e.target.value
                );
            }
        }
    };

    

    return (
        <div className="Search">
            <input
                type="text"
                placeholder="Enter a card name..."
                onChange={(e) =>
                    setSearch((prev) => ({
                        ...prev,
                        searchQuery: handleSearchBarInput(e),
                    }))
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
                            onChange={(e) =>
                                setSearch((prev) => ({
                                    ...prev,
                                    searchQuery: handleQueryParam(
                                        e,
                                        prev.searchQuery,
                                        "level"
                                    ),
                                }))
                            }
                            defaultValue={"no_level"}
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
                            onChange={(e) =>
                                setSearch((prev) => ({
                                    ...prev,
                                    searchQuery: handleQueryParam(
                                        e,
                                        prev.searchQuery,
                                        "attribute"
                                    ),
                                }))
                            }
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
