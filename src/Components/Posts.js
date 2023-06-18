import React, { useEffect, useState } from 'react';

function Posts() {
  const [data, setData] = useState([]);
  const [numItems, setNumItems] = useState(5);
  const [newPost, setNewPost] = useState({
    id: '',
    userId: '',
    title: '',
    body: '',
  });
  
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${numItems}`)
      .then((result) => {
        result.json().then((resp) => {
          setData(resp);
        });
      });
  }, [numItems]);

  console.warn(data);

  const handleNumItemsChange = (event) => {
    setNumItems(parseInt(event.target.value));
  };

  const handleInputChange = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData([...data, responseData]);
        setNewPost({
          id: '',
          userId: '',
          title: '',
          body: '',
        });
      });
  };

  const handleUpdatePost = (postId) => {
    const updatedPost = {
      ...newPost,
      id: postId,
    };
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPost),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        const updatedData = data.map((item) =>
          item.id === postId ? updatedPost : item
        );
        setData(updatedData);
        setNewPost({
          id: '',
          userId: '',
          title: '',
          body: '',
        });
      });
  };

  const handleDeletePost = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedData = data.filter((item) => item.id !== postId);
        setData(updatedData);
      });
  };

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
            <th>id</th>
            <th>userId</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>
                <button onClick={() => handleUpdatePost(item.id)}>Update</button>
                <button onClick={() => handleDeletePost(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Post</h2>
      <label>
        ID:
        <input type="number" name="id" value={newPost.id} onChange={handleInputChange} />
      </label>
      <label>
        User ID:
        <input type="number" name="userId" value={newPost.userId} onChange={handleInputChange} />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={newPost.title} onChange={handleInputChange} />
      </label>
      <label>
        Body:
        <input type="text" name="body" value={newPost.body} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
}

export default Posts;
