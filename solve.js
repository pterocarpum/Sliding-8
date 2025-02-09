function isSolvable(tiles) {
    let inversions = 0;

    for (let i = 0; i < tiles.length - 1; i++) {
        if (!tiles[i]) continue; 
        for (let j = i + 1; j < tiles.length; j++) {
            if (!tiles[j]) continue; 
            if (tiles[i] > tiles[j]) inversions++;
        }
    }

    return inversions % 2 === 0;
}

function calculateHeuristic(tiles, goalMap) {
    let heuristic = 0;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] === null) continue;
        let goalIndex = goalMap[tiles[i]];
        heuristic += Math.abs(Math.floor(goalIndex / 3) - Math.floor(i / 3)); // Y-displacement
        heuristic += Math.abs(goalIndex % 3 - i % 3); // X-displacement
    }
    return heuristic;
}

function solve(tiles, goal) {
    if (!isSolvable(goal)) return [];

    const goalMap = {};
    goal.forEach((tile, index) => {
        if (tile !== null) goalMap[tile] = index;
    });

    const visited = new Set(); // Stores strings since JS can't compare arrays
    const heap = [];

    MinHeap.push(heap, [calculateHeuristic(tiles, goalMap), tiles.slice(), []]);
    visited.add(tiles.join(','));

    while (heap.length) {
        const [heuristic, currentTiles, path] = MinHeap.pop(heap);
        if (currentTiles.join(',') === goal.join(',')) return path; // Solved

        const emptyIndex = currentTiles.indexOf(null);
        const neighbors = [
            emptyIndex - 1,
            emptyIndex + 1,
            emptyIndex - 3,
            emptyIndex + 3,
        ];

        for (const neighbor of neighbors) {
            if (neighbor < 0 || neighbor >= currentTiles.length) continue;
            if (Math.abs(Math.floor(emptyIndex / 3) - Math.floor(neighbor / 3)) +
                Math.abs((emptyIndex % 3) - (neighbor % 3)) !== 1) continue;

            const newTiles = currentTiles.slice();
            [newTiles[emptyIndex], newTiles[neighbor]] = [newTiles[neighbor], newTiles[emptyIndex]];

            const newState = newTiles.join(',');
            if (visited.has(newState)) continue;

            visited.add(newState); // Prevents duplicate visits
            MinHeap.push(heap, [calculateHeuristic(newTiles, goalMap)+path.length+1, newTiles, [...path, neighbor]]);
        }
    }

    return [];
}