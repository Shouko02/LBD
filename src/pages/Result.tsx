import { useNavigate } from 'react-router-dom'
import '../style/pagesStyle/Result.css'
import { useEffect, useState } from 'react'
import Navbar from '../components/NavBar'

function Result({profile,datas,ip ,setUserHis}:any) {
    const [result,setResult]=useState<any>(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if(profile != null && datas != null){
        fetch(ip + ':8000/api/get/result', {
          headers: {
              'Content-Type': 'application/json'
          },
          method: "POST",
          redirect: 'follow',
          body: JSON.stringify({
            "userEmail":profile.email,
            "userData":datas
          })})
          .then(rep=>rep.json())
          .then(res=>{
            console.log(res)
            fetch(ip+':8000/api/get/category?id='+res.description)
            .then(rep=>rep.json())
            .then(res=>{
              setResult(res) 
              console.log(res)});
          })
          .catch(err=>{console.log(err)})
      
          console.log(result)}else{
            navigate('/Login')
          }
        
      
      },[])

const getlogoResult = (name: any) => {
  if (name === 1) {
    return (<img className='image' src='images/Cow.jpg' />)
  }
  if (name === 2) {
    return (<img className='image' src='images/Rat.jpg' />)
  }
  if (name === 3) {
    return (<img className='image' src='images/Bear.jpg' />)
  }
  if (name === 4) {
    return (<img className='image' src='images/Falcon.jpg' />)
  }
}
    const pageChan = ()=>{
        navigate('/Home')
    }
    return (
        <>

            {result ? (
                <>
                <Navbar profile={profile} ip={ip}  setUserHis={setUserHis} />
                    <div className='main'>
                    
                        <div className='result'>
                            <div className='image'>
                            {getlogoResult(result.id)}
                           </div>
                           <div className='behaviors'>
                                <p className='title'>ผลออกมาแล้ว! </p>
                                <p className='title'>นิสัยของคุณนั้นคล้ายกับ <u>{result.nameTh}</u> มากที่สุด.</p>
                                <br />
                                <p className='pBehavior'>
                                    โดย{result.nameTh}มีพฤติกรรมคือ: {result.behaviorTh}.
                                </p>
                           </div>
                        </div>
                        <div className='pageChan'>
                            <button className='ele-btr' onClick={pageChan}>กลับไปหน้าหลัก</button>
                        </div>
                    </div>

                </>
            ) : (
                <>
                    <div className='center-text'>
                        <p>กำลังประมวลผล</p>
                    </div>
                </>
            )}
        </>
    )
}

export default Result