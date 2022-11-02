const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const { findByPk } = require('../../models/User');
const withAuth = require('../../utils/auth');
//////////////////////////////////////////////////////////////////////
//CommentRoute.js contains all routes related to comments related activity //
//             /api/comments                                          //
/////////////////////////////////////////////////////////////////////

//render single comment page for update/delete
router.get('/editView/:id', withAuth, async (req, res) => {

  console.log("inside post routes edit post")
  try {
    console.log(req.params.id);
    const commentData = await Comment.findByPk(req.params.id, {
      
    });
    
    const commentpage = commentData.get({ plain: true });
    console.log(commentpage);

    res.render('editComment', {
      ...commentpage,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//return post with associated comments 
//Allow comments from logged in user to edit/delete comments
router.get('/edit/:id', withAuth, async (req, res) => {
  console.log("inside edit comments")
  try {
    console.log(req.params.id);
    const commentData = await Comment.findAll( {
      where: [
        {
          post_id: req.params.id,
          user_id:  req.session.user_id,      
        
        }],
    });
    
    
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    /*Add logged in user id key/value pair to each comment object - this enables conditional checks (if logged in user =  comment id)
     in the handlebars template that allow the logged in user to edit their own comments.*/
    comments.forEach(test => {test.log_user = req.session.user_id});
    
    
    res.render('editComments', {
      ...comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



//Add a new comment to the post
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



//return all comments associated with the selected post
router.get('/view/:id',  withAuth, async (req, res) => {
  console.log("inside  view comments route ")
  try {
        //console.log(req.params.id);
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
          //console.log("no comments associated with this post")
          
               
          //return post and user data to the comment page 
          res.render('comments', {
            ...post,
            logged_in: req.session.logged_in,
            log_userId: req.session.user_id
          });

        } else {
          //comments associated with post - return comments with user data and  post with user data 
                
                const commentSer = commentsData.map((comment) => comment.get({ plain: true }));
                commentSer.forEach(test => {test.log_user = req.session.user_id});
                //commentSer.log_userId = req.session.user_id;
                console.log("testing log_user");
                console.log(commentSer);
                                
                res.render('comments', {
                  ...post,                  
                  commentSer,                  
                  logged_in: req.session.logged_in,
                  log_userId: req.session.user_id
                });
        }

    } catch (err) {
      res.status(500).json(err);
    }
});

//Delete logged in user comment
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,          
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//update post
router.put('/:id', withAuth, async (req, res) => {
   console.log(req.body.message);    
    console.log(req.params.id);
    
  try {
      
      const commentEdit = await Comment.update(req.body, {
          
          where: {
            id: req.params.id,
          },    
          
    });
    
    console.log(commentEdit);

      
    res.status(200).json(commentEdit);
      
    } catch (err) {
      console.log("in the error catch");
      res.status(500).json(err);
    }
  });


module.exports = router;
