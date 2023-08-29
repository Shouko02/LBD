import React from 'react'
import '../style/pagesStyle/Home.css'

import Navbar from '../components/NavBar'
import Choices from '../components/Choices'




export default function Home({ profile, setUserHis, ip,  selectedLanguage ,datas,coices }:any) {
  return (
    <div>
                <Navbar profile={profile}
                setUserHis={setUserHis} ip={ip}
                selectedLanguage={selectedLanguage}/>
 

                <Choices 
                datas={datas}  coices={coices} ip={ip}/>
    </div>
  )
}