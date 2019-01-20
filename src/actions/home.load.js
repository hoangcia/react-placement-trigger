export const homeLoad = (data) => dispatch => {
    dispatch({
        type: 'HOME_LOAD',
        payload: data
    });
}