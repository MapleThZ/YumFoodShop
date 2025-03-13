import React, { useState, useEffect } from 'react';
import Popup from './utils/Popup';
import { getCurrentDayMonthAndYear } from './utils/Date'

async function readCostExcel() {
    const response = await fetch('/api/read-cost-excel');
    const result = await response.json();
    return result
}

const AddCost = () => {

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const [costName, setCostName] = useState('');
    const [costSize, setCostSize] = useState('');
    const [costPrice, setCostPrice] = useState('');

    const handleCostNameChange = (e) => {
        setCostName(e.target.value);
    };

    const handleCostSizeChange = (e) => {
        setCostSize(e.target.value);
    };

    const handleCostPriceChange = (e) => {
        setCostPrice(e.target.value);
    };

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const addCost = async () => {
        try {

            const { day, month, year } = getCurrentDayMonthAndYear()

            const costExcel = await readCostExcel();

            const data = { seq: costExcel.length + 1, costName: costName, costSize: costSize, costPrice: costPrice }

            var body = { pathFile: './public/excel', fileName: year + '' + (month < 10 ? '0' + month : month) + '' + (day < 10 ? '0' + day : day) + '-CostList.xlsx', data: [...costExcel, data] }

            const response = await fetch('/api/write-excel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const result = await response.json();

            cancelCost()
            setPopupTitle('Success')
            setPopupMessage('เพิ่มข้อมูลสำเร็จ')
            togglePopup();
        } catch (error) {
            setPopupTitle('Error')
            setPopupMessage('ไม่สามารถเพิ่มข้อมูลได้')
            togglePopup();
        }
    }

    const cancelCost = async () => {
        setCostName('');
        setCostSize('');
        setCostPrice('');
    }

    return (
        <div>
            <Popup title={popupTitle} message={popupMessage} isVisible={isPopupVisible} togglePopup={togglePopup} />
            <div className='grid grid-rows-1 justify-items-center'>
                <h1 className='header-context'>เพิ่มรายการคำสั่งซื้อประจำวัน</h1>
            </div>


            <div className='grid grid-cols-3 grid-rows-4 gap-2'>
                <div className=""></div>
                <div className="merge-row">
                    <div className="text-right" style={{ width: '120px' }}>รายการวัตถุดิบ :</div>
                    <div className="" style={{ paddingLeft: '10px' }}>
                        <input
                            type="text"
                            value={costName}
                            onChange={handleCostNameChange}
                            placeholder="Cost Name"
                        />
                    </div>
                </div>
                <div className=""></div>

                <div className=""></div>
                <div className="merge-row">
                    <div className="text-right" style={{ width: '120px' }}>ปริมาตร (กรัม) : </div>
                    <div className="" style={{ paddingLeft: '10px' }}>
                        <input
                            type="number"
                            value={costSize}
                            onChange={handleCostSizeChange}
                            placeholder="Cost Size"
                        />
                    </div>
                </div>
                <div className=""></div>

                <div className=""></div>
                <div className="merge-row">
                    <div className="text-right" style={{ width: '120px' }}>ราคา : </div>
                    <div className="" style={{ paddingLeft: '10px' }}>
                        <input
                            type="number"
                            value={costPrice}
                            onChange={handleCostPriceChange}
                            placeholder="Cost Price"
                        />
                    </div>
                </div>
                <div className=""></div>
            </div>

            <div className='grid grid-cols-6 grid-rows-1'>
                <div></div>
                <div></div>
                <button className='button' onClick={addCost}>
                    เพิ่มรายการ
                </button>
                <button className='button' onClick={cancelCost}>
                    ยกเลิกรายการ
                </button>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default AddCost;