const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    author:{type:String, required:true},  
    title:{type:String, required:true, unique: true},  
    img:{type:String, required:true, unique: true},  
    // details:{type:String, required:true},  
    genre:{type:String, default:"pending"},  
    opened:{type:String, default:"pending"},  
    progress:{type:String, required:true},  
})

module.exports = mongoose.model("Books", BooksSchema);