import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Posts from './Components/Posts';
import Comments from './Components/Comments';
import Todo from './Components/Todo';
import Photos from './Components/Photos';
import Albums from './Components/Albums';




const App = () => {
  return (
    <div>
      
  


<BrowserRouter>
      <Link to="/Posts" >Posts</Link><br></br>
      <Link to="/Comments" >Comments</Link><br></br>
      <Link to="/Todo" >Todos</Link><br></br>
      <Link to="/Photos" >Photos</Link><br></br>
      <Link to="/Albums" >Albums</Link><br></br>


      <Routes>
           <Route path="/posts" element={<Posts/>}/>
           <Route path="/comments" element={<Comments/>}/>
           <Route path="/todo" element={<Todo/>}/>
           <Route path="/photos" element={<Photos/>}/>
           <Route path="/albums" element={<Albums/>}/>



      </Routes>
      </BrowserRouter>
    

         

      {/* <Posts />
      <Comments />
      <Todo />
      <Photos/>
      <Albums/> */}



    </div>
  );
};

export default App;
