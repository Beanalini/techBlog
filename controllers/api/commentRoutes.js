const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////////////////////////////////////
//commentRoute.js contains routes related to comment related activity //
//             /api/comments                                          //
///////////////////////////////////////////////////////////////////////

//data needed to display post and comments with post header info
//return post info, user details, blog comments
console.log("inside comments route");


  
  module.exports = router;