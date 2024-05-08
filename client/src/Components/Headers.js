import React, { useEffect, useState } from 'react'
import "./header.css"
import { NavLink } from "react-router-dom"
import axios from "axios";
import { GrGroup } from "react-icons/gr";


const Headers = () => {
   
    const [userdata, setUserdata] = useState({});
    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:5005/login/sucess", { withCredentials: true });

            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    // logoout
    const logout = ()=>{
        window.open("http://localhost:5005/logout","_self")
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <>
            <header>
                <nav>
                    <div className="left">
                    <GrGroup />
                        <h1>Group Task Manager</h1>
                    </div>
                    <div className="right">
                        <ul>
                            <li>
                                <NavLink to="/">
                                    Home
                                </NavLink>
                            </li>
                            {
                                Object?.keys(userdata)?.length > 0 ? (
                                    <>
                                    <li style={{color:"black",fontWeight:"bold"}} className='name'>{userdata?.displayName}</li>
                                       
                                        <li>
                                            <img src={userdata?.image} style={{ width: "50px", borderRadius: "50%" }} alt="" />
                                        </li>

                                        <li>
                                            <NavLink className="dashboard" to="/dashboard">
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li onClick={logout}>Logout</li>
                                    </>
                                ) : <li>
                                    <NavLink to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            }



                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Headers