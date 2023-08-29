import React, { useState, useEffect, useRef } from 'react'
import '../style/componentsStyle/NavBar.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom';



import Select, { SelectChangeEvent } from '@mui/material/Select';
function Navbar({ profile, setUserHis, ip}: any) {
    const navigate = useNavigate();
    const clientId = "34799196571-duahakscjfrf7441706a5vubai5097ot.apps.googleusercontent.com"//ดึง api google
    const [img, setimg] = useState("i");

    const [gender, setGender] = useState(null)
    const [birthday, setBirthday] = useState<any>(null)
    const [lastname, setLastname] = useState(null)

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<any>(null);
    const apiKey = 'AIzaSyCNOHGqoNsdxWiNIN5ey0gidtomQ1feeOg'


  
    useEffect(() => {
        if (profile !== null) {
            const me = profile.googleId

            const initClient = () => {
                console.log("init");

                gapi.client.init({
                    apiKey: apiKey,
                    discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
                }).then(() => {
                    return gapi.client.people.people.get({
                        'resourceName': 'people/' + me,
                        'personFields': 'ageRanges,birthdays,genders,phoneNumbers',
                    }).then((response: any) => {
                        console.log(response.result)
                        saveObj(response.result);
                    })
                })

            };

            // return()=>{
            gapi.load("client:auth2", initClient);
            // }
            // gapi.load("client", getData)
        } else { navigate('/Login') }
    }, [])
    const onHistory = () => {
        fetch(ip + ':8000/api/get/all/user/history?email=' + profile.email)
            .then(rep => rep.json())
            .then(res => {
                userHisSet(res)
                console.log(res)
            }).then(()=>{navigate('/History')})
            .catch(setUserHis(null));
        
    }
    const userHisSet = (res: any) => {
        if (res.length > 0) {
            console.log(res)
            setUserHis(res)
        }
    }
    const saveObj = (res: any) => {
        // const birthday=res.birthdays[0].date
        if (res.gender != undefined) {
            setGender(res.genders[0].value)
        }
        if (res.birthdays != undefined) {
            console.log("true1")
            const birthday = res.birthdays[0].date
            if (birthday.month.length == 1) {
                birthday.month = "0" + birthday.month;
            }
            setBirthday(birthday.year + "-" + birthday.month + "-" + birthday.day)
        }
        if (profile.givenName != undefined) {
            setLastname(profile.givenName)
        }
        fetch(ip + ':8000/api/user/login', {
            headers: {
                // 'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            method: "POST",
            redirect: 'follow',
            body: JSON.stringify({
                "firstName": profile.familyName,
                "lastName": lastname,
                "email": profile.email,

                "image": profile.imageUrl,
                "birthdays": birthday,
                "gender": gender
            })
        })
            .then(rep => rep.json())
            .then(res => { getimg(res) })
            .catch(err => { console.log(err) })

    }
    const getimg = ((res: any) => {
        if (res.description !== null) {
            if (res.description === "1") { setimg('images/Cow.jpg') }
            if (res.description === "2") { setimg('images/Rat.jpg') }
            if (res.description === "3") { setimg('images/Bear.jpg') }
            if (res.description === "4") { setimg('images/Falcon.jpg') }
        }

    })

   
    const logOut = () => {
    
        navigate('/Login')
    };

    const toggleMenu = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    };
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

 
    return (
        <div className='nav-main'>
             {profile ? (

<div className='box' >
<div>
<img className='logo-new'src="/imageLogo/NewWork1.png" alt="" />

</div>

    <div className='box-images'> {profile.name}
        <img className='img-pro' src={profile ? profile.imageUrl : ""} alt='/imagesLogo/users-null.jpg'
            onClick={toggleMenu}
        />
       
    <div ref={menuRef} className={`hidden-menu ${showMenu ? 'show' : 'hide'}`}>
        <div className="card" style={{ backgroundImage: `url(${img})`,backgroundSize: 'cover' }}> </div>
        <div className='card-info'>
            <center>
                <img className='img-pro1' src={profile.imageUrl} alt='/imagesLogo/users-null.jpg' />
            </center>

            <center>
                <p> <strong>{profile.name}</strong></p>
                <a style={{ paddingTop: '1rem' }}>
                    {profile.email}
                </a>
                <br />
                <br />
                <br />
                {/* <button className='btn-his' onClick={onHistory} >History</button> */}

            </center>
        </div>
        <div className="card1" >
        </div>

        <br />
        <br />
        <button className='btn-his' onClick={onHistory} >ประวัติการเล่น</button>

        <div >
            
            <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={logOut}
                render={renderProps => (
                    <button onClick={renderProps.onClick}
                        className='btn-logout'>
                        {/* <img className='logo' src="imagesLogo/Logout.png" /> */}
                        ออกจากระบบ
                    </button>
                )}
            />

        </div>
    </div>
    </div>

</div>

) : (
<>
?????????
</>
)}
 
        </div>
    );
}

export default Navbar
