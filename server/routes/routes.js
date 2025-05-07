const router = require("express").Router()

const {registerUser, loginUser, getUser, getUsers, editUser, followUnfollowUser, changeUserAvatar} = require('../controllers/userControllers')
const {createPost, updatePost, deletePost, getPost, getPosts, getUserPosts, getUserBookmarks, createBookmark, likeDislikePosts, getFollowingPosts} = require("../controllers/postControllers")
const authMiddleware = require("../middleware/authMiddleware")


//USER ROUTES
router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.get("/users/bookmarks", getUserBookmarks); // brought this route here to avoid conflict with get user
router.get('/users/:id', authMiddleware, getUser)
router.get('/users', authMiddleware, getUsers)
router.patch('/users/:id', authMiddleware, editUser)
router.get('/users/:id/follow-unfollow', authMiddleware, followUnfollowUser)
router.post('/users/avatar', authMiddleware, changeUserAvatar)
router.get("/users/:id/posts",  getUserPosts)



//POST ROUTES
router.post("/posts", createPost)
router.get("/posts/:id", getPost)
router.get("/posts", getPosts)
router.patch("/posts/:id", updatePost)
router.delete("/posts/:id", deletePost);
router.get("/posts/:id/like", likeDislikePosts);
router.get("/posts/following", getFollowingPosts);
router.get("/posts/:id/bookmark", createBookmark);



module.exports = router;