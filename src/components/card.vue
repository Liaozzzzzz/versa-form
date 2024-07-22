<template>
  <div :class="['versa-card', { 'versa-card--hasTitle': title }]">
    <div class="versa-card__header" v-if="title">
      <div class="versa-card__title">
        {{ title }}
      </div>
      <div class="versa-card__action">
        <slot name="headerRight">
          <el-space :size="20">
            <template v-for="action in actions">
              <component
                :is="action.is"
                v-if="action.is"
                :key="action.is"
                v-bind="action"
                v-on="action.on || {}"
              />
              <VersaButton
                v-else
                :key="action.type"
                size="small"
                v-bind="action"
                @click="(e, instance) => onAction(action, instance)"
              />
            </template>
          </el-space>
        </slot>
      </div>
    </div>
    <div class="versa-card__content"><slot /></div>
  </div>
</template>

<script>
import { hasOwnProperty, isObject } from "./utils";
import VersaButton from "./button.vue";

export default {
  components: {
    VersaButton,
  },
  name: "versa-card",
  props: {
    title: {
      type: String,
    },
    /** 操作列表 */
    actions: Array,
  },
  computed: {
    /** 弹窗操作栏 */
    toolActions() {
      return (
        this.actions
          ?.map((action) => {
            if (
              (isObject(action) &&
                hasOwnProperty(action, "actionName") &&
                hasOwnProperty(action, "actionType")) ||
              action?.is
            ) {
              return {
                ...action,
                disabled:
                  typeof action.disabled === "function"
                    ? action.disabled.bind(this)
                    : action.disabled,
              };
            }
            return null;
          })
          .filter(Boolean) ?? []
      );
    },
  },
  methods: {
    /** 操作按钮回调函数 */
    async onAction(action, instance) {
      action.action?.(this.formValues, instance, action);
    },
  },
};
</script>

<style lang="scss">
.versa-card {
  position: relative;
  background: #fff;
  padding: 24px;
  border: 0 solid #e0efff;
  border-radius: 4px;
  transition: all 0.3s ease 0s;

  &--hasTitle {
    padding-top: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
  }

  &__title {
    padding-left: 12px;
    border-left: 4px solid #2f88ff;
    font-weight: 500;
    color: #333;
  }

  &__content {
    &--tools {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
  }
}
</style>
