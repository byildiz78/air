import React from 'react';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Next.js handles routing through the pages directory */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
