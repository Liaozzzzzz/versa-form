<template>
  <div class="versa-collapse">
    <div class="versa-collapse__title" @click="toggleExpand">
      <slot name="title">
        <button type="button">展开/折叠</button>
      </slot>
    </div>
    <FormCollapseTransition>
      <div class="versa-collapse__content" v-show="expanded">
        <slot></slot>
      </div>
    </FormCollapseTransition>
  </div>
</template>

<script>
import FormCollapseTransition from "./form-collapse-transition.vue";
export default {
  name: "FormCollapse",
  components: {
    FormCollapseTransition,
  },
  props: {
    defaultExpanded: Boolean,
  },
  data() {
    return {
      expanded: this.defaultExpanded,
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style lang="scss">
.versa-collapse {
  &__title {
    margin-bottom: 10px;
    cursor: pointer;
  }
}
</style>
