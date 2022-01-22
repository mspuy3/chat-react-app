import React, { useState, useEffect } from "react";
import { sendMessage } from "../../../api/slack-api";

const ChatForm = ({ clickedName }) => {
    const [isSending, setisSending] = useState(false);
    const [receiver_id, setReceiver_id] = useState("");
    const [receiver_class, setReceiver_class] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState([]);
    const [flash, setFlash] = useState("");

    let headerData = JSON.parse(localStorage.getItem("headers"));

    useEffect(() => {
      setReceiver_id(clickedName?.id);
      setReceiver_class(clickedName?.class)
    },[clickedName])

    const handleSend = async () => {
        setisSending(true);

        const [response, errors] = await sendMessage(
            headerData,
            receiver_id,
            receiver_class,
            body
        );
        if (errors.length > 0) {
            setFlash("");
            setError(errors);
            setisSending(false);
        } else {
            setisSending(false);
            setBody("");
            setFlash("Successful Send");
            setError([]);
        }
    };

    return (
        <div>
            {/* <h2>ChatForm Component for {clickedName?.uid}</h2> */}

            {isSending ? (
                <h1 className='text-primary p-1'>Sending Message....</h1>
            ) : (
                <div className="d-flex flex-column align-items-end">
                    {/* <div>
                        <label htmlFor=''>receiver_id: {receiver_id} </label>
                        <label htmlFor=''>receiver_class: {receiver_class} </label>
                    </div> */}
                    
                        <input
                            type='text'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Write your message here."
                            className="w-100 border border-primary p-3 mb-3"
                        />
                    
                    {error.lg}
                    <button onClick={handleSend} className="bg-primary text-light">Send</button>
                </div>
            )}

            {/* {error.length ? error.map((err) => <p>{err}</p>) : null}
            {flash && <p>{flash}</p>} */}
        </div>
    );
};

export default ChatForm;
