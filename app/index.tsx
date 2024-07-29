import { Redirect } from "expo-router";
import authenticationDB from "./database/authentication";
import HomeScreen from "./home/home";
import LoginScreen from "./authentication/login";
import { useEffect, useState } from "react";

const Index = () => {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    authenticationDB.auth.onAuthStateChanged((user) => {
      if(user)
        setAuthenticated(true);
      else setAuthenticated(false);

      setLoading(false);
  });

  });

  if(loading)
    return null;
  
  if(!authenticated)
    return <LoginScreen></LoginScreen>
  else
    return <HomeScreen></HomeScreen>;
};
export default Index;
