import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development';
import { getChannelDetails } from '../../../api/slack-api'

const ChannelDetails = ({clickedName}) => {

   const [channelDeets, setChannelDeets] = useState("");
   const [userList, setUserList] = useState("");
   const [channelMembers, setChannelMembers] = useState("");

   let headerData = JSON.parse(localStorage.getItem("headers"));

   useEffect(() => {
      (getChannelDetails(headerData, clickedName?.id));
      setChannelDeets(JSON.parse(localStorage.getItem("channelDetails")));
      setUserList(JSON.parse(localStorage.getItem("filteredUsersList")));
      setChannelMembers(filterFunc(channelDeets, userList));
   }, [clickedName]);

   function filterFunc (channelDeets, userList) {
      
      let channel_Members = []
      
      channelDeets.channel_members.map(mem => channel_Members.push(mem.user_id));

      let finalList = userList.filter(user => {
         return channel_Members.includes(user.id)
      });

      return finalList;
      
   };

   console.log(clickedName)

   return (
    <div>
      <h2>Channel Details Component</h2>

      {/* <ul>  
         {channelMembers?.map((mem) => {
            return <li key={mem.id}>{mem.uid}</li>
         })}
      </ul> */}
      
    </div>
  )
}

export default ChannelDetails
