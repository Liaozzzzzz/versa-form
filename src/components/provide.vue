<template><slot></slot></template>

<script>
import { computed } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { ProvideInjectionKey } from "./config";

export default {
  name: "versa-provide",
  provide() {
    return {
      [ProvideInjectionKey]: computed(() => {
        return {
          $$axios: this.axiosInstance,
          toastError: this.toastError,
        };
      }),
    };
  },
  props: {
    axiosInstance: {
      type: Function,
      default: () => () => {},
    },
    toastError: {
      type: Function,
      default: (message) => ElMessage({ message, type: "error" }),
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
