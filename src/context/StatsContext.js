import React, {createContext, useReducer, useEffect, useCallback} from "react"
import StatsReducer from "./StatsReducer"
import axios from "axios";
import {newsContext} from "./NewsContext";

const initialState = {
    stats: []
};

export const StatsContext = createContext(initialState);

export const StatProvider = ({children}) => {

    const [state, dispatch] = useReducer(StatsReducer, initialState);

    const fetchStats = useCallback(
        async () => {

            try {
                let res = await axios.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php", {
                    headers: {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "af071e0d68msh1b09ca43577c8f0p164b67jsn473e4cb936c0"
                    },
                    params: {
                country: 'nigeria'
  }
                });

                dispatch({
                    type: 'GET_NIGERIA_STATS',
                    payload: res.data.latest_stat_by_country
                });
            } catch
                (e) {
                console.log(e)
            }


        },
        [dispatch],
    );

    useEffect(() => {
        fetchStats()

    }, [fetchStats]);

    return (
        <StatsContext.Provider
            value={{
                stats: state.stats
            }}
        >
            {children}
        </StatsContext.Provider>
    )


};

