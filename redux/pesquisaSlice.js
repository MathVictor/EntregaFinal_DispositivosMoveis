import { createSlice } from '@reduxjs/toolkit';

export const pesquisaSlice = createSlice({
  name: 'pesquisa',
  initialState: {
    docId: null, 
  },
  reducers: {
    setPesquisaId: (state, action) => {
      state.docId = action.payload.docId;
    } 
  },
});

export const { setPesquisaId, clearPesquisaId } = pesquisaSlice.actions;
export default pesquisaSlice.reducer;
