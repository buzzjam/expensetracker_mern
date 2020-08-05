import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import numberWithCommas from "../format/numberWithCommas";

const BalanceTable = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts
    .filter((x) => x > 0)
    .reduce((a, c) => (a += c), 0)
    .toFixed(2);
  const expense = amounts
    .filter((x) => x < 0)
    .reduce((a, c) => (a += c), 0)
    .toFixed(2);

  return (
    <div className="bal-tal-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${numberWithCommas(income)}</p>
      </div>
      <div>
        <h4>Expenses</h4>
        <p className="money minus">${numberWithCommas(expense)}</p>
      </div>
    </div>
  );
};

export default BalanceTable;
