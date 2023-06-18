import React, { useEffect,useState } from 'react'
function Todo() {
   const [data,setData]=useState([])
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/todos ").then((result)=>{
    result.json().then((resp)=>{
       //
      setData(resp)
    })
  })
},[])
  console.warn(data)
   return (
    <div className="App">
    <h1> Get API Call </h1>
    <table>
    <tr>
    <td>userId</td>
    <td>id</td>
          <td>title</td>
    <td>completed</td>
    
  </tr>
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
     </table>
    </div> 
   );
    }
    export default Todo;