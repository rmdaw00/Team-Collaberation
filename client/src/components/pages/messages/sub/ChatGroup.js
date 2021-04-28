import React from 'react';

function ChatGroup({group,FxObj,classname}) {


    const groupClick = (s) => {
        console.log(FxObj.getCurrentUser())
        FxObj.makeActiveGroup(s)
    }
    const groupid = (group._id)?group._id:group.id;
    return (
        <div className={classname} onClick={() => groupClick(groupid)}>
            <div className="ChatGroupLogo"> <div className="ChatGroupLogoFont">{group.name.substring(0,1)}</div> </div>
            <div className="ChatGroupText ChatGroupTitle"> {group.name} </div>
            <div className="ChatGroupText ChatGroupMembers"> {group.members.map((s,counter) => {
                    if (counter == 0) 
                        return (FxObj.getUserName(s))
                    else 
                        return (', '+FxObj.getUserName(s))}
                )} </div>
        </div>
    )
}

export default ChatGroup
