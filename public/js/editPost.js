const editPostHandler = async (event) => {
    event.preventDefault();
  
    console.log("inside edit post")
    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-text').value.trim();
    const postId = document.getElementById('span');
    const id = parseInt(postId);


    console.log(`New post title: ${title}`);
    console.log(`New post text: ${description}`);
    console.log(`Post id is: ${id}`);

  
    if (title && description && id) {
      const response = await fetch(`/api/posts/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed edit post');
      }
    }
  };

  document.querySelector('#new-post').addEventListener('click', editPostHandler);