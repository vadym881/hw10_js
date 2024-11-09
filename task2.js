const cache = new Map();

const memorized = memorize(greet);
memorized("Vadim");
memorized("Vadim");
memorized("Vadim");
memorized("Vadim");
memorized("Vadim");
memorized("Vadim");
memorized("Vadim");

function memorize(fn) {
  return function cachedFn(str) {
    const cacheLimit = 5;
    if (!cache.get(str)) {
      const mem = {
        result: fn(str),
        counter: 1,
      };
      cache.set(str, mem);
    } else {
      const prevMem = cache.get(str);
      const prevCounter = prevMem.counter;
      if (prevCounter === cacheLimit) {
        cache.delete(str);
        console.log("Cache limit exceeded");
        return;
      }
      const newCounter = prevCounter + 1;
      let newMem = {
        result: fn(str),
        counter: newCounter,
      };
      cache.set(str, newMem);
    }
    return cache.get(str);
  };
}

function greet(name) {
  console.log(`Hello, ${name}`);
}
