import { useState } from "react";
import Auth from "./components/Auth";
import AppRoute from "./Routes/AppRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );

  if (!isLoggedIn) {
    return <Auth setIsLoggedIn={setIsLoggedIn} />;
  }

  return <AppRoute />;
}

export default App;