import React, { useEffect,useState } from 'react'
function Photos() {
   const [data,setData]=useState([])
  const [numItems, setNumItems] = useState(3);
  const [newPhoto, setNewPhoto] = useState({
    id: '',
    albumId: '',
    title: '',
    url: '',
    thumbnailUrl:'',
  });
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${numItems} `).then((result)=>{
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
    setNewPhoto({
      ...newPhoto,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddPhoto = () => {
    fetch("https://jsonplaceholder.typicode.com/photos", {
      method: 'POST',
      body: JSON.stringify(newPhoto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData([...data, responseData]);
        setNewPhoto({
          id: '',
          albumId: '',
          title: '',
          url: '',
          thumbnailUrl:'',
        });
      });
  };

  const handleUpdatePhoto = (photoId) => {
    const updatedPhoto = {
      ...newPhoto,
      id: photoId,
    };
    fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPhoto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        const updatedData = data.map((item) =>
          item.id === photoId ? updatedPhoto : item
        );
        setData(updatedData);
        setNewPhoto({
          id: '',
          albumId: '',
          title: '',
          url: '',
          thumbnailUrl:'',
        });
      });
  };

  const handleDeletePhoto = (photoId) => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedData = data.filter((item) => item.id !== photoId);
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
        <td>albumId</td>
       <td>title</td>
       <td>url</td>
       <td>thumbnailUrl</td>

       
       </tr>
  </thead>
     <tbody>
      {
       data.map((item)=>(
        <tr>
        <td>{item.id}</td>
        <td>{item.albumId}</td>
       <td>{item.title}</td>
       <td>{item.url}</td>
       <td>{item.thumbnailurl}</td>
       <td>
                <button onClick={() => handleUpdatePhoto(item.id)}>Update</button>
                <button onClick={() => handleDeletePhoto(item.id)}>Delete</button>
              </td>
       
     </tr>
 )
      )}
    </tbody>
     </table>
     <h2>Add new photo</h2>
     <label>
        ID:
        <input type="number" name="id" value={newPhoto.id} onChange={handleInputChange} />
      </label>
      <label>
        Album ID:
        <input type="number" name="albumId" value={newPhoto.albumId} onChange={handleInputChange} />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={newPhoto.title} onChange={handleInputChange} />
      </label>
      <label>
        Url:
        <input type="text" name="url" value={newPhoto.url} onChange={handleInputChange} />
      </label>
      <label>
        Thumbnail Url:
        <input type="text" name="thumbnailUrl" value={newPhoto.thumbnailUrl} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddPhoto}>Add Photo</button>
    </div> 
    
   );
    }
    export default Photos;