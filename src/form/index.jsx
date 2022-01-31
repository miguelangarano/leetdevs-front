import { useState } from 'react';
import './styles.css'

const Form = (props) => {
  const showHideClassName = props.show ? "Form display-block" : "Form display-none";
  const [text, setText] = useState('')
  const [image, setImage] = useState()

  function onInputChange (e) {
    switch (e.target.name) {
      case 'text': {
        setText(e.target.value)
        break
      }
      case 'image': {
        console.log(e.target.files)
        setImage(e.target.files[0])
        break
      }
      default:
        break
    }
  }

  return <div className={showHideClassName}>
    <div className="Form-main">
      <label>New Post</label>
      <div className='input-container'>
        <label>Texto</label>
        <input name='text' type="text" onChange={onInputChange} placeholder='Write what you want to share!' />
      </div>
      <div className='input-container'>
        <label>Imagen</label>
        <input name='image' type="file" onChange={onInputChange} />
      </div>
      <div className='buttons-container'>
        <button onClick={() => props.onPublish(text, image)}>Publicar</button>
        <button onClick={() => props.onCancel()}>Cancelar</button>
      </div>
    </div>
  </div>
}

export default Form;