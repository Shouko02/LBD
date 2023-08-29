import React, { useState } from 'react'
import '../style/pagesStyle/Login.css'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login'



export default function Login({profile,setProfile}:any) {
    const Swal = require('sweetalert2')
    const Navigate = useNavigate()
    const clientId = "34799196571-duahakscjfrf7441706a5vubai5097ot.apps.googleusercontent.com"

    const onSucces = async (res: any) => {
        setProfile(res.profileObj)

        console.log('succes', res.profileObj)
        Navigate('/Home');

    }
    const onError = (res: any) => {
        console.log('failure', res);
    };
    return (
        <div className='Main'>
            <div className='header'>
                    <img className='logo-new1'src="/imageLogo/NewWork1.png" alt="" />
                    
                    <div></div>
                    <div></div>
                </div>
                <div className='con-text'>
                    <div className='left-box'></div>
            <h1 className='con-a'>Testing habits</h1>

            </div>
            <div className='container'>
            
                <div className='con-img'>
                <img className='images-person' src="/imageLogo/person1.png" alt="" />

                    {/* <div className='con-box'>

                    </div> */}

                </div>
                <div className='con-login'>
                    <h4 className='text'>esting habits are practices that
                        testers use to ensure effective software
                        testing, such as planning, attention to
                        detail, collaboration, persistence, and
                        continuous learning.</h4>
                        <div className='login'>
                        <div style={{textAlign:'center'}} >
                                        <GoogleLogin
                                            render={renderProps => (
                                                
                                                
                                                <button onClick={renderProps.onClick}
                                                    className='btn-Login'
                                                ><div  style={{display:'flex'}} >
                                                    <img className='logo1' src="imageLogo/Google.png" />
                                                   <div className='t-b'>This is Login Google</div>   </div>
                                                </button>
                                              
                                            )}
                                            scope='https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.phonenumbers.read'
                                            clientId={clientId}
                                            onSuccess={onSucces}
                                            onFailure={onError}
                                            cookiePolicy='single_host_origin'
                                            isSignedIn={true}
                                        />
                                    </div>

                        </div>
                </div>
            </div>
            <div  className='nav-h'> </div>
            <div className='nav-bottom'>
                <div className='div-link'> </div>
                <div style={{backgroundColor:'#000' ,width:'1px'}}></div>
                <div className='contact'>
            <a href="https://www.facebook.com/NewWorkAcademySpace" rel="" target="_blank"  className="facebook-button"><img className='img-fb' src="/imageLogo/facebook.png" alt="" /></a>
            <a href="https://www.youtube.com/@newworkacademy1593" rel=""  target="_blank" className="youtube-button"><img className='img-yt' src="/imageLogo/youtube.png" alt="" /></a>
            </div>
            </div>
        </div>
    )
}
