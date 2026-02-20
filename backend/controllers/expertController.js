const Expert = require('../models/Expert');

exports.getExperts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5;
    const { category, search } = req.query;

    const query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const experts = await Expert.find(query)
      .limit(limit)
      .skip((page - 1) * limit); // This is what makes the buttons work!

    res.json(experts);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) return res.status(404).json({ message: "Expert not found" });
    res.json(expert);
  } catch (err) {
    res.status(500).json({ error: "Invalid Expert ID" });
  }
};