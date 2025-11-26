import { bubbleSortGenerator } from "@/lib/algorithms/bubble-sort"

describe("Bubble Sort", () => {
  it("should sort an array correctly", () => {
    const array = [64, 34, 25, 12, 22, 11, 90]
    const generator = bubbleSortGenerator(array)
    const steps = Array.from(generator)
    
    const finalStep = steps[steps.length - 1]
    const sortedArray = finalStep.state.array
    
    expect(sortedArray).toEqual([11, 12, 22, 25, 34, 64, 90])
  })

  it("should handle empty array", () => {
    const array: number[] = []
    const generator = bubbleSortGenerator(array)
    const steps = Array.from(generator)
    
    expect(steps.length).toBeGreaterThan(0)
    const finalStep = steps[steps.length - 1]
    expect(finalStep.state.array).toEqual([])
  })

  it("should handle already sorted array", () => {
    const array = [1, 2, 3, 4, 5]
    const generator = bubbleSortGenerator(array)
    const steps = Array.from(generator)
    
    const finalStep = steps[steps.length - 1]
    expect(finalStep.state.array).toEqual([1, 2, 3, 4, 5])
  })

  it("should track comparisons and swaps", () => {
    const array = [3, 1, 2]
    const generator = bubbleSortGenerator(array)
    const steps = Array.from(generator)
    
    const finalStep = steps[steps.length - 1]
    expect(finalStep.metrics?.comparisons).toBeGreaterThan(0)
    expect(finalStep.metrics?.swaps).toBeGreaterThanOrEqual(0)
  })
})

