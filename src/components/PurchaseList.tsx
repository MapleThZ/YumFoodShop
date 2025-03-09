import React, { useState, useEffect } from 'react';
import Table from './utils/Table'
import PurchaseModel from './models/PurchaseModel'

const header = [
    'ลำดับ', 'รหัสสินค้า', 'ชื่อสินค้า', 'รายการสินค้าที่เพิ่ม', 'ราคาสินค้า', 'ราคาวัตถุดิบ', 'VAT 7%', 'ค่า GP 30%', 'ค่าแรง', 'ผู้ให้บริการ'
];


const data = [
    { id: 'id1', name: 'name1', otherPurchase: 'otherPurchase', price: 'price', materialPrice: 'materialPrice', vatPrice: 'vatPrice', gpPrice: 'gpPrice', wagePrice: 'wagePrice', platformName: 'platformName' },
    { id: 'id2', name: 'name2', otherPurchase: 'otherPurchase', price: 'price', materialPrice: 'materialPrice', vatPrice: 'vatPrice', gpPrice: 'gpPrice', wagePrice: 'wagePrice', platformName: 'platformName' },
    { id: 'id3', name: 'name3', otherPurchase: 'otherPurchase', price: 'price', materialPrice: 'materialPrice', vatPrice: 'vatPrice', gpPrice: 'gpPrice', wagePrice: 'wagePrice', platformName: 'platformName' },
]

const PurchaseList = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('/api/read-excel');
          const result = await response.json();
          console.log(result)
          setData(result);
        };
    
        fetchData();
      }, []);

    const purchaseList = data.map((item, index) => new PurchaseModel(item, index + 1));

    return (
        <div>
            <div className='grid grid-rows justify-items-center'>
                <h1 className='header-context'>รายการคำสั่งซื้อประจำวัน</h1>
            </div>
            <div className='grid grid-rows justify-items-center'>
                <Table header={header} data={purchaseList} />
            </div>
        </div>
    );
}

export default PurchaseList;