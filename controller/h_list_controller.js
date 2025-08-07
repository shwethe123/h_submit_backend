const mongoose = require('mongoose');
const h_list_schema = require('../model/h_list_schema');

const h_list_controller = {
    index: async (req, res) => {
        try {
            const get_h_list = await h_list_schema.find().sort({ updatedAt: -1 });
            return res.json(get_h_list);
        } catch (error) {
            return res.status(500).json({ msg: "Error", error: error.message });
        }
    },

    post: async (req, res) => {
        try {
            const { reason, auto_id, product_id, product_qty_g, product_qty_gu, user_id, product_mm_name } = req.body;
    
            if (!reason || !auto_id || !product_id || !product_qty_g || !product_qty_gu || !user_id || !product_mm_name) {
                return res.status(400).json({ msg: "Required fields are missing." });
            }
            const new_reason = await h_list_schema.create({
                reason,
                auto_id,
                product_id,
                product_qty_g,
                product_qty_gu,
                user_id,
                product_mm_name
            });
    
            return res.status(201).json(new_reason);
        } catch (error) {
            return res.status(500).json({ msg: "Error", error: error.message });
        }
    }
}

module.exports = h_list_controller;
