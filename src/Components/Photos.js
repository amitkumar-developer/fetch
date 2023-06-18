import React, { useEffect,useState } from 'react'
function Photos() {
   const [data,setData]=useState([])
  const [numItems, setNumItems] = useState(3);

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
    </tbody>
     </table>
    </div> 
    
   );
    }
    export default Photos;