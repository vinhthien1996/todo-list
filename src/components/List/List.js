import React from 'react';
import { useSelector } from 'react-redux';
import style from './List.module.css';
import Item from './Item';

export default function List() {

    const dataTask = useSelector(state => state.TaskReducer.data);

    const renderTask = () => {
        
        if(dataTask.length === 0) {
            return (
                <div className={style.itemEmpty}>Chưa có việc cần làm!</div>
            );
        }
        
        return dataTask.map((item, index) => {
            return <Item data={item} key={index} />
        })
    }

    return (
        <div className={style.containerList}>
            <h3><i className="fa fa-clipboard"></i> Danh sách</h3>
            {renderTask()}
        </div>
    )
}
