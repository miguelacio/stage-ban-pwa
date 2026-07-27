import React, { useState } from 'react';
import { useStageBan } from '../context/StageBanContext';
import { DEFAULT_RULESETS } from '../data/rulesets';
import { STAGES } from '../data/stages';
import type { Ruleset, DsrType } from '../types/smash';
import { X, Check } from 'lucide-react';

interface RulesetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesetModal: React.FC<RulesetModalProps> = ({ isOpen, onClose }) => {
  const { ruleset, setRuleset, settings, updateSettings, t } = useStageBan();
  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'settings'>('presets');

  // Custom configuration state
  const [customStarters, setCustomStarters] = useState<string[]>(ruleset.starters);
  const [customCounterpicks, setCustomCounterpicks] = useState<string[]>(ruleset.counterpicks);
  const [customCpBans, setCustomCpBans] = useState<number>(ruleset.counterpickBans);
  const [customDsr, setCustomDsr] = useState<DsrType>(ruleset.dsr);

  if (!isOpen) return null;

  const handleSelectPreset = (r: Ruleset) => {
    setRuleset(r);
    onClose();
  };

  const handleToggleStageCategory = (stageId: string) => {
    if (customStarters.includes(stageId)) {
      setCustomStarters(prev => prev.filter(id => id !== stageId));
      setCustomCounterpicks(prev => [...prev, stageId]);
    } else if (customCounterpicks.includes(stageId)) {
      setCustomCounterpicks(prev => prev.filter(id => id !== stageId));
    } else {
      setCustomStarters(prev => [...prev, stageId]);
    }
  };

  const handleSaveCustom = () => {
    const customRuleset: Ruleset = {
      id: `custom_${Date.now()}`,
      name: 'Custom Ruleset',
      description: `${customStarters.length} Starters, ${customCounterpicks.length} Counterpicks, ${customCpBans} Bans.`,
      starters: customStarters,
      counterpicks: customCounterpicks,
      game1BansPattern: [1, 2],
      counterpickBans: customCpBans,
      dsr: customDsr,
      isCustom: true,
    };
    setRuleset(customRuleset);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <h3 className="modal-title">{t.settingsTitle}</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', background: '#0b0f19', padding: '4px', borderRadius: '10px' }}>
          <button 
            className={`btn-secondary ${activeTab === 'presets' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('presets')}
            style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
          >
            Presets
          </button>
          <button 
            className={`btn-secondary ${activeTab === 'custom' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('custom')}
            style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
          >
            Custom
          </button>
          <button 
            className={`btn-secondary ${activeTab === 'settings' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('settings')}
            style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
          >
            Settings
          </button>
        </div>

        {activeTab === 'presets' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DEFAULT_RULESETS.map(r => {
              const isSelected = ruleset.id === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => handleSelectPreset(r)}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? '1px solid var(--color-p2)' : '1px solid var(--border-card)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#f8fafc' }}>{r.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{r.description}</div>
                  </div>
                  {isSelected && <Check size={20} color="#3b82f6" />}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'custom' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                {t.cpBansLabel(customCpBans)}
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    className={`btn-secondary ${customCpBans === num ? 'btn-primary' : ''}`}
                    onClick={() => setCustomCpBans(num)}
                    style={{ flex: 1 }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                {t.dsrRuleLabel}
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['modified', 'full', 'none'] as DsrType[]).map(type => (
                  <button
                    key={type}
                    className={`btn-secondary ${customDsr === type ? 'btn-primary' : ''}`}
                    onClick={() => setCustomDsr(type)}
                    style={{ flex: 1, textTransform: 'capitalize', fontSize: '0.8rem' }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Stage Classification
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                {STAGES.map(s => {
                  const isStarter = customStarters.includes(s.id);
                  const isCP = customCounterpicks.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleToggleStageCategory(s.id)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        background: isStarter ? 'rgba(59, 130, 246, 0.2)' : (isCP ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)'),
                        border: '1px solid var(--border-card)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{s.name}</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: isStarter ? '#60a5fa' : (isCP ? '#fbbf24' : '#64748b') }}>
                        {isStarter ? t.startersLabel : (isCP ? 'CP' : 'Off')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="btn-primary" onClick={handleSaveCustom}>
              {t.saveSettingsBtn}
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                {t.languageLabel}
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className={`btn-secondary ${settings.language === 'en' ? 'btn-primary' : ''}`}
                  onClick={() => updateSettings({ language: 'en' })}
                  style={{ flex: 1, padding: '12px' }}
                >
                  {t.english}
                </button>
                <button
                  className={`btn-secondary ${settings.language === 'es' ? 'btn-primary' : ''}`}
                  onClick={() => updateSettings({ language: 'es' })}
                  style={{ flex: 1, padding: '12px' }}
                >
                  {t.spanish}
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                {t.soundLabel}
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className={`btn-secondary ${settings.soundEnabled ? 'btn-primary' : ''}`}
                  onClick={() => updateSettings({ soundEnabled: true })}
                  style={{ flex: 1, padding: '12px' }}
                >
                  🔊 {t.soundOn}
                </button>
                <button
                  className={`btn-secondary ${!settings.soundEnabled ? 'btn-primary' : ''}`}
                  onClick={() => updateSettings({ soundEnabled: false })}
                  style={{ flex: 1, padding: '12px' }}
                >
                  🔇 {t.soundOff}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
