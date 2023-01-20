const mongoose = require('mongoose');
require("dotenv").config()
const port = process.env.PORT || 5000;
const connectDatabase = async function(app){
    try {
        mongoose.connect('mongodb+srv://musicapp:musicapp@cluster0.eqcfh.mongodb.net/?retryWrites=true&w=majority', ()=>{
            console.log("Database Connected");
            app.listen(port, ()=>{
                console.log(`Server listening on ${port}`);
            });
        });
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {connectDatabase};