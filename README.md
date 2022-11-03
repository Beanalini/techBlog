# Tech Blog [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
  
  ## Table of Contents  
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Walk Through Video](#walk-through-video)
  * [Screen Shots](#screen-shots)
  * [Tests](#tests)
  * [Technologies Used](#technologies-used)  
  * [Questions](#questions)
  * [How to Contribute](#How-to-Contribute)   
  * [License](#license)
  
  ## Description



  
       
  ### Functional Requirements

  The functional requirements that the Tech Blog application has been designed to meet, is defined by the user story and acceptance criteria listed below.  

  #### User Story

 ```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

 

#### Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```


  ## Installation
  
  After cloning the application follow the instructions below to install the application:

    
  Install dependancies:

       npm i

  In order to connect mySQL to the database you will need to create a .env file in the project root directory that includes the following code:

    DB_NAME='techBlog_db'
    DB_USER='root'
    DB_PASSWORD=<'your password'>     

  

 ## Usage
  
  

 ## Deployed Application

   Click on the link below to view the Tech Blog Application.

   - [Link to Tech Blog application]()

   

  ## Screen Shots

  The following screen shot.. 

 ![Landing page](./assets/images/homepage.png)

 ![Login page](./assets/images/login_page.png)

![Sign up page](./assets/images/sign-up-page.png)

![Homepage logged in user](./assets/images/homepage-loggedUser.png)

  ![dashboard](./assets/images/yourPosts.png)  

  ![edit post](./assets/images/editPost.png)

  ![post with comments](./assets/images/postCommentAdd.png)

   ![Edit comments](./assets/images/editComment.png)

  ## Tests
  No code tests have been implemented.

  ## Technologies Used
  - JavaScript
  - Node Js
  - MySQL
  - Sequelize
  - MySQL
  - Handlebars
  - Bcrypt
  - Heroku

  - dotenv npm package
  
  ## Resources
    
  - How to add key value pairs to all objects in an array: [https://stackoverflow.com/questions/39827087/add-k- key-value-pair-to-all-objects-in-array](https://stackoverflow.com/questions/39827087/add-key-value-pair-to-all-objects-in-array)

  - Logical operators in a handlebars {{#if}} conditional: (https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional)

  - Handlebars builtin helper functions: [(https://handlebarsjs.com/guide/builtin-helpers.html#if)](https://handlebarsjs.com/guide/builtin-helpers.html#if)  

  - Window location cheat sheet: [(https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/)](https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/)

  
 
  ## Questions
  If you have any questions regarding this project or contents of this repository, please contact me via:
  
  - email: dat826@gmail.com
  - GitHub: [Beanalini](https://github.com/Beanalini)  


  
  ## Contributing
  If you would like to contribute to this project you can contact me by email at dat826@gmail.com or through my GitHub account   @[Beanalini](https://github.com/Beanalini).
  

  ## License
  This project is covered under the MIT License  
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 
  