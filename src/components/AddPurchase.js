import React, { useState, useEffect } from 'react';
import eventEmitter from './utils/EventEmitter';
import Popup from './utils/Popup';
import style from './css/AddPurchase.module.css';
import * as XLSX from 'xlsx';
import path from 'path';

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

const ReadExcelFileFn = () => {

    const [excelData, setExcelData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/read-excel');
            const result = await response.json();
            setExcelData(result);
        };

        fetchData();
    })

    return excelData
}

function generateDataPushExcel(product, nameProduct, platform, additionalProduct, pricePurchase) {

    const excelData = ReadExcelFileFn

    const gpPrice = (pricePurchase * (30 / 100));
    const gpPriceAll = gpPrice * (7 / 100)
    const materialPrice = (pricePurchase * (40 / 100));


    const genData = { seq: excelData.length, id: product, name: nameProduct, additionalProduct: additionalProduct, price: pricePurchase, materialPrice: materialPrice, gpPrice: gpPrice, profitPrice: (pricePurchase - materialPrice - gpPrice), platformName: platform }

    console.log(genData)
}

const addRow = (product, nameProduct, platform, additionalProduct, pricePurchase) => {

    generateDataPushExcel(product, nameProduct, platform, additionalProduct, pricePurchase)

    const newRow = { Name: 'New Name', Age: 30 };
    const updatedData = [...excelData, newRow];

    // Create a new workbook and worksheet
    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(updatedData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');

    // Generate a binary string for download
    const binaryString = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'binary' });

    // Convert binary string to a Blob and create a download link
    const blob = new Blob([s2ab(binaryString)], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'updated_file.xlsx';
    link.click();
};

const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
};

const AddPurchase = () => {

    const [selectedPlatformOption, setSelectedPlatformOption] = useState('');
    const [selectedMainProductOption, setSelectedMainProductOption] = useState('');
    const [selectedAdditionalProductOption, setSelectedAdditionalProductOption] = useState(['']);

    const [platformName, setPlatformName] = useState('');
    const [selectedAdditionalProductName, setSelectedAdditionalProductName] = useState('');

    const [pricePurchase, setPricePurchase] = useState(0);

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [nameProduct, setNameProduct] = useState('');

    const mainProductList = mainProductListFn()
    const additionalProductList = additionalProductListFn()
    const platformList = platformListFn()

    const handlePlatformChange = (event) => {
        setSelectedPlatformOption(event.target.value);
    };

    const handleMainProductChange = (event) => {
        setSelectedMainProductOption(event.target.value);

        mainProductList.map((data) => {
            if (data.id.includes(event.target.value)) {
                setNameProduct(data.name)
                setPricePurchase(data.price)
            }
        });
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
            togglePopup();
        }
    };

    const handleRowAdditionalProductMinusChange = (event) => {
        setSelectedAdditionalProductOption(selectedAdditionalProductOption.slice(0, event).concat(selectedAdditionalProductOption.slice(event + 1)))
    };

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const addPurchase = () => {

        platformList.map(data => {
            if (data.id.includes(platform)) {
                setPlatformName(data.name)
            }
        })

        additionalProductList.map(main => {
            selectedAdditionalProductOption.map(sub => {
                if (main.id.includes(sub)) {
                    setSelectedAdditionalProductName(selectedAdditionalProductName + ' ' + main.name)
                }
            })
        })

        addRow(selectedMainProductOption, nameProduct, platformName, selectedAdditionalProductName, pricePurchase)
    }

    const clearPurchase = () => {
        setSelectedMainProductOption('')
        setSelectedPlatformOption('')
        setSelectedAdditionalProductOption([''])
        setPricePurchase(0)
    }

    return (
        <div>
            <Popup title='Warning' message='กรุณาเลือก รายการเพิ่มเติม ก่อน' isVisible={isPopupVisible} togglePopup={togglePopup} />
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
                    <div className='grid grid-cols-3 grid-rows-1 gap-2'>
                        <div></div>
                        <div className="merge-row" style={{ paddingTop: 'calc(var(--spacing) * 1)', paddingBottom: 'calc(var(--spacing) * 1)' }}>
                            <div style={{ width: '120px' }} className={0 == index ? 'text-right' : 'hidden'}>รายการเพิ่มเติม* : </div>
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