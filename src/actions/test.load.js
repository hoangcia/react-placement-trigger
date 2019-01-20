export const testLoad = (data) => dispatch => {
    dispatch({
        type: 'TEST_LOAD',
        payload: data
    });
}