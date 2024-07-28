import { Redirect } from "expo-router";
import authenticationDB from "./database/authentication";

const Index = () => {

  return <Redirect href="/authentication/login" />;
};
export default Index;
