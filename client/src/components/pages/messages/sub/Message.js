import React from 'react'

function Message({classname, message,FxObj}) {
    return (
        <div className={classname}>
            <div className="messageSender">{FxObj.getUserName(message.sender)}</div>
            <div className="messageContent">{FxObj.decryptMessage(message.content)}</div>
            <div className="messageReadStatus">{message.sentDate}<i className="fa fa-check-circle"></i></div>
        </div>
    )
}

export default Message
