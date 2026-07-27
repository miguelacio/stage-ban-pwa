import React, { useState } from 'react';
import { useStageBan } from '../context/StageBanContext';
import { Shield, RotateCcw, Settings, History, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  onOpenRuleset: () => void;
  onOpenHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRuleset, onOpenHistory }) => {
  const { 
    settings, 
    updateSettings, 
    p1Score, 
    p2Score, 
    ruleset, 
    resetSet,
    undoLastAction,
    t,
    toggleLanguage,
    p1Character,
    p2Character,
  } = useStageBan();

  const [isEditingNames, setIsEditingNames] = useState(false);
  const [tempP1, setTempP1] = useState(settings.p1Name);
  const [tempP2, setTempP2] = useState(settings.p2Name);

  const handleSaveNames = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      p1Name: tempP1.trim() || 'Player 1',
      p2Name: tempP2.trim() || 'Player 2',
    });
    setIsEditingNames(false);
  };

  const handleResetClick = () => {
    if (window.confirm(t.confirmResetMsg)) {
      resetSet();
    }
  };

  return (
    <header className="app-header">
      <div className="brand-bar">
        <div className="brand-title">
          <Shield size={20} color="#8b5cf6" />
          <span>{t.appTitle}</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button 
            className="icon-btn" 
            onClick={toggleLanguage}
            title={settings.language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', color: '#fff' }}
          >
            🌐 {settings.language.toUpperCase()}
          </button>

          <button 
            className="icon-btn" 
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            title={settings.soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
          >
            {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} color="#94a3b8" />}
          </button>

          <button className="icon-btn" onClick={onOpenHistory} title={t.historyBtn}>
            <History size={18} />
          </button>

          <button className="icon-btn" onClick={onOpenRuleset} title={t.rulesetBtn}>
            <Settings size={18} />
          </button>

          <button className="icon-btn" onClick={undoLastAction} title={t.undoBtn}>
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="scoreboard">
        <div className="player-card p1" onClick={() => setIsEditingNames(true)} style={{ cursor: 'pointer' }}>
          <div className="player-avatar p1">P1</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
            <div className="player-name" title={settings.p1Name}>{settings.p1Name}</div>
            {p1Character && <div style={{ fontSize: '0.7rem', color: 'var(--color-p1)', fontWeight: 700 }}>{p1Character}</div>}
          </div>
        </div>

        <div className="score-display">
          <span className="score-num p1-color">{p1Score}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>-</span>
          <span className="score-num p2-color">{p2Score}</span>
          <div className="best-of-badge" style={{ marginLeft: '4px' }}>Bo{settings.bestOf}</div>
        </div>

        <div className="player-card p2" onClick={() => setIsEditingNames(true)} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', overflow: 'hidden' }}>
            <div className="player-name" title={settings.p2Name}>{settings.p2Name}</div>
            {p2Character && <div style={{ fontSize: '0.7rem', color: 'var(--color-p2)', fontWeight: 700 }}>{p2Character}</div>}
          </div>
          <div className="player-avatar p2">P2</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <span>{t.rulesetBtn}: <strong>{ruleset.name}</strong></span>
        <button 
          onClick={handleResetClick} 
          style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
        >
          {t.resetBtn}
        </button>
      </div>

      {/* Edit Names Modal */}
      {isEditingNames && (
        <div className="modal-overlay" onClick={() => setIsEditingNames(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Player Names</h3>
            </div>
            <form onSubmit={handleSaveNames} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Player 1 Name</label>
                <input 
                  type="text" 
                  value={tempP1} 
                  onChange={e => setTempP1(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0b0f19', border: '1px solid var(--border-card)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Player 2 Name</label>
                <input 
                  type="text" 
                  value={tempP2} 
                  onChange={e => setTempP2(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0b0f19', border: '1px solid var(--border-card)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Set Format</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" 
                    className={`btn-secondary ${settings.bestOf === 3 ? 'btn-primary' : ''}`}
                    onClick={() => updateSettings({ bestOf: 3 })}
                    style={{ flex: 1 }}
                  >
                    Best of 3
                  </button>
                  <button 
                    type="button" 
                    className={`btn-secondary ${settings.bestOf === 5 ? 'btn-primary' : ''}`}
                    onClick={() => updateSettings({ bestOf: 5 })}
                    style={{ flex: 1 }}
                  >
                    Best of 5
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Save</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
