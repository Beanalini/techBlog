/****************User login********************************************************/

const userHandler = async (e) => {
    e.preventDefault();
  
    // Collect values from the login form
    const userEmail = document.querySelector('#user-email').value.trim();
    const userPsw = document.querySelector('#user-password').value.trim();
   
    if (userEmail && userPsw) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ userEmail, userPsw }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        //The user has successfully logged in
        console.log("sucessfuly logged in JS");
        document.location.replace('/dashboard');
      } else {
        alert("Incorrect Login credentials");
      }
    }
   };
  
  document.querySelector('#form-login').addEventListener('submit', userHandler);
  /*********************************************************************************************/
  