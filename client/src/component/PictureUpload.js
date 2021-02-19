import axios from 'axios';
import { useState } from 'react';
export default function PictureUpload() {
  // export default class PictureUpload extends Component{}
  const [picture, setPicture] = useState();
  const [apiData, setApiData] = useState();
  // state = { picture: null, apiData: null }
  const sendPicture = (event) => {
    event.preventDefault();
    //console.log(event.target.profilePic.value)
    const formData = new FormData();
    formData.append('profilePic', picture);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post('/api/picture/upload', formData, config).then((response) => {
      console.log(response.data);
      setApiData(response.data);
      // this.setState({apidata: response.data})
    });
  };
  // this function will update picture data
  const selectPic = (event) => {
    setPicture(event.target.files[0]);
  };
  return (
    <>
      <h1>Welcome to multer site</h1>
      <form onSubmit={sendPicture}>
        <label>File upload</label>
        <input type='file' name='profilePic' onChange={selectPic} />
        <button type='submit'>Upload</button>
      </form>
      {apiData && (
        <div>
          <h2 style={{ color: 'red' }}>{apiData.message}</h2>
          <img src={'/images/' + apiData.picture.filename} />
        </div>
      )}
    </>
  );
}
