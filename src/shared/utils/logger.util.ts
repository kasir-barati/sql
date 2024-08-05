export class Logger {
  static log(_: unknown) {
    if (['development', 'test'].includes(process.env.NODE_ENV)) {
      console.log(...arguments);
    }
  }
  static debug(_: unknown) {
    if (['development', 'test'].includes(process.env.NODE_ENV)) {
      console.debug(...arguments);
    }
  }
  static dir(_: unknown) {
    if (['development', 'test'].includes(process.env.NODE_ENV)) {
      console.dir(...arguments, { depth: null });
    }
  }
  static info(_: unknown) {
    console.info(...arguments);
  }
  static warn(_: unknown) {
    console.warn(...arguments);
  }
  static error(_: unknown) {
    console.error(...arguments);
  }
}
