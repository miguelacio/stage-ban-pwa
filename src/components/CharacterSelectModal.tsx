import React, { useState, useMemo } from 'react';
import { useStageBan } from '../context/StageBanContext';
import { SSBU_CHARACTERS } from '../data/characters';
import { UserCheck, Search, Shield } from 'lucide-react';

export const CharacterSelectModal: React.FC = () => {
  const {
    phase,
    currentGame,
    activeCharPicker,
    charStep,
    p1Character,
    p2Character,
    settings,
    selectCharacter,
    t,
    toggleLanguage
  } = useStageBan();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter characters (Hook called unconditionally at top level)
  const filteredCharacters = useMemo(() => {
    if (!searchQuery.trim()) return SSBU_CHARACTERS;
    const q = searchQuery.toLowerCase();
    return SSBU_CHARACTERS.filter(c => c.name.toLowerCase().includes(q));
  }, [searchQuery]);

  if (phase !== 'CHARACTER_SELECT' || !activeCharPicker) return null;

  const isP1 = activeCharPicker === 'P1';
  const pickerName = isP1 ? settings.p1Name : settings.p2Name;
  const currentSelectedChar = isP1 ? p1Character : p2Character;

  // Header explanation text
  let turnSubtitle = '';
  if (currentGame === 1) {
    turnSubtitle = charStep === 1
      ? t.charSelectStep1Loser(pickerName)
      : t.charSelectStep2Winner(pickerName);
  } else {
    turnSubtitle = charStep === 1
      ? t.charSelectGameWinner(pickerName)
      : t.charSelectGameLoser(pickerName);
  }

  const handleSelectChar = (name: string) => {
    selectCharacter(name);
    setSearchQuery('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '580px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Modal Header */}
        <div className="modal-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={24} color={isP1 ? 'var(--color-p1)' : 'var(--color-p2)'} />
            <div>
              <h3 className="modal-title">{t.selectCharPrompt(pickerName)}</h3>
              <span className={`turn-pill ${isP1 ? 'p1' : 'p2'}`} style={{ fontSize: '0.65rem', marginTop: '2px', display: 'inline-block' }}>
                {activeCharPicker} PICK
              </span>
            </div>
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

        {/* Turn Step Guidance Banner */}
        <div style={{
          background: isP1 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(59, 130, 246, 0.12)',
          border: `1px solid ${isP1 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
          borderRadius: '10px',
          padding: '10px 14px',
          fontSize: '0.85rem',
          color: '#f8fafc',
          fontWeight: 600,
          margin: '10px 0'
        }}>
          {turnSubtitle}
        </div>

        {/* Option to Keep Current Character (Game 2+ or if already selected) */}
        {currentSelectedChar && (
          <button
            className={`btn-primary ${isP1 ? 'btn-p1' : 'btn-p2'}`}
            onClick={() => handleSelectChar(currentSelectedChar)}
            style={{ marginBottom: '12px', padding: '12px' }}
          >
            <Shield size={18} />
            <span>{t.keepCharacterBtn(pickerName, currentSelectedChar)}</span>
          </button>
        )}

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder={t.charSearchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 10px 10px 38px',
              borderRadius: '10px',
              background: '#0b0f19',
              border: '1px solid var(--border-card)',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Character Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
          gap: '8px',
          overflowY: 'auto',
          paddingRight: '4px',
          maxHeight: '380px'
        }}>
          {filteredCharacters.map(char => {
            const isCurrent = currentSelectedChar === char.name;

            return (
              <div
                key={char.id}
                onClick={() => handleSelectChar(char.name)}
                style={{
                  padding: '10px 6px',
                  borderRadius: '10px',
                  background: isCurrent ? (isP1 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(59, 130, 246, 0.25)') : 'rgba(255, 255, 255, 0.04)',
                  border: isCurrent ? `2px solid ${isP1 ? 'var(--color-p1)' : 'var(--color-p2)'}` : '1px solid var(--border-card)',
                  boxShadow: isCurrent ? (isP1 ? '0 0 12px rgba(239, 68, 68, 0.4)' : '0 0 12px rgba(59, 130, 246, 0.4)') : 'none',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  minHeight: '75px'
                }}
              >
                {char.icon ? (
                  <img 
                    src={char.icon} 
                    alt={char.name} 
                    style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                    onError={(e) => {
                      // fallback if icon fails to load
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.1 }}>
                  {char.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
