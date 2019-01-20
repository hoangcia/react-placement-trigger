export const placementDataLoad = (data) => dispatch => {
    dispatch({
        type: 'PLACEMENT_DATA_LOAD',
        payload: data
    });
}