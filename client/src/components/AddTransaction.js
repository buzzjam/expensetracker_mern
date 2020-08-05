import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useForm } from "react-hook-form";


const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState();

  const { addTransaction } = useContext(GlobalContext);

  const { register, handleSubmit, errors } = useForm();

  const newID = Math.floor(Math.random() * 1000000);

  const onSubmit = () => {
    const newTransaction = {
      id: newID,
      text,
      amount: +amount,
    };
    addTransaction(newTransaction);
    clearState();
  };

  const clearState = () => {
    setText("");
    setAmount("");
  };

  return (
    <>
      <h3> Add New Transaction</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            name="description"
            ref={register({ required: true })}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Transaction"
          />
          {errors.description && "Description is required!"}
        </div>
        <div className="form-control">
          <label htmlFor="Amount">Amount</label>
          <input
            name="amount"
            ref={register({ required: true })}
            type="number"
            step="0.01"
            value={+amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          {errors.amount && "Amount is required!"}
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};

export default AddTransaction