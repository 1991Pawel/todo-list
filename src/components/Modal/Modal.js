import React from 'react';
import styles from './Modal.module.scss';
import Form  from '../Form/Form';
import closeImg from '../../assets/images/close.svg'



const Modal = ({modalFn , ...addTask}) => {
    return ( 
        <div className={styles.wrapper}>
             <button onClick={modalFn} className={styles.close}>
                 <img src={closeImg} alt="close-icon"/>
             </button>
            <Form {...addTask}/>
        </div>
     );
}
 
export default Modal;