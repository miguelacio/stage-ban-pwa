import React from 'react';
import type { Stage } from '../types/smash';
import { useStageBan } from '../context/StageBanContext';
import { Ban, Check, Lock, Layers } from 'lucide-react';

interface StageCardProps {
  stage: Stage;
  isBanned: boolean;
  isPicked: boolean;
  isDsrBlocked: boolean;
  isSelectable: boolean;
  onClick: () => void;
}

export const StageCard: React.FC<StageCardProps> = ({
  stage,
  isBanned,
  isPicked,
  isDsrBlocked,
  isSelectable,
  onClick,
}) => {
  const { t } = useStageBan();

  let cardClass = 'stage-card';
  if (isBanned) cardClass += ' banned';
  if (isPicked) cardClass += ' picked';
  if (isDsrBlocked) cardClass += ' dsr-blocked';

  return (
    <div 
      className={cardClass}
      onClick={isDsrBlocked ? undefined : onClick}
      style={{
        cursor: isDsrBlocked ? 'not-allowed' : (isSelectable ? 'pointer' : 'default'),
        borderColor: isPicked ? 'var(--color-gold)' : (isSelectable ? stage.accentColor : 'var(--border-card)')
      }}
    >
      <div className="stage-card-img-wrapper">
        <img 
          src={stage.image} 
          alt={stage.name} 
          className="stage-card-img" 
          loading="lazy" 
        />

        {/* Banned Overlay */}
        {isBanned && (
          <div className="stage-ban-overlay">
            <Ban size={36} color="#ef4444" strokeWidth={3} />
            <span style={{ marginTop: '4px', textTransform: 'uppercase' }}>{t.badgeBanned}</span>
          </div>
        )}

        {/* Picked Overlay */}
        {isPicked && (
          <div className="stage-pick-overlay">
            <Check size={40} color="#f59e0b" strokeWidth={3} />
            <span style={{ marginTop: '4px', textTransform: 'uppercase' }}>{t.badgePicked}</span>
          </div>
        )}

        {/* DSR Blocked Overlay */}
        {isDsrBlocked && (
          <div className="stage-dsr-overlay">
            <Lock size={28} color="#8b5cf6" style={{ marginBottom: '4px' }} />
            <span>{t.badgeDsrBlocked}</span>
          </div>
        )}
      </div>

      <div className="stage-card-body">
        <div className="stage-name">{stage.name}</div>
        <div className="stage-badges">
          <span className={`badge ${stage.category}`}>
            {stage.category === 'starter' ? t.startersLabel : t.counterpicksLabel}
          </span>
          <span className="badge" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Layers size={10} />
            {stage.layout}
          </span>
        </div>
      </div>
    </div>
  );
};
