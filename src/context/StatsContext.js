import React, {createContext, useReducer, useEffect, useCallback} from "react"
import StatsReducer from "./StatsReducer"
import axios from "axios";

const initialState = {
    stats: []
};

export const StatsContext = createContext(initialState);

export const StatProvider = ({children}) => {

    const [state, dispatch] = useReducer(StatsReducer, initialState);

    const fetchStats = useCallback(
        async (code) => {
            try {
                let res = await axios.get(`https://thevirustracker.com/free-api?countryTotal=${code}`)
                dispatch({
                    type: 'GET_NIGERIA_STATS',
                    payload: res.data.countrydata
                });
            } catch
                (e) {
                dispatch({
                    type : 'FAILED',
                })
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
                fetchStats
            }}
        >
            {children}
        </StatsContext.Provider>
    )


};

