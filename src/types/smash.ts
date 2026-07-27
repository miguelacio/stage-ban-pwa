export type PlayerId = 'P1' | 'P2';

export type StageCategory = 'starter' | 'counterpick';

export type PlatformLayout = 
  | 'tri-plat' 
  | 'dual-plat' 
  | 'flat' 
  | 'single-plat' 
  | 'moving-plat' 
  | 'sloped';

export type BlastzoneSize = 'small' | 'medium' | 'large';

export interface Stage {
  id: string;
  name: string;
  shortName: string;
  category: StageCategory;
  layout: PlatformLayout;
  blastzone: BlastzoneSize;
  description: string;
  image: string;
  accentColor: string;
}

export type DsrType = 'modified' | 'full' | 'none';

export interface Ruleset {
  id: string;
  name: string;
  description: string;
  starters: string[]; // stage IDs
  counterpicks: string[]; // stage IDs
  game1BansPattern: number[]; // e.g. [1, 2] -> P1 bans 1, P2 bans 2, remaining picked
  counterpickBans: number; // e.g. 3 bans for Game 2+
  dsr: DsrType; // Dave's Stupid Rule mode
  isCustom?: boolean;
}

export type AppPhase = 
  | 'RPS'
  | 'STARTER_BAN'
  | 'STARTER_PICK'
  | 'PLAYING'
  | 'COUNTERPICK_BAN'
  | 'COUNTERPICK_PICK'
  | 'SET_COMPLETE';

export interface GameResult {
  gameNumber: number;
  stageId: string;
  stageName: string;
  winner: PlayerId;
  p1ScoreAfter: number;
  p2ScoreAfter: number;
  p1Bans: string[];
  p2Bans: string[];
}

import type { Language } from '../utils/i18n';

export interface MatchSettings {
  p1Name: string;
  p2Name: string;
  p1Color: string;
  p2Color: string;
  bestOf: 3 | 5;
  soundEnabled: boolean;
  language: Language;
}
