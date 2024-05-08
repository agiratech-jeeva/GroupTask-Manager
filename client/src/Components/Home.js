import React from 'react';
import "./home.css";
import firstImage from '../Components/assets/homeimage.png';
import secondImage from '../Components/assets/group2.png';
import { Link } from 'react-router-dom'; 

const Home = () => {
  return (
    <>
       <div className='first'>
        <div>
        <p className='heading'>Free Task Management Software</p>
        <p className='subheading'>Create more, waste less with Us</p>

        <div className='middle'>
          <h4  className='right'>Profit <br /> <br /> Ideas <br/> <br/> Emotions <br/> <br/> Sense</h4> 
          <center> <img src={firstImage} className='image1'></img> </center>
          <h4 className='left'>Time & Efforts<br/> <br/> Values <br/><br/> Money <br/><br/>Knowledge</h4>
        </div>
        <div className='for-buttn'>
       <center>
       <Link to="/login">
       <button className='large-button'><b>Start From Here</b></button>
       </Link>
        </center>  </div>
        <div className='para' ><p><center>"Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort." - Paul J. Meyer</center></p></div>

        <div className='last'><img src={secondImage} className='image2'></img> 
        <p className='para2'><b>
          "Group Task Manager" is a collaborative project management tool designed to streamline task assignment and tracking within teams. With a focus on simplicity and efficiency, it enables users to delegate tasks seamlessly through email integration, ensuring everyone stays on the same page. This free service empowers users to organize their to-do lists effectively while fostering collaboration and productivity among team members. Whether it's coordinating project milestones or managing personal tasks, Group Task Manager offers a user-friendly platform to enhance task management experiences. </b></p>
          </div>
        </div>
       </div>
       <footer>
       <footer>
         <div>
            <p>For Any Enquiry</p>
            <p><a href="tel:53772981910"><span>&#9742;</span> HR@Agira : 53772981910</a></p>
            <p className='email'><a  href="mailto:velmurugan.s@agiratech.com"><span className='emaillogo'>&#9993;</span> Email-id:sales@agiratech.com</a></p>
        </div>
        <div class="copyright">
         <p><a href="https://www.agiratech.com/">&copy; AgiraTechnology</a></p>
         </div>
</footer>

       </footer>
      
    </>
  )
}

export default Home