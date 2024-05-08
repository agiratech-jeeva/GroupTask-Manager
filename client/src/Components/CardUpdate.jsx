// import React from 'react'

// const CardUpdate = ({display}) => {
//   return (
//     <div className="p-5 bg-primary d-flex justify-content-center align-items-start flex-column">
//       <h3>Update The Task Progress</h3>
//       <textarea className="task-inputs w-100 p-3" />
//       <div>
//       <button btn btn-dark my-4>Update</button>
//       <button btn btn-dark my-4 mx-3 onClick={() => display("none") } >Close</button>
//       </div>

//     </div>
//   )
// }
// export default CardUpdate;

// import React, { useState } from 'react';
// import Axios from 'axios';

// const CardUpdate = ({ display, id }) => {
//   const [progress, setProgress] = useState('');

//   const updateTaskProgress = async () => {
//     try {
//       // Make a PUT request to the backend API to update task progress
//       await Axios.put(`http://localhost:5005/task/updateTask/${id}`, { progress });
//       console.log("Task progress updated successfully");
//       // Close the update window
//       display("none");
//     } catch (error) {
//       console.error('Error updating task progress:', error);
//     }
//   };
//   <CardUpdate id={props.id} display={props.display} />


//   return (
//     <div className="p-5 bg-primary d-flex justify-content-center align-items-start flex-column">
//       <h3>Update The Task Progress</h3>
//       <textarea
//         className="task-inputs w-100 p-3"
//         value={progress}
//         onChange={(e) => setProgress(e.target.value)}
//       />
//       <div>
//         <button className="btn btn-dark my-4" onClick={updateTaskProgress}>Update</button>
//         <button className="btn btn-dark my-4 mx-3" onClick={() => display("none")}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default CardUpdate;

import React, { useState } from 'react';
import Axios from 'axios';

const CardUpdate = ({ display, id }) => {
  const [progress, setProgress] = useState('');

  const updateTaskProgress = async () => {
    try {
      // Make a PUT request to the backend API to update task progress
      await Axios.put(`http://localhost:5005/task/updateTask/${id}`, { progress });
      console.log("Task progress updated successfully");
      // Close the update window
      display("none");
    } catch (error) {
      console.error('Error updating task progress:', error);
    }
  };

  return (
    <div className="p-5 bg-primary d-flex justify-content-center align-items-start flex-column">
      <h3>Update The Task Progress</h3>
      <textarea
        className="task-inputs w-100 p-3"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={updateTaskProgress}>Update</button>
        <button className="btn btn-dark my-4 mx-3" onClick={() => display("none")}>Close</button>
      </div>
    </div>
  );
};

export default CardUpdate;



