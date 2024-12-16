const User = require('../models/userModel');

// GET: Search users by username or email
const searchUsers = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: "Username query is required." });
        }

        console.log("Searching for:", name); // Debug log

        const user = await User.find({
            $or: [
                { username: { $regex: name, $options: "i" } },
                { email: { $regex: name, $options: "i" } },
            ],
        });

        console.log("Found users:", user); // Debug log
        res.json(user);
    } catch (error) {
        console.error("Error during search:", error); // Log error details
        res.status(500).json({ error: "Server Error" });
    }
};

// POST: Update multiple users
const updateUsers = async (req, res) => {
    try {
        const { records } = req.body;

        // Validate the payload
        if (!records || !Array.isArray(records) || records.length === 0) {
            return res.status(400).json({ error: "Invalid payload or no records provided." });
        }

        // Extract custom IDs from the records
        const recordIds = records.map(record => record.id);

        // Find all existing users by custom 'id' field
        const existingUsers = await User.find({ id: { $in: recordIds } });

        if (existingUsers.length !== records.length) {
            return res.status(404).json({
                error: "Some records do not exist.",
                missingRecords: recordIds.filter(id => !existingUsers.find(user => user.id === id)),
            });
        }

        // Update each record and collect results
        const updatedRecords = await Promise.all(
            records.map(async record => {
                return await User.findOneAndUpdate({ id: record.id }, record, { new: true });
            })
        );

        // Respond with updated records
        res.status(200).json({ success: true, updatedRecords });
    } catch (error) {
        console.error("Error updating users:", error); // Log error details for debugging
        res.status(500).json({ error: "Server Error" });
    }
};


module.exports = { searchUsers, updateUsers };
