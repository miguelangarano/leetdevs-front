import './App.css';
import { useEffect, useState } from 'react';
import Post from './post';
import Form from './form';
import axios from 'axios'

function App () {

  const url = "http://localhost:3001"

  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState([])

  async function getPostsList () {
    try {
      const res = await axios.get(
        url + "/posts"
      );
      setPosts([])
      setPosts(res.data.data);
      console.log(res.data.data);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    getPostsList()
  }, [])

  function newPost () {
    setModal(true);
  }

  async function onPublish (text, image) {
    console.log(text, image)
    const formData = new FormData();
    formData.append("file", image);
    formData.append("text", text);
    try {
      const res = await axios.post(
        url + "/posts",
        formData
      );
      setPosts(res.data.data)
      console.log(res.data.data);
    } catch (ex) {
      console.log(ex);
    }
    setModal(false);
  }

  async function likePost (postId) {
    const formData = new FormData();
    try {
      const res = await axios.patch(
        url + "/posts/" + postId
      );
      getPostsList()
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function getPostById (postId) {
    try {
      const res = await axios.get(
        url + "/posts/" + postId
      );
      let arr = [...posts];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === postId) {
          arr[i] = res.data.data
        }
      }
      console.log(arr)
      setPosts(arr);
      console.log(res.data.data);
    } catch (ex) {
      console.log(ex);
    }
  }

  function onCancel () {
    setModal(false);
  }

  return (
    <div className="App">
      <div className='Header'>
        <label>Todos los posts</label>
        <button onClick={newPost}>+ Nuevo Post</button>
      </div>
      <div className='Posts'>
        {posts.map(item => {
          return <Post key={item.id} postData={item} onLike={(id) => likePost(id)} />
        })}
      </div>
      <Form show={modal} onPublish={(text, image) => onPublish(text, image)} onCancel={onCancel} />
    </div>
  );
}

export default App;
