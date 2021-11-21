const Post = require('../models/Posts');
const mongoose = require('mongoose');

exports.getPosts = async (req, res) => {
	try {
		const Posts = await Post.find();
		return res.status(200).json(Posts);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

exports.createPost = async (req, res) => {
	const post = req.body;
	const newPost = new Post(post);

	try {
		await newPost.save();
		return res.status(201).json(newPost);
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

exports.updatePost = async (req, res) => {
	const post = req.body;
	const { id: _id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res
			.status(404)
			.json({ message: 'Not post with that Id' });
	}

	try {
		const updatedPost = await Post.findByIdAndUpdate(
			_id,
			post,
			{ new: true }
		);

		return res.status(201).json(updatedPost);
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

exports.deletePost = async (req, res) => {
	const post = req.body;
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ message: 'Not post with that Id' });
	}

	try {
		await Post.findByIdAndDelete(id);

		return res
			.status(201)
			.json({ message: 'Post deleted successfully!!!' });
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

exports.likePost = async (req, res) => {
	const post = req.body;
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ message: 'Not post with that Id' });
	}

	try {
		const post = await Post.findById(id);
		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ likeCount: post.likeCount + 1 },
			{ new: true }
		);

		return res
			.status(201)
			.json(updatedPost);
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};
