import React from 'react'
import ChatHeader from './chat-header'
import ChatContainer from './chat-container'
import ChatMessage from './chat-message'

export default function Chat() {
  return (
    <div>
        <ChatHeader/>
        <ChatContainer/>
        <ChatMessage/>
    </div>
  )
}
