export default (state, action) => {
    switch (action.type) {
        case 'GET_NIGERIA_STATS':
            return {
                stats: action.payload,

            };
        case 'FAILED':
            return {
                ...state
            };
        case 'TOGGLE_LOADING':
            return {
                ...state,
                loading: action.payload
            }


        default:
            return {
                ...state
            }

    }
}
