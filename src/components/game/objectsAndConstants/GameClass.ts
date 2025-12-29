import { GameType } from './GamesTypes'

export class Game {
  id = 'todo'
  date = new Date()
  players: PlayerScore[] = []
  turns: TurnScores[] = []

  constructor() {
    //todo include id as param
    this.turns.push(TurnScores.empty())
  }

  static from(storedGame: Game): Game {
    const newGame = new Game();
    
    newGame.id = storedGame.id,
    newGame.date = storedGame.date
    newGame.players = storedGame.players.map(p => PlayerScore.from(p))
    newGame.turns = storedGame.turns.map(t => TurnScores.from(t))

    return newGame;
  }

  addPlayer(name: string): boolean {
    let wasAdded: boolean = true
    if (name.length == 0 || this.currentPlayers().includes(name)) {
      wasAdded = false
    } else {
      this.players.push(new PlayerScore(name))
      this.turns.forEach((t: TurnScores) => t.addPlayer(name))
    }
    return wasAdded
  }

  currentPlayers(): string[] {
    return this.players.map((ps: PlayerScore) => ps.player)
  }
  //currentPlayers2 = () => this.players.map((ps: PlayerScore) => ps.player)

  playerIndex(name: string): number {
    return this.players.findIndex((ps: PlayerScore) => ps.is(name))
  }

  updateTurn(turn: number, gameType: GameType): void {
    //console.log(`Game.updateTurn: before update`)
    //console.log(turn)
    //console.log(gameType)
    //console.log(this.turns)

    this.turns[turn].updateGame(gameType)
    // /!\ supprimer anciens scores si certains présents ?

    //console.log('Game.updateTurn: after update')
    //console.log(this.turns)

    if (turn == this.turns.length - 1) {
      this.addTurn('')
    }
  }

  addTurn(turnGame: string): boolean {
    //console.log(`addTurn: turnGame = ${turnGame}`)
    let wasAdded = false

    const newTurn = new TurnScores(this.turns[this.turns.length - 1].turn + 1, GameType.empty)
    this.players.forEach((player) => newTurn.addPlayer(player.player))
    //console.log(newTurn)

    this.turns.push(newTurn)

    wasAdded = true // TODO : add check that add was done OK ?
    return wasAdded
  }

  getLastTurn(): TurnScores {
    // console.group('TurnScores getLastTurn')
    // console.log(this.turns[this.turns.length - 1])
    // console.groupEnd()
    return this.turns[this.turns.length - 1]
  }

  getLastPlayingTurn(): TurnScores {
    const nbOfTurns: number = this.getNumberOfTurns()
    let lastTurn: TurnScores = this.turns[this.turns.length - 1]

    if (nbOfTurns > 1) {
      lastTurn = this.turns[this.turns.length - 2]
    }

    // console.group('TurnScores getLastPlayingTurn')
    // console.log(lastTurn)
    // console.groupEnd()

    return lastTurn
  }

  updatePlayerTotalScore(player: string) {
    const totalScore: number = this.turns
      .map((turn) => turn.getPlayerScore(player))
      .reduce((tot, current) => tot + current)

    this.players.find((p) => p.player == player)?.setScore(totalScore)

    // const score: number = game.value.turns.map((turn) =>
    //   turn.scores.filter((score) => (score.player = playerScore.player))
    // )
    //:.map((pScore) => pScore.score)
    //.reduce((total, current) => {return total + current}, 0)
    // console.log(turn + ' ' + playerScore + ' ' + score)
  }

  //TODO
  getRemainingGames(player: string) {}

  getCurrentDeciderPlayer() {
    return this.getLastPlayingTurn().deciderPlayer
  }

  getCurrentGame() {
    return this.getLastPlayingTurn().game
  }

  getNumberOfTurns() {
    return this.turns.length
  }

  getPlayers() {
    // console.log(this.players.map((p) => p.player))
    return this.players.map((p) => p.player)
  }

  toStringSimple() {
    const playersNames: string[] = []
    this.players.forEach((p) => playersNames.push(p.player))

    return (
      'Game ' + this.date + ' - Players: [' + playersNames + '] - Turns: ' + this.getNumberOfTurns()
    )
  }
}

export class TurnScores {
  turn = 0 // Pour détecter instanciations hors-constructeur
  deciderPlayer = ''
  game: GameType
  scores: PlayerScore[] = []

  constructor(turn: number, game: GameType) {
    this.turn = turn
    this.game = game
  }

  static from(newTurn: TurnScores): TurnScores {
    const t = new TurnScores(newTurn.turn, newTurn.game)
    t.deciderPlayer = newTurn.deciderPlayer;
    t.scores = newTurn.scores;
    return t;
  }

  static empty(): TurnScores {
    return new TurnScores(0, GameType.empty)
  }

  isPresent(name: string): boolean {
    return this.scores.find((ps: PlayerScore) => ps.is(name)) != undefined
  }

  addPlayer(name: string) {
    this.scores.push(new PlayerScore(name))
  }

  updateGame(game: GameType) {
    //TODO: Add controls, scores must be coherents
    // or reset everything ?
    console.log(`TurnScores.updateGame: ${this.turn} ${game.id} (GameType object id)`)
    this.game = game
  }

  getPlayerScore(player: string): number {
    const foundPlayer = this.scores.find((s) => s.player == player)
    if (foundPlayer) {
      return this.game.getScore(foundPlayer.score)
    } else {
      throw new Error(`getPlayerScore: player '${player} not found'`)
    }
  }

  toString() {
    return 'Turn ' + this.turn + ' - Game: ' + this.game + ' - Player: ' + this.deciderPlayer
  }
}

export class PlayerScore {
  player = ''
  score = 0

  constructor(name: string) {
    this.player = name
  }

  static from(storedPlayer: PlayerScore){
    const p = new PlayerScore(storedPlayer.player);
    p.score = storedPlayer.score;
    return p;
  }

  is(name: string): boolean {
    return this.player == name
  }

  setScore(score: number) {
    this.score = score
  }

  toString() {
    return 'Player: ' + this.player + ' (' + this.score + ' pts)'
  }
}
