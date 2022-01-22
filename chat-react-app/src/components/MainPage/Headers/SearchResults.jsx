import React, { useState, useEffect } from "react";

const SearchResults = ({ listNames = [], searchedName, setClickedName, setBarIsEmpty }) => {
    const [displayedNames, setDisplayedNames] = useState(listNames);

    useEffect(() => {
        if (searchedName === "") {
            setDisplayedNames(null);
        } else {
            setDisplayedNames(
                listNames?.filter((nameObject) => {
                    return nameObject.uid
                        .toLowerCase()
                        .includes(searchedName.toLowerCase());
                })
            );
        }
    }, [listNames, searchedName]);

    return (
        <div className="position-absolute w-100">
            <ul className="border border-primary w-100 bg-light list-unstyled p-3">
                {displayedNames?.map((nameObject) => (
                    <li key={nameObject.id} className="pe-auto">
                        <a onClick={() => {setClickedName(nameObject); setBarIsEmpty(true)}}
                        className="p-1 text-decoration-none pe-auto"> {nameObject.uid} - {nameObject.class}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
