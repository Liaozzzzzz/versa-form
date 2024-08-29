<template>
  <transition
    :name="transitionName"
    @before-enter="collapseBeforeEnter"
    @enter="collapseEnter"
    @after-enter="collapseAfterEnter"
    @before-leave="collapseBeforeLeave"
    @leave="collapseLeave"
    @after-leave="collapseAfterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "FormCollapseTransition",
  props: {
    transitionName: {
      type: String,
      default: "collapse-transition",
    },
  },
  data() {
    return {
      prevPaddingTop: "",
      prevPaddingBottom: "",
      prevOverflow: "",
    };
  },
  methods: {
    collapseBeforeEnter(el) {
      this.prevPaddingBottom = el.style.paddingBottom;
      this.prevPaddingTop = el.style.paddingTop;
      el.style.paddingTop = "0";
      el.style.paddingBottom = "0";
      el.style.maxHeight = "0";
    },
    collapseEnter(el, done) {
      this.prevOverflow = el.style.overflow;

      el.style.maxHeight = el.scrollHeight > 0 ? el.scrollHeight + "px" : "0";
      el.style.paddingTop = this.prevPaddingTop;
      el.style.paddingBottom = this.prevPaddingBottom;
      el.style.overflow = "hidden";

      const onTransitionDone = () => {
        done();
        el.removeEventListener("transitionend", onTransitionDone, false);
        el.removeEventListener("transitioncancel", onTransitionDone, false);
      };

      el.addEventListener("transitionend", onTransitionDone, false);
      el.addEventListener("transitioncancel", onTransitionDone, false);
    },

    collapseAfterEnter(el) {
      el.style.maxHeight = "";
      el.style.overflow = this.prevOverflow;
    },

    collapseBeforeLeave(el) {
      this.prevPaddingBottom = el.style.paddingBottom;
      this.prevPaddingTop = el.style.paddingTop;
      this.prevOverflow = el.style.overflow;

      el.style.maxHeight = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    },

    collapseLeave(el, done) {
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = "0";
        el.style.paddingBottom = "0";
        el.style.paddingTop = "0";
      }
      const onTransitionDone = () => {
        done();
        el.removeEventListener("transitionend", onTransitionDone, false);
        el.removeEventListener("transitioncancel", onTransitionDone, false);
      };

      el.addEventListener("transitionend", onTransitionDone, false);
      el.addEventListener("transitioncancel", onTransitionDone, false);
    },
    collapseAfterLeave(el) {
      el.style.maxHeight = "";
      el.style.overflow = this.prevOverflow;
      el.style.paddingBottom = this.prevPaddingBottom;
      el.style.paddingTop = this.prevPaddingTop;

      this.prevOverflow = this.prevPaddingBottom = this.prevPaddingTop = "";
    },
  },
};
</script>

<style lang="scss">
.collapse-transition-enter-active,
.collapse-transition-leave-active {
  transition: height 0.3s ease-in-out, padding 0.3s ease-in-out,
    max-height 0.3s ease-in-out;
}
</style>
