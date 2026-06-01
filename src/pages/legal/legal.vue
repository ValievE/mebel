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
import { LegalDocumentType } from "@/infrastructure/get-legal-document.ts";
import { onMounted, ref, watch } from "vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import { VueShowdown } from "vue-showdown";
import { useRoute } from "vue-router";
import { DocumentsTypeRoute } from "@/types/types.ts";

const route = useRoute();

const text = ref<string>("");
const title = ref<string>("");

const dictionary: Record<string, LegalDocumentType> = {
  [DocumentsTypeRoute.Data]: LegalDocumentType.DataProcessing,
  [DocumentsTypeRoute.Privacy]: LegalDocumentType.PrivacyPolicy
};

const getDocument = async (type: LegalDocumentType) => {
  try {
    const response = await infrastructure.getLegalDocument(type);

    text.value = response.text;
    title.value = response.title;
  } catch (e) {}
};

const init = () => {
  const type = dictionary[route.params?.id?.toString() || ""];

  if (!type) {
    return; // TODO: Редирект документ не найден
  }

  getDocument(type);
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
</style>
