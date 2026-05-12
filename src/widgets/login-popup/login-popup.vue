<template>
  <Popup
    id="login"
    custom-class="login-popup"
    :loading="loginPopup.data.loading"
    @close="loginPopup.functions.onClose"
  >
    <div class="login-popup__inner">
      <Tabs
        :model-value="loginPopup.data.tabs.modelValue"
        :disabled="loginPopup.data.tabs.disabled"
        :items="loginPopup.data.tabs.items"
        @update:modelValue="loginPopup.functions.handleTabChange"
      />
      <h2 class="login-popup__title">{{ title }}</h2>
      <div class="login-popup__form">
        <InputComponent
          v-for="item in fields"
          :key="item.id"
          :model-value="loginPopup.data.form[item.id]"
          class="login-popup__input-wrap login-popup__input-wrap_code"
          :label="item.label"
          :placeholder="item.placeholder"
          :error="loginPopup.data.errors[item.id]"
          required
          @update:modelValue="
            loginPopup.functions.handleModelValue($event, item.id)
          "
        />
      </div>
      <ButtonComponent
        class="login-popup__submit"
        type="red"
        wide
        :disabled="loginPopup.data.loading"
        @click="loginPopup.functions.submit"
      >
        Подтвердить
      </ButtonComponent>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import Popup from "@/components/popup/popup.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import InputComponent from "@/components/input-component/input-component.vue";
import { useAuthStore } from "@/stores/use-auth-store.ts";
import { useUiStore } from "@/stores/use-ui-store.ts";
import { type LoginPopupNS } from "@/widgets/login-popup/types.ts";
import Tabs from "@/components/tabs/tabs.vue";

const auth = useAuthStore();
const ui = useUiStore();

const forms: Record<LoginPopupNS.Mode, LoginPopupNS.FormField[]> = {
  code: [
    {
      label: "Код из письма",
      type: "input",
      placeholder: "012345",
      id: "code"
    }
  ],
  login: [
    {
      label: "Email",
      type: "input",
      placeholder: "example@site.ru",
      id: "email"
    },
    {
      label: "Пароль",
      type: "input",
      placeholder: "Введите пароль",
      id: "password"
    }
  ],
  register: [
    {
      label: "Имя",
      type: "input",
      placeholder: "Иван",
      id: "firstName"
    },
    {
      label: "Фамилия",
      type: "input",
      placeholder: "Иванов",
      id: "lastName"
    },
    {
      label: "Email",
      type: "input",
      placeholder: "example@site.ru",
      id: "email"
    },
    {
      label: "Пароль",
      type: "input",
      placeholder: "Введите пароль",
      id: "password"
    },
    {
      label: "Повтор пароля",
      type: "input",
      placeholder: "Повторите ваш пароль",
      id: "passwordRepeat"
    }
  ]
};

const getInitialValues = (): LoginPopupNS.Form => ({
  email: "",
  password: "",
  passwordRepeat: "",
  firstName: "",
  lastName: "",
  code: ""
});

const loginPopup: LoginPopupNS.Object = reactive({
  data: {
    mode: "login",
    form: getInitialValues(),
    errors: {},
    loading: false,
    tabs: {
      items: [
        {
          text: "Вход",
          id: "login"
        },
        {
          text: "Регистрация",
          id: "register"
        }
      ],
      modelValue: "login",
      disabled: false
    }
  },
  functions: {
    async submit() {
      if (!loginPopup.functions.validate() || loginPopup.data.loading) return;
      loginPopup.data.loading = true;

      try {
        await sendRequest();
      } catch (e: any) {
        console.log(e);
      } finally {
        loginPopup.data.loading = false;
      }
    },
    changeMode(mode) {
      loginPopup.data.mode = mode;
      loginPopup.functions.clean();
    },
    clean() {
      loginPopup.data.form = getInitialValues();
      loginPopup.data.errors = {};
    },
    validate() {
      const fieldsToCheck = forms[loginPopup.data.mode].map(i => i.id);

      fieldsToCheck.forEach(i => {
        loginPopup.data.form[i] = loginPopup.data.form[i].trim();
        if (loginPopup.data.form[i].length) {
          delete loginPopup.data.errors[i];
          return;
        }
        loginPopup.data.errors[i] = "Обязательное поле";
      });

      return !Object.keys(loginPopup.data.errors).length;
    },
    handleModelValue(value, id) {
      loginPopup.data.form[id] = value;
      delete loginPopup.data.errors[id];
    },
    handleTabChange(mode) {
      loginPopup.data.tabs.modelValue = mode;
      loginPopup.data.mode = mode;
    },
    onClose() {
      ui.closePopup("login");
      loginPopup.functions.clean();
    }
  }
});

const fields = computed<LoginPopupNS.FormField[]>(
  () => forms[loginPopup.data.mode]
);
const title = computed<string>(() => {
  if (loginPopup.data.mode === "login") return "Вход в личный кабинет";
  return "Регистрация";
});

const sendRequest = async () => {
  switch (loginPopup.data.mode) {
    case "login":
      await auth.login(
        loginPopup.data.form.email,
        loginPopup.data.form.password
      );
      loginPopup.functions.onClose();
      break;
    case "register":
      if (
        loginPopup.data.form.password !== loginPopup.data.form.passwordRepeat
      ) {
        loginPopup.data.errors.passwordRepeat = "Пароли не совпадают";
        return;
      }

      await auth.registerInit(
        loginPopup.data.form.email,
        loginPopup.data.form.firstName,
        loginPopup.data.form.lastName,
        loginPopup.data.form.password
      );

      loginPopup.data.mode = "code";
      break;
    case "code":
      await auth.registerConfirm(
        loginPopup.data.form.email,
        loginPopup.data.form.code
      );
      loginPopup.functions.onClose();
      loginPopup.data.mode = "login";
      break;
  }
};
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
  width: 360px;
  max-width: 100%;
}
</style>
