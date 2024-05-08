// import React, { useState } from 'react';
// import './dashboard.css';
// import CustomButton from './CustomButton';
// import Axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// function Card(props) {
//   // const [isAccepted, setIsAccepted] = useState(false);
 

//   const handleAccept = () => {
//     Axios.put(`http://localhost:5005/task/acceptTask/${props.id}`)
//       .then((res) => {
//         console.log("Task is accepted");
//         // setIsAccepted(true);
//         toast.success("Task is accepted");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const deleteTask = () => {
//     Axios.delete(`http://localhost:5005/task/deleteTask/${props.id}`)
//       .then((res) => {
//         console.log("perfect task is Deleted");
//         toast.success("Task is deleted");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const completeTask = () => {
//     Axios.put(`http://localhost:5005/task/completTask/${props.id}`)
//     .then((res) => {
//       console.log("Task is completed");
//       toast.success("task is completed");
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//   }

  

//   return (
//     <>
//       <ToastContainer />
//         <div className="Card" style={{ backgroundColor: props.complete === true ? '#00FF00' : 'white', color: props.complete === true ? 'white' : 'black' }}>
//         <h3>{props.taskName}</h3> 
//         <p>{props.description}</p>
//         <p>{props.dueDate}</p>
//         <p>{props.assigneeEmail}</p>
//         <p>{props.recipientEmail}</p>
//         <p>{props.priority}</p>
//         <p>{props.progress}</p>
//         <div className='btnwrapper'>
//           <CustomButton bg='#006400' color='white' name="Accept" click={handleAccept}  />
//           <CustomButton bg='#FFA500' color='white' name="Update"   />
//           <CustomButton bg='#FF0000' color='white' name='Delete' click={deleteTask} />
//           <CustomButton bg='#006800' color='white' name='Complete' click={completeTask} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Card;

import React from 'react';
import CustomButton from './CustomButton';
import { toast } from 'react-toastify';
import Axios from 'axios';

function Card(props) {
  const handleAccept = () => {
    Axios.put(`http://localhost:5005/task/acceptTask/${props.id}`)
      .then((res) => {
        console.log("Task is accepted");
        toast.success("Task is accepted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = () => {
    Axios.delete(`http://localhost:5005/task/deleteTask/${props.id}`)
      .then((res) => {
        console.log("perfect task is Deleted");
        toast.success("Task is deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeTask = () => {
    Axios.put(`http://localhost:5005/task/completTask/${props.id}`)
      .then((res) => {
        console.log("Task is completed");
        toast.success("task is completed");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const openUpdateWindow = () => {
    props.display("block");
  };

  return (
    <>
      <div className="Card" style={{ backgroundColor: props.complete === true ? '#00FF00' : 'white', color: props.complete === true ? 'white' : 'black' }}>
        <h3>{props.taskName}</h3>
        <p>{props.description}</p>
        <p>{props.dueDate}</p>
        <p>{props.assigneeEmail}</p>
        <p>{props.recipientEmail}</p>
        <p>{props.priority}</p>
        <p>{props.progress}</p>
        <div className='btnwrapper'>
          <CustomButton bg='#006400' color='white' name="Accept" click={handleAccept} />
          <CustomButton bg='#FFA500' color='white' name="Update" click={openUpdateWindow} />
          <CustomButton bg='#FF0000' color='white' name='Delete' click={deleteTask} />
          <CustomButton bg='#006800' color='white' name='Complete' click={completeTask} />
        </div>
      </div>
    </>
  );
}

export default Card;


