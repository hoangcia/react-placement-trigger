export default (state = {}, action) => {
    switch (action.type) {
        case 'PLACEMENT_DATA_LOAD':
            return {
                ...state,
                ...action.payload
            }
        case 'PLACEMENT_SAVE':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}