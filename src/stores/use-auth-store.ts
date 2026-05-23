import axios from "axios";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { StoreNames } from "@/stores/types.ts";
import { ACCESS_TOKEN_KEY } from "@/infrastructure/auth-token.ts";
import http from "@/infrastructure/http.ts";
import {
  loginRequest,
  logoutRequest,
  meRequest,
  registerInitRequest,
  registerConfirmRequest,
  type MeResponse
} from "@/infrastructure/auth-api.ts";

export const useAuthStore = defineStore(StoreNames.Auth, () => {
  const accessToken = ref<string>(sessionStorage.getItem(ACCESS_TOKEN_KEY) ?? "");
  const user = ref<MeResponse | null>(null);
  const bootstrapped = ref(false);

  let bootstrapPromise: Promise<void> | null = null;

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

  async function refreshAccessToken(): Promise<boolean> {
    try {
      const { data } = await axios.post<{ access_token: string }>(
        `${http.defaults.baseURL ?? ""}/api/v1/auth/refresh`,
        {},
        { withCredentials: true }
      );
      setAccessToken(data.access_token);
      return true;
    } catch {
      return false;
    }
  }

  async function bootstrap(): Promise<void> {
    if (bootstrapped.value) return;
    if (bootstrapPromise) {
      await bootstrapPromise;
      return;
    }

    bootstrapPromise = (async () => {
      accessToken.value = sessionStorage.getItem(ACCESS_TOKEN_KEY) ?? "";
      if (!accessToken.value) {
        user.value = null;
        return;
      }
      try {
        user.value = await meRequest();
      } catch {
        if (await refreshAccessToken()) {
          user.value = await meRequest();
        } else {
          setAccessToken(null);
          user.value = null;
        }
      }
    })();

    try {
      await bootstrapPromise;
    } finally {
      bootstrapPromise = null;
      bootstrapped.value = true;
    }
  }

  async function login(email: string, password: string): Promise<void> {
    const data = await loginRequest(email, password);
    setAccessToken(data.access_token);
    user.value = await meRequest();
  }

  /** Шаг 1 регистрации — отправляет код на email */
  async function registerInit(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<void> {
    await registerInitRequest(email, firstName, lastName, password);
  }

  /** Шаг 2 регистрации — подтверждает код и авторизует */
  async function registerConfirm(email: string, code: string): Promise<void> {
    const data = await registerConfirmRequest(email, code);
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
    registerInit,
    registerConfirm,
    logout
  };
});
