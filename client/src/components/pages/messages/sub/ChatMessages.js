import React,{ useState} from 'react';
//import React from 'react';
import ChatMessagesHeader from './ChatMessagesHeader';
import Message from './Message';

function ChatMessages({activeMessages,FxObj,currentUser}) {
    

    return (
        <div id="chatMessageContainerWrapper">
            <ChatMessagesHeader />
            <div className="chatMessageContainer">
 
                {activeMessages && activeMessages.map(s => {
                    if (s.sender !== FxObj.getCurrentUser())
                        return <Message message={s} FxObj={FxObj} classname={'ChatMessage'}/>
                    else
                        return <Message message={s} FxObj={FxObj} classname={'ChatMessage mine'}/>
                })}  
                
            </div>
            
            
        </div>
    )
}

export default ChatMessages
