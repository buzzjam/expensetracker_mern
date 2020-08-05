import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import numberWithCommas from "../format/numberWithCommas";

const Transaction = ({ transaction }) => {
  const { delTransaction } = useContext(GlobalContext);

  const sign = transaction.amount > 0 ? "+" : "-";
  const transactionColor = transaction.amount > 0 ? "plus" : "minus";

  return (
    <li className={transactionColor}>
      {transaction.text}
      <span>
        {sign} ${numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => delTransaction(transaction._id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};
export default Transaction;
