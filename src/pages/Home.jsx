import { useState } from "react";
import LoginButton from "../components/LoginButtons.jsx";
import TransactionForm from "../components/TransactionForms.jsx";

const Home = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
  };

  return (
    <div>
      <h1>Pi Transfer App</h1>
      <LoginButton onLogin={handleLogin} />
      {user && <TransactionForm user={user} />}
    </div>
  );
};

export default Home;
