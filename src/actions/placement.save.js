export const placementSave = (data) => dispatch => {
    dispatch({
        type: 'PLACEMENT_SAVE',
        payload: data
    });
}