const newPostHandler = async (event) => {
    event.preventDefault();
  
    
    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-text').value.trim();

    console.log(`New post title: ${title}`);
    console.log(`New post text: ${description}`);

  
    if (title && description) {
      const response = await fetch(`/api/posts/newPost`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create new post');
      }
    }
  };

  document.querySelector('#new-post').addEventListener('click', newPostHandler);
