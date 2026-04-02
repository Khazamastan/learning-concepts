// Graph algorithms employing DFS, BFS, Dijkstra, and MST patterns.

/**
 * Problem: Clone Graph
 * Deep copy of undirected graph given node references.
 * Solution: DFS with hash map from original to clone.
 */
export function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();
  const dfs = (current) => {
    if (map.has(current)) return map.get(current);
    const clone = { val: current.val, neighbors: [] };
    map.set(current, clone);
    for (const neighbor of current.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    return clone;
  };
  return dfs(node);
}

/**
 * Problem: Find if Path Exists in Graph
 * Determine if path exists between source and destination in undirected graph.
 * Solution: BFS/DFS traversal from source (O(n + e)).
 */
export function validPath(n, edges, source, destination) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  const visited = new Array(n).fill(false);
  const queue = [source];
  visited[source] = true;
  for (let head = 0; head < queue.length; head += 1) {
    const node = queue[head];
    if (node === destination) return true;
    for (const nei of adj[node]) {
      if (!visited[nei]) {
        visited[nei] = true;
        queue.push(nei);
      }
    }
  }
  return false;
}

/**
 * Problem: All Paths From Source to Target
 * Return all paths from node 0 to node n-1 in DAG.
 * Solution: DFS collecting path backtracking (O(paths length)).
 */
export function allPathsSourceTarget(graph) {
  const target = graph.length - 1;
  const result = [];
  const path = [0];
  const dfs = (node) => {
    if (node === target) {
      result.push([...path]);
      return;
    }
    for (const nei of graph[node]) {
      path.push(nei);
      dfs(nei);
      path.pop();
    }
  };
  dfs(0);
  return result;
}

/**
 * Problem: Reconstruct Itinerary
 * Given airline tickets, find lexicographically smallest itinerary starting from JFK.
 * Solution: Hierholzer algorithm for Eulerian path using min-heaps (O(n log n)).
 */
export function findItinerary(tickets) {
  const adj = new Map();
  for (const [from, to] of tickets) {
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from).push(to);
  }
  for (const list of adj.values()) list.sort().reverse();
  const route = [];
  const dfs = (airport) => {
    const dests = adj.get(airport);
    while (dests && dests.length) {
      const next = dests.pop();
      dfs(next);
    }
    route.push(airport);
  };
  dfs('JFK');
  return route.reverse();
}

/**
 * Problem: Detect Cycle in Undirected Connected Graph
 * Determine if given edges form a cycle in undirected graph with n vertices.
 * Solution: Union-Find DS to detect edge creating cycle (O(e α(n))).
 */
export function hasCycleUndirected(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) return false;
    parent[rootB] = rootA;
    return true;
  };
  for (const [u, v] of edges) {
    if (!union(u, v)) return true;
  }
  return false;
}

/**
 * Problem: Topological Sort (DFS)
 * Return topological ordering for DAG with numVertices and directed edges.
 * Solution: DFS with visited states; detect cycles.
 */
export function topoSortDFS(numVertices, edges) {
  const adj = Array.from({ length: numVertices }, () => []);
  for (const [u, v] of edges) adj[u].push(v);
  const visited = new Array(numVertices).fill(0); // 0=unvisited,1=visiting,2=visited
  const order = [];
  const dfs = (node) => {
    if (visited[node] === 1) throw new Error('Graph contains a cycle');
    if (visited[node] === 2) return;
    visited[node] = 1;
    for (const nei of adj[node]) dfs(nei);
    visited[node] = 2;
    order.push(node);
  };
  for (let i = 0; i < numVertices; i += 1) {
    if (visited[i] === 0) dfs(i);
  }
  return order.reverse();
}

/**
 * Problem: Number of Operations to Make Network Connected
 * Minimum operations to connect n computers given connections; return -1 if impossible.
 * Solution: Union-Find counting components and ensuring enough edges (O(e α(n))).
 */
export function makeConnected(n, connections) {
  if (connections.length < n - 1) return -1;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent[rootB] = rootA;
  };
  for (const [u, v] of connections) union(u, v);
  const components = new Set(parent.map((_, i) => find(i))).size;
  return components - 1;
}

/**
 * Problem: Cheapest Flights Within K Stops
 * Find cheapest price from src to dst with at most k stops.
 * Solution: Modified Bellman-Ford limited to k+1 relaxations (O(k * e)).
 */
export function findCheapestPrice(n, flights, src, dst, k) {
  const prices = new Array(n).fill(Infinity);
  prices[src] = 0;
  for (let i = 0; i <= k; i += 1) {
    const temp = prices.slice();
    for (const [u, v, w] of flights) {
      if (prices[u] !== Infinity && prices[u] + w < temp[v]) temp[v] = prices[u] + w;
    }
    prices.splice(0, n, ...temp);
  }
  return prices[dst] === Infinity ? -1 : prices[dst];
}

/**
 * Problem: Number of Ways to Arrive at Destination
 * Count number of shortest paths from node 0 to n-1 modulo 1e9+7.
 * Solution: Dijkstra maintaining counts (O(e log n)).
 */
export function countPaths(n, roads) {
  const MOD = 1_000_000_007;
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of roads) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }
  const dist = new Array(n).fill(Infinity);
  const ways = new Array(n).fill(0);
  dist[0] = 0;
  ways[0] = 1;
  const heap = [];
  const push = (item) => {
    heap.push(item);
    let idx = heap.length - 1;
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (heap[idx][0] < heap[parent][0]) {
        [heap[idx], heap[parent]] = [heap[parent], heap[idx]];
        idx = parent;
      } else break;
    }
  };
  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let idx = 0;
      while (true) {
        let left = idx * 2 + 1;
        let right = idx * 2 + 2;
        let best = idx;
        if (left < heap.length && heap[left][0] < heap[best][0]) best = left;
        if (right < heap.length && heap[right][0] < heap[best][0]) best = right;
        if (best !== idx) {
          [heap[idx], heap[best]] = [heap[best], heap[idx]];
          idx = best;
        } else break;
      }
    }
    return top;
  };
  push([0, 0]);
  while (heap.length) {
    const [distance, node] = pop();
    if (distance > dist[node]) continue;
    for (const [nei, weight] of adj[node]) {
      const nextDist = distance + weight;
      if (nextDist < dist[nei]) {
        dist[nei] = nextDist;
        ways[nei] = ways[node];
        push([nextDist, nei]);
      } else if (nextDist === dist[nei]) {
        ways[nei] = (ways[nei] + ways[node]) % MOD;
      }
    }
  }
  return ways[n - 1];
}

/**
 * Problem: Min Cost to Connect All Points
 * Minimum cost to connect points with Manhattan distance edges.
 * Solution: Prim's MST using min-heap (O(n^2 log n)).
 */
export function minCostConnectPoints(points) {
  const n = points.length;
  if (n <= 1) return 0;
  const inMST = new Array(n).fill(false);
  const dist = new Array(n).fill(Infinity);
  dist[0] = 0;
  let result = 0;
  for (let i = 0; i < n; i += 1) {
    let u = -1;
    for (let v = 0; v < n; v += 1) {
      if (!inMST[v] && (u === -1 || dist[v] < dist[u])) u = v;
    }
    inMST[u] = true;
    result += dist[u];
    for (let v = 0; v < n; v += 1) {
      if (!inMST[v]) {
        const weight = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
        if (weight < dist[v]) dist[v] = weight;
      }
    }
  }
  return result;
}
