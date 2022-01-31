import { useEffect, useState } from "react";
import { getUnixTime } from 'date-fns'
import './styles.css'

const Post = (props) => {
  const [time, setTime] = useState(props.postData.date);
  useEffect(() => {
    const inter = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000)

    return () => {
      clearInterval(inter);
    }
  }, [])

  const diff = (time - getUnixTime(new Date()));

  return <div className={diff <= 0 ? "Post-invisible" : "Post"}>
    <label className="Post-time">{`${diff} seconds left`}</label>
    <span>{props.postData.text}</span>
    {props.postData.image && <img className="Post-image" src={props.postData.image} />}
    <button className="Post-button" onClick={() => props.onLike(props.postData.id)}>{props.postData.likes} Likes</button>
  </div>
}

export default Post;