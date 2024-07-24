#!/usr/bin/env node

class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  addVertex(v) {
    this.AdjList.set(JSON.stringify(v), []);
  }

  addEdge(v, w) {
    this.AdjList.get(JSON.stringify(v)).push(w);
  }
}

function createChessboardGraph() {
  const graph = new Graph(8 * 8);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const vertex = [i, j];
      graph.addVertex(vertex);

      const knightMoves = [
        [-2, 1],
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
      ];
      for (const [dx, dy] of knightMoves) {
        const newX = i + dx;
        const newY = j + dy;
        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
          const newVertex = [newX, newY];
          graph.addEdge(vertex, newVertex);
        }
      }
    }
  }

  return graph;
}

const chessboardGraph = createChessboardGraph();

function knightMoves(start, end) {
  const visited = new Set();
  let queue = [];
  const parents = new Map();

  visited.add(JSON.stringify(start));
  queue.push(start);
  parents.set(JSON.stringify(start), null);

  while (queue.length > 0) {
    const current = queue.shift();
    const currentKey = JSON.stringify(current);

    if (JSON.stringify(current) === JSON.stringify(end)) {
      const path = [];
      let moves = 0;
      let step = current;

      while (step) {
        path.unshift(step);
        moves++;
        step = parents.get(JSON.stringify(step));
      }
      console.log(`It took you ${moves - 1} moves! Shortest path is:`, path);
      return path;
    }

    const neighbors = chessboardGraph.AdjList.get(currentKey);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      const neighborKey = JSON.stringify(neighbor);

      if (!visited.has(neighborKey)) {
        visited.add(neighborKey);
        queue.push(neighbor);
        parents.set(neighborKey, current);
      }
    }
  }
  console.log("No path found.");
  return null;
}

knightMoves([0, 0], [7, 7]);
