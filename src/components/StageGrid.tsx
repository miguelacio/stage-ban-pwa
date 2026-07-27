import React from 'react';
import { useStageBan } from '../context/StageBanContext';
import { StageCard } from './StageCard';

export const StageGrid: React.FC = () => {
  const {
    phase,
    starterStages,
    allActiveStages,
    bannedStageIds,
    pickedStageId,
    dsrBlockedStageIds,
    toggleBanStage,
    selectPickStage,
    t,
  } = useStageBan();

  // If Game 1 Starter striking, only display starters. In Counterpick phase, show all active legal stages.
  const displayStages = (phase === 'STARTER_BAN' || phase === 'STARTER_PICK')
    ? starterStages
    : allActiveStages;

  const handleStageClick = (stageId: string) => {
    if (phase === 'STARTER_BAN' || phase === 'COUNTERPICK_BAN') {
      toggleBanStage(stageId);
    } else if (phase === 'STARTER_PICK' || phase === 'COUNTERPICK_PICK') {
      if (!bannedStageIds.includes(stageId) && !dsrBlockedStageIds.includes(stageId)) {
        selectPickStage(stageId);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div className="stage-grid-header">
        <div className="stage-grid-title">
          {phase === 'STARTER_BAN' || phase === 'STARTER_PICK' ? t.starterStagesTitle : t.legalStagesTitle}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {t.stagesAvailable(displayStages.length)}
        </div>
      </div>

      <div className="stage-grid">
        {displayStages.map(stage => {
          const isBanned = bannedStageIds.includes(stage.id);
          const isPicked = pickedStageId === stage.id;
          const isDsrBlocked = dsrBlockedStageIds.includes(stage.id);

          const isSelectable = 
            (phase === 'STARTER_BAN' || phase === 'COUNTERPICK_BAN') ||
            ((phase === 'STARTER_PICK' || phase === 'COUNTERPICK_PICK') && !isBanned && !isDsrBlocked);

          return (
            <StageCard
              key={stage.id}
              stage={stage}
              isBanned={isBanned}
              isPicked={isPicked}
              isDsrBlocked={isDsrBlocked}
              isSelectable={isSelectable}
              onClick={() => handleStageClick(stage.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
