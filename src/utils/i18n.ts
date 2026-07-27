export type Language = 'en' | 'es';

export interface Translations {
  // Header
  appTitle: string;
  appSubtitle: string;
  rulesetBtn: string;
  historyBtn: string;
  resetBtn: string;
  confirmResetTitle: string;
  confirmResetMsg: string;

  // Phase Banner
  game1Title: string;
  rpsPhasePill: string;
  rpsPhaseSubtitle: string;
  setCompleteTitle: string;
  setCompletePill: string;
  setCompleteSubtitle: (winner: string) => string;
  playingTitle: (game: number) => string;
  playingPill: string;
  playingSubtitle: string;
  turnToBanTitle: (name: string) => string;
  turnToBanPill: (player: string) => string;
  starterStep1BanSubtitle: (name: string) => string;
  starterStep2BanSubtitle: (name: string) => string;
  genericBanSubtitle: (remaining: number, required: number) => string;
  turnToPickTitle: (name: string) => string;
  turnToPickPill: (player: string) => string;
  starterFinalPickSubtitle: (name: string) => string;
  genericPickSubtitle: (game: number) => string;

  // Stage Grid & Cards
  starterStagesTitle: string;
  legalStagesTitle: string;
  stagesAvailable: (count: number) => string;
  badgeBanned: string;
  badgePicked: string;
  badgeDsrBlocked: string;

  // Bottom Dock
  undoBtn: string;
  confirmBanSingle: string;
  confirmBanPlural: (count: number) => string;
  selectMoreStages: (count: number) => string;
  tapToSelectHint: string;

  // RPS Modal
  rpsModalTitle: string;
  rpsModalSubtitle: string;
  whoWonRps: string;
  whoBansFirst: string;
  firstBannerHint: (name: string) => string;
  startStrikingBtn: string;

  // Winner Modal
  winnerModalTitle: (game: number) => string;
  winnerModalSubtitle: (stageName: string) => string;
  confirmWinnerBtn: string;

  // Ruleset Modal
  settingsTitle: string;
  matchSettingsSection: string;
  player1Label: string;
  player2Label: string;
  bestOfLabel: string;
  bestOf3: string;
  bestOf5: string;
  soundLabel: string;
  soundOn: string;
  soundOff: string;
  languageLabel: string;
  english: string;
  spanish: string;
  rulesetSection: string;
  startersLabel: string;
  counterpicksLabel: string;
  dsrRuleLabel: string;
  dsrModified: string;
  dsrFull: string;
  dsrNone: string;
  cpBansLabel: (count: number) => string;
  saveSettingsBtn: string;
  closeBtn: string;

  // History Modal
  historyModalTitle: string;
  noGamesPlayed: string;
  gameLabel: (game: number) => string;
  winnerLabel: string;
  bansLabel: string;
  noBans: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    appTitle: 'Smash Ban PWA',
    appSubtitle: 'SSBU Stage Striking & Counterpicking',
    rulesetBtn: 'Ruleset',
    historyBtn: 'History',
    resetBtn: 'Reset Set',
    confirmResetTitle: 'Reset Entire Set?',
    confirmResetMsg: 'This will reset all scores, game history, and stage selections. Are you sure?',

    // Phase Banner
    game1Title: 'Game 1: Starter Striking',
    rpsPhasePill: 'RPS Phase',
    rpsPhaseSubtitle: 'Play Rock-Paper-Scissors to determine who bans first.',
    setCompleteTitle: 'SET COMPLETE!',
    setCompletePill: 'VICTORY',
    setCompleteSubtitle: (winner) => `${winner} wins the set!`,
    playingTitle: (game) => `Game ${game} In Progress`,
    playingPill: 'PLAYING',
    playingSubtitle: 'Play your game on the selected stage, then record who won below.',
    turnToBanTitle: (name) => `${name}'s Turn to Ban`,
    turnToBanPill: (player) => `${player} BAN`,
    starterStep1BanSubtitle: (name) => `Step 1 (First Ban): ${name} bans 1 starter stage.`,
    starterStep2BanSubtitle: (name) => `Step 2 (Second Bans): ${name} bans 2 starter stages.`,
    genericBanSubtitle: (remaining, required) => `Tap ${remaining} more stage${remaining === 1 ? '' : 's'} to ban (${required} total).`,
    turnToPickTitle: (name) => `${name}'s Turn to Pick`,
    turnToPickPill: (player) => `${player} PICK`,
    starterFinalPickSubtitle: (name) => `Final Choice: ${name} picks the final starting stage from the 2 remaining options.`,
    genericPickSubtitle: (game) => `Select 1 stage from the remaining legal stages to play Game ${game}.`,

    // Stage Grid & Cards
    starterStagesTitle: 'Starter Stages',
    legalStagesTitle: 'Legal Stages',
    stagesAvailable: (count) => `${count} Stages Available`,
    badgeBanned: 'BANNED',
    badgePicked: 'PICKED',
    badgeDsrBlocked: 'DSR BLOCKED',

    // Bottom Dock
    undoBtn: 'Undo',
    confirmBanSingle: 'Confirm 1 Ban',
    confirmBanPlural: (count) => `Confirm ${count} Bans`,
    selectMoreStages: (count) => `Select ${count} More Stage${count === 1 ? '' : 's'}`,
    tapToSelectHint: 'Tap any remaining stage card to select',

    // RPS Modal
    rpsModalTitle: 'Rock-Paper-Scissors',
    rpsModalSubtitle: 'Determine who won RPS and who will ban first.',
    whoWonRps: '1. Who won Rock-Paper-Scissors?',
    whoBansFirst: '2. Who will ban the first stage?',
    firstBannerHint: (name) => `${name} will ban 1 stage first in the 1-2-1 sequence.`,
    startStrikingBtn: 'Start Stage Striking',

    // Winner Modal
    winnerModalTitle: (game) => `Game ${game} Winner`,
    winnerModalSubtitle: (stageName) => `Who won Game on ${stageName}?`,
    confirmWinnerBtn: 'Confirm Winner',

    // Ruleset Modal
    settingsTitle: 'Tournament Ruleset & Settings',
    matchSettingsSection: 'Match Settings',
    player1Label: 'Player 1 Name',
    player2Label: 'Player 2 Name',
    bestOfLabel: 'Best Of',
    bestOf3: 'Best of 3',
    bestOf5: 'Best of 5',
    soundLabel: 'Sound Effects',
    soundOn: 'Sound Enabled',
    soundOff: 'Muted',
    languageLabel: 'Language / Idioma',
    english: 'English 🇺🇸',
    spanish: 'Español 🇪🇸',
    rulesetSection: 'Ruleset Preset',
    startersLabel: 'Starter Stages',
    counterpicksLabel: 'Counterpick Stages',
    dsrRuleLabel: "Dave's Stupid Rule (DSR)",
    dsrModified: 'Modified DSR (Cannot pick last won stage)',
    dsrFull: 'Full DSR (Cannot pick any stage won on in set)',
    dsrNone: 'No DSR (Can pick any un-banned stage)',
    cpBansLabel: (count) => `Game 2+ Counterpick Bans: ${count}`,
    saveSettingsBtn: 'Save Settings',
    closeBtn: 'Close',

    // History Modal
    historyModalTitle: 'Set History & Game Log',
    noGamesPlayed: 'No games recorded yet.',
    gameLabel: (game) => `Game ${game}`,
    winnerLabel: 'Winner',
    bansLabel: 'Bans',
    noBans: 'None',
  },
  es: {
    // Header
    appTitle: 'Smash Ban PWA',
    appSubtitle: 'Selección y Baneos de Escenarios SSBU',
    rulesetBtn: 'Reglamento',
    historyBtn: 'Historial',
    resetBtn: 'Reiniciar Set',
    confirmResetTitle: '¿Reiniciar el Set Completo?',
    confirmResetMsg: 'Esto reiniciará todos los marcadores, el historial de partidas y las selecciones de escenarios. ¿Estás seguro?',

    // Phase Banner
    game1Title: 'Juego 1: Selección de Escenarios Iniciales',
    rpsPhasePill: 'Fase PPT',
    rpsPhaseSubtitle: 'Juega Piedra, Papel o Tijera para determinar quién banea primero.',
    setCompleteTitle: '¡SET COMPLETADO!',
    setCompletePill: 'VICTORIA',
    setCompleteSubtitle: (winner) => `¡${winner} gana el set!`,
    playingTitle: (game) => `Juego ${game} En Progreso`,
    playingPill: 'JUGANDO',
    playingSubtitle: 'Juega tu partida en el escenario seleccionado y luego registra al ganador abajo.',
    turnToBanTitle: (name) => `Turno de Banear de ${name}`,
    turnToBanPill: (player) => `${player} BAN`,
    starterStep1BanSubtitle: (name) => `Paso 1 (Primer Ban): ${name} banea 1 escenario inicial.`,
    starterStep2BanSubtitle: (name) => `Paso 2 (Segundos Bans): ${name} banea 2 escenarios iniciales.`,
    genericBanSubtitle: (remaining, required) => `Toca ${remaining} escenario${remaining === 1 ? '' : 's'} más para banear (${required} en total).`,
    turnToPickTitle: (name) => `Turno de Elegir de ${name}`,
    turnToPickPill: (player) => `${player} ELECCIÓN`,
    starterFinalPickSubtitle: (name) => `Elección Final: ${name} elige el escenario inicial de las 2 opciones restantes.`,
    genericPickSubtitle: (game) => `Selecciona 1 escenario de los legales restantes para jugar el Juego ${game}.`,

    // Stage Grid & Cards
    starterStagesTitle: 'Escenarios Iniciales',
    legalStagesTitle: 'Escenarios Legales',
    stagesAvailable: (count) => `${count} Escenarios Disponibles`,
    badgeBanned: 'BANEADO',
    badgePicked: 'ELEGIDO',
    badgeDsrBlocked: 'BLOQUEADO DSR',

    // Bottom Dock
    undoBtn: 'Deshacer',
    confirmBanSingle: 'Confirmar 1 Ban',
    confirmBanPlural: (count) => `Confirmar ${count} Bans`,
    selectMoreStages: (count) => `Selecciona ${count} Escenario${count === 1 ? '' : 's'} Más`,
    tapToSelectHint: 'Toca cualquier escenario restante para elegir',

    // RPS Modal
    rpsModalTitle: 'Piedra-Papel-Tijera',
    rpsModalSubtitle: 'Determina quién ganó PPT y quién baneará primero.',
    whoWonRps: '1. ¿Quién ganó Piedra, Papel o Tijera?',
    whoBansFirst: '2. ¿Quién baneará el primer escenario?',
    firstBannerHint: (name) => `${name} baneará 1 escenario primero en la secuencia 1-2-1.`,
    startStrikingBtn: 'Iniciar Selección de Escenarios',

    // Winner Modal
    winnerModalTitle: (game) => `Ganador del Juego ${game}`,
    winnerModalSubtitle: (stageName) => `¿Quién ganó el Juego en ${stageName}?`,
    confirmWinnerBtn: 'Confirmar Ganador',

    // Ruleset Modal
    settingsTitle: 'Reglamento de Torneo y Configuración',
    matchSettingsSection: 'Configuración de la Partida',
    player1Label: 'Nombre Jugador 1',
    player2Label: 'Nombre Jugador 2',
    bestOfLabel: 'Formato (Mejor de)',
    bestOf3: 'Mejor de 3 (BO3)',
    bestOf5: 'Mejor de 5 (BO5)',
    soundLabel: 'Efectos de Sonido',
    soundOn: 'Sonido Activado',
    soundOff: 'Silenciado',
    languageLabel: 'Idioma / Language',
    english: 'English 🇺🇸',
    spanish: 'Español 🇪🇸',
    rulesetSection: 'Preajuste de Reglamento',
    startersLabel: 'Escenarios Iniciales',
    counterpicksLabel: 'Escenarios Contraselección',
    dsrRuleLabel: "Regla de DSR (Dave's Stupid Rule)",
    dsrModified: 'DSR Modificado (No puede elegir el último escenario donde ganó)',
    dsrFull: 'DSR Completo (No puede elegir ningún escenario donde haya ganado en el set)',
    dsrNone: 'Sin DSR (Puede elegir cualquier escenario no baneado)',
    cpBansLabel: (count) => `Bans en Contraselección (Juego 2+): ${count}`,
    saveSettingsBtn: 'Guardar Configuración',
    closeBtn: 'Cerrar',

    // History Modal
    historyModalTitle: 'Historial del Set y Partidas',
    noGamesPlayed: 'Aún no se han registrado partidas.',
    gameLabel: (game) => `Juego ${game}`,
    winnerLabel: 'Ganador',
    bansLabel: 'Bans',
    noBans: 'Ninguno',
  },
};
