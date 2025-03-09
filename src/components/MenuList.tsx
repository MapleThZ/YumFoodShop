import React, { useState, useEffect } from 'react';
import styles from './css/List.module.css';
import { useRouter } from 'next/router';

const MenuList = () => {

    const [activeIndex, setActiveIndex] = useState(null);
    const [activeSubIndex, setActiveSubIndex] = useState(null);

    const items = [
        { text: 'คำสั่งซื้อ', subItems: [{ text: 'รายการ', href: '/' }, { text: 'เพิ่มรายการ', href: '/' }] },
        { text: 'วัตถุดิบ', subItems: [{ text: 'รายการ', href: '/' }, { text: 'เพิ่มรายการ', href: '/' }] },
        { text: 'สรุปผล', subItems: [{ text: 'คำสั่งซื้อ', href: '/' }, { text: 'วัตถุดิบ', href: '/' }] },
    ];

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

                                    <a onClick={() => handleSubClick(subIndex)}>
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

export default MenuList;
