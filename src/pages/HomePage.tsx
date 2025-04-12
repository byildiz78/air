import React from 'react';
import SalesOperations from '../components/SalesOperations';
import QuickOperations from '../components/QuickOperations';
import CallList from '../components/CallList';
import CashierOperations from '../components/CashierOperations';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-8 h-full">
      <div className="grid grid-cols-3 gap-8 h-full">
        <div className="space-y-8">
          <div className="h-[calc(70%)]">
            <SalesOperations />
          </div>
          <div className="h-[calc(30%-2rem)]">
            <CashierOperations />
          </div>
        </div>
        <div className="h-full">
          <QuickOperations />
        </div>
        <div className="h-full">
          <CallList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
