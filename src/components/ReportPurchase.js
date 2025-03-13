import React, { useState, useEffect } from 'react';
import eventEmitter from './utils/EventEmitter';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import style from './css/AddPurchase.module.css';

const platformListFn = () => {
    const [platformList, setPlatformList] = useState([]);

    useEffect(() => {
        const handleEvent = (data) => {
            setPlatformList(data);
        };

        eventEmitter.on('Platform', handleEvent);

        return () => {
            eventEmitter.off('Platform', handleEvent);
        };
    }, []);

    return platformList;
}

const mainProductListFn = () => {
    const [mainProductList, setMainProductList] = useState([]);

    useEffect(() => {
        const handleEvent = (data) => {
            setMainProductList(data);
        };

        eventEmitter.on('MainProduct', handleEvent);

        return () => {
            eventEmitter.off('MainProduct', handleEvent);
        };
    }, []);

    return mainProductList;
}

async function ReadExcelFileFromPathFn(startDate, endDate) {

    var excelFile = []

    const fetchData = async () => {

        const body = { typeFile: '-PurchaseList', pathFile: './public/excel', startDate: startDate, endDate: endDate }
        console.log(body)
        const response = await fetch('/api/search-all-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const result = await response.json();
        excelFile = [...result]
    };

    await fetchData();

    return excelFile
}

const ReportPurchase = () => {

    const [startDate, setStartDate] = useState(moment().tz("Asia/Bangkok").toDate());
    const [endDate, setEndDate] = useState(moment().tz("Asia/Bangkok").toDate());
    const [selectedPlatformOption, setSelectedPlatformOption] = useState('');
    const [selectedMainProductOption, setSelectedMainProductOption] = useState('');

    const platformList = platformListFn()
    const mainProductList = mainProductListFn()

    const handlePlatformChange = (event) => {
        setSelectedPlatformOption(event.target.value)
    };

    const handleMainProductChange = async (event) => {
        setSelectedMainProductOption(event.target.value)
    };

    const handleChangeStartDate = (date) => {
        const localDate = moment(date).tz("Asia/Bangkok").toDate();
        setStartDate(localDate);
    };

    const handleChangeEndDate = (date) => {
        const localDate = moment(date).tz("Asia/Bangkok").toDate();
        setEndDate(localDate);
    };

    const searchReport = async () => {
        const excelFile = await ReadExcelFileFromPathFn(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
        console.log(excelFile)
    }

    const clearReport = async () => {
        setStartDate(moment().tz("Asia/Bangkok").toDate())
        setEndDate(moment().tz("Asia/Bangkok").toDate())
        setSelectedPlatformOption('')
        setSelectedMainProductOption('')
    }

    return (
        <div>
            <div className='grid grid-rows-1 justify-items-center'>
                <h1 className='header-context'>สรุปรายการคำสั่งซื้อ</h1>
            </div>


            <div className='grid grid-cols-4 grid-rows-2 gap-2'>
                <div className=""></div>
                <div className="merge-row">
                    <div className='text-right' style={{ width: '120px' }}>จากวันที่* : </div>
                    <div className={style.selectBoxSize}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => handleChangeStartDate(date)}
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
                            onChange={(date) => handleChangeEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={startDate}
                            maxDate={new Date()}
                        />
                    </div>
                </div>
                <div className=""></div>

                <div className=""></div>
                <div className="merge-row">
                    <div className='text-right' style={{ width: '120px' }}>ผู้ให้บริการ: </div>
                    <div className={style.selectBoxSize}>
                        <select name="platform" id="platform"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-300"
                            value={selectedPlatformOption} onChange={handlePlatformChange}>

                            <option value="">Select...</option>
                            {platformList.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="merge-row">
                    <div className='text-right' style={{ width: '120px' }}>ชื่ออาหาร :</div>
                    <div className={style.selectBoxSize}>
                        <select name="mainProduct" id="mainProduct"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-300"
                            value={selectedMainProductOption} onChange={handleMainProductChange}>

                            <option value="">Select...</option>
                            {mainProductList.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
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

export default ReportPurchase;