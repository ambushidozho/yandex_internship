class Graph {
    constructor() {
      this.vertices = {};
    }
    addVertex(vertex) {
      if (!this.vertices[vertex]) {
        this.vertices[vertex] = [];
      }
    }
    addEdge(from, to) {
      if (this.vertices[from] && this.vertices[to]) {
        this.vertices[from].push(to);
      }
    }
    removeVertex(vertex) {
      delete this.vertices[vertex];
      for (let key in this.vertices) {
        let edges = this.vertices[key];
        let i = edges.indexOf(vertex);
        if (i !== -1) {
          edges.splice(i, 1);
        }
      }
    }
    removeEdge(from, to) {
      if (this.vertices[from]) {
        let i = this.vertices[from].indexOf(to);
        if (i !== -1) {
          this.vertices[from].splice(i, 1);
        }
      }
    }
    getNeighbours(vertex) {
      return this.vertices[vertex] || [];
    }

    findPath(from, to) {
        const visited = {};
        const path = [];
        const queue = [from];
        let found = false;
        while (queue.length > 0) {
          const currVer = queue.shift();
          visited[currVer] = true;
          if (currVer === to) {
            found = true;
            break;
          }
          const neighbours = this.getNeighbours(currVer);
          for (let i = 0; i < neighbours.length; i++) {
            const neighbours = neighbors[i];
            if (!visited[neighbours]) {
              queue.push(neighbours);
              visited[neighbours] = true;
              path[neighbours] = currVer;
            }
          }
        }
        if (found) {
          const pathNodes = [to];
          let current = to;
          while (current !== from) {
            const prevNode = path[current];
            pathNodes.unshift(prevNode);
            current = prevNode;
          }
          return pathNodes;
        } else {
          return [];
        }
      }
  }



function solution(N, M, s, t, trails) {
    paths = new Graph();
    for (let i = 1; i <= N; i++) {
        paths.addVertex(i);
    }
    for (let i = 0; i < M; i++) {
        let [a, b] = trails[i];
        paths.addEdge(a, b);
    }

    const firstpath = paths.findPath(s, t);

    for (let i = 0; i < firstpath.length - 1; i++) {
        paths.removeEdge(firstpath[i], firstpath[i + 1]);
    }
    
    const secondpath = paths.findPath(s, t);

    return [firstpath, secondpath];
}

const [N, M, s,t] = [5,6,1,5];
const trails = [
    [1,2],
    [2,3],
    [3,5],
    [1,2],
    [2,4],
    [4,5]   
];
console.log(solution(N, M, s, t, trails));
