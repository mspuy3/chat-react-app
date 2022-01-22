import React, { useState, useEffect } from "react";
import { receiveMessageOfClicked } from "../../../api/slack-api";

const ChatView = ({ clickedName }) => {
    const [isReceiving, setisReceiving] = useState(false);
    const [receiver_id, setReceiver_id] = useState("");
    const [receiver_class, setReceiver_class] = useState("");
    const [error, setError] = useState([]);
    const [flash, setFlash] = useState("");
    const [clickedNameMessages, setClickedNameMessages] = useState(null);

    let headerData = JSON.parse(localStorage.getItem("headers"));
    let userData = JSON.parse(localStorage.getItem("data"));

    useEffect(() => {
        setReceiver_id(clickedName?.id);
        setReceiver_class(clickedName?.class);
    }, [clickedName]);

    // Getting messages
    useEffect(() => {
        const interval = setInterval(async () => {
            setisReceiving(true);
            setFlash("");

            const [response, errors] = await receiveMessageOfClicked(
                headerData,
                receiver_id,
                receiver_class
            );

            if (errors?.length > 0) {
                setFlash("");
                setError(errors);
                setisReceiving(false);
            } else {
                setClickedNameMessages(
                    JSON.parse(localStorage.getItem("receivedMessagesByClicked"))
                );
                setisReceiving(false);
                setFlash("Successful Receive for Clicked");
                setError([]);
            }
        }, 250);
        return () => {
            clearInterval(interval);
        };
    }, [isReceiving]);

    return (
        <div className="p-1 h-50 overflow-auto border border-primary mb-3">
            {/* <h3>Chat Thread</h3> */}

            {/* {isReceiving ? (
                <p>Loading...</p>
            ) : ( <p>Done!</p> )} */}
            
            <ul className="w-100 h-30 bg-light list-unstyled p-3">
                {clickedNameMessages?.map((message) => {
                    if (message.sender.uid == userData.uid) {
                        return <li key={message.id} className="text-end m-4"> <span className="bg-primary text-white p-2 shadow">{message.body} (me) </span></li>;
                    } else {
                        return (
                            <li key={message.id} className="m-4">
                                <span className="bg-success text-white p-2 shadow">{message.body} ({message.sender.uid}) </span>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default ChatView;
