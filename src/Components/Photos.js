import React, { useEffect,useState } from 'react'
function Photos() {
   const [data,setData]=useState([])
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/photos ").then((result)=>{
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
        <td>albumId</td>
       <td>title</td>
       <td>url</td>
       <td>thumbnailUrl</td>

       
     </tr>
      {
       data.map((item)=>
        <tr>
        <td>{item.id}</td>
        <td>{item.albumId}</td>
       <td>{item.title}</td>
       <td>{item.url}</td>
       <td>{item.thumbnailurl}</td>

       
     </tr>
 )
      }
     </table>
    </div> 
   );
    }
    export default Photos;