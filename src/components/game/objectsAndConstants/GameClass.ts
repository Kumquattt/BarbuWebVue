export class Game {
  id = 'todo'
  date = new Date()
  players: PlayerScore[] = []
  turns: TurnScores[] = []

  constructor() {
    //todo include id as param
    this.turns.push(new TurnScores(1))
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

  updateTurn(turn: number, gameTurn: string): void {
    // /!\ supprimer anciens scores si certains présents ?

    if (gameTurn != '') {
      if (turn > this.turns.length - 1) {
        this.addTurn(gameTurn)
      } else {
        this.turns[turn].updateGame(gameTurn)
      }
    }
  }

  addTurn(gameTurn: string): boolean {
    console.log('addTurn')
    let wasAdded = false

    const newTurn = new TurnScores(this.turns[this.turns.length - 1].turn + 1, gameTurn)
    this.players.forEach((player) => newTurn.addPlayer(player.player))
    console.log(newTurn)

    this.turns.push(newTurn)

    wasAdded = true // TODO : add check that add was done OK ?
    return wasAdded
  }

  getLastTurn() {
    return this.turns[this.turns.length - 1]
  }

  getCurrentDeciderPlayer() {
    return this.getLastTurn().deciderPlayer
  }

  getCurrentGame() {
    return this.getLastTurn().game
  }

  getNumberOfTurns() {
    return this.turns[this.turns.length - 1].turn
  }

  getPlayers() {
    console.log(this.players.map((p) => p.player))
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
  turn = 0 // Pour détecter facilement instanciations hors-constructeur
  deciderPlayer = ''
  game = '0'
  scores: PlayerScore[] = []

  constructor(turn: number, game: string = '?') {
    this.turn = turn
    this.game = game
  }

  isPresent(name: string): boolean {
    return this.scores.find((ps: PlayerScore) => ps.is(name)) != undefined
  }

  addPlayer(name: string) {
    this.scores.push(new PlayerScore(name))
  }

  updateGame(game: string) {
    //TODO: Add controls, scores must be coherents
    // or reset everything ?
    this.game = game
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

  is(name: string): boolean {
    return this.player == name
  }

  toString() {
    return 'Player: ' + this.player + ' (' + this.score + ' pts)'
  }
}
