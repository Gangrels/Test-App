const checkError = (state) => {
    return state.auth.err;
}

const checkUser = (state) => {
    return state.auth.user;
}

export default {
    checkError,
    checkUser
};