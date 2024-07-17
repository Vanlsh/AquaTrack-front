export const selectUser = (state) => state.auth.user;
export const selectUserName = (state) => state.auth.user.name;
export const selectUserPhoto = (state) => state.auth.photo;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectToken = (state) => state.auth.token;
export const selectErrorMessage = (state) => state.auth.errorMessage;
export const selectSuccessMessage = (state) => state.auth.successMessage;
export const selectIsLoading = (state) => state.auth.isLoading;
