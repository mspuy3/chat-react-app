import React from 'react'
import ChannelDetails from './ChatListWindow/ChannelDetails'
import ChannelListView from './ChatListWindow/ChannelListView'
import NewChannel from './ChatListWindow/NewChannel'

const ChatListWindow = ({user, setClickedName, clickedName}) => {
  
  // console.log("user: ", user)

  return (
    <div className='d-flex flex-column p-3'>
      <h1 className='text-light text-shadow'>Chat List</h1>

      <NewChannel user={user} />
      {/* <ChannelDetails setClickedName={setClickedName} clickedName={clickedName}/> */}
      <ChannelListView setClickedName={setClickedName}/>
      
    </div>
  )
}

export default ChatListWindow
