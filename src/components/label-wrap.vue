<script>
import { h } from "vue";
export default {
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean,
  },

  inject: {
    VersaForm: {
      defaultVersaForm: null,
    },
    VersaFormItem: {
      default: null,
    },
  },

  watch: {
    computedWidth(val, oldVal) {
      if (this.updateAll) {
        this.VersaForm.registerLabelWidth(val, oldVal);
        this.VersaFormItem.updateComputedLabelWidth(val);
      }
    },
  },

  data() {
    return {
      computedWidth: 0,
    };
  },

  mounted() {
    this.updateLabelWidth("update");
  },

  updated() {
    this.updateLabelWidth("update");
  },

  beforeUnmount() {
    this.updateLabelWidth("remove");
  },
  methods: {
    getLabelWidth() {
      if (this.$el && this.$el.firstElementChild) {
        const computedWidth = window.getComputedStyle(
          this.$el.firstElementChild
        ).width;
        return Math.ceil(parseFloat(computedWidth));
      } else {
        return 0;
      }
    },
    updateLabelWidth(action = "update") {
      if (
        this.$slots.default &&
        this.isAutoWidth &&
        this.$el.firstElementChild
      ) {
        if (action === "update") {
          this.computedWidth = this.getLabelWidth();
        } else if (action === "remove") {
          this.VersaForm.deregisterLabelWidth(this.computedWidth);
        }
      }
    },
  },
  render() {
    const slots = this.$slots.default?.();

    if (!slots) {
      return null;
    }

    if (!this.isAutoWidth) {
      return slots[0];
    }

    const autoLabelWidth = this.VersaForm.autoLabelWidth;
    const style = {};
    if (autoLabelWidth && autoLabelWidth !== "auto") {
      const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth;
      if (marginLeft) {
        style.marginLeft = marginLeft + "px";
      }
    }

    return h(
      "div",
      { class: "versa-form-item__label-wrap", style },
      {
        default: () => slots,
      }
    );
  },
};
</script>
