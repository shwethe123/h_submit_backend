const Attraction = require('../../../model/mobile/attractions/attractions');

const attractions_controller = {
  index: async (req, res) => {
    try {
      const get_attractions = await Attraction.find().sort({ updatedAt: -1 });
      res.json(get_attractions);
    } catch (error) {
      res.status(500).json({ msg: "Error get", error: error.message });
    }
  },

  store: async (req, res) => {
    try {
      const { title, latitude, longitude, type, description } = req.body;
      const image = req.file.path;

      const new_attraction = await Attraction.create({
        title,
        latitude,
        longitude,
        type,
        image,
        description
      });

      res.status(201).json(new_attraction);
    } catch (error) {
      res.status(500).json({ msg: "Error", error: error.message });
    }
  },

  incrementView: async (req, res) => {
    try {
      const { id } = req.params;
      await Attraction.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
      res.status(200).json({ msg: 'View count updated' });
    } catch (error) {
      res.status(500).json({ msg: 'Failed to update view count', error: error.message });
    }
  },

  popular: async (req, res) => {
  try {
    const top = await Attraction.find().sort({ viewCount: -1 }).limit(10);
    res.json(top);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load popular attractions' });
  }
}

};

module.exports = attractions_controller;
