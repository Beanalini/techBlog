const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');
//////////////////////////////////////////////////////////////////////
//PostRoute.js contains all routes related to Post related activity //
//             /api/posts                                          //
/////////////////////////////////////////////////////////////////////
console.log("inside postRoutes");

//add new post
router.post('/newPost', withAuth, async (req, res) => {
    try {
      const newProject = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//serve post edit page
router.get('/edit/:id', async (req, res) => {
    console.log("inside post routes edit post")
    try {
      
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User
            
          },
        ],
      });
      
      const post = postData.get({ plain: true });
      console.log(post);
  
      res.render('editPost', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });




module.exports = router;
