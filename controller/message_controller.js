const message_model = require('../model/message');

const message_controller = {
  index: async (req, res) => {
    try {
      const messages = await message_model.find().sort({ createdAt: -1 });
      return res.json(messages);
    } catch (err) {
      return res.status(500).json({ msg: "Error fetching messages", error: err.message });
    }
  },

  store: async (req, res) => {
    try {
      const { text, sender } = req.body;
      console.log('POST BODY:', req.body);
      const newMessage = new message_model({ text, sender });
      await newMessage.save();
      return res.json(newMessage);
    } catch (err) {
      return res.status(500).json({ msg: "Error saving message", error: err.message });
    }
  }
};

module.exports = message_controller;
