import React from "react";

const ChannelListView = ({setClickedName}) => {
    let listed = JSON.parse(localStorage.getItem("filteredChannelsList"));

    return (
        <div>
            <h4 className="text-light">My Channels</h4>
            <ul className="w-100 h-30 list-unstyled overflow-auto">
                {listed?.map((nameObject) => (
                    <li key={nameObject.id} className="bg-info p-2 m-1 text-white shadow">
                        <div onClick={() => {setClickedName(nameObject)}}>
                            {nameObject.uid}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelListView;
