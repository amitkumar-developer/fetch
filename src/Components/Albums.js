import React, { useEffect,useState } from 'react'
function Albums() {
   const [data,setData]=useState([])
  const [numItems, setNumItems] = useState(3);

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
       
       
     </tr>
 )
      }
     </tbody>
     </table>
     
    </div> 
   );
    }
    export default Albums;