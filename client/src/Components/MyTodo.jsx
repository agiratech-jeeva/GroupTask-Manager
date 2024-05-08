import React, { useEffect, useState } from 'react';
import "./myTodo.css";
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';
let id= sessionStorage.getItem("id");
let toUpdateArray =[];

const Todo = () => {
  const [Inputs, setInputs] = useState({title:"", body:""});
  const [Array, setArray] = useState([]);

  

  // Define change function
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({... Inputs,[name]: value});
  };

  // Define submit function
  
  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or body should not be empty");
    } else {
      try {
        const response = await axios.post("http://localhost:5005/task/list/addTask", {
          title: Inputs.title,
          body: Inputs.body,
          id: id
        });
        console.log(response);
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your task is added");
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task. Please try again later.");
      }
    }
  };
  

  useEffect(() => {
    const show = () => {
      const textarea = document.getElementById("todo-textarea");
      if (textarea) {
        textarea.style.display = "block";
      }
    };
  
    const todoInput = document.getElementById("todo-input");
    if (todoInput) {
      todoInput.addEventListener("click", show);
  
      return () => {
        todoInput.removeEventListener("click", show);
      };
    }
  }, []); // Empty dependency array to run the effect only once
  


  const del = async (CardId) =>{
    if(id){
    await axios.delete(`http://localhost:5005/task/list/deleteTask/${CardId}`, {
      data: {id:id}
    }).then(() => {
      toast.success("Your task is Deleted")
    });
  }else{
    toast.error("error")
  }
    // Array.splice(id,"1");
    // setArray([...Array]);
  }
 
  
  
  const dis =(value) => {
    document.getElementById("todo-update").style.display = value; // Change "value" to value
  }
// const update = (value) => {
//   toUpdateArray = Array[value];
// };
const update = (task) => {
  toUpdateArray = task;
};


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/task/list/getTasks/${id}`);
        setArray(response.data.list);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchTasks();
  }, [submit]); 
  

  return (
    <>
    <div className='todo'>
      <ToastContainer />
      <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column'>
      <div className='d-flex flex-column todo-inputs-div W-70 p-1'>
          <input
            id="todo-input"
            type="text"
            placeholder='Title'
            name="title"
            value={Inputs.title}
            className='my-2 p-2 todo-inputs'
            onChange={change} // Use the change function here
          />
          <textarea
            id="todo-textarea"
            placeholder='Body'
            name='body'
            value={Inputs.body}
            onChange={change} // Use the change function here as well
            className='p-2 todo-inputs'
            style={{ display: 'none' }}
          />
        </div>
        <div className='w 50 d flex justify-content-end my-3'>
           <button className='addButton px-2 py-1' onClick={submit}>Add</button> {/* Use the submit function here */}
         </div>
         <div className='todo-body'>
          <div className='container-fluid'>
          <div className='row'>
           <div className='col-lg-3'>
             {Array && Array.map((item, index) => (
              <div className='col-lg-3 mx-10 my-2' key= {index}>
              <TodoCards title={item.title} body={item.body}  id={item._id} delid={del} display={dis} dis={dis} updateId={index} toBeUpdate={() => update(item)}/> 
               </div>
                ))}
               </div>
               </div>
          </div>
         </div>
      </div>
    </div>
    <div className="todo-update " id="todo-update">
        <div className="container update">
         <Update display={dis} update={toUpdateArray} />
        </div>
    </div>
    </>
    
  );
}

export default Todo;

