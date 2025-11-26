/**
 * Smoke test to verify all visualizers can be loaded
 * This test ensures basic functionality without requiring a full browser environment
 */

describe("Smoke Tests", () => {
  it("should export all algorithm generators", () => {
    expect(() => require("@/lib/algorithms/bubble-sort")).not.toThrow()
    expect(() => require("@/lib/algorithms/selection-sort")).not.toThrow()
    expect(() => require("@/lib/algorithms/insertion-sort")).not.toThrow()
    expect(() => require("@/lib/algorithms/linear-search")).not.toThrow()
    expect(() => require("@/lib/algorithms/binary-search")).not.toThrow()
    expect(() => require("@/lib/algorithms/circular-queue")).not.toThrow()
    expect(() => require("@/lib/algorithms/hash-table")).not.toThrow()
    expect(() => require("@/lib/algorithms/dfs")).not.toThrow()
    expect(() => require("@/lib/algorithms/bfs")).not.toThrow()
  })

  it("should export universal visualizer controls", () => {
    expect(() => require("@/components/shared/universal-visualizer-controls")).not.toThrow()
  })

  it("should have valid algorithm generators", () => {
    const { bubbleSortGenerator } = require("@/lib/algorithms/bubble-sort")
    const array = [3, 1, 2]
    const generator = bubbleSortGenerator(array)
    
    expect(generator).toBeDefined()
    expect(typeof generator.next).toBe("function")
    
    const firstStep = generator.next()
    expect(firstStep.value).toBeDefined()
    expect(firstStep.value.state).toBeDefined()
  })
})

