const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Login session has expired!  Please login again.');
      document.location.replace('/');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  