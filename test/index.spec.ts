import { Game } from '../src'

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  test('Game starts with an empty frames', () => {
    const frames = game.getFrames()
    expect(frames).toEqual([])
  })

  describe('Rolling pins', () => {
    test('First roll will increase score in first frame', () => {
      game.roll(1)

      const frames = game.getFrames()
      expect(frames).toHaveLength(1)
      expect(frames[0].score).toEqual(1)
    })
    test('second roll is added to score', () => {
      game.roll(1)
      game.roll(1)

      const frames = game.getFrames()
      expect(frames).toHaveLength(1)
      expect(frames[0].score).toEqual(2)
    })
    test('third roll will start new frame', () => {
      game.roll(1)
      game.roll(1)
      game.roll(1)

      const frames = game.getFrames()
      expect(frames).toHaveLength(2)
      expect(frames[1].score).toEqual(3)
    })
  })

  describe('Rolling spare', () => {
    test('player rolls a spare when he knocks all 10 pins in two tries, bonus for that frame is number of pins knocked in next roll', () => {
      game.roll(6)
      game.roll(4)

      game.roll(5)

      const frames = game.getFrames()
      expect(frames).toHaveLength(2)
      expect(frames[0].score).toEqual(15)
      expect(frames[1].score).toEqual(20)
    })

    test('spare and strike can be combined', () => {
      game.roll(6)
      game.roll(4)
      game.roll(10)
      game.roll(1)
      game.roll(1)

      const frames = game.getFrames()
      expect(frames).toHaveLength(3)
      expect(frames[0].score).toEqual(6 + 4 + 10)
      expect(frames[1].score).toEqual(6 + 4 + 10 + 10 + 2)
      expect(frames[2].score).toEqual(6 + 4 + 10 + 10 + 2 + 2)
    })
  })

  describe('Rolling strike', () => {
    test('rolling strike in last turn will start new frame', () => {
      game.roll(3)
      game.roll(3)

      game.roll(10)

      game.roll(3)
      game.roll(3)

      const frames = game.getFrames()

      expect(frames).toHaveLength(3)
    })

    test('player rolls a strike when he knocks all 10 pins on the first try, bonus for that frame is number of pins knocked in next two rolls', () => {
      game.roll(3)
      game.roll(3)
      game.roll(10)
      game.roll(3)
      game.roll(4)

      const frames = game.getFrames()

      expect(frames).toHaveLength(3)
      expect(frames[0].score).toEqual(6)
      expect(frames[1].score).toEqual(6 + 10 + 7)
      expect(frames[2].score).toEqual(6 + 10 + 7 + 7)
    })

    test('strike abd spare can be combined', () => {
      game.roll(10)

      game.roll(6)
      game.roll(4)

      game.roll(1)
      game.roll(1)

      const frames = game.getFrames()
      expect(frames).toHaveLength(3)
      expect(frames[0].score).toEqual(10 + 6 + 4)
      expect(frames[1].score).toEqual(10 + 6 + 4 + 6 + 4 + 1)
      expect(frames[2].score).toEqual(10 + 6 + 4 + 6 + 4 + 1 + 1 + 1)
    })
  })

  describe('10th frame', () => {
    beforeEach(() => {
      for (let frameNumber = 1; frameNumber < 10; frameNumber++) {
        game.roll(3)
        game.roll(3)
      }
    })
    test('game has exactly 10 frames, extra rolls are omitted', () => {
      game.roll(3)
      game.roll(3)

      game.roll(3)

      const frames = game.getFrames()
      expect(frames).toHaveLength(10)
      expect(frames[9].score).toEqual(60)
    })
    test('if player rolls spare at 10th frame, he is allowed to roll one more time, no bonus added', () => {
      game.roll(4)
      game.roll(6)

      game.roll(1)

      const frames = game.getFrames()
      expect(frames).toHaveLength(10)
      expect(frames[9].rolls).toHaveLength(3)
      expect(frames[9].score).toEqual(54 + 6 + 4 + 1)
    })

    test('if player rolls strike at 10th frame, he is allowed to roll one more time, no bonus added', () => {
      game.roll(10)
      game.roll(6)
      game.roll(2)

      const frames = game.getFrames()

      expect(frames).toHaveLength(10)
      expect(frames[9].rolls).toHaveLength(3)
      expect(frames[9].score).toEqual(54 + 10 + 6 + 2)
    })
  })

  test('perfect game', () => {
    for (let frameNumber = 1; frameNumber < 10; frameNumber++) {
      game.roll(10)
    }
    game.roll(10)
    game.roll(10)
    game.roll(10)

    const frames = game.getFrames()

    expect(frames).toHaveLength(10)
    expect(frames[9].rolls).toHaveLength(3)
    expect(frames[9].score).toEqual(300)
  })
})
