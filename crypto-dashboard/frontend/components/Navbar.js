import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Crypto Dashboard
        </Link>
        <div className="space-x-4">
          <Link href="/portfolio" className="hover:text-gray-300">
            Portfolio
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Se connecter
          </Link>
        </div>
      </div>
    </nav>
  );
}