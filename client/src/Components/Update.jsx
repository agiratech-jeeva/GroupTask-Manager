import React, { useEffect, useState } from "react";
import "./myTodo.css";
import axios from "axios";


const Update = ({ display, update }) => {

useEffect(() => {
    setInputs({
        title:update.title,
         body: update.body
     } )
},[update])

    const [Inputs, setInputs] = useState({title:"", body: ""});

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };
    const submit = async() =>{
        await axios.put(`http://localhost:5005/task/list/updateTask/${update._id}`,Inputs).then((response) => {
            console.log(response);
        })
       
        display('none')
    }
    return (
        <div className="p-5 d-flex justify-content-center align-items-start flex-column  bg-lightgreen update">
            <h3>Update Your Task</h3>
            <input type="text" placeholder="Title" className="todo-title-input my-4 w-100 p-3"  value={Inputs.title} name ="title" onChange={change}/>
            <textarea placeholder="Body" className="todo-body-input w-100 p-3" value = {Inputs.body} name="body" onChange={change}/>
            <div>
                
                <button className="btn btn-dark my-2" onClick={submit}>update</button>
           <button
               className="btn btn-danger my-2"
               onClick={() => {
               display("none");
             }}> Close</button>


            </div>
        </div>
    );
};

export default Update;
