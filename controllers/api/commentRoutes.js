const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
//////////////////////////////////////////////////////////////////////
//PostRoute.js contains all routes related to Post related activity //
//             /api/posts                                          //
/////////////////////////////////////////////////////////////////////

router.post('/commentCreate',  withAuth, async (req, res) => { 
  console.log("new comment");
  console.log(req.body.message);
  console.log(req.body.post_id);
  console.log(req.session.user_id);
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});






router.get('/view/:id',  withAuth, async (req, res) => {
  console.log("inside  view comments route ")
  try {
        console.log(req.params.id);
        const commentsData = await Comment.findAll({
          where: {
            post_id: req.params.id,

          },
          include : [ { model: User}], //{ model: User },
          
        });

        const postData = await Post.findByPk(req.params.id, {
            include: [
              {
                model: User
                
              },
            ],
          });

          //serialise data for handlebars
          const post = postData.get({ plain: true });
          console.log(post);

        if (!Array.isArray(commentsData) || !commentsData.length) {
          // array does not exist, is not an array, or is empty
          // ⇒ need to return the post and user data only
          console.log("no comments associated with this post")
          
          
      
          //return post and user data to the comment page 
          res.render('comments', {
            ...post,
            logged_in: req.session.logged_in
          });

        } else {
          //comments associated with post - return comments with user data and  post with user data 
                
                const commentSer = commentsData.map((comment) => comment.get({ plain: true }));
                console.log(commentSer );

                res.render('comments', {
                  ...post,
                  commentSer,
                  logged_in: req.session.logged_in
              });
        }

    } catch (err) {
      res.status(500).json(err);
    }
});





module.exports = router;
