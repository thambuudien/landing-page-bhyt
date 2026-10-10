'use html';
'use client';

import React, { useState } from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import CostCalculator from '@/components/CostCalculator';
import RisksSection from '@/components/RisksSection';
import LookupPanel from '@/components/LookupPanel';
import AgentInfoPanel from '@/components/AgentInfoPanel';
import FaqSection from '@/components/FaqSection';

export default function MainDashboardContainer() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefreshLookup = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* CỘT TRÁI (5 CỘT) */}
      <div className="lg:col-span-5 space-y-6">
        <RegistrationForm onSuccess={handleRefreshLookup} />
        <CostCalculator />
      </div>

      {/* CỘT PHẢI (7 CỘT) */}
      <div className="lg:col-span-7 space-y-6">
        <RisksSection />
        <LookupPanel refreshTrigger={refreshTrigger} />
        <AgentInfoPanel />
        <FaqSection />
      </div>
    </div>
  );
}
