import React, { useEffect, useState } from 'react'
import '../style/pagesStyle/History.css'
import { useNavigate } from 'react-router-dom';
import { Category, FastRewind } from '@mui/icons-material';
import { Button, Pagination, Stack } from '@mui/material';
import HistoyBody from '../components/HistoyBody';


function History({coices,userHis ,profile}: any) {


// .......................
  const navigate = useNavigate();
  const getProfile = () => {
    navigate('/Login')
  }
 
  

  const getlogo = (name: any) => {
    if (name === 1) {
      console.log("true")
      return (<img className='img-card' src='images/Cow.jpg' />)
    }
    if (name === 2) {
      return (<img className='img-card' src='images/Rat.jpg' />)
    }
    if (name === 3) {
      return (<img className='img-card' src='images/Bear.jpg' />)
    }
    if (name === 4) {
      return (<img className='img-card' src='images/Falcon.jpg' />)
    }
  }
  const handleBack = () => {
    navigate('/Home')
  }
  // ......................................................
  

  // ..............................................



  return (<>
  <div ></div>
    <div className='containerP' >
  <h1 style={{textAlign:'center' ,color:'#fff'}}>ประวัติการเล่น</h1>
    
    <div>
  {userHis ? (
                      <HistoyBody  userHis={userHis} profile={profile} coices={coices} getlogo={getlogo} getProfile={getProfile} />
                    ) : (
                        <>
                            <div >

                            <div className='history' >
                                ยังไม่มีข้อมู
                            </div>
                            </div>

                            {getProfile()}
                        </>
                    )}
      </div>
      <br />

      <button className='btn-back' onClick={handleBack} > <FastRewind /><b className='p-back'>ย้อนกลับ</b> </button>

      </div>


      </>

  );
}
export default History
