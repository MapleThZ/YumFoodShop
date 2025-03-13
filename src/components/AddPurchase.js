import React, { useState, useEffect } from 'react';
import eventEmitter from './utils/EventEmitter';
import Popup from './utils/Popup';
import style from './css/AddPurchase.module.css';
import { getCurrentDayMonthAndYear } from './utils/Date'

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

const additionalProductListFn = () => {
    const [additionalProductList, setAdditionalProductList] = useState([]);

    useEffect(() => {
        const handleEvent = (data) => {
            setAdditionalProductList(data);
        };

        eventEmitter.on('AdditionalProduct', handleEvent);

        return () => {
            eventEmitter.off('AdditionalProduct', handleEvent);
        };
    }, []);

    return additionalProductList;
}

async function writeExcelFn(data) {

    const { day, month, year } = getCurrentDayMonthAndYear()

    var body = { pathFile: './public/excel', fileName: year + '' + (month < 10 ? '0' + month : month) + '' + (day < 10 ? '0' + day : day) + '-PurchaseList.xlsx', data: data }
    const response = await fetch('/api/write-excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const result = await response.json();
}

async function ReadExcelFileFn() {

    var excelData = []

    const fetchData = async () => {
        const response = await fetch('/api/read-excel');
        const result = await response.json();
        excelData = [...result]
    };

    await fetchData();

    return excelData
}

function generateDataPushExcel(product, nameProduct, platform, additionalProduct, pricePurchase) {

    var gpPrice = (pricePurchase * (30 / 100));
    gpPrice = (gpPrice + (gpPrice * (7 / 100))).toFixed(2)
    const costPrice = (pricePurchase * (40 / 100)).toFixed(2);
    const profitPrice = ((pricePurchase - costPrice - gpPrice)).toFixed(2);


    const genData = { seq: 0, id: product, name: nameProduct, additionalProduct: additionalProduct, price: pricePurchase, costPrice: costPrice, gpPrice: gpPrice, profitPrice: profitPrice, platformName: platform }

    return genData
}

const addRow = async (product, nameProduct, platform, additionalProduct, pricePurchase) => {

    const excelData = await ReadExcelFileFn()

    const newRow = generateDataPushExcel(product, nameProduct, platform, additionalProduct, pricePurchase)
    newRow.seq = excelData.length + 1

    const updatedData = [...excelData, newRow];

    writeExcelFn(updatedData)
};

const AddPurchase = () => {

    const [selectedPlatformOption, setSelectedPlatformOption] = useState('');
    const [selectedMainProductOption, setSelectedMainProductOption] = useState('');
    const [selectedAdditionalProductOption, setSelectedAdditionalProductOption] = useState(['']);

    const [pricePurchase, setPricePurchase] = useState(0);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const [nameProduct, setNameProduct] = useState('');

    const mainProductList = mainProductListFn()
    const additionalProductList = additionalProductListFn()
    const platformList = platformListFn()

    const handlePlatformChange = (event) => {
        setSelectedPlatformOption(event.target.value);
    };

    const handleMainProductChange = async (event) => {
        setSelectedMainProductOption(event.target.value);

        await mainProductList.map(async (data) => {
            if (data.id.includes(event.target.value)) {
                await setNameProduct(data.name)
                await setPricePurchase(data.price)
            }
        });

        await selectedAdditionalProductOption.map(async main => {
            await additionalProductList.map(async (data) => {
                if (main.includes(data.id))
                    await setPricePurchase(pricePurchase + data.price)
            });
        })
    };

    const handleAdditionalProductChange = (event, index) => {
        const newItems = [...selectedAdditionalProductOption];
        newItems[index] = event.target.value
        setSelectedAdditionalProductOption(newItems);

        additionalProductList.map((data) => {
            if (event.target.value && data.id.includes(event.target.value)) {
                setPricePurchase(pricePurchase + data.price)
            }
        });
    };

    const handleRowAdditionalProductPlusChange = (event) => {
        if (selectedAdditionalProductOption[selectedAdditionalProductOption.length - 1]) {
            setSelectedAdditionalProductOption([...selectedAdditionalProductOption, ''])
        } else {
            setPopupTitle('Warning')
            setPopupMessage('กรุณาเลือก รายการเพิ่มเติม ก่อน')
            togglePopup();
        }
    };

    const handleRowAdditionalProductMinusChange = (event) => {
        setSelectedAdditionalProductOption(selectedAdditionalProductOption.slice(0, event).concat(selectedAdditionalProductOption.slice(event + 1)))
    };

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const addPurchase = async () => {

        var platformName = ''

        platformList.map(data => {
            if (data.id.includes(selectedPlatformOption)) {
                platformName = data.name
            }
        })

        var additionalProductName = ' '

        selectedAdditionalProductOption.map((main, index) => {
            additionalProductList.map((sub) => {
                if (main.includes(sub.id)) {
                    if (index == 0) {
                        additionalProductName = sub.name
                    } else {
                        additionalProductName = additionalProductName + ',' + sub.name
                    }
                }
            })
        })

        try {
            await addRow(selectedMainProductOption, nameProduct, platformName, additionalProductName, pricePurchase)
            clearPurchase()
            setPopupTitle('Success')
            setPopupMessage('เพิ่มข้อมูลสำเร็จ')
            togglePopup();
        } catch (error) {
            setPopupTitle('Error')
            setPopupMessage('ไม่สามารถเพิ่มข้อมูลได้')
            togglePopup();
        }
    }

    const clearPurchase = () => {
        setSelectedMainProductOption('')
        setSelectedPlatformOption('')
        setSelectedAdditionalProductOption([''])
        setPricePurchase(0)
    }

    return (
        <div>
            <Popup title={popupTitle} message={popupMessage} isVisible={isPopupVisible} togglePopup={togglePopup} />
            <div className='grid grid-rows-1 justify-items-center'>
                <h1 className='header-context'>เพิ่มรายการคำสั่งซื้อประจำวัน</h1>
            </div>

            <div className='grid grid-cols-3 grid-rows-2 gap-2'>
                <div className=""></div>
                <div className="merge-row">
                    <div className='text-right' style={{ width: '120px' }}>ชื่ออาหาร* :</div>
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

                <div className=""></div>
                <div className="merge-row" style={{ paddingBottom: 'calc(var(--spacing) * 1)' }}>
                    <div className='text-right' style={{ width: '120px' }}>ผู้ให้บริการ* : </div>
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
                <div className="">
                </div>
            </div>
            {
                selectedAdditionalProductOption.map((data, index) => (
                    <div key={index} className='grid grid-cols-3 grid-rows-1 gap-2'>
                        <div></div>
                        <div className="merge-row" style={{ paddingTop: 'calc(var(--spacing) * 1)', paddingBottom: 'calc(var(--spacing) * 1)' }}>
                            <div style={{ width: '120px' }} className={0 == index ? 'text-right' : 'hidden'}>รายการเพิ่มเติม : </div>
                            <div style={{ width: '120px' }} className={0 != index ? '' : 'hidden'}></div>
                            <div className={style.selectBoxSize}>
                                <select name="additionalProduct" id="additionalProduct"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-300"
                                    value={data} onChange={() => handleAdditionalProductChange(event, index)}>

                                    <option value="">Select...</option>
                                    {additionalProductList.map((option) => (
                                        <option value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ paddingLeft: 'calc(var(--spacing) * 1)', paddingRight: 'calc(var(--spacing) * 1)' }} className='merge-row' >
                                <div style={{ paddingRight: 'calc(var(--spacing) * 1)', width: '30px' }}>
                                    <button className={selectedAdditionalProductOption.length - 1 == index ? 'button bottomPlusAndMinus' : 'hidden'} onClick={handleRowAdditionalProductPlusChange}>
                                        +
                                    </button>
                                </div>
                                <div>
                                    <button style={{ width: '26px' }} className={selectedAdditionalProductOption.length > 1 ? 'button bottomPlusAndMinus' : 'hidden'}
                                        onClick={() => handleRowAdditionalProductMinusChange(index)}>
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className='grid grid-cols-3 grid-rows-2 gap-2' style={{ paddingTop: 'calc(var(--spacing) * 1)' }}>
                <div className=""></div>
                <div className="merge-row">
                    <div className='text-right' style={{ width: '120px' }} >ราคา :</div>
                    <div className={style.selectBoxSize}>{pricePurchase > 0 ? pricePurchase : ''}</div>
                </div>
                <div className=""></div>
            </div>

            <div className='grid grid-cols-6 grid-rows-1'>
                <div></div>
                <div></div>
                <button className='button' onClick={addPurchase}>
                    เพิ่มรายการ
                </button>
                <button className='button' onClick={clearPurchase}>
                    ยกเลิกรายการ
                </button>
                <div></div>
                <div></div>
            </div>
        </div >
    );
}

export default AddPurchase;