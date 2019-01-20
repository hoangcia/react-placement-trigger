export default (state = {}, action) => {
    switch (action.type) {
        case 'HOME_LOAD':
            return {
                ...state,
                ...action.payload
            }
        case 'HOME_SAVE_PLACEMENT':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}