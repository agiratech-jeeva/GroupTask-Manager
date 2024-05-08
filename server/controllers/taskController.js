const Task = require('../model/Task');
const User = require('../model/userSchema');
const nodemailer = require("nodemailer");

// nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:"jeeva.narayanan2012@gmail.com",
      pass: "gyww ecbz oocx jajd",
    },
  });

exports.assignTask = async (req, res) => {
    try {
        // Extract data from the request body
        const { taskName, description, dueDate, assigneeEmail, recipientEmail, priority,progress} = req.body;

        // Check if the recipient email corresponds to an existing user
        const recipientUser = await User.findOne({ email: recipientEmail });
        if (!recipientUser) {
            return res.status(404).json({ error: 'Recipient email not found. User does not exist.' });
        }

        // Create a new task document
        const newTask = new Task({
            taskName,
            description,
            dueDate,
            assigneeEmail,
            recipientEmail,
            priority,
            progress
        });

        // Save the new task document
        await newTask.save();

        // Update the assignee and recipient documents
        await User.updateMany(
            { email: { $in: [assigneeEmail, recipientEmail] } }, // Update both assignee and recipient
            { $push: { task: newTask._id } } // Add the task ID to the "task" array
        );

          // Send email to the recipient
          const mailOptions = {
            from: 'jeeva.narayanan2012@gmail.com',
            to: recipientEmail,
            subject: 'Task Assigned',
            text: `You have been assigned a task: ${taskName}. Assigned by: ${assigneeEmail}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // Send success response
        res.status(201).json({ message: 'Task assigned successfully.', task: newTask });
    } catch (error) {
        console.error('Error assigning task:', error);
        res.status(500).json({ error: 'Internal server error. Failed to assign task.' });
    }
};


exports.updateTask = async (req, res) => {
    try {
        // Extract data from the request body
        const { taskName, description, dueDate, priority, progress } = req.body;

        // Find the task by its ID
        const taskId = req.params.id;
        const existingTask = await Task.findById(taskId);
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found. Invalid task ID.' });
        }

        // Update the task document
        // existingTask.taskName = taskName;
        // existingTask.description = description;
        // existingTask.dueDate = dueDate;
        // existingTask.priority = priority;
        existingTask.progress = progress;

        // Save the updated task document
        const updatedTask = await existingTask.save();

        // Capture the assignee and recipient emails
         const assigneeEmail = existingTask.assigneeEmail;
         const recipientEmail = existingTask.recipientEmail;

           // Send email to both assignee and recipient
        const mailOptions = {
            from: 'jeeva.narayanan2012@gmail.com',
            to: [assigneeEmail, recipientEmail], // Sending email to both assignee and recipient
            subject: 'Task Updated',
            text: `Task "${taskName}" has been updated.\n\nDescription: ${description}\nDue Date: ${dueDate}\nProgress: ${progress}\n Assignee: ${assigneeEmail}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });


        // Send success response
        res.status(200).json({ message: 'Task updated successfully.', task: updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error. Failed to update task.' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Check if the task with the given ID exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        // Delete the task document from the database
        await Task.findByIdAndDelete(taskId);

        // Remove the task ID from assignee and recipient documents
        await User.updateMany(
            { email: { $in: [task.assigneeEmail, task.recipientEmail] } }, // Update both assignee and recipient
            { $pull: { task: taskId } } // Remove the task ID from the "task" array
        );

         // Capture the assignee and recipient emails
         const assigneeEmail = task.assigneeEmail;
         const recipientEmail = task.recipientEmail;


          // Send email to both assignee and recipient
          const mailOptions = {
            from: 'jeeva.narayanan2012@gmail.com',
            to: [assigneeEmail, recipientEmail], // Sending email to both assignee and recipient
            subject: 'Task Deleted',
            text: `Task "${task.taskName}" has been deleted.\n\nDescription: ${task.description}\nAssignee: ${task.assigneeEmail}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // Send success response
        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error. Failed to delete task.' });
    }
};



// taskall Data 
// exports.getAllTaskList =  async(req,res) => {
//         await Task.find()
//         .then((task)=> res.json(task))
//         .catch((err) => res.send(err))
// 



//get Task of each person
exports.getAllTasksPer = async (req, res) => {
    try {
        const getTaskUserId = req.params.id;
        const result = await User.findById(getTaskUserId).populate('task');


        if (!result) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Populate details of each task
        const populatedTasks = await Promise.all(result.task.map(async taskId => {
            const populatedTask = await Task.findById(taskId);
            return populatedTask;
        }));

        res.json({
            UserEmail: result.email,
            PerUserTask: {
                tasks: populatedTasks
            }
        });
    } catch (err) {
        console.error('Error getting tasks:', err);
        res.status(500).json({ error: 'Internal server error. Failed to get tasks.' });
    }
};


// exports.acceptTask = async (req, res) => {
//     try {
//         const taskId = req.params.taskId;

//         // Find the task by taskId and update the accepted field to true
//         const updatedTask = await Task.findByIdAndUpdate(taskId, { accepted: true }, { new: true });

//         // Extract task name and description
//         const { taskName, description, recipientEmail, assigneeEmail } = updatedTask;

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
// };

exports.acceptTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Find the task by taskId and update the accepted field to true
        const updatedTask = await Task.findByIdAndUpdate(taskId, { accepted: true }, { new: true });

        // Check if the task was found and updated successfully
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        // Extract task name and description
        const { taskName, description, recipientEmail, assigneeEmail } = updatedTask;

        // Send email to the assignee
        const mailOptions = {
            from: 'jeeva.narayanan2012@gmail.com',
            to: assigneeEmail,
            subject: `Task Accepted: ${taskName}`,
            text: `Task: ${taskName}\nDescription: ${description}\nYour task has been accepted. \n Recipient: ${recipientEmail}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email.' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Task accepted successfully.', task: updatedTask });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


//Complete task
exports.completTask = async (req,res) => {
    try {
        const taskId = req.params.taskId;

        // Find the task by taskId and update the accepted field to true
        const updatedTask = await Task.findByIdAndUpdate(taskId, { completed: true }, { new: true });

        // Check if the task was found and updated successfully
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        // Extract task name and description
        const { taskName, description, recipientEmail, assigneeEmail } = updatedTask;

        // Send email to the assignee
        const mailOptions = {
            from: 'jeeva.narayanan2012@gmail.com',
            to: assigneeEmail,
            subject: `Task is Completed: ${taskName}`,
            text: `Task: ${taskName}\nDescription: ${description}\nYour task is Completed Successfully. \n Recipient: ${recipientEmail}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email.' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Task Completed  successfully.', task: updatedTask });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}




exports.rejectTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Find the task by taskId and update the accepted field to false (rejected)
        const updatedTask = await Task.findByIdAndUpdate(taskId, { accepted: false }, { new: true });

        // Send email to the assignee
        const assigneeEmail = updatedTask.assigneeEmail; // Assuming you have the assignee's email stored in the task document
        const mailOptions = {
            from: 'your_email@example.com',
            to: assigneeEmail,
            subject: 'Task Rejected',
            text: 'Your task has been rejected.'
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email.' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Task rejected successfully.', task: updatedTask });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


//accepted task per person.
exports.accepted = async (req, res) => {
   try {
        // const userId = req.params.userId;
        const getTaskUserId = req.params.id;

        // Query the database for accepted tasks by the specified user ID
        const acceptedTasks = await Task.find({ getTaskUserId, accepted: true });

        // Return the accepted tasks in the response
        res.status(200).json({ success: true, data: acceptedTasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


//completed task per person
exports.completed = async (req,res) => {
    try{
        const getTaskUserId = req.params.id;
        const completedTask = await Task.find({ getTaskUserId, completed: true});
        res.status(200).json({success: true, data: completedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({succeess: false, error:'Inteernal server error'});
    }
}
