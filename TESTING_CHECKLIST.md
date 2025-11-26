# Testing Checklist for Project N

## Visualizer Functionality

### Algorithms
- [ ] Bubble Sort - Steps play correctly, metrics update
- [ ] Selection Sort - Steps play correctly, metrics update
- [ ] Insertion Sort - Steps play correctly, metrics update
- [ ] Linear Search - Finds target correctly, shows steps
- [ ] Binary Search - Finds target in sorted array, shows steps

### Data Structures
- [ ] Circular Queue - Enqueue/Dequeue work correctly
- [ ] Hash Table - Insert and search work with linear probing
- [ ] Linked List - All operations work (existing)
- [ ] Stack - All operations work (existing)
- [ ] Queue - All operations work (existing)
- [ ] Binary Tree - Traversals work (existing)
- [ ] AVL Tree - Balancing works (existing)
- [ ] Heap - Insert/delete work (existing)

### Graph Algorithms
- [ ] DFS - Traverses graph correctly, shows path
- [ ] BFS - Traverses graph correctly, shows path
- [ ] Dijkstra's - Finds shortest path (existing)

## Universal Controls

### Playback Controls
- [ ] Play button starts playback
- [ ] Pause button stops playback
- [ ] Previous step goes back one step
- [ ] Next step advances one step
- [ ] Reset returns to first step
- [ ] Step progress bar updates correctly
- [ ] Playback speed slider works (0.25x to 3x)

### Keyboard Shortcuts
- [ ] Space bar toggles play/pause
- [ ] Left arrow goes to previous step
- [ ] Right arrow goes to next step
- [ ] R key resets to beginning
- [ ] Shortcuts don't interfere with input fields

### State Inspector
- [ ] Variables display correctly
- [ ] Comparisons counter updates
- [ ] Swaps counter updates
- [ ] Total steps displays correctly
- [ ] Current step description shows
- [ ] Inspector collapses on mobile

## UI/UX

### Landing Page
- [ ] Liquid glass effect visible
- [ ] Pill buttons have rounded-full style
- [ ] Responsive on mobile
- [ ] All links work correctly
- [ ] Dark mode works

### Visualizer Pages
- [ ] All visualizers load without errors
- [ ] Layout is responsive
- [ ] Controls are accessible
- [ ] State inspector works on desktop
- [ ] State inspector collapses on mobile

## Testing

### Unit Tests
- [ ] Run `npm test` - all tests pass
- [ ] Bubble sort tests pass
- [ ] Binary search tests pass
- [ ] Smoke tests pass

### Manual Testing
- [ ] Test each visualizer manually
- [ ] Test keyboard shortcuts
- [ ] Test on different screen sizes
- [ ] Test in dark mode
- [ ] Test playback at different speeds

## Performance
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] Fast page loads

## Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

