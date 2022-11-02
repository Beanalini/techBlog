/****************User sign-up********************************************************/
  
const signUpHandler = async (e) => {
    e.preventDefault();
  
    // Collect values from the login form
    const user_name = document.querySelector('#user-name').value.trim();
    const email = document.querySelector('#user-email').value.trim();
    const password = document.querySelector('#user-password').value.trim();
   
    if (email && password && user_name) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/signUp', {
        method: 'POST',
        body: JSON.stringify({ user_name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        //The user has successfully logged into the dashboard
        
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector('#form-signUp').addEventListener('submit', signUpHandler);
/*********************************************************************************************/