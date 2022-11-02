///////////////////edit blog post//////////////////////////////////////
const editPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-text').value.trim();
    const input = document.getElementById('span');
    const id = parseInt(input.getAttribute('data-id'));
    
    if (title && description && id) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
      }
    }
    
   };  

  document.querySelector('#update-post').addEventListener('click', editPostHandler);
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////Delete Blog Post//////////////////////////////////////////////

  const deletePostHandler = async (event) => {
    event.preventDefault();
      
    const input = document.getElementById('span');
    const id = parseInt(input.getAttribute('data-id'));
  
    if (id) {
      const response = await fetch(`/api/posts/delete/${id}`, {
        method: 'DELETE',
        
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to DELETE post');
      }
    }
    
   };  

  document.querySelector('#delete-post').addEventListener('click', deletePostHandler);
  ////////////////////////////////////////////////////////////////////////////////////////