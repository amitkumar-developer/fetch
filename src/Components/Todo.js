import React, { useEffect,useState } from 'react'
function Todo() {
   const [data,setData]=useState([])
  const [numItems, setNumItems] = useState(3);
  const [newTodo, setNewTodo] = useState({
    id: '',
    userId: '',
    title: '',
    completed: '',
  });
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${numItems} `).then((result)=>{
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
    setNewTodo({
      ...newTodo,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddTodo = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData([...data, responseData]);
        setNewTodo({
          id: '',
          userId: '',
          title: '',
          completed: '',
        });
      });
  };

  const handleUpdateTodo = (TodoId) => {
    const updatedTodo = {
      ...newTodo,
      id: TodoId,
    };
    fetch(`https://jsonplaceholder.typicode.com/todos/${TodoId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        const updatedData = data.map((item) =>
          item.id === TodoId ? updatedTodo : item
        );
        setData(updatedData);
        setNewTodo({
          id: '',
          userId: '',
          title: '',
          completed: '',
        });
      });
  };

  const handleDeleteTodo = (TodoId) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${TodoId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedData = data.filter((item) => item.id !== TodoId);
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
    
    <td>userId</td>
    <td>id</td>
          <td>title</td>
    <td>completed</td>
    
  </tr>
  </thead>
     <tbody>
   {
    data.map((item)=>(
     <tr>
     <td>{item.userId}</td>
     <td>{item.id}</td>
            <td>{item.title}</td>
    <td>{item.completed}</td>
    <td>
                <button onClick={() => handleUpdateTodo(item.id)}>Update</button>
                <button onClick={() => handleDeleteTodo(item.id)}>Delete</button>
              </td>
  </tr>
 )
      )}
      </tbody>
     </table>
     <h2>Add New Todo</h2>
      <label>
        ID:
        <input type="number" name="id" value={newTodo.id} onChange={handleInputChange} />
      </label>
      <label>
        User ID:
        <input type="number" name="userId" value={newTodo.userId} onChange={handleInputChange} />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={newTodo.title} onChange={handleInputChange} />
      </label>
      <label>
        Completed:
        <input type="text" name="body" value={newTodo.body} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div> 
   );
    }
    export default Todo;