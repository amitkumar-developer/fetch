import React, { useEffect,useState } from 'react'
function Comments() {
   const [data,setData]=useState([])
  const [numItems, setNumItems] = useState(8);
  const [newComment, setNewComment] = useState({
    postId: '',
    id: '',
    name: '',
    email: '',
    body: '',
  });
  // const [updateCommentId, setUpdateCommentId] = useState('');
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/comments?_limit=${numItems}`).then((result)=>{
    result.json().then((resp)=>{
       //
      setData(resp)
    })
  })
},[numItems])

  console.warn(data)
  const handleNumItemsChange = (event) => {
    setNumItems(parseInt(event.target.value));
  };
  const handleInputChange = (event) => {
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });
  };
  const handleAddComment = () => {
    fetch("https://jsonplaceholder.typicode.com/comments", {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData([...data, responseData]);
        setNewComment({
          postId: '',
          id: '',
          name: '',
          email: '',
          body: '',
        });
      });
  };
  const handleUpdateComment = (updateCommentId) => {
    const updatedComment = {
      ...newComment,
      id: updateCommentId,
    };
    fetch(`https://jsonplaceholder.typicode.com/comments/${updateCommentId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedComment),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        const updatedData = data.map((item) =>
          item.id === updateCommentId ? updatedComment : item
        );
        setData(updatedData);
        setNewComment({
          postId: '',
          id: '',
          name: '',
          email: '',
          body: '',
        });
        // setUpdateCommentId('');
      });
  };
  const handleDeleteComment = (commentId) => {
    fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedData = data.filter((item) => item.id !== commentId);
        setData(updatedData);
      });
  };
      
  // const handleUpdateCommentIdChange = (event) => {
  //   setUpdateCommentId(event.target.value);
  // };
  
  return (
    <div className="App">
      <h1>Get API Call</h1>
      <label>
        Number of Items:
        <input type="number" value={numItems} onChange={handleNumItemsChange} />
      </label>
      <table>
        <thead>
          <tr>
            <th>postId</th>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.postId}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.body}</td>
              <td>
                <button onClick={() => handleUpdateComment(item.id)}>Update</button>
                <button onClick={() => handleDeleteComment(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Comment</h2>
      <label>
        Post ID:
        <input type="number" name="postId" value={newComment.postId} onChange={handleInputChange} />
      </label>
      <label>
        ID:
        <input type="number" name="id" value={newComment.id} onChange={handleInputChange} />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={newComment.name} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="text" name="email" value={newComment.email} onChange={handleInputChange} />
      </label>
      <label>
        Body:
        <input type="text" name="body" value={newComment.body} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddComment}>Add Comment</button>
  
      {/* <h2>Update Comment</h2>
      <label>
        Comment ID:
        <input type="text" value={updateCommentId} onChange={handleUpdateCommentIdChange} />
      </label>
      <button onClick={handleUpdateComment}>Update Comment</button> */}
    </div>
  );
  
    }
    export default Comments;