import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import pesquisaSlice from './pesquisaSlice';

export const store = configureStore({
    reducer: {// Aqui ficam os estados globais
        login: loginSlice,
        pesquisa: pesquisaSlice,
    }
})