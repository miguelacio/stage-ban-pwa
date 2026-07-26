import React from 'react';
import { useStageBan } from '../context/StageBanContext';
import { X, History, MapPin } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const { history, settings } = useStageBan();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={22} color="#8b5cf6" />
            <h3 className="modal-title">Set Match History</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
            No games played in this set yet.
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
                      Game {game.gameNumber}: {game.stageName}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: isP1Win ? 'var(--color-p1)' : 'var(--color-p2)' }}>
                      {winnerName} Won ({game.p1ScoreAfter}-{game.p2ScoreAfter})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
