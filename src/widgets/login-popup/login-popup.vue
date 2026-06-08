<template>
  <Popup
    id="login"
    custom-class="login-popup"
    content-height
    content-width
    @close="loginPopup.functions.onClose"
  >
    <div class="login-popup__inner">
      <Tabs
        :model-value="loginPopup.data.tabs.modelValue"
        :disabled="loginPopup.data.loading"
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
          :hidden="isHiddenInput(item.id)"
          :placeholder="item.placeholder"
          :error="loginPopup.data.errors[item.id]"
          required
          :disabled="loginPopup.data.loading"
          @update:modelValue="
            loginPopup.functions.handleModelValue($event, item.id)
          "
        />
        <template v-if="isRegister">
          <Checkbox
            :model-value="loginPopup.data.form.privacy"
            required
            :disabled="loginPopup.data.loading"
            :error="loginPopup.data.errors.privacy"
            @update:modelValue="
              loginPopup.functions.handleCheckbox($event, 'privacy')
            "
          >
            Даю согласие на обработку персональных данных в соответствии с
            <RouterLink
              class="login-popup__form-checkbox-link"
              :to="{
                name: PageName.Legal,
                params: { id: DocumentsTypeRoute.Privacy }
              }"
            >
              Политикой конфиденциальности
            </RouterLink>
          </Checkbox>
          <Checkbox
            v-model="loginPopup.data.form.advertisingAgreement"
            :disabled="loginPopup.data.loading"
          >
            Даю согласие получать новости и акции на указанный email
          </Checkbox>
        </template>
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
import { useRouter } from "vue-router";
import { PageName } from "@/router/consts.ts";
import { getErrorText } from "@/common/consts.ts";
import Checkbox from "@/components/checkbox/checkbox.vue";
import { DocumentsTypeRoute } from "@/types/types.ts";

const auth = useAuthStore();
const ui = useUiStore();
const router = useRouter();

const forms: Record<LoginPopupNS.Mode, LoginPopupNS.FormField[]> = {
  code: [
    {
      label: "Код из письма",
      type: "input",
      placeholder: "Введите 6 цифр",
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
  code: "",
  privacy: false,
  advertisingAgreement: false
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
      modelValue: "login"
    }
  },
  functions: {
    async submit() {
      if (!loginPopup.functions.validate() || loginPopup.data.loading) return;
      loginPopup.data.loading = true;

      try {
        await sendRequest();
      } catch (e: any) {
        ui.addToast(getErrorText(e), "error");
      } finally {
        loginPopup.data.loading = false;
      }
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

      if (
        loginPopup.data.mode === "register" &&
        !loginPopup.data.form.privacy
      ) {
        loginPopup.data.errors.privacy = "Обязательное поле";
      } else {
        delete loginPopup.data.errors.privacy;
      }

      return !Object.keys(loginPopup.data.errors).length;
    },
    handleModelValue(value, id) {
      loginPopup.data.form[id] = value;
      delete loginPopup.data.errors[id];
    },
    handleTabChange(mode) {
      loginPopup.data.tabs.modelValue = mode;
      loginPopup.data.mode = mode;
      loginPopup.functions.clean();
    },
    onClose() {
      ui.closePopup("login");
      loginPopup.functions.clean();
    },
    handleCheckbox(value, id) {
      loginPopup.data.form[id] = value;
      delete loginPopup.data.errors[id];
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
const isRegister = computed<boolean>(() => loginPopup.data.mode === "register");

const sendRequest = async () => {
  switch (loginPopup.data.mode) {
    case "login":
      await auth.login(
        loginPopup.data.form.email,
        loginPopup.data.form.password
      );
      await router.push({ name: PageName.Orders });
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
        loginPopup.data.form.password,
        loginPopup.data.form.advertisingAgreement
      );

      loginPopup.data.mode = "code";
      break;
    case "code":
      await auth.registerConfirm(
        loginPopup.data.form.email,
        loginPopup.data.form.code
      );
      await router.push({ name: PageName.Orders });
      loginPopup.functions.onClose();
      loginPopup.data.mode = "login";
      break;
  }
};
const isHiddenInput = (id: LoginPopupNS.StringFormFields): boolean =>
  ["passwordRepeat", "password"].includes(id);
</script>

<style lang="css">
.login-popup {
  padding: 48px;
  display: flex;
}
.login-popup__inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 360px;
  max-width: 100%;
  height: fit-content;
  margin: auto;
}
.login-popup__form-checkbox-link {
  color: var(--red-60);
  font-weight: var(--font-weight-semibold);
}
</style>
