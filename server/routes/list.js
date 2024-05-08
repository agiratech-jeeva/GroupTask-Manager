// const router = require("express").Router();
// const User = require('../model/userSchema');
// const List = require('../model/list');


// //create task
// router.post("/addTask",async(req,res) => {
//   try{
//     const {title,body,id} = req.body;
//     const exsistingUser = await User.findById(id);
//     if(exsistingUser){
//         const list = new List({title,body,user:exsistingUser});
//         await list.save().then(() => res.status(200).json({list}));
//         exsistingUser.list.push(list);
//         exsistingUser.save();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })
// //update task
// // router.put("/updateTask/:id",async(req,res) => {
// //     try{
// //       const {title,body} = req.body;
// //       const list =  await List.findByIdAndUpdate(req.params.id,{title,body});
// //       list.save().then(()=> res.status(200).json({message:"Task Updated"}));
// //       }
// //     }catch (error) {
// //       console.log(error);
// //     }
// //   })
// router.put("/updateTask/:id", async (req, res) => {
//   try {
//       const { title, body } = req.body;
//       await List.findByIdAndUpdate(req.params.id, { title, body });
//       res.status(200).json({ message: "Task Updated" });
//   } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// //Deletetask 
// router.delete("/deleteTask/:id",async(req,res) => {
//     try{
//       const {id} = req.body;
//       const exsistingUser = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}});
//       if(exsistingUser){
//       await List.findByIdAndDelete(req.params.id).then(()=> 
//        res.status(200).json({message:"Task Deleted"}));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   })
  
// //get task 
// router.get("/getTasks/:id",async (req,res)=>{
//   const list = await List.find({user:req.params.id}).sort({createdAt:-1});
//   if (list.length !== 0) {
//     res.status(200).json({list:list});
//   }
//   else{
//     res.status(200).json({message:" is here"})
//   }
// })

// module.exports = router;


const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

// Routes
router.post('/addTask', listController.addTask);
router.put('/updateTask/:id', listController.updateTask);
router.delete('/deleteTask/:id', listController.deleteTask);
router.get('/getTasks/:id', listController.getTasks);

module.exports = router;
