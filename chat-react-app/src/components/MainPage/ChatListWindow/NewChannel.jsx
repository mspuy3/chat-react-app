import React, { useState, useEffect } from "react";
import { listChannels, newChannel } from "../../../api/slack-api";
import SearchResults from "../Headers/SearchResults";

const NewChannel = (user) => {
    const [isCreating, setIsCreating] = useState(false);
    const [channelName, setChannelName] = useState("");
    const [channelMembers, setChannelMembers] = useState([]);
    const [showedNames, setShowedNames] = useState([]);
    const [searchedName, setSearchedName] = useState("");
    const [clickedName, setClickedName] = useState(null);
    const [barIsEmpty, setBarIsEmpty] = useState(true);
    const [error, setError] = useState([]);
    const [flash, setFlash] = useState("");

    let headerData = JSON.parse(localStorage.getItem("headers"));
    let userIdDisplay = user.uid;

    const[combinedList, setCombinedList] = useState(JSON.parse(localStorage.getItem("filteredUsersList")));

    const handleNewChannel = async () => {
        setIsCreating(true);

        let finalChannelMembers = [
            parseInt(userIdDisplay),
            ...channelMembers,
        ];

        const [response, errors] = await newChannel(
            headerData,
            channelName,
            finalChannelMembers
        );
        if (errors.length > 0) {
            setFlash("");
            setError(errors);
            setIsCreating(false);
        } else {
            setIsCreating(false);
            setFlash("New Channel Created");
            setError([]);
            listChannels(headerData);
        }
    };

    const newMembers = (x) => {
        let y = x.split(",").map(Number);
        return y;
    };

    function handleSearch(e) {
      setSearchedName(e.target.value);
      if (searchedName === "") {
          setBarIsEmpty(true);
      } else {
          setBarIsEmpty(false);

      }
    }

    useEffect(() => {
      if (channelMembers !== undefined) {
      setChannelMembers([...channelMembers, clickedName?.id]);
      }

      if (showedNames !== undefined) {
        setShowedNames([...showedNames, clickedName]);
        }

    },[clickedName])

    // console.log("user sa new channel: ", user.email)

    return (
        <div>
            <h4 className="text-light">Create New Channel</h4>

            {isCreating ? (
                <p>Creating Channel....</p>
            ) : (
                <div>
                    <div>
                        <input
                            required
                            type='test'
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            placeholder="New Channel Name"
                            className="m-1"
                        />
                    </div>
                    {/* <div>
                        <label htmlFor=''>Channel Members:</label>
                        <input
                            placeholder='Enter user IDs separated by commas'
                            type='text'
                            value={channelMembers}
                            onChange={(e) => setChannelMembers(e.target.value)}
                        />
                    </div> */}

                    <div>
                        <input
                            type='text'
                            placeholder='Search User to Add'
                            value={searchedName}
                            onChange={handleSearch}
                            className="m-1"
                        />

                        <ul>
                            {showedNames?.map((nameObject) => {
                                
                                if (nameObject !== null) {
                                return (
                                <li key={nameObject.id} className="text-light">
                                    <div> {nameObject.uid}</div>
                                </li>
                                )}
                            })}
                        </ul>

                        {barIsEmpty ? (
                            <p className="d-none">Dont Show Bar!</p>
                        ) : (
                            <div className="position-relative">
                            <SearchResults
                            listNames={combinedList}
                            searchedName={searchedName}
                            setClickedName={setClickedName}
                            setBarIsEmpty={setBarIsEmpty}
                            />
                            </div>
                      
                        )}
                    </div>

                    <button onClick={handleNewChannel} className="m-1 bg-info text-light">
                        Create New Channel
                    </button>
                </div>
            )}

            {error.length ? error.map((err) => <p className="bg-danger p-1 text-white m-1">{err}</p>) : null}
            {flash && <p>{flash}</p>}
        </div>
    );
};

export default NewChannel;
