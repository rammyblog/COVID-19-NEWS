import React, {createContext, useReducer, useEffect, useCallback} from "react"
import StatsReducer from "./StatsReducer"
import axios from "axios";

const initialState = {
    stats: [],
    loading: false
};

export const StatsContext = createContext(initialState);

export const StatProvider = ({children}) => {

    const [state, dispatch] = useReducer(StatsReducer, initialState);
    const setLoading = (loadingBool) => {
        dispatch({type: "TOGGLE_LOADING", payload: loadingBool});
    };
    const fetchStats = useCallback(
        async (code) => {
            try {
                setLoading(true)
                let res = await axios.get(`https://thevirustracker.com/free-api?countryTotal=${code}`)
                dispatch({
                    type: 'GET_NIGERIA_STATS',
                    payload: res.data.countrydata
                });
                setLoading(false)

            } catch
                (e) {
                setLoading(false)

                // dispatch({
                //     type : 'FAILED',
                // })
            }


        },
        [dispatch],
    );

    useEffect(() => {
        fetchStats('NG')

    }, [fetchStats]);

    return (
        <StatsContext.Provider
            value={{
                stats: state.stats,
                loading: state.loading,
                fetchStats
            }}
        >
            {children}
        </StatsContext.Provider>
    )


};

