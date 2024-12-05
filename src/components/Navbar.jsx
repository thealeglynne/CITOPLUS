import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-gray-200 px-6 py-3 shadow-lg">
      <h1 className="text-2xl font-semibold font-serif text-white tracking-wider">
        CITOPlUS
      </h1>

      <ul className="flex gap-x-4">
        {!session?.user ? (
          <>
            <li>
              <Link href="/" className="text-sm font-medium hover:text-gray-400 transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link href="/auth/login" className="text-sm font-medium hover:text-gray-400 transition-colors duration-300">Login</Link>
            </li>
            <li>
              <Link href="/auth/register" className="text-sm font-medium hover:text-gray-400 transition-colors duration-300">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/dashboard" className="text-sm font-medium hover:text-gray-400 transition-colors duration-300">Dashboard</Link>
            </li>
            <li>
              <Link href="/api/auth/signout" className="text-sm font-medium hover:text-gray-400 transition-colors duration-300">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
