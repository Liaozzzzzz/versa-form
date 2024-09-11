var Be = Object.defineProperty, Ue = Object.defineProperties;
var We = Object.getOwnPropertyDescriptors;
var ve = Object.getOwnPropertySymbols;
var Ze = Object.prototype.hasOwnProperty, He = Object.prototype.propertyIsEnumerable;
var be = (e, t, s) => t in e ? Be(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, u = (e, t) => {
  for (var s in t || (t = {}))
    Ze.call(t, s) && be(e, s, t[s]);
  if (ve)
    for (var s of ve(t))
      He.call(t, s) && be(e, s, t[s]);
  return e;
}, m = (e, t) => Ue(e, We(t));
var I = (e, t, s) => new Promise((i, a) => {
  var r = (d) => {
    try {
      o(s.next(d));
    } catch (p) {
      a(p);
    }
  }, n = (d) => {
    try {
      o(s.throw(d));
    } catch (p) {
      a(p);
    }
  }, o = (d) => d.done ? i(d.value) : Promise.resolve(d.value).then(r, n);
  o((s = s.apply(e, t)).next());
});
import Qe from "lodash/camelCase";
import de from "lodash/upperFirst";
import { h, unref as Se, resolveComponent as b, openBlock as f, createElementBlock as v, normalizeClass as H, createElementVNode as C, toDisplayString as x, renderSlot as _, createVNode as D, withCtx as g, Fragment as S, renderList as L, createBlock as w, resolveDynamicComponent as z, mergeProps as M, toHandlers as E, createTextVNode as B, createCommentVNode as P, Transition as Ge, withDirectives as ce, vShow as Je, defineAsyncComponent as Ve, createSlots as O, normalizeProps as k, guardReactiveProps as F, resolveDirective as qe, normalizeStyle as Ie, computed as je } from "vue";
import Y from "lodash/pick";
import Q from "lodash/mapKeys";
import pe from "tiny-emitter";
import $ from "lodash/omit";
import { ElOption as we, ElOptionGroup as Ke, ElSelect as Xe, ElMessageBox as _e, ElButton as et, ElPopconfirm as tt, ElSpace as G, ElTooltip as st, ElRadioButton as it, ElRadio as rt, ElRadioGroup as at, ElIcon as lt, ElImage as ot, ElCheckboxButton as nt, ElCheckbox as ut, ElCheckboxGroup as dt, ElRow as ct, ElCol as pt, ElTable as ht, ElEmpty as ft, ElPagination as mt, ElLoading as De, ElTableColumn as W, ElDialog as yt, ElDrawer as gt, ElDropdownItem as Mt, ElDropdown as vt, ElDropdownMenu as bt, ElMessage as wt } from "element-plus";
import "element-plus/theme-chalk/src/space.scss";
import ee from "lodash/cloneDeep";
import ae from "lodash/kebabCase";
import "element-plus/theme-chalk/src/col.scss";
import "element-plus/theme-chalk/src/row.scss";
import "element-plus/theme-chalk/src/option.scss";
import "element-plus/theme-chalk/src/option-group.scss";
import "element-plus/theme-chalk/src/select.scss";
import "element-plus/theme-chalk/src/tag.scss";
import J from "lodash/get";
import _t from "dayjs";
import Lt from "async-validator";
import "element-plus/theme-chalk/src/tooltip.scss";
import Nt from "lodash/debounce";
import "element-plus/theme-chalk/src/button.scss";
import "element-plus/theme-chalk/src/popconfirm.scss";
import "element-plus/theme-chalk/src/message-box.scss";
import "element-plus/theme-chalk/src/radio.scss";
import "element-plus/theme-chalk/src/radio-button.scss";
import "element-plus/theme-chalk/src/radio-group.scss";
import { Plus as Ct, Delete as St } from "@element-plus/icons-vue";
import Vt from "lodash/ceil";
import "element-plus/theme-chalk/src/icon.scss";
import "element-plus/theme-chalk/src/image.scss";
import "element-plus/theme-chalk/src/image-viewer.scss";
import "element-plus/theme-chalk/src/checkbox-button.scss";
import "element-plus/theme-chalk/src/checkbox.scss";
import "element-plus/theme-chalk/src/checkbox-group.scss";
import It from "lodash/isFunction";
import jt from "lodash/upperCase";
import "element-plus/theme-chalk/src/table.scss";
import "element-plus/theme-chalk/src/empty.scss";
import "element-plus/theme-chalk/src/pagination.scss";
import "element-plus/theme-chalk/src/table-column.scss";
import "element-plus/theme-chalk/src/loading.scss";
import "element-plus/theme-chalk/src/dialog.scss";
import "element-plus/theme-chalk/src/drawer.scss";
import "element-plus/theme-chalk/src/dropdown-item.scss";
import "element-plus/theme-chalk/src/dropdown.scss";
import "element-plus/theme-chalk/src/dropdown-menu.scss";
import "element-plus/theme-chalk/src/message.scss";
const q = (e) => ["", null, void 0].includes(e), A = (e) => e, V = (e) => Object.prototype.toString.call(e).toLocaleLowerCase() === "[object object]", j = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function X(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
const Dt = (e, t) => {
  if (!e)
    return "";
  let s = e.toString();
  if (t === "cellphone")
    return s.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2");
  if (t === "identity")
    return s.replace(/^(.{4})(?:\d+)(.{4})$/, "$1**********$2");
  if (typeof t == "function")
    return t(e);
}, Tt = () => Math.random().toString(36).slice(2), Le = (e = {}) => {
  const t = {};
  for (const s in e)
    t[/^on[A-Z].*/.test(s) ? s : `on${de(s)}`] = e[s];
  return t;
};
const Te = {
  inheritAttrs: !1,
  name: "versa-select",
  props: {
    // 是否有全部
    hasAll: {
      type: Boolean,
      default: !1
    },
    // 全部的value
    valueOfAll: {
      type: String,
      default: "SELECT_ALL_999999"
    },
    // 是否多谢
    multiple: {
      type: Boolean,
      default: !1
    },
    // 表单值
    modelValue: {
      type: [Array, String, Number, Object],
      default() {
        return null;
      }
    },
    // 选项列表
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    // 渲染map对象
    mapSource: {
      type: Object
    },
    labelInValue: {
      type: [Object, Boolean],
      default: !1
    },
    status: {
      type: String,
      default: "edit"
    }
  },
  emits: ["update:modelValue"],
  computed: {
    mergedHasAll() {
      return this.hasAll && !this.multiple;
    },
    mergedOptions() {
      const e = [];
      return this.mapSource ? Object.keys(this.mapSource).forEach((t) => {
        e.push({
          label: this.mapSource[t],
          value: t
        });
      }) : e.push(...this.options), this.mergedHasAll && e.unshift({
        label: "全部",
        value: this.valueOfAll
      }), e;
    },
    innerValue: {
      get() {
        var s;
        const e = X(this.modelValue), t = this.labelInValue ? (s = e == null ? void 0 : e.map(
          (i) => {
            var a, r;
            return i[(r = (a = this.labelInValue) == null ? void 0 : a.value) != null ? r : "value"];
          }
        )) != null ? s : [] : e;
        return this.multiple ? t : q(t[0]) && this.mergedHasAll ? this.valueOfAll : t[0];
      },
      set(e) {
        var a, r;
        if (!this.labelInValue || e === this.valueOfAll || q(e)) {
          this.$emit(
            "update:modelValue",
            e === this.valueOfAll ? null : e
          );
          return;
        }
        const t = X(e), i = ((r = (a = this.mergedOptions) == null ? void 0 : a.filter(
          (n) => t.includes(n.value)
        )) != null ? r : []).map((n) => {
          let o = Y(n, ["label", "value"]);
          return V(this.labelInValue) && (o = Q(o, (d, p) => this.labelInValue[p] || p)), o;
        });
        this.$emit(
          "update:modelValue",
          this.multiple ? i : i[0]
        );
      }
    },
    /** 是否预览状态 */
    isPreview() {
      return this.status === "preview";
    },
    /** 预览状态的显示内容 */
    previewText() {
      var t;
      if (!this.isPreview)
        return "";
      const e = X(this.innerValue);
      return (t = this.mergedOptions) == null ? void 0 : t.filter((s) => e.includes(s.value)).map((s) => s.label).join("、");
    }
  },
  render() {
    if (this.isPreview)
      return h(
        "div",
        {
          ref: "renderText",
          class: "versa-form__item--preview"
        },
        this.previewText
      );
    const e = this.mergedOptions.map((a) => {
      var d, p, l;
      const r = {
        label: a.label,
        value: a.value,
        disabled: a.disabled
      }, n = ((d = a.children) == null ? void 0 : d.length) > 0, o = (l = (p = a.children) == null ? void 0 : p.map((c) => {
        const y = {
          props: {
            label: c.label,
            value: c.value,
            disabled: c.disabled
          }
        };
        return h(we, y);
      })) != null ? l : [];
      return h(n ? Ke : we, r, {
        default: () => o
      });
    }), t = Object.keys(this.$slots).map((a) => a === "default" ? this.$slots[a]() : this.$slots[a]()), s = [...e, ...t], i = m(u({
      teleported: !1
    }, this.$attrs), {
      multiple: this.multiple,
      modelValue: this.innerValue,
      "onUpdate:modelValue": (a) => this.innerValue = a,
      class: `versa-select ${this.$attrs.class || ""}`,
      ref: "versaSelectRef"
    });
    return h(Xe, i, {
      default: () => s
    });
  }
}, At = {
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },
  inject: {
    VersaForm: {
      defaultVersaForm: null
    },
    VersaFormItem: {
      default: null
    }
  },
  watch: {
    computedWidth(e, t) {
      this.updateAll && (this.VersaForm.registerLabelWidth(e, t), this.VersaFormItem.updateComputedLabelWidth(e));
    }
  },
  data() {
    return {
      computedWidth: 0
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
        const e = window.getComputedStyle(
          this.$el.firstElementChild
        ).width;
        return Math.ceil(parseFloat(e));
      } else
        return 0;
    },
    updateLabelWidth(e = "update") {
      this.$slots.default && this.isAutoWidth && this.$el.firstElementChild && (e === "update" ? this.computedWidth = this.getLabelWidth() : e === "remove" && this.VersaForm.deregisterLabelWidth(this.computedWidth));
    }
  },
  render() {
    var i, a;
    const e = (a = (i = this.$slots).default) == null ? void 0 : a.call(i);
    if (!e)
      return null;
    if (!this.isAutoWidth)
      return e[0];
    const t = this.VersaForm.autoLabelWidth, s = {};
    if (t && t !== "auto") {
      const r = parseInt(t, 10) - this.computedWidth;
      r && (s.marginLeft = r + "px");
    }
    return h(
      "div",
      { class: "versa-form-item__label-wrap", style: s },
      {
        default: () => e
      }
    );
  }
}, xt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmNjO29wYWNpdHk6MDt9LmJ7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTc1NiAtMTk4KSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTc1NiAxOTgpIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik05LjgyMyw4NS42MzFhNy42NzUsNy42NzUsMCwwLDEtNy42NjctNy42NjcuNzg0Ljc4NCwwLDEsMSwxLjU2NywwQTYuMSw2LjEsMCwxLDAsNi4zOTIsNzIuOTJhLjc4My43ODMsMCwxLDEtLjg4Mi0xLjI5Myw3LjY2Nyw3LjY2NywwLDEsMSw0LjMxMywxNFpNMS4wNzYsNzkuMzU4YS41NzUuNTc1LDAsMCwxLS4zMzQtLjEuNTg3LjU4NywwLDAsMS0uMTQ4LS44MTdsMS41MjYtMi4yYS41ODcuNTg3LDAsMSwxLC45NjUuNjY5bC0xLjUyNiwyLjJBLjU4Ny41ODcsMCwwLDEsMS4wNzYsNzkuMzU4Wk00LjgsNzguNjg0YS41NzUuNTc1LDAsMCwxLS4zMzQtLjFsLTIuMi0xLjUyNmEuNTg3LjU4NywwLDAsMSwuNjY5LS45NjVsMi4yLDEuNTI2QS41ODcuNTg3LDAsMCwxLDQuOCw3OC42ODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzU2LjYxNiAxMjkuNykiLz48L2c+PC9zdmc+", Ot = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZhOGE4O29wYWNpdHk6MDt9LmJ7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTYyMyAtMTk3KSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYyMyAxOTcpIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0xNS44MTgsMTUuOGMtLjI4Mi4yODQtLjk3LjE3LS45Ny4xN2wtMy4wODEtMy4wODRhNy4yNCw3LjI0LDAsMSwxLDEuMTIzLTEuMTIzbDMuMDgxLDMuMDgxcy4xMjYuNjc3LS4xNTMuOTU2Wk0xMi45Niw3LjI0OGE1LjcsNS43LDAsMSwwLTUuNyw1LjcsNS43LDUuNywwLDAsMCw1LjctNS43WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYyNS42OTggMTk5LjAwNikiLz48L2c+PC9zdmc+", Ae = Symbol("PageCore"), xe = Symbol("Provide"), te = {
  reset: {
    actionType: "reset",
    actionName: "重置",
    actionIcon: xt
  },
  search: {
    type: "primary",
    actionType: "search",
    actionName: "查询",
    actionIcon: Ot
  },
  create: {
    actionType: "create",
    actionName: "新建"
  },
  remove: {
    actionType: "remove",
    actionName: "删除",
    popconfirm: {
      title: "确定删除吗？",
      confirmType: "messageBox",
      message: "数据删除后不可恢复"
    }
  },
  edit: {
    actionType: "edit",
    actionName: "编辑"
  },
  save: {
    actionType: "save",
    actionName: "保存"
  },
  detail: {
    actionType: "detail",
    actionName: "详情"
  },
  up: {
    actionType: "up",
    actionName: "上移"
  },
  down: {
    actionType: "down",
    actionName: "下移"
  },
  cancel: {
    actionType: "cancel",
    actionName: "取消"
  }
}, zt = {
  date: {
    format: "YYYY-MM-DD",
    "value-format": "YYYY-MM-DD"
  },
  dates: {
    format: "YYYY-MM-DD",
    "value-format": "YYYY-MM-DD"
  },
  daterange: {
    format: "YYYY-MM-DD",
    "value-format": "YYYY-MM-DD"
  },
  datetime: {
    format: "YYYY-MM-DD HH-mm-ss",
    "value-format": "YYYY-MM-DD HH-mm-ss",
    "default-time": new Date(2e3, 1, 1, 0, 0, 0)
  },
  datetimerange: {
    format: "YYYY-MM-DD HH-mm-ss",
    "value-format": "YYYY-MM-DD HH-mm-ss",
    "default-time": [new Date(2e3, 1, 1, 0, 0, 0), new Date(2e3, 1, 1, 23, 59, 59)]
  },
  month: {
    format: "YYYY-MM",
    "value-format": "YYYY-MM"
  },
  monthrange: {
    format: "YYYY-MM",
    "value-format": "YYYY-MM"
  },
  year: {
    format: "YYYY",
    "value-format": "YYYY"
  }
}, he = {
  inject: {
    injectedPageCore: {
      from: Ae,
      default: {}
    },
    formCore: {
      from: "VersaForm",
      default: () => ({})
    }
  },
  computed: {
    pageCore() {
      return Se(this.injectedPageCore);
    }
  },
  methods: {
    proxyPageCore(e) {
      return new Proxy(e != null && e.$ ? e : u(u({}, e), this.pageCore), {
        get: (t, s) => ["formCore", "pageCore"].includes(s) ? this[s] : j(this.pageCore, s) ? Reflect.get(this.pageCore, s) : Reflect.get(t, s),
        set(t, s, i) {
          return Reflect.set(t, s, i);
        }
      });
    }
  }
};
const Pt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0Ny45OTgiIHZpZXdCb3g9IjAgMCA0OCA0Ny45OTgiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOiNmZmJlMWI7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTA0Ljc3NSw0OC41NTlhMjQsMjQsMCwxLDAsMjQsMjRBMjQsMjQsMCwwLDAsMTA0Ljc3NSw0OC41NTlabTAsMzkuODc1YTMuMDU5LDMuMDU5LDAsMSwxLDMuMDU5LTMuMDU5QTMuMDU5LDMuMDU5LDAsMCwxLDEwNC43NzUsODguNDM0Wm0zLjA2LTEyLjk4MWEzLjA1OSwzLjA1OSwwLDAsMS02LjExOSwwVjYyLjRhMy4wNTksMy4wNTksMCwwLDEsNi4xMTksMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04MC43NzUgLTQ4LjU1OSkiLz48L3N2Zz4=", Et = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MzkiIGhlaWdodD0iMTIuNzM2IiB2aWV3Qm94PSIwIDAgMTIuNzM5IDEyLjczNiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6IzY2NjtmaWxsLXJ1bGU6ZXZlbm9kZDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMS42MDguMjA4LDYuMzc1LDUuNDQxLDEuMTQyLjIwOEEuNjgxLjY4MSwwLDAsMCwuNjc1LjAyMWEuNjI3LjYyNywwLDAsMC0uNDU3LjIuNjI3LjYyNywwLDAsMC0uMi40NTcuNjgxLjY4MSwwLDAsMCwuMTg3LjQ2N2w1LjIzNiw1LjIzTC4yMDgsMTEuNjA4YS42MzcuNjM3LDAsMCwwLS4xNzcuNjQ0LjYuNiwwLDAsMCwuNDU3LjQ2Ny42NjcuNjY3LDAsMCwwLC42NTQtLjE3N0w2LjM3NSw3LjMwOWw1LjIzMyw1LjIzM2EuNjYxLjY2MSwwLDAsMCwuOTM0LS45MzRMNy4zMDksNi4zNzVsNS4yMzMtNS4yMzNBLjYzNy42MzcsMCwwLDAsMTIuNzE5LjVhLjYuNiwwLDAsMC0uNDY3LS40NjcuNjM3LjYzNywwLDAsMC0uNjQ0LjE3NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAwNiAtMC4wMDcpIi8+PC9zdmc+", kt = (e) => _e(m(u({
  message: () => h("div", { class: "versa-message-box__container" }, [
    h("img", {
      src: Et,
      class: "versa-message-box__close",
      onClick: () => {
        _e.close();
      }
    }),
    h(
      "div",
      {
        class: "versa-message-box__content"
      },
      [
        h("img", {
          src: Pt,
          class: "versa-message-box__icon"
        }),
        h("div", { class: "versa-message-box__wrap" }, [
          q(e.title) ? void 0 : h(
            "div",
            {
              class: "versa-message-box__title"
            },
            e.title
          ),
          h("div", {
            class: "versa-message-box__message",
            innerHTML: e.message
          })
        ])
      ]
    )
  ]),
  showCancelButton: !0
}, $(e, ["title", "message", "type"])), {
  customClass: `versa-message-box ${e.customClass || ""}`
}));
const R = {
  name: "versa-button",
  inheritAttrs: !1,
  mixins: [he],
  props: {
    debounce: {
      type: Number,
      default: 200
    },
    leading: {
      type: Boolean,
      default: !0
    },
    trailing: {
      type: Boolean,
      default: !1
    },
    /** 外部控制loading */
    loading: {
      type: Boolean
    },
    /** 按钮文案 */
    buttonText: {
      type: String
    },
    /** 二次弹窗校验 */
    popconfirm: {
      type: [String, Object]
    },
    /** 是否禁用 */
    disabled: {
      type: [Boolean, Function]
    }
  },
  emits: ["click"],
  data() {
    return {
      isLoading: !1,
      text: ""
    };
  },
  computed: {
    /** 二次确认弹窗参数 */
    confirmProps() {
      return u({
        confirmType: "messageBox"
      }, typeof this.popconfirm == "string" ? { title: this.popconfirm } : this.popconfirm);
    },
    /** 二次弹窗是否为popconfirm */
    isPopconfirm() {
      return this.popconfirm && this.confirmProps.confirmType === "popconfirm";
    },
    /** 二次弹窗是否为messageBox */
    isMessageBox() {
      return this.popconfirm && this.confirmProps.confirmType === "messageBox";
    },
    /** 按钮防抖 */
    debouncedClick() {
      return Nt(
        (e) => {
          if (!this.isMessageBox)
            return this.$emit("click", e, this.proxyPageCore(this));
          kt(this.confirmProps).then(() => {
            this.$emit("click", e, this.proxyPageCore(this));
          }).catch(() => {
            var t, s;
            (s = (t = this.$attrs).onCancel) == null || s.call(t);
          });
        },
        this.debounce,
        {
          leading: this.leading,
          trailing: this.trailing
        }
      );
    },
    /** 是否禁用 */
    isDisabled() {
      return typeof this.disabled == "function" ? this.disabled(this.proxyPageCore(this)) : this.disabled;
    }
  },
  watch: {
    /** 允许外部loading状态直接控制内部loading */
    loading: {
      handler() {
        this.isLoading = this.loading;
      },
      immediate: !0
    },
    /** 外部文案联动 */
    buttonText: {
      handler() {
        this.text = this.buttonText;
      },
      immediate: !0
    }
  },
  render() {
    const e = m(u({}, $(this.$attrs, [
      "actionType",
      "actionName",
      "actions",
      "actionIcon"
    ])), {
      loading: this.isLoading,
      onClick: this.isPopconfirm ? A : this.debouncedClick,
      disabled: this.isDisabled,
      class: ["versa-button", this.$attrs.class],
      ref: "versaButton"
    }), t = h(et, e, {
      default: () => {
        var s, i;
        return [
          this.$attrs.actionIcon ? h("span", {
            class: "versa-button__icon",
            style: `background:url(${this.$attrs.actionIcon}) center center no-repeat;`
          }) : null,
          this.text || ((i = (s = this.$slots).default) == null ? void 0 : i.call(s))
        ];
      }
    });
    return this.isPopconfirm ? h(
      tt,
      m(u({}, this.confirmProps), {
        onCancel: this.$attrs.onCancel || A,
        onConfirm: this.debouncedClick
      }),
      {
        reference: () => t
      }
    ) : t;
  }
};
const T = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, a] of t)
    s[i] = a;
  return s;
}, Ft = {
  components: {
    VersaButton: R,
    ElSpace: G
  },
  name: "versa-card",
  props: {
    title: {
      type: String
    },
    /** 操作列表 */
    actions: Array
  },
  computed: {
    /** 弹窗操作栏 */
    toolActions() {
      var e, t;
      return (t = (e = this.actions) == null ? void 0 : e.map((s) => V(s) && j(s, "actionName") && j(s, "actionType") || s != null && s.is ? m(u({}, s), {
        disabled: typeof s.disabled == "function" ? s.disabled.bind(this) : s.disabled
      }) : null).filter(Boolean)) != null ? t : [];
    }
  },
  methods: {
    /** 操作按钮回调函数 */
    onAction(e, t) {
      return I(this, null, function* () {
        var s;
        (s = e.action) == null || s.call(e, this.formValues, t, e);
      });
    }
  }
}, Yt = {
  key: 0,
  class: "versa-card__header"
}, Rt = { class: "versa-card__title" }, $t = { class: "versa-card__action" }, Bt = { class: "versa-card__content" };
function Ut(e, t, s, i, a, r) {
  const n = b("VersaButton"), o = b("ElSpace");
  return f(), v("div", {
    class: H(["versa-card", { "versa-card--hasTitle": s.title }])
  }, [
    s.title ? (f(), v("div", Yt, [
      C("div", Rt, x(s.title), 1),
      C("div", $t, [
        _(e.$slots, "headerRight", {}, () => [
          D(o, { size: 20 }, {
            default: g(() => [
              (f(!0), v(S, null, L(r.toolActions, (d) => (f(), v(S, null, [
                d.is ? (f(), w(z(d.is), M({
                  key: d.is,
                  ref_for: !0
                }, d, E(d.on || {})), null, 16)) : (f(), w(n, M({
                  key: d.type,
                  size: "small",
                  ref_for: !0
                }, d, {
                  onClick: (p, l) => r.onAction(d, l)
                }), {
                  default: g(() => [
                    B(x(d.actionName), 1)
                  ]),
                  _: 2
                }, 1040, ["onClick"]))
              ], 64))), 256))
            ]),
            _: 1
          })
        ])
      ])
    ])) : P("", !0),
    C("div", Bt, [
      _(e.$slots, "default")
    ])
  ], 2);
}
const se = /* @__PURE__ */ T(Ft, [["render", Ut]]), Wt = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg4OTUyOTY3NzIwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MzkiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTg3NC4wNDU0NCAxNDkuOTU0NTZhMzAuNzIgMzAuNzIgMCAwIDEgMCA0My40NTg1NkwxOTMuNDEzMTIgODc0LjA0NTQ0YTMwLjcyIDMwLjcyIDAgMSAxLTQzLjQ1ODU2LTQzLjQ1ODU2TDgzMC41ODY4OCAxNDkuOTU0NTZhMzAuNzIgMzAuNzIgMCAwIDEgNDMuNDU4NTYgMHogbS0xNC4yOTUwNCAxNjUuODg4QzkzNi41NTA0IDM3My4zMDk0NCA5ODMuMDQgNDQ0LjY4MjI0IDk4My4wNCA1MTJjMCAxNTMuMzEzMjgtMjI4LjEwNjI0IDMwNy4yLTQ3MS4wNCAzMDcuMi00My45NTAwOCAwLTg3LjQ3MDA4LTQuNzUxMzYtMTI5Ljc2MTI4LTEzLjk0Njg4YTMwLjcyIDMwLjcyIDAgMSAxIDEzLjA2NjI0LTYwLjA0NzM2QzQzMy4zMzYzMiA3NTMuNDc5NjggNDcyLjQ3MzYgNzU3Ljc2IDUxMiA3NTcuNzZjMjEyLjk1MTA0IDAgNDA5LjYtMTMyLjY2OTQ0IDQwOS42LTI0NS43NiAwLTQ0Ljg5MjE2LTM1LjkwMTQ0LTEwMC4wMDM4NC05OC42NTIxNi0xNDYuOTY0NDhhMzAuNzIgMzAuNzIgMCAwIDEgMzYuODAyNTYtNDkuMTkyOTZ6TTUxMiAyMDQuOGM0NC4zMzkyIDAgODguMjY4OCA0Ljg1Mzc2IDEzMC45MDgxNiAxNC4yMTMxMmEzMC43MiAzMC43MiAwIDAgMS0xMy4xNjg2NCA2MC4wMDY0QTU0OS42NjI3MiA1NDkuNjYyNzIgMCAwIDAgNTEyIDI2Ni4yNEMyOTkuMDQ4OTYgMjY2LjI0IDEwMi40IDM5OC45MDk0NCAxMDIuNCA1MTJjMCA0NS4zODM2OCAzNi43MDAxNiAxMDEuMTkxNjggMTAwLjY1OTIgMTQ4LjQzOTA0YTMwLjcyIDMwLjcyIDAgMSAxLTM2LjUxNTg0IDQ5LjQxODI0Qzg4LjM5MTY4IDY1Mi4xMDM2OCA0MC45NiA1ODAuMDE0MDggNDAuOTYgNTEyYzAtMTUzLjMxMzI4IDIyOC4xMDYyNC0zMDcuMiA0NzEuMDQtMzA3LjJ6IG0xNzIuNDIxMTIgMjgzLjA5NTA0YTE3NC4wOCAxNzQuMDggMCAwIDEtMTk3LjAxNzYgMTk2LjQ2NDY0IDMwLjcyIDMwLjcyIDAgMSAxIDguNjAxNi02MC44MjU2IDExMi42NCAxMTIuNjQgMCAwIDAgMTI3LjU0OTQ0LTEyNy4xODA4IDMwLjcyIDMwLjcyIDAgMSAxIDYwLjg2NjU2LTguNDU4MjR6TTUxMiAzMzcuOTJjOC4zNTU4NCAwIDE2LjYyOTc2IDAuNTkzOTIgMjQuODIxNzYgMS43NjEyOGEzMC43MiAzMC43MiAwIDEgMS04LjcwNCA2MC44MjU2IDExMi42NCAxMTIuNjQgMCAwIDAtMTI3LjU2OTkyIDEyOC4wMjA0OCAzMC43MiAzMC43MiAwIDEgMS02MC43ODQ2NCA4LjkwODhBMTc0LjA4IDE3NC4wOCAwIDAgMSA1MTIgMzM3LjkyeiIgZmlsbD0iIzcwNzA3MCIgcC1pZD0iMTY0MCI+PC9wYXRoPjwvc3ZnPg==", Zt = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg4OTUzMDE1MjgyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1NDUiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTUxMiAyMDQuOGMyNDIuOTMzNzYgMCA0NzEuMDQgMTUzLjg4NjcyIDQ3MS4wNCAzMDcuMlM3NTQuOTMzNzYgODE5LjIgNTEyIDgxOS4yIDQwLjk2IDY2NS4zMTMyOCA0MC45NiA1MTJzMjI4LjEwNjI0LTMwNy4yIDQ3MS4wNC0zMDcuMnogbTAgNjEuNDRDMjk5LjA0ODk2IDI2Ni4yNCAxMDIuNCAzOTguOTA5NDQgMTAyLjQgNTEyczE5Ni42NDg5NiAyNDUuNzYgNDA5LjYgMjQ1Ljc2IDQwOS42LTEzMi42Njk0NCA0MDkuNi0yNDUuNzYtMTk2LjY0ODk2LTI0NS43Ni00MDkuNi0yNDUuNzZ6IG0wIDcxLjY4YTE3NC4wOCAxNzQuMDggMCAxIDEgMCAzNDguMTYgMTc0LjA4IDE3NC4wOCAwIDAgMSAwLTM0OC4xNnogbTAgNjEuNDRhMTEyLjY0IDExMi42NCAwIDEgMCAwIDIyNS4yOCAxMTIuNjQgMTEyLjY0IDAgMCAwIDAtMjI1LjI4eiIgZmlsbD0iIzcwNzA3MCIgcC1pZD0iMTU0NiI+PC9wYXRoPjwvc3ZnPg==";
const Ht = {
  name: "versa-sensitive",
  props: {
    value: [String, Number],
    sensitiveType: {
      type: [String, Function],
      default: "cellphone"
    }
  },
  data() {
    return {
      eyeClose: Wt,
      eyeOpen: Zt,
      visilbe: !1
    };
  },
  computed: {
    renderValue() {
      return [null, void 0].includes(this.value) ? "" : this.visilbe ? this.value : Dt(this.value + "", this.sensitiveType);
    }
  },
  methods: {
    onToggle() {
      this.visilbe = !this.visilbe;
    }
  }
}, Qt = {
  key: 0,
  class: "versa-sensitive"
}, Gt = ["src"];
function Jt(e, t, s, i, a, r) {
  return r.renderValue ? (f(), v("span", Qt, [
    B(x(r.renderValue) + " ", 1),
    C("img", {
      class: "versa-sensitive__icon",
      src: a.visilbe ? a.eyeClose : a.eyeOpen,
      onClick: t[0] || (t[0] = (...n) => r.onToggle && r.onToggle(...n))
    }, null, 8, Gt)
  ])) : P("", !0);
}
const Oe = /* @__PURE__ */ T(Ht, [["render", Jt]]), qt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZjZGNkO29wYWNpdHk6MDt9LmJ7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE2NSAtODIpIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTY1IDgyKSIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNDAsNDhhOCw4LDAsMSwxLDgtOEE4LDgsMCwwLDEsNDAsNDhabTAtMS4wNjdBNi45MzMsNi45MzMsMCwxLDAsMzMuMDY3LDQwLDYuOTMzLDYuOTMzLDAsMCwwLDQwLDQ2LjkzM1ptLjY2Ny01LjQzOHYuMzc0SDM5LjMzM3YtLjM3NGEzLjQsMy40LDAsMCwxLC45OC0yLjI3OGMuNDQxLS40Ny40MjktLjQ1Ny41NTUtLjYwNmExLjUyNiwxLjUyNiwwLDAsMCwuNDY1LTEuMDEsMS4zMzMsMS4zMzMsMCwwLDAtMi42NjcsMEgzNy4zMzNhMi42NjcsMi42NjcsMCwxLDEsNS4zMzMsMCwyLjc3OSwyLjc3OSwwLDAsMS0uNzc4LDEuODY4Yy0uMDg3LjEtLjE4MS4yMS0uMy4zMzUtLjA0NS4wNDgtLjA5MS4xLS4xNTMuMTYzbC0uMTUzLjE2M0EyLjExOCwyLjExOCwwLDAsMCw0MC42NjcsNDEuNDk1Wm0tLjEsMS45MzhhLjguOCwwLDAsMSwwLDEuMTM3LjgwOC44MDgsMCwwLDEtMS4xMjksMCwuOC44LDAsMCwxLDAtMS4xMzcuOC44LDAsMCwxLDEuMTI5LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTM1IDUyKSIvPjwvZz48L3N2Zz4=", Ne = {
  name: "versa-form-item",
  inheritAttrs: !1,
  props: {
    status: {
      type: String,
      default: "edit"
    },
    tips: String,
    tooltip: String,
    hasToolTip: Boolean,
    label: String,
    labelWidth: String,
    /** label样式 */
    labelType: [String, Object],
    prop: String,
    required: {
      type: Boolean,
      default: void 0
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: ""
    },
    showMessage: {
      type: Boolean,
      default: !0
    },
    size: String
  },
  provide() {
    return {
      VersaFormItem: this
    };
  },
  inject: {
    VersaForm: {
      default: null
    }
  },
  data() {
    return {
      validateState: "",
      validateMessage: "",
      computedLabelWidth: "",
      fields: []
    };
  },
  computed: {
    /** 标签配置 */
    labelConfig() {
      const e = {
        border: !0,
        type: "line"
      };
      return typeof this.labelType == "string" ? m(u({}, e), {
        type: this.labelType
      }) : V(this.labelType) ? u(u({}, e), this.labelType) : e;
    },
    optionConfig() {
      return this.$attrs.optionConfig || {};
    },
    interceptPreview() {
      return this.status === "preview" && !this.optionConfig.useCustomPreview;
    },
    previewText() {
      if (!this.interceptPreview)
        return "";
      const { format: e, element: t } = this.optionConfig;
      return /.*date.*/.test(t) ? X(this.fieldValue).map((i) => q(i) ? null : typeof e == "string" ? _t(i).format(e) : i).filter(Boolean).join(" ~ ") : typeof e == "function" ? e(this.fieldValue, this.optionConfig) : this.fieldValue;
    },
    labelFor() {
      return this.for || this.prop;
    },
    labelStyle() {
      const e = {};
      if (this.VersaForm.labelPosition === "top")
        return e;
      const t = this.labelWidth || this.VersaForm.labelWidth;
      return t === "auto" ? e.width = t : t && (e.width = `${t}px`.replace(/(px)*$/, "px")), e;
    },
    isRequired() {
      return this.formItemRules.some((e) => !!e.required);
    },
    sizeClass() {
      return this.size || this.VersaForm.size;
    },
    fieldValue() {
      const e = this.VersaForm.model;
      if (!e || !this.prop)
        return;
      let t = this.prop;
      return t.indexOf(":") !== -1 && (t = t.replace(/:/, ".")), J(e, t);
    },
    formItemRules() {
      let e = this.VersaForm.rules;
      const t = this.rules, s = this.required !== void 0 ? { required: !!this.required } : [], i = J(e, this.prop || "");
      return e = e ? i[this.prop || ""] || i.v : [], [].concat(t || e || []).concat(s);
    },
    /** 表单项校验的触发节点，change映射为input */
    validateTrigger() {
      return this.formItemRules.map(
        (t) => t.trigger === "change" ? "update:modelValue" : t.trigger || "update:modelValue"
      );
    },
    tooltipOptions() {
      return this.tooltip ? u({
        placement: "top"
      }, typeof this.tooltip == "string" ? {
        content: this.tooltip
      } : this.tooltip) : null;
    }
  },
  created() {
    this.$emitter = new pe(), this.$emitter.on("addField", (e) => {
      this.fields.push(e);
    }), this.$emitter.on("removeField", (e) => {
      this.fields = this.fields.filter((t) => t !== e);
    });
  },
  mounted() {
    var e;
    this.prop && ((e = this.VersaForm) == null || e.$emitter.emit("addField", this));
  },
  beforeUnmount() {
    var e;
    (e = this.VersaForm) == null || e.$emitter.emit("removeField", this);
  },
  methods: {
    // 拦截trigger: input、blur等
    proxyEvent(e) {
      var t;
      return (t = e.map) == null ? void 0 : t.call(e, (s) => {
        var a, r;
        if ((a = s.children) != null && a.length && this.proxyEvent(s.children), !((r = s.props) != null && r["onUpdate:modelValue"]))
          return !1;
        for (const n in s.props)
          if (Object.hasOwnProperty.call(s.props, n)) {
            const o = s.props[n];
            typeof o == "function" && (s.props[n] = (...d) => o(...d, this.VersaForm));
          }
        const i = u({}, s.props);
        this.validateTrigger.forEach((n) => {
          const o = `on${de(n)}`;
          Object.assign(s.props, {
            [o]: (...d) => {
              var p;
              (p = i[o]) == null || p.call(i, ...d), this.validate(n);
            }
          });
        });
      });
    },
    validate(e, t = A) {
      const s = this.formItemRules.filter((o) => !o.trigger || e === "" || e === "update:modelValue" && ["input", "change"].includes(o.trigger) ? !0 : Array.isArray(o.trigger) ? o.trigger.indexOf(e) > -1 : o.trigger === e).map((o) => Object.assign({}, o));
      if (s.length === 0 && !this.fields.length)
        return t(!0, {}), !0;
      this.validateState = "validating";
      let i = !0, a = 0, r = this.fields.length + (s.length ? 1 : 0);
      const n = {
        [this.prop]: []
      };
      if (s.length !== 0) {
        const o = {};
        s && s.length > 0 && s.forEach((p) => {
          delete p.trigger;
        }), o[this.prop] = s, new Lt(o).validate(
          { [this.prop]: this.fieldValue },
          { firstFields: !0 },
          (p, l) => {
            var c;
            this.validateState = p ? "error" : "success", this.validateMessage = p ? p[0].message : "", p && (i = !1, n[this.prop].push(...l[this.prop])), typeof t == "function" && ++a === r && t(i, i ? {} : n), (c = this.VersaForm) == null || c.$emit(
              "validate",
              this.prop,
              !p,
              this.validateMessage || null
            );
          }
        );
      }
      this.fields.forEach((o) => {
        o.validate((d, p) => {
          d || (i = !1, n[this.prop].push(...Object.values(p).flat())), typeof t == "function" && ++a === r && t(i, i ? {} : n);
        });
      });
    },
    clearValidate() {
      var e;
      this.validateState = "", this.validateMessage = "", (e = this.fields) == null || e.forEach((t) => {
        t.clearValidate();
      });
    },
    updateComputedLabelWidth(e) {
      this.computedLabelWidth = e ? `${e}px` : "";
    }
  },
  render() {
    var n, o, d, p, l, c, y, N, U, K, ye, ge, Me;
    const e = [];
    if (this.interceptPreview) {
      const { sensitiveType: re, sensitive: $e } = this.optionConfig;
      e.push(
        $e ? h(Oe, {
          value: this.previewText,
          sensitiveType: typeof re == "function" ? re(this.omsForm.model) : re
        }) : (d = (o = (n = this.previewText) == null ? void 0 : n.toString) == null ? void 0 : o.call(n)) != null ? d : this.previewText
      );
    } else
      e.push(...(l = (p = this.$slots).default) == null ? void 0 : l.call(p)), this.status !== "preview" && this.proxyEvent(e);
    const t = this.validateState === "error" && this.showMessage && this.VersaForm.showMessage, s = this.labelConfig.type === "card", i = !!this.tips && !t && !s && this.status !== "preview";
    t && e.push(
      h("transition", { name: "el-zoom-in-top" }, [
        (K = (y = (c = this.$slots).error) == null ? void 0 : y.call(c, {
          error: this.validateMessage
        })) != null ? K : h(
          "div",
          {
            class: [
              "versa-form-item__error",
              {
                "versa-form-item__error--inline": typeof this.inlineMessage == "boolean" ? this.inlineMessage : (U = (N = this.VersaForm) == null ? void 0 : N.inlineMessage) != null ? U : !1
              }
            ]
          },
          [this.validateMessage]
        )
      ])
    ), this.hasToolTip && (this.tooltipOptions ? e.push(
      h(
        st,
        u({}, this.tooltipOptions),
        {
          default: () => h("img", {
            src: qt,
            class: "versa-form-item__tooltip"
          })
        }
      )
    ) : e.push(
      h("span", {
        class: "versa-form-item__tooltip"
      })
    ));
    const a = [
      h(
        "div",
        {
          class: [
            "versa-form-item__content",
            `versa-form-item__content--${this.status}`,
            {
              "versa-form-item__content--tooltip": !!this.tooltip,
              "versa-form-item--mb": !i && !s
            }
          ],
          style: u({}, this.$attrs.contentStyle)
        },
        {
          default: () => e
        }
      )
    ];
    s || a.unshift(
      h(
        At,
        {
          isAutoWidth: this.labelStyle.width === "auto",
          updateAll: this.VersaForm.labelWidth === "auto"
        },
        {
          default: () => [
            this.label || this.$slots.label ? h(
              "label",
              {
                for: this.labelFor,
                class: "versa-form-item__label",
                style: this.labelStyle
              },
              [
                this.$slots.label || `${this.label || ""}${this.VersaForm.labelSuffix || ""}`
              ]
            ) : null
          ]
        }
      )
    );
    const r = h(
      s ? se : "div",
      m(u({
        ref: "VersaFormItem",
        class: [
          "versa-form-item",
          `versa-form-item--${this.status}`,
          {
            "versa-form-item--feedback": (ye = this.VersaForm) == null ? void 0 : ye.statusIcon,
            "is-error": this.validateState === "error",
            "is-validating": this.validateState === "validating",
            "is-success": this.validateState === "success",
            "is-required": this.isRequired || this.required,
            "is-no-asterisk": (ge = this.VersaForm) == null ? void 0 : ge.hideRequiredAsterisk,
            [`versa-form-item--${this.sizeClass}`]: !!this.sizeClass,
            "versa-form-item--card": s,
            "versa-form-item--mb": s
          },
          this.$attrs.class
        ]
      }, s ? m(u({}, this.labelConfig), {
        title: this.label
      }) : {}), {
        style: this.$attrs.itemStyle
      }),
      {
        default: () => [a]
      }
    );
    return !s && this.tips ? h("div", {}, [
      r,
      i ? h("div", {
        class: [
          "versa-form-item__tips",
          {
            "versa-form-item--mb": i
          }
        ],
        style: {
          "margin-left": this.labelStyle.width === "auto" ? (Me = this.VersaForm) == null ? void 0 : Me.autoLabelWidth : this.labelStyle.width
        },
        innerHTML: this.tips
      }) : null
    ]) : r;
  }
};
const Kt = {
  name: "FormCollapseTransition",
  props: {
    transitionName: {
      type: String,
      default: "collapse-transition"
    }
  },
  data() {
    return {
      prevPaddingTop: "",
      prevPaddingBottom: "",
      prevOverflow: ""
    };
  },
  methods: {
    collapseBeforeEnter(e) {
      this.prevPaddingBottom = e.style.paddingBottom, this.prevPaddingTop = e.style.paddingTop, e.style.paddingTop = "0", e.style.paddingBottom = "0", e.style.maxHeight = "0";
    },
    collapseEnter(e, t) {
      this.prevOverflow = e.style.overflow, e.style.maxHeight = e.scrollHeight > 0 ? e.scrollHeight + "px" : "0", e.style.paddingTop = this.prevPaddingTop, e.style.paddingBottom = this.prevPaddingBottom, e.style.overflow = "hidden";
      const s = () => {
        t(), e.removeEventListener("transitionend", s, !1), e.removeEventListener("transitioncancel", s, !1);
      };
      e.addEventListener("transitionend", s, !1), e.addEventListener("transitioncancel", s, !1);
    },
    collapseAfterEnter(e) {
      e.style.maxHeight = "", e.style.overflow = this.prevOverflow;
    },
    collapseBeforeLeave(e) {
      this.prevPaddingBottom = e.style.paddingBottom, this.prevPaddingTop = e.style.paddingTop, this.prevOverflow = e.style.overflow, e.style.maxHeight = e.scrollHeight + "px", e.style.overflow = "hidden";
    },
    collapseLeave(e, t) {
      e.scrollHeight !== 0 && (e.style.maxHeight = "0", e.style.paddingBottom = "0", e.style.paddingTop = "0");
      const s = () => {
        t(), e.removeEventListener("transitionend", s, !1), e.removeEventListener("transitioncancel", s, !1);
      };
      e.addEventListener("transitionend", s, !1), e.addEventListener("transitioncancel", s, !1);
    },
    collapseAfterLeave(e) {
      e.style.maxHeight = "", e.style.overflow = this.prevOverflow, e.style.paddingBottom = this.prevPaddingBottom, e.style.paddingTop = this.prevPaddingTop, this.prevOverflow = this.prevPaddingBottom = this.prevPaddingTop = "";
    }
  }
};
function Xt(e, t, s, i, a, r) {
  return f(), w(Ge, {
    name: s.transitionName,
    onBeforeEnter: r.collapseBeforeEnter,
    onEnter: r.collapseEnter,
    onAfterEnter: r.collapseAfterEnter,
    onBeforeLeave: r.collapseBeforeLeave,
    onLeave: r.collapseLeave,
    onAfterLeave: r.collapseAfterLeave
  }, {
    default: g(() => [
      _(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"]);
}
const es = /* @__PURE__ */ T(Kt, [["render", Xt]]);
const ts = {
  name: "FormCollapse",
  components: {
    FormCollapseTransition: es
  },
  props: {
    defaultExpanded: Boolean
  },
  data() {
    return {
      expanded: this.defaultExpanded
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    }
  }
}, ss = { class: "versa-collapse" }, is = /* @__PURE__ */ C("button", { type: "button" }, "展开/折叠", -1), rs = { class: "versa-collapse__content" };
function as(e, t, s, i, a, r) {
  const n = b("FormCollapseTransition");
  return f(), v("div", ss, [
    C("div", {
      class: "versa-collapse__title",
      onClick: t[0] || (t[0] = (...o) => r.toggleExpand && r.toggleExpand(...o))
    }, [
      _(e.$slots, "title", {}, () => [
        is
      ])
    ]),
    D(n, null, {
      default: g(() => [
        ce(C("div", rs, [
          _(e.$slots, "default")
        ], 512), [
          [Je, a.expanded]
        ])
      ]),
      _: 3
    })
  ]);
}
const ls = /* @__PURE__ */ T(ts, [["render", as]]), ze = {
  name: "versa-radio-group",
  props: {
    /** 配置项，{label: '', value: ''} */
    options: {
      type: Array,
      default: () => []
    },
    // 渲染map对象
    mapSource: {
      type: Object
    },
    modelValue: {
      type: [String, Number, Boolean, Object]
    },
    labelInValue: {
      type: [Object, Boolean],
      default: !1
    },
    border: {
      type: Boolean,
      default: !1
    },
    button: {
      type: Boolean,
      default: !1
    },
    status: {
      type: String,
      default: "edit"
    }
  },
  emits: ["update:modelValue"],
  computed: {
    mergedOptions() {
      const e = [];
      return this.mapSource ? Object.keys(this.mapSource).forEach((t) => {
        e.push({
          label: this.mapSource[t],
          value: t
        });
      }) : e.push(...this.options), e;
    },
    innerValue: {
      get() {
        var e, t, s;
        return this.labelInValue ? (s = this.modelValue) == null ? void 0 : s[(t = (e = this.labelInValue) == null ? void 0 : e.value) != null ? t : "value"] : this.modelValue;
      },
      set(e) {
        var i;
        if (!this.labelInValue) {
          this.$emit("update:modelValue", e);
          return;
        }
        const t = (i = this.mergedOptions) == null ? void 0 : i.find(
          (a) => a.value === e
        );
        if (!t) {
          this.$emit("update:modelValue", t);
          return;
        }
        let s = Y(t, ["label", "value"]);
        V(this.labelInValue) && (s = Q(
          s,
          (a, r) => this.labelInValue[r] || r
        )), this.$emit("update:modelValue", s);
      }
    },
    /** 是否预览状态 */
    isPreview() {
      return this.status === "preview";
    },
    /** 预览状态的显示内容 */
    previewText() {
      var e, t, s;
      return this.isPreview && (s = (t = (e = this.mergedOptions) == null ? void 0 : e.find((i) => i.value === this.innerValue)) == null ? void 0 : t.label) != null ? s : "";
    }
  },
  methods: {
    // 绑定属性
    bindProps(e) {
      const t = m(u({}, e), { border: this.border });
      return delete t.label, delete t.value, t;
    }
  },
  render() {
    if (this.isPreview)
      return h(
        "div",
        {
          ref: "renderText",
          class: "versa-form__item--preview"
        },
        {
          default: () => this.previewText
        }
      );
    const e = this.mergedOptions.map((s) => {
      const i = m(u({}, this.bindProps(s)), {
        value: s.value
      });
      return h(this.button ? it : rt, i, {
        default: () => s.label
      });
    }), t = m(u({}, this.$attrs), {
      modelValue: this.innerValue,
      // 拦截el-select的input事件， 外部v-model走自定义逻辑
      "onUpdate:modelValue": (s) => this.innerValue = s,
      class: "versa-radio-group",
      ref: "versaRadioGroup"
    });
    return h(at, t, {
      default: () => e
    });
  }
}, Pe = {
  inject: {
    injectedProvide: {
      from: xe,
      default: {}
    }
  },
  computed: {
    globalConfig() {
      return Se(this.injectedProvide);
    }
  }
};
const os = {
  name: "versa-image-upload",
  components: { Plus: Ct, Delete: St, ElIcon: lt, ElImage: ot },
  mixins: [Pe],
  props: {
    modelValue: {
      type: [Object, String]
    },
    maxSize: {
      type: Number,
      default: 5 * 1024 * 1024
    },
    status: {
      type: String,
      default: "edit"
    },
    accept: {
      type: String,
      default: ".png;.jpg;.jpeg"
    },
    onUpload: {
      type: Function
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      previewSrc: ""
    };
  },
  computed: {
    previewSrcList() {
      return this.status === "edit" ? [] : typeof this.modelValue == "string" ? [this.modelValue] : [this.previewSrc];
    }
  },
  watch: {
    modelValue: {
      handler() {
        typeof this.modelValue == "string" && (this.previewSrc = this.modelValue);
      },
      immediate: !0
    }
  },
  methods: {
    onClickUpload() {
      this.$refs.inputRef.value = "", this.$refs.inputRef.click(), this.$refs.inputRef.blur();
    },
    handleChange(e) {
      return I(this, null, function* () {
        var i, a, r, n, o, d, p, l, c;
        const t = (a = (i = e.target) == null ? void 0 : i.files) != null ? a : [];
        if (t.length === 0 || t.length > 1)
          return;
        if (t[0].size > this.maxSize) {
          (n = (r = this.globalConfig) == null ? void 0 : r.toastError) == null || n.call(
            r,
            `最大支持${Vt(this.maxSize / 1e3, 2)}kb大小的文件`
          );
          return;
        }
        if (!((o = this.accept) == null ? void 0 : o.split(";").some((y) => t[0].name.endsWith(y)))) {
          (p = (d = this.globalConfig) == null ? void 0 : d.toastError) == null || p.call(d, `仅支持${this.accept}格式的文件`);
          return;
        }
        try {
          const y = (c = yield (l = this.onUpload) == null ? void 0 : l.call(this, t[0])) != null ? c : t[0];
          this.previewSrc = typeof y == "string" ? y : URL.createObjectURL(y), this.$emit("update:modelValue", y);
        } catch (y) {
          console.log(y);
        }
      });
    },
    onRemove() {
      this.$emit("update:modelValue", null), this.previewSrc = null;
    }
  }
}, ns = { class: "versa-image-upload" }, us = {
  key: 1,
  class: "versa-image-upload__preview"
}, ds = /* @__PURE__ */ C("div", { class: "versa-image-upload__preview--mask" }, null, -1), cs = ["accept"];
function ps(e, t, s, i, a, r) {
  const n = b("Plus"), o = b("ElIcon"), d = b("ElImage"), p = b("Delete");
  return f(), v("div", ns, [
    a.previewSrc ? (f(), v("div", us, [
      D(d, M({
        class: "versa-image-upload__preview--pic",
        fit: "cover",
        src: a.previewSrc,
        "zoom-rate": 1.2,
        "max-scale": 7,
        "min-scale": 0.2
      }, e.$attrs, { "preview-src-list": r.previewSrcList }), null, 16, ["src", "preview-src-list"]),
      s.status === "edit" ? (f(), v(S, { key: 0 }, [
        ds,
        D(o, {
          class: "versa-image-upload__preview--remove",
          onClick: r.onRemove
        }, {
          default: g(() => [
            D(p)
          ]),
          _: 1
        }, 8, ["onClick"])
      ], 64)) : P("", !0)
    ])) : (f(), w(o, {
      key: 0,
      class: "versa-image-upload__icon",
      onClick: r.onClickUpload
    }, {
      default: g(() => [
        D(n)
      ]),
      _: 1
    }, 8, ["onClick"])),
    C("input", {
      ref: "inputRef",
      style: { opacity: "0", width: "1px", height: "1px", left: "-999px", position: "fixed", "z-index": "-999" },
      type: "file",
      accept: s.accept,
      onChange: t[0] || (t[0] = (...l) => r.handleChange && r.handleChange(...l))
    }, null, 40, cs)
  ]);
}
const Ee = /* @__PURE__ */ T(os, [["render", ps]]), ke = {
  name: "versa-checkbox-group",
  inheritAttrs: !1,
  props: {
    /** 配置项，{label: '', value: ''} */
    options: {
      type: Array,
      default: () => []
    },
    // 渲染map对象
    mapSource: {
      type: Object
    },
    modelValue: {
      type: Array
    },
    labelInValue: {
      type: [Object, Boolean],
      default: !1
    },
    border: {
      type: Boolean,
      default: !1
    },
    button: {
      type: Boolean,
      default: !1
    },
    status: {
      type: String,
      default: "edit"
    }
  },
  emits: ["update:modelValue"],
  computed: {
    mergedOptions() {
      const e = [];
      return this.mapSource ? Object.keys(this.mapSource).forEach((t) => {
        e.push({
          label: this.mapSource[t],
          value: t
        });
      }) : e.push(...this.options), e;
    },
    innerValue: {
      get() {
        var e, t;
        return this.labelInValue ? (t = (e = this.modelValue) == null ? void 0 : e.map(
          (s) => {
            var i, a;
            return s[(a = (i = this.labelInValue) == null ? void 0 : i.value) != null ? a : "value"];
          }
        )) != null ? t : [] : this.modelValue || [];
      },
      set(e) {
        var i, a;
        if (!this.labelInValue) {
          this.$emit("update:modelValue", e);
          return;
        }
        const s = ((a = (i = this.mergedOptions) == null ? void 0 : i.filter(
          (r) => e.includes(r.value)
        )) != null ? a : []).map((r) => {
          let n = Y(r, ["label", "value"]);
          return V(this.labelInValue) && (n = Q(n, (o, d) => this.labelInValue[d] || d)), n;
        });
        this.$emit("update:modelValue", s);
      }
    },
    /** 是否预览状态 */
    isPreview() {
      return this.status === "preview";
    },
    /** 预览状态的显示内容 */
    previewText() {
      var e;
      return this.isPreview ? (e = this.mergedOptions) == null ? void 0 : e.filter((t) => this.innerValue.includes(t.value)).map((t) => t.label).join("、") : "";
    }
  },
  methods: {
    // 绑定属性
    bindProps(e) {
      const t = m(u({}, e), { border: this.border });
      return delete t.label, delete t.value, delete t.checked, t;
    }
  },
  render() {
    if (this.isPreview)
      return h(
        "div",
        {
          ref: "renderText",
          class: "versa-form__item--preview"
        },
        { default: () => this.previewText }
      );
    const e = this.mergedOptions.map((s) => {
      const i = m(u({}, this.bindProps(s)), {
        value: s.value
      });
      return h(this.button ? nt : ut, i, {
        default: () => s.label
      });
    }), t = m(u({}, this.$attrs), {
      modelValue: this.innerValue,
      "onUpdate:modelValue": (s) => this.innerValue = s,
      class: `versa-checkbox-group ${this.$attrs.class || ""}`,
      ref: "versaCheckboxGroup"
    });
    return h(dt, t, {
      default: () => e
    });
  }
}, oe = {
  props: {
    /** 表头宽度 */
    labelWidth: {
      type: [Number, String],
      default: "90"
    },
    /** 表头位置 */
    labelPosition: {
      type: String
    },
    /** 表单配置项 */
    options: {
      type: Array,
      default: () => []
    },
    /** 默认值 */
    defaultValues: {
      type: Object,
      default: () => ({})
    },
    /** 一行多列 */
    columns: {
      type: Number,
      required: !1,
      default: 1
    },
    /** 表单状态：编辑-edit; 预览-preview; 禁用-disabled */
    status: {
      type: [String, Function],
      default: "edit"
    },
    /** 操作类型 */
    actionType: {
      type: String,
      default: "edit"
    },
    labelSuffix: {
      type: String,
      default: ""
    },
    /** 是否隐藏必填标志 */
    hideRequiredAsterisk: {
      type: Boolean,
      default: !1
    }
  }
}, ne = {
  props: {
    /** 默认筛选项 */
    defaultFilters: {
      type: Object,
      default: () => ({})
    },
    /** 提交按钮项，多个用逗号分隔（search,reset,create） */
    actions: {
      type: [String, Array, Function],
      default() {
        return "search,reset";
      }
    },
    /** 表头宽度 */
    labelWidth: {
      type: [Number, String],
      default: "90"
    },
    /** 是否需要折叠（分割） */
    isSplit: {
      type: Boolean,
      default: !1
    },
    /** 固定展示数量 */
    firstCount: {
      type: Number,
      default: 8
    },
    /** 是否移除文本空格 */
    trim: {
      type: Boolean,
      default: !0
    },
    /** 搜索条件头部标题 */
    filterTitle: {
      type: String
    },
    labelSuffix: {
      type: String,
      default: ""
    }
  }
}, ue = {
  props: {
    /** 是否需要分页 */
    needPagination: {
      type: Boolean,
      default: !0
    },
    /** 列表查询接口或方法 */
    api: {
      type: [String, Function],
      required: !1
    },
    apiMethod: {
      type: String,
      default: "get"
    },
    // 格式化请求结果
    formatResults: {
      type: Function,
      default: A
    },
    /** 格式化筛选框数据 */
    formatFilter: {
      type: Function,
      default: A
    },
    /** 行数据的 Key */
    rowKey: {
      type: [Function, String],
      default: "id"
    },
    /** 远程数据获取路径 */
    listKey: {
      type: String,
      default: ""
    },
    /** 获取总数路径 */
    totalKey: {
      type: String,
      default: ""
    },
    /** 操作栏配置 */
    toolOptions: {
      type: Array,
      default: () => []
    },
    /** 列表title */
    headline: {
      type: String,
      default: ""
    },
    /** 列表的其他属性配置 */
    extraTableProps: {
      type: Object,
      default: () => ({})
    },
    /** 列表单元格无数据时需要展示的数据 */
    fillNull: {
      type: String,
      required: !1
    }
  }
}, fe = {
  methods: {
    dispatch(e, t, ...s) {
      var r;
      for (var i = this.$parent || this.$root, a = i.$options.name; i && (!a || a !== e); )
        i = i.$parent, i && (a = i.$options.name);
      i && ((r = i.$emitter) == null || r.emit(t, ...s));
    }
  }
};
const Ce = {
  "versa-select": "versa-select",
  "versa-checkbox-group": "versa-checkbox-group",
  "versa-radio-group": "versa-radio-group",
  "versa-form": "versa-form",
  "versa-repeater": "versa-repeater",
  "versa-image-upload": "versa-image-upload",
  "versa-repeater": "versa-repeater"
}, hs = {
  name: "versa-form",
  components: {
    ElRow: ct,
    ElCol: pt,
    VersaSelect: Te,
    VersaFormItem: Ne,
    VersaRadioGroup: ze,
    VersaCheckboxGroup: ke,
    VersaImageUpload: Ee,
    VersaFormCollapse: ls,
    VersaRepeater: Ve(() => Promise.resolve().then(() => Bs))
  },
  mixins: [oe, fe],
  props: {
    /** 初始化时自动处理初始值 */
    autoInitValue: {
      type: Boolean,
      default: !0
    },
    /** v-model的值 */
    modelValue: {
      type: Object
    },
    /** container容器 */
    component: {
      type: String,
      default: "form"
    },
    /** 全局校验规则 */
    rules: Object,
    /** 是否行内 */
    inline: Boolean,
    /** 报错信息行内展示 */
    inlineMessage: Boolean,
    statusIcon: Boolean,
    /** 是否展示报错信息 */
    showMessage: {
      type: Boolean,
      default: !0
    },
    size: String,
    disabled: Boolean,
    /** 全局校验规则改变时是否触发校验 */
    validateOnRuleChange: {
      type: Boolean,
      default: !0
    },
    /** 是否是repeater */
    isRepeater: Boolean
  },
  provide() {
    return {
      VersaForm: this
    };
  },
  inject: {
    /** 如果在versa-form下使用，则为嵌套表单 */
    VersaFormItem: {
      default: null
    },
    /** 如果在versa-form下使用，则为嵌套表单 */
    VersaForm: {
      default: null
    }
  },
  emits: ["update:modelValue", "onMounted", "validate"],
  data() {
    return {
      innerFormValues: {},
      fields: [],
      potentialLabelWidthArr: [],
      innerStatusMap: {},
      isMounted: !1
    };
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length)
        return 0;
      const e = Math.max(...this.potentialLabelWidthArr);
      return e ? `${e}px` : "";
    },
    /** 是否受控 */
    isControl() {
      return typeof this.modelValue != "undefined" || !!this.VersaFormItem;
    },
    /** 表单帮定值 */
    model: {
      get() {
        return (this.isControl ? this.modelValue : this.innerFormValues) || {};
      },
      set(e) {
        this.isControl ? this.$emit("update:modelValue", e) : this.innerFormValues = e;
      }
    },
    /** 是否需要布局 */
    layout() {
      return this.columns > 1 && !this.$attrs.inline;
    },
    /** form全局状态 */
    globalStatus() {
      return typeof this.status == "function" ? this.status(this.model, { actionType: this.actionType }) : this.status;
    },
    /** 实际渲染的组件 */
    deployOptions() {
      var t;
      const e = (s) => typeof s.when == "function" ? s.when(this.model, s, {
        actionType: this.actionType,
        status: this.globalStatus
      }) : s.when === void 0 ? !0 : s.when;
      return (t = this.options) == null ? void 0 : t.filter(e).map((s) => {
        const i = typeof s.element == "string" ? ae(s.element) : s.element, a = (r) => {
          const n = typeof r.element == "string" ? ae(r.element) : r.element;
          return m(u({}, r), {
            element: Ce[n] || n,
            useCustomPreview: typeof r.useCustomPreview == "boolean" ? r.useCustomPreview : !!Ce[n],
            rules: typeof r.rules == "function" ? r.rules(this.model, r, {
              actionType: this.actionType
            }) : r.rules,
            colSpan: r.single ? 24 : ~~(24 / this.columns),
            status: typeof r.status == "function" ? r.status(this.model, r, {
              actionType: this.actionType,
              globalStatus: this.globalStatus
            }) : r.status || this.innerStatusMap[r.prop] || this.globalStatus
          });
        };
        return i === "versa-form-collapse" ? m(u({}, s), {
          element: i,
          options: s.options.map(a).filter(e)
        }) : a(s);
      });
    },
    /** 是否需要处理tooltip提示占位 */
    hasToolTip() {
      return this.deployOptions.some((e) => e.element === "versa-form-collapse" ? e.options.some((t) => !!t.tooltip) : !!e.tooltip);
    }
  },
  watch: {
    rules() {
      this.validateOnRuleChange && this.validate(() => {
      });
    },
    /** 全局状态变化时，清空内置缓存的状态 */
    status() {
      this.innerStatusMap = {};
    }
  },
  created() {
    var e;
    this.$emitter = new pe(), this.$emitter.on("addField", (t) => {
      this.fields.push(t);
    }), this.$emitter.on("removeField", (t) => {
      this.fields.splice(this.fields.indexOf(t), 1);
    }), this.VersaFormItem && !this.isRepeater ? (this.VersaFormItem.$emitter.emit("addField", this), this.VersaForm.isMounted ? this.autoInitValue && this.addInitValue(this.modelValue) : (e = this.VersaForm.$emitter) == null || e.on("onMounted", () => {
      this.autoInitValue && this.addInitValue(this.modelValue);
    })) : this.autoInitValue && this.addInitValue();
  },
  beforeUnmount() {
    var e;
    (e = this.VersaFormItem) == null || e.$emitter.emit("removeField", this);
  },
  methods: {
    omit: $,
    /** 透传每个组件的插槽 */
    parseSlots(e) {
      const t = Object.keys(this.$slots), s = new RegExp(`^${e.prop || ""}-`);
      return t.filter((i) => s.test(i)).map((i) => ({
        source: i,
        target: i.replace(s, "")
      }));
    },
    /** 设置表单状态 */
    setStatus(...e) {
      const t = V(e[0]) ? e[0] : { [e[0]]: e[1] };
      for (const s in t)
        j(t, s) && (this.innerStatusMap[s] = t[s]);
    },
    /** 获取表单状态 */
    getStatus(e) {
      var t;
      if (typeof e == "string")
        return (t = this.deployOptions.find((s) => s.prop === e)) == null ? void 0 : t.status;
      if (Array.isArray(e))
        return this.deployOptions.reduce((s, i) => e.includes(i.prop) ? m(u({}, s), { [i.prop]: i.status }) : s, {});
      console.warn("[VersaForm::getStatus] 未知数据类型的key");
    },
    /** 重置表单 */
    resetField() {
      this.fields.forEach((e) => {
        var t;
        (t = e.clearValidate) == null || t.call(e);
      }), this.addInitValue();
    },
    clearValidate(e = []) {
      (e.length ? typeof e == "string" ? this.fields.filter((s) => e === s.prop) : this.fields.filter((s) => e.indexOf(s.prop) > -1) : this.fields).forEach((s) => {
        var i;
        (i = s.clearValidate) == null || i.call(s);
      });
    },
    /** 校验全部 */
    validate(e) {
      return this.innerValidate(this.fields, e);
    },
    /** 校验某些字段 */
    validateField(e, t) {
      e = [].concat(e);
      const s = this.fields.filter(
        (i) => e.indexOf(i.prop) !== -1
      );
      if (!s.length) {
        console.warn("[VersaForm Warn] please pass correct props!");
        return;
      }
      return this.innerValidate(s, t);
    },
    /** 内部基础校验函数 */
    innerValidate(e, t) {
      let s;
      typeof t != "function" && (s = new Promise((n, o) => {
        t = function(d, p) {
          d ? n(d) : o(p);
        };
      }));
      let i = !0, a = 0;
      e.length === 0 && t && t(!0);
      const r = {};
      if (e.forEach((n) => {
        n.validate("", (o, d) => {
          o || (i = !1), Object.assign(r, d), typeof t == "function" && ++a === e.length && t(i, r);
        });
      }), s)
        return s;
    },
    // 添加初始值
    addInitValue(e) {
      const t = e || u({}, this.defaultValues);
      this.options.forEach((s) => {
        ae(s.element) === "versa-form-collapse" ? s.options.forEach((i) => {
          t[i.prop] = ee(this.getInitValueByKey(i.prop, t, i));
        }) : t[s.prop] = ee(this.getInitValueByKey(s.prop, t, s));
      }), this.model = u(u({}, this.model), t), this.$nextTick(() => {
        var s;
        this.$emit("onMounted", this.model), (s = this.$emitter) == null || s.emit("onMounted"), this.isMounted = !0;
      });
    },
    /** 获取初始值 */
    getInitValueByKey(e, t, s) {
      const i = t || u({}, this.defaultValues), a = s || this.options.find((n) => n.prop === e);
      if (!a) {
        console.warn("[VersaForm Warn][Form]unknow prop.");
        return;
      }
      const r = j(i, e);
      return r && typeof a.initValue != "undefined" ? a.initValue : r && typeof a.initValue == "undefined" ? i[e] : a.initValue;
    },
    /** item组件props */
    bindFormItemProps(e) {
      const t = Object.keys(Ne.props).reduce((s, i) => m(u({}, s), {
        [i]: e[i]
      }), {});
      return u(m(u({}, t), {
        optionConfig: u({}, e)
      }), e.formItemProps || {});
    },
    // 绑定属性
    bindProps(e) {
      const t = {
        disabled: e.status === "disabled"
      };
      return e.element === "el-date-picker" && Object.assign(t, u({
        placeholder: `请选择${e.label || ""}`,
        "start-placeholder": "开始日期",
        "range-separator": "至",
        "end-placeholder": "结束日期"
      }, zt[e.type || "date"])), typeof e.element == "string" && /select/i.test(e.element) && Object.assign(t, {
        placeholder: `请选择${e.label || e.__label || ""}`
      }), typeof e.element == "string" && /input/i.test(e.element) && Object.assign(t, {
        placeholder: `请输入${e.label || e.__label || ""}`
      }), Object.assign(t, m(u({}, e), {
        class: `versa-form-item__element ${e.class || ""}`
      })), $(t, [
        "label",
        "prop",
        "element",
        "initValue",
        "rules",
        "events",
        "single",
        "colSpan",
        "useCustomPreview",
        "on",
        "formItemProps",
        /** 卡片式布局属性 */
        "labelType",
        /** repeater属性 */
        "__label",
        "__width",
        "__fixedClass"
      ]);
    },
    // 事件绑定处理
    bindEvent(e) {
      return e.on || {};
    },
    getLabelWidthIndex(e) {
      const t = this.potentialLabelWidthArr.indexOf(e);
      if (t === -1)
        throw new Error("[ElementForm]unpected width ", e);
      return t;
    },
    registerLabelWidth(e, t) {
      if (e && t) {
        const s = this.getLabelWidthIndex(t);
        this.potentialLabelWidthArr.splice(s, 1, e);
      } else
        e && this.potentialLabelWidthArr.push(e);
    },
    deregisterLabelWidth(e) {
      const t = this.getLabelWidthIndex(e);
      this.potentialLabelWidthArr.splice(t, 1);
    }
  }
};
function fs(e, t, s, i, a, r) {
  const n = b("VersaFormItem"), o = b("ElCol"), d = b("ElRow"), p = b("VersaFormCollapse");
  return f(), w(z(s.component), {
    class: H([
      "versa-form",
      {
        "versa-form--inline": s.inline,
        [`versa-form--label-${e.labelPosition}`]: !!e.labelPosition
      }
    ])
  }, {
    default: g(() => [
      r.layout ? (f(), w(d, {
        key: 0,
        gutter: 20
      }, {
        default: g(() => [
          (f(!0), v(S, null, L(r.deployOptions, (l) => (f(), w(o, {
            key: l.prop,
            span: l.colSpan
          }, {
            default: g(() => [
              D(n, M({ ref_for: !0 }, r.bindFormItemProps(l), {
                hasToolTip: r.hasToolTip,
                prop: l.prop,
                label: l.label || "",
                rules: l.rules,
                status: l.status
              }), {
                default: g(() => [
                  l.slotName ? _(e.$slots, l.slotName, M({
                    key: 0,
                    data: r.model,
                    ref_for: !0
                  }, l)) : (f(), w(z(l.element), M({ key: 1 }, E(r.bindEvent(l)), { ref_for: !0 }, r.bindProps(l), {
                    modelValue: r.model[l.prop],
                    "onUpdate:modelValue": (c) => r.model[l.prop] = c
                  }), O({ _: 2 }, [
                    L(r.parseSlots(l), (c) => ({
                      name: c.target,
                      fn: g((y) => [
                        _(e.$slots, c.source, M({ ref_for: !0 }, y))
                      ])
                    }))
                  ]), 1040, ["modelValue", "onUpdate:modelValue"]))
                ]),
                _: 2
              }, 1040, ["hasToolTip", "prop", "label", "rules", "status"])
            ]),
            _: 2
          }, 1032, ["span"]))), 128))
        ]),
        _: 3
      })) : (f(!0), v(S, { key: 1 }, L(r.deployOptions, (l) => (f(), v(S, {
        key: l.prop
      }, [
        l.element === "versa-form-collapse" ? (f(), w(p, M({
          key: 0,
          ref_for: !0
        }, r.omit(l, ["options"])), {
          title: g(() => [
            l.label ? _(e.$slots, l.label, { key: 0 }, () => [
              B(x(l.label), 1)
            ]) : P("", !0)
          ]),
          default: g(() => [
            (f(!0), v(S, null, L(l.options, (c) => (f(), w(n, M({ ref_for: !0 }, r.bindFormItemProps(c), {
              hasToolTip: r.hasToolTip,
              prop: c.prop,
              label: c.label || "",
              rules: c.rules,
              status: c.status
            }), {
              default: g(() => [
                c.slotName ? _(e.$slots, c.slotName, M({
                  key: 0,
                  data: r.model,
                  ref_for: !0
                }, c)) : (f(), w(z(c.element), M({ key: 1 }, E(r.bindEvent(c)), { ref_for: !0 }, r.bindProps(c), {
                  modelValue: r.model[c.prop],
                  "onUpdate:modelValue": (y) => r.model[c.prop] = y
                }), O({ _: 2 }, [
                  L(r.parseSlots(c), (y) => ({
                    name: y.target,
                    fn: g((N) => [
                      _(e.$slots, y.source, M({ ref_for: !0 }, N))
                    ])
                  }))
                ]), 1040, ["modelValue", "onUpdate:modelValue"]))
              ]),
              _: 2
            }, 1040, ["hasToolTip", "prop", "label", "rules", "status"]))), 256))
          ]),
          _: 2
        }, 1040)) : (f(), w(n, M({
          key: 1,
          ref_for: !0
        }, r.bindFormItemProps(l), {
          hasToolTip: r.hasToolTip,
          prop: l.prop,
          label: l.label || "",
          rules: l.rules,
          status: l.status
        }), {
          default: g(() => [
            l.slotName ? _(e.$slots, l.slotName, M({
              key: 0,
              data: r.model,
              ref_for: !0
            }, l)) : (f(), w(z(l.element), M({ key: 1 }, E(r.bindEvent(l)), { ref_for: !0 }, r.bindProps(l), {
              modelValue: r.model[l.prop],
              "onUpdate:modelValue": (c) => r.model[l.prop] = c
            }), O({ _: 2 }, [
              L(r.parseSlots(l), (c) => ({
                name: c.target,
                fn: g((y) => [
                  _(e.$slots, c.source, M({ ref_for: !0 }, y))
                ])
              }))
            ]), 1040, ["modelValue", "onUpdate:modelValue"]))
          ]),
          _: 2
        }, 1040, ["hasToolTip", "prop", "label", "rules", "status"]))
      ], 64))), 128)),
      _(e.$slots, "footer", k(F({ model: r.model, actionType: e.actionType })))
    ]),
    _: 3
  }, 8, ["class"]);
}
const ie = /* @__PURE__ */ T(hs, [["render", fs]]), ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ie
}, Symbol.toStringTag, { value: "Module" }));
const ys = Y(te, ["reset", "create", "search"]), gs = {
  name: "versa-filter",
  components: {
    VersaForm: ie,
    VersaCard: se,
    VersaButton: R,
    ElSpace: G
  },
  mixins: [ne, fe, he],
  props: {
    /** 表单配置项 */
    options: {
      type: Array,
      required: !0,
      default() {
        return [];
      }
    }
  },
  emits: ["onFilterChange", "onSearch", "onReset", "onMounted"],
  data() {
    return {
      formValues: {},
      isMounted: !1
    };
  },
  watch: {
    labelWidth: {
      handler(e) {
        document.body.style.setProperty(
          "--label-width",
          `${e}px`.replace(/(px)*$/, "px")
        );
      },
      immediate: !0
    },
    formValues: {
      handler(e) {
        if (!this.isMounted)
          return !1;
        this.$emit("onFilterChange", e);
      },
      deep: !0
    }
  },
  computed: {
    filterActions() {
      let e = typeof this.actions == "string" ? this.actions.split(",") : this.actions;
      return typeof this.actions == "function" && (e = this.actions(this.formValues)), e == null ? void 0 : e.map((t) => typeof t == "string" ? ys[t] : V(t) && j(t, "actionName") && j(t, "actionType") || t != null && t.is ? m(u({}, t), {
        disabled: typeof t.disabled == "function" ? t.disabled.bind(this, this.formValues) : t.disabled
      }) : null).filter(Boolean);
    }
  },
  methods: {
    // 设置表单值
    setValues(e) {
      this.formValues = u(u({}, this.formValues), e);
    },
    // 校验
    validate(e) {
      this.$refs.formRef.validate(e);
    },
    clearValidate(e, t) {
      this.$refs.formRef.clearValidate(e, t);
    },
    filterNull() {
      const e = ["", null, void 0];
      for (const t in this.formValues)
        e.includes(this.formValues[t]) && (this.formValues[t] = null), typeof this.formValues[t] == "string" && this.trim && (this.formValues[t] = this.formValues[t].trim());
      return this.formValues;
    },
    /** 初始化 */
    onMounted() {
      this.$emit("onFilterChange", this.formValues), this.$emit("onMounted", this.filterNull()), this.isMounted = !0;
    },
    // 搜索
    onSearch() {
      this.validate((e) => {
        e && this.$emit("onSearch", this.filterNull());
      });
    },
    // 重置
    onReset() {
      this.$refs.formRef.resetField(), this.$refs.formRef.addInitValue(), this.$nextTick(() => {
        this.$emit("onReset", this.filterNull());
      });
    },
    /** 操作按钮回调函数 */
    onAction(e, t) {
      return I(this, null, function* () {
        var s, i;
        switch (e.actionType) {
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
              $(e, ["actionType", "actionName", "action", "usePageModal"])
            );
            break;
          default:
            e.validate && (yield (s = this.$refs.formRef) == null ? void 0 : s.validate()), (i = e.action) == null || i.call(e, this.formValues, t, u({}, e));
            break;
        }
      });
    }
  }
}, Ms = { class: "versa-filter__action" }, vs = { class: "versa-filter__footer" };
function bs(e, t, s, i, a, r) {
  const n = b("VersaButton"), o = b("ElSpace"), d = b("VersaForm"), p = b("VersaCard");
  return f(), w(p, {
    class: H([
      "versa-filter",
      {
        "versa-filter--emptyFooter": !e.$slots.footer
      }
    ]),
    title: e.filterTitle
  }, {
    default: g(() => [
      D(d, {
        ref: "formRef",
        modelValue: a.formValues,
        "onUpdate:modelValue": t[0] || (t[0] = (l) => a.formValues = l),
        options: s.options,
        defaultValues: e.defaultFilters,
        "label-width": e.labelWidth,
        labelSuffix: e.labelSuffix,
        onOnMounted: r.onMounted
      }, O({
        footer: g(() => [
          C("section", Ms, [
            D(o, {
              class: "versa-filter__action--wrap",
              size: 20
            }, {
              default: g(() => [
                (f(!0), v(S, null, L(r.filterActions, (l) => (f(), v(S, null, [
                  l.is ? (f(), w(z(l.is), M({
                    key: 0,
                    ref_for: !0
                  }, l, E(l.on || {})), null, 16)) : (f(), w(n, M({
                    key: l.actionType,
                    type: l.type,
                    ref_for: !0
                  }, l, {
                    onClick: (c, y) => r.onAction(l, y)
                  }), {
                    default: g(() => [
                      B(x(l.actionName), 1)
                    ]),
                    _: 2
                  }, 1040, ["type", "onClick"]))
                ], 64))), 256)),
                _(e.$slots, "btns", k(F(e.proxyPageCore({ formValues: a.formValues }))))
              ]),
              _: 3
            })
          ])
        ]),
        _: 2
      }, [
        L(Object.keys(e.$slots).filter(
          (l) => !["footer", "btns"].includes(l)
        ), (l) => ({
          name: l,
          fn: g((c) => [
            _(e.$slots, l, k(F(c)))
          ])
        }))
      ]), 1032, ["modelValue", "options", "defaultValues", "label-width", "labelSuffix", "onOnMounted"]),
      C("div", vs, [
        _(e.$slots, "footer")
      ])
    ]),
    _: 3
  }, 8, ["class", "title"]);
}
const Fe = /* @__PURE__ */ T(gs, [["render", bs]]);
const ws = Y(te, ["remove", "edit", "detail"]), Ye = {
  name: "versa-table",
  mixins: [ue, fe, he, Pe],
  props: {
    /** 列表配置项 */
    options: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    queryParams: {
      type: Object,
      default: () => ({})
    },
    /** 是否自动查询 */
    autoLoad: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["onSelectChange", "onDataChange"],
  data() {
    return {
      paginationConfigs: {
        layout: "total, sizes, prev, pager, next, jumper",
        prevText: "",
        nextText: ""
      },
      dataSource: this.tableData,
      innerParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      loading: !1,
      multipleSelection: []
    };
  },
  mounted() {
    this.autoLoad && this.queryTableData();
  },
  computed: {
    tools() {
      var e;
      return (e = this.toolOptions) == null ? void 0 : e.map((t) => V(t) && j(t, "actionName") && j(t, "actionType") || t != null && t.is ? m(u({}, t), {
        on: Le(t.on),
        disabled: typeof t.disabled == "function" ? t.disabled.bind(this, this.multipleSelection) : t.disabled
      }) : null).filter(Boolean);
    },
    renderOptions() {
      var e, t;
      return (t = (e = this.options) == null ? void 0 : e.map((s) => {
        const i = u({}, s);
        return i.formatter || (i.formatter = (a) => {
          var r, n, o;
          return q(a[i.prop]) ? i.filterNull || ((r = this.fillNull) != null ? r : "") : V(i.mapSource) ? i.mapSource[a[i.prop]] : Array.isArray(i.mapSource) ? (o = (n = i.mapSource.find(
            (d) => d.value === a[i.prop]
          )) == null ? void 0 : n.label) != null ? o : "" : a[i.prop];
        }), i.type === "index" && !i.index && (i.index = (a) => `${a < 9 ? "0" : ""}${a + 1}`), i.type === "index" && !i.align && (i.align = "center"), delete i.children, i;
      })) != null ? t : [];
    }
  },
  watch: {
    queryParams: {
      handler() {
        this.innerParams.pageNum = 1, this.innerParams.pageSize = 10, this.clearRowSelection(), this.queryTableData();
      },
      deep: !0
    },
    tableData: {
      handler(e) {
        this.dataSource = e;
      },
      deep: !0
    }
  },
  methods: {
    queryTableData() {
      return I(this, null, function* () {
        var e, t;
        try {
          const s = this.formatFilter(u(u({}, $(this.innerParams, ["total"])), this.queryParams));
          this.loading = !0;
          let i;
          if (It(this.api))
            i = yield this.api(s);
          else {
            const a = jt(this.apiMethod) === "GET";
            i = yield (e = this.globalConfig) == null ? void 0 : e.$$axios({
              url: this.api,
              method: this.apiMethod,
              [a ? "params" : "data"]: s
            });
          }
          if (i = yield (t = this.formatResults) == null ? void 0 : t.call(this, i || {}), this.listKey)
            this.dataSource = J(i, this.listKey) || [];
          else {
            const a = Object.keys((i == null ? void 0 : i.data) || {}).find(
              (r) => /list$/i.test(r)
            );
            this.dataSource = J(i, `data.${a || ""}`) || [];
          }
          this.innerParams.total = J(i, this.totalKey || "data.total") || 0;
        } catch (s) {
          console.log(s), this.dataSource = [], this.innerParams.total = 0;
        }
        this.$emit("onDataChange", this.dataSource), this.loading = !1;
      });
    },
    handleSizeChange(e) {
      this.innerParams.pageSize = e, this.queryTableData();
    },
    handleCurrentChange(e) {
      this.innerParams.pageNum = e, this.queryTableData();
    },
    handleSelectionChange(e) {
      this.multipleSelection = e, this.$emit("onSelectChange", e);
    },
    /** 清空选中项 */
    clearRowSelection(e) {
      var t;
      Array.isArray(e) ? e.forEach((s) => {
        var i;
        (i = this.$refs.table) == null || i.toggleRowSelection(s);
      }) : (t = this.$refs.table) == null || t.clearSelection();
    },
    /** 操作栏回调 */
    onAction(e, t, s) {
      var a;
      const i = $(e, [
        "actionType",
        "actionName",
        "actionIcon",
        "action",
        "usePageModal"
      ]);
      if (e.usePageModal) {
        this.dispatch("versa-page", "VersaFormPageUsePageModal", t, m(u({}, i), {
          actionType: e.actionType
        }));
        return;
      }
      switch (e.actionType) {
        case "create":
          this.dispatch("versa-page", "VersaFormPageOnCreate", {}, i);
          break;
        case "remove":
          this.dispatch(
            "versa-page",
            "VersaFormPageOnRemove",
            t[this.rowKey],
            t
          );
          break;
        case "edit":
          this.dispatch("versa-page", "VersaFormPageOnUpdate", t, i);
          break;
        case "detail":
          this.dispatch("versa-page", "VersaFormPageOnDetail", t, i);
          break;
        default:
          (a = e.action) == null || a.call(e, t, s, m(u({}, e), {
            clearRowSelection: this.clearRowSelection
          }));
          break;
      }
    },
    /** 操作栏编辑 */
    filterActions(e, ...t) {
      let s = typeof e == "string" ? e.split(",") : e;
      return typeof e == "function" && (s = e(...t)), s == null ? void 0 : s.map((i) => typeof i == "string" ? ws[i] : V(i) && j(i, "actionName") && j(i, "actionType") || i != null && i.is ? m(u({}, i), {
        on: Le(i.on),
        disabled: typeof i.disabled == "function" ? i.disabled.bind(this, t[0]) : i.disabled
      }) : null).filter(Boolean);
    }
  },
  render() {
    const e = (t) => t.map((s) => {
      var i;
      return s.slotName ? h(
        W,
        u({
          "show-overflow-tooltip": !0
        }, s),
        {
          default: ({ row: a, column: r, $index: n }) => {
            var o, d;
            return (d = (o = this.$slots)[s.slotName]) == null ? void 0 : d.call(
              o,
              this.proxyPageCore({ row: a, column: r, $index: n })
            );
          }
        }
      ) : s.type === "selection" ? h(W, u({
        "reserve-selection": !0
      }, s)) : s.actions ? h(W, s, {
        default: ({ row: a, column: r, $index: n }) => h(
          G,
          {},
          {
            default: () => this.filterActions(
              s.actions,
              a,
              r,
              n
            ).map((o) => o.is ? h(b(o.is), u(u({}, o), o.on)) : h(
              R,
              m(u({
                type: "primary",
                link: !0
              }, o), {
                onClick: (d, p) => this.onAction(o, a, p)
              }),
              { default: () => o.actionName }
            ))
          }
        )
      }) : ((i = s.children) == null ? void 0 : i.length) > 0 ? h(W, ...$(s, ["children"]), {
        default: () => e(s.children)
      }) : s.sensitive ? h(W, s, {
        default: ({ row: a, column: r }) => h(Oe, {
          value: a[r.property],
          sensitiveType: typeof s.sensitiveType == "function" ? s.sensitiveType(a) : s.sensitiveType
        })
      }) : h(W, u({
        "show-overflow-tooltip": !0
      }, s));
    });
    return ce(
      h(
        se,
        {
          class: "versa-table",
          title: this.headline
        },
        {
          headerRight: () => [
            h(
              G,
              {
                class: [
                  "versa-table__tools",
                  "versa-table__tools--header",
                  {
                    "versa-table__tools--empty": !this.tools.length && !this.$slots.tools
                  }
                ],
                size: 20
              },
              {
                default: () => {
                  var t, s;
                  return [
                    ...this.tools.map((i) => i.is ? h(b(i.is), u(u({}, i), i.on)) : h(
                      R,
                      m(u({}, i), {
                        onClick: (a, r) => this.onAction(
                          i,
                          this.multipleSelection,
                          r
                        )
                      }),
                      { default: () => i.actionName }
                    )),
                    (s = (t = this.$slots).tools) == null ? void 0 : s.call(
                      t,
                      this.proxyPageCore({
                        multipleSelection: this.multipleSelection,
                        clearRowSelection: this.clearRowSelection
                      })
                    )
                  ];
                }
              }
            )
          ],
          default: () => {
            var t, s;
            return [
              h(
                ht,
                m(u({
                  style: { width: "100%" }
                }, this.extraTableProps), {
                  data: this.dataSource,
                  "row-key": this.rowKey,
                  onSelectionChange: this.handleSelectionChange,
                  ref: "table"
                }),
                {
                  empty: () => {
                    var i, a, r;
                    return (r = (a = (i = this.$slots).empty) == null ? void 0 : a.call(
                      i,
                      this.proxyPageCore({
                        multipleSelection: this.multipleSelection,
                        clearRowSelection: this.clearRowSelection
                      })
                    )) != null ? r : h(ft, { description: "暂无数据" });
                  },
                  default: () => e(this.renderOptions)
                }
              ),
              this.needPagination && this.innerParams.total > 0 ? h(mt, m(u({
                class: "versa-table__pagination",
                background: !0
              }, this.paginationConfigs), {
                total: this.innerParams.total,
                "current-page": this.innerParams.pageNum,
                "page-sizes": [10, 20, 30],
                "page-size": this.innerParams.pageSize,
                onSizeChange: this.handleSizeChange,
                onCurrentChange: this.handleCurrentChange
              })) : null,
              (s = (t = this.$slots).footer) == null ? void 0 : s.call(
                t,
                this.proxyPageCore({
                  multipleSelection: this.multipleSelection,
                  clearRowSelection: this.clearRowSelection
                })
              )
            ];
          }
        }
      ),
      [[De.directive, this.loading]]
    );
  }
};
const _s = {
  cancel: {
    actionType: "cancel",
    actionName: "取消"
  },
  confirm: {
    actionType: "confirm",
    actionName: "确认",
    type: "primary"
  }
}, Ls = {
  name: "versa-modal",
  components: {
    VersaForm: ie,
    VersaButton: R,
    ElSpace: G,
    ElDialog: yt,
    ElDrawer: gt
  },
  directives: {
    loading: De.directive
  },
  mixins: [oe],
  props: {
    /** 受控显隐 */
    visible: {
      type: Boolean,
      default: void 0
    },
    /** 操作按钮 */
    actions: {
      type: [String, Array, Function],
      default: () => "cancel,confirm"
    },
    /** 点击确认回调 */
    onOk: {
      type: Function,
      default: A
    },
    /** 弹窗类型：el-dialog | el-drawer */
    panelType: {
      type: String,
      default: "el-dialog"
    },
    /** 弹窗表单展示时格式化 */
    formatBefore: {
      type: Function,
      default: A
    },
    /** 表单配置属性 */
    formProps: {
      type: Object
    },
    maxHeight: {
      type: String
    }
  },
  emits: ["update:visible"],
  data() {
    return {
      innerVisible: !1,
      formValues: {},
      loading: !1
    };
  },
  computed: {
    /** 是否受控 */
    isControl() {
      return typeof this.visible != "undefined";
    },
    /** 是否显示弹窗 */
    dialogVisible: {
      get() {
        return this.isControl ? this.visible : this.innerVisible;
      },
      set(e) {
        this.isControl ? this.$emit("update:visible", e) : this.innerVisible = e;
      }
    },
    /** 表单通用属性 */
    mergedFormProps() {
      return Object.keys(oe.props).reduce(
        (e, t) => (typeof this[t] != "undefined" && Object.assign(e, {
          [t]: this[t]
        }), e),
        u({}, this.formProps)
      );
    },
    /** 弹窗操作栏 */
    dialogActions() {
      let e = typeof this.actions == "string" ? this.actions.split(",") : this.actions;
      return typeof this.actions == "function" && (e = this.actions(this.formValues)), e == null ? void 0 : e.map((t) => typeof t == "string" ? _s[t] : V(t) && j(t, "actionName") && j(t, "actionType") || t != null && t.is ? m(u({}, t), {
        disabled: typeof t.disabled == "function" ? t.disabled.bind(this, this.formValues) : t.disabled
      }) : null).filter(Boolean);
    },
    /** 透传的props */
    undefProps() {
      return M(
        { class: "versa-modal" },
        {
          size: this.$attrs.width
        },
        this.$attrs
      );
    },
    /** 允许内容区域滚动 */
    scrollStyles() {
      let e = null;
      return /.*vh$/.test(this.maxHeight) ? e = this.maxHeight : /^\d+(\.\d+)?(px)?$/.test(this.maxHeight) && (e = `${this.maxHeight}px`.replace(/(px)*$/, "px")), e && {
        "max-height": e,
        "overflow-y": "auto"
      };
    },
    useForm() {
      var e;
      return ((e = this.mergedFormProps.options) == null ? void 0 : e.length) > 0;
    }
  },
  watch: {
    dialogVisible: {
      handler(e) {
        e ? this.$nextTick(() => {
          this.initForm();
        }) : this.formValues = {};
      },
      immediate: !0
    }
  },
  methods: {
    // 初始化表单数据
    initForm() {
      return I(this, null, function* () {
        var t;
        let e = u({}, this.defaultValues);
        if (typeof this.formatBefore == "function")
          try {
            this.loading = !0, e = yield this.formatBefore(e, this.close);
          } catch (s) {
          }
        this.loading = !1, this.useForm ? (t = this.$refs.formRef) == null || t.addInitValue(e) : this.formValues = e;
      });
    },
    /** 操作按钮回调函数 */
    onAction(e, t) {
      return I(this, null, function* () {
        var s, i;
        switch (e.actionType) {
          case "cancel":
            typeof this.undefProps["before-close"] == "function" ? this.undefProps["before-close"](this.close) : this.dialogVisible = !1;
            break;
          case "confirm":
            this.onConfirm(t);
            break;
          default:
            if (!(!e.validate || !this.useForm || (yield (s = this.$refs.formRef) == null ? void 0 : s.validate().catch(() => !1))))
              return;
            (i = e.action) == null || i.call(e, this.formValues, t, m(u({}, e), {
              close: this.close
            }));
            break;
        }
      });
    },
    /** 点击确认 */
    onConfirm(e) {
      return I(this, null, function* () {
        var t, s;
        try {
          e.isLoading = !0, this.useForm && (yield (t = this.$refs.formRef) == null ? void 0 : t.validate()), yield (s = this.onOk) == null ? void 0 : s.call(this, this.formValues), e.isLoading = !1, this.dialogVisible = !1;
        } catch (i) {
          e.isLoading = !1;
        }
      });
    },
    /** 关闭弹窗,受控逻辑 */
    beforeClose(...e) {
      typeof this.$attrs.beforeClose == "function" ? this.$attrs.beforeClose(...e) : this.dialogVisible = !1;
    },
    /** 关闭弹窗 */
    close() {
      this.dialogVisible = !1;
    }
  }
};
function Ns(e, t, s, i, a, r) {
  const n = b("VersaForm"), o = b("VersaButton"), d = b("ElSpace"), p = qe("loading");
  return r.dialogVisible ? (f(), w(z(s.panelType), M({
    key: 0,
    "destroy-on-close": "",
    modelValue: r.dialogVisible,
    "onUpdate:modelValue": t[1] || (t[1] = (l) => r.dialogVisible = l)
  }, r.undefProps, { "before-close": r.beforeClose }), {
    default: g(() => [
      ce((f(), v("div", {
        class: H({ "is-scrollable": !!r.scrollStyles }),
        style: Ie(r.scrollStyles)
      }, [
        r.useForm ? (f(), w(n, M({ key: 0 }, r.mergedFormProps, {
          class: "versa-modal__form",
          ref: "formRef",
          autoInitValue: !1,
          modelValue: a.formValues,
          "onUpdate:modelValue": t[0] || (t[0] = (l) => a.formValues = l)
        }), O({ _: 2 }, [
          L(Object.keys(e.$slots).filter(
            (l) => l !== "default"
          ), (l) => ({
            name: l,
            fn: g((c) => [
              _(e.$slots, l, k(F(c)))
            ])
          }))
        ]), 1040, ["modelValue"])) : P("", !0),
        _(e.$slots, "default", k(F({ model: a.formValues, actionType: e.actionType, loading: a.loading, refresh: r.initForm })))
      ], 6)), [
        [p, a.loading]
      ]),
      r.dialogActions.length ? (f(), w(d, {
        key: 0,
        size: 20,
        class: "versa-modal__footer"
      }, {
        default: g(() => [
          (f(!0), v(S, null, L(r.dialogActions, (l) => (f(), v(S, {
            key: l.actionType
          }, [
            l.is ? (f(), w(z(l.is), M({
              key: 0,
              ref_for: !0
            }, l, E(l.on || {})), null, 16)) : P("", !0),
            D(o, M({ ref_for: !0 }, l, {
              onClick: (c, y) => r.onAction(l, y)
            }), {
              default: g(() => [
                B(x(l.actionName), 1)
              ]),
              _: 2
            }, 1040, ["onClick"])
          ], 64))), 128))
        ]),
        _: 1
      })) : P("", !0)
    ]),
    _: 3
  }, 16, ["modelValue", "before-close"])) : P("", !0);
}
const me = /* @__PURE__ */ T(Ls, [["render", Ns]]);
const Cs = {
  components: {
    VersaFilter: Fe,
    VersaTable: Ye,
    VersaModal: me
  },
  name: "versa-page",
  provide() {
    return {
      [Ae]: je(() => ({
        queryParams: this.queryParams,
        filterValues: this.filterValues,
        selectionValues: this.selectionValues
      }))
    };
  },
  mixins: [ue, ne],
  props: {
    /** 搜索配置项 */
    filterOptions: {
      type: Array,
      default: () => []
    },
    /** 列表配置项 */
    tableOptions: {
      type: Array,
      default: () => []
    },
    /** 新增弹窗配置项 */
    detailProps: {
      type: Object,
      default: () => ({})
    },
    /** filter 字段映射 */
    keyMap: {
      type: Object,
      default: () => ({})
    },
    /** 是否禁用重置的刷新列表 */
    disableResetRequest: {
      type: Boolean,
      default: !1
    },
    /** 是否自动查询 */
    autoLoad: {
      type: Boolean,
      default: !0
    },
    /** 新增回调 */
    onCreate: {
      type: Function,
      default: A
    },
    /** 编辑回调 */
    onUpdate: {
      type: Function,
      default: A
    },
    /** 删除 */
    onRemove: {
      type: Function,
      default: A
    }
  },
  data() {
    return {
      // table 查询参数
      queryParams: {},
      // filter 实时输入状态
      filterValues: {},
      // table 选中数据
      selectionValues: [],
      actionParams: {},
      panelVisible: !1
    };
  },
  computed: {
    /** 列表组件通用属性透传 */
    tableProps() {
      const e = Object.keys(ue.props).reduce(
        (t, s) => m(u({}, t), {
          [s]: this[s]
        }),
        {}
      );
      return e.formatFilter = (t) => {
        const s = u({}, t);
        if (V(this.keyMap))
          for (const i in this.keyMap) {
            if (!Object.hasOwnProperty.call(this.keyMap, i))
              continue;
            const a = this.keyMap[i];
            typeof a == "string" && (s[a] = s[i], delete s[i]), Array.isArray(a) && (a.forEach((r, n) => {
              var o;
              s[r] = (o = s[i]) == null ? void 0 : o[n];
            }), delete s[i]);
          }
        return this.formatFilter(s);
      }, e;
    },
    parsedSlots() {
      const e = [], t = [], s = [], i = /^modal-/, a = /^filter-/;
      return Object.keys(this.$slots).forEach((r) => {
        i.test(r) ? e.push({
          source: r,
          target: r.replace(i, "")
        }) : a.test(r) ? s.push({
          source: r,
          target: r.replace(a, "")
        }) : t.push({
          source: r,
          target: r.replace(t, "")
        });
      }), {
        modal: e,
        table: t,
        filter: s
      };
    },
    /** 列表组件通用属性透传 */
    filterProps() {
      return Object.keys(ne.props).reduce(
        (t, s) => m(u({}, t), {
          [s]: this[s]
        }),
        {}
      );
    },
    /** 弹窗组件参数 */
    modalProps() {
      return u(u({
        width: "700px"
      }, this.detailProps), this.actionParams);
    },
    /** filter事件透传 */
    filterListeners() {
      return Q(
        Y(this.$attrs, []),
        (e, t) => t.replace("onOn", "on")
      );
    },
    /** table事件透传 */
    tableListeners() {
      return Q(
        Y(this.$attrs, []),
        (e, t) => t.replace("onOn", "on")
      );
    }
  },
  created() {
    this.$emitter = new pe(), this.$emitter.on("VersaFormPageOnCreate", (e, t = {}) => {
      this.onAction("create", u({ defaultValues: {} }, t));
    }), this.$emitter.on(
      "VersaFormPageOnUpdate",
      (e = {}, t = {}) => {
        this.onAction("edit", u({ defaultValues: e }, t));
      }
    ), this.$emitter.on(
      "VersaFormPageOnDetail",
      (...s) => I(this, [...s], function* (e = {}, t = {}) {
        this.onAction("detail", u({ defaultValues: e }, t));
      })
    ), this.$emitter.on(
      "VersaFormPageUsePageModal",
      (...s) => I(this, [...s], function* (e = {}, t = {}) {
        this.onAction("usePageModal", u({ defaultValues: e }, t));
      })
    ), this.$emitter.on("VersaFormPageOnRemove", (e) => I(this, null, function* () {
      yield this.onRemove(e), this.refresh();
    }));
  },
  methods: {
    /** filter参数变化 */
    onFilterChange(e) {
      this.filterValues = e, this.$emit("onFilterChange", e);
    },
    /** table选中 */
    onSelectChange(e) {
      this.selectionValues = e, this.$emit("onSelectChange", e);
    },
    /** 重置 */
    onReset(e) {
      var t;
      this.disableResetRequest || (t = this.$refs.filterRef) == null || t.validate((s) => {
        s && (this.queryParams = u({}, e));
      });
    },
    /** 初始化成 */
    onMounted(e) {
      var t;
      this.autoLoad && ((t = this.$refs.filterRef) == null || t.validate((s) => {
        s ? this.queryParams = u({}, e) : this.$refs.filterRef.clearValidate();
      }));
    },
    /** 搜索 */
    onSearch(e) {
      this.queryParams = u({}, e);
    },
    /** 内置操作回调 */
    onAction(e = "create", t = {}) {
      var s, i;
      this.actionParams = u({
        title: (i = (s = te[e]) == null ? void 0 : s.actionName) != null ? i : "",
        status: ["detail", "usePageModal"].includes(e) ? "preview" : "edit",
        actions: ["detail", "usePageModal"].includes(e) ? "" : void 0,
        formatBefore: e === "create" ? null : this.detailProps.formatBefore,
        actionType: e,
        onOk: (a) => I(this, null, function* () {
          var r;
          yield (r = this[e === "create" ? "onCreate" : "onUpdate"]) == null ? void 0 : r.call(
            this,
            a
          ), this.refresh();
        })
      }, t), this.panelVisible = !0;
    },
    /** 刷新列表 */
    refresh(e) {
      this.queryParams = e || u({}, this.queryParams);
    }
  }
}, Ss = { class: "versa-page" };
function Vs(e, t, s, i, a, r) {
  const n = b("VersaFilter"), o = b("VersaTable"), d = b("VersaModal");
  return f(), v("div", Ss, [
    D(n, M({ ref: "filterRef" }, r.filterProps, {
      options: s.filterOptions,
      defaultFilters: e.defaultFilters,
      onOnReset: r.onReset,
      onOnSearch: r.onSearch,
      onOnMounted: r.onMounted,
      onOnFilterChange: r.onFilterChange
    }, E(r.filterListeners)), O({ _: 2 }, [
      L(r.parsedSlots.filter, (p) => ({
        name: p.target,
        fn: g((l) => [
          _(e.$slots, p.source, k(F(l)))
        ])
      }))
    ]), 1040, ["options", "defaultFilters", "onOnReset", "onOnSearch", "onOnMounted", "onOnFilterChange"]),
    D(o, M(r.tableProps, {
      autoLoad: !1,
      options: s.tableOptions,
      queryParams: a.queryParams,
      onOnSelectChange: r.onSelectChange
    }, E(r.tableListeners)), O({ _: 2 }, [
      L(r.parsedSlots.table, (p) => ({
        name: p.target,
        fn: g((l) => [
          _(e.$slots, p.source, k(F(l)))
        ])
      }))
    ]), 1040, ["options", "queryParams", "onOnSelectChange"]),
    D(d, M(r.modalProps, {
      visible: a.panelVisible,
      "onUpdate:visible": t[0] || (t[0] = (p) => a.panelVisible = p)
    }), O({ _: 2 }, [
      L(r.parsedSlots.modal, (p) => ({
        name: p.target,
        fn: g((l) => [
          _(e.$slots, p.source, k(F(l)))
        ])
      }))
    ]), 1040, ["visible"])
  ]);
}
const Is = /* @__PURE__ */ T(Cs, [["render", Vs]]);
const js = {
  name: "versa-dropdown",
  inheritAttrs: !1,
  props: {
    /** 配置项，{label: '', value: ''} */
    options: {
      type: Array,
      default: () => []
    },
    // 渲染map对象
    mapSource: {
      type: Object
    },
    labelInValue: {
      type: [Object, Boolean],
      default: !1
    },
    /** 操作文案 */
    text: {
      type: [String, Object]
    },
    icon: {
      type: String,
      default: "el-icon-arrow-down el-icon--right"
    },
    /** 外部控制loading */
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      isLoading: !1
    };
  },
  watch: {
    /** 允许外部loading状态直接控制内部loading */
    loading: {
      handler() {
        this.isLoading = this.loading;
      },
      immediate: !0
    }
  },
  computed: {
    mergedOptions() {
      const e = [];
      return this.mapSource ? Object.keys(this.mapSource).forEach((t) => {
        e.push({
          label: this.mapSource[t],
          value: t
        });
      }) : e.push(...this.options), e;
    }
  },
  methods: {
    // 绑定属性
    bindProps(e) {
      const t = u({}, e);
      return delete t.label, delete t.value, t;
    },
    /** 点击回调 */
    onAction(e) {
      var a;
      if (!this.labelInValue) {
        this.$emit("command", e, this);
        return;
      }
      const t = (a = this.mergedOptions) == null ? void 0 : a.find((r) => e === r.value), s = Y(t, ["label", "value"]), i = Q(
        s,
        (r, n) => this.labelInValue[n] || n
      );
      this.$emit("command", i, this);
    }
  },
  render() {
    var i, a;
    if ((V(this.text) && !this.text.text || !this.text) && !this.$slots.default)
      return null;
    const e = m(u({
      placement: "bottom"
    }, this.$attrs), {
      onCommand: this.onAction,
      class: "versa-dropdown",
      ref: "versaDropdown"
    }), t = this.mergedOptions.map((r) => {
      const n = m(u({}, this.bindProps(r)), {
        command: r.value,
        class: "versa-dropdown-item"
      });
      return h(Mt, n, {
        default: () => r.label
      });
    }), s = [];
    if (this.$attrs["split-button"])
      s.push(V(this.text) ? this.text.text : this.text);
    else if (typeof this.text == "string") {
      const r = [this.text];
      this.icon && r.push(h("i", { class: this.icon })), s.push(
        h(
          R,
          {
            type: "primary",
            link: !0,
            disabled: this.$attrs.disabled,
            loading: this.isLoading
          },
          { default: () => r }
        )
      );
    } else
      V(this.text) ? s.push(
        h(
          R,
          m(u({
            type: "primary",
            link: !0
          }, this.text), {
            disabled: this.$attrs.disabled,
            loading: this.isLoading
          }),
          { default: () => this.text.text }
        )
      ) : s.push((a = (i = this.$slots).default) == null ? void 0 : a.call(i));
    return h(vt, e, {
      default: () => s,
      dropdown: () => h(
        bt,
        { slot: "dropdown" },
        { default: () => t }
      )
    });
  }
}, Ds = {
  props: {
    /** 是否监听尺寸变化 */
    measure: Boolean
  },
  emits: ["onResize"],
  mounted() {
    this.$nextTick(() => {
      !this.$refs.measureRef || !this.measure || (this.observer = new ResizeObserver((e) => {
        e.forEach((t) => {
          this.$emit("onResize", { width: t.contentRect.width });
        });
      }), this.observer.observe(this.$refs.measureRef));
    });
  },
  beforeUnmount() {
    var e;
    this.measure && this.$refs.measureRef && ((e = this.observer) == null || e.unobserve(this.$refs.measureRef));
  }
}, Ts = {
  ref: "measureRef",
  style: { padding: "0", border: "0", height: "0" }
};
function As(e, t, s, i, a, r) {
  return f(), v("td", Ts, null, 512);
}
const xs = /* @__PURE__ */ T(Ds, [["render", As]]);
class le {
  constructor(t) {
    const { type: s, values: i, status: a, mounted: r = A, isNew: n = !1 } = t;
    switch (this.type = s, this.values = i, this.temporaryValues = i, this.isNew = n, this.type) {
      case "dialog":
      case "inline":
        this.status = "preview";
        break;
      case "sync":
        this.status = a;
    }
    this.mounted = r;
  }
}
const Os = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTEzNi44NjMsMTI5Ljg2NGgtNS4xMzF2LTUuMTMxYS45MzQuOTM0LDAsMSwwLTEuODY4LDB2NS4xMzJoLTUuMTMxYS45MzQuOTM0LDAsMSwwLDAsMS44NjhoNS4xMzJ2NS4xMzJhLjkzNC45MzQsMCwxLDAsMS44NjgsMHYtNS4xMzRoNS4xMzJhLjkzNC45MzQsMCwxLDAsMC0xLjg2OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjMuOCAtMTIzLjgpIi8+PC9zdmc+";
const Z = Y(te, [
  "save",
  "cancel",
  "edit",
  "up",
  "down",
  "remove"
]), zs = {
  name: "versa-repeater",
  inheritAttrs: !1,
  components: {
    VersaForm: Ve(() => Promise.resolve().then(() => ms)),
    VersaButton: R,
    VersaModal: me,
    VersaMeasureCell: xs,
    ElSpace: G
  },
  inject: {
    /** 如果在versa-form下使用，则为嵌套表单 */
    VersaFormItem: {
      default: null
    }
  },
  props: {
    /** 增删查改模型：sync - 行内编辑； inline - 表格内编辑、保存； dialog - 弹窗类型 */
    type: {
      type: String,
      // 行内编辑
      default: "sync"
    },
    /** 表单配置项 */
    options: {
      type: Array,
      default: () => []
    },
    /** v-model的值 */
    modelValue: {
      type: Array
    },
    /** 全局编辑状态: edit,preview,disabled */
    status: {
      type: String,
      default: "edit"
    },
    /** 单行状态 */
    rowStatus: {
      type: [String, Function]
    },
    /** 行内唯一key */
    rowKey: String,
    /** 每一行的默认值 */
    defaultValues: {
      type: Object,
      default: () => ({})
    },
    /** 新增之前是否要校验其它数据是否校验通过 */
    validateBeforeAdd: {
      type: Boolean,
      default: !0
    },
    /** 最长可增加到多少行 */
    maxLength: Number,
    /** 除系统预设的其它按钮 */
    actions: {
      type: Array,
      default: () => []
    },
    /** 是否有新增按钮 */
    hasAdd: {
      type: Boolean,
      default: !0
    },
    /** 是否有删除操作按钮 */
    hasDelete: {
      type: [Boolean, Function],
      default: !0
    },
    /** 是否有编辑操作按钮 */
    hasUpdate: {
      type: [Boolean, Function],
      default: !0
    },
    /** 是否有保存操作按钮 */
    hasSave: {
      type: [Boolean, Function]
    },
    /** 是否有上移操作按钮 */
    hasMoveUp: {
      type: [Boolean, Function]
    },
    /** 是否有下移操作按钮 */
    hasMoveDown: {
      type: [Boolean, Function]
    },
    /** 各种异步操作钩子：add-新增；update-从预览态改为编辑态；save-编辑保存；remove-删除 */
    asyncHandler: {
      type: Object,
      default: () => ({})
    },
    /** 编号 */
    index: {
      type: [String, Boolean, Number, Function],
      default: () => (e) => e < 9 ? `0${e + 1}` : e + 1
    },
    /** 对齐方式: left/right/center */
    itemAlign: {
      type: String,
      default: "left"
    },
    /** 固定列模式(转换为二进制使用)： 1(1)-编号左固定；2(10)-编号右固定；4(100)-操作左固定；8(1000)-操作右固定 */
    fixedMode: {
      type: Number,
      default: 0
    },
    addText: {
      type: String,
      default: "新增"
    }
  },
  data() {
    return {
      formList: [],
      visible: !1,
      actionParams: {},
      fixedColumnWidth: {},
      pingedLeft: !1,
      pingedRight: !1,
      IconPlus: Os
    };
  },
  watch: {
    modelValue: {
      handler(e) {
        var t;
        this.formList = (t = e == null ? void 0 : e.map((s) => this.formList.find((a) => a.values === s || a.temporaryValues === s || s[this.rowKey] && a.values[this.rowKey] === s[this.rowKey] || s.__rowKey && a.values.__rowKey === s.__rowKey) || new le({
          values: s,
          type: this.type,
          status: this.status || rowStatus
        }))) != null ? t : [];
      },
      immediate: !0
    },
    status: {
      handler(e) {
        var t;
        (t = this.formList) == null || t.forEach((s, i) => {
          switch (this.type) {
            case "sync":
              s.status = e;
              break;
            case "inline":
              e === "disabled" ? s.status = e : e === "preview" ? this.onAction({ actionType: "cancel" }, s, i, {}) : e === "edit" && this.onAction({ actionType: "edit" }, s, i, {});
              break;
          }
        });
      }
    }
  },
  computed: {
    /** 是否展示新增按钮 */
    wheatherShowAddBtn() {
      return this.status === "edit" && this.hasAdd && (!this.maxLength || this.formList.length < this.maxLength);
    },
    /** 是否受控 */
    isControl() {
      return typeof this.modelValue != "undefined";
    },
    /** 表单帮定值 */
    model: {
      get() {
        return (this.isControl ? this.modelValue : this.innerFormValues) || [];
      }
    },
    /** 新增数据时所赋初值 */
    initValue() {
      const e = u({}, this.defaultValues);
      return this.options.forEach((t) => {
        const s = j(e, t.prop);
        s && typeof t.initValue != "undefined" ? e[t.prop] = t.initValue : s && typeof t.initValue == "undefined" || (typeof t.initValue == "undefined" ? e[t.prop] = null : e[t.prop] = t.initValue);
      }), e;
    },
    /** 是否存在操作列 */
    hasOperateColumn() {
      if (this.status !== "edit")
        return !1;
      const e = this.formList.length;
      let t = 0, s = 0;
      this.formList.forEach((r, n) => {
        this.decideHasBtn("hasDelete", r.values, n) || (t += 1), this.decideHasBtn("hasUpdate", r.values, n) || (s += 1);
      });
      const i = e ? t < e : this.hasDelete, a = e ? s < e : this.hasUpdate;
      return this.type === "sync" ? i : i || a;
    },
    /** 左固定的列 */
    fixedLeftColumn() {
      return this.options.filter(
        (e) => e.fixed && e.fixed !== "right"
      );
    },
    /** 右固定的列 */
    fixedRightColumn() {
      return this.options.filter((e) => e.fixed === "right");
    },
    /** 未固定的列 */
    normalColumn() {
      return this.options.filter((e) => !e.fixed);
    },
    /** 列表实际渲染的组件 */
    deployOptions() {
      const e = [...this.fixedLeftColumn], t = [...this.fixedRightColumn], s = [...this.normalColumn], i = !!e.length || !!t.length;
      if (this.index) {
        const a = {
          width: 60,
          label: "序号",
          prop: "__index",
          slotName: "index",
          useCustomPreview: !0,
          itemAlign: "center"
        };
        2 & this.fixedMode ? t.unshift(m(u({}, a), { fixed: "right" })) : i || 1 & this.fixedMode ? e.unshift(m(u({}, a), { fixed: "left" })) : s.unshift(a);
      }
      if (this.hasOperateColumn) {
        const a = {
          label: "操作",
          slotName: "operate",
          prop: "__operate",
          useCustomPreview: !0
        };
        4 & this.fixedMode ? e.push(m(u({}, a), { fixed: "left" })) : i || 8 & this.fixedMode ? t.push(m(u({}, a), { fixed: "right" })) : s.push(a);
      }
      return [].concat(e, s, t).map((a) => {
        var o, d;
        let r = "", n = "";
        if (a.fixed) {
          const p = a.fixed === "right", l = p ? "right" : "left", c = p ? [...t].reverse() : e;
          let y = 0;
          c.some((N) => {
            const U = N.prop === a.prop;
            return U || (y += this.fixedColumnWidth[N.prop] || 0), U;
          }), r = `position: sticky; ${l}: ${y}px;z-index: 2`, (p && ((o = t[0]) == null ? void 0 : o.prop) === a.prop || !p && ((d = e.slice(-1)[0]) == null ? void 0 : d.prop) === a.prop) && (n += ` versa-repeater__table-row-fixed--${l}`);
        }
        return m(u({}, a), {
          width: void 0,
          label: void 0,
          __width: a.width,
          __label: a.label,
          __fixedClass: n,
          formItemProps: {
            class: `versa-repeater__table-row--cell versa-repeater__table-row--${a.itemAlign || this.itemAlign}` + n,
            itemStyle: r,
            contentStyle: Object.assign(
              {},
              a.width ? { width: `${a.width - 20}px` } : {}
            )
          }
        });
      });
    },
    /** 弹窗实际渲染的组件 */
    dialogDeployOptions() {
      return [
        ...this.fixedLeftColumn,
        ...this.normalColumn,
        ...this.fixedRightColumn
      ].map((e) => m(u({}, e), {
        width: void 0
      }));
    },
    /** 弹窗组件参数 */
    modalProps() {
      return u({
        width: "700px",
        options: this.dialogDeployOptions,
        actions: [
          {
            actionType: "cancel",
            actionName: "取消"
          },
          {
            actionType: "repeaterConfirm",
            actionName: "确认",
            type: "primary",
            validate: !0,
            action: this.onModalConfirm
          }
        ]
      }, this.actionParams);
    }
  },
  methods: {
    /** 监听table滚动 */
    onScroll({ currentTarget: e }) {
      const { scrollLeft: t, scrollWidth: s, clientWidth: i } = e;
      this.pingedLeft = s !== i && t > 0, this.pingedRight = s !== i && t < s - i - 1;
    },
    /** 监听表单值变化 */
    onValueChange(e, t, s, i) {
      var a;
      if (i === "mounted") {
        e.values = t, !e.isNew && this.$emit("update:modelValue", this.getValues()), (a = e.mounted) == null || a.call(e, e);
        return;
      }
      this.type === "sync" && this.$emit("onValueChange", e, s);
    },
    /** 获取表单值 */
    getValues() {
      var e, t;
      return (t = (e = this.formList) == null ? void 0 : e.map((s) => s.values)) != null ? t : [];
    },
    /** 弹窗回调 */
    onModalConfirm(e, t, s) {
      return I(this, null, function* () {
        const [i, a] = yield this.handleAsyncAction(
          "save",
          e,
          this.formList.length
        );
        if (!i)
          return;
        const { formCore: r, dialogType: n } = this.actionParams;
        r.values = a, n === "add" && this.formList.push(r), this.$emit("update:modelValue", this.getValues()), s.close();
      });
    },
    /** 是否有自定义指定按钮 */
    decideHasBtn(e, t, s) {
      const i = this[e];
      let a = !0;
      return typeof i == "boolean" ? a = i : typeof i == "function" && (a = i(t, s, { globalStatus: this.status })), a;
    },
    /** 操作栏编辑 */
    filterActions(e, t) {
      const s = [], { values: i } = e, a = this.type === "inline" && e.status === "edit";
      a && this.decideHasBtn("hasUpdate", i, t) && (s.push(Z.save), s.push(Z.cancel)), ["inline", "dialog"].includes(this.type) && e.status === "preview" && this.decideHasBtn("hasUpdate", i, t) && s.push(Z.edit), t !== 0 && this.decideHasBtn("hasMoveUp", i, t) && s.push(Z.up), t !== this.formList.length - 1 && this.decideHasBtn("hasMoveDown", i, t) && s.push(Z.down), !a && this.decideHasBtn("hasDelete", i, t) && s.push(Z.remove);
      let r = Array.isArray(this.actions) ? this.actions : [this.actions];
      typeof this.actions == "function" && (r = this.actions(i, t, {
        globalStatus: this.status
      }));
      const n = r == null ? void 0 : r.map((o) => V(o) && j(o, "actionName") && j(o, "actionType") || o != null && o.is ? m(u({}, o), {
        disabled: typeof o.disabled == "function" ? o.disabled.bind(this, e) : o.disabled
      }) : null).filter(Boolean);
      return [...s, ...n];
    },
    /** 新增 */
    onAdd() {
      return I(this, null, function* () {
        const e = this.formList.length;
        if (e >= this.maxLength || !(!this.validateBeforeAdd || (yield this.validate().catch((r) => (console.warn("[VersaRepeater] 新增校验失败", r), !1)))))
          return;
        const [s, i] = yield this.handleAsyncAction(
          "add",
          m(u({}, this.initValue), { __rowKey: `repeater_${Tt()}` }),
          e
        );
        if (!s)
          return;
        if (this.type === "dialog") {
          this.visible = !0, this.actionParams = {
            title: "新增",
            dialogType: "add",
            formCore: new le({
              values: i,
              type: this.type,
              status: "edit"
            })
          };
          return;
        }
        const a = new le({
          values: i,
          type: this.type,
          status: "edit",
          isNew: this.type === "inline",
          mounted: (r) => {
            this.type === "inline" && (r.temporaryValues = r.values, r.values = ee(r.values), r.status = "edit");
          }
        });
        this.formList.push(a);
      });
    },
    /** 操作按钮 */
    onAction(e, t, s, i) {
      return I(this, null, function* () {
        var r, n, o;
        const { values: a } = t;
        if (e.usePageModal) {
          this.visible = !0, this.actionParams = u({
            formCore: t,
            defaultValues: t.values
          }, e);
          return;
        }
        switch (e.actionType) {
          case "remove": {
            const [d] = yield this.handleAsyncAction(
              "remove",
              this.formList[s].values,
              s
            );
            if (!d)
              return;
            this.formList.splice(s, 1), this.$emit("update:modelValue", this.getValues());
            break;
          }
          case "up": {
            this.formList.splice(s - 1, 0, ...this.formList.splice(s, 1)), this.$emit("update:modelValue", this.getValues());
            break;
          }
          case "down": {
            this.formList.splice(s + 1, 0, ...this.formList.splice(s, 1)), this.$emit("update:modelValue", this.getValues());
            break;
          }
          case "edit": {
            const [d, p] = yield this.handleAsyncAction(
              "update",
              t.values,
              s
            );
            if (!d)
              return;
            this.type === "dialog" ? (this.visible = !0, this.actionParams = {
              title: "新增",
              formCore: t,
              defaultValues: p
            }) : this.type === "inline" && (t.temporaryValues = t.values, t.values = p, t.status = "edit");
            break;
          }
          case "save": {
            if (!(yield (n = (r = this.$refs.repeaterRows) == null ? void 0 : r[s]) == null ? void 0 : n.validate().catch((c) => (console.warn("[VersaRepeater] 保存校验失败", c), !1))))
              return;
            const [p, l] = yield this.handleAsyncAction(
              "save",
              t.values,
              s
            );
            if (!p)
              return;
            t.temporaryValues = l, t.values = l, t.status = "preview", t.isNew = !1, this.$emit("update:modelValue", this.getValues()), this.$emit("onValueChange", t, s);
            break;
          }
          case "cancel": {
            if (t.isNew) {
              this.formList.splice(s, 1);
              return;
            }
            t.values = t.temporaryValues, t.status = "preview";
            break;
          }
          default: {
            (o = e.action) == null || o.call(e, a, i, u({}, e));
            break;
          }
        }
      });
    },
    /** 校验 */
    validate(e) {
      var r, n;
      let t;
      typeof e != "function" && (t = new Promise((o, d) => {
        e = function(p, l) {
          p ? o(p) : d(l);
        };
      }));
      let s = !0, i = 0;
      !((r = this.$refs.repeaterRows) != null && r.length) && e && e(!0);
      const a = {};
      if ((n = this.$refs.repeaterRows) == null || n.forEach((o, d) => {
        o.validate((p, l) => {
          p || (s = !1, Object.assign(a, { [d]: l })), typeof e == "function" && ++i === this.$refs.repeaterRows.length && e(s, a);
        });
      }), t)
        return t;
    },
    /** 清除校验 */
    clearValidate() {
      var e;
      (e = this.$refs.repeaterRows) == null || e.forEach((t) => {
        t.clearValidate();
      });
    },
    /** 各内置钩子异步逻辑统一处理 */
    handleAsyncAction(e, t, s) {
      return I(this, null, function* () {
        var n, o, d;
        const i = ee(t);
        let a = null, r = !0;
        try {
          a = (d = yield (o = (n = this.asyncHandler)[e]) == null ? void 0 : o.call(n, i, s)) != null ? d : !0;
        } catch (p) {
          result = !1;
        }
        if (typeof a == "boolean")
          r = a, a = a ? i : null;
        else if (a === void 0)
          r = !0, a = i;
        else if (V(a)) {
          const { success: p, values: l } = a || {};
          r = p, a = l;
        }
        return [r, a];
      });
    },
    /** 监听盒子尺寸变化 */
    onResize(e, t) {
      this.fixedColumnWidth[e.prop] = t.width || 0;
    }
  },
  created() {
    this.VersaFormItem && this.VersaFormItem.$emitter.emit("addField", this);
  },
  mounted() {
    this.rowKey || console.warn("[VersaRepeater] 未声明每一行的唯一key, 可能造成状态异常!"), this.$nextTick(() => {
      this.$refs.scrollRef && this.onScroll({ currentTarget: this.$refs.scrollRef });
    });
  }
}, Ps = {
  class: "versa-repeater",
  ref: "formRef"
}, Es = { class: "versa-repeater__table" }, ks = ["width"], Fs = { class: "versa-repeater__table-header" }, Ys = { class: "versa-repeater__table-row" }, Rs = { class: "versa-repeater__table-body" };
function $s(e, t, s, i, a, r) {
  const n = b("VersaMeasureCell"), o = b("VersaButton"), d = b("ElSpace"), p = b("VersaForm"), l = b("VersaModal");
  return f(), v("div", Ps, [
    C("div", {
      ref: "scrollRef",
      class: H([
        "versa-repeater__scroll",
        {
          "versa-repeater__scroll-pinged--left": a.pingedLeft,
          "versa-repeater__scroll-pinged--right": a.pingedRight
        }
      ]),
      onScroll: t[0] || (t[0] = (...c) => r.onScroll && r.onScroll(...c))
    }, [
      C("table", Es, [
        C("colgroup", null, [
          (f(!0), v(S, null, L(r.deployOptions, (c) => (f(), v("col", {
            width: c.__width || "auto"
          }, null, 8, ks))), 256))
        ]),
        C("thead", Fs, [
          C("tr", Ys, [
            (f(!0), v(S, null, L(r.deployOptions, (c) => (f(), v("th", {
              class: H([
                "versa-repeater__table-header--cell",
                `versa-repeater__table-row--${c.itemAlign || c.itemAlign}`,
                c.__fixedClass
              ]),
              style: Ie(c.formItemProps.itemStyle)
            }, x(c.__label), 7))), 256))
          ])
        ]),
        C("tbody", Rs, [
          C("tr", null, [
            (f(!0), v(S, null, L(r.deployOptions, (c) => (f(), w(n, {
              key: c.prop,
              measure: !!c.fixed,
              onOnResize: (y) => r.onResize(c, y)
            }, null, 8, ["measure", "onOnResize"]))), 128))
          ]),
          (f(!0), v(S, null, L(a.formList, (c, y) => (f(), w(p, {
            component: "tr",
            isRepeater: "",
            ref_for: !0,
            ref: "repeaterRows",
            class: "versa-repeater__table-row",
            options: r.deployOptions,
            status: c.status,
            defaultValues: c.values,
            key: `${c.values.rowKey || ""}-${y}-${c.values.__rowKey || ""}`,
            modelValue: c.values,
            onOnMounted: (N) => r.onValueChange(c, N, y, "mounted"),
            onInput: (N) => r.onValueChange(c, N, y)
          }, O({ _: 2 }, [
            r.hasOperateColumn ? {
              name: "operate",
              fn: g(() => [
                D(d, null, {
                  default: g(() => [
                    (f(!0), v(S, null, L(r.filterActions(c, y), (N) => (f(), v(S, null, [
                      N.is ? (f(), w(z(N.is), M({
                        key: 0,
                        ref_for: !0
                      }, N, E(N.on || {})), null, 16)) : (f(), w(o, M({
                        key: 1,
                        type: "primary",
                        link: "",
                        ref_for: !0
                      }, N, {
                        onClick: (U, K) => r.onAction(N, c, y, K)
                      }), {
                        default: g(() => [
                          B(x(N.actionName), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"]))
                    ], 64))), 256))
                  ]),
                  _: 2
                }, 1024)
              ]),
              key: "0"
            } : void 0,
            s.index ? {
              name: "index",
              fn: g(() => [
                C("span", null, x(typeof s.index == "function" ? s.index(y) : s.index), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["options", "status", "defaultValues", "modelValue", "onOnMounted", "onInput"]))), 128))
        ])
      ])
    ], 34),
    r.wheatherShowAddBtn ? (f(), w(o, {
      key: 0,
      link: "",
      type: "primary",
      class: "versa-repeater__add",
      actionIcon: a.IconPlus,
      onClick: r.onAdd
    }, {
      default: g(() => [
        B(x(s.addText), 1)
      ]),
      _: 1
    }, 8, ["actionIcon", "onClick"])) : P("", !0),
    D(l, M(r.modalProps, {
      visible: a.visible,
      "onUpdate:visible": t[1] || (t[1] = (c) => a.visible = c)
    }), O({ _: 2 }, [
      L(Object.keys(e.$slots), (c) => ({
        name: c,
        fn: g((y) => [
          _(e.$slots, c, k(F(y)))
        ])
      }))
    ]), 1040, ["visible"])
  ], 512);
}
const Re = /* @__PURE__ */ T(zs, [["render", $s]]), Bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Re
}, Symbol.toStringTag, { value: "Module" })), Us = {
  name: "versa-provide",
  provide() {
    return {
      [xe]: je(() => ({
        $$axios: this.axiosInstance,
        toastError: this.toastError
      }))
    };
  },
  props: {
    axiosInstance: {
      type: Function,
      default: () => () => {
      }
    },
    toastError: {
      type: Function,
      default: (e) => wt({ message: e, type: "error" })
    }
  },
  data() {
    return {};
  }
};
function Ws(e, t, s, i, a, r) {
  return _(e.$slots, "default");
}
const Zs = /* @__PURE__ */ T(Us, [["render", Ws]]), Hs = [
  Is,
  Fe,
  Ye,
  ie,
  me,
  R,
  ke,
  ze,
  js,
  Te,
  Re,
  se,
  Zs,
  Ee
], Ui = (e) => {
  Hs.forEach((t) => {
    e.component(de(Qe(t.name)), t);
  });
};
export {
  R as VersaButton,
  se as VersaCard,
  ke as VersaCheckboxGroup,
  js as VersaDropdown,
  Fe as VersaFilter,
  ie as VersaForm,
  kt as VersaMessageBox,
  me as VersaModal,
  Is as VersaPage,
  Zs as VersaProvide,
  ze as VersaRadioGroup,
  Re as VersaRepeater,
  Te as VersaSelect,
  Ye as VersaTable,
  Ui as default
};
