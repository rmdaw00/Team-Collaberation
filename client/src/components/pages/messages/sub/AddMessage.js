import React,{ useState} from 'react';


function AddMessage({activeGroup,FxObj}) {

    const [newMsg, setNewMsg] = useState("");

    const handleInputChange = (e) => {
        setNewMsg(e.target.value);
      };

    const sendMessage = () => {
        if (newMsg) FxObj.sendMessage(newMsg);
        setNewMsg('');
        
        
    }
    return (
        <div className="ChatBottom addMessage">
            <input type="text" placeholder=" Type your message here."  onChange={handleInputChange} value={newMsg}/>
            <button className="bottomButton" id="AddMessageButton" onClick={sendMessage} ><i class='fa fa-send'></i></button>
        </div>
    )
}

export default AddMessage
