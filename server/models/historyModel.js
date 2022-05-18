const mongoose= require("mongoose");

const historySchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.ObjectId ,
        ref : "User",
        required : true ,
    } ,
    name : {
        type : String ,
        required : true 
    } ,
    rating : {
        type : Number ,
        required : true 
        
    } ,
    comment : {
        type : String , 
        required : true 
    }

})

module.exports = mongoose.model("History" , historySchema);
