import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import History from './pages/History';
import Result from './pages/Result';

function App() {
  const [profile, setProfile] = useState<any>(null);
  const [userHis, setUserHis] = useState<any>(null);
  const [coices, setCoices] = useState<any>(null)
  const [datas] = useState<any[]>([[], []]);
const [result , setResult] = useState<any>(null);
const ip = "http://192.168.1.14"



// fetch('https://api-text.shouko02.repl.co/characters')

useEffect(() => {

  fetch(ip + ":8000/api/find/all/choices")
    .then((response) => response.json())
    .then((res) => {
      setCoices(res);
    });
}, []);
  return (
    <div className="App">
<Routes>
<Route  path="/" element={<Login profile={profile} setProfile={setProfile} />} />
<Route  path="/Login" element={<Login  profile={profile} 
        setProfile={setProfile} />}/>
<Route  path="/Home"element={<Home  profile={profile} 
        setUserHis={setUserHis} ip={ip} 
         datas={datas} coices={coices} />} />
         <Route path='/History' element={ <History  
         profile={profile}
          userHis={userHis} 
          coices={coices} />}/>
         <Route path='/Result' element={ <Result  profile={profile} datas={datas} ip={ip}  setUserHis={setUserHis} />}/>

</Routes>
    </div>
  );
}

export default App;
