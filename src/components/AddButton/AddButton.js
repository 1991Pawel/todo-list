import React from 'react';
import AddImage from '../../assets/images/add.svg'
import styles from '../AddButton/AddButton.module.scss'

const AddButton = () => {
    return ( 
        <button className={styles.addbutton}>
            <img src={AddImage} alt="add-icon"/>
        </button>
     );
}
 
export default AddButton;