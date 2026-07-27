import React, { useState } from 'react';
import { StageBanProvider } from './context/StageBanContext';
import { Header } from './components/Header';
import { PhaseBanner } from './components/PhaseBanner';
import { StageGrid } from './components/StageGrid';
import { RpsModal } from './components/RpsModal';
import { WinnerModal } from './components/WinnerModal';
import { RulesetModal } from './components/RulesetModal';
import { HistoryModal } from './components/HistoryModal';
import { BottomDock } from './components/BottomDock';

export const MainApp: React.FC = () => {
  const [isRulesetOpen, setIsRulesetOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <div className="app-shell">
      <Header 
        onOpenRuleset={() => setIsRulesetOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      <PhaseBanner />

      <main className="main-content">
        <StageGrid />
      </main>

      <BottomDock />

      {/* Modals */}
      <RpsModal />
      <WinnerModal />
      <RulesetModal isOpen={isRulesetOpen} onClose={() => setIsRulesetOpen(false)} />
      <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <StageBanProvider>
      <MainApp />
    </StageBanProvider>
  );
}
