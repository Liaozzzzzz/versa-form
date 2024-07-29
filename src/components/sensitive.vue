<template>
  <span class="versa-sensitive" v-if="!!renderValue">
    {{ renderValue }}
    <img
      class="versa-sensitive__icon"
      :src="visilbe ? eyeClose : eyeOpen"
      @click="onToggle"
    />
  </span>
</template>

<script>
import eyeClose from "./assets/eye-close.svg";
import eyeOpen from "./assets/eye-open.svg";
import { toDesensitive } from "./utils";

export default {
  name: "versa-sensitive",
  props: {
    value: [String, Number],
    sensitiveType: {
      type: [String, Function],
      default: "cellphone",
    },
  },
  data() {
    return {
      eyeClose,
      eyeOpen,
      visilbe: false,
    };
  },
  computed: {
    renderValue() {
      if ([null, undefined].includes(this.value)) {
        return "";
      }

      return this.visilbe
        ? this.value
        : toDesensitive(this.value + "", this.sensitiveType);
    },
  },
  methods: {
    onToggle() {
      this.visilbe = !this.visilbe;
    },
  },
};
</script>

<style lang="scss">
.versa-sensitive {
  display: flex;
  align-items: center;

  &__icon {
    margin-left: 12px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
