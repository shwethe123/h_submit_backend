const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attractions_schema = new Schema({
    title: {
        type : String,
        required : true
    },
    latitude : {
        type : Number,
        required : true
    },
    longitude : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        require : true
    }
}, {timestamps: true});

module.exports = mongoose.model("Attractions", attractions_schema);