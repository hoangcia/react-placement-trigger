export const appStart = (data) => dispatch => {
    dispatch({
        type: 'APP_START',
        payload: data
    });
}