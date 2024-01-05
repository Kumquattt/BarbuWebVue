export class GameType {
  id = '' // TODO RENAME TO GameIDs
  label = ''
  pointsPerHit = 0 // should not be applied to Réussite ?
  possibleScores: number[] = []

  constructor(id: string, label: string, pointsPerHit: number, possibleScores: number[]) {
    this.id = id
    this.label = label
    this.pointsPerHit = pointsPerHit
    this.possibleScores = possibleScores
  }
}

function rangeArrayFrom(range: number): number[] {
  return Array.from({ length: range }, (value, index) => index)
}

const GamesTypes = ['B', 'D', 'C', 'P', 'R']

const GameTypes = [
  new GameType('B', 'Barbu', -40, [0, 1]),
  new GameType('D', 'pas de Dame', -40, rangeArrayFrom(5)),
  new GameType('C', 'pas de Coeur', -40, rangeArrayFrom(14)), // TODO option to change points acc. to nb players ?
  new GameType('P', 'pas de Pli', -40, rangeArrayFrom(14)), // TODO option to change points AND POSSIBLE NB acc. to nb players ?
  new GameType('R', 'Réussite', 100, [1, 1 / 2])
]

export { GamesTypes, GameTypes }
