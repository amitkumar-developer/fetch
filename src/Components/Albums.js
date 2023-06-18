import React, { useEffect,useState } from 'react'
function Albums() {
   const [data,setData]=useState([])
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/Albums ").then((result)=>{
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
       <td>id</td>
        <td>userId</td>
       <td>title</td>
       
       
     </tr>
      {
       data.map((item)=>
        <tr>
        <td>{item.id}</td>
        <td>{item.userId}</td>
       <td>{item.title}</td>
       
       
     </tr>
 )
      }
     </table>
    </div> 
   );
    }
    export default Albums;