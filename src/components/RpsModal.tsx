import React, { useState } from 'react';
import { useStageBan } from '../context/StageBanContext';
import type { PlayerId } from '../types/smash';
import { Dices, ArrowRight } from 'lucide-react';

export const RpsModal: React.FC = () => {
  const { phase, settings, selectRpsWinner, t } = useStageBan();
  const [selectedWinner, setSelectedWinner] = useState<PlayerId | null>(null);
  const [firstBanner, setFirstBanner] = useState<PlayerId | null>(null);

  if (phase !== 'RPS') return null;

  const handleConfirm = () => {
    if (selectedWinner && firstBanner) {
      selectRpsWinner(selectedWinner, firstBanner);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Dices size={24} color="#f59e0b" />
            <h3 className="modal-title">{t.rpsModalTitle}</h3>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              {t.whoWonRps}
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className={`btn-secondary ${selectedWinner === 'P1' ? 'btn-p1' : ''}`}
                onClick={() => {
                  setSelectedWinner('P1');
                  setFirstBanner('P1'); // default winner bans first
                }}
                style={{ flex: 1, padding: '14px' }}
              >
                {settings.p1Name} (P1)
              </button>
              <button
                className={`btn-secondary ${selectedWinner === 'P2' ? 'btn-p2' : ''}`}
                onClick={() => {
                  setSelectedWinner('P2');
                  setFirstBanner('P2'); // default winner bans first
                }}
                style={{ flex: 1, padding: '14px' }}
              >
                {settings.p2Name} (P2)
              </button>
            </div>
          </div>

          {selectedWinner && (
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                {t.whoBansFirst}
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className={`btn-secondary ${firstBanner === 'P1' ? 'btn-p1' : ''}`}
                  onClick={() => setFirstBanner('P1')}
                  style={{ flex: 1 }}
                >
                  {settings.p1Name}
                </button>
                <button
                  className={`btn-secondary ${firstBanner === 'P2' ? 'btn-p2' : ''}`}
                  onClick={() => setFirstBanner('P2')}
                  style={{ flex: 1 }}
                >
                  {settings.p2Name}
                </button>
              </div>
            </div>
          )}

          <button
            className="btn-primary btn-gold"
            disabled={!selectedWinner || !firstBanner}
            onClick={handleConfirm}
            style={{ marginTop: '8px' }}
          >
            <span>{t.startStrikingBtn}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
