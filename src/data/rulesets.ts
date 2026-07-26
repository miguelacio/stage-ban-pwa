import type { Ruleset } from '../types/smash';

export const DEFAULT_RULESETS: Ruleset[] = [
  {
    id: 'standard_2025',
    name: 'Standard Major 2025',
    description: '5 Starters (BF, SBF, FD, PS2, HB), 3 Counterpicks (T&C, SV, Kalos). 3 Bans in CP, Modified DSR.',
    starters: ['battlefield', 'small_battlefield', 'pokemon_stadium_2', 'town_and_city', 'smashville'],
    counterpicks: ['hollow_bastion','final_destination', 'kalos'],
    game1BansPattern: [1, 2], // P1 bans 1, P2 bans 2, P1 picks from remaining 2 (striking pattern 1-2-1)
    counterpickBans: 3,
    dsr: 'modified',
  },
  {
    id: 'genesis_style',
    name: 'Genesis / West Coast',
    description: '5 Starters (BF, SBF, FD, PS2, HB), 3 Counterpicks (T&C, SV, Yoshi\'s Story). 3 Bans, Modified DSR.',
    starters: ['battlefield', 'small_battlefield', 'final_destination', 'pokemon_stadium_2', 'hollow_bastion'],
    counterpicks: ['town_and_city', 'smashville', 'yoshis_story'],
    game1BansPattern: [1, 2],
    counterpickBans: 3,
    dsr: 'modified',
  },
  {
    id: 'european_standard',
    name: 'European Standard',
    description: '5 Starters (BF, SBF, FD, PS2, SV), 4 Counterpicks (HB, T&C, Kalos, LC). 3 Bans, Full DSR.',
    starters: ['battlefield', 'small_battlefield', 'final_destination', 'pokemon_stadium_2', 'smashville'],
    counterpicks: ['hollow_bastion', 'town_and_city', 'kalos', 'lylat_cruise'],
    game1BansPattern: [1, 2],
    counterpickBans: 3,
    dsr: 'full',
  },
  {
    id: 'custom',
    name: 'Custom Tournament Ruleset',
    description: 'Fully customizable stage list, ban counts, and DSR rule.',
    starters: ['battlefield', 'small_battlefield', 'final_destination', 'pokemon_stadium_2', 'hollow_bastion'],
    counterpicks: ['town_and_city', 'smashville', 'kalos', 'yoshis_story', 'lylat_cruise'],
    game1BansPattern: [1, 2],
    counterpickBans: 3,
    dsr: 'modified',
    isCustom: true,
  },
];
