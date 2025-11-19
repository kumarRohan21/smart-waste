import React, {useState} from 'react';
import api from '../utils/api';

export default function ReportForm(){
  const [photo,setPhoto]=useState(null);
  const [lat,setLat]=useState('');
  const [lng,setLng]=useState('');
  const [address,setAddress]=useState('');
  const [wasteType,setWasteType]=useState('household');
  const [notes,setNotes]=useState('');

  const captureLocation = ()=>{
    navigator.geolocation.getCurrentPosition(p=>{
      setLat(p.coords.latitude); setLng(p.coords.longitude);
    }, e=>alert('Location not available: ' + e.message));
  };

  const submit = async ()=>{
    try{
      let photoUrl = '';
      if (photo) {
        const fd = new FormData(); fd.append('photo', photo);
        const up = await api.post('/upload', fd, { headers: {'Content-Type':'multipart/form-data'} });
        photoUrl = up.data.url;
      }
      await api.post('/reports', { photoUrl, lat, lng, address, wasteType, notes });
      alert('Report submitted');
      setPhoto(null); setNotes('');
    }catch(e){ alert(e.response?.data?.error || e.message); }
  };

  return (
    <div style={{padding:20}}>
      <h3>Report Garbage</h3>
      <input type="file" accept="image/*" onChange={e=>setPhoto(e.target.files[0])} />
      <div>
        <button onClick={captureLocation}>Use my location</button>
        <div>Lat: {lat} Lng: {lng}</div>
      </div>
      <input placeholder="Address (optional)" value={address} onChange={e=>setAddress(e.target.value)} />
      <select value={wasteType} onChange={e=>setWasteType(e.target.value)}>
        <option value="household">Household</option>
        <option value="plastic">Plastic</option>
        <option value="glass">Glass</option>
        <option value="bio">Bio</option>
        <option value="mixed">Mixed</option>
      </select>
      <textarea placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
