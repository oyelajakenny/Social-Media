import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeModalIsOpen: false,
  editProfileModalOpen: false,
  editPostModalOpen: false,
  editPostId: "",
  theme: JSON.parse(localStorage.getItem("theme")) || {
    primary: "",
    secondary: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducer: {
    openThemeModal: (state) => {
      state.themeModalIsOpen = true;
    },
    closeThemeModal: (state) => {
      state.closeThemeModal = false;
    },
    changeTheme: (state, action) => {
      state.theme = action.paylaod;
    },
    openEditProfileModal: (state) => {
      state.editProfileModal = true;
    },
    closeEditProfileModal: (state) => {
      state.editProfileModal = false;
    },
    openEditPostModal: (state) => {
      state.editPostModal = true;
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice;