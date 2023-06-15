const parseEnv = () => {
  const envs = process.env;
  const rssEnvs = Object.keys(envs)
    .filter((key) => key.startsWith('RSS_'))
    .reduce((obj, key) => {
      obj[key] = envs[key];
      return obj;
    }, {});

  if (Object.keys(rssEnvs).length === 0) {
    console.log('No RSS environment variables found!');
    return;
  }

  const formattedEnvs = Object.entries(rssEnvs)
    .map(([key, value]) => `RSS_${key}=${value}`)
    .join('; ');
  console.log(formattedEnvs);
};

parseEnv();
