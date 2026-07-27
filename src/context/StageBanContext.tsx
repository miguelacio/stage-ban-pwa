import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type {
  PlayerId,
  AppPhase,
  Ruleset,
  GameResult,
  MatchSettings,
  Stage
} from '../types/smash';
import { DEFAULT_RULESETS } from '../data/rulesets';
import { STAGES } from '../data/stages';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { translations, type Translations } from '../utils/i18n';

interface StageBanContextType {
  // Settings & Ruleset
  ruleset: Ruleset;
  setRuleset: (r: Ruleset) => void;
  settings: MatchSettings;
  updateSettings: (s: Partial<MatchSettings>) => void;
  t: Translations;
  toggleLanguage: () => void;
  
  // Game & Set State
  phase: AppPhase;
  currentGame: number;
  p1Score: number;
  p2Score: number;
  setWinner: PlayerId | null;

  // Turn state
  rpsWinner: PlayerId | null;
  firstBanner: PlayerId | null;
  activeBanner: PlayerId | null;
  activePicker: PlayerId | null;
  bansRequiredCurrentTurn: number;
  bansRemainingCurrentTurn: number;

  // Stage states
  bannedStageIds: string[];
  currentTurnBans: string[];
  pickedStageId: string | null;
  history: GameResult[];
  
  // Stages helper lists
  allActiveStages: Stage[];
  starterStages: Stage[];
  counterpickStages: Stage[];
  dsrBlockedStageIds: string[];

  // Character selection state
  p1Character: string;
  p2Character: string;
  activeCharPicker: PlayerId | null;
  charStep: 1 | 2;

  // Actions
  selectRpsWinner: (winner: PlayerId, chooseFirstBanner: PlayerId) => void;
  selectCharacter: (charName: string) => void;
  toggleBanStage: (stageId: string) => void;
  confirmBans: () => void;
  selectPickStage: (stageId: string) => void;
  confirmGameWinner: (winner: PlayerId) => void;
  undoLastAction: () => void;
  resetSet: () => void;
}

const StageBanContext = createContext<StageBanContextType | undefined>(undefined);

export const StageBanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Config state
  const [ruleset, setRulesetState] = useState<Ruleset>(DEFAULT_RULESETS[0]);
  const [settings, setSettings] = useState<MatchSettings>({
    p1Name: 'Player 1',
    p2Name: 'Player 2',
    p1Color: '#ef4444',
    p2Color: '#3b82f6',
    bestOf: 3,
    soundEnabled: true,
    language: 'en',
  });

  const t = useMemo(() => translations[settings.language || 'en'], [settings.language]);

  const toggleLanguage = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      language: prev.language === 'en' ? 'es' : 'en'
    }));
  }, []);

  // Match state
  const [phase, setPhase] = useState<AppPhase>('RPS');
  const [currentGame, setCurrentGame] = useState<number>(1);
  const [p1Score, setP1Score] = useState<number>(0);
  const [p2Score, setP2Score] = useState<number>(0);
  const [history, setHistory] = useState<GameResult[]>([]);

  // Striking & Character state
  const [rpsWinner, setRpsWinner] = useState<PlayerId | null>(null);
  const [firstBanner, setFirstBanner] = useState<PlayerId | null>(null);
  const [strikingStepIndex, setStrikingStepIndex] = useState<number>(0);
  
  const [p1Character, setP1Character] = useState<string>('');
  const [p2Character, setP2Character] = useState<string>('');
  const [activeCharPicker, setActiveCharPicker] = useState<PlayerId | null>(null);
  const [charStep, setCharStep] = useState<1 | 2>(1);

  const [bannedStageIds, setBannedStageIds] = useState<string[]>([]);
  const [currentTurnBans, setCurrentTurnBans] = useState<string[]>([]);
  const [p1BansThisGame, setP1BansThisGame] = useState<string[]>([]);
  const [p2BansThisGame, setP2BansThisGame] = useState<string[]>([]);
  const [pickedStageId, setPickedStageId] = useState<string | null>(null);

  // Undo history stack
  const [historySnapshotStack, setHistorySnapshotStack] = useState<any[]>([]);

  const saveSnapshot = useCallback(() => {
    setHistorySnapshotStack(prev => [
      ...prev,
      {
        phase,
        currentGame,
        p1Score,
        p2Score,
        history,
        rpsWinner,
        firstBanner,
        strikingStepIndex,
        bannedStageIds,
        currentTurnBans,
        p1BansThisGame,
        p2BansThisGame,
        pickedStageId,
        p1Character,
        p2Character,
        activeCharPicker,
        charStep,
      }
    ]);
  }, [
    phase, currentGame, p1Score, p2Score, history, rpsWinner, 
    firstBanner, strikingStepIndex, bannedStageIds, currentTurnBans, 
    p1BansThisGame, p2BansThisGame, pickedStageId, p1Character,
    p2Character, activeCharPicker, charStep
  ]);

  // Derived active stages based on ruleset
  const allActiveStages = useMemo(() => {
    const activeIds = new Set([...ruleset.starters, ...ruleset.counterpicks]);
    return STAGES.filter(s => activeIds.has(s.id));
  }, [ruleset]);

  const starterStages = useMemo(() => {
    return STAGES.filter(s => ruleset.starters.includes(s.id));
  }, [ruleset]);

  const counterpickStages = useMemo(() => {
    return STAGES.filter(s => ruleset.counterpicks.includes(s.id));
  }, [ruleset]);

  // Calculate DSR blocked stages for the current picker
  const dsrBlockedStageIds = useMemo(() => {
    if (currentGame === 1 || ruleset.dsr === 'none' || history.length === 0) {
      return [];
    }

    // Determine current picker (loser of previous game)
    const lastGame = history[history.length - 1];
    const picker = lastGame.winner === 'P1' ? 'P2' : 'P1';

    if (ruleset.dsr === 'full') {
      return history.filter(g => g.winner === picker).map(g => g.stageId);
    } else if (ruleset.dsr === 'modified') {
      const winsByPicker = history.filter(g => g.winner === picker);
      if (winsByPicker.length > 0) {
        return [winsByPicker[winsByPicker.length - 1].stageId];
      }
    }
    return [];
  }, [currentGame, ruleset, history]);

  // Active banner / picker determination
  const activeBanner = useMemo<PlayerId | null>(() => {
    if (phase === 'STARTER_BAN') {
      if (!firstBanner) return 'P1';
      const secondBanner: PlayerId = firstBanner === 'P1' ? 'P2' : 'P1';
      return strikingStepIndex % 2 === 0 ? firstBanner : secondBanner;
    }
    if (phase === 'COUNTERPICK_BAN') {
      if (history.length === 0) return 'P1';
      return history[history.length - 1].winner;
    }
    return null;
  }, [phase, firstBanner, strikingStepIndex, history]);

  const activePicker = useMemo<PlayerId | null>(() => {
    if (phase === 'STARTER_PICK') {
      if (!firstBanner) return 'P1';
      return firstBanner;
    }
    if (phase === 'COUNTERPICK_PICK') {
      if (history.length === 0) return 'P2';
      return history[history.length - 1].winner === 'P1' ? 'P2' : 'P1';
    }
    return null;
  }, [phase, firstBanner, history]);

  // Ban turn counts
  const bansRequiredCurrentTurn = useMemo(() => {
    if (phase === 'STARTER_BAN') {
      if (strikingStepIndex === 0) return 1;
      if (strikingStepIndex === 1) return 2;
      if (strikingStepIndex === 2) return 1;
      return 1;
    }
    if (phase === 'COUNTERPICK_BAN') {
      return ruleset.counterpickBans;
    }
    return 0;
  }, [phase, strikingStepIndex, ruleset]);

  const bansRemainingCurrentTurn = bansRequiredCurrentTurn - currentTurnBans.length;

  // Set Winner check
  const targetWins = Math.ceil(settings.bestOf / 2);
  const setWinner = useMemo<PlayerId | null>(() => {
    if (p1Score >= targetWins) return 'P1';
    if (p2Score >= targetWins) return 'P2';
    return null;
  }, [p1Score, p2Score, targetWins]);

  // Actions
  const updateSettings = useCallback((newSettings: Partial<MatchSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const setRuleset = useCallback((r: Ruleset) => {
    setRulesetState(r);
    setPhase('RPS');
    setCurrentGame(1);
    setP1Score(0);
    setP2Score(0);
    setHistory([]);
    setBannedStageIds([]);
    setCurrentTurnBans([]);
    setPickedStageId(null);
    setP1Character('');
    setP2Character('');
  }, []);

  const selectRpsWinner = useCallback((winner: PlayerId, chooseFirstBanner: PlayerId) => {
    saveSnapshot();
    setRpsWinner(winner);
    setFirstBanner(chooseFirstBanner);
    
    // Game 1 Character Selection: RPS Loser picks character first!
    const rpsLoser: PlayerId = winner === 'P1' ? 'P2' : 'P1';
    setActiveCharPicker(rpsLoser);
    setCharStep(1);
    setPhase('CHARACTER_SELECT');

    setStrikingStepIndex(0);
    setBannedStageIds([]);
    setCurrentTurnBans([]);
    sound.playTurnChange(settings.soundEnabled);
  }, [saveSnapshot, settings.soundEnabled]);

  const selectCharacter = useCallback((charName: string) => {
    if (!activeCharPicker) return;
    saveSnapshot();

    if (activeCharPicker === 'P1') {
      setP1Character(charName);
    } else {
      setP2Character(charName);
    }

    sound.playPick(settings.soundEnabled);

    if (currentGame === 1) {
      if (charStep === 1) {
        const rpsWinnerPlayer: PlayerId = rpsWinner || (activeCharPicker === 'P1' ? 'P2' : 'P1');
        setActiveCharPicker(rpsWinnerPlayer);
        setCharStep(2);
      } else {
        setActiveCharPicker(null);
        setPhase('STARTER_BAN');
        setStrikingStepIndex(0);
        sound.playTurnChange(settings.soundEnabled);
      }
    } else {
      // Game 2+: Step 1 = Game Winner decided character -> Step 2 = Game Loser decides character -> COUNTERPICK_BAN
      const lastGame = history[history.length - 1];
      const lastWinner = lastGame ? lastGame.winner : 'P1';
      const lastLoser: PlayerId = lastWinner === 'P1' ? 'P2' : 'P1';

      if (charStep === 1) {
        setActiveCharPicker(lastLoser);
        setCharStep(2);
      } else {
        setActiveCharPicker(null);
        setPhase('COUNTERPICK_BAN'); // Proceed to stage counterpicking after character selection!
        sound.playTurnChange(settings.soundEnabled);
      }
    }
  }, [activeCharPicker, charStep, currentGame, rpsWinner, history, saveSnapshot, settings.soundEnabled]);

  const toggleBanStage = useCallback((stageId: string) => {
    if (phase !== 'STARTER_BAN' && phase !== 'COUNTERPICK_BAN') return;

    if (currentTurnBans.includes(stageId)) {
      setCurrentTurnBans(prev => prev.filter(id => id !== stageId));
      setBannedStageIds(prev => prev.filter(id => id !== stageId));
      sound.playUndo(settings.soundEnabled);
    } else {
      if (currentTurnBans.length >= bansRequiredCurrentTurn) return;

      saveSnapshot();
      setCurrentTurnBans(prev => [...prev, stageId]);
      setBannedStageIds(prev => [...prev, stageId]);

      if (activeBanner === 'P1') {
        setP1BansThisGame(prev => [...prev, stageId]);
      } else {
        setP2BansThisGame(prev => [...prev, stageId]);
      }
      sound.playBan(settings.soundEnabled);
    }
  }, [phase, currentTurnBans, bansRequiredCurrentTurn, activeBanner, saveSnapshot, settings.soundEnabled]);

  const confirmBans = useCallback(() => {
    if (currentTurnBans.length < bansRequiredCurrentTurn) return;

    saveSnapshot();

    if (phase === 'STARTER_BAN') {
      if (strikingStepIndex === 0) {
        setStrikingStepIndex(1);
        setCurrentTurnBans([]);
        sound.playTurnChange(settings.soundEnabled);
      } else {
        setPhase('STARTER_PICK');
        setCurrentTurnBans([]);
        sound.playTurnChange(settings.soundEnabled);
      }
    } else if (phase === 'COUNTERPICK_BAN') {
      setPhase('COUNTERPICK_PICK');
      setCurrentTurnBans([]);
      sound.playTurnChange(settings.soundEnabled);
    }
  }, [currentTurnBans, bansRequiredCurrentTurn, phase, strikingStepIndex, starterStages, bannedStageIds, saveSnapshot, settings.soundEnabled]);

  const selectPickStage = useCallback((stageId: string) => {
    saveSnapshot();
    setPickedStageId(stageId);
    setPhase('PLAYING');
    sound.playPick(settings.soundEnabled);
  }, [saveSnapshot, settings.soundEnabled]);

  const confirmGameWinner = useCallback((winner: PlayerId) => {
    if (!pickedStageId) return;

    saveSnapshot();

    const stageObj = STAGES.find(s => s.id === pickedStageId);
    const newP1Score = winner === 'P1' ? p1Score + 1 : p1Score;
    const newP2Score = winner === 'P2' ? p2Score + 1 : p2Score;

    const gameRecord: GameResult = {
      gameNumber: currentGame,
      stageId: pickedStageId,
      stageName: stageObj ? stageObj.name : pickedStageId,
      winner,
      p1ScoreAfter: newP1Score,
      p2ScoreAfter: newP2Score,
      p1Bans: p1BansThisGame,
      p2Bans: p2BansThisGame,
      p1Character: p1Character || 'N/A',
      p2Character: p2Character || 'N/A',
    };

    const newHistory = [...history, gameRecord];
    setHistory(newHistory);
    setP1Score(newP1Score);
    setP2Score(newP2Score);

    const neededWins = Math.ceil(settings.bestOf / 2);
    if (newP1Score >= neededWins || newP2Score >= neededWins) {
      setPhase('SET_COMPLETE');
      sound.playVictory(settings.soundEnabled);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }
    } else {
      // Setup Game 2+ Character Selection BEFORE Stage Striking!
      setCurrentGame(prev => prev + 1);
      setActiveCharPicker(winner); // Winner of previous game declares character first!
      setCharStep(1);
      setPhase('CHARACTER_SELECT');

      setBannedStageIds([]);
      setCurrentTurnBans([]);
      setP1BansThisGame([]);
      setP2BansThisGame([]);
      setPickedStageId(null);
      sound.playTurnChange(settings.soundEnabled);
    }
  }, [pickedStageId, saveSnapshot, currentGame, p1Score, p2Score, p1BansThisGame, p2BansThisGame, p1Character, p2Character, history, settings, sound]);

  const undoLastAction = useCallback(() => {
    if (historySnapshotStack.length === 0) return;
    const lastState = historySnapshotStack[historySnapshotStack.length - 1];
    setHistorySnapshotStack(prev => prev.slice(0, -1));

    setPhase(lastState.phase);
    setCurrentGame(lastState.currentGame);
    setP1Score(lastState.p1Score);
    setP2Score(lastState.p2Score);
    setHistory(lastState.history);
    setRpsWinner(lastState.rpsWinner);
    setFirstBanner(lastState.firstBanner);
    setStrikingStepIndex(lastState.strikingStepIndex);
    setBannedStageIds(lastState.bannedStageIds);
    setCurrentTurnBans(lastState.currentTurnBans);
    setP1BansThisGame(lastState.p1BansThisGame);
    setP2BansThisGame(lastState.p2BansThisGame);
    setPickedStageId(lastState.pickedStageId);
    setP1Character(lastState.p1Character || '');
    setP2Character(lastState.p2Character || '');
    setActiveCharPicker(lastState.activeCharPicker || null);
    setCharStep(lastState.charStep || 1);

    sound.playUndo(settings.soundEnabled);
  }, [historySnapshotStack, settings.soundEnabled]);

  const resetSet = useCallback(() => {
    setHistorySnapshotStack([]);
    setPhase('RPS');
    setCurrentGame(1);
    setP1Score(0);
    setP2Score(0);
    setHistory([]);
    setRpsWinner(null);
    setFirstBanner(null);
    setStrikingStepIndex(0);
    setBannedStageIds([]);
    setCurrentTurnBans([]);
    setP1BansThisGame([]);
    setP2BansThisGame([]);
    setPickedStageId(null);
    setP1Character('');
    setP2Character('');
    setActiveCharPicker(null);
    setCharStep(1);
    sound.playUndo(settings.soundEnabled);
  }, [settings.soundEnabled]);

  return (
    <StageBanContext.Provider
      value={{
        ruleset,
        setRuleset,
        settings,
        updateSettings,
        t,
        toggleLanguage,
        phase,
        currentGame,
        p1Score,
        p2Score,
        setWinner,
        rpsWinner,
        firstBanner,
        activeBanner,
        activePicker,
        bansRequiredCurrentTurn,
        bansRemainingCurrentTurn,
        bannedStageIds,
        currentTurnBans,
        pickedStageId,
        history,
        allActiveStages,
        starterStages,
        counterpickStages,
        dsrBlockedStageIds,
        p1Character,
        p2Character,
        activeCharPicker,
        charStep,
        selectRpsWinner,
        selectCharacter,
        toggleBanStage,
        confirmBans,
        selectPickStage,
        confirmGameWinner,
        undoLastAction,
        resetSet,
      }}
    >
      {children}
    </StageBanContext.Provider>
  );
};

export const useStageBan = () => {
  const context = useContext(StageBanContext);
  if (!context) {
    throw new Error('useStageBan must be used within StageBanProvider');
  }
  return context;
};
