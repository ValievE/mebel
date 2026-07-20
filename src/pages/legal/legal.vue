<template>
  <div class="legal">
    <h1 class="legal__title">{{ title }}</h1>
    <div class="legal__content">
      <ScrollContainer>
        <VueShowdown class="legal__content-text" :markdown="text" tag="p" />
      </ScrollContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import infrastructure from "@/infrastructure";
import { onMounted, ref, watch } from "vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import { VueShowdown } from "vue-showdown";
import { useRoute } from "vue-router";
import { DocumentsTypeRoute } from "@/types/types.ts";

const route = useRoute();

const text = ref<string>("");
const title = ref<string>("");

const titles: Record<string, string> = {
  [DocumentsTypeRoute.Privacy]: "Политика конфиденциальности",
  [DocumentsTypeRoute.Offer]:
    "Договор публичной оферты интернет-магазина «Мебель вашего дома»",
  [DocumentsTypeRoute.Details]: "Реквизиты Продавца",
  [DocumentsTypeRoute.Return]:
    "Правила возврата и обмена товаров в интернет-магазине «Мебель вашего дома»"
};

const getDocument = async (id: string) => {
  try {
    const response = await infrastructure.getLegalDocument(id);
    text.value = response.text;
    title.value = titles[id] ?? id;
  } catch {
    text.value = "";
    title.value = "";
  }
};

const init = () => {
  const id = route.params?.id?.toString() || "";
  if (!id || !titles[id]) {
    return;
  }
  getDocument(id);
};

watch(
  () => route.params?.id,
  () => {
    init();
  }
);

onMounted(() => {
  init();
});
</script>

<style lang="css">
.legal {
  padding-top: var(--header-height);
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.legal__content {
  flex-grow: 1;
  border-radius: 24px;
  overflow: hidden;
}
.legal__content-text {
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2,
  h3 {
    margin-top: 16px;
  }
}

@media screen and (max-width: 768px) {
  .legal__content-text {
    padding-bottom: var(--footer-height);
  }
}
</style>
