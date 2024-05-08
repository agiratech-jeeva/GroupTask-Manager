import axios from 'axios';
import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./dashboard.css";
import sideImage from "../Components/assets/sidebar.png"
import { Link } from 'react-router-dom';
import DashboardForm from './DashboardForm';
import {useDispatch} from "react-redux";   //now added
import { authActions } from '../store'; //new added



const Dashboard = () => {
  const dispatch = useDispatch();    //new added

  const navigate = useNavigate();

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:5005/login/sucess", { withCredentials: true });

        console.log("response",response)

           const userId = response.data.user._id;
            // Store userId in sessionStorage
            sessionStorage.setItem('id', userId);  // added newly
            dispatch(authActions.login()) //new added

    } catch (error) {
      navigate("*")
    }
}


useEffect(() => {
  getUser()
}, [])
  return (
    <div style={{ display: 'flex' }}>
    {/* Sidebar */}
    <div className='sidebar'>
    <img src={sideImage} className='sideimage'></img>
      <ul>
        <li><Link to="/mytodo"style={{ textDecoration: 'none', color:'white' }}>My Todo</Link></li>
        <li><Link to ="/accepted" style={{textDecoration: 'none', color:'white'}} >Accepted Tasks</Link></li>
        <li><Link to="/completed" style={{textDecoration: 'none', color:'white'}}> Completed Tasks</Link></li>
      </ul>
    </div>
    <div style={{flex:1, textAlign:"center"}}>
        <DashboardForm />
      </div>
      </div>
  )
}

export default Dashboard

