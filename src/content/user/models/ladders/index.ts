export type LadderEntries = Array<{ score: number }>
type Step = [number, number]
type Steps = Array<Step>
export class Ladder {
    constructor(public steps: Steps, public handicap: number = 1) {}

    //items to be filtered, reduced, et cetera.
    #entries: LadderEntries = []

    // threshold for corresponding reward.
    get tiers() {
            const { steps } = this
        return steps.map(step => step[0])
        }

    // reward.
    get values() {
            const { steps } = this
        return steps.map(step => step[1])
        }

    get entries() {
            return this.#entries
        }
    set entries(entries: LadderEntries) {
            this.#entries = entries
        }

    // filters entries with scores over a specified amount.
    public populateTier = (tier: number): LadderEntries => {
            const { entries } = this
            console.log(entries.filter(entry => entry.score >= tier))        
            return entries.filter(entry => entry.score >= tier)
        }

    //returns each populated tier.
    public populateTiers = (): Array < LadderEntries > => {
            const { tiers, populateTier } = this
        return tiers.map(tier => populateTier(tier))
        }

    // populates a tier, then reduces it numerically.
    public reduceTier = (step: Step) => {
        const [tier, value] = step
        console.log(`Sum of tier ${tier}: ${this.populateTier(tier).length * value * this.handicap}`)
        return this.populateTier(tier).length * value * this.handicap
        }

    // reduces each tier, then sums them.
    public reduceTiers = (): number => {
            const { tiers, reduceTier, steps } = this
        return tiers.map((_, index) => reduceTier(steps[index])).reduce((i, j) => i + j)
        }
}

    const baseSheetSteps: Steps = [
        [50, 10],
        [60, 20],
        [70, 40],
        [80, 80],
        [90, 160],
        [100, 320]
    ]

    export const picksLadder = new Ladder([
        [10, 10],
        [20, 30],
        [30, 100],
        [40, 300]
    ])

    export const originalsLadder = new Ladder(baseSheetSteps)
    export const coverLadder = new Ladder(baseSheetSteps, .9)
    export const remixALadder = new Ladder(baseSheetSteps, .85)
    export const remixBLadder = new Ladder(baseSheetSteps, .95)
    export const recycledLadder = new Ladder(baseSheetSteps, .85)
    export const remakeALadder = new Ladder(baseSheetSteps, .9)
    export const remakeBLadder = new Ladder(baseSheetSteps, .5)