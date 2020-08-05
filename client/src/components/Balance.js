import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import numberWithCommas from "../format/numberWithCommas"


const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const sum = amounts.reduce((a, c) => (a += c), 0).toFixed(2);

  return (
    <>
      <h4>Balance</h4>
      <h1>${numberWithCommas(sum)}</h1>
    </>
  );
};

export default Balance