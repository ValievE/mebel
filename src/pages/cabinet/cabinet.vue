<template>
  <div class="cabinet">
    <h1 class="cabinet__title">Личный кабинет</h1>
    <p v-if="auth.user" class="cabinet__welcome">
      Здравствуйте,
      <strong>{{ auth.user.first_name }} {{ auth.user.last_name }}</strong>
    </p>
    <p class="cabinet__text">
      Здесь позже появятся заказы, избранное и настройки профиля.
    </p>
    <ButtonComponent type="red" @click="onLogout">Выйти</ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ButtonComponent from "@/components/button-component/button-component.vue";
import { useAuthStore } from "@/stores/use-auth-store.ts";
import { PageName } from "@/router/consts.ts";

const auth = useAuthStore();
const router = useRouter();

async function onLogout() {
  await auth.logout();
  await router.push({ name: PageName.Catalog });
}
</script>

<style lang="css">
.cabinet {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.cabinet__title {
  margin-top: var(--header-height);
  font-size: 28px;
  font-weight: var(--font-weight-semibold);
  color: var(--gray-90);
}
.cabinet__welcome {
  color: var(--gray-70);
  margin: 0 0 12px;
}
.cabinet__text {
  color: var(--gray-60);
  margin: 0 0 24px;
  line-height: 1.5;
}
@media screen and (max-width: 768px) {
  .cabinet {
    padding-top: 120px;
  }
}
</style>
