import './dashboardform.css';
import Header from './HeaderTask';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import Card from './Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState , useEffect} from 'react';
import axios from 'axios'; 
import CardUpdate from './CardUpdate';
let id = sessionStorage.getItem("id");



function DashboardForm() {
    const [add, setAdd] = useState(false); // for add task
    const [Task, setTask] = useState([]); // save task
    const [singleTask, setSingleTask] = useState(''); //taskName
    const [singleDes,setSingleDes] = useState(''); //description
    const [singleDate, setSingleDate] = useState(''); //due date
    const [singleAssignee, setSingleAssignee] = useState('');
    const [singleRecipient, setSingleRecipient] = useState(''); //recipient email
    const [singlePriority, setSinglePriority] =useState(''); //priority
    const [singleProgress, setSingleProgress] = useState(''); //updates

    useEffect(() => {
      // Fetch tasks for the logged-in user when the component mounts
      const fetchTasks = async () => {
          try {
              const userId = sessionStorage.getItem("id");
              const response = await axios.get(`http://localhost:5005/task/getAllTasksPer/${userId}`);
              setTask(response.data.PerUserTask.tasks);


          } catch (error) {
              console.error('Error fetching tasks:', error);
          }
      };
      fetchTasks();
  }, []);
    
 
   const addToTodo =  async()=>{    // addtolist
      // Check if all mandatory fields are filled
    if (!singleTask || !singleDes || !singleDate || !singleRecipient || !singlePriority) {
      // Find which field is not filled
      const missingFields = [];
      if (!singleTask) missingFields.push('Task Name');
      if (!singleDes) missingFields.push('Description');
      if (!singleDate) missingFields.push('Due Date');
      if(!singleAssignee) missingFields.push('Assignee');
      if (!singleRecipient) missingFields.push('Recipient');
      if (!singlePriority) missingFields.push('Priority');

      // Display an alert popup with missing field names
      alert(`Please fill the following fields: ${missingFields.join(', ')}`);
      return; // Abort task addition
  }

        const id= Task.length === 0?1:Task.length+1;
        const taskDetail = {
         id:id,
        taskName:singleTask,
        description:singleDes,
        dueDate:singleDate,
        assigneeEmail: singleAssignee,
        recipientEmail: singleRecipient,
        priority: singlePriority,
         progress: singleProgress,
        //  complete:false
        };

        //make a POST request to the backend API to add the task
        await axios.post('http://localhost:5005/task/assignTask', taskDetail)
        .then((res)=>{
           console.log(res.data);
        })
        .catch((err)=>{
           console.log(err);
        })
        setTask(
            [...Task,taskDetail]
        );
        ClearInput();
     } 


   const ClearInput= ()=>{   //for clear button
       setSingleTask('');
       setSingleDes('');
       setSingleDate('');
       setSingleAssignee('');
       setSingleRecipient('');
       setSinglePriority('');
       setSingleProgress('');
}

     const handleCustomTask= (event) =>{   //gettingtask
        setSingleTask(event.target.value);

     }
     const handleCustomDec= (event) =>{    //getting desc
        setSingleDes(event.target.value);

     }
     const handleCustomDate = (event) => { //getting date
        setSingleDate(event.target.value);
     }

     const handleCustomAssignee = (event) => {  //getting recipient
        setSingleAssignee(event.target.value);
     }

     const handleCustomRecipient = (event) => {  //getting recipient
        setSingleRecipient(event.target.value);
     }
     const handleCustomPriority = (event) => {  //getting priority
        setSinglePriority(event.target.value);

     }
     
     const handleCustomProgress = (event) => {  //getting progress
        setSingleProgress(event.target.value);
     }

    const handleInput = ()=> { 
        setAdd(!add)
    }

    const dis = (value) => {
        document.getElementById("card-update").style.display = value;
      };


      
      
    return (
        <div className='main'>
            <div className='inputSection'>
            <Header handleInput = {handleInput} />
            {add === true ?
            <>
            <CustomInput value={singleTask} placeholder = "Enter Task Name" name = 'Task Name' change={handleCustomTask}/>
            <CustomInput value={singleDes}  placeholder = "Enter Task Description" name = 'Description' change={handleCustomDec}/>
            <CustomInput value={singleDate} placeholder= "2024/01/01" name = 'Due-Date' change={handleCustomDate}/>

            <CustomInput value={singleAssignee} placeholder= "Your Email" name = 'Assignee' change={handleCustomAssignee}/>
            <CustomInput value={singleRecipient} placeholder = "Recipient Email" name = 'Recipient' change={handleCustomRecipient}/>
            <CustomInput value={singlePriority} placeholder = "Priority" name ='Priority' change={handleCustomPriority}/>
            <CustomInput value={singleProgress} placeholder = " Any Updates"  name = "Progress" change={handleCustomProgress}/> 
            <div className='btnwrapper'>
            <CustomButton  bg= '#1877F2'color= 'white' name= "Save" click={addToTodo}/>
            <CustomButton  bg= '#FF0000'color= 'white' name= "Clear" click={ClearInput}/>
            </div> 

            </> :null
            }
            
            </div>
            <div className='cardSection'>
                {
                  Task.map((task)=>(   
                  <Card
                  taskName={task.taskName}
                  description={task.description}
                  dueDate={task.dueDate}
                  assigneeEmail= {task.assigneeEmail}
                  recipientEmail={task.recipientEmail}
                  priority={task.priority}
                  progress={task.progress}
                  key={task.id}
                  id={task._id}
                  display={dis}
                  updateId={task._id}
                  />

                  ))
                }
            </div>
            <div className='card-update ' id= "card-update">
                <div className='container update'>
                <CardUpdate  display={dis}/>
                </div>
            </div>
        </div>
    )
}
export default DashboardForm;

