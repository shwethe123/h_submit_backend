const JobPost = require('../../../model/mobile/find_job/find_job'); // Renamed model import

const find_job_controller = {
  // Get all posts, with optional filtering by postType
  index: async (req, res) => {
    try {
      const { type } = req.query; // e.g., /api/job_posts?type=employer
      const filter = {};
      if (type && ['employer', 'seeker'].includes(type)) {
        filter.postType = type;
      }

      const posts = await JobPost.find(filter).sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ msg: "Error getting posts", error: error.message });
    }
  },

  // Get a single post by its ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await JobPost.findById(id);
      
      if (!post) {
        return res.status(404).json({ msg: 'Post not found with this ID' });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ msg: "Error getting post detail", error: error.message });
    }
  },

  // Create a new post (either employer or seeker)
  store: async (req, res) => {
    try {
      // Destructure all possible fields from the request body
      const {
        postType, userId, location, lat, lng, contactInfo,
        companyName, jobTitle, jobDescription, salaryRange,
        fullName, skill, bio, experience
      } = req.body;
      
      const imagePath = req.file ? req.file.path : null;

      if (!postType || !userId || !location || !lat || !lng || !contactInfo || !imagePath) {
          return res.status(400).json({ msg: "Missing required common fields" });
      }

      const newPostData = {
        postType, userId, location, coordinates: { lat, lng }, contactInfo, image: imagePath,
        companyName, jobTitle, jobDescription, salaryRange,
        fullName, skill, bio, experience
      };

      const newPost = await JobPost.create(newPostData);
      res.status(201).json(newPost);

    } catch (error) {
      res.status(500).json({ msg: "Error creating post", error: error.message });
    }
  },

  // --- Other functions like incrementView, popular can remain the same ---
  // --- You can add new functions for updating, deleting, and adding reviews later ---

//   incrementView: async (req, res) => {
//     try {
//       const { id } = req.params;
//       await JobPost.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
//       res.status(200).json({ msg: 'View count updated' });
//     } catch (error) {
//       res.status(500).json({ msg: 'Failed to update view count', error: error.message });
//     }
//   },

    incrementView: async (req, res) => {
        try {
        const { id } = req.params;
        // Use findByIdAndUpdate to increment the viewCount field by 1
        await JobPost.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
        res.status(200).json({ msg: 'View count updated' });
        } catch (error) {
        res.status(500).json({ msg: 'Failed to update view count', error: error.message });
        }
    },

    addReview: async (req, res) => {
    const { id } = req.params; // The ID of the post to be reviewed
    // Data from the person writing the review
    const { reviewerId, reviewerName, rating, comment } = req.body;

    if (!reviewerId || !reviewerName || !rating || !comment) {
        return res.status(400).json({ msg: 'All review fields are required.' });
    }

    try {
        const newReview = {
            reviewerId,
            reviewerName,
            rating,
            comment,
        };
        
        const updatedPost = await JobPost.findByIdAndUpdate(
            id,
            { $push: { reviews: newReview } }, // Use $push to add the new review to the array
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ msg: 'Post not found.' });
        }

        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(500).json({ msg: 'Error adding review', error: error.message });
    }
    },

  popular: async (req, res) => {
    try {
      const topPosts = await JobPost.find().sort({ viewCount: -1 }).limit(10);
      res.json(topPosts);
    } catch (e) {
      res.status(500).json({ error: 'Failed to load popular posts' });
    }
  }
};

module.exports = find_job_controller;