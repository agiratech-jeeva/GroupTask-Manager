import React from 'react'
import "./login.css"
import thirdImage from '../Components/assets/login.png';
 

const Login = () => {

    const loginwithgoogle = ()=>{
        window.open("http://localhost:5005/auth/google/callback","_self")
    }
  return (
    <div className='full'>
    <>
    <div className= "full">
    <div  className= "Login-Page">
        <div className='form'>
            <button className='login-with-google-btn' onClick={loginwithgoogle}>
            Sign In With Google
        </button>
       <center><img src={thirdImage} className='image3'></img> </center>
        
        </div>
    </div>
    </div>
    </>
    </div>
  )
}

export default Login