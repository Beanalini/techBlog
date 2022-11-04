const router = require('express').Router();
const { User, Post, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

//create new user account
router.post('/signUp', async (req, res) => {
  console.log(req.body);
  try {    
    const userData = await User.create(req.body);
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(userData);
      
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//login route
router.post('/login', async (req, res) => {
  //console.log(req.body);  
  try {
      
      const userData = await User.findOne({ where: { email: req.body.userEmail } });
      //console.log(`User route: ${req.body.userEmail}${req.body.userPsw}`)
  
      if (!userData) {
        console.log("email not found");
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      //console.log("email found");
      const validPassword = await userData.checkPassword(req.body.userPsw);
  
      if (!validPassword) {
        //console.log("password not found");
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      console.log("email and password ok");
      console.log(`User ID = ${userData.user_name} and ${userData.id}`);
     

        
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
         
        console.log("saving session");
        
        res.json({ user: userData, message: 'You are now logged in!' });                  
      });
  
    } catch (err) {
      console.log("at the bottom");
      res.status(400).json(err);
    }
  });


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
