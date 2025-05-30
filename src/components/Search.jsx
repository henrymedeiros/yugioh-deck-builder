import React from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useEffect, useRef } from "react";
import axios from "axios";
import {
    allCardTypes,
    API_RESULTS_LIMIT,
    ATTRIBUTES,
    LEVELS,
    NO_CARDS_FOUND_MESSAGE,
} from "../lib/constants";
import { useDebounce } from "../hooks/hooks";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    const { search, setSearch } = useSearchContext();
    const [searchParams, setSearchParams] = useSearchParams({});

    // Get all search parameters with proper fallbacks
    const fname = searchParams.get("fname") || "";
    const level = searchParams.get("level") || "";
    const attribute = searchParams.get("attribute") || "";
    const type = searchParams.get("type") || "";
    const num = searchParams.get("num") || API_RESULTS_LIMIT;
    const offset = searchParams.get("offset") || "0";

    const searchInputRef = useRef(null);
    let debouncedFname = useDebounce(fname, 400);

    const noSearchParams = searchParams.size === 0;

    const getData = (url, mode = "search") => {
        // Set loading states based on mode
        setSearch((prev) => ({
            ...prev,
            loadingSearch: mode === "search", // Only true for search mode
            loadingMore: mode === "loadMore", // Only true for loadmore mode
            searchError: "", // Clear previous errors
        }));

        axios
            .get(url)
            .then((response) => {
                const data = response.data;
                const cardsData = data.data || [];
                const metaData = data.meta || {};

                setSearch((prev) => ({
                    ...prev,
                    searchResults:
                        mode === "search"
                            ? cardsData 
                            : [...prev.searchResults, ...cardsData], 
                    searchResultsMetaData: metaData,
                    loadingSearch: false,
                    loadingMore: false,
                }));
            })
            .catch((error) => {
                const errorMessage =
                    error.response?.data?.error || "Unknown Error";
                setSearch((prev) => ({
                    ...prev,
                    searchResults: mode === "search" ? [] : prev.searchResults, // Only clear on search error
                    searchError: errorMessage.includes(NO_CARDS_FOUND_MESSAGE)
                        ? NO_CARDS_FOUND_MESSAGE
                        : "Unknown Error",
                    loadingSearch: false,
                    loadingMore: false,
                }));
            });
    };

    function loadMore(queryString) {
        setSearch((prev) => ({
            ...prev,
            loadingMore: true,
            searchError: "",
        }));
        axios
            .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${queryString}`)
            .then((response) => {
                const data = response.data;
                const cardsData = data.data || [];
                const metaData = data.meta || {};

                setSearch((prev) => ({
                    ...prev,
                    searchResults: [...prev.searchResults, ...cardsData],
                    searchResultsMetaData: metaData,
                    loadingMore: false,
                }));
            })
            .catch((error) => {
                const errorMessage =
                    error.response?.data?.error || "Unknown Error";
                setSearch((prev) => ({
                    ...prev,
                    searchResults: [],
                    searchError: errorMessage.includes(NO_CARDS_FOUND_MESSAGE)
                        ? NO_CARDS_FOUND_MESSAGE
                        : "Unknown Error",
                    loadingMore: false,
                }));
            });
    }

    // Handle initial search and filter changes
    useEffect(() => {
        if (noSearchParams) {
            setSearch((prev) => ({
                ...prev,
                searchResults: [],
                searchResultsMetaData: null,
            }));
            return;
        }

        const queryString = searchParams.toString();
        getData(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?${queryString}`,
            "search"
        );
    }, [debouncedFname, level, attribute, type]);

    // Handle pagination
    useEffect(() => {
        if (noSearchParams) return;

        const queryString = searchParams.toString();

        getData(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?${queryString}`,
            "loadMore"
        );
    }, [num, offset]);

    const handleSearchParamChange = (paramName, value) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            if (value && value !== "no_level" && value !== "no_attribute") {
                newParams.set(paramName, value);
            } else {
                newParams.delete(paramName);
            }
            // Reset pagination when filters change
            newParams.set("num", API_RESULTS_LIMIT);
            newParams.set("offset", "0");
            return newParams;
        });
    };

    const handleClearFilters = () => {
        debouncedFname = "";
        setSearchParams(new URLSearchParams());
        setSearch((prev) => ({
            ...prev,
            searchResults: [],
            searchResultsMetaData: null,
        }));
    };

    return (
        <div className="Search">
            <div className="searchBar">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Enter a card name..."
                    value={fname}
                    onChange={(e) =>
                        handleSearchParamChange("fname", e.target.value)
                    }
                />
                {fname && (
                    <button
                        className="clearSearch"
                        onClick={() => handleSearchParamChange("fname", "")}
                    >
                        X
                    </button>
                )}
            </div>

            <div className="search-filters">
                Filters:
                <div className="filters-container">
                    <div className="filters-container-1">
                        <div className="card-type-filter filter-option">
                            Type:
                            <select
                                name="filterType"
                                value={type}
                                onChange={(e) =>
                                    handleSearchParamChange(
                                        "type",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">All Types</option>
                                {Object.values(allCardTypes).map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={handleClearFilters}>
                            Clear Filters
                        </button>
                    </div>
                    <div className="filters-container-2">
                        {type.toLowerCase().includes("monster") && (
                            <>
                                <div className="level-filter filter-option">
                                    Level:
                                    <select
                                        name="filterLevel"
                                        value={level || ""}
                                        onChange={(e) =>
                                            handleSearchParamChange(
                                                "level",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Any Level</option>
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
                                        value={attribute || ""}
                                        onChange={(e) =>
                                            handleSearchParamChange(
                                                "attribute",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Any Attribute</option>
                                        {ATTRIBUTES.map((attr) => (
                                            <option key={attr} value={attr}>
                                                {attr}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
