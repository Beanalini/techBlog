const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
//////////////////////////////////////////////////////////////////////
//PostRoute.js contains all routes related to Post related activity //
//             /api/posts                                          //
/////////////////////////////////////////////////////////////////////


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
   try {    
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User
          
        },
      ],
    });
    
    const editpage = postData.get({ plain: true });
    
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
   try {
      
      const postEdit = await Post.update(req.body, {
          
          where: {
            id: req.params.id,
          },    
          
    });
    
    res.status(200).json(postEdit);
      
    } catch (err) {
      
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
