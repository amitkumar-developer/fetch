import React, { useEffect,useState } from 'react'
function Albums() {
   const [data,setData]=useState([])
  const [numItems, setNumItems] = useState(3);
  const [newAlbums, setNewAlbums] = useState({
    id: '',
    userId: '',
    title: '',
    
  });
  
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/Albums?_limit=${numItems} `).then((result)=>{
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
    setNewAlbums({
      ...newAlbums,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddAlbum = () => {
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: 'POST',
      body: JSON.stringify(newAlbums),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData([...data, responseData]);
        setNewAlbums({
          id: '',
          userId: '',
          title: '',
          
        });
      });
  };

  const handleUpdateAlbum = (postId) => {
    const updatedPost = {
      ...newAlbums,
      id: postId,
    };
    fetch(`https://jsonplaceholder.typicode.com/albums/${postId}`, {
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
        setNewAlbums({
          id: '',
          userId: '',
          title: '',
          
        });
      });
  };

  const handleDeleteAlbum = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${postId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedData = data.filter((item) => item.id !== postId);
        setData(updatedData);
      });
  };

   return (
     <div className="App">
       <h1> Get API Call </h1>
       <label>
        Number of Items:
        <input type="number" value={numItems} onChange={handleNumItemsChange} />
      </label>
       <table>
        <thead>
       <tr>
       <td>id</td>
        <td>userId</td>
       <td>title</td>
       
       
       </tr>
  </thead>
     <tbody>
      {
       data.map((item)=>
        <tr>
        <td>{item.id}</td>
        <td>{item.userId}</td>
       <td>{item.title}</td>
       <td>
                <button onClick={() => handleUpdateAlbum(item.id)}>Update</button>
                <button onClick={() => handleDeleteAlbum(item.id)}>Delete</button>
              </td>
       
     </tr>
 )
      }
     </tbody>
     </table>
     <h2>Add New Post</h2>
      <label>
        ID:
        <input type="number" name="id" value={newAlbums.id} onChange={handleInputChange} />
      </label>
      <label>
        User ID:
        <input type="number" name="userId" value={newAlbums.userId} onChange={handleInputChange} />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={newAlbums.title} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddAlbum}>Add Albums</button>
    </div> 
   );
    }
    export default Albums;