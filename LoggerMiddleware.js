const LoggerMiddleware = {
  logs: [],
  log(action, data) {
    this.logs.push({
      timestamp: new Date().toISOString(),
      action,
      data,
    });
  },
  getLogs() {
    return this.logs;
  },
};

export default LoggerMiddleware;
