import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../reducer/menuSlice";
import modalReducer from "../reducer/modalSlice";
import authReducer from "../reducer/authSlice";
import profileReducer from "../reducer/profileSlice";
import userReducer from "../reducer/userSlice";
import taskSearchReducer from "../reducer/taskSearchSlice";
import modalEditReducer from "../reducer/modalEditSlice";


const  store = configureStore({
    reducer: {
        menu: menuReducer,
        modal: modalReducer,
        modalEdit: modalEditReducer,
        auth: authReducer,
        profile: profileReducer,
        user:userReducer,
        taskSearch: taskSearchReducer
    }
})


export default store;
