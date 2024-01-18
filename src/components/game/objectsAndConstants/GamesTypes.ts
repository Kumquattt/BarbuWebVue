import { ref } from 'vue'

export class GameType {
  id = '' // TODO RENAME TO GameIDs
  label = ''
  pointsPerHit = 0 // should not be applied to Réussite ?
  possibleScores: number[] = []

  isNull = true

  constructor(id: string, label: string, pointsPerHit: number, possibleScores: number[]) {
    this.id = id
    this.label = label
    this.pointsPerHit = pointsPerHit
    this.possibleScores = possibleScores
    this.isNull = this.id == ''   // TODO is this the best way ?
  }

  getScore(numberOfHits: number): number {
    return numberOfHits * this.pointsPerHit
  }

  static from(id: string): GameType {
    const found: GameType | undefined = this.types.find(t => id == t.id)
    if(!found) { throw `ERROR - GameType.from(${id}, id not found.)`}
    return found
  }

  static empty: GameType = new GameType('', '', 0, [])

  static types = [
    new GameType('B', 'Barbu', -40, [0, 1]),
    new GameType('D', 'pas de Dame', -20, rangeArrayFrom(5)),
    new GameType('C', 'pas de Coeur', -5, rangeArrayFrom(14)), // TODO option to change points acc. to nb players ?
    new GameType('P', 'pas de Pli', -5 , rangeArrayFrom(14)), // TODO option to change points AND POSSIBLE NB acc. to nb players ?
    new GameType('R', 'Réussite', 100, [1, 1/2]),
    GameType.empty
  ]

  static choices = this.types.map(t => t.id)
}

function rangeArrayFrom(range: number): number[] {
  return Array.from({ length: range }, (value, index) => index)
}

const GamesTypes = ['B', 'D', 'C', 'P', 'R']

// TODO tooltip on click/hover to display label
const GameTypes = [
  new GameType('B', 'Barbu', -40, [0, 1]),
  new GameType('D', 'pas de Dame', -20, rangeArrayFrom(5)),
  new GameType('C', 'pas de Coeur', -5, rangeArrayFrom(14)), // TODO option to change points acc. to nb players ?
  new GameType('P', 'pas de Pli', -5 , rangeArrayFrom(14)), // TODO option to change points AND POSSIBLE NB acc. to nb players ?
  new GameType('R', 'Réussite', 100, [1, 1/2]),
  GameType.empty
]

export { GamesTypes, GameTypes }
