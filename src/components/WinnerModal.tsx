import React from 'react';
import { useStageBan } from '../context/StageBanContext';
import { Trophy, Swords, RotateCcw } from 'lucide-react';
import { STAGES } from '../data/stages';

export const WinnerModal: React.FC = () => {
  const { 
    phase, 
    currentGame, 
    pickedStageId, 
    settings, 
    confirmGameWinner, 
    setWinner,
    p1Score,
    p2Score,
    history,
    resetSet,
    t
  } = useStageBan();

  if (phase !== 'PLAYING' && phase !== 'SET_COMPLETE') return null;

  const currentStageObj = STAGES.find(s => s.id === pickedStageId);

  if (phase === 'SET_COMPLETE') {
    const isP1Winner = setWinner === 'P1';
    const winnerName = isP1Winner ? settings.p1Name : settings.p2Name;

    return (
      <div className="modal-overlay">
        <div className="modal-card" style={{ textAlign: 'center' }}>
          <div style={{ margin: '0 auto 12px auto', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={36} color="#f59e0b" />
          </div>

          <h2 className="modal-title" style={{ fontSize: '1.6rem', color: '#f8fafc' }}>
            {t.setCompleteSubtitle(winnerName)}
          </h2>

          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-muted)', margin: '4px 0 16px 0' }}>
            <span style={{ color: 'var(--color-p1)' }}>{settings.p1Name} ({p1Score})</span> - <span style={{ color: 'var(--color-p2)' }}>{settings.p2Name} ({p2Score})</span>
          </div>

          {/* History Breakdown */}
          <div style={{ background: '#0b0f19', borderRadius: '12px', padding: '12px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t.historyModalTitle}</div>
            {history.map(g => (
              <div key={g.gameNumber} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>{t.gameLabel(g.gameNumber)}: <strong>{g.stageName}</strong></span>
                <span style={{ fontWeight: 700, color: g.winner === 'P1' ? 'var(--color-p1)' : 'var(--color-p2)' }}>
                  {g.winner === 'P1' ? settings.p1Name : settings.p2Name}
                </span>
              </div>
            ))}
          </div>

          <button className="btn-primary btn-gold" onClick={resetSet}>
            <RotateCcw size={18} />
            <span>{t.resetBtn}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Swords size={22} color="#10b981" />
            <h3 className="modal-title">{t.winnerModalTitle(currentGame)}</h3>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', margin: '2px 0 12px 0' }}>
            {currentStageObj?.name || 'Selected Stage'}
          </div>

          {currentStageObj && (
            <img 
              src={currentStageObj.image} 
              alt={currentStageObj.name} 
              style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px', border: '1px solid var(--border-card)' }}
            />
          )}

          <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>{t.winnerModalSubtitle(currentStageObj?.name || '')}</div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn-primary btn-p1"
              onClick={() => confirmGameWinner('P1')}
              style={{ flex: 1, padding: '16px' }}
            >
              {settings.p1Name}
            </button>
            <button
              className="btn-primary btn-p2"
              onClick={() => confirmGameWinner('P2')}
              style={{ flex: 1, padding: '16px' }}
            >
              {settings.p2Name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
