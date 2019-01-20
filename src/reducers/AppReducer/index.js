export default (state = {}, action) => {
    switch (action.type) {
        case 'APP_START':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}