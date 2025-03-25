// filepath: c:\Users\krupa\OneDrive\Desktop\LoFiLoop\frontend\lofiloop\src\app\login\page.js
import LogIn from "../../components/LogIn";
import Layout from "../../components/Layout";
import Link from "next/link";

export default function LogInPage() {
  return (
    <Layout>
      <LogIn />
      <div className="navigation-links">
        <p>Don't have an account? <Link href="/signup">Sign Up Here</Link></p>
        <p>Forgot your password? <Link href="/forgot-password">Reset Password</Link></p>
      </div>
    </Layout>
  );
}