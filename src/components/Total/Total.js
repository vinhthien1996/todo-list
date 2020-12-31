import React from 'react';
import { useSelector } from 'react-redux';
import style from './Total.module.css';

export default function Total() {

    const data = useSelector(state => state.TaskReducer.data);

    const done = () => {
        return data.filter(item => item.done);
    }

    return (
        <div className={style.containerTotal}>
            <div className={style.totalItem}>
                <div className={style.totalItemTotal}><i className="fa fa-clipboard"></i> Tổng: {data.length} việc</div>
                <div className={style.totalItemDone}><i className="fa fa-clipboard-check"></i> Đã xong: {done().length} việc</div>
            </div>
        </div>
    )
}
