import axios from "axios";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { StoreNames } from "@/stores/types.ts";
import { ACCESS_TOKEN_KEY } from "@/infrastructure/auth-token.ts";
import {
  loginRequest,
  logoutRequest,
  meRequest,
  registerRequest,
  type MeResponse
} from "@/infrastructure/auth-api.ts";

export const useAuthStore = defineStore(StoreNames.Auth, () => {
  const accessToken = ref<string>(sessionStorage.getItem(ACCESS_TOKEN_KEY) ?? "");
  const user = ref<MeResponse | null>(null);
  const bootstrapped = ref(false);

  function setAccessToken(token: string | null) {
    accessToken.value = token ?? "";
    if (token) {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }

  const isAuthenticated = computed(
    () => accessToken.value.length > 0 && user.value !== null
  );

  async function bootstrap(): Promise<void> {
    accessToken.value = sessionStorage.getItem(ACCESS_TOKEN_KEY) ?? "";
    const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
    if (!accessToken.value) {
      user.value = null;
      bootstrapped.value = true;
      return;
    }
    try {
      user.value = await meRequest();
    } catch {
      try {
        const { data } = await axios.post<{ access_token: string }>(
          `${base}/api/v1/auth/refresh`,
          {},
          { withCredentials: true }
        );
        setAccessToken(data.access_token);
        user.value = await meRequest();
      } catch {
        setAccessToken(null);
        user.value = null;
      }
    }
    bootstrapped.value = true;
  }

  async function login(username: string, password: string): Promise<void> {
    const data = await loginRequest(username, password);
    setAccessToken(data.access_token);
    user.value = await meRequest();
  }

  async function register(username: string, password: string): Promise<void> {
    const data = await registerRequest(username, password);
    setAccessToken(data.access_token);
    user.value = await meRequest();
  }

  async function logout(): Promise<void> {
    await logoutRequest();
    setAccessToken(null);
    user.value = null;
  }

  return {
    accessToken,
    user,
    bootstrapped,
    isAuthenticated,
    setAccessToken,
    bootstrap,
    login,
    register,
    logout
  };
});
