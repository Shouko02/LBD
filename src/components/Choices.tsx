import { useEffect, useState } from 'react'
import '../style/componentsStyle/Choices.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Choices({ datas, ip ,coices}: any) {
    const navigate = useNavigate();
    const [show, setshow] = useState(false)


    const [seleted, setSelete] = useState<any[]>([])
    const [indexs] = useState<any>([[], []])
    const [max, setMax] = useState(10)
    const [dataA, setDataA] = useState(0)
    const [sty, setSty] = useState("coice-g")
    const text = ["ถัดไป", "ยืนยันการส่ง"]
    useEffect(() => {
        indexs[0] = []
        indexs[1] = []
        datas[0] = []
        datas[1] = []

    }, [])
    const start = () => {
        setSelete(new Array(coices.length).fill("")) 
        setshow(true)
    }
    const shuffleArray = (array: []) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const SelectedError = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            //   zIndex:'999',
            background: '#FF5733',
            color: '#fff',
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast: any) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: 'warning',
            title: `เลือกให้ครบ ${max} รายการ.`,
        });
    };




    const SelectedSuccess = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            //   zIndex:'999',
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast: any) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: 'success',
            title: `เลือก ${max} รายการ คลิก${text[dataA]}ด้านล่าง`,
        });
    };
    useEffect(() => {
        if (datas[dataA].length === max) {
            SelectedSuccess();
        }
    }, [datas[dataA]]);
    const onChance = (position: any) => {
        const updateSeleted = seleted.map((item: any, index: any) =>
            datas[dataA].length < max
                ? index === position ? item === sty ? "" : sty : item
                : index === position ? "" : item)

        const updateDatas = updateSeleted.reduce((dataL, data, index) => {
            if (data === sty) { dataL.push(coices[index].id) }
            return dataL
        }, [])
        const updateIndexs = updateSeleted.reduce((dataL, data, index) => {
            if (data === sty) { dataL.push(index) }
            return dataL
        }, [])

        setSelete(updateSeleted)
        datas[dataA] = updateDatas
        indexs[dataA] = updateIndexs
    }
    const naxtPage = () => {
        if (datas[dataA].length === max) {
            if (indexs[1].length === 0) {
                setSelete(new Array(coices.length).fill(""))
                setMax(5)
                setSty("coice-r")
                setDataA(1)
            }
            else {
                setSelete(seleted.map((item: any, index: any) => {
                    for (var i = 0; i < indexs[1].length; i++) {
                        if (indexs[1][i] === index) { return item = "coice-r" }
                    }
                }
                ))
                setMax(5)
                setSty("coice-r")
                setDataA(1)
            }
        } else { SelectedError() }
    }
    const backPage = () => {
        const updateSeleted = seleted.map((item: any, index: any) => {
            for (var i = 0; i < indexs[0].length; i++) {
                if (indexs[0][i] === index) { return item = "coice-g" }
            }
        }
        )
        setSelete(updateSeleted)
        setMax(10)
        setSty("coice-g")
        setDataA(0)
    }
    const submitPage = () => {
        if (datas[dataA].length === max) {
            navigate('/Result')
        } else { SelectedError() }
    }

    return (
        <div className="main">


            <div className='bodyc'>
                {show ? (
                    <>
                        {coices ? (
                            <>
                                <div className='center-text des'>
                                    <p style={{ display: `${max === 10 ? "block" : "none"}` }}>เลื่อก {max} ข้อที่คิดว่าเหมือนคุณมากที่สุด</p>
                                    <p style={{ display: `${max === 5 ? "block" : "none"}` }}>เลื่อก {max} ข้อที่คิดว่าไม่เหมือนคุณมากที่สุด</p>
                                </div>
                                <div className='coiceS'>
                                    {coices.map((data: any, index: any) => (
                                        <div className={`${seleted[index]} coice-ele`} key={index} onClick={() => { onChance(index) }}>
                                            {data.nameTh}
                                        </div>
                                    ))}
                                </div>
                                <div className='center-text des'>
                                    <p>คุนได้เลือกไปแล้ว {datas[dataA].length} ข้อ.</p>
                                </div>
                                <div style={{ display: `${max === 10 ? "block" : "none"}` }} className='pageChan'>
                                    <button className='ele-bt' onClick={naxtPage}>ต่อไป</button>
                                </div>
                                <div style={{ display: `${max === 5 ? "block" : "none"}` }} className='pageChan'>
                                    <button className='ele-bt' onClick={backPage}>ย้อนกลับ</button>
                                    <button className='ele-bt' onClick={submitPage}>ส่งคำตอบ</button>
                                </div>


                            </>
                        ) : (
                            <>
                                <div className='center-text'>
                                    <span className="loading loading-spinner loading-lg"></span>
                                    <div><img style={{ width: '60px' }} src="/imageLogo/loading.jpg" alt="" /></div>
                                </div>

                            </>
                        )}

                    </>
                ) : (
                    <>
                        <div className='center-text'>
                            <h1>แบบทดสอบผู้นำ 4 ทิศ</h1>
                            <p>ยินดีตอนรับ ผู้เลน นี้คื่อเกมที่จะทายว่านิดใสของคุนนั้นครายกับสัสตัวใหน่ ถ่าพ้อมแล้วก่อกดเรีมได้เลย</p>
                            {/* <p>คุณมีบุคลิกเป็นผู้นำแบบใด?มีอะไรต้องปรับปรุงเปลี่ยนแปลงหรือไม่?</p> */}
                            <button className='btn-start' onClick={start}>เรี่มเล่น</button>
                            <div className='div-logo'>
                                <img className='logo-b' src="/imageLogo/person4.png" alt="" />
                            </div>
                        </div>
                    </>
                )}


            </div>




        </div>
    )
}

export default Choices