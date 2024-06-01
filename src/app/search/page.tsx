"use client";

import SearchContext from "../../../context/search-context";
import {useContext} from "react";

export default function SearchPage() {

    const search = useContext(SearchContext);
    console.log(search);

    return (
        <div>
            <h1>Search Page</h1>
        </div>
    );
}