import axios from 'axios';
import { useState, useEffect } from 'react';
export default function Profile() {
  let initialPicture =
    'data:image/jpeg;base64,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';
  const [file, setFile] = useState(); //null
  const [profilePic, setProfilePic] = useState(initialPicture);
  const [message, setMessage] = useState();
  // check for user data
  useEffect(() => {
    axios.get('/api/user/60104057562677a210f9b3f4').then((response) => {
      const user = response.data;
      console.log(user);
      setProfilePic(user.picture);
    });
  });
  const sendPicture = (event) => {
    event.preventDefault();
    //console.log(event.target.profilePic.value)
    const formData = new FormData();
    formData.append('profilePic', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post('/api/picture/upload', formData, config).then((response) => {
      console.log(response.data);
      setMessage(response.data);
      // this.setState({apidata: response.data})
    });
  };
  // this function will update file data
  const selectPic = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <div>
      {message && <div style={{ color: 'red' }}>{message}</div>}
      <img src={profilePic} width='100' height='100' />
      <form onSubmit={sendPicture}>
        <label>File upload</label>
        <input type='file' name='profilePic' onChange={selectPic} />
        <button type='submit'>Upload</button>
      </form>
      Name: Arif Age: 32
    </div>
  );
}
