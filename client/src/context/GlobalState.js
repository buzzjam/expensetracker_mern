import React, { createContext, useReducer } from "react";
import axios from "axios";
import Reducer from "./Reducer";

//initial state
const initialState = {
  error: null,
  loading: true,
  transactions: [],
};

const url = "/api/v1/transactions"

//context
export const GlobalContext = createContext(initialState);

//provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  //functions
  const getTransactions = async () => {
    try {
      const res = await axios.get(url);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (e) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: e.response.data.error,
      });
    }
  };

  const delTransaction = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      dispatch({
        type: "DEL_TRANSACTION",
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: e.response.data.error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(url, transaction, config);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (e) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: e.response.data.error,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        loading: state.loading,
        error: state.error,
        getTransactions,
        delTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
