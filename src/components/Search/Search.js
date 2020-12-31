import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Search.module.css';

export default function Search() {

    const dispatch = useDispatch();

    const { name, priority } = useSelector(state => state.TaskReducer.store);
    const typeAction = useSelector(state => state.TaskReducer.typeAction);

    const setCheck = (pri) => {
        dispatch({
            type: 'CHECK_EDIT_TASK',
            pri
        })
    }

    const changeTask = () => {
        const taskName = document.querySelector('#search').value;
        const priority = document.querySelector('[name="priority"]:checked').value;

        const task = {
            name: taskName,
            priority,
            done: false
        }

        dispatch({
            type: 'CHANGE_TASK_NAME',
            task
        });
    }

    const addTask = () => {
        if(typeAction) {
            dispatch({
                type: 'ADD_TASK'
            });
        } else {
            dispatch({
                type: 'UPDATE_TASK'
            });
        }
    }

    return (
        <div className={style.containerSearch}>
            <div className={style.contentSearch}>
                <input id="search" defaultValue={name} onChange={() => changeTask()} placeholder="Task" className={style.iSearch} key={`${Math.floor((Math.random() * 1000))}-min`} />
                <button className={style.btnAdd} onClick={() => addTask()}>{typeAction ? 'Thêm việc' : 'Cập nhật'}</button>
            </div>
            <div className={style.priority}>
                <span className={style.lowPri}>
                    <input type="radio" name="priority" id="clow" value="Ưu tiên thấp" checked={priority === 'Ưu tiên thấp' ? true : false} onChange={() => setCheck("Ưu tiên thấp")} className={style.buttonLow} /> <label htmlFor="clow"><span className={style.notMobile}>Ưu tiên</span> thấp</label>
                </span>
                <span className={style.mediumPri}>
                    <input type="radio" name="priority" id="cmedium" value="Ưu tiên thường" checked={priority === 'Ưu tiên thường' ? true : false} onChange={() => setCheck("Ưu tiên thường")} className={style.buttonMedium} /> <label htmlFor="cmedium"><span className={style.notMobile}>Ưu tiên</span> thường</label>
                </span>
                <span className={style.highPri}>
                    <input type="radio" name="priority" id="chigh" value="Ưu tiên cao" checked={priority === 'Ưu tiên cao' ? true : false} onChange={() => setCheck("Ưu tiên cao")} className={style.buttonHigh} /> <label htmlFor="chigh"><span className={style.notMobile}>Ưu tiên</span> cao</label>
                </span>
            </div>
        </div>
    )
}
