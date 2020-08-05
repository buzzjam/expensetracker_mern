import React from "react";
import { Header, Balance, BalanceTable, TransactionList, AddTransaction } from "./components/";
import { GlobalProvider } from "./context/GlobalState";


import "./App.css";

function App() {
  return (
    <GlobalProvider className="App">
      <Header />
      <div className="container">
        <Balance />
        <BalanceTable />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
