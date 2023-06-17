/**
 * Retrieves all RSS env variables, formats and logs them
 * @name parseEnv
 * @returns {void}
 */
const parseEnv = () => {
  /**
   * @type {Object.<string, string>}
   */
  const rssEnvs = Object.entries(process.env)
    .filter(([key]) => key.startsWith('RSS_'))
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  if (Object.keys(rssEnvs).length === 0) {
    console.log('There are no RSS env variables!');
    return;
  }

  /**
   * @type {string}
   */
  const formattedEnvs = Object.entries(rssEnvs)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  console.log(formattedEnvs);
};

parseEnv();
