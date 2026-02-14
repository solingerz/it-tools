type AppEnv = 'production' | 'development' | 'preview' | 'test';

function getEnvString(name: string, defaultValue = ''): string {
  const value = import.meta.env[name];
  return typeof value === 'string' ? value : defaultValue;
}

function getEnvBoolean(name: string, defaultValue = false): boolean {
  const value = import.meta.env[name];
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value !== 'string') {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();
  if (['true', '1', 'yes', 'on'].includes(normalized)) {
    return true;
  }

  if (['false', '0', 'no', 'off', ''].includes(normalized)) {
    return false;
  }

  return defaultValue;
}

function getAppEnv(name: string, defaultValue: AppEnv): AppEnv {
  const value = getEnvString(name, defaultValue);
  if (value === 'production' || value === 'development' || value === 'preview' || value === 'test') {
    return value;
  }
  return defaultValue;
}

export const config = {
  app: {
    version: getEnvString('PACKAGE_VERSION', '0.0.0'),
    lastCommitSha: getEnvString('VITE_VERCEL_GIT_COMMIT_SHA', ''),
    baseUrl: getEnvString('BASE_URL', '/'),
    env: getAppEnv('VITE_VERCEL_ENV', 'development'),
  },
  plausible: {
    isTrackerEnabled: getEnvBoolean('VITE_TRACKER_ENABLED', false),
    domain: getEnvString('VITE_PLAUSIBLE_DOMAIN', ''),
    apiHost: getEnvString('VITE_PLAUSIBLE_API_HOST', ''),
    trackLocalhost: false,
  },
  showBanner: getEnvBoolean('VITE_SHOW_BANNER', false),
  showSponsorBanner: getEnvBoolean('VITE_SHOW_SPONSOR_BANNER', false),
};
