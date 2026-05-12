<template>
  <Popup
    id="login"
    custom-class="login-popup"
    :loading="loading"
    @close="onClose"
  >
    <div class="login-popup__inner">
      <div class="login-popup__tabs" role="tablist">
        <button
          type="button"
          class="login-popup__tab"
          :class="{ 'login-popup__tab_active': mode === 'login' }"
          @click="switchMode('login')"
        >
          Вход
        </button>
        <button
          type="button"
          class="login-popup__tab"
          :class="{ 'login-popup__tab_active': mode === 'register' }"
          @click="switchMode('register')"
        >
          Регистрация
        </button>
      </div>

      <template v-if="mode === 'login'">
        <h2 class="login-popup__title">Вход в личный кабинет</h2>
        <form class="login-popup__form" @submit.prevent="submitLogin">
          <InputComponent
            v-model="email"
            class="login-popup__input-wrap"
            label="Email"
            placeholder="you@example.com"
            input-type="email"
            autocomplete="email"
            required
          />
          <InputComponent
            v-model="password"
            class="login-popup__input-wrap"
            label="Пароль"
            placeholder="Введите пароль"
            input-type="password"
            autocomplete="current-password"
            required
          />
          <p v-if="error" class="login-popup__error">{{ error }}</p>
          <ButtonComponent class="login-popup__submit" type="red" wide>
            Войти
          </ButtonComponent>
        </form>
      </template>

      <template v-else-if="mode === 'register' && regStep === 1">
        <h2 class="login-popup__title">Создание аккаунта</h2>
        <form class="login-popup__form" @submit.prevent="submitRegInit">
          <div class="login-popup__row">
            <InputComponent
              v-model="firstName"
              class="login-popup__input-wrap"
              label="Имя"
              autocomplete="given-name"
              required
            />
            <InputComponent
              v-model="lastName"
              class="login-popup__input-wrap"
              label="Фамилия"
              autocomplete="family-name"
              required
            />
          </div>
          <InputComponent
            v-model="email"
            class="login-popup__input-wrap"
            label="Email"
            placeholder="you@example.com"
            input-type="email"
            autocomplete="email"
            required
          />
          <InputComponent
            v-model="password"
            class="login-popup__input-wrap"
            label="Пароль"
            input-type="password"
            autocomplete="new-password"
            required
          />
          <InputComponent
            v-model="password2"
            class="login-popup__input-wrap"
            label="Повтор пароля"
            input-type="password"
            autocomplete="new-password"
            required
          />
          <p v-if="error" class="login-popup__error">{{ error }}</p>
          <ButtonComponent class="login-popup__submit" type="red" wide>
            Получить код
          </ButtonComponent>
          <p class="login-popup__hint">Пароль: не менее 8 символов.</p>
        </form>
      </template>

      <template v-else-if="mode === 'register' && regStep === 2">
        <h2 class="login-popup__title">Подтверждение email</h2>
        <p class="login-popup__desc">
          Код отправлен на <strong>{{ email }}</strong
          >. Введите его ниже.
        </p>
        <form class="login-popup__form" @submit.prevent="submitRegConfirm">
          <InputComponent
            v-model="code"
            class="login-popup__input-wrap login-popup__input-wrap_code"
            label="Код из письма"
            placeholder="000000"
            inputmode="numeric"
            :maxlength="6"
            required
          />
          <p v-if="error" class="login-popup__error">{{ error }}</p>
          <ButtonComponent class="login-popup__submit" type="red" wide>
            Подтвердить
          </ButtonComponent>
        </form>
        <button type="button" class="login-popup__back" @click="regStep = 1">
          ← Изменить данные
        </button>
      </template>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import axios from "axios";
import Popup from "@/components/popup/popup.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import InputComponent from "@/components/input-component/input-component.vue";
import { useAuthStore } from "@/stores/use-auth-store.ts";
import { useUiStore } from "@/stores/use-ui-store.ts";

const emit = defineEmits<{ success: [] }>();

const auth = useAuthStore();
const ui = useUiStore();

const mode = ref<"login" | "register">("login");
const regStep = ref<1 | 2>(1);

const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");
const password2 = ref("");
const code = ref("");
const loading = ref(false);
const error = ref("");

function switchMode(m: "login" | "register") {
  mode.value = m;
  regStep.value = 1;
  error.value = "";
  password2.value = "";
  code.value = "";
}

function onClose() {
  ui.closePopup("login");
  error.value = "";
}

function extractError(e: unknown): string {
  if (axios.isAxiosError(e)) {
    const msg = (e.response?.data as { error?: { message?: string } })?.error
      ?.message;
    return msg || "Ошибка запроса";
  }
  return "Ошибка запроса";
}

async function submitLogin() {
  error.value = "";
  loading.value = true;
  try {
    await auth.login(email.value.trim(), password.value);
    password.value = "";
    await nextTick();
    emit("success");
    onClose();
  } catch (e) {
    error.value = extractError(e);
  } finally {
    loading.value = false;
  }
}

async function submitRegInit() {
  error.value = "";
  if (password.value !== password2.value) {
    error.value = "Пароли не совпадают";
    return;
  }
  loading.value = true;
  try {
    await auth.registerInit(
      email.value.trim(),
      firstName.value.trim(),
      lastName.value.trim(),
      password.value
    );
    password.value = "";
    password2.value = "";
    regStep.value = 2;
  } catch (e) {
    error.value = extractError(e);
  } finally {
    loading.value = false;
  }
}

async function submitRegConfirm() {
  error.value = "";
  loading.value = true;
  try {
    await auth.registerConfirm(email.value.trim(), code.value.trim());
    code.value = "";
    await nextTick();
    emit("success");
    onClose();
  } catch (e) {
    error.value = extractError(e);
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="css">
.login-popup {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-popup__inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 380px;
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
  transition:
    color 0.15s,
    background 0.15s;
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
.login-popup__desc {
  color: var(--gray-60);
  font-size: var(--font-size-s);
  margin: 0;
  line-height: 1.5;
}
.login-popup__form {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}
.login-popup__input-wrap {
  width: 100%;
}
.login-popup__input-wrap :deep(.input-component) {
  width: 100%;
}
.login-popup__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
}
.login-popup__row .login-popup__input-wrap {
  min-width: 0;
}
.login-popup__input-wrap_code :deep(.input-component__wrapper-input) {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 10px;
}
.login-popup__error {
  color: #c62828;
  font-size: var(--font-size-s);
  margin: 0 0 8px;
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
.login-popup__back {
  border: none;
  background: none;
  color: var(--gray-50);
  font-size: var(--font-size-s);
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: color 0.15s;
}
.login-popup__back:hover {
  color: var(--gray-80);
}
</style>
