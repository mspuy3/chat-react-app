import React from 'react'
import ChatForm from './ChatWindow/ChatForm'
import ChatView from './ChatWindow/ChatView'

const ChatWindow = ({clickedName}) => {

  return (
    <div className='d-flex flex-column m-3'>
      {/* <span className='text-primary'>Chatting with: </span>  */}
      <h1 className="text-success">{clickedName?.uid}</h1>

      <ChatView clickedName = {clickedName}/>
      <ChatForm clickedName = {clickedName}/>

    </div>
  )
}

export default ChatWindow
