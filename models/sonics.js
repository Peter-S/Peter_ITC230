const mongoose = require('mongoose')

const connectionString = "mongodb+srv://dbuser:Password@sccproject-36t6z.mongodb.net/test?retryWrites=true&w=majority"


mongoose.connect(connectionString, { dbName: "itc230", useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});
 
// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
//  _id: String,
 player: String,
 position: String,
 number: {
   type: String,
   required: true,
   unique: true
 }
}); 

module.exports = mongoose.model('sonics', mySchema);
