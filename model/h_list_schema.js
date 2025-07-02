const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const h_list_schema = new Schema({
    reason: {
        type: String,
        required: true
    },
    auto_id:{
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    product_qty_g:{
        type: String,
        required: true
    },
    product_qty_gu: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    product_mm_name: {
        type: String,
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model("H_list", h_list_schema);