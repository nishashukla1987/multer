import axios from 'axios';
import { useState, useEffect } from 'react';
export default function List() {
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    axios.get('/api/allpicture').then((response) => {
      setPictures(response.data); // get all pics
    });
  });
  return (
    <>
      <ul>
        {pictures.length > 0 &&
          pictures.map((item, index) => {
            return (
              <li key={index}>
                <img src={'/images/' + item.filename} width='40' height='40' />
              </li>
            );
          })}
      </ul>
    </>
  );
}
