import React from 'react';
import { useStageBan } from '../context/StageBanContext';
import { Ban, CheckCircle2, RotateCcw } from 'lucide-react';

export const BottomDock: React.FC = () => {
  const {
    phase,
    activeBanner,
    bansRequiredCurrentTurn,
    bansRemainingCurrentTurn,
    currentTurnBans,
    confirmBans,
    undoLastAction,
    t,
  } = useStageBan();

  if (phase === 'RPS' || phase === 'PLAYING' || phase === 'SET_COMPLETE') {
    return null;
  }

  const isBanPhase = phase === 'STARTER_BAN' || phase === 'COUNTERPICK_BAN';
  const isPickPhase = phase === 'STARTER_PICK' || phase === 'COUNTERPICK_PICK';

  const canConfirmBans = isBanPhase && currentTurnBans.length === bansRequiredCurrentTurn;
  const isP1 = activeBanner === 'P1';

  return (
    <div className="bottom-dock">
      <button 
        className="btn-secondary" 
        onClick={undoLastAction}
        title={t.undoBtn}
        style={{ padding: '14px' }}
      >
        <RotateCcw size={18} />
      </button>

      {isBanPhase && (
        <button
          className={`btn-primary ${isP1 ? 'btn-p1' : 'btn-p2'}`}
          disabled={!canConfirmBans}
          onClick={confirmBans}
        >
          <Ban size={18} />
          <span>
            {canConfirmBans 
              ? (bansRequiredCurrentTurn === 1 ? t.confirmBanSingle : t.confirmBanPlural(bansRequiredCurrentTurn))
              : t.selectMoreStages(bansRemainingCurrentTurn)
            }
          </span>
        </button>
      )}

      {isPickPhase && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '14px', border: '1px solid var(--border-card)', padding: '0 12px' }}>
          <CheckCircle2 size={16} color="#f59e0b" style={{ marginRight: '6px' }} />
          {t.tapToSelectHint}
        </div>
      )}
    </div>
  );
};
