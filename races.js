function getRaceFinishingOrder(racers, overtaking, winner) {
    let i = 1;
    overtaking.forEach(element => {
        element['id'] = i++;
    });
    let results = [];
    const visited = new Set();

    function dfs(result, currentDriver) {
        if (result.length === racers.length) {
            results.push(result.slice());
          return;
        }
    
        for (const overtake of overtaking) {
          if (!visited.has(overtake.id) && overtake.leading === currentDriver) {
            visited.add(overtake.id);
            result.push(overtake.lagging);
            dfs(result, overtake.lagging);
            result.pop();
            visited.delete(overtake.id);
          }
        }
      }
    for (const racer of racers) {
    if (racer === winner) {
        dfs([winner], winner);
    }
    }
    return results;
}

const racers = ['Anna', 'Mike', 'Wolf', 'Harry'];
const overtaking = [
  { leading: 'Mike', lagging: 'Harry' },
];
const winner = 'Anna';

const possibleOrders = getRaceFinishingOrder(racers, overtaking, winner);
console.log(possibleOrders);