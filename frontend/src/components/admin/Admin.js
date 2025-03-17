import axios from "axios";
import { useState } from "react";
import { BaseURL } from "../../utils";

const Admin = () => {
  const [message, setMessage] = useState('');
  const show = async () => {
    const token = JSON.parse(localStorage.getItem("token"))
    // const token = "abc";
    alert("Token From Admin is  " +token);
    const response = await axios.get(`${BaseURL}/api/Protected`, {
      headers: {
          Authorization: 'Bearer ' + token
      }
   
  });
  setMessage(response.data.message);
     }
     return(   
      <div>
          <input type="button" value="Show Protected" onClick={show} /> <br/><br/>
          {message}
      </div>
    )
    }
     export default Admin;