// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://my-dict-app.herokuapp.com";

export const signInUrl = `${BASE_URL}/api/auth/sign_in`;
export const signOutUrl = `${BASE_URL}/api/auth/sign_out`;
export const getWordsUrl = `${BASE_URL}/api/words`;
export const editWordUrl = (id: number) => `${BASE_URL}/api/words/${id}`;
export const signUpUrl = `${BASE_URL}/api/auth`;
export const getArchiveWordUrl = `${BASE_URL}/api/words/archive`;
export const postWordUrl = `${BASE_URL}/api/words`;
export const deleteWordUrl = (id: number) => `${BASE_URL}/api/words/${id}`;
export const updateUserInfoUrl = `${BASE_URL}/api/auth`;
export const deleteUserUrl = `${BASE_URL}/api/auth`;
