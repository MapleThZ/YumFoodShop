import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from './css/AddPurchase.module.css';

const ReportCost = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const searchReport = async () => {

    }

    const clearReport = async () => {
        setStartDate(new Date())
        setEndDate(new Date())
    }

    return (
        <div>
            <div className='grid grid-rows-1 justify-items-center'>
                <h1 className='header-context'>สรุปรายการวัตถุดิบ</h1>
            </div>


            <div className='grid grid-cols-4 grid-rows-1 gap-2'>
                <div className=""></div>
                <div className="merge-row">
                    <div className='text-right' style={{ width: '120px' }}>จากวันที่* : </div>
                    <div className={style.selectBoxSize}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date("2024-01-01")}
                            maxDate={endDate}
                        />
                    </div>
                </div>
                <div className="merge-row">
                    <div className='text-right' style={{ width: '120px' }}>ถึงวันที่* : </div>
                    <div className={style.selectBoxSize}>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={startDate}
                            maxDate={new Date()}
                        />
                    </div>
                </div>
                <div className=""></div>
            </div>

            <div className='grid grid-cols-8 grid-rows-1'>
                <div></div>
                <div></div>
                <div></div>
                <button className='button' onClick={searchReport}>
                    ค้นหา
                </button>
                <button className='button' onClick={clearReport}>
                    ล้างข้อมูล
                </button>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className='grid grid-cols-1 grid-rows-1'>

            </div>
        </div>
    )
}

export default ReportCost;