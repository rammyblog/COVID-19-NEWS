import React, {createContext, useReducer, useEffect, useCallback} from "react"
import NewsReducer from "./NewsReducer"
import axios from "axios";

const initialState = {
    news: [],
    loading: false
};
export const newsContext = createContext(initialState);

export const NewsProvider = ({children}) => {
    const [state, dispatch] = useReducer(NewsReducer, initialState);

    const setLoading = (loadingBool) => {
        dispatch({type: "SET_LOADING", payload: loadingBool});
    };
    const fetchNews = useCallback(async () => {
        setLoading(true);
        const response = await axios.get(
            "https://scheduler-rammy.herokuapp.com/news/"
        );
        setLoading(false);
        dispatch({type: "GET_NEWS", payload: response.data.news});
    }, [dispatch]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);
    return (
        <newsContext.Provider
            value={{
                news: state.news,
                loading: state.loading
            }}
        >
            {children}
        </newsContext.Provider>
    )
};
