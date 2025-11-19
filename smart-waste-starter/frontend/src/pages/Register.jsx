import React, {useState} from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();
  const submit = async ()=>{ 
    try{
      const r = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', r.data.token);
      nav('/');
    }catch(e){ alert(e.response?.data?.error || e.message); }
  };
  return (
    <div style={{padding:20}}>
      <h3>Register</h3>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
