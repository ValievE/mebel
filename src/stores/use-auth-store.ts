import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { StoreNames } from "@/stores/types.ts";
import { SSNames } from "@/common/consts.ts";
import { login as loginRequest } from "@/infrastructure/auth/login/login.ts";
import { logout as logoutRequest } from "@/infrastructure/auth/logout/logout.ts";
import { me } from "@/infrastructure/auth/me/me.ts";
import type { MeResponse } from "@/infrastructure/auth/me/types.ts";
import { registerInit as registerInitRequest } from "@/infrastructure/auth/register-init/register-init.ts";
import { registerConfirm as registerConfirmRequest } from "@/infrastructure/auth/register-confirm/register-confirm.ts";
import { refresh } from "@/infrastructure/auth/refresh/refresh.ts";

export const useAuthStore = defineStore(StoreNames.Auth, () => {
  const accessToken = ref<string>(sessionStorage.getItem(SSNames.AccessToken) ?? "");
  const user = ref<MeResponse | null>(null);
  const bootstrapped = ref(false);

  let bootstrapPromise: Promise<void> | null = null;

  function setAccessToken(token: string | null) {
    accessToken.value = token ?? "";
    if (token) {
      sessionStorage.setItem(SSNames.AccessToken, token);
    } else {
      sessionStorage.removeItem(SSNames.AccessToken);
    }
  }

  const isAuthenticated = computed(
    () => accessToken.value.length > 0 && user.value !== null
  );

  const isAdmin = computed(() => Boolean(user.value?.is_admin));

  async function refreshAccessToken(): Promise<boolean> {
    try {
      const data = await refresh();
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
      accessToken.value = sessionStorage.getItem(SSNames.AccessToken) ?? "";
      if (!accessToken.value) {
        user.value = null;
        return;
      }
      try {
        user.value = await me();
      } catch {
        if (await refreshAccessToken()) {
          user.value = await me();
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
    const data = await loginRequest({ email, password });
    setAccessToken(data.access_token);
    user.value = await me();
  }

  /** Шаг 1 регистрации — отправляет код на email */
  async function registerInit(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    advertisingAgreement: boolean
  ): Promise<void> {
    await registerInitRequest({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      advertising_agreement: advertisingAgreement
    });
  }

  /** Шаг 2 регистрации — подтверждает код и авторизует */
  async function registerConfirm(email: string, code: string): Promise<void> {
    const data = await registerConfirmRequest({ email, code });
    setAccessToken(data.access_token);
    user.value = await me();
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
    isAdmin,
    setAccessToken,
    bootstrap,
    login,
    registerInit,
    registerConfirm,
    logout
  };
});
