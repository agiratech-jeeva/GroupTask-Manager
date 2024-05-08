// const express = require('express');
// const router = express.Router();
// const Task = require('../model/Task');
// const User = require('../model/userSchema');
// const nodemailer = require("nodemailer");

// // nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user:"jeeva.narayanan2012@gmail.com",
//       pass: "gyww ecbz oocx jajd",
//     },
//   });

// router.post('/assignTask', async (req, res) => {
//     try {
//         // Extract data from the request body
//         const { taskName, description, dueDate, assigneeEmail, recipientEmail, priority,progress} = req.body;

//         // Check if the recipient email corresponds to an existing user
//         const recipientUser = await User.findOne({ email: recipientEmail });
//         if (!recipientUser) {
//             return res.status(404).json({ error: 'Recipient email not found. User does not exist.' });
//         }

//         // Create a new task document
//         const newTask = new Task({
//             taskName,
//             description,
//             dueDate,
//             assigneeEmail,
//             recipientEmail,
//             priority,
//             progress
//         });

//         // Save the new task document
//         await newTask.save();

//         // Update the assignee and recipient documents
//         await User.updateMany(
//             { email: { $in: [assigneeEmail, recipientEmail] } }, // Update both assignee and recipient
//             { $push: { task: newTask._id } } // Add the task ID to the "task" array
//         );

//           // Send email to the recipient
//           const mailOptions = {
//             from: 'jeeva.narayanan2012@gmail.com',
//             to: recipientEmail,
//             subject: 'Task Assigned',
//             text: `You have been assigned a task: ${taskName}. Assigned by: ${assigneeEmail}`
//         };

//         // Send the email
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });


//         // Send success response
//         res.status(201).json({ message: 'Task assigned successfully.', task: newTask });
//     } catch (error) {
//         console.error('Error assigning task:', error);
//         res.status(500).json({ error: 'Internal server error. Failed to assign task.' });
//     }
// });


// router.put('/updateTask/:id', async (req, res) => {
//     try {
//         // Extract data from the request body
//         const { taskName, name, description, dueDate, priority, progress } = req.body;

//         // Find the task by its ID
//         const taskId = req.params.id;
//         const existingTask = await Task.findById(taskId);
//         if (!existingTask) {
//             return res.status(404).json({ error: 'Task not found. Invalid task ID.' });
//         }

//         // Update the task document
//         existingTask.taskName = taskName;
//         existingTask.description = description;
//         existingTask.dueDate = dueDate;
//         existingTask.priority = priority;
//         existingTask.progress = progress;

//         // Save the updated task document
//         const updatedTask = await existingTask.save();

//          // Capture the assignee and recipient emails
//          const assigneeEmail = existingTask.assigneeEmail;
//          const recipientEmail = existingTask.recipientEmail;
         
//          // Send email to both assignee and recipient
//         const mailOptions = {
//             from: 'jeeva.narayanan2012@gmail.com',
//             to: [assigneeEmail, recipientEmail], // Sending email to both assignee and recipient
//             subject: 'Task Updated',
//             text: `Task "${taskName}" has been updated.\n\nDescription: ${description}\nDue Date: ${dueDate}\nProgress: ${progress}`
//         };

//         // Send the email
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });


//         // Send success response
//         res.status(200).json({ message: 'Task updated successfully.', task: updatedTask });
//     } catch (error) {
//         console.error('Error updating task:', error);
//         res.status(500).json({ error: 'Internal server error. Failed to update task.' });
//     }
// });


// // DELETE /deleteTask/:id 
// router.delete('/deleteTask/:id', async (req, res) => {
//     try {
//         const taskId = req.params.id;

//         // Check if the task with the given ID exists
//         const task = await Task.findById(taskId);
//         if (!task) {
//             return res.status(404).json({ error: 'Task not found.' });
//         }

//          // Capture the assignee and recipient emails
//          const assigneeEmail = task.assigneeEmail;
//          const recipientEmail = task.recipientEmail;

//         // Delete the task document from the database
//         await Task.findByIdAndDelete(taskId);

//         // Remove the task ID from assignee and recipient documents
//         await User.updateMany(
//             { email: { $in: [task.assigneeEmail, task.recipientEmail] } }, // Update both assignee and recipient
//             { $pull: { task: taskId } } // Remove the task ID from the "task" array
//         );

//           // Send email to both assignee and recipient
//           const mailOptions = {
//             from: 'jeeva.narayanan2012@gmail.com',
//             to: [assigneeEmail, recipientEmail], // Sending email to both assignee and recipient
//             subject: 'Task Deleted',
//             text: `Task "${task.taskName}" has been deleted.\n\nDescription: ${task.description}\nAssignee: ${task.assigneeEmail}`
//         };

//         // Send the email
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });

//         // Send success response
//         res.status(200).json({ message: 'Task deleted successfully.' });
//     } catch (error) {
//         console.error('Error deleting task:', error);
//         res.status(500).json({ error: 'Internal server error. Failed to delete task.' });
//     }
// });


// // specific User Task by ID 

// router.get(`/getAllTasksPer/:id`,async (req,res)=>{
//     const getTaskUserId = req.params.id
//     await User.findById(getTaskUserId)
//     .then((result)=>{
//         res.json({
//             UserEmail : result.email,
//             PerUserTask : result.task
//         })
//     })
//     .catch((err)=>{
//         res.send(err)
//     })
// })

// router.put('/accept-task/:taskId', async (req, res) => {
//     try {
//         const taskId = req.params.taskId;

//         // Find the task by taskId and update the accepted field to true
//         const updatedTask = await Task.findByIdAndUpdate(taskId, { accepted: true }, { new: true });

//         // Extract task name and description
//         const { taskName, description,recipientEmail, assigneeEmail } = updatedTask;

//         // Send email to the assignee
//         const mailOptions = {
//             from: 'jeeva.narayanan2012@gmail.com',
//             to: assigneeEmail,
//             subject: `Task Accepted: ${taskName}`,
//             text: `Task: ${taskName}\nDescription: ${description}\nYour task has been accepted. \n Recipient: ${recipientEmail}`
//         };

//         // Send the email
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 res.status(500).json({ error: 'Failed to send email.' });
//             } else {
//                 console.log('Email sent:', info.response);
//                 res.status(200).json({ message: 'Task accepted successfully.', task: updatedTask });
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });

// //rejecttask
// router.put('/reject-task/:taskId', async (req, res) => {
//     try {
//         const taskId = req.params.taskId;

//         // Find the task by taskId and update the accepted field to false (rejected)
//         const updatedTask = await Task.findByIdAndUpdate(taskId, { accepted: false }, { new: true });

//         // Send email to the assignee
//         const assigneeEmail = updatedTask.assigneeEmail; // Assuming you have the assignee's email stored in the task document
//         const mailOptions = {
//             from: 'your_email@example.com',
//             to: assigneeEmail,
//             subject: 'Task Rejected',
//             text: 'Your task has been rejected.'
//         };

//         // Send the email
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 res.status(500).json({ error: 'Failed to send email.' });
//             } else {
//                 console.log('Email sent:', info.response);
//                 res.status(200).json({ message: 'Task rejected successfully.', task: updatedTask });
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Routes
router.post('/assignTask', taskController.assignTask);
router.put('/updateTask/:id', taskController.updateTask);
router.delete('/deleteTask/:id', taskController.deleteTask);
router.get(`/getAllTasksPer/:id`, taskController.getAllTasksPer);
router.put('/acceptTask/:taskId', taskController.acceptTask);
router.put('/reject-task/:taskId', taskController.rejectTask);
router.get('/accepted/:userId', taskController.accepted);
router.put('/completTask/:taskId', taskController.completTask);
router.get('/completed/:userId', taskController.completed);
module.exports = router;
