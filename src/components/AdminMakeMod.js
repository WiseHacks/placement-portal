import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';
import axios from 'axios';
import { makeModerator } from '../services/email-service';
import {toast} from 'react-toastify'

export const MakeModForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    makeModerator(email).then((resp)=>{
        toast.success("Success !!");
        
    }).catch((err) => {
        console.log(err);
    })
    // try {
    //   const response = await axios.post('/api/submit-email', { email });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Enter student email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Confirm</Button>
    </form>
  );
};

