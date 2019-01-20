export default (state = {}, action) => {
    switch (action.type) {
        case 'TEST_LOAD':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}