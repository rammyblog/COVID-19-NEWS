export default (state, action) => {
            console.log(action.payload)

    switch (action.type) {
        case 'GET_NIGERIA_STATS':
            return {
                stats: action.payload
            }

        default:
            return {
                ...state
            }

    }
}
