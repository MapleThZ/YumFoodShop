import React, { useState, useEffect } from 'react';
import PaginatedTable from './utils/PaginatedTable'

const header = [
    { name: 'ลำดับ', style: '10%' },
    { name: 'ชื่อสินค้า', style: '60%' },
    { name: 'ปริมาตร(กรัม)', style: '20%' },
    { name: 'ราคาสินค้า', style: '10%' }
];

const NumberFormatFn = (number, minDigit, maxDigit) => {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: minDigit,
        maximumFractionDigits: maxDigit
    }).format(number)
}

const CostList = () => {

    const [data, setData] = useState([]);
    const [priceAll, setPriceAll] = useState(0);
    const [purchaseAll, setPurchaseAll] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/read-cost-excel');
            const result = await response.json();
            setData(result);

            var priceTemp = 0

            await result.map(row => {
                priceTemp = priceTemp + Number(row.costPrice)
            })

            setPriceAll(NumberFormatFn(priceTemp, 2, 2))
            setPurchaseAll(NumberFormatFn(result.length, 0, 0))
        };

        fetchData();

    }, []);

    return (
        <div>
            <div className='grid grid-rows justify-items-center'>
                <h1 className='header-context'>รายการวัตถุดิบประจำเดือน</h1>
            </div>
            <div className='grid grid-rows justify-items-center'>
                <PaginatedTable header={header} data={data} itemsPerPage={5} />
            </div>

            {data.length > 0 &&
                <div className='grid grid-cols-6 grid-rows-2'>

                    <div></div>
                    <div><u>สรุปรายการ</u></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                    <div></div>
                    <div>รายการวัตถุดิบทั้งหมด</div>
                    <div className='grid grid-cols-2 grid-rows-1'>
                        <div className='text-right' style={{ paddingRight: '10px' }}>{purchaseAll}</div>
                        <div>รายการ</div>
                    </div>
                    <div>รวมมูลค่าทั้งสิ้น</div>
                    <div className='grid grid-cols-2 grid-rows-1'>
                        <div className='text-right' style={{ paddingRight: '10px' }}>{priceAll}</div>
                        <div>บาท</div>
                    </div>
                    <div></div>
                </div>
            }
        </div>
    );
}

export default CostList;