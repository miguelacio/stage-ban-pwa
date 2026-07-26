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
    setWinner
  } = useStageBan();

  if (phase === 'RPS') {
    return (
      <div className="phase-banner">
        <div className="phase-header">
          <div className="phase-title">
            <Swords size={20} color="#f59e0b" />
            <span>Game 1: Starter Striking</span>
          </div>
          <span className="turn-pill pick">RPS Phase</span>
        </div>
        <div className="phase-subtitle">
          Play Rock-Paper-Scissors to determine who bans first.
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
            <span>SET COMPLETE!</span>
          </div>
          <span className="turn-pill pick">VICTORY</span>
        </div>
        <div className="phase-subtitle" style={{ color: '#f8fafc', fontWeight: 700 }}>
          {winnerName} wins the set!
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
            <span>Game {currentGame} In Progress</span>
          </div>
          <span className="turn-pill pick">PLAYING</span>
        </div>
        <div className="phase-subtitle">
          Play your game on the selected stage, then record who won below.
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
            <span>{bannerName}'s Turn to Ban</span>
          </div>
          <span className={`turn-pill ${pillClass}`}>{activeBanner} BAN</span>
        </div>
        <div className="phase-subtitle">
          Tap <strong>{bansRemainingCurrentTurn}</strong> more stage{bansRemainingCurrentTurn === 1 ? '' : 's'} to ban ({bansRequiredCurrentTurn} total this turn).
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
            <span>{pickerName}'s Turn to Pick</span>
          </div>
          <span className={`turn-pill ${pillClass}`}>{activePicker} PICK</span>
        </div>
        <div className="phase-subtitle">
          Select 1 stage from the remaining legal stages to play Game {currentGame}.
        </div>
      </div>
    );
  }

  return null;
};
