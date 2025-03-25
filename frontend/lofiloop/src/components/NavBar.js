import Link from "next/link";
import './NavBar.css';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
        <li>
          <Link href="/login">Log In</Link>
        </li>
        <li>
          <Link href="/">About Us</Link>
        </li>
      </ul>
    </nav>
  );
}