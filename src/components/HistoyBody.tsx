import React, { useState } from 'react'
import '../style/pagesStyle/History.css'
import { ArrowBackIos, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

function HistoyBody({ profile, userHis, coices, getlogo, getProfile }: any) {
    const [pagi, setpagi] = useState(
        new Array(Math.round(userHis.length / 5)).fill("block", 0, 1).fill("none", 1)
    )
    const [cssL,setCssL] = useState(
        new Array(pagi.length).fill("btn-on", 0, 1).fill("btn-pagination", 1)
    )
    const [page, setPage] = useState(0)
    const pageChane = (page: any) => {
        setPage(page)
        const updatedCheckedState = pagi.map((item, index) =>
            index === page ? "block" : "none")
        const updatedCss = cssL.map((item,index)=>
            index === page ? "btn-on" : "btn-pagination")
        setCssL(updatedCss)
        setpagi(updatedCheckedState)
    }
    const ulList: any = [];

    const backShow = () => {
        if (page > 0) {
            pageChane(page - 1)
        }
    }
    const nextShow = () => {
        if (page < pagi.length-1) {
            pageChane(page + 1)
        }
    }
    const functionList = pagi.map((page, index) => {
        const startIndex = index * 5;
        const endIndex = (index + 1) * 5;
        return userHis.slice(startIndex, endIndex).map((his: any, index: any) => (
            <>

                <div key={his.id}>

                    <div className='date-his'>{his.dates}</div>

                    <div className='table-A' >
                        <div className='table-his' >
                            <div className='Like-box'>
                                <b className='section1'>เลือก 10 ลักษณะที่บ่งบอกความเป็นคุณ</b>
                                <div style={{ display: "flex", flexFlow: "wrap" }}>
                                    {his.likes.map((id: any) => (
                                        <div className='choice-id' >{coices[id - 1].nameTh}</div>
                                    ))}
                                </div>
                            </div>



                            <div className='DisLike-box' >
                                <b className='section2' >เลือก 5 ลักษณะที่ไม่ใช่คุณ</b>
                                <div style={{ display: "flex", flexFlow: "wrap" }} >
                                    {his.dislikes.map((id: any) => (
                                        <div className='choice-id' >
                                            {coices[id - 1].nameTh}
                                        </div>
                                    ))}
                                </div>
                            </div>



                            <div className='img-info'>
                                {getlogo(his.categoryId)}
                            </div>
                        </div>
                    </div>

                    <br />


                </div>
            </>
        ));
    });
    functionList.forEach((data, index) => {
        ulList.push(<ul key={index} style={{ display: pagi[index], padding: '10px' }}>{data}</ul>)
    })
    return (
        <div>
            {profile ? (
                <>



                    {userHis ? (
                        <>
                            <div className="history">
                                <div style={{ width: '100%' }}>
                                    {ulList}
                                </div>
                            </div>
                            <div className="pagination">
                                <button className="join-item btn btn-primary" onClick={backShow}><ArrowBackIosNew/></button>
                                {pagi.map((data, index) => (
                                    <button className={`${cssL[index]}`} onClick={() => pageChane(index)}>{index + 1}</button>
                                ))}
                                <button className="join-item btn btn-primary" onClick={nextShow}><ArrowForwardIos/></button>

                               

                            </div> 
                        </>
                    ) : (
                        <>
                            <div>
                                ยังไม่มีข้อมู
                            </div>
                        </>
                    )}

                </>
            ) : (
                <>
                    {getProfile()}
                </>
            )}
        </div>
    )
}

export default HistoyBody
