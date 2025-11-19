import React, {useEffect, useState} from 'react';
import api from '../utils/api';
import L from 'leaflet';

export default function AdminDashboard(){
  const [reports,setReports]=useState([]);
  useEffect(()=>{ fetchReports(); },[]);
  const fetchReports = async ()=>{ 
    try{ const r = await api.get('/reports'); setReports(r.data); }
    catch(e){ alert(e.response?.data?.error || e.message); }
  };

  useEffect(()=>{
    if (!reports.length) return;
    const map = L.map('map').setView([reports[0].lat || 0, reports[0].lng || 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    reports.forEach(rep=>{
      if (!rep.lat || !rep.lng) return;
      const color = rep.suggestedBin || 'blue';
      const icon = L.divIcon({ className: 'marker', html: `<div style="background:${color};width:14px;height:14px;border-radius:50%"></div>` });
      const m = L.marker([rep.lat, rep.lng], { icon }).addTo(map);
      m.bindPopup(`<b>${rep.wasteType}</b><br/>${rep.address || ''}<br/><img src='${rep.photoUrl}' style='max-width:150px'/>`);
    });
    // clean up on unmount
    return ()=>map.remove();
  },[reports]);

  return (
    <div style={{padding:10}}>
      <h3>Admin Dashboard</h3>
      <div id="map" style={{height:500}}></div>
      <h4>Reports ({reports.length})</h4>
      <ul>
        {reports.map(r=> (
          <li key={r._id} style={{marginBottom:10}}>
            <b>{r.wasteType}</b> — {r.address} — {r.suggestedBin} — {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
