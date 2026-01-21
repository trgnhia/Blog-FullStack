import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import { tokenStore } from "./TokenStore";

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "loggingOut";

/**
 * Shape (contract) của AuthContext
 * → mọi component dùng useAuth() sẽ nhận đúng cấu trúc này
 * loading: đang kiểm tra / bootstrap auth (sẽ dùng khi làm refresh token)
 */
export type AuthContextValue = {
  status: AuthStatus;
  accessToken: string | null;
  setAuthenticated: (token: string) => void;
  setUnauthenticated: () => void;
  setLoading: () => void;
  logOut: () => Promise<void>;
};

type RefreshResponse = {
  accessToken: string;
  accessTokenExpiresInSecond: number;
};

/**
 * Tạo Context : truyền dữ liệu từ Provider → toàn bộ component con mà không cần props drilling
 * - Giá trị mặc định là `undefined`
 * - Bắt buộc phải dùng trong <AuthProvider>, nếu không sẽ throw error
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider
 * - Là Functional Component
 * - Nhận `children` (mọi component nằm bên trong Provider)
 * - Có nhiệm vụ: giữ auth state và "phát" nó xuống toàn bộ subtree
 */
export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const setAuthenticated = (token: string) => {
    tokenStore.set(token);
    setAccessToken(token);
    setStatus("authenticated");
  };

  const setUnauthenticated = () => {
    tokenStore.clear();
    setAccessToken(null);
    setStatus("unauthenticated");
  };

  const setLoading = () => {
    setStatus("loading");
  };

  const logOut = async () => {
    setStatus("loggingOut");
    tokenStore.setLoggingOut(true);
    try {
      await axios.post(
        "http://localhost:8081/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    } finally {
      tokenStore.clear();
      setAccessToken(null);
      setStatus("unauthenticated");
    }
   
    setAccessToken(null);
  };

  // boot refresh.app vừa mount lần đầu sẽ hỏi BE còn RT hợp lế không, có thì cấp lại AT.
  useEffect(() => {
    let isMounted = true;
    const boot = async () => {
      setLoading();
      try {
        const res = await axios.post<RefreshResponse>(
          "http://localhost:8081/auth/refresh",
          {},
          { withCredentials: true } // quan trọng để gửi cookie refresh_token
        );
        const newToken = res.data?.accessToken;
        if (!newToken) {
          if (isMounted) setUnauthenticated();
          return;
        }
        if (isMounted) setAuthenticated(newToken);
      } catch {
        if (isMounted) setUnauthenticated();
      }
    };
    boot();
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * value là object được truyền vào AuthContext.Provider
   *
   * useMemo dùng để:
   * - Giữ reference của object ổn định
   * - Chỉ tạo object mới khi status hoặc accessToken thay đổi
   * → tránh re-render không cần thiết ở các component dùng context
   */
  const value = useMemo<AuthContextValue>(() => {
    return {
      status,
      accessToken,
      setAuthenticated,
      setUnauthenticated,
      setLoading,
      logOut,
    };
  }, [status, accessToken]);

  /**
   * Provider sẽ "phát" value xuống toàn bộ children
   * → mọi component con bên trong đều có thể truy cập qua useAuth()
   */
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook để dùng AuthContext
 * - Giúp code gọn, không phải useContext(AuthContext) trực tiếp
 * - Bảo vệ: nếu dùng ngoài <AuthProvider> thì throw error ngay
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return context;
};
