export function parseArgs(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key.startsWith("--")) continue;
    const value = argv[index + 1];
    result[key.slice(2)] = value && !value.startsWith("--") ? value : true;
    if (result[key.slice(2)] !== true) index += 1;
  }
  return result;
}
