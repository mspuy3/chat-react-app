import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useNavigate } from "react-router";

import { listChannels, listUsers } from "../../api/slack-api";

import ChatListWindow from "./ChatListWindow";
import ChatWindow from "./ChatWindow";
import SearchResults from "./Headers/SearchResults";

const API_URL = "https://slackapi.avionschool.com/api/v1";

const MainPage = () => {
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("headers") == null) {
            navigate(`../`, { replace: true });
        }
    }, []);

    function signOut() {
        localStorage.clear();
        navigate(`../`, { replace: true });
    }

    useEffect(() => {
        let headerData = JSON.parse(localStorage.getItem("headers"));
        listUsers(headerData);
        listChannels(headerData);
    },[])

    let userData = JSON.parse(localStorage.getItem("data"));
    let headerData = JSON.parse(localStorage.getItem("headers"));
    listUsers(headerData);
    listChannels(headerData);

    let displayedName = userData["email"];

    const [searchedName, setSearchedName] = useState("");
    const [clickedName, setClickedName] = useState(null);
    const [barIsEmpty, setBarIsEmpty] = useState(true);

    const [combinedList, setCombinedList] = useState(
        JSON.parse(localStorage.getItem("filteredUsersList"))
    );

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("filteredChannelsList"))) {
            setCombinedList(
                JSON.parse(localStorage.getItem("filteredUsersList")).concat(
                    JSON.parse(localStorage.getItem("filteredChannelsList"))
                )
            );
        } else {
            setCombinedList(
                JSON.parse(localStorage.getItem("filteredUsersList"))
            );
        }
    }, []);

    function handleSearch(e) {
        setSearchedName(e.target.value);
        if (searchedName === "") {
            setBarIsEmpty(true);
        } else {
            setBarIsEmpty(false);
        }
    }
    // console.log(userData)
    return (
        <div className="m-2 bg-light">
            <div className='w-100  p-3 d-flex flex-column justify-content-center'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h1 className='text-primary'>🤷‍♂️Just Chat🤷‍♂️</h1>
                    <h3 className='text-primary'>
                    👋Hi, {displayedName}!👋
                    </h3>
                    <button onClick={signOut} className='bg-danger text-light'>
                        Sign Out
                    </button>
                </div>

                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <input
                        type='text'
                        placeholder='Search User or Channel to open chat thread.'
                        value={searchedName}
                        onChange={handleSearch}
                        className='w-50 text-center border border-primary'
                    />

                    {barIsEmpty ? (
                        <p className='d-none'>Dont Show Bar!</p>
                    ) : (
                        <div className='w-50 position-relative'>
                            <SearchResults
                                listNames={combinedList}
                                searchedName={searchedName}
                                setClickedName={setClickedName}
                                setBarIsEmpty={setBarIsEmpty}
                            />
                        </div>
                    )}
                </div>

                {/* <p>I clicked this {clickedName?.uid}</p> */}
                <div className='d-flex mw-100 justify-content-start mt-3'>
                    <div className='bg-primary'>
                        <ChatListWindow
                            user={userData}
                            setClickedName={setClickedName}
                            clickedName={clickedName}
                        />
                    </div>
                    <div className='flex-grow-1'>
                        <ChatWindow clickedName={clickedName} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
