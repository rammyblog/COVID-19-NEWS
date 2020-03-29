export default (state, action) => {
    switch (action.type) {
        case "GET_NEWS":
            return {
                news: action.payload,
            };

        case 'SET_LOADING':
            return {
                loading: action.payload
            };

        default:
            return {
                ...state
            }
    }
}

// c => c + 1
