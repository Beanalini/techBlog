const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
//////////////////////////////////////////////////////////////////////
//PostRoute.js contains all routes related to Post related activity //
//             /api/posts                                          //
/////////////////////////////////////////////////////////////////////

router.post('/commentCreate', withAuth, async (req, res) => { 
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


router.get('/view/:id', withAuth, async (req, res) => {
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

  //serve post edit page with id data
router.get('/edit/:id', withAuth, async (req, res) => {
  console.log("inside post routes edit post")
  try {
    console.log(req.params.id);
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User
          
        },
      ],
    });
    
    const editpage = postData.get({ plain: true });
    console.log(editpage);

    res.render('editPost', {
      ...editpage,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

  

//update post
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.params.id);
    
  try {
      
      const postEdit = await Post.update(req.body, {
          
          where: {
            id: req.params.id,
          },    
          
    });
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.params.id);
    console.log(postEdit);

      console.log(postEdit);
    res.status(200).json(postEdit);
      
    } catch (err) {
      console.log("in the error catch");
      res.status(500).json(err);
    }
  });

  router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
      const projectData = await Post.destroy({
        where: {
          id: req.params.id,          
        },
      });
  
      if (!projectData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(projectData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
