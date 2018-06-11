const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const User = mongoose.model('users');
const { passPort } = require('../shared/middlewares');
const { postValidator } = require('../shared/validators');

module.exports = (router) => {
    router.post('/posts', [passPort, postValidator], async () => {
        let post = new Post(Object.assign({ user: req.user.id }, req.body));
        post = await post.save();
        return res.json(post);
    });

    router.get('/posts', async (req, res) => {
        const posts = await Post.find().sort({ date: -1 });
        if (!posts.length) return res.status(404).json({message: 'no posts found'});
        return res.json(posts);
    });

    router.get('/posts/:id', async (req, res) => {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({message: 'no post found'});
        return res.json(post);
    });

    router.delete('/posts/:id', passPort, async (req, res) => {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({message: 'no post found'});
        if (post.user.toString() !== req.user.id) return res.status(401).json({message: 'user not authorized'});
        post = await Post.remove();
        return res.json({post, message: 'deleted successfully'});
    });

    router.post('/posts/:postId/likes', passPort, async (req, res) => {
        let post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'no post found' });
        const like = post.likes.find(l => l.user.toString() === req.user.id);
        if (like) return res.status(400).json({ message: 'user already liked this post' });
        post.likes.unshift({ user: req.user.id });
        post = await Post.save();
        return res.json(post);
    });

    router.delete('/posts/:postId/likes', passPort, async (req, res) => {
        let post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'no post found' });
        const index = post.likes.findIndex(l => l.user.toString() === req.user.id);
        if (index === -1) return res.status(400).json({ message: 'post has not been liked yet' });
        post.likes.splice(index, 1);
        post = await Post.save();
        return res.json(post);
    });

    router.post('/posts/:postId/comments', [passPort, postValidator], async (req, res) => {
        let post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'no post found' });
        post.comments.unshift(Object.assign({ user: req.user.id }, req.body));
        post = await Post.save();
        return res.json(post);
    });

    router.delete('/posts/:postId/comments/:id', passPort, async (req, res) => {
        let post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({message: 'no post found'});
        const comment = post.comments.find(c => c._id === req.params.id);
        if (!comment) return res.status(404).json({message: 'comment does not exist'});
        if (comment && comment.user.toString() === req.user.id) {
            const index = post.comments.findIndex(c => c._id === comment._id);
            post.comments.splice(index, 1);
            post = await Post.save();
            return res.json(post);
        }
        return res.status(400).json({ message: 'user can not delete comment'});
    });
}
