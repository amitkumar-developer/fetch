import React, { useEffect, useState } from 'react';

function Posts() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((result) => {
        result.json().then((resp) => {
          setData(resp);
        });
      });
  }, []);

  console.warn(data);


  return (
    <div className="App">
      <h1>Get API Call</h1>
     
      <table>
       
          <tr>
            <th>id</th>
            <th>userId</th>
            <th>title</th>
            <th>body</th>
          </tr>
   
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Posts;
