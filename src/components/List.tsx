import React, { useState, useEffect } from 'react';
import styles from './List.module.css';
import { useRouter } from 'next/router';

const List = () => {

    const [activeIndex, setActiveIndex] = useState(null);
    const [activeSubIndex, setActiveSubIndex] = useState(null);
    const [pathName, setPathName] = useState('');

    const items = [
        { text: 'คำสั่งซื้อ', subItems: [{ text: 'รายการ', href: '/purchaselist' }, { text: 'เพิ่มรายการ', href: '/purchaselist/addPurchase' }] },
        { text: 'วัตถุดิบ', subItems: [{ text: 'รายการ', href: '/' }, { text: 'เพิ่มรายการ', href: '/' }] },
        { text: 'สรุปผล', subItems: [{ text: 'คำสั่งซื้อ', href: '/' }, { text: 'วัตถุดิบ', href: '/' }] },
    ];

    useEffect(() => {
        const storedValue1: any = sessionStorage.getItem('menu');
        if (storedValue1) {
            setActiveIndex(storedValue1);
            console.log(storedValue1)
        }

        const storedValue: any = sessionStorage.getItem('menuIndex');
        if (storedValue) {
            setActiveSubIndex(storedValue);
            console.log(storedValue)
        }
    }, []);

    const handleClick = (index: any) => {
        sessionStorage.setItem('menu', index);
        setActiveIndex(index);
    };

    const handleSubClick = (indexSub: any) => {
        sessionStorage.setItem('menuIndex', indexSub);
        setActiveSubIndex(indexSub);
    };

    return (
        <ul className={styles.listContainer}>
            {items.map((item, index) => (
                <li key={index} className={index === activeIndex ? styles.active : ''}>
                    <div onClick={() => { handleClick(index); handleSubClick(-1); }}>
                        {item.text}
                    </div>

                    {index === activeIndex && (
                        <ul className={styles.listContainerSub}>
                            {item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex}
                                    className={subIndex === activeSubIndex ? styles.activeSub : ''}>

                                    <a href={subItem.href} onClick={() => handleSubClick(subIndex)}>
                                        **** {subItem.text} ****
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>

            ))}
        </ul>

    );
};

export default List;
