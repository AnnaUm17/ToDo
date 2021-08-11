import React from 'react';
import classnames from 'classnames';
import styles from '../Item/item.module.css';
import deleteImg from './img/delete.svg';

class Item extends React.Component {

  render() {
    const { value, isDone, id, onClickDone, onClickDelete } = this.props;
    return (
      <div className={styles.wrap}>
        <input 
          type='checkbox'
          checked={isDone}
          className={styles.checkbox}/>
        <label 
          htmlFor='checkbox'
          onClick={() => onClickDone(id)}
          className={styles.checkbox_label}
        >
          <div
            className={classnames({
                [styles.item]:true,
                [styles.done]: isDone
            })}
          >
            { value }
          </div>
        </label>
        <button className={styles.btn_delete} onClick={() => onClickDelete(id)}>
          <img src={deleteImg} alt='Delete'/>
        </button>
      </div>);
}
};

export default Item;