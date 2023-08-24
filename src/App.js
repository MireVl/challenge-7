import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: action.payload, isActive: true };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance < action.payload
            ? state.balance
            : state.balance - action.payload,
      };
    case "requestLoan":
      return {
        ...state,
        balance:
          state.loan === action.payload
            ? state.balance
            : state.balance + action.payload,
        loan:
          state.loan === action.payload
            ? state.loan
            : state.loan + action.payload,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - action.payload,
        loan: state.loan - action.payload,
      };
    case "closeAccount":
      if (state.balance === 0 && state.loan === 0) {
        return { ...initialState };
      } else {
        return { ...state };
      }
  }
};

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount", payload: 500 });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default App;
