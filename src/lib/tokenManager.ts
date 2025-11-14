type TokenPair = {
  accessToken: string;
  refreshToken?: string;
};

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export const tokenManager = {
  setTokens: (tokens: TokenPair, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(ACCESS_KEY, tokens.accessToken);
    if (tokens.refreshToken) {
      storage.setItem(REFRESH_KEY, tokens.refreshToken);
    }
  },

  getTokens: (): TokenPair | null => {
    const access =
      localStorage.getItem(ACCESS_KEY) || sessionStorage.getItem(ACCESS_KEY);
    const refresh =
      localStorage.getItem(REFRESH_KEY) || sessionStorage.getItem(REFRESH_KEY);

    if (!access) return null;
    return { accessToken: access, refreshToken: refresh || undefined };
  },

  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
  },

  isSavedLocaly: () => !!localStorage.getItem(ACCESS_KEY),
};
