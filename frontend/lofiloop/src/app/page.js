import Image from "next/image";
import ExampleSketch from "../components/ExampleSketch";
import ForgotPassword from "../components/ForgotPassword";
import SignUp from "../components/SignUp";
import PageTitle from "../components/PageTitle";
import Chat from "../components/Chat";
import Login from "./login/page.js";

export default function Home() {
  return (
    <>
      {/* <PageTitle/>
      <SignUp/> */}
      <Login />
    </>
    );
}