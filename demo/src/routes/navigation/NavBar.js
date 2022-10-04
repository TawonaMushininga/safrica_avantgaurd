import React from "react"
import { Route, Routes } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home'; 
import Dashboard from "../dashboard/Dashboard";


const NavBar = () =>{
    const sideBarItems = [
        {
            icon: <HomeIcon/>,
            title: "Home",
            path: "/"
        },
    ]

    return(
        <div className="grid grid-cols-12 gap-4 bg-gray-100 w-screen h-screen">

            <div className="col-span-1 bg-gray-200 p-5 md:col-span-2 border-r-2 border-gray-500">
                {
                    sideBarItems.map((item, index)=>(
                        <a 
                            key={index}
                            href={item.path}
                        >
                            <div className="flex w-full p-3 border-2 border-gray-500 rounded-lg bg-gray-300 mb-3">
                                <div className="pr-2 ">{item.icon}</div>
                                <div className="text-gray-800">{item.title}</div>
                            </div>
                        </a>        
                    ))
                }
            </div>
            <div className="col-span-11 bg-gray-200 p-5 md:col-span-10">
                <Routes>
                    <Route 
                        path = "/"
                        element = {<Dashboard/>}
                    />
                </Routes>
            </div>
            
        </div>
    )

}

export default NavBar;