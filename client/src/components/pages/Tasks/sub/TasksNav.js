import React from 'react'

import { NavLink } from 'react-router-dom';
const TasksNav = (props) => {
    let groupStyle = "TN_li_common";
    let dateStyle = "TN_li_common";
    if (props.active === "Date") {
        groupStyle += " TN_li_Inactive";dateStyle +=" TN_li_Active";
    } else {
        groupStyle+=" TN_li_Active";dateStyle+= " TN_li_Inactive";
    }
    
  return (
    <nav className={"TNav"}>
          <NavLink className={groupStyle} to='/Tasks/Group'>by Group</NavLink>
          <NavLink className={dateStyle} to='/Tasks/Date'>by Date</NavLink>
    </nav>
  );
};


export default TasksNav
