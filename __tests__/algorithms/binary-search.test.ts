import { binarySearchGenerator } from "@/lib/algorithms/binary-search"

describe("Binary Search", () => {
  it("should find existing element", () => {
    const array = [1, 3, 5, 7, 9, 11, 13, 15]
    const generator = binarySearchGenerator(array, 7)
    const steps = Array.from(generator)
    
    const foundStep = steps.find(step => step.state.found === true)
    expect(foundStep).toBeDefined()
    expect(foundStep?.state.found).toBe(true)
  })

  it("should not find non-existing element", () => {
    const array = [1, 3, 5, 7, 9, 11, 13, 15]
    const generator = binarySearchGenerator(array, 10)
    const steps = Array.from(generator)
    
    const finalStep = steps[steps.length - 1]
    expect(finalStep.state.found).toBe(false)
  })

  it("should track comparisons", () => {
    const array = [1, 3, 5, 7, 9, 11, 13, 15]
    const generator = binarySearchGenerator(array, 7)
    const steps = Array.from(generator)
    
    const finalStep = steps[steps.length - 1]
    expect(finalStep.metrics?.comparisons).toBeGreaterThan(0)
  })
})

