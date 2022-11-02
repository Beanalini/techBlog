///////////////////Add a new comment to a post/////////////////////////////////
const addCommentHandler = async (event) => {
    event.preventDefault();
  
    const message = document.querySelector('#comment-text').value.trim();    
    const input = document.getElementById('span');
    const post_id = parseInt(input.getAttribute('data-postId'));
      
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