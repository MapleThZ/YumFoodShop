import React, { useState, useEffect } from 'react';
import PaginatedTable from './utils/PaginatedTable'

const header = [
    { name: 'ลำดับ', style: '7%' },
    { name: 'รหัสสินค้า', style: '10%' },
    { name: 'ชื่อสินค้า', style: '25%' },
    { name: 'รายการสินค้าที่เพิ่ม', style: '30%' },
    { name: 'ราคาสินค้า', style: '7%' },
    { name: 'ราคาวัตถุดิบ', style: '7%' },
    { name: 'ค่า GP', style: '7%' },
    { name: 'ค่าแรง', style: '7%' },
    { name: 'ผู้ให้บริการ', style: '10%' }
];

const NumberFormatFn = (number, minDigit, maxDigit) => {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: minDigit,
        maximumFractionDigits: maxDigit
    }).format(number)
}

const PurchaseList = () => {

    const [data, setData] = useState([]);
    const [priceAll, setPriceAll] = useState(0);
    const [gpPriceAll, setGpPriceAll] = useState(0);
    const [costPriceAll, setCostPriceAll] = useState(0);
    const [profitPriceAll, setProfitPriceAll] = useState(0);
    const [purchaseAll, setPurchaseAll] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/read-excel');
            const result = await response.json();
            setData(result);

            var priceTemp = 0
            var gpPriceTemp = 0
            var costPriceTemp = 0
            var profitPriceTemp = 0

            await result.map(row => {
                priceTemp = priceTemp + Number(row.price)
                gpPriceTemp = gpPriceTemp + Number(row.gpPrice)
                costPriceTemp = costPriceTemp + Number(row.costPrice)
                profitPriceTemp = profitPriceTemp + Number(row.profitPrice)
            })

            setPriceAll(NumberFormatFn(priceTemp, 2, 2))
            setGpPriceAll(NumberFormatFn(gpPriceTemp, 2, 2))
            setCostPriceAll(NumberFormatFn(costPriceTemp, 2, 2))
            setProfitPriceAll(NumberFormatFn(profitPriceTemp, 2, 2))
            setPurchaseAll(NumberFormatFn(result.length, 0, 0))
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

            <div className='grid grid-cols-6 grid-rows-5'>
                
                <div></div>
                <div><u>สรุปรายการ</u></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>

                <div></div>
                <div>รายการสั่งซื้อทั้งหมด</div>
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

                <div></div>
                <div>แยกเป็นราคาวัตถุดิบทั้งหมด</div>
                <div className='grid grid-cols-2 grid-rows-1'>
                    <div className='text-right' style={{ paddingRight: '10px' }}>{costPriceAll}</div>
                    <div>บาท</div>
                </div>
                <div>ค่า GP ทั้งหมด</div>
                <div className='grid grid-cols-2 grid-rows-1'>
                    <div className='text-right' style={{ paddingRight: '10px' }}>{gpPriceAll}</div>
                    <div>บาท</div>
                </div>
                <div></div>

                <div></div>
                <div>รายได้หลังหักค่าใช่จ่าย</div>

                <div className='grid grid-cols-2 grid-rows-1'>
                    <div className='text-right' style={{ paddingRight: '10px' }}>{profitPriceAll}</div>
                    <div>บาท</div>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default PurchaseList;