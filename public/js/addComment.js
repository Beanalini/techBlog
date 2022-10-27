const addCommentHandler = async (event) => {
    event.preventDefault();
  
    console.log("inside add comment")
    const message = document.querySelector('#comment-text').value.trim();
    
    const input = document.getElementById('span');
    const post_id = parseInt(input.getAttribute('data-postId'));
    

    console.log(`New comment text: ${message}`);
    console.log(`Post id is: ${post_id}`);

  
    if (message &&  post_id) {
      const response = await fetch(`/api/comments/commentCreate`, {
        method: 'POST',
        body: JSON.stringify({ message, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add new comment');
      }
    }
    console.log("comment successfully added");
   };
  

  document.querySelector('#new-comment').addEventListener('click', addCommentHandler);