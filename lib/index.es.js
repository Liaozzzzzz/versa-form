var Ne = Object.defineProperty, Pe = Object.defineProperties;
var xe = Object.getOwnPropertyDescriptors;
var ce = Object.getOwnPropertySymbols;
var je = Object.prototype.hasOwnProperty, Oe = Object.prototype.propertyIsEnumerable;
var fe = (e, t, s) => t in e ? Ne(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, u = (e, t) => {
  for (var s in t || (t = {}))
    je.call(t, s) && fe(e, s, t[s]);
  if (ce)
    for (var s of ce(t))
      Oe.call(t, s) && fe(e, s, t[s]);
  return e;
}, f = (e, t) => Pe(e, xe(t));
var j = (e, t, s) => new Promise((i, a) => {
  var r = (p) => {
    try {
      n(s.next(p));
    } catch (l) {
      a(l);
    }
  }, o = (p) => {
    try {
      n(s.throw(p));
    } catch (l) {
      a(l);
    }
  }, n = (p) => p.done ? i(p.value) : Promise.resolve(p.value).then(r, o);
  n((s = s.apply(e, t)).next());
});
import { h as y, isRef as Ae, resolveComponent as g, openBlock as h, createElementBlock as _, normalizeClass as q, createElementVNode as O, toDisplayString as D, renderSlot as C, createVNode as L, withCtx as m, Fragment as M, renderList as S, createBlock as b, resolveDynamicComponent as $, mergeProps as v, toHandlers as R, createTextVNode as W, createCommentVNode as B, defineAsyncComponent as ve, normalizeProps as A, guardReactiveProps as T, createSlots as E, resolveDirective as _e, withDirectives as Ve, computed as we, normalizeStyle as Ie } from "vue";
import z from "lodash/pick";
import K from "lodash/mapKeys";
import ne from "tiny-emitter";
import U from "lodash/omit";
import { ElOption as me, ElOptionGroup as Te, ElSelect as ke, ElMessageBox as ye, ElButton as Fe, ElPopconfirm as De, ElSpace as H, ElRadioButton as $e, ElRadio as Re, ElRadioGroup as ze, ElIcon as Ee, ElImage as Ye, ElCheckboxButton as Be, ElCheckbox as We, ElCheckboxGroup as Ue, ElRow as He, ElTableColumn as Ze, ElLoading as Me, ElTable as Ge, ElEmpty as qe, ElPagination as Ke, ElDropdownItem as Qe, ElDropdown as Je, ElDropdownMenu as Xe } from "element-plus";
import "element-plus/es/components/space/style/css";
import re from "lodash/cloneDeep";
import "element-plus/es/components/row/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/option-group/style/css";
import Q from "lodash/get";
import et from "lodash/upperFirst";
import tt from "dayjs";
import st from "async-validator";
import it from "lodash/debounce";
import "element-plus/es/components/message-box/style/css";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/popconfirm/style/css";
import "element-plus/es/components/radio/style/css";
import "element-plus/es/components/radio-button/style/css";
import "element-plus/es/components/radio-group/style/css";
import { Plus as rt, Delete as at } from "@element-plus/icons-vue";
import "lodash/ceil";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/image/style/css";
import "element-plus/es/components/checkbox-button/style/css";
import "element-plus/es/components/checkbox/style/css";
import "element-plus/es/components/checkbox-group/style/css";
import lt from "lodash/isFunction";
import ot from "lodash/upperCase";
import "element-plus/es/components/table/style/css";
import "element-plus/es/components/empty/style/css";
import "element-plus/es/components/pagination/style/css";
import "element-plus/es/components/loading/style/css";
import "element-plus/es/components/table-column/style/css";
import "element-plus/es/components/dropdown/style/css";
import "element-plus/es/components/dropdown-item/style/css";
import "element-plus/es/components/dropdown-menu/style/css";
const J = (e) => ["", null, void 0].includes(e), k = (e) => e, P = (e) => Object.prototype.toString.call(e).toLocaleLowerCase() === "[object object]", x = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function X(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
const nt = () => Math.random().toString(36).slice(2);
const ut = {
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
        return this.multiple ? t : J(t[0]) && this.mergedHasAll ? this.valueOfAll : t[0];
      },
      set(e) {
        var a, r;
        if (!this.labelInValue || e === this.valueOfAll || J(e)) {
          this.$emit(
            "update:modelValue",
            e === this.valueOfAll ? null : e
          );
          return;
        }
        const t = X(e), i = ((r = (a = this.mergedOptions) == null ? void 0 : a.filter(
          (o) => t.includes(o.value)
        )) != null ? r : []).map((o) => {
          let n = z(o, ["label", "value"]);
          return P(this.labelInValue) && (n = K(n, (p, l) => this.labelInValue[l] || l)), n;
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
      return y(
        "div",
        {
          ref: "renderText",
          class: "versa-form__item--preview"
        },
        this.previewText
      );
    const e = this.mergedOptions.map((a) => {
      var p, l, d;
      const r = {
        label: a.label,
        value: a.value,
        disabled: a.disabled
      }, o = ((p = a.children) == null ? void 0 : p.length) > 0, n = (d = (l = a.children) == null ? void 0 : l.map((c) => {
        const V = {
          props: {
            label: c.label,
            value: c.value,
            disabled: c.disabled
          }
        };
        return y(me, V);
      })) != null ? d : [];
      return y(o ? Te : me, r, {
        default: () => n
      });
    }), t = Object.keys(this.$slots).map((a) => a === "default" ? this.$slots[a]() : this.$slots[a]()), s = [...e, ...t], i = f(u({
      teleported: !1
    }, this.$attrs), {
      multiple: this.multiple,
      modelValue: this.innerValue,
      "onUpdate:modelValue": (a) => this.innerValue = a,
      class: `versa-select ${this.$attrs.class || ""}`,
      ref: "versaSelectRef"
    });
    return y(ke, i, {
      default: () => s
    });
  }
}, dt = {
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
    return y(
      "div",
      { class: "versa-form-item__label-wrap", style: s },
      {
        default: () => e
      }
    );
  }
}, pt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmNjO29wYWNpdHk6MDt9LmJ7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTc1NiAtMTk4KSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTc1NiAxOTgpIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik05LjgyMyw4NS42MzFhNy42NzUsNy42NzUsMCwwLDEtNy42NjctNy42NjcuNzg0Ljc4NCwwLDEsMSwxLjU2NywwQTYuMSw2LjEsMCwxLDAsNi4zOTIsNzIuOTJhLjc4My43ODMsMCwxLDEtLjg4Mi0xLjI5Myw3LjY2Nyw3LjY2NywwLDEsMSw0LjMxMywxNFpNMS4wNzYsNzkuMzU4YS41NzUuNTc1LDAsMCwxLS4zMzQtLjEuNTg3LjU4NywwLDAsMS0uMTQ4LS44MTdsMS41MjYtMi4yYS41ODcuNTg3LDAsMSwxLC45NjUuNjY5bC0xLjUyNiwyLjJBLjU4Ny41ODcsMCwwLDEsMS4wNzYsNzkuMzU4Wk00LjgsNzguNjg0YS41NzUuNTc1LDAsMCwxLS4zMzQtLjFsLTIuMi0xLjUyNmEuNTg3LjU4NywwLDAsMSwuNjY5LS45NjVsMi4yLDEuNTI2QS41ODcuNTg3LDAsMCwxLDQuOCw3OC42ODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzU2LjYxNiAxMjkuNykiLz48L2c+PC9zdmc+", ht = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZhOGE4O29wYWNpdHk6MDt9LmJ7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTYyMyAtMTk3KSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYyMyAxOTcpIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0xNS44MTgsMTUuOGMtLjI4Mi4yODQtLjk3LjE3LS45Ny4xN2wtMy4wODEtMy4wODRhNy4yNCw3LjI0LDAsMSwxLDEuMTIzLTEuMTIzbDMuMDgxLDMuMDgxcy4xMjYuNjc3LS4xNTMuOTU2Wk0xMi45Niw3LjI0OGE1LjcsNS43LDAsMSwwLTUuNyw1LjcsNS43LDUuNywwLDAsMCw1LjctNS43WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYyNS42OTggMTk5LjAwNikiLz48L2c+PC9zdmc+", Se = Symbol("PageCore"), Ce = Symbol("Provide"), ee = {
  reset: {
    actionType: "reset",
    actionName: "重置",
    actionIcon: pt
  },
  search: {
    type: "primary",
    actionType: "search",
    actionName: "查询",
    actionIcon: ht
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
}, ct = {
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
}, te = {
  inject: {
    injectedPageCore: {
      from: Se,
      default: {}
    },
    formCore: {
      from: "VersaForm",
      default: () => ({})
    }
  },
  computed: {
    pageCore() {
      return Ae(this.injectedPageCore) ? this.injectedPageCore.value : this.injectedPageCore;
    }
  },
  methods: {
    proxyPageCore(e) {
      return new Proxy(e != null && e.$ ? e : u(u({}, e), this.pageCore), {
        get: (t, s) => ["formCore", "pageCore"].includes(s) ? this[s] : x(this.pageCore, s) ? Reflect.get(this.pageCore, s) : Reflect.get(t, s),
        set(t, s, i) {
          return Reflect.set(t, s, i);
        }
      });
    }
  }
}, ft = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0Ny45OTgiIHZpZXdCb3g9IjAgMCA0OCA0Ny45OTgiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOiNmZmJlMWI7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTA0Ljc3NSw0OC41NTlhMjQsMjQsMCwxLDAsMjQsMjRBMjQsMjQsMCwwLDAsMTA0Ljc3NSw0OC41NTlabTAsMzkuODc1YTMuMDU5LDMuMDU5LDAsMSwxLDMuMDU5LTMuMDU5QTMuMDU5LDMuMDU5LDAsMCwxLDEwNC43NzUsODguNDM0Wm0zLjA2LTEyLjk4MWEzLjA1OSwzLjA1OSwwLDAsMS02LjExOSwwVjYyLjRhMy4wNTksMy4wNTksMCwwLDEsNi4xMTksMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04MC43NzUgLTQ4LjU1OSkiLz48L3N2Zz4=", mt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MzkiIGhlaWdodD0iMTIuNzM2IiB2aWV3Qm94PSIwIDAgMTIuNzM5IDEyLjczNiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6IzY2NjtmaWxsLXJ1bGU6ZXZlbm9kZDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMS42MDguMjA4LDYuMzc1LDUuNDQxLDEuMTQyLjIwOEEuNjgxLjY4MSwwLDAsMCwuNjc1LjAyMWEuNjI3LjYyNywwLDAsMC0uNDU3LjIuNjI3LjYyNywwLDAsMC0uMi40NTcuNjgxLjY4MSwwLDAsMCwuMTg3LjQ2N2w1LjIzNiw1LjIzTC4yMDgsMTEuNjA4YS42MzcuNjM3LDAsMCwwLS4xNzcuNjQ0LjYuNiwwLDAsMCwuNDU3LjQ2Ny42NjcuNjY3LDAsMCwwLC42NTQtLjE3N0w2LjM3NSw3LjMwOWw1LjIzMyw1LjIzM2EuNjYxLjY2MSwwLDAsMCwuOTM0LS45MzRMNy4zMDksNi4zNzVsNS4yMzMtNS4yMzNBLjYzNy42MzcsMCwwLDAsMTIuNzE5LjVhLjYuNiwwLDAsMC0uNDY3LS40NjcuNjM3LjYzNywwLDAsMC0uNjQ0LjE3NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAwNiAtMC4wMDcpIi8+PC9zdmc+";
const Y = {
  name: "versa-button",
  inheritAttrs: !1,
  mixins: [te],
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
        confirmType: "popconfirm"
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
      return it(
        (e) => {
          if (!this.isMessageBox)
            return this.$emit("click", e, this.proxyPageCore(this));
          ye(f(u({
            message: () => y("div", { class: "versa-message-box__container" }, [
              y("img", {
                src: mt,
                class: "versa-message-box__close",
                onClick: () => {
                  ye.close();
                }
              }),
              y(
                "div",
                {
                  class: "versa-message-box__content"
                },
                [
                  y("img", {
                    src: ft,
                    class: "versa-message-box__icon"
                  }),
                  y("div", { class: "versa-message-box__wrap" }, [
                    J(this.confirmProps.title) ? void 0 : y(
                      "div",
                      {
                        class: "versa-message-box__title"
                      },
                      this.confirmProps.title
                    ),
                    y(
                      "div",
                      {
                        class: "versa-message-box__message"
                      },
                      this.confirmProps.message
                    )
                  ])
                ]
              )
            ]),
            showCancelButton: !0
          }, U(this.confirmProps, ["title", "message", "type"])), {
            customClass: `versa-message-box ${this.confirmProps.customClass || ""}`
          })).then(() => {
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
    const e = f(u({}, U(this.$attrs, [
      "actionType",
      "actionName",
      "actions",
      "actionIcon"
    ])), {
      loading: this.isLoading,
      onClick: this.isPopconfirm ? k : this.debouncedClick,
      disabled: this.isDisabled,
      class: ["versa-button", this.$attrs.class],
      ref: "versaButton"
    }), t = y(Fe, e, {
      default: () => {
        var s, i;
        return [
          this.$attrs.actionIcon ? y("span", {
            class: "versa-button__icon",
            style: `background:url(${this.$attrs.actionIcon}) center center no-repeat;`
          }) : null,
          this.text || ((i = (s = this.$slots).default) == null ? void 0 : i.call(s))
        ];
      }
    });
    return this.isPopconfirm ? y(
      De,
      f(u({}, this.confirmProps), {
        onCancel: this.$attrs.onCancel || k,
        onConfirm: this.debouncedClick
      }),
      {
        reference: () => t
      }
    ) : t;
  }
};
const F = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, a] of t)
    s[i] = a;
  return s;
}, yt = {
  components: {
    VersaButton: Y,
    ElSpace: H
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
      return (t = (e = this.actions) == null ? void 0 : e.map((s) => P(s) && x(s, "actionName") && x(s, "actionType") || s != null && s.is ? f(u({}, s), {
        disabled: typeof s.disabled == "function" ? s.disabled.bind(this) : s.disabled
      }) : null).filter(Boolean)) != null ? t : [];
    }
  },
  methods: {
    /** 操作按钮回调函数 */
    onAction(e, t) {
      return j(this, null, function* () {
        var s;
        (s = e.action) == null || s.call(e, this.formValues, t, e);
      });
    }
  }
}, gt = {
  key: 0,
  class: "versa-card__header"
}, bt = { class: "versa-card__title" }, vt = { class: "versa-card__action" }, _t = { class: "versa-card__content" };
function Vt(e, t, s, i, a, r) {
  const o = g("VersaButton"), n = g("ElSpace");
  return h(), _("div", {
    class: q(["versa-card", { "versa-card--hasTitle": s.title }])
  }, [
    s.title ? (h(), _("div", gt, [
      O("div", bt, D(s.title), 1),
      O("div", vt, [
        C(e.$slots, "headerRight", {}, () => [
          L(n, { size: 20 }, {
            default: m(() => [
              (h(!0), _(M, null, S(r.toolActions, (p) => (h(), _(M, null, [
                p.is ? (h(), b($(p.is), v({
                  key: p.is,
                  ref_for: !0
                }, p, R(p.on || {})), null, 16)) : (h(), b(o, v({
                  key: p.type,
                  size: "small",
                  ref_for: !0
                }, p, {
                  onClick: (l, d) => r.onAction(p, d)
                }), {
                  default: m(() => [
                    W(D(p.actionName), 1)
                  ]),
                  _: 2
                }, 1040, ["onClick"]))
              ], 64))), 256))
            ]),
            _: 1
          })
        ])
      ])
    ])) : B("", !0),
    O("div", _t, [
      C(e.$slots, "default")
    ])
  ], 2);
}
const ue = /* @__PURE__ */ F(yt, [["render", Vt]]), ge = {
  name: "versa-form-item",
  inheritAttrs: !1,
  props: {
    status: {
      type: String,
      default: "edit"
    },
    tips: String,
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
      return typeof this.labelType == "string" ? f(u({}, e), {
        type: this.labelType
      }) : P(this.labelType) ? u(u({}, e), this.labelType) : e;
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
      return /.*date.*/.test(t) ? X(this.fieldValue).map((i) => J(i) ? null : typeof e == "string" ? tt(i).format(e) : i).filter(Boolean).join(" ~ ") : typeof e == "function" ? e(this.fieldValue, this.optionConfig) : this.fieldValue;
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
      return t.indexOf(":") !== -1 && (t = t.replace(/:/, ".")), Q(e, t);
    },
    formItemRules() {
      let e = this.VersaForm.rules;
      const t = this.rules, s = this.required !== void 0 ? { required: !!this.required } : [], i = Q(e, this.prop || "");
      return e = e ? i[this.prop || ""] || i.v : [], [].concat(t || e || []).concat(s);
    },
    /** 表单项校验的触发节点，change映射为input */
    validateTrigger() {
      return this.formItemRules.map(
        (t) => t.trigger === "change" ? "update:modelValue" : t.trigger || "update:modelValue"
      );
    }
  },
  created() {
    this.$emitter = new ne(), this.$emitter.on("addField", (e) => {
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
        for (const o in s.props)
          if (Object.hasOwnProperty.call(s.props, o)) {
            const n = s.props[o];
            typeof n == "function" && (s.props[o] = (...p) => n(...p, this.VersaForm));
          }
        const i = u({}, s.props);
        this.validateTrigger.forEach((o) => {
          const n = `on${et(o)}`;
          Object.assign(s.props, {
            [n]: (...p) => {
              var l;
              (l = i[n]) == null || l.call(i, ...p), this.validate(o);
            }
          });
        });
      });
    },
    validate(e, t = k) {
      const s = this.formItemRules.filter((n) => !n.trigger || e === "" || e === "update:modelValue" && ["input", "change"].includes(n.trigger) ? !0 : Array.isArray(n.trigger) ? n.trigger.indexOf(e) > -1 : n.trigger === e).map((n) => Object.assign({}, n));
      if (s.length === 0 && !this.fields.length)
        return t(!0, {}), !0;
      this.validateState = "validating";
      let i = !0, a = 0, r = this.fields.length + (s.length ? 1 : 0);
      const o = {
        [this.prop]: []
      };
      if (s.length !== 0) {
        const n = {};
        s && s.length > 0 && s.forEach((l) => {
          delete l.trigger;
        }), n[this.prop] = s, new st(n).validate(
          { [this.prop]: this.fieldValue },
          { firstFields: !0 },
          (l, d) => {
            var c;
            this.validateState = l ? "error" : "success", this.validateMessage = l ? l[0].message : "", l && (i = !1, o[this.prop].push(...d[this.prop])), typeof t == "function" && ++a === r && t(i, i ? {} : o), (c = this.VersaForm) == null || c.$emit(
              "validate",
              this.prop,
              !l,
              this.validateMessage || null
            );
          }
        );
      }
      this.fields.forEach((n) => {
        n.validate((p, l) => {
          p || (i = !1, o[this.prop].push(...Object.values(l).flat())), typeof t == "function" && ++a === r && t(i, i ? {} : o);
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
    var o, n, p, l, d, c, V, w, N, I, Z, pe, he;
    const e = [];
    this.interceptPreview ? e.push((p = (n = (o = this.previewText) == null ? void 0 : o.toString) == null ? void 0 : n.call(o)) != null ? p : this.previewText) : (e.push(...(d = (l = this.$slots).default) == null ? void 0 : d.call(l)), this.status !== "preview" && this.proxyEvent(e));
    const t = this.validateState === "error" && this.showMessage && this.VersaForm.showMessage, s = this.labelConfig.type === "card", i = !!this.tips && !t && !s;
    t && e.push(
      y("transition", { name: "el-zoom-in-top" }, [
        (I = (V = (c = this.$slots).error) == null ? void 0 : V.call(c, {
          error: this.validateMessage
        })) != null ? I : y(
          "div",
          {
            class: [
              "versa-form-item__error",
              {
                "versa-form-item__error--inline": typeof this.inlineMessage == "boolean" ? this.inlineMessage : (N = (w = this.VersaForm) == null ? void 0 : w.inlineMessage) != null ? N : !1
              }
            ]
          },
          [this.validateMessage]
        )
      ])
    );
    const a = [
      y(
        "div",
        {
          class: [
            "versa-form-item__content",
            `versa-form-item__content--${this.status}`,
            {
              "versa-form-item--mb": !i && !s
            }
          ],
          style: this.$attrs.contentStyle
        },
        {
          default: () => e
        }
      )
    ];
    s || a.unshift(
      y(
        dt,
        {
          isAutoWidth: this.labelStyle && this.labelStyle.width === "auto",
          updateAll: this.VersaForm.labelWidth === "auto"
        },
        {
          default: () => [
            this.label || this.$slots.label ? y(
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
    const r = y(
      s ? ue : "div",
      f(u({
        ref: "VersaFormItem",
        class: [
          "versa-form-item",
          `versa-form-item--${this.status}`,
          {
            "versa-form-item--feedback": (Z = this.VersaForm) == null ? void 0 : Z.statusIcon,
            "is-error": this.validateState === "error",
            "is-validating": this.validateState === "validating",
            "is-success": this.validateState === "success",
            "is-required": this.isRequired || this.required,
            "is-no-asterisk": (pe = this.VersaForm) == null ? void 0 : pe.hideRequiredAsterisk,
            [`versa-form-item--${this.sizeClass}`]: !!this.sizeClass,
            "versa-form-item--card": s,
            "versa-form-item--mb": s
          },
          this.$attrs.class
        ]
      }, s ? f(u({}, this.labelConfig), {
        title: this.label
      }) : {}), {
        style: this.$attrs.itemStyle
      }),
      {
        default: () => [a]
      }
    );
    return !s && this.tips && !t ? y("div", {}, [
      r,
      y("div", {
        class: [
          "versa-form-item__tips",
          {
            "versa-form-item--mb": i
          }
        ],
        style: {
          "margin-left": this.labelStyle.width === "auto" ? (he = this.VersaForm) == null ? void 0 : he.autoLabelWidth : this.labelStyle.width
        },
        innerHTML: this.tips
      })
    ]) : r;
  }
}, wt = {
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
        let s = z(t, ["label", "value"]);
        P(this.labelInValue) && (s = K(
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
      const t = f(u({}, e), { border: this.border });
      return delete t.label, delete t.value, t;
    }
  },
  render() {
    if (this.isPreview)
      return y(
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
      const i = f(u({}, this.bindProps(s)), {
        value: s.value
      });
      return y(this.button ? $e : Re, i, {
        default: () => s.label
      });
    }), t = f(u({}, this.$attrs), {
      modelValue: this.innerValue,
      // 拦截el-select的input事件， 外部v-model走自定义逻辑
      "onUpdate:modelValue": (s) => this.innerValue = s,
      class: "versa-radio-group",
      ref: "versaRadioGroup"
    });
    return y(ze, t, {
      default: () => e
    });
  }
};
const Mt = {
  name: "versa-image-upload",
  components: { Plus: rt, Delete: at, ElIcon: Ee, ElImage: Ye },
  props: {
    modelValue: {
      type: [Object, String]
    },
    maxSize: {
      type: Number,
      default: 5 * 1024 * 12024
    },
    status: {
      type: String,
      default: "edit"
    },
    accept: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      previewSrc: ""
    };
  },
  computed: {
    mergedAccept() {
      return this.accept || ".png;.jpg;.jpeg";
    },
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
      this.$refs.inputRef.click(), this.$refs.inputRef.blur();
    },
    handleChange(e) {
      var i, a;
      const t = (a = (i = e.target) == null ? void 0 : i.files) != null ? a : [];
      e.target.files = null, !(t.length === 0 || t.length > 1 || t[0].size > this.maxSize || !this.mergedAccept.split(";").some((r) => t[0].name.endsWith(r))) && (this.previewSrc = URL.createObjectURL(t[0]), this.$emit("update:modelValue", e.target.files[0]));
    },
    onRemove() {
      this.$emit("update:modelValue", null), this.previewSrc = null;
    }
  }
}, St = { class: "versa-image-upload" }, Ct = {
  key: 1,
  class: "versa-image-upload__preview"
}, Lt = /* @__PURE__ */ O("div", { class: "versa-image-upload__preview--mask" }, null, -1), Nt = ["accept"];
function Pt(e, t, s, i, a, r) {
  const o = g("Plus"), n = g("ElIcon"), p = g("ElImage"), l = g("Delete");
  return h(), _("div", St, [
    a.previewSrc ? (h(), _("div", Ct, [
      L(p, {
        class: "versa-image-upload__preview--pic",
        src: a.previewSrc,
        "zoom-rate": 1.2,
        "max-scale": 7,
        "min-scale": 0.2,
        "preview-src-list": r.previewSrcList,
        fit: "cover"
      }, null, 8, ["src", "preview-src-list"]),
      s.status === "edit" ? (h(), _(M, { key: 0 }, [
        Lt,
        L(n, {
          class: "versa-image-upload__preview--remove",
          onClick: r.onRemove
        }, {
          default: m(() => [
            L(l)
          ]),
          _: 1
        }, 8, ["onClick"])
      ], 64)) : B("", !0)
    ])) : (h(), b(n, {
      key: 0,
      class: "versa-image-upload__icon",
      onClick: r.onClickUpload
    }, {
      default: m(() => [
        L(o)
      ]),
      _: 1
    }, 8, ["onClick"])),
    O("input", {
      ref: "inputRef",
      style: { opacity: "0", width: "1px", height: "1px", left: "-999px", position: "fixed", "z-index": "-999" },
      type: "file",
      accept: r.mergedAccept,
      onChange: t[0] || (t[0] = (...d) => r.handleChange && r.handleChange(...d))
    }, null, 40, Nt)
  ]);
}
const xt = /* @__PURE__ */ F(Mt, [["render", Pt]]), jt = {
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
          let o = z(r, ["label", "value"]);
          return P(this.labelInValue) && (o = K(o, (n, p) => this.labelInValue[p] || p)), o;
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
      const t = f(u({}, e), { border: this.border });
      return delete t.label, delete t.value, delete t.checked, t;
    }
  },
  render() {
    if (this.isPreview)
      return y(
        "div",
        {
          ref: "renderText",
          class: "versa-form__item--preview"
        },
        { default: () => this.previewText }
      );
    const e = this.mergedOptions.map((s) => {
      const i = f(u({}, this.bindProps(s)), {
        value: s.value
      });
      return y(this.button ? Be : We, i, {
        default: () => s.label
      });
    }), t = f(u({}, this.$attrs), {
      modelValue: this.innerValue,
      "onUpdate:modelValue": (s) => this.innerValue = s,
      class: "versa-checkbox-group",
      ref: "versaCheckboxGroup"
    });
    return y(Ue, t, {
      default: () => e
    });
  }
}, ae = {
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
}, le = {
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
}, oe = {
  props: {
    /** 是否需要分页 */
    needPagination: {
      type: Boolean,
      default: !0
    },
    /** 列表查询接口或方法 */
    api: {
      type: [String, Function],
      required: !0
    },
    apiMethod: {
      type: String,
      default: "get"
    },
    // 格式化请求结果
    formatResults: {
      type: Function,
      default: k
    },
    /** 格式化筛选框数据 */
    formatFilter: {
      type: Function,
      default: k
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
}, se = {
  methods: {
    dispatch(e, t, ...s) {
      var r;
      for (var i = this.$parent || this.$root, a = i.$options.name; i && (!a || a !== e); )
        i = i.$parent, i && (a = i.$options.name);
      i && ((r = i.$emitter) == null || r.emit(t, ...s));
    }
  }
};
const be = {
  "versa-select": "versa-select",
  "versa-checkbox-group": "versa-checkbox-group",
  "versa-radio-group": "versa-radio-group",
  "versa-form": "versa-form",
  "versa-repeater": "versa-repeater",
  "versa-image-upload": "versa-image-upload",
  "versa-repeater": "versa-repeater"
}, Ot = {
  name: "versa-form",
  components: {
    ElRow: He,
    ElSpace: H,
    VersaSelect: ut,
    VersaFormItem: ge,
    VersaRadioGroup: wt,
    VersaCheckboxGroup: jt,
    VersaImageUpload: xt,
    VersaRepeater: ve(() => Promise.resolve().then(() => cs))
  },
  mixins: [ae, se],
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
      var e;
      return (e = this.options) == null ? void 0 : e.filter((t) => typeof t.when == "function" ? t.when(this.model, t, {
        actionType: this.actionType,
        status: this.globalStatus
      }) : t.when === void 0 ? !0 : t.when).map((t) => f(u({}, t), {
        element: be[t.element] || t.element,
        useCustomPreview: typeof t.useCustomPreview == "boolean" ? t.useCustomPreview : !!be[t.element],
        rules: typeof t.rules == "function" ? t.rules(this.model, t, { actionType: this.actionType }) : t.rules,
        colSpan: t.single ? 24 : ~~(24 / this.columns),
        status: typeof t.status == "function" ? t.status(this.model, t, { actionType: this.actionType }) : t.status || this.innerStatusMap[t.prop] || this.globalStatus
      }));
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
    this.$emitter = new ne(), this.$emitter.on("addField", (t) => {
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
    /** 设置表单状态 */
    setStatus(...e) {
      const t = P(e[0]) ? e[0] : { [e[0]]: e[1] };
      for (const s in t)
        x(t, s) && (this.innerStatusMap[s] = t[s]);
    },
    /** 获取表单状态 */
    getStatus(e) {
      var t;
      if (typeof e == "string")
        return (t = this.deployOptions.find((s) => s.prop === e)) == null ? void 0 : t.status;
      if (Array.isArray(e))
        return this.deployOptions.reduce((s, i) => e.includes(i.prop) ? f(u({}, s), { [i.prop]: i.status }) : s, {});
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
      typeof t != "function" && (s = new Promise((o, n) => {
        t = function(p, l) {
          p ? o(p) : n(l);
        };
      }));
      let i = !0, a = 0;
      e.length === 0 && t && t(!0);
      const r = {};
      if (e.forEach((o) => {
        o.validate("", (n, p) => {
          n || (i = !1), Object.assign(r, p), typeof t == "function" && ++a === e.length && t(i, r);
        });
      }), s)
        return s;
    },
    // 添加初始值
    addInitValue(e) {
      const t = e || u({}, this.defaultValues);
      this.options.forEach((s) => {
        t[s.prop] = re(this.getInitValueByKey(s.prop, t, s));
      }), this.model = u(u({}, this.model), t), this.$nextTick(() => {
        var s;
        this.$emit("onMounted", this.model), (s = this.$emitter) == null || s.emit("onMounted"), this.isMounted = !0;
      });
    },
    /** 获取初始值 */
    getInitValueByKey(e, t, s) {
      const i = t || u({}, this.defaultValues), a = s || this.options.find((o) => o.prop === e);
      if (!a) {
        console.warn("[VersaForm Warn][Form]unknow prop.");
        return;
      }
      const r = x(i, e);
      return r && typeof a.initValue != "undefined" ? a.initValue : r && typeof a.initValue == "undefined" ? i[e] : a.initValue;
    },
    /** item组件props */
    bindFormItemProps(e) {
      const t = Object.keys(ge.props).reduce((s, i) => f(u({}, s), {
        [i]: e[i]
      }), {});
      return u(f(u({}, t), {
        optionConfig: u({}, e)
      }), e.formItemProps || {});
    },
    // 绑定属性
    bindProps(e) {
      const t = {
        disabled: e.status === "disabled"
      };
      return e.element === "el-date-picker" && Object.assign(t, u({
        "start-placeholder": "开始日期",
        "range-separator": "至",
        "end-placeholder": "结束日期"
      }, ct[e.type || "date"])), Object.assign(t, f(u({}, e), {
        class: `versa-form-item-element ${e.class || ""}`
      })), U(t, [
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
function At(e, t, s, i, a, r) {
  const o = g("VersaFormItem"), n = g("ElSpace"), p = g("ElRow");
  return h(), b($(s.component), {
    class: q([
      "versa-form",
      {
        "versa-form--inline": s.inline,
        [`versa-form--label-${e.labelPosition}`]: !!e.labelPosition
      }
    ])
  }, {
    default: m(() => [
      r.layout ? (h(), b(p, {
        key: 0,
        gutter: 20
      }, {
        default: m(() => [
          (h(!0), _(M, null, S(r.deployOptions, (l) => (h(), b(n, {
            key: l.prop,
            span: l.colSpan
          }, {
            default: m(() => [
              L(o, v({ ref_for: !0 }, r.bindFormItemProps(l), {
                prop: l.prop,
                label: l.label || "",
                rules: l.rules,
                status: l.status
              }), {
                default: m(() => [
                  l.slotName ? C(e.$slots, l.slotName, v({
                    key: 0,
                    data: r.model,
                    ref_for: !0
                  }, l)) : (h(), b($(l.element), v({ key: 1 }, R(r.bindEvent(l)), { ref_for: !0 }, r.bindProps(l), {
                    modelValue: r.model[l.prop],
                    "onUpdate:modelValue": (d) => r.model[l.prop] = d
                  }), null, 16, ["modelValue", "onUpdate:modelValue"]))
                ]),
                _: 2
              }, 1040, ["prop", "label", "rules", "status"])
            ]),
            _: 2
          }, 1032, ["span"]))), 128))
        ]),
        _: 3
      })) : (h(!0), _(M, { key: 1 }, S(r.deployOptions, (l) => (h(), b(o, v({ ref_for: !0 }, r.bindFormItemProps(l), {
        key: l.prop,
        prop: l.prop,
        label: l.label || "",
        rules: l.rules,
        status: l.status
      }), {
        default: m(() => [
          l.slotName ? C(e.$slots, l.slotName, v({
            key: 0,
            data: r.model,
            ref_for: !0
          }, l)) : (h(), b($(l.element), v({ key: 1 }, R(r.bindEvent(l)), { ref_for: !0 }, r.bindProps(l), {
            modelValue: r.model[l.prop],
            "onUpdate:modelValue": (d) => r.model[l.prop] = d
          }), null, 16, ["modelValue", "onUpdate:modelValue"]))
        ]),
        _: 2
      }, 1040, ["prop", "label", "rules", "status"]))), 128)),
      C(e.$slots, "footer", A(T({ model: r.model, actionType: e.actionType })))
    ]),
    _: 3
  }, 8, ["class"]);
}
const de = /* @__PURE__ */ F(Ot, [["render", At]]), It = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: de
}, Symbol.toStringTag, { value: "Module" }));
const Tt = z(ee, ["reset", "create", "search"]), kt = {
  name: "versa-filter",
  components: {
    VersaForm: de,
    VersaCard: ue,
    VersaButton: Y,
    ElSpace: H
  },
  mixins: [le, se, te],
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
      return typeof this.actions == "function" && (e = this.actions(this.formValues)), e == null ? void 0 : e.map((t) => typeof t == "string" ? Tt[t] : P(t) && x(t, "actionName") && x(t, "actionType") || t != null && t.is ? f(u({}, t), {
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
      return j(this, null, function* () {
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
              U(e, ["actionType", "actionName", "action", "usePageModal"])
            );
            break;
          default:
            e.validate && (yield (s = this.$refs.formRef) == null ? void 0 : s.validate()), (i = e.action) == null || i.call(e, this.formValues, t, u({}, e));
            break;
        }
      });
    }
  }
}, Ft = { class: "versa-filter__action" }, Dt = { class: "versa-filter__footer" };
function $t(e, t, s, i, a, r) {
  const o = g("VersaButton"), n = g("ElSpace"), p = g("VersaForm"), l = g("VersaCard");
  return h(), b(l, {
    class: q([
      "versa-filter",
      {
        "versa-filter--emptyFooter": !e.$slots.footer
      }
    ]),
    title: e.filterTitle
  }, {
    default: m(() => [
      L(p, {
        ref: "formRef",
        modelValue: a.formValues,
        "onUpdate:modelValue": t[0] || (t[0] = (d) => a.formValues = d),
        options: s.options,
        defaultValues: e.defaultFilters,
        "label-width": e.labelWidth,
        labelSuffix: e.labelSuffix,
        onOnMounted: r.onMounted
      }, E({
        footer: m(() => [
          O("section", Ft, [
            L(n, {
              class: "versa-filter__action--wrap",
              size: 20
            }, {
              default: m(() => [
                (h(!0), _(M, null, S(r.filterActions, (d) => (h(), _(M, null, [
                  d.is ? (h(), b($(d.is), v({
                    key: 0,
                    ref_for: !0
                  }, d, R(d.on || {})), null, 16)) : (h(), b(o, v({
                    key: d.actionType,
                    type: d.type,
                    ref_for: !0
                  }, d, {
                    onClick: (c, V) => r.onAction(d, V)
                  }), {
                    default: m(() => [
                      W(D(d.actionName), 1)
                    ]),
                    _: 2
                  }, 1040, ["type", "onClick"]))
                ], 64))), 256)),
                C(e.$slots, "btns", A(T(e.proxyPageCore({ formValues: a.formValues }))))
              ]),
              _: 3
            })
          ])
        ]),
        _: 2
      }, [
        S(Object.keys(e.$slots).filter(
          (d) => d !== "footer"
        ), (d) => ({
          name: d,
          fn: m((c) => [
            C(e.$slots, d, A(T(c)))
          ])
        }))
      ]), 1032, ["modelValue", "options", "defaultValues", "label-width", "labelSuffix", "onOnMounted"]),
      O("div", Dt, [
        C(e.$slots, "footer")
      ])
    ]),
    _: 3
  }, 8, ["class", "title"]);
}
const Rt = /* @__PURE__ */ F(kt, [["render", $t]]), zt = z(ee, ["remove", "edit", "detail"]), Et = {
  name: "versa-nested-table",
  mixins: [se, te],
  components: {
    VersaButton: Y,
    ElTableColumn: Ze,
    ElSpace: H
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    },
    /** 行数据的 Key */
    rowKey: {
      type: [Function, String],
      default: ""
    },
    /** 列表单元格无数据时需要展示的数据 */
    fillNull: {
      type: String,
      required: !1
    }
  },
  computed: {
    renderOption() {
      const e = u({}, this.option);
      return e.formatter || (e.formatter = (t) => {
        var s;
        return J(t[e.prop]) ? e.filterNull || ((s = this.fillNull) != null ? s : "") : P(e.mapSource) ? e.mapSource[t[e.prop]] : t[e.prop];
      }), e.type === "index" && !e.index && (e.index = (t) => `${t < 9 ? "0" : ""}${t + 1}`), e.type === "index" && !e.align && (e.align = "center"), delete e.children, e;
    },
    children() {
      return this.option.children || [];
    }
  },
  methods: {
    /** 操作栏编辑 */
    filterActions(e, ...t) {
      let s = typeof e == "string" ? e.split(",") : e;
      return typeof e == "function" && (s = e(...t)), s == null ? void 0 : s.map((i) => typeof i == "string" ? zt[i] : P(i) && x(i, "actionName") && x(i, "actionType") || i != null && i.is ? f(u({}, i), {
        disabled: typeof i.disabled == "function" ? i.disabled.bind(this, t[0]) : i.disabled
      }) : null).filter(Boolean);
    },
    /** 操作按钮回调函数 */
    onAction(e, t, s) {
      var a;
      const i = U(e, [
        "actionType",
        "actionName",
        "action",
        "usePageModal"
      ]);
      if (e.usePageModal) {
        this.dispatch("versa-page", "VersaFormPageUsePageModal", t, f(u({}, i), {
          actionType: e.actionType
        }));
        return;
      }
      switch (e.actionType) {
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
          (a = e.action) == null || a.call(e, t, s, u({}, e));
          break;
      }
    }
  }
};
function Yt(e, t, s, i, a, r) {
  const o = g("ElTableColumn"), n = g("VersaButton"), p = g("ElSpace"), l = g("versa-nested-table");
  return r.renderOption.slotName ? (h(), b(o, v({ key: 0 }, r.renderOption, { "show-overflow-tooltip": "" }), {
    default: m(({ row: d, column: c, $index: V }) => [
      C(e.$slots, r.renderOption.slotName, A(T(e.proxyPageCore({ row: d, column: c, index: V }))))
    ]),
    _: 3
  }, 16)) : r.renderOption.type === "selection" ? (h(), b(o, v({ key: 1 }, r.renderOption, { "reserve-selection": "" }), null, 16)) : r.renderOption.actions ? (h(), b(o, A(v({ key: 2 }, r.renderOption)), {
    default: m(({ row: d, column: c, $index: V }) => [
      L(p, null, {
        default: m(() => [
          (h(!0), _(M, null, S(r.filterActions(
            r.renderOption.actions,
            d,
            c,
            V
          ), (w) => (h(), _(M, null, [
            w.is ? (h(), b($(w.is), v({
              key: 0,
              ref_for: !0
            }, w, R(w.on || {})), null, 16)) : (h(), b(n, v({
              key: 1,
              type: "primary",
              link: "",
              ref_for: !0
            }, w, {
              onClick: (N, I) => r.onAction(w, d, I)
            }), {
              default: m(() => [
                W(D(w.actionName), 1)
              ]),
              _: 2
            }, 1040, ["onClick"]))
          ], 64))), 256))
        ]),
        _: 2
      }, 1024)
    ]),
    _: 1
  }, 16)) : r.children.length ? (h(), b(o, A(v({ key: 3 }, r.renderOption)), {
    default: m(() => [
      (h(!0), _(M, null, S(r.children, (d) => (h(), b(l, {
        option: d,
        rowKey: s.rowKey,
        fillNull: s.fillNull
      }, null, 8, ["option", "rowKey", "fillNull"]))), 256))
    ]),
    _: 1
  }, 16)) : (h(), b(o, v({ key: 4 }, r.renderOption, { "show-overflow-tooltip": "" }), null, 16));
}
const Bt = /* @__PURE__ */ F(Et, [["render", Yt]]);
const Wt = {
  name: "versa-table",
  inject: {
    globalConfig: {
      from: Ce,
      default: {}
    }
  },
  directives: {
    loading: Me.directive
  },
  components: {
    VersaCard: ue,
    VersaNestedTable: Bt,
    VersaButton: Y,
    ElTable: Ge,
    ElEmpty: qe,
    ElPagination: Ke,
    ElSpace: H
  },
  mixins: [oe, se, te],
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
      return (e = this.toolOptions) == null ? void 0 : e.map((t) => P(t) && x(t, "actionName") && x(t, "actionType") || t != null && t.is ? f(u({}, t), {
        disabled: typeof t.disabled == "function" ? t.disabled.bind(this, this.multipleSelection) : t.disabled
      }) : null).filter(Boolean);
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
      return j(this, null, function* () {
        var e, t;
        try {
          const s = this.formatFilter(u(u({}, U(this.innerParams, ["total"])), this.queryParams));
          this.loading = !0;
          let i;
          if (lt(this.api))
            i = yield this.api(s);
          else {
            const a = ot(this.apiMethod) === "GET";
            i = yield (e = this.globalConfig) == null ? void 0 : e.$$axios({
              url: this.api,
              method: this.apiMethod,
              [a ? "params" : "data"]: s
            });
          }
          if (i = yield (t = this.formatResults) == null ? void 0 : t.call(this, i || {}), this.listKey)
            this.dataSource = Q(i, this.listKey) || [];
          else {
            const a = Object.keys((i == null ? void 0 : i.data) || {}).find(
              (r) => /list$/i.test(r)
            );
            this.dataSource = Q(i, `data.${a || ""}`) || [];
          }
          this.innerParams.total = Q(i, this.totalKey || "data.total") || 0;
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
      Array.isArray(e) ? e.forEach((t) => {
        this.$refs.table.toggleRowSelection(t);
      }) : this.$refs.table.clearSelection();
    },
    /** 操作栏回调 */
    onToolAction(e, t) {
      var i;
      const s = U(e, [
        "actionType",
        "actionName",
        "action",
        "usePageModal"
      ]);
      if (e.usePageModal) {
        this.dispatch(
          "versa-page",
          "VersaFormPageUsePageModal",
          {},
          f(u({}, s), {
            actionType: e.actionType
          })
        );
        return;
      }
      switch (e.actionType) {
        case "create":
          this.dispatch("versa-page", "VersaFormPageOnCreate", {});
          break;
        default:
          (i = e.action) == null || i.call(e, this.multipleSelection, t, f(u({}, e), {
            clearRowSelection: this.clearRowSelection
          }));
          break;
      }
    }
  }
};
function Ut(e, t, s, i, a, r) {
  const o = g("VersaButton"), n = g("ElSpace"), p = g("ElEmpty"), l = g("VersaNestedTable"), d = g("ElTable"), c = g("ElPagination"), V = g("VersaCard"), w = _e("loading");
  return Ve((h(), b(V, {
    class: "versa-table",
    title: e.headline
  }, {
    headerRight: m(() => [
      L(n, {
        class: q([
          "versa-table__tools",
          "versa-table__tools--header",
          {
            "versa-table__tools--empty": !r.tools.length && !e.$slots.tools
          }
        ]),
        size: 20
      }, {
        default: m(() => [
          (h(!0), _(M, null, S(r.tools, (N) => (h(), _(M, null, [
            N.is ? (h(), b($(N.is), v({
              key: 0,
              ref_for: !0
            }, N, R(N.on || {})), null, 16)) : (h(), b(o, v({
              key: 1,
              ref_for: !0
            }, N, {
              onClick: (I, Z) => r.onToolAction(N, Z)
            }), {
              default: m(() => [
                W(D(N.actionName), 1)
              ]),
              _: 2
            }, 1040, ["onClick"]))
          ], 64))), 256)),
          C(e.$slots, "tools", A(T(e.proxyPageCore({ multipleSelection: a.multipleSelection, clearRowSelection: r.clearRowSelection }))))
        ]),
        _: 3
      }, 8, ["class"])
    ]),
    default: m(() => [
      L(d, v({
        style: { width: "100%" },
        ref: "table"
      }, e.extraTableProps, {
        data: a.dataSource,
        "row-key": e.rowKey,
        onSelectionChange: r.handleSelectionChange
      }), E({
        default: m(() => [
          (h(!0), _(M, null, S(s.options, (N) => (h(), b(l, {
            option: N,
            rowKey: e.rowKey,
            fillNull: e.fillNull
          }, E({ _: 2 }, [
            S(Object.keys(e.$slots).filter(
              (I) => I !== "empty"
            ), (I) => ({
              name: I,
              fn: m((Z) => [
                C(e.$slots, I, v({ ref_for: !0 }, Z))
              ])
            }))
          ]), 1032, ["option", "rowKey", "fillNull"]))), 256))
        ]),
        _: 2
      }, [
        e.$slots.empty ? {
          name: "empty",
          fn: m(() => [
            C(e.$slots, "empty")
          ]),
          key: "0"
        } : {
          name: "empty",
          fn: m(() => [
            L(p, { description: "暂无数据" })
          ]),
          key: "1"
        }
      ]), 1040, ["data", "row-key", "onSelectionChange"]),
      e.needPagination && a.innerParams.total > 0 ? (h(), b(c, v({
        key: 0,
        background: "",
        class: "versa-table__pagination"
      }, a.paginationConfigs, {
        total: a.innerParams.total,
        "current-page": a.innerParams.pageNum,
        "page-sizes": [10, 20, 30],
        "page-size": a.innerParams.pageSize,
        onSizeChange: r.handleSizeChange,
        onCurrentChange: r.handleCurrentChange
      }), null, 16, ["total", "current-page", "page-size", "onSizeChange", "onCurrentChange"])) : B("", !0),
      C(e.$slots, "footer")
    ]),
    _: 3
  }, 8, ["title"])), [
    [w, a.loading]
  ]);
}
const Ht = /* @__PURE__ */ F(Wt, [["render", Ut]]);
const Zt = {
  cancel: {
    actionType: "cancel",
    actionName: "取消"
  },
  confirm: {
    actionType: "confirm",
    actionName: "确认",
    type: "primary"
  }
}, Gt = {
  components: {
    VersaForm: de,
    VersaButton: Y,
    ElSpace: H
  },
  directives: {
    loading: Me.directive
  },
  mixins: [ae],
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
      default: k
    },
    /** 弹窗类型：el-dialog | el-drawer */
    panelType: {
      type: String,
      default: "el-dialog"
    },
    /** 弹窗表单展示时格式化 */
    formatBefore: {
      type: Function,
      default: k
    },
    /** 表单配置属性 */
    formProps: {
      type: Object
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
      return Object.keys(ae.props).reduce(
        (e, t) => (typeof this[t] != "undefined" && Object.assign(e, {
          [t]: this[t]
        }), e),
        u({}, this.formProps)
      );
    },
    /** 弹窗操作栏 */
    dialogActions() {
      let e = typeof this.actions == "string" ? this.actions.split(",") : this.actions;
      return typeof this.actions == "function" && (e = this.actions(this.formValues)), e == null ? void 0 : e.map((t) => typeof t == "string" ? Zt[t] : P(t) && x(t, "actionName") && x(t, "actionType") || t != null && t.is ? f(u({}, t), {
        disabled: typeof t.disabled == "function" ? t.disabled.bind(this, this.formValues) : t.disabled
      }) : null).filter(Boolean);
    },
    /** 透传的props */
    undefProps() {
      return v(
        { class: "versa-modal" },
        {
          size: this.$attrs.width
        },
        this.$attrs
      );
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
      return j(this, null, function* () {
        var t;
        let e = u({}, this.defaultValues);
        if (typeof this.formatBefore == "function")
          try {
            this.loading = !0, e = yield this.formatBefore(e, this.close);
          } catch (s) {
          }
        this.loading = !1, (t = this.$refs.formRef) == null || t.addInitValue(e);
      });
    },
    /** 操作按钮回调函数 */
    onAction(e, t) {
      return j(this, null, function* () {
        var s, i;
        switch (e.actionType) {
          case "cancel":
            typeof this.undefProps["before-close"] == "function" ? this.undefProps["before-close"](this.close) : this.dialogVisible = !1;
            break;
          case "confirm":
            this.onConfirm(t);
            break;
          default:
            if (!(!e.validate || (yield (s = this.$refs.formRef) == null ? void 0 : s.validate().catch(() => !1))))
              return;
            (i = e.action) == null || i.call(e, this.formValues, t, f(u({}, e), {
              close: this.close
            }));
            break;
        }
      });
    },
    /** 点击确认 */
    onConfirm(e) {
      return j(this, null, function* () {
        var t, s;
        try {
          e.isLoading = !0, yield (t = this.$refs.formRef) == null ? void 0 : t.validate(), yield (s = this.onOk) == null ? void 0 : s.call(this, this.formValues), e.isLoading = !1, this.dialogVisible = !1;
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
function qt(e, t, s, i, a, r) {
  const o = g("VersaForm"), n = g("VersaButton"), p = g("ElSpace"), l = _e("loading");
  return r.dialogVisible ? (h(), b($(s.panelType), v({
    key: 0,
    "destroy-on-close": "",
    modelValue: r.dialogVisible,
    "onUpdate:modelValue": t[1] || (t[1] = (d) => r.dialogVisible = d)
  }, r.undefProps, { "before-close": r.beforeClose }), {
    default: m(() => [
      Ve((h(), b(o, v(r.mergedFormProps, {
        class: "versa-modal__form",
        ref: "formRef",
        autoInitValue: !1,
        modelValue: a.formValues,
        "onUpdate:modelValue": t[0] || (t[0] = (d) => a.formValues = d)
      }), E({
        footer: m((d) => [
          C(e.$slots, "modalFooter", A(T(f(u({}, d), { loading: a.loading, refresh: r.initForm }))))
        ]),
        _: 2
      }, [
        S(Object.keys(e.$slots).filter(
          (d) => d !== "footer"
        ), (d) => ({
          name: d,
          fn: m((c) => [
            C(e.$slots, d, A(T(c)))
          ])
        }))
      ]), 1040, ["modelValue"])), [
        [l, a.loading]
      ]),
      r.dialogActions.length ? (h(), b(p, {
        key: 0,
        size: 20,
        class: "versa-modal__footer"
      }, {
        default: m(() => [
          (h(!0), _(M, null, S(r.dialogActions, (d) => (h(), _(M, {
            key: d.actionType
          }, [
            d.is ? (h(), b($(d.is), v({
              key: 0,
              ref_for: !0
            }, d, R(d.on || {})), null, 16)) : B("", !0),
            L(n, v({ ref_for: !0 }, d, {
              onClick: (c, V) => r.onAction(d, V)
            }), {
              default: m(() => [
                W(D(d.actionName), 1)
              ]),
              _: 2
            }, 1040, ["onClick"])
          ], 64))), 128))
        ]),
        _: 1
      })) : B("", !0)
    ]),
    _: 3
  }, 16, ["modelValue", "before-close"])) : B("", !0);
}
const Le = /* @__PURE__ */ F(Gt, [["render", qt]]);
const Kt = {
  components: {
    VersaFilter: Rt,
    VersaTable: Ht,
    VersaModal: Le
  },
  name: "versa-page",
  provide() {
    return {
      [Se]: we(() => ({
        queryParams: this.queryParams,
        filterValues: this.filterValues,
        selectionValues: this.selectionValues
      }))
    };
  },
  mixins: [oe, le],
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
      default: k
    },
    /** 编辑回调 */
    onUpdate: {
      type: Function,
      default: k
    },
    /** 删除 */
    onRemove: {
      type: Function,
      default: k
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
      const e = Object.keys(oe.props).reduce(
        (t, s) => f(u({}, t), {
          [s]: this[s]
        }),
        {}
      );
      return e.formatFilter = (t) => {
        const s = u({}, t);
        if (P(this.keyMap))
          for (const i in this.keyMap) {
            if (!Object.hasOwnProperty.call(this.keyMap, i))
              continue;
            const a = this.keyMap[i];
            typeof a == "string" && (s[a] = s[i], delete s[i]), Array.isArray(a) && (a.forEach((r, o) => {
              var n;
              s[r] = (n = s[i]) == null ? void 0 : n[o];
            }), delete s[i]);
          }
        return this.formatFilter(s);
      }, e;
    },
    /** 列表组件通用属性透传 */
    filterProps() {
      return Object.keys(le.props).reduce(
        (t, s) => f(u({}, t), {
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
      return K(
        z(this.$attrs, []),
        (e, t) => t.replace("onOn", "on")
      );
    },
    /** table事件透传 */
    tableListeners() {
      return K(
        z(this.$attrs, []),
        (e, t) => t.replace("onOn", "on")
      );
    }
  },
  created() {
    this.$emitter = new ne(), this.$emitter.on("VersaFormPageOnCreate", (e, t = {}) => {
      this.onAction("create", u({ defaultValues: {} }, t));
    }), this.$emitter.on(
      "VersaFormPageOnUpdate",
      (e = {}, t = {}) => {
        this.onAction("edit", u({ defaultValues: e }, t));
      }
    ), this.$emitter.on(
      "VersaFormPageOnDetail",
      (...s) => j(this, [...s], function* (e = {}, t = {}) {
        this.onAction("detail", u({ defaultValues: e }, t));
      })
    ), this.$emitter.on(
      "VersaFormPageUsePageModal",
      (...s) => j(this, [...s], function* (e = {}, t = {}) {
        this.onAction("usePageModal", u({ defaultValues: e }, t));
      })
    ), this.$emitter.on("VersaFormPageOnRemove", (e) => j(this, null, function* () {
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
        title: (i = (s = ee[e]) == null ? void 0 : s.actionName) != null ? i : "",
        status: ["detail", "usePageModal"].includes(e) ? "preview" : "edit",
        actions: ["detail", "usePageModal"].includes(e) ? "" : void 0,
        formatBefore: e === "create" ? null : this.detailProps.formatBefore,
        actionType: e,
        onOk: (a) => j(this, null, function* () {
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
}, Qt = { class: "versa-page" };
function Jt(e, t, s, i, a, r) {
  const o = g("VersaFilter"), n = g("VersaTable"), p = g("VersaModal");
  return h(), _("div", Qt, [
    L(o, v({ ref: "filterRef" }, r.filterProps, {
      options: s.filterOptions,
      defaultFilters: e.defaultFilters,
      onOnReset: r.onReset,
      onOnSearch: r.onSearch,
      onOnMounted: r.onMounted,
      onOnFilterChange: r.onFilterChange
    }, R(r.filterListeners)), {
      btns: m((l) => [
        C(e.$slots, "btns", A(T(l)))
      ]),
      _: 3
    }, 16, ["options", "defaultFilters", "onOnReset", "onOnSearch", "onOnMounted", "onOnFilterChange"]),
    L(n, v(r.tableProps, {
      autoLoad: !1,
      options: s.tableOptions,
      queryParams: a.queryParams,
      onOnSelectChange: r.onSelectChange
    }, R(r.tableListeners)), E({ _: 2 }, [
      S(Object.keys(e.$slots), (l) => ({
        name: l,
        fn: m((d) => [
          C(e.$slots, l, A(T(d)))
        ])
      }))
    ]), 1040, ["options", "queryParams", "onOnSelectChange"]),
    L(p, v(r.modalProps, {
      visible: a.panelVisible,
      "onUpdate:visible": t[0] || (t[0] = (l) => a.panelVisible = l)
    }), E({ _: 2 }, [
      S(Object.keys(e.$slots), (l) => ({
        name: l,
        fn: m((d) => [
          C(e.$slots, l, A(T(d)))
        ])
      }))
    ]), 1040, ["visible"])
  ]);
}
const ii = /* @__PURE__ */ F(Kt, [["render", Jt]]);
const ri = {
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
      const t = (a = this.mergedOptions) == null ? void 0 : a.find((r) => e === r.value), s = z(t, ["label", "value"]), i = K(
        s,
        (r, o) => this.labelInValue[o] || o
      );
      this.$emit("command", i, this);
    }
  },
  render() {
    var i, a;
    if ((P(this.text) && !this.text.text || !this.text) && !this.$slots.default)
      return null;
    const e = f(u({
      placement: "bottom"
    }, this.$attrs), {
      onCommand: this.onAction,
      class: "versa-dropdown",
      ref: "versaDropdown"
    }), t = this.mergedOptions.map((r) => {
      const o = f(u({}, this.bindProps(r)), {
        command: r.value,
        class: "versa-dropdown-item"
      });
      return y(Qe, o, {
        default: () => r.label
      });
    }), s = [];
    if (this.$attrs["split-button"])
      s.push(P(this.text) ? this.text.text : this.text);
    else if (typeof this.text == "string") {
      const r = [this.text];
      this.icon && r.push(y("i", { class: this.icon })), s.push(
        y(
          Y,
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
      P(this.text) ? s.push(
        y(
          Y,
          f(u({
            type: "primary",
            link: !0
          }, this.text), {
            disabled: this.$attrs.disabled,
            loading: this.isLoading
          }),
          { default: () => this.text.text }
        )
      ) : s.push((a = (i = this.$slots).default) == null ? void 0 : a.call(i));
    return y(Je, e, {
      default: () => s,
      dropdown: () => y(
        Xe,
        { slot: "dropdown" },
        { default: () => t }
      )
    });
  }
}, Xt = {
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
}, es = {
  ref: "measureRef",
  style: { padding: "0", border: "0", height: "0" }
};
function ts(e, t, s, i, a, r) {
  return h(), _("td", es, null, 512);
}
const ss = /* @__PURE__ */ F(Xt, [["render", ts]]);
class ie {
  constructor(t) {
    const { type: s, values: i, status: a, mounted: r = k, isNew: o = !1 } = t;
    switch (this.type = s, this.values = i, this.temporaryValues = i, this.isNew = o, this.type) {
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
const is = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTEzNi44NjMsMTI5Ljg2NGgtNS4xMzF2LTUuMTMxYS45MzQuOTM0LDAsMSwwLTEuODY4LDB2NS4xMzJoLTUuMTMxYS45MzQuOTM0LDAsMSwwLDAsMS44NjhoNS4xMzJ2NS4xMzJhLjkzNC45MzQsMCwxLDAsMS44NjgsMHYtNS4xMzRoNS4xMzJhLjkzNC45MzQsMCwxLDAsMC0xLjg2OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjMuOCAtMTIzLjgpIi8+PC9zdmc+";
const G = z(ee, [
  "save",
  "cancel",
  "edit",
  "up",
  "down",
  "remove"
]), rs = {
  name: "versa-repeater",
  inheritAttrs: !1,
  components: {
    VersaForm: ve(() => Promise.resolve().then(() => It)),
    VersaButton: Y,
    VersaModal: Le,
    VersaMeasureCell: ss,
    ElSpace: H
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
      IconPlus: is
    };
  },
  watch: {
    modelValue: {
      handler(e) {
        var t;
        this.formList = (t = e == null ? void 0 : e.map((s) => this.formList.find((a) => a.values === s || a.temporaryValues === s || s[this.rowKey] && a.values[this.rowKey] === s[this.rowKey] || s.__rowKey && a.values.__rowKey === s.__rowKey) || new ie({
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
      return this.status === "edit" && this.hasAdd;
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
        const s = x(e, t.prop);
        s && typeof t.initValue != "undefined" ? e[t.prop] = t.initValue : s && typeof t.initValue == "undefined" || (typeof t.initValue == "undefined" ? e[t.prop] = null : e[t.prop] = t.initValue);
      }), e;
    },
    /** 是否存在操作列 */
    hasOperateColumn() {
      if (this.status !== "edit")
        return !1;
      const e = this.formList.length;
      let t = 0, s = 0;
      this.formList.forEach((r, o) => {
        this.decideHasBtn("hasDelete", r.values, o) || (t += 1), this.decideHasBtn("hasUpdate", r.values, o) || (s += 1);
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
        2 & this.fixedMode ? t.unshift(f(u({}, a), { fixed: "right" })) : i || 1 & this.fixedMode ? e.unshift(f(u({}, a), { fixed: "left" })) : s.unshift(a);
      }
      if (this.hasOperateColumn) {
        const a = {
          label: "操作",
          slotName: "operate",
          prop: "__operate",
          useCustomPreview: !0
        };
        4 & this.fixedMode ? e.push(f(u({}, a), { fixed: "left" })) : i || 8 & this.fixedMode ? t.push(f(u({}, a), { fixed: "right" })) : s.push(a);
      }
      return [].concat(e, s, t).map((a) => {
        var n, p;
        let r = "", o = "";
        if (a.fixed) {
          const l = a.fixed === "right", d = l ? "right" : "left", c = l ? [...t].reverse() : e;
          let V = 0;
          c.some((w) => {
            const N = w.prop === a.prop;
            return N || (V += this.fixedColumnWidth[w.prop] || 0), N;
          }), r = `position: sticky; ${d}: ${V}px;z-index: 2`, (l && ((n = t[0]) == null ? void 0 : n.prop) === a.prop || !l && ((p = e.slice(-1)[0]) == null ? void 0 : p.prop) === a.prop) && (o += ` versa-repeater__table-row-fixed--${d}`);
        }
        return f(u({}, a), {
          width: void 0,
          label: void 0,
          __width: a.width,
          __label: a.label,
          __fixedClass: o,
          formItemProps: {
            class: `versa-repeater__table-row--cell versa-repeater__table-row--${a.itemAlign || this.itemAlign}` + o,
            itemStyle: r,
            contentStyle: a.width ? `width:${a.width - 20}px` : ""
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
      ].map((e) => f(u({}, e), {
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
      return j(this, null, function* () {
        const [i, a] = yield this.handleAsyncAction(
          "save",
          e,
          this.formList.length
        );
        if (!i)
          return;
        const { formCore: r, dialogType: o } = this.actionParams;
        r.values = a, o === "add" && this.formList.push(r), this.$emit("update:modelValue", this.getValues()), s.close();
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
      a && this.decideHasBtn("hasUpdate", i, t) && (s.push(G.save), s.push(G.cancel)), ["inline", "dialog"].includes(this.type) && e.status === "preview" && this.decideHasBtn("hasUpdate", i, t) && s.push(G.edit), t !== 0 && this.decideHasBtn("hasMoveUp", i, t) && s.push(G.up), t !== this.formList.length - 1 && this.decideHasBtn("hasMoveDown", i, t) && s.push(G.down), !a && this.decideHasBtn("hasDelete", i, t) && s.push(G.remove);
      let r = Array.isArray(this.actions) ? this.actions : [this.actions];
      typeof this.actions == "function" && (r = this.actions(i, t, {
        globalStatus: this.status
      }));
      const o = r == null ? void 0 : r.map((n) => P(n) && x(n, "actionName") && x(n, "actionType") || n != null && n.is ? f(u({}, n), {
        disabled: typeof n.disabled == "function" ? n.disabled.bind(this, rest[0]) : n.disabled
      }) : null).filter(Boolean);
      return [...s, ...o];
    },
    /** 新增 */
    onAdd() {
      return j(this, null, function* () {
        const e = this.formList.length;
        if (e >= this.maxLength || !(!this.validateBeforeAdd || (yield this.validate().catch((r) => (console.warn("[VersaRepeater] 新增校验失败", r), !1)))))
          return;
        const [s, i] = yield this.handleAsyncAction(
          "add",
          f(u({}, this.initValue), { __rowKey: `repeater_${nt()}` }),
          e
        );
        if (!s)
          return;
        if (this.type === "dialog") {
          this.visible = !0, this.actionParams = {
            title: "新增",
            dialogType: "add",
            formCore: new ie({
              values: i,
              type: this.type,
              status: "edit"
            })
          };
          return;
        }
        const a = new ie({
          values: i,
          type: this.type,
          status: "edit",
          isNew: this.type === "inline",
          mounted: (r) => {
            this.type === "inline" && (r.temporaryValues = r.values, r.values = re(r.values), r.status = "edit");
          }
        });
        this.formList.push(a);
      });
    },
    /** 操作按钮 */
    onAction(e, t, s, i) {
      return j(this, null, function* () {
        var r, o, n;
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
            const [p] = yield this.handleAsyncAction(
              "remove",
              this.formList[s].values,
              s
            );
            if (!p)
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
            const [p, l] = yield this.handleAsyncAction(
              "update",
              t.values,
              s
            );
            if (!p)
              return;
            this.type === "dialog" ? (this.visible = !0, this.actionParams = {
              title: "新增",
              formCore: t,
              defaultValues: l
            }) : this.type === "inline" && (t.temporaryValues = t.values, t.values = l, t.status = "edit");
            break;
          }
          case "save": {
            if (!(yield (o = (r = this.$refs.repeaterRows) == null ? void 0 : r[s]) == null ? void 0 : o.validate().catch((c) => (console.warn("[VersaRepeater] 保存校验失败", c), !1))))
              return;
            const [l, d] = yield this.handleAsyncAction(
              "save",
              t.values,
              s
            );
            if (!l)
              return;
            t.temporaryValues = d, t.values = d, t.status = "preview", t.isNew = !1, this.$emit("update:modelValue", this.getValues()), this.$emit("onValueChange", t, s);
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
            (n = e.action) == null || n.call(e, a, i, u({}, e));
            break;
          }
        }
      });
    },
    /** 校验 */
    validate(e) {
      var r, o;
      let t;
      typeof e != "function" && (t = new Promise((n, p) => {
        e = function(l, d) {
          l ? n(l) : p(d);
        };
      }));
      let s = !0, i = 0;
      !((r = this.$refs.repeaterRows) != null && r.length) && e && e(!0);
      const a = {};
      if ((o = this.$refs.repeaterRows) == null || o.forEach((n, p) => {
        n.validate((l, d) => {
          l || (s = !1, Object.assign(a, { [p]: d })), typeof e == "function" && ++i === this.$refs.repeaterRows.length && e(s, a);
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
      return j(this, null, function* () {
        var o, n, p;
        const i = re(t);
        let a = null, r = !0;
        try {
          a = (p = yield (n = (o = this.asyncHandler)[e]) == null ? void 0 : n.call(o, i, s)) != null ? p : !0;
        } catch (l) {
          result = !1;
        }
        if (typeof a == "boolean")
          r = a, a = a ? i : null;
        else if (a === void 0)
          r = !0, a = i;
        else if (P(a)) {
          const { success: l, values: d } = a || {};
          r = l, a = d;
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
}, as = {
  class: "versa-repeater",
  ref: "formRef"
}, ls = { class: "versa-repeater__table" }, os = ["width"], ns = { class: "versa-repeater__table-header" }, us = { class: "versa-repeater__table-row" }, ds = { class: "versa-repeater__table-body" };
function ps(e, t, s, i, a, r) {
  const o = g("VersaMeasureCell"), n = g("VersaButton"), p = g("ElSpace"), l = g("VersaForm"), d = g("VersaModal");
  return h(), _("div", as, [
    O("div", {
      ref: "scrollRef",
      class: q([
        "versa-repeater__scroll",
        {
          "versa-repeater__scroll-pinged--left": a.pingedLeft,
          "versa-repeater__scroll-pinged--right": a.pingedRight
        }
      ]),
      onScroll: t[0] || (t[0] = (...c) => r.onScroll && r.onScroll(...c))
    }, [
      O("table", ls, [
        O("colgroup", null, [
          (h(!0), _(M, null, S(r.deployOptions, (c) => (h(), _("col", {
            width: c.__width || "auto"
          }, null, 8, os))), 256))
        ]),
        O("thead", ns, [
          O("tr", us, [
            (h(!0), _(M, null, S(r.deployOptions, (c) => (h(), _("th", {
              class: q([
                "versa-repeater__table-header--cell",
                `versa-repeater__table-row--${c.itemAlign || c.itemAlign}`,
                c.__fixedClass
              ]),
              style: Ie(c.formItemProps.itemStyle)
            }, D(c.__label), 7))), 256))
          ])
        ]),
        O("tbody", ds, [
          O("tr", null, [
            (h(!0), _(M, null, S(r.deployOptions, (c) => (h(), b(o, {
              key: c.prop,
              measure: !!c.fixed,
              onOnResize: (V) => r.onResize(c, V)
            }, null, 8, ["measure", "onOnResize"]))), 128))
          ]),
          (h(!0), _(M, null, S(a.formList, (c, V) => (h(), b(l, {
            component: "tr",
            isRepeater: "",
            ref_for: !0,
            ref: "repeaterRows",
            class: "versa-repeater__table-row",
            options: r.deployOptions,
            status: c.status,
            defaultValues: c.values,
            key: `${c.values.rowKey || ""}-${V}-${c.values.__rowKey || ""}`,
            modelValue: c.values,
            onOnMounted: (w) => r.onValueChange(c, w, V, "mounted"),
            onInput: (w) => r.onValueChange(c, w, V)
          }, E({ _: 2 }, [
            r.hasOperateColumn ? {
              name: "operate",
              fn: m(() => [
                L(p, null, {
                  default: m(() => [
                    (h(!0), _(M, null, S(r.filterActions(c, V), (w) => (h(), _(M, null, [
                      w.is ? (h(), b($(w.is), v({
                        key: 0,
                        ref_for: !0
                      }, w, R(w.on || {})), null, 16)) : (h(), b(n, v({
                        key: 1,
                        type: "primary",
                        link: "",
                        ref_for: !0
                      }, w, {
                        onClick: (N, I) => r.onAction(w, c, V, I)
                      }), {
                        default: m(() => [
                          W(D(w.actionName), 1)
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
              fn: m(() => [
                O("span", null, D(typeof s.index == "function" ? s.index(V) : s.index), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["options", "status", "defaultValues", "modelValue", "onOnMounted", "onInput"]))), 128))
        ])
      ])
    ], 34),
    r.wheatherShowAddBtn ? (h(), b(n, {
      key: 0,
      link: "",
      type: "primary",
      class: "versa-repeater__add",
      actionIcon: a.IconPlus,
      onClick: r.onAdd
    }, {
      default: m(() => [
        W(D(s.addText), 1)
      ]),
      _: 1
    }, 8, ["actionIcon", "onClick"])) : B("", !0),
    L(d, v(r.modalProps, {
      visible: a.visible,
      "onUpdate:visible": t[1] || (t[1] = (c) => a.visible = c)
    }), E({ _: 2 }, [
      S(Object.keys(e.$slots), (c) => ({
        name: c,
        fn: m((V) => [
          C(e.$slots, c, A(T(V)))
        ])
      }))
    ]), 1040, ["visible"])
  ], 512);
}
const hs = /* @__PURE__ */ F(rs, [["render", ps]]), cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hs
}, Symbol.toStringTag, { value: "Module" })), fs = {
  name: "versa-provide",
  provide() {
    return {
      [Ce]: we(() => ({
        $$axios: this.axiosInstance
      }))
    };
  },
  props: {
    axiosInstance: {
      type: Function,
      default: () => () => {
      }
    }
  },
  data() {
    return {};
  }
};
function ms(e, t, s, i, a, r) {
  return C(e.$slots, "default");
}
const ai = /* @__PURE__ */ F(fs, [["render", ms]]);
export {
  Y as VersaButton,
  ue as VersaCard,
  jt as VersaCheckboxGroup,
  ri as VersaDropdown,
  Rt as VersaFilter,
  de as VersaForm,
  Le as VersaModal,
  ii as VersaPage,
  ai as VersaProvide,
  wt as VersaRadioGroup,
  hs as VersaRepeater,
  ut as VersaSelect,
  Ht as VersaTable
};
