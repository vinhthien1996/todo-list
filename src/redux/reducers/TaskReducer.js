const stateDefault = {
    data: [],
    message: {
        active: false,
        content: '',
        type: ''
    },
    store: {
        name: '',
        priority: 'Ưu tiên thường',
        done: false
    },
    oldName: '',
    typeAction: true
}

export const TaskReducer = (state = stateDefault, action) => {

    const currentDate = new Date();
    const now = currentDate.getTime();

    switch (action.type) {
        case 'SET_TASK': {
            return { ...state, data: action.data }
        }
        case 'CHANGE_TASK_NAME': {

            // ERROR
            state.store.name = action.task.name;

            return { ...state };
        }
        case 'ADD_TASK': {
            const task = state.store;

            // CREATE TIME
            task.created = now;
            task.edited = '';

            if (localStorage.getItem('task') === null) {
                let taskAdd = [];
                taskAdd.push(task);
                state.data = taskAdd;
                localStorage.setItem('task', JSON.stringify(taskAdd));
                // SET MESSAGE SUCCESS
                state.message = { active: true, content: "Thêm công việc thành công!", type: 'success' }

            } else {
                let taskUpdate = [...state.data];
                const check = taskUpdate.findIndex(item => item.name === task.name);

                if (check === -1) {
                    taskUpdate.push(task);
                    state.data = taskUpdate;
                    localStorage.setItem('task', JSON.stringify(state.data));

                    // SET MESSAGE SUCCESS
                    state.message = { active: true, content: "Thêm công việc thành công!", type: 'success' }
                } else {
                    // SET MESSAGE EXISTS
                    state.message = { active: true, content: "Công việc đã tồn tại!", type: 'danger' }
                }
            }
            return { ...state };
        }
        case 'CHECK_TASK': {
            let cTask = [...state.data];
            const findTask = cTask.find(item => item.name === action.name);
            findTask.done = !findTask.done;
            state.data = cTask;

            localStorage.setItem('task', JSON.stringify(state.data));
            return { ...state };
        }
        case 'CLOSE_MESSAGE': {
            state.message = { active: false, content: '', type: '' }
            return { ...state }
        }
        case 'DELETE_TASK': {
            const delTask = [...state.data];
            const newTask = delTask.filter(item => item.name !== action.name);

            state.message = { active: true, content: 'Xóa công việc thành công!', type: 'danger' }
            state.data = newTask;
            localStorage.setItem('task', JSON.stringify(state.data));
            return { ...state };
        }
        case 'EDIT_TASK': {

            const store = {...state.store};

            store.name = action.data.name;
            store.priority = action.data.priority;
            store.done = action.data.done;

            state.store = store;
            state.oldName = action.data.name;
            state.typeAction = false;

            return { ...state };
        }
        case 'CHECK_EDIT_TASK': {
            const oldPri = { ...state.store };
            oldPri.priority = action.pri;
            state.store = oldPri;
            return { ...state };
        }
        case 'UPDATE_TASK': {
            let taskUpdate = [...state.data];

            let check = taskUpdate.find(item => item.name === state.oldName);
            if (check !== null) {
                let taskNotUpdate = taskUpdate.filter(item => item.name !== state.oldName);
                const checkExists = taskNotUpdate.findIndex(item => item.name === state.store.name);

                if (checkExists === -1) {
                    check.name = state.store.name;
                    check.priority = state.store.priority;
                    check.edited = now;

                    const resetUpdate = { name: '', priority: 'Ưu tiên thường', done: false }
                    state.store = resetUpdate;
                    state.data = taskUpdate;
                    state.typeAction = true;
                    localStorage.setItem('task', JSON.stringify(state.data));
                    state.message = { active: true, content: "Cập nhật công việc thành công!", type: 'success' }
                } else {
                    state.message = { active: true, content: "Công việc đã tồn tại!", type: 'danger' }
                }
            } else {
                state.message = { active: true, content: "Không tìm thấy công việc!", type: 'danger' }
            }
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}