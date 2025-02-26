import { useState } from "react";
import { toast } from "react-toastify";

const TransactionForm = ({ user }) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const sendPiPayment = async () => {
    if (!user) {
      toast.error("Please log in first!");
      return;
    }

    try {
      const paymentData = {
        amount: parseFloat(amount),
        memo: `Transfer to ${recipient}`,
        metadata: { type: "transfer" },
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId) =>
          console.log("Payment ready:", paymentId),
        onReadyForServerCompletion: (paymentId) =>
          console.log("Payment completed:", paymentId),
        onCancel: (paymentId) => toast.error("Payment cancelled!"),
        onError: (error) => toast.error(`Payment error: ${error.message}`),
      });

      console.log("Payment created:", payment);
      toast.success("Transaction successful!");
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Transaction failed!");
    }
  };

  return (
    <div>
      <h2>Send Pi</h2>
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendPiPayment}>Send Pi</button>
    </div>
  );
};

export default TransactionForm;
