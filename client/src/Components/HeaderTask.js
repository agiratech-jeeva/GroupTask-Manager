import React, { useState } from 'react';
import './dashboard.css';
import CustomButton from './CustomButton';

function Header(props) {
  
  return (
    <div className= "header">
        <h1>Task Manager</h1>
        <div className = "btwrapper">
           <CustomButton click={props.handleInput} bg='#1877F2' color= 'white' name ="Add"/>
        </div>
    </div>
  )
}

export default Header;
