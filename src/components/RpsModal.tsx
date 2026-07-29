import React, { useState } from 'react';
import { useStageBan } from '../context/StageBanContext';
import type { PlayerId } from '../types/smash';
import { Dices, ArrowRight, Trophy, Check } from 'lucide-react';

export const RpsModal: React.FC = () => {
  const { phase, settings, updateSettings, selectRpsWinner, t, toggleLanguage } = useStageBan();
  const [selectedWinner, setSelectedWinner] = useState<PlayerId | null>(null);
  const [firstBanner, setFirstBanner] = useState<PlayerId | null>(null);

  if (phase !== 'RPS') return null;

  const handleConfirm = () => {
    if (selectedWinner && firstBanner) {
      selectRpsWinner(selectedWinner, firstBanner);
    }
  };

  const getButtonStyle = (isSelected: boolean, player: 'P1' | 'P2' | 'gold') => {
    if (!isSelected) {
      return {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--border-card)',
        color: 'var(--text-muted)',
        fontWeight: 600,
        transition: 'all 0.2s ease',
      };
    }

    if (player === 'P1') {
      return {
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: '#ffffff',
        border: '2px solid #f87171',
        boxShadow: '0 0 20px rgba(239, 68, 68, 0.8), 0 0 35px rgba(239, 68, 68, 0.4)',
        transform: 'scale(1.03)',
        fontWeight: 800,
        transition: 'all 0.2s ease',
      };
    }

    if (player === 'P2') {
      return {
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#ffffff',
        border: '2px solid #60a5fa',
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 35px rgba(59, 130, 246, 0.4)',
        transform: 'scale(1.03)',
        fontWeight: 800,
        transition: 'all 0.2s ease',
      };
    }

    return {
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
      color: '#0f172a',
      border: '2px solid #fbbf24',
      boxShadow: '0 0 20px rgba(245, 158, 11, 0.8), 0 0 35px rgba(245, 158, 11, 0.4)',
      transform: 'scale(1.03)',
      fontWeight: 800,
      transition: 'all 0.2s ease',
    };
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '440px' }}>
        <div className="modal-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Dices size={24} color="#f59e0b" />
            <h3 className="modal-title">{t.rpsModalTitle}</h3>
          </div>
          <button 
            className="icon-btn" 
            onClick={toggleLanguage}
            title={settings.language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', color: '#fff' }}
          >
            🌐 {settings.language.toUpperCase()}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Match Format Option (Best of 3 vs Best of 5) */}
          <div>
            <label style={{ fontSize: '0.85rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: 700 }}>
              <Trophy size={16} color="#f59e0b" />
              {t.bestOfLabel}
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn-secondary"
                onClick={() => updateSettings({ bestOf: 3 })}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  ...getButtonStyle(settings.bestOf === 3, 'gold')
                }}
              >
                {settings.bestOf === 3 && <Check size={16} strokeWidth={3} />}
                <span>{t.bestOf3}</span>
              </button>

              <button
                className="btn-secondary"
                onClick={() => updateSettings({ bestOf: 5 })}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  ...getButtonStyle(settings.bestOf === 5, 'gold')
                }}
              >
                {settings.bestOf === 5 && <Check size={16} strokeWidth={3} />}
                <span>{t.bestOf5}</span>
              </button>
            </div>
          </div>

          {/* RPS Winner Selection */}
          <div>
            <label style={{ fontSize: '0.85rem', color: '#f8fafc', display: 'block', marginBottom: '8px', fontWeight: 700 }}>
              {t.whoWonRps}
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSelectedWinner('P1');
                  setFirstBanner('P1');
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  ...getButtonStyle(selectedWinner === 'P1', 'P1')
                }}
              >
                {selectedWinner === 'P1' && <Check size={18} strokeWidth={3} />}
                <span>{settings.p1Name} (P1)</span>
              </button>

              <button
                className="btn-secondary"
                onClick={() => {
                  setSelectedWinner('P2');
                  setFirstBanner('P2');
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  ...getButtonStyle(selectedWinner === 'P2', 'P2')
                }}
              >
                {selectedWinner === 'P2' && <Check size={18} strokeWidth={3} />}
                <span>{settings.p2Name} (P2)</span>
              </button>
            </div>
          </div>

          {/* First Banner Selection */}
          {selectedWinner && (
            <div>
              <label style={{ fontSize: '0.85rem', color: '#f8fafc', display: 'block', marginBottom: '8px', fontWeight: 700 }}>
                {t.whoBansFirst}
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn-secondary"
                  onClick={() => setFirstBanner('P1')}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    ...getButtonStyle(firstBanner === 'P1', 'P1')
                  }}
                >
                  {firstBanner === 'P1' && <Check size={18} strokeWidth={3} />}
                  <span>{settings.p1Name}</span>
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => setFirstBanner('P2')}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    ...getButtonStyle(firstBanner === 'P2', 'P2')
                  }}
                >
                  {firstBanner === 'P2' && <Check size={18} strokeWidth={3} />}
                  <span>{settings.p2Name}</span>
                </button>
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <button
            className="btn-primary btn-gold"
            disabled={!selectedWinner || !firstBanner}
            onClick={handleConfirm}
            style={{ 
              marginTop: '8px', 
              padding: '14px', 
              fontSize: '1rem',
              fontWeight: 800,
              boxShadow: selectedWinner && firstBanner ? '0 0 20px rgba(245, 158, 11, 0.6)' : 'none'
            }}
          >
            <span>{t.startStrikingBtn}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
