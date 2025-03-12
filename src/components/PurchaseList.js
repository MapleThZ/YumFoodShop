import React, { useState, useEffect } from 'react';
import PaginatedTable from './utils/PaginatedTable'

const header = [
    { name: 'ลำดับ', style: '7%;' },
    { name: 'รหัสสินค้า', style: '10%;' },
    { name: 'ชื่อสินค้า', style: '20%;' },
    { name: 'รายการสินค้าที่เพิ่ม', style: '35%;' },
    { name: 'ราคาสินค้า', style: '7%;' },
    { name: 'ราคาวัตถุดิบ', style: '7%;' },
    { name: 'ค่า GP', style: '7%;' },
    { name: 'ค่าแรง', style: '7%;' },
    { name: 'ผู้ให้บริการ', style: '10%;' }
];

const PurchaseList = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/read-excel');
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className='grid grid-rows justify-items-center'>
                <h1 className='header-context'>รายการคำสั่งซื้อประจำวัน</h1>
            </div>
            <div className='grid grid-rows justify-items-center'>
                <PaginatedTable header={header} data={data} itemsPerPage={5} />
            </div>
        </div>
    );
}

export default PurchaseList;