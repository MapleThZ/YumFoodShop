import React, { useState, useEffect } from 'react';
import PaginatedTable from './utils/PaginatedTable'

const header = [
    'ลำดับ', 'รหัสสินค้า', 'ชื่อสินค้า', 'รายการสินค้าที่เพิ่ม', 'ราคาสินค้า', 'ราคาวัตถุดิบ', 'VAT 7%', 'ค่า GP 30%', 'ค่าแรง', 'ผู้ให้บริการ'
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