<template>
  <VersaCard
    :class="[
      'versa-filter',
      {
        'versa-filter--emptyFooter': !$slots.footer,
      },
    ]"
    :title="filterTitle"
  >
    <VersaForm
      ref="formRef"
      v-model="formValues"
      :options="options"
      :defaultValues="defaultFilters"
      :label-width="labelWidth"
      :labelSuffix="labelSuffix"
      @onMounted="onMounted"
    >
      <template
        v-for="slotName in Object.keys($slots).filter(
          (item) => item !== 'footer'
        )"
        v-slot:[slotName]="attrs"
      >
        <slot :name="slotName" v-bind="attrs"></slot>
      </template>
      <template #footer>
        <!-- 套一层不一样的标签，让form的伪类样式生效 -->
        <section class="versa-filter__action">
          <!-- 提交按钮 -->
          <ElSpace class="versa-filter__action--wrap" :size="20">
            <template v-for="action in filterActions">
              <component
                v-if="action.is"
                v-bind="action"
                :is="action.is"
                v-on="action.on || {}"
              />
              <VersaButton
                v-else
                :key="action.actionType"
                :type="action.type"
                v-bind="action"
                @click="(e, instance) => onAction(action, instance)"
              >
                {{ action.actionName }}
              </VersaButton>
            </template>
            <slot name="btns" v-bind="proxyPageCore({ formValues })"> </slot>
          </ElSpace>
        </section>
      </template>
    </VersaForm>
    <div class="versa-filter__footer"><slot name="footer"></slot></div>
  </VersaCard>
</template>

<script>
import omit from "lodash/omit";
import pick from "lodash/pick";
import { ElSpace } from "element-plus";
import "element-plus/es/components/space/style/css";
import VersaForm from "./form.vue";
import VersaCard from "./card.vue";
import VersaButton from "./button.vue";
import { filterPropsMixins } from "./mixins/props";
import { formEmitter } from "./mixins/methods";
import { instanceProxy } from "./mixins/proxy";
import { hasOwnProperty, isObject } from "./utils";
import { presetActions } from "./config";

const filterPresetActions = pick(presetActions, ["reset", "create", "search"]);

export default {
  name: "versa-filter",
  components: {
    VersaForm,
    VersaCard,
    VersaButton,
    ElSpace,
  },
  mixins: [filterPropsMixins, formEmitter, instanceProxy],
  props: {
    /** 表单配置项 */
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  emits: ["onFilterChange", "onSearch", "onReset", "onMounted"],
  data() {
    return {
      formValues: {},
      isMounted: false,
    };
  },
  watch: {
    labelWidth: {
      handler(newVal) {
        document.body.style.setProperty(
          "--label-width",
          `${newVal}px`.replace(/(px)*$/, "px")
        );
      },
      immediate: true,
    },
    formValues: {
      handler(newVal) {
        if (!this.isMounted) {
          return false;
        }
        this.$emit("onFilterChange", newVal);
      },
      deep: true,
    },
  },
  computed: {
    filterActions() {
      let actionsToArr =
        typeof this.actions === "string"
          ? this.actions.split(",")
          : this.actions;

      if (typeof this.actions === "function") {
        actionsToArr = this.actions(this.formValues);
      }

      return actionsToArr
        ?.map((action) => {
          if (typeof action === "string") {
            return filterPresetActions[action];
          }
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
                  ? action.disabled.bind(this, this.formValues)
                  : action.disabled,
            };
          }
          return null;
        })
        .filter(Boolean);
    },
  },
  methods: {
    // 设置表单值
    setValues(newVal) {
      this.formValues = {
        ...this.formValues,
        ...newVal,
      };
    },
    // 校验
    validate(callback) {
      this.$refs.formRef.validate(callback);
    },
    clearValidate(props, callback) {
      this.$refs.formRef.clearValidate(props, callback);
    },
    filterNull() {
      const nullArr = ["", null, undefined];
      for (const key in this.formValues) {
        if (nullArr.includes(this.formValues[key])) {
          this.formValues[key] = null;
        }
        if (typeof this.formValues[key] === "string" && this.trim) {
          this.formValues[key] = this.formValues[key].trim();
        }
      }
      return this.formValues;
    },
    /** 初始化 */
    onMounted() {
      this.$emit("onFilterChange", this.formValues);
      this.$emit("onMounted", this.filterNull());
      this.isMounted = true;
    },
    // 搜索
    onSearch() {
      this.validate((valid) => {
        valid && this.$emit("onSearch", this.filterNull());
      });
    },
    // 重置
    onReset() {
      this.$refs.formRef.resetField();
      this.$refs.formRef.addInitValue();
      this.$nextTick(() => {
        this.$emit("onReset", this.filterNull());
      });
    },
    /** 操作按钮回调函数 */
    async onAction(action, instance) {
      switch (action.actionType) {
        case "reset":
          this.onReset();
          break;
        case "search":
          this.onSearch();
          break;
        case "create":
          this.dispatch(
            "versa-page",
            "VersaFormPageOnCreate",
            this.formValues,
            omit(action, ["actionType", "actionName", "action", "usePageModal"])
          );
          break;
        default:
          action.validate && (await this.$refs.formRef?.validate());
          action.action?.(this.formValues, instance, { ...action });
          break;
      }
    },
  },
};
</script>

<style lang="scss">
$input-width: 212px;
$input-width-single-line: 280px;

$input-width: 212px;
$input-width-single-line: 280px;

.versa-filter {
  background: #fff;
  border: 0 solid #e0efff;

  &--emptyFooter {
    padding-bottom: 4px;
  }

  &__action {
    margin-left: auto;
    margin-bottom: 20px;
  }

  .versa-form {
    display: flex;
    flex-wrap: wrap;

    .versa-form-item {
      margin-right: 60px;

      &:last-of-type {
        margin-right: 0;
      }
    }

    .versa-form-item-element {
      width: $input-width;
    }
  }
}
</style>
