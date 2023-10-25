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
    if (this.currentPlayers().includes(name)) {
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
}

export class TurnScores {
  turn = 0 // Pour détecter facilement instanciations hors-constructeur
  player_turn = ''
  game = ''
  scores: PlayerScore[] = []

  constructor(turn: number) {
    this.turn = turn
  }

  isPresent(name: string): boolean {
    return this.scores.find((ps: PlayerScore) => ps.is(name)) != undefined
  }

  addPlayer(name: string) {
    this.scores.push(new PlayerScore(name))
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
}
