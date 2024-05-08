const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String,
    list: [
        {
           type: mongoose.Types.ObjectId,
           ref:"list"
        },
    ],
    task:[
        {
            type:mongoose.Types.ObjectId,
            ref:"task"
        }
    ]
    
},{timestamps:true});


const userdb = new mongoose.model("users",userSchema);

module.exports = userdb;




