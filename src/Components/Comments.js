import React, { useEffect,useState } from 'react'
function Comments() {
   const [data,setData]=useState([])
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/comments ").then((result)=>{
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
       <td>postId</td>
        <td>id</td>
       <td>name</td>
       <td>email</td>
       <td>body</td>
       
     </tr>
      {
       data.map((item)=>
        <tr>
        <td>{item.postId}</td>
        <td>{item.id}</td>
        <td>{item.name}</td>
       <td>{item.email}</td>
       <td>{item.body}</td>
       
     </tr>
 )
      }
     </table>
    </div> 
   );
    }
    export default Comments;