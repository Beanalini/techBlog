const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//render homepage blog posts 
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    console.log("in root homeroutes");
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
    console.log(posts);
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
  console.log("in login homeroutes");
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signUp', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log("in signUp homeroutes");
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signUp');
})

router.get('/dashboard', withAuth, async (req, res) => {
  // User is already logged in, find their blog posts based on session ID
  console.log("in dashboard homeroutes");
  try {
    // Find the logged in user based on the session ID
   
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
})

//serve add new post page
router.get('/servePost', withAuth, (req, res) => {
  res.render('addpost', {
    logged_in: req.session.logged_in  
  });
}); 




module.exports = router;
