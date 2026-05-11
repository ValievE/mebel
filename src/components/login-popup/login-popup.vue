<template>
  <Popup id="login" custom-class="login-popup" :loading="loading" @close="onClose">
    <div class="login-popup__inner">
      <div class="login-popup__tabs" role="tablist">
        <button
          type="button"
          class="login-popup__tab"
          :class="{ 'login-popup__tab_active': mode === 'login' }"
          @click="mode = 'login'"
        >
          Вход
        </button>
        <button
          type="button"
          class="login-popup__tab"
          :class="{ 'login-popup__tab_active': mode === 'register' }"
          @click="mode = 'register'"
        >
          Регистрация
        </button>
      </div>
      <h2 class="login-popup__title">
        {{ mode === "login" ? "Вход в личный кабинет" : "Создание аккаунта" }}
      </h2>
      <label class="login-popup__field">
        <span class="login-popup__label">Логин</span>
        <input
          v-model="username"
          class="login-popup__input"
          type="text"
          autocomplete="username"
          @keydown.enter.prevent="submit"
        />
      </label>
      <label class="login-popup__field">
        <span class="login-popup__label">Пароль</span>
        <input
          v-model="password"
          class="login-popup__input"
          type="password"
          :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
          @keydown.enter.prevent="submit"
        />
      </label>
      <label v-if="mode === 'register'" class="login-popup__field">
        <span class="login-popup__label">Повтор пароля</span>
        <input
          v-model="password2"
          class="login-popup__input"
          type="password"
          autocomplete="new-password"
          @keydown.enter.prevent="submit"
        />
      </label>
      <p v-if="error" class="login-popup__error">{{ error }}</p>
      <ButtonComponent class="login-popup__submit" @click="submit">
        {{ mode === "login" ? "Войти" : "Зарегистрироваться" }}
      </ButtonComponent>
      <p v-if="mode === 'login'" class="login-popup__hint">
        Демо: логин <strong>demo</strong>, пароль <strong>demo</strong>
      </p>
      <p v-else class="login-popup__hint">
        Логин: 3–72 символа (латиница, цифры, _). Пароль: не менее 8 символов.
      </p>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import axios from "axios";
import Popup from "@/components/popup/popup.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import { useAuthStore } from "@/stores/use-auth-store.ts";
import { useUiStore } from "@/stores/use-ui-store.ts";

const emit = defineEmits<{ success: [] }>();

const auth = useAuthStore();
const ui = useUiStore();

const mode = ref<"login" | "register">("login");
const username = ref("");
const password = ref("");
const password2 = ref("");
const loading = ref(false);
const error = ref("");

watch(mode, () => {
  error.value = "";
  password2.value = "";
});

function onClose() {
  ui.closePopup("login");
  error.value = "";
}

async function submit() {
  error.value = "";
  if (mode.value === "register" && password.value !== password2.value) {
    error.value = "Пароли не совпадают";
    return;
  }
  loading.value = true;
  try {
    if (mode.value === "login") {
      await auth.login(username.value.trim(), password.value);
    } else {
      await auth.register(username.value.trim(), password.value);
    }
    password.value = "";
    password2.value = "";
    await nextTick();
    emit("success");
    onClose();
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const msg = (e.response?.data as { error?: { message?: string } })?.error
        ?.message;
      error.value = msg || "Ошибка запроса";
    } else {
      error.value = "Ошибка запроса";
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="css">
.login-popup__inner {
  padding: 24px 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
}
.login-popup__tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--gray-30);
  margin-bottom: 8px;
}
.login-popup__tab {
  flex: 1;
  padding: 10px 12px;
  border: none;
  background: transparent;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--gray-50);
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  transition: color 0.15s, background 0.15s;
}
.login-popup__tab:hover {
  color: var(--gray-80);
}
.login-popup__tab_active {
  color: var(--gray-90);
  background: var(--gray-10);
}
.login-popup__title {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-semibold);
  color: var(--gray-90);
  margin: 0;
}
.login-popup__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.login-popup__label {
  font-size: var(--font-size-s);
  color: var(--gray-60);
}
.login-popup__input {
  border: 1px solid var(--gray-30);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: var(--font-size-m);
  outline: none;
  transition: border-color 0.15s;
}
.login-popup__input:focus {
  border-color: var(--gray-50);
}
.login-popup__error {
  color: #c62828;
  font-size: var(--font-size-s);
  margin: 0;
}
.login-popup__submit {
  margin-top: 8px;
}
.login-popup__hint {
  font-size: var(--font-size-s);
  color: var(--gray-50);
  margin: 0;
  line-height: 1.4;
}
</style>
