import React, { useEffect,useState } from 'react'
function Comments() {
   const [data,setData]=useState([])
  const [numItems, setNumItems] = useState(8);

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
       <td>postId</td>
        <td>id</td>
       <td>name</td>
       <td>email</td>
       <td>body</td>
       
     </tr>
     </thead>
     <tbody>
      {
       data.map((item)=>(
        <tr>
        <td>{item.postId}</td>
        <td>{item.id}</td>
        <td>{item.name}</td>
       <td>{item.email}</td>
       <td>{item.body}</td>
       
     </tr>
 )
     ) }
      </tbody>
     </table>
    </div> 
   );
    }
    export default Comments;