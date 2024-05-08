const User = require('../model/userSchema');
const List = require('../model/list');

exports.addTask = async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save();
            existingUser.list.push(list);
            await existingUser.save();
            res.status(200).json({ list });
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const { title, body } = req.body;
        await List.findByIdAndUpdate(req.params.id, { title, body });
        res.status(200).json({ message: 'Task Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Task Deleted' });
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        if (list.length !== 0) {
            res.status(200).json({ list });
        } else {
            res.status(200).json({ message: 'No tasks found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
