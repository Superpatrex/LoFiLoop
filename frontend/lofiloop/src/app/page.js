import Image from "next/image";
import ExampleSketch from "./ExampleSketch";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import PageTitle from "./PageTitle";

export default function Home() {
  return (
    <>
      <PageTitle/>
      <SignUp/>
    </>
    );
}