////////////////////////////////////////////Edit Comment///////////////////////////////////////
const editCommentHandler = async (event) => {
    event.preventDefault();
     
    const message = document.querySelector('#comment-text').value.trim();
    const input = document.getElementById('span');
    const id = parseInt(input.getAttribute('data-id'));
    const post_id = parseInt(input.getAttribute('data-postId'));
    
      
    if (message) {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ message }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/api/comments/view/${post_id}`);
      } else {
        alert('Failed to edit post');
      }
    }
 };
  

  document.querySelector('#update-comment').addEventListener('click', editCommentHandler);
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////Delete Comment////////////////////////////////////////////

  const deleteCommentHandler = async (event) => {
    event.preventDefault();
      
    const input = document.getElementById('span');
    const id = parseInt(input.getAttribute('data-id'));
    const post_id = parseInt(input.getAttribute('data-postId'));
    

  
    if (id) {
      const response = await fetch(`/api/comments/delete/${id}`, {
        method: 'DELETE',
        
      });
  
      if (response.ok) {
        document.location.replace(`/api/comments/view/${post_id}`);
      } else {
        alert('Failed to DELETE post');
      }
    }
    
   };
  

  document.querySelector('#delete-comment').addEventListener('click', deleteCommentHandler);
  /////////////////////////////////////////////////////////////////////////////////////////////