import React, { useEffect,useState } from 'react'
function Todo() {
   const [data,setData]=useState([])
  const [numItems, setNumItems] = useState(3);

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
    data.map((item)=>
     <tr>
     <td>{item.userId}</td>
     <td>{item.id}</td>
            <td>{item.title}</td>
    <td>{item.completed}</td>
    
  </tr>
 )
      }
      </tbody>
     </table>
    </div> 
   );
    }
    export default Todo;