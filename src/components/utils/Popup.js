import styles from '../css/Popup.module.css';

const Popup = ({ title, message, isVisible, togglePopup }) => {
    return (
        <>
            <div className={`${styles.overlay} ${!isVisible && styles.hidden}`} onClick={togglePopup}></div>
            <div className={`${styles.popup} ${!isVisible && styles.hidden}`}>
                {/* <div className={`${styles.overlay}`} onClick={togglePopup}></div> */}
                <div className={`${styles.popup}`}>
                    <h2>{title}</h2>
                    <br />
                    <p className='text-center'>{message}</p>
                    <br />
                    <div className='text-right'>
                        <button className='button' onClick={togglePopup}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup;
