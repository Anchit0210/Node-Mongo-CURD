const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Enter name"]
        },
        age:{
            type: Number,
            required: [true, "Enter age"]
        },
        gender:{
            type: String,
            required: [true, "Enter gender"]
        },
        phone:{
            type: Number,
            required: [true, "Enter mobile number"]
        },
    },
    {
        timestamps : true,
    }
)

const People = mongoose.model( 'People' , peopleSchema );

module.exports = People;