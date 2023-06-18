import React, { useEffect, useState } from 'react';

function Posts() {
  const [data, setData] = useState([]);
  const [numItems, setNumItems] = useState(5);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${numItems}`)
      .then((result) => {
        result.json().then((resp) => {
          setData(resp);
        });
      });
  }, [numItems]);

  console.warn(data);

  const handleNumItemsChange = (event) => {
    setNumItems(parseInt(event.target.value));
  };

  return (
    <div className="App">
      <h1>Get API Call</h1>
      <label>
        Number of Items:
        <input type="number" value={numItems} onChange={handleNumItemsChange} />
      </label>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>userId</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
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
