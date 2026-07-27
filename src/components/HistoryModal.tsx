import React from 'react';
import { useStageBan } from '../context/StageBanContext';
import { X, History, MapPin } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const { history, settings, t } = useStageBan();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={22} color="#8b5cf6" />
            <h3 className="modal-title">{t.historyModalTitle}</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
            {t.noGamesPlayed}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {history.map(game => {
              const isP1Win = game.winner === 'P1';
              const winnerName = isP1Win ? settings.p1Name : settings.p2Name;

              return (
                <div
                  key={game.gameNumber}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={16} color="#f59e0b" />
                      {t.gameLabel(game.gameNumber)}: {game.stageName}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: isP1Win ? 'var(--color-p1)' : 'var(--color-p2)' }}>
                      {winnerName} ({game.p1ScoreAfter}-{game.p2ScoreAfter})
                    </div>
                  </div>
                  {(game.p1Character || game.p2Character) && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', marginTop: '2px' }}>
                      <span><strong style={{ color: 'var(--color-p1)' }}>{settings.p1Name}:</strong> {game.p1Character || 'N/A'}</span>
                      <span>vs</span>
                      <span><strong style={{ color: 'var(--color-p2)' }}>{settings.p2Name}:</strong> {game.p2Character || 'N/A'}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
