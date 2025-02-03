'use client';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { session, logout } = useAuth();

  return (
    <nav className="navbar fixed top-0 w-full h-10 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-xl font-bold text-vscode-blue">
          CryptoSouK
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-vscode-blue">
            Dashboard
          </Link>
          <Link href="/portfolio" className="hover:text-vscode-blue">
            Portfolio
          </Link>
        </div>
      </div>
      <div>
        {session ? (
          <div className="flex items-center space-x-4">
            <span>{session.user.email}</span>
            <button 
              onClick={logout}
              className="bg-vscode-blue px-4 py-2 rounded"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <Link href="/login" className="hover:text-vscode-blue">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}