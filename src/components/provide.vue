<template><slot></slot></template>

<script>
import { computed } from "vue";
import { ProvideInjectionKey } from "./config";

export default {
  name: "versa-provide",
  provide() {
    return {
      [ProvideInjectionKey]: computed(() => {
        return {
          $$axios: this.axiosInstance,
        };
      }),
    };
  },
  props: {
    axiosInstance: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
