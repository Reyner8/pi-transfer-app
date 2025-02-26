import { useState } from "react";

const LoginButton = ({ onLogin }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    if (!window.Pi) {
      alert("Pi SDK not found!");
      return;
    }

    try {
      await window.Pi.init({ version: "2.0" }); // Pastikan inisialisasi sebelum login
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(
        scopes,
        onIncompletePaymentFound
      );
      setUser(auth.user);
      onLogin(auth.user, auth.accessToken);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Incomplete Payment Found:", payment);
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <button onClick={handleLogin}>Login with Pi</button>
      )}
    </div>
  );
};

export default LoginButton;
