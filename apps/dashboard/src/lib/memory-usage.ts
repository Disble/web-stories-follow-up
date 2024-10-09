export const getMemoryUsage = (): {
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
  arrayBuffers: number;
} => {
  const memoryUsage = process.memoryUsage();
  return {
    rss: Number((memoryUsage.rss / 1024 / 1024).toFixed(2)),
    heapTotal: Number((memoryUsage.heapTotal / 1024 / 1024).toFixed(2)),
    heapUsed: Number((memoryUsage.heapUsed / 1024 / 1024).toFixed(2)),
    external: Number((memoryUsage.external / 1024 / 1024).toFixed(2)),
    arrayBuffers: Number((memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2)),
  };
};

export const logMemoryUsage = (interval = 10000): NodeJS.Timeout => {
  return setInterval(() => {
    const usage = getMemoryUsage();
    console.info(`Memory Usage: 
        🧠 RSS: ${usage.rss} MB,
        📊 Heap Total: ${usage.heapTotal} MB,
        💾 Heap Used: ${usage.heapUsed} MB,
        🌐 External: ${usage.external} MB,
        🔄 Array Buffers: ${usage.arrayBuffers} MB`);
  }, interval);
};
