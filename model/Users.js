const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
         type: String
        },
    email:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: Number
    },
    employeement:{
        type: String
    }
},{timestamps: true});



// usersSchema.statics.byName = function(name){
//     return this.find({name : new RegExp(name , "i")})
// }



// usersSchema.query.byName = function(name){
//     return this.where({name : new RegExp(name , "i")})
// }

// usersSchema.virtual("namedEmail").get(function(){
//     return `${this.name} <${this.email}>`
// })




const User = mongoose.model("user",usersSchema)

module.exports = User