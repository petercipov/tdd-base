export interface Frame {
  rolls: number[],
  score: number
}

export class Game {

  private rolls: number[]
  constructor () {
    this.rolls = []
  }

  getFrames (): Frame [] {

    return this.rolls.reduce((frames: Frame[], pins: number, rollIndex: number) => {
      if (this.gameFinished(frames)) {
        return frames
      }

      const lastFrame = this.getLastFrame(frames)

      if (this.isFirstRoll(rollIndex)) {
        const frame = this.createFrame(pins, 0)
        frames.push(frame)
        frame.score += this.getStrikeBonus(pins, rollIndex)
      } else if (this.is10thFrame(frames)) {
        this.addPinsToFrame(lastFrame, pins)
      } else {
        if (this.spareWasRolled(lastFrame)) {
          lastFrame.score += pins
        }
        if (this.isStrike(pins)) {
          const frame = this.createFrame(pins, lastFrame.score)
          frames.push(frame)
          if (! this.is10thFrame(frames)) {
            const bonus = this.getStrikeBonus(pins, rollIndex)
            frame.score += bonus
          }
        } else {
          if (this.frameHas2rolls(lastFrame) || this.strikeWasRolled(lastFrame)) {
            frames.push(this.createFrame(pins, lastFrame.score))
          } else {
            this.addPinsToFrame(lastFrame, pins)
          }
        }
      }
      return frames
    }, [] as Frame[])
  }

  private getStrikeBonus (pins: number, rollIndex: number): number {
    return this.isStrike(pins)
      ? (this.rolls[rollIndex + 1] || 0) + (this.rolls[rollIndex + 2] || 0)
      : 0
  }

  private getLastFrame (frames: Frame[]): Frame {
    return frames[frames.length - 1]
  }

  private is10thFrame (frames: Frame[]): boolean {
    return frames.length === 10
  }

  private gameFinished (frames: Frame[]): boolean {
    const lastFrame = this.getLastFrame(frames)

    return this.is10thFrame(frames)
      ? this.spareWasRolled(lastFrame)
       ? lastFrame.rolls.length === 3
       : this.strikeWasRolled(lastFrame)
        ? lastFrame.rolls.length === 3
        : this.frameHas2rolls(lastFrame)
      : false
  }

  private createFrame (pins: number, lastScore: number): Frame {
    return {
      score: lastScore + pins,
      rolls: [pins]
    }
  }

  private addPinsToFrame (frame: Frame, pins: number) {
    frame.score += pins
    frame.rolls.push(pins)
  }

  private isStrike (pins: number): boolean {
    return pins === 10
  }

  private frameHas2rolls (frame: Frame): boolean {
    return frame.rolls.length === 2
  }

  private strikeWasRolled (frame: Frame): boolean {
    return this.pinsKnocked(frame, 1) === 10
  }

  private spareWasRolled (frame: Frame): boolean {
    return frame.rolls.length >= 2 && this.pinsKnocked(frame, 2) === 10
  }

  private pinsKnocked (frame: Frame, countUntil: number): number {
    let sum = 0
    for (let index = 0; index < countUntil; index++) {
      sum += (frame.rolls[index] || 0)
    }
    return sum
  }

  private isFirstRoll (index: number): boolean {
    return index === 0
  }

  roll (pins: number): any {
    this.rolls.push(pins)
  }
}
