import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    modalEditTaskOpen : false
}

const modalEditSlice = createSlice({
    name: 'modalEdit',
    initialState: initialState,
    reducers:{
        openModalEditTask(state){
            state.modalEditTaskOpen = true;
        },
        closeModalEditTask(state){
            state.modalEditTaskOpen = false
        }
    }
});

export const modalEditActions = modalEditSlice.actions;
export default modalEditSlice.reducer;