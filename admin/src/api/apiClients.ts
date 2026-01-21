import axios, { AxiosError} from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { tokenStore } from "../auth/TokenStore";

type RefreshResponse = {
  accessToken: string;
  accessTokenExpiresInSecond: number;
};

// 1 instance dùng cho mọi request API
export const api: AxiosInstance = axios.create({
  baseURL: "",               
  withCredentials: true,     
});

// --- Single-flight refresh: tránh nhiều request cùng refresh ---
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  // Nếu đang có refresh chạy, chờ nó
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const res = await axios.post<RefreshResponse>(
      "http://localhost:8081/auth/refresh",
      {},
      { withCredentials: true } // cookie refresh_token
    );
    const newToken = res.data?.accessToken;
    if (!newToken) throw new Error("Refresh succeeded but accessToken missing");
    tokenStore.set(newToken);
    return newToken;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

// --- Request interceptor: tự attach Bearer token ---
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStore.get();
  if (token) {
    config.headers = config.headers ?? {};
    config
    .headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response interceptor: nếu 401 => refresh => retry ---
api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const status = err.response?.status;
    const originalRequest: any = err.config;

    // nếu không có config thì trả lỗi luôn
    if (!originalRequest) throw err;

    if (tokenStore.getLoggingOut()) {
      throw err; //đang logout thì khỏi refresh, khỏi retry
    } 
    // tránh loop vô hạn
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // retry request ban đầu
      } catch (refreshErr) {
        tokenStore.clear();
        throw err;
      }
    }

    throw err;
  }
);


// Sau bước này:

// Mọi api.get/post/delete... sẽ tự gắn Authorization

// Nếu AT hết hạn → tự gọi /auth/refresh → retry request