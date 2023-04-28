import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dataIsLoading: true,
  backButton: false,
  drawable: false,
  latestNews: [],
  sectionData: [],
  news: [],
  dataQuery: [],
  text: '',
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    switchIcon: state => {
      state.backButton = !state.backButton;
    },
    closeButton: state => {
      state.backButton = true;
    },
    searchBack: state => {
      state.backButton = false;
    },
    setLatestNews: (state, action) => {
      state.latestNews = action.payload;
    },
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    toggleDrawable: state => {
      state.drawable = !state.drawable;
    },
    AddSectionData: (state, action) => {
      state.sectionData = action.payload;
    },
    setDataToTrue: state => {
      state.dataIsLoading = false;
    },
    setDataToFalse: state => {
      state.dataIsLoading = true;
    },
    setDataQuery: (state, action) => {
      state.dataQuery.push(action.payload);
    },
  },
});

export const {
  switchIcon,
  searchBack,
  setLatestNews,
  setNews,
  setText,
  toggleDrawable,
  AddSectionData,
  closeButton,
  setDataToTrue,
  setDataToFalse,
  setDataQuery,
} = uiSlice.actions;

export default uiSlice.reducer;
