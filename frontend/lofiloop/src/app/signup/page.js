import SignUp from "../../components/SignUp";
import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar"; // Import NavBar component

export default function SignUpPage() {
  return (
    <Layout>
      <NavBar />
      <SignUp />
    </Layout>
  );
}