let accessToken: string | null = null;
let isLoggingOut = false;
export const tokenStore = {
  get() {
    return accessToken;
  },
  set(token: string | null) {
    accessToken = token;
  },
  clear() {
    accessToken = null;
  },

  setLoggingOut(value : boolean) {
    isLoggingOut = value;
  },
  getLoggingOut() {
    return isLoggingOut;
  }
};
