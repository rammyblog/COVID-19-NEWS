export default (state, action) => {
    console.log(action.payload);

    switch (action.type) {
        case 'GET_NIGERIA_STATS':
            return {
                stats: action.payload
            };
        case 'FAILED':
            return {
                stats : {active_cases: null}
            };

        default:
            return {
                ...state
            }

    }
}
