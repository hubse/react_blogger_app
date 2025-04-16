const verifyToken = require('../Middlewares/verifyToken');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../services/postService');

const checkPostOwner = async (req, res, next) => {
    try {
        const post = await getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.author._id.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to modify this post' });
        }
        req.post = post;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await createPost(title, content, req.userId);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const post = await getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await updatePost(req.params.id, title, content);
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await deletePost(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    checkPostOwner,
    create,
    getAll,
    getById,
    update,
    remove,
    verifyToken
};
