
import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-forest-bg text-forest-text">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
