import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

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
        path:'/tasks',
        icon:<AiIcons.AiOutlineCheckCircle/>,
        cName:'nav-textSide'
    },
    {
        title:'Inbox',
        path:'/inbox',
        icon:<AiIcons.AiOutlineBell/>,
        cName:'nav-textSide'
    },
    {
        title:'Portfolios',
        path:'/portfolios',
        icon:<FiIcons.FiBarChart2/>,
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
]
