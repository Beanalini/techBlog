const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//render homepage blog posts 
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in      
    });

    //for testing using Insomnia
    // res.status(200).json(postData);

   
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signUp', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signUp');
})

router.get('/dashboard', withAuth, async (req, res) => {
  // User is already logged in, find their blog posts based on session ID
   try {
    // Find the logged in user based on the session ID
   
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    //console.log(user);
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
})

//serve add new post page
router.get('/addPost', withAuth, async (req, res) => {
  try {
     res.render('addPost', {
    logged_in: req.session.logged_in  
  });
  } catch (err) {
    res.status(500).json(err)
  } 
});  



module.exports = router;
