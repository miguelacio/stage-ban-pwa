import React from 'react';
import { useStageBan } from '../context/StageBanContext';
import { Swords, Ban, CheckCircle2, PlayCircle, Trophy } from 'lucide-react';

export const PhaseBanner: React.FC = () => {
  const { 
    phase, 
    currentGame, 
    activeBanner, 
    activePicker, 
    bansRequiredCurrentTurn, 
    bansRemainingCurrentTurn,
    settings,
    setWinner,
    t
  } = useStageBan();

  if (phase === 'RPS') {
    return (
      <div className="phase-banner">
        <div className="phase-header">
          <div className="phase-title">
            <Swords size={20} color="#f59e0b" />
            <span>{t.game1Title}</span>
          </div>
          <span className="turn-pill pick">{t.rpsPhasePill}</span>
        </div>
        <div className="phase-subtitle">
          {t.rpsPhaseSubtitle}
        </div>
      </div>
    );
  }

  if (phase === 'SET_COMPLETE') {
    const winnerName = setWinner === 'P1' ? settings.p1Name : settings.p2Name;
    return (
      <div className="phase-banner pick-turn">
        <div className="phase-header">
          <div className="phase-title">
            <Trophy size={22} color="#f59e0b" />
            <span>{t.setCompleteTitle}</span>
          </div>
          <span className="turn-pill pick">{t.setCompletePill}</span>
        </div>
        <div className="phase-subtitle" style={{ color: '#f8fafc', fontWeight: 700 }}>
          {t.setCompleteSubtitle(winnerName)}
        </div>
      </div>
    );
  }

  if (phase === 'PLAYING') {
    return (
      <div className="phase-banner pick-turn">
        <div className="phase-header">
          <div className="phase-title">
            <PlayCircle size={20} color="#10b981" />
            <span>{t.playingTitle(currentGame)}</span>
          </div>
          <span className="turn-pill pick">{t.playingPill}</span>
        </div>
        <div className="phase-subtitle">
          {t.playingSubtitle}
        </div>
      </div>
    );
  }

  if (phase === 'STARTER_BAN' || phase === 'COUNTERPICK_BAN') {
    const isP1 = activeBanner === 'P1';
    const bannerName = isP1 ? settings.p1Name : settings.p2Name;
    const bannerClass = isP1 ? 'p1-turn' : 'p2-turn';
    const pillClass = isP1 ? 'p1' : 'p2';

    return (
      <div className={`phase-banner ${bannerClass}`}>
        <div className="phase-header">
          <div className="phase-title">
            <Ban size={20} color={isP1 ? '#ef4444' : '#3b82f6'} />
            <span>{t.turnToBanTitle(bannerName)}</span>
          </div>
          <span className={`turn-pill ${pillClass}`}>{t.turnToBanPill(activeBanner || 'P1')}</span>
        </div>
        <div className="phase-subtitle">
          {phase === 'STARTER_BAN' ? (
            bansRequiredCurrentTurn === 1 
              ? t.starterStep1BanSubtitle(bannerName)
              : t.starterStep2BanSubtitle(bannerName)
          ) : (
            t.genericBanSubtitle(bansRemainingCurrentTurn, bansRequiredCurrentTurn)
          )}
        </div>
      </div>
    );
  }

  if (phase === 'STARTER_PICK' || phase === 'COUNTERPICK_PICK') {
    const isP1 = activePicker === 'P1';
    const pickerName = isP1 ? settings.p1Name : settings.p2Name;
    const bannerClass = isP1 ? 'p1-turn' : 'p2-turn';
    const pillClass = isP1 ? 'p1' : 'p2';

    return (
      <div className={`phase-banner ${bannerClass}`}>
        <div className="phase-header">
          <div className="phase-title">
            <CheckCircle2 size={20} color="#f59e0b" />
            <span>{t.turnToPickTitle(pickerName)}</span>
          </div>
          <span className={`turn-pill ${pillClass}`}>{t.turnToPickPill(activePicker || 'P1')}</span>
        </div>
        <div className="phase-subtitle">
          {phase === 'STARTER_PICK'
            ? t.starterFinalPickSubtitle(pickerName)
            : t.genericPickSubtitle(currentGame)
          }
        </div>
      </div>
    );
  }

  return null;
};
