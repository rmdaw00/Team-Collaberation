import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import * as FiIcons from "react-icons/fi";

export const SidebarData = [
    {
        title:'Home',
        path:'/',
        icon:<AiIcons.AiFillHome/>,
        cName:'nav-textSide'
    },
    {
        title:'My Tasks',
        path:'/Tasks',
        icon:<AiIcons.AiOutlineCheckCircle/>,
        cName:'nav-textSide'
    },
   
    {
        title:'Messages',
        path:'/messages',
        icon:<FaIcons.FaEnvelopeOpenText/>,
        cName:'nav-textSide'
    },
    {
        title:'Goals',
        path:'/goals',
        icon:<AiIcons.AiFillBulb/>,
        cName:'nav-textSide'
    },
    {
        title:'MyNotes',
        path:'/Notes',
        icon:<FaIcons.FaStickyNote/>,
        cName:'nav-textSide'
    },

    {
        title:'Report',
        path:'/Report',
        icon:<AiIcons.AiFillPieChart/>,
        cName:'nav-textSide'
    },



    {
        title:'Project Settings',
        path:'/Setting',
        icon:<AiIcons.AiFillSetting/>,
        cName:'nav-textSide'
    },

   

    {
        title:'Invite Teammates',
        path:'/Invite',
        icon:<FcIcons.FcInvite/>,
        cName:'nav-textSide'
    },
 
  

]
