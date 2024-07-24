var De = Object.defineProperty, Fe = Object.defineProperties;
var Re = Object.getOwnPropertyDescriptors;
var ye = Object.getOwnPropertySymbols;
var ke = Object.prototype.hasOwnProperty, ze = Object.prototype.propertyIsEnumerable;
var ge = (e, t, s) => t in e ? De(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, n = (e, t) => {
  for (var s in t || (t = {}))
    ke.call(t, s) && ge(e, s, t[s]);
  if (ye)
    for (var s of ye(t))
      ze.call(t, s) && ge(e, s, t[s]);
  return e;
}, f = (e, t) => Fe(e, Re(t));
var C = (e, t, s) => new Promise((i, r) => {
  var a = (d) => {
    try {
      o(s.next(d));
    } catch (l) {
      r(l);
    }
  }, u = (d) => {
    try {
      o(s.throw(d));
    } catch (l) {
      r(l);
    }
  }, o = (d) => d.done ? i(d.value) : Promise.resolve(d.value).then(a, u);
  o((s = s.apply(e, t)).next());
});
import Ye from "lodash/camelCase";
import ne from "lodash/upperFirst";
import { h as p, unref as Me, resolveComponent as g, openBlock as m, createElementBlock as b, normalizeClass as q, createElementVNode as L, toDisplayString as F, renderSlot as N, createVNode as j, withCtx as y, Fragment as x, renderList as P, createBlock as _, resolveDynamicComponent as R, mergeProps as V, toHandlers as k, createTextVNode as Q, createCommentVNode as W, defineAsyncComponent as Se, normalizeProps as O, guardReactiveProps as I, createSlots as U, withDirectives as Ce, resolveDirective as Ee, computed as Le, normalizeStyle as Be } from "vue";
import T from "lodash/pick";
import H from "lodash/mapKeys";
import ue from "tiny-emitter";
import z from "lodash/omit";
import { ElOption as be, ElOptionGroup as We, ElSelect as Ue, ElMessageBox as ve, ElButton as He, ElPopconfirm as Ze, ElSpace as Y, ElRadioButton as Ge, ElRadio as qe, ElRadioGroup as Qe, ElIcon as Je, ElImage as Ke, ElCheckboxButton as Xe, ElCheckbox as et, ElCheckboxGroup as tt, ElRow as st, ElTable as it, ElEmpty as rt, ElPagination as at, ElLoading as xe, ElTableColumn as Z, ElDialog as lt, ElDropdownItem as ot, ElDropdown as nt, ElDropdownMenu as ut } from "element-plus";
import "element-plus/es/components/space/style/css";
import re from "lodash/cloneDeep";
import "element-plus/es/components/row/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/option-group/style/css";
import G from "lodash/get";
import dt from "dayjs";
import ht from "async-validator";
import pt from "lodash/debounce";
import "element-plus/es/components/message-box/style/css";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/popconfirm/style/css";
import "element-plus/es/components/radio/style/css";
import "element-plus/es/components/radio-button/style/css";
import "element-plus/es/components/radio-group/style/css";
import { Plus as ct, Delete as ft } from "@element-plus/icons-vue";
import "lodash/ceil";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/image/style/css";
import "element-plus/es/components/checkbox-button/style/css";
import "element-plus/es/components/checkbox/style/css";
import "element-plus/es/components/checkbox-group/style/css";
import mt from "lodash/isFunction";
import yt from "lodash/upperCase";
import "element-plus/es/components/table/style/css";
import "element-plus/es/components/table-column/style/css";
import "element-plus/es/components/empty/style/css";
import "element-plus/es/components/pagination/style/css";
import "element-plus/es/components/loading/style/css";
import "element-plus/es/components/dialog/style/css";
import "element-plus/es/components/drawer/style/css";
import "element-plus/es/components/dropdown/style/css";
import "element-plus/es/components/dropdown-item/style/css";
import "element-plus/es/components/dropdown-menu/style/css";
const J = (e) => ["", null, void 0].includes(e), A = (e) => e, M = (e) => Object.prototype.toString.call(e).toLocaleLowerCase() === "[object object]", S = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function X(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
const gt = () => Math.random().toString(36).slice(2), _e = (e = {}) => {
  const t = {};
  for (const s in e)
    t[/^on[A-Z].*/.test(s) ? s : `on${ne(s)}`] = e[s];
  return t;
};
const Pe = {
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
            var r, a;
            return i[(a = (r = this.labelInValue) == null ? void 0 : r.value) != null ? a : "value"];
          }
        )) != null ? s : [] : e;
        return this.multiple ? t : J(t[0]) && this.mergedHasAll ? this.valueOfAll : t[0];
      },
      set(e) {
        var r, a;
        if (!this.labelInValue || e === this.valueOfAll || J(e)) {
          this.$emit(
            "update:modelValue",
            e === this.valueOfAll ? null : e
          );
          return;
        }
        const t = X(e), i = ((a = (r = this.mergedOptions) == null ? void 0 : r.filter(
          (u) => t.includes(u.value)
        )) != null ? a : []).map((u) => {
          let o = T(u, ["label", "value"]);
          return M(this.labelInValue) && (o = H(o, (d, l) => this.labelInValue[l] || l)), o;
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
      return p(
        "div",
        {
          ref: "renderText",
          class: "versa-form__item--preview"
        },
        this.previewText
      );
    const e = this.mergedOptions.map((r) => {
      var d, l, h;
      const a = {
        label: r.label,
        value: r.value,
        disabled: r.disabled
      }, u = ((d = r.children) == null ? void 0 : d.length) > 0, o = (h = (l = r.children) == null ? void 0 : l.map((c) => {
        const v = {
          props: {
            label: c.label,
            value: c.value,
            disabled: c.disabled
          }
        };
        return p(be, v);
      })) != null ? h : [];
      return p(u ? We : be, a, {
        default: () => o
      });
    }), t = Object.keys(this.$slots).map((r) => r === "default" ? this.$slots[r]() : this.$slots[r]()), s = [...e, ...t], i = f(n({
      teleported: !1
    }, this.$attrs), {
      multiple: this.multiple,
      modelValue: this.innerValue,
      "onUpdate:modelValue": (r) => this.innerValue = r,
      class: `versa-select ${this.$attrs.class || ""}`,
      ref: "versaSelectRef"
    });
    return p(Ue, i, {
      default: () => s
    });
  }
}, bt = {
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
    var i, r;
    const e = (r = (i = this.$slots).default) == null ? void 0 : r.call(i);
    if (!e)
      return null;
    if (!this.isAutoWidth)
      return e[0];
    const t = this.VersaForm.autoLabelWidth, s = {};
    if (t && t !== "auto") {
      const a = parseInt(t, 10) - this.computedWidth;
      a && (s.marginLeft = a + "px");
    }
    return p(
      "div",
      { class: "versa-form-item__label-wrap", style: s },
      {
        default: () => e
      }
    );
  }
}, vt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmNjO29wYWNpdHk6MDt9LmJ7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTc1NiAtMTk4KSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTc1NiAxOTgpIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik05LjgyMyw4NS42MzFhNy42NzUsNy42NzUsMCwwLDEtNy42NjctNy42NjcuNzg0Ljc4NCwwLDEsMSwxLjU2NywwQTYuMSw2LjEsMCwxLDAsNi4zOTIsNzIuOTJhLjc4My43ODMsMCwxLDEtLjg4Mi0xLjI5Myw3LjY2Nyw3LjY2NywwLDEsMSw0LjMxMywxNFpNMS4wNzYsNzkuMzU4YS41NzUuNTc1LDAsMCwxLS4zMzQtLjEuNTg3LjU4NywwLDAsMS0uMTQ4LS44MTdsMS41MjYtMi4yYS41ODcuNTg3LDAsMSwxLC45NjUuNjY5bC0xLjUyNiwyLjJBLjU4Ny41ODcsMCwwLDEsMS4wNzYsNzkuMzU4Wk00LjgsNzguNjg0YS41NzUuNTc1LDAsMCwxLS4zMzQtLjFsLTIuMi0xLjUyNmEuNTg3LjU4NywwLDAsMSwuNjY5LS45NjVsMi4yLDEuNTI2QS41ODcuNTg3LDAsMCwxLDQuOCw3OC42ODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzU2LjYxNiAxMjkuNykiLz48L2c+PC9zdmc+", _t = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZhOGE4O29wYWNpdHk6MDt9LmJ7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTYyMyAtMTk3KSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYyMyAxOTcpIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0xNS44MTgsMTUuOGMtLjI4Mi4yODQtLjk3LjE3LS45Ny4xN2wtMy4wODEtMy4wODRhNy4yNCw3LjI0LDAsMSwxLDEuMTIzLTEuMTIzbDMuMDgxLDMuMDgxcy4xMjYuNjc3LS4xNTMuOTU2Wk0xMi45Niw3LjI0OGE1LjcsNS43LDAsMSwwLTUuNyw1LjcsNS43LDUuNywwLDAsMCw1LjctNS43WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYyNS42OTggMTk5LjAwNikiLz48L2c+PC9zdmc+", Ne = Symbol("PageCore"), je = Symbol("Provide"), ee = {
  reset: {
    actionType: "reset",
    actionName: "重置",
    actionIcon: vt
  },
  search: {
    type: "primary",
    actionType: "search",
    actionName: "查询",
    actionIcon: _t
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
}, Vt = {
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
}, de = {
  inject: {
    injectedPageCore: {
      from: Ne,
      default: {}
    },
    formCore: {
      from: "VersaForm",
      default: () => ({})
    }
  },
  computed: {
    pageCore() {
      return Me(this.injectedPageCore);
    }
  },
  methods: {
    proxyPageCore(e) {
      return new Proxy(e != null && e.$ ? e : n(n({}, e), this.pageCore), {
        get: (t, s) => ["formCore", "pageCore"].includes(s) ? this[s] : S(this.pageCore, s) ? Reflect.get(this.pageCore, s) : Reflect.get(t, s),
        set(t, s, i) {
          return Reflect.set(t, s, i);
        }
      });
    }
  }
}, wt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0Ny45OTgiIHZpZXdCb3g9IjAgMCA0OCA0Ny45OTgiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOiNmZmJlMWI7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTA0Ljc3NSw0OC41NTlhMjQsMjQsMCwxLDAsMjQsMjRBMjQsMjQsMCwwLDAsMTA0Ljc3NSw0OC41NTlabTAsMzkuODc1YTMuMDU5LDMuMDU5LDAsMSwxLDMuMDU5LTMuMDU5QTMuMDU5LDMuMDU5LDAsMCwxLDEwNC43NzUsODguNDM0Wm0zLjA2LTEyLjk4MWEzLjA1OSwzLjA1OSwwLDAsMS02LjExOSwwVjYyLjRhMy4wNTksMy4wNTksMCwwLDEsNi4xMTksMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04MC43NzUgLTQ4LjU1OSkiLz48L3N2Zz4=", Mt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MzkiIGhlaWdodD0iMTIuNzM2IiB2aWV3Qm94PSIwIDAgMTIuNzM5IDEyLjczNiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6IzY2NjtmaWxsLXJ1bGU6ZXZlbm9kZDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMS42MDguMjA4LDYuMzc1LDUuNDQxLDEuMTQyLjIwOEEuNjgxLjY4MSwwLDAsMCwuNjc1LjAyMWEuNjI3LjYyNywwLDAsMC0uNDU3LjIuNjI3LjYyNywwLDAsMC0uMi40NTcuNjgxLjY4MSwwLDAsMCwuMTg3LjQ2N2w1LjIzNiw1LjIzTC4yMDgsMTEuNjA4YS42MzcuNjM3LDAsMCwwLS4xNzcuNjQ0LjYuNiwwLDAsMCwuNDU3LjQ2Ny42NjcuNjY3LDAsMCwwLC42NTQtLjE3N0w2LjM3NSw3LjMwOWw1LjIzMyw1LjIzM2EuNjYxLjY2MSwwLDAsMCwuOTM0LS45MzRMNy4zMDksNi4zNzVsNS4yMzMtNS4yMzNBLjYzNy42MzcsMCwwLDAsMTIuNzE5LjVhLjYuNiwwLDAsMC0uNDY3LS40NjcuNjM3LjYzNywwLDAsMC0uNjQ0LjE3NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAwNiAtMC4wMDcpIi8+PC9zdmc+";
const $ = {
  name: "versa-button",
  inheritAttrs: !1,
  mixins: [de],
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
      return n({
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
      return pt(
        (e) => {
          if (!this.isMessageBox)
            return this.$emit("click", e, this.proxyPageCore(this));
          ve(f(n({
            message: () => p("div", { class: "versa-message-box__container" }, [
              p("img", {
                src: Mt,
                class: "versa-message-box__close",
                onClick: () => {
                  ve.close();
                }
              }),
              p(
                "div",
                {
                  class: "versa-message-box__content"
                },
                [
                  p("img", {
                    src: wt,
                    class: "versa-message-box__icon"
                  }),
                  p("div", { class: "versa-message-box__wrap" }, [
                    J(this.confirmProps.title) ? void 0 : p(
                      "div",
                      {
                        class: "versa-message-box__title"
                      },
                      this.confirmProps.title
                    ),
                    p(
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
          }, z(this.confirmProps, ["title", "message", "type"])), {
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
    const e = f(n({}, z(this.$attrs, [
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
    }), t = p(He, e, {
      default: () => {
        var s, i;
        return [
          this.$attrs.actionIcon ? p("span", {
            class: "versa-button__icon",
            style: `background:url(${this.$attrs.actionIcon}) center center no-repeat;`
          }) : null,
          this.text || ((i = (s = this.$slots).default) == null ? void 0 : i.call(s))
        ];
      }
    });
    return this.isPopconfirm ? p(
      Ze,
      f(n({}, this.confirmProps), {
        onCancel: this.$attrs.onCancel || A,
        onConfirm: this.debouncedClick
      }),
      {
        reference: () => t
      }
    ) : t;
  }
};
const D = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, r] of t)
    s[i] = r;
  return s;
}, St = {
  components: {
    VersaButton: $,
    ElSpace: Y
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
      return (t = (e = this.actions) == null ? void 0 : e.map((s) => M(s) && S(s, "actionName") && S(s, "actionType") || s != null && s.is ? f(n({}, s), {
        disabled: typeof s.disabled == "function" ? s.disabled.bind(this) : s.disabled
      }) : null).filter(Boolean)) != null ? t : [];
    }
  },
  methods: {
    /** 操作按钮回调函数 */
    onAction(e, t) {
      return C(this, null, function* () {
        var s;
        (s = e.action) == null || s.call(e, this.formValues, t, e);
      });
    }
  }
}, Ct = {
  key: 0,
  class: "versa-card__header"
}, Lt = { class: "versa-card__title" }, xt = { class: "versa-card__action" }, Pt = { class: "versa-card__content" };
function Nt(e, t, s, i, r, a) {
  const u = g("VersaButton"), o = g("ElSpace");
  return m(), b("div", {
    class: q(["versa-card", { "versa-card--hasTitle": s.title }])
  }, [
    s.title ? (m(), b("div", Ct, [
      L("div", Lt, F(s.title), 1),
      L("div", xt, [
        N(e.$slots, "headerRight", {}, () => [
          j(o, { size: 20 }, {
            default: y(() => [
              (m(!0), b(x, null, P(a.toolActions, (d) => (m(), b(x, null, [
                d.is ? (m(), _(R(d.is), V({
                  key: d.is,
                  ref_for: !0
                }, d, k(d.on || {})), null, 16)) : (m(), _(u, V({
                  key: d.type,
                  size: "small",
                  ref_for: !0
                }, d, {
                  onClick: (l, h) => a.onAction(d, h)
                }), {
                  default: y(() => [
                    Q(F(d.actionName), 1)
                  ]),
                  _: 2
                }, 1040, ["onClick"]))
              ], 64))), 256))
            ]),
            _: 1
          })
        ])
      ])
    ])) : W("", !0),
    L("div", Pt, [
      N(e.$slots, "default")
    ])
  ], 2);
}
const te = /* @__PURE__ */ D(St, [["render", Nt]]), Ve = {
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
      return typeof this.labelType == "string" ? f(n({}, e), {
        type: this.labelType
      }) : M(this.labelType) ? n(n({}, e), this.labelType) : e;
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
      return /.*date.*/.test(t) ? X(this.fieldValue).map((i) => J(i) ? null : typeof e == "string" ? dt(i).format(e) : i).filter(Boolean).join(" ~ ") : typeof e == "function" ? e(this.fieldValue, this.optionConfig) : this.fieldValue;
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
      return t.indexOf(":") !== -1 && (t = t.replace(/:/, ".")), G(e, t);
    },
    formItemRules() {
      let e = this.VersaForm.rules;
      const t = this.rules, s = this.required !== void 0 ? { required: !!this.required } : [], i = G(e, this.prop || "");
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
    this.$emitter = new ue(), this.$emitter.on("addField", (e) => {
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
        var r, a;
        if ((r = s.children) != null && r.length && this.proxyEvent(s.children), !((a = s.props) != null && a["onUpdate:modelValue"]))
          return !1;
        for (const u in s.props)
          if (Object.hasOwnProperty.call(s.props, u)) {
            const o = s.props[u];
            typeof o == "function" && (s.props[u] = (...d) => o(...d, this.VersaForm));
          }
        const i = n({}, s.props);
        this.validateTrigger.forEach((u) => {
          const o = `on${ne(u)}`;
          Object.assign(s.props, {
            [o]: (...d) => {
              var l;
              (l = i[o]) == null || l.call(i, ...d), this.validate(u);
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
      let i = !0, r = 0, a = this.fields.length + (s.length ? 1 : 0);
      const u = {
        [this.prop]: []
      };
      if (s.length !== 0) {
        const o = {};
        s && s.length > 0 && s.forEach((l) => {
          delete l.trigger;
        }), o[this.prop] = s, new ht(o).validate(
          { [this.prop]: this.fieldValue },
          { firstFields: !0 },
          (l, h) => {
            var c;
            this.validateState = l ? "error" : "success", this.validateMessage = l ? l[0].message : "", l && (i = !1, u[this.prop].push(...h[this.prop])), typeof t == "function" && ++r === a && t(i, i ? {} : u), (c = this.VersaForm) == null || c.$emit(
              "validate",
              this.prop,
              !l,
              this.validateMessage || null
            );
          }
        );
      }
      this.fields.forEach((o) => {
        o.validate((d, l) => {
          d || (i = !1, u[this.prop].push(...Object.values(l).flat())), typeof t == "function" && ++r === a && t(i, i ? {} : u);
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
    var u, o, d, l, h, c, v, w, E, K, ce, fe, me;
    const e = [];
    this.interceptPreview ? e.push((d = (o = (u = this.previewText) == null ? void 0 : u.toString) == null ? void 0 : o.call(u)) != null ? d : this.previewText) : (e.push(...(h = (l = this.$slots).default) == null ? void 0 : h.call(l)), this.status !== "preview" && this.proxyEvent(e));
    const t = this.validateState === "error" && this.showMessage && this.VersaForm.showMessage, s = this.labelConfig.type === "card", i = !!this.tips && !t && !s;
    t && e.push(
      p("transition", { name: "el-zoom-in-top" }, [
        (K = (v = (c = this.$slots).error) == null ? void 0 : v.call(c, {
          error: this.validateMessage
        })) != null ? K : p(
          "div",
          {
            class: [
              "versa-form-item__error",
              {
                "versa-form-item__error--inline": typeof this.inlineMessage == "boolean" ? this.inlineMessage : (E = (w = this.VersaForm) == null ? void 0 : w.inlineMessage) != null ? E : !1
              }
            ]
          },
          [this.validateMessage]
        )
      ])
    );
    const r = [
      p(
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
    s || r.unshift(
      p(
        bt,
        {
          isAutoWidth: this.labelStyle && this.labelStyle.width === "auto",
          updateAll: this.VersaForm.labelWidth === "auto"
        },
        {
          default: () => [
            this.label || this.$slots.label ? p(
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
    const a = p(
      s ? te : "div",
      f(n({
        ref: "VersaFormItem",
        class: [
          "versa-form-item",
          `versa-form-item--${this.status}`,
          {
            "versa-form-item--feedback": (ce = this.VersaForm) == null ? void 0 : ce.statusIcon,
            "is-error": this.validateState === "error",
            "is-validating": this.validateState === "validating",
            "is-success": this.validateState === "success",
            "is-required": this.isRequired || this.required,
            "is-no-asterisk": (fe = this.VersaForm) == null ? void 0 : fe.hideRequiredAsterisk,
            [`versa-form-item--${this.sizeClass}`]: !!this.sizeClass,
            "versa-form-item--card": s,
            "versa-form-item--mb": s
          },
          this.$attrs.class
        ]
      }, s ? f(n({}, this.labelConfig), {
        title: this.label
      }) : {}), {
        style: this.$attrs.itemStyle
      }),
      {
        default: () => [r]
      }
    );
    return !s && this.tips && !t ? p("div", {}, [
      a,
      p("div", {
        class: [
          "versa-form-item__tips",
          {
            "versa-form-item--mb": i
          }
        ],
        style: {
          "margin-left": this.labelStyle.width === "auto" ? (me = this.VersaForm) == null ? void 0 : me.autoLabelWidth : this.labelStyle.width
        },
        innerHTML: this.tips
      })
    ]) : a;
  }
}, Ae = {
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
          (r) => r.value === e
        );
        if (!t) {
          this.$emit("update:modelValue", t);
          return;
        }
        let s = T(t, ["label", "value"]);
        M(this.labelInValue) && (s = H(
          s,
          (r, a) => this.labelInValue[a] || a
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
      const t = f(n({}, e), { border: this.border });
      return delete t.label, delete t.value, t;
    }
  },
  render() {
    if (this.isPreview)
      return p(
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
      const i = f(n({}, this.bindProps(s)), {
        value: s.value
      });
      return p(this.button ? Ge : qe, i, {
        default: () => s.label
      });
    }), t = f(n({}, this.$attrs), {
      modelValue: this.innerValue,
      // 拦截el-select的input事件， 外部v-model走自定义逻辑
      "onUpdate:modelValue": (s) => this.innerValue = s,
      class: "versa-radio-group",
      ref: "versaRadioGroup"
    });
    return p(Qe, t, {
      default: () => e
    });
  }
};
const jt = {
  name: "versa-image-upload",
  components: { Plus: ct, Delete: ft, ElIcon: Je, ElImage: Ke },
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
      var i, r;
      const t = (r = (i = e.target) == null ? void 0 : i.files) != null ? r : [];
      e.target.files = null, !(t.length === 0 || t.length > 1 || t[0].size > this.maxSize || !this.mergedAccept.split(";").some((a) => t[0].name.endsWith(a))) && (this.previewSrc = URL.createObjectURL(t[0]), this.$emit("update:modelValue", e.target.files[0]));
    },
    onRemove() {
      this.$emit("update:modelValue", null), this.previewSrc = null;
    }
  }
}, At = { class: "versa-image-upload" }, Ot = {
  key: 1,
  class: "versa-image-upload__preview"
}, It = /* @__PURE__ */ L("div", { class: "versa-image-upload__preview--mask" }, null, -1), Tt = ["accept"];
function $t(e, t, s, i, r, a) {
  const u = g("Plus"), o = g("ElIcon"), d = g("ElImage"), l = g("Delete");
  return m(), b("div", At, [
    r.previewSrc ? (m(), b("div", Ot, [
      j(d, {
        class: "versa-image-upload__preview--pic",
        src: r.previewSrc,
        "zoom-rate": 1.2,
        "max-scale": 7,
        "min-scale": 0.2,
        "preview-src-list": a.previewSrcList,
        fit: "cover"
      }, null, 8, ["src", "preview-src-list"]),
      s.status === "edit" ? (m(), b(x, { key: 0 }, [
        It,
        j(o, {
          class: "versa-image-upload__preview--remove",
          onClick: a.onRemove
        }, {
          default: y(() => [
            j(l)
          ]),
          _: 1
        }, 8, ["onClick"])
      ], 64)) : W("", !0)
    ])) : (m(), _(o, {
      key: 0,
      class: "versa-image-upload__icon",
      onClick: a.onClickUpload
    }, {
      default: y(() => [
        j(u)
      ]),
      _: 1
    }, 8, ["onClick"])),
    L("input", {
      ref: "inputRef",
      style: { opacity: "0", width: "1px", height: "1px", left: "-999px", position: "fixed", "z-index": "-999" },
      type: "file",
      accept: a.mergedAccept,
      onChange: t[0] || (t[0] = (...h) => a.handleChange && a.handleChange(...h))
    }, null, 40, Tt)
  ]);
}
const Dt = /* @__PURE__ */ D(jt, [["render", $t]]), Oe = {
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
            var i, r;
            return s[(r = (i = this.labelInValue) == null ? void 0 : i.value) != null ? r : "value"];
          }
        )) != null ? t : [] : this.modelValue || [];
      },
      set(e) {
        var i, r;
        if (!this.labelInValue) {
          this.$emit("update:modelValue", e);
          return;
        }
        const s = ((r = (i = this.mergedOptions) == null ? void 0 : i.filter(
          (a) => e.includes(a.value)
        )) != null ? r : []).map((a) => {
          let u = T(a, ["label", "value"]);
          return M(this.labelInValue) && (u = H(u, (o, d) => this.labelInValue[d] || d)), u;
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
      const t = f(n({}, e), { border: this.border });
      return delete t.label, delete t.value, delete t.checked, t;
    }
  },
  render() {
    if (this.isPreview)
      return p(
        "div",
        {
          ref: "renderText",
          class: "versa-form__item--preview"
        },
        { default: () => this.previewText }
      );
    const e = this.mergedOptions.map((s) => {
      const i = f(n({}, this.bindProps(s)), {
        value: s.value
      });
      return p(this.button ? Xe : et, i, {
        default: () => s.label
      });
    }), t = f(n({}, this.$attrs), {
      modelValue: this.innerValue,
      "onUpdate:modelValue": (s) => this.innerValue = s,
      class: "versa-checkbox-group",
      ref: "versaCheckboxGroup"
    });
    return p(tt, t, {
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
}, he = {
  methods: {
    dispatch(e, t, ...s) {
      var a;
      for (var i = this.$parent || this.$root, r = i.$options.name; i && (!r || r !== e); )
        i = i.$parent, i && (r = i.$options.name);
      i && ((a = i.$emitter) == null || a.emit(t, ...s));
    }
  }
};
const we = {
  "versa-select": "versa-select",
  "versa-checkbox-group": "versa-checkbox-group",
  "versa-radio-group": "versa-radio-group",
  "versa-form": "versa-form",
  "versa-repeater": "versa-repeater",
  "versa-image-upload": "versa-image-upload",
  "versa-repeater": "versa-repeater"
}, Ft = {
  name: "versa-form",
  components: {
    ElRow: st,
    ElSpace: Y,
    VersaSelect: Pe,
    VersaFormItem: Ve,
    VersaRadioGroup: Ae,
    VersaCheckboxGroup: Oe,
    VersaImageUpload: Dt,
    VersaRepeater: Se(() => Promise.resolve().then(() => fs))
  },
  mixins: [ae, he],
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
      }) : t.when === void 0 ? !0 : t.when).map((t) => f(n({}, t), {
        element: we[t.element] || t.element,
        useCustomPreview: typeof t.useCustomPreview == "boolean" ? t.useCustomPreview : !!we[t.element],
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
    this.$emitter = new ue(), this.$emitter.on("addField", (t) => {
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
      const t = M(e[0]) ? e[0] : { [e[0]]: e[1] };
      for (const s in t)
        S(t, s) && (this.innerStatusMap[s] = t[s]);
    },
    /** 获取表单状态 */
    getStatus(e) {
      var t;
      if (typeof e == "string")
        return (t = this.deployOptions.find((s) => s.prop === e)) == null ? void 0 : t.status;
      if (Array.isArray(e))
        return this.deployOptions.reduce((s, i) => e.includes(i.prop) ? f(n({}, s), { [i.prop]: i.status }) : s, {});
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
      typeof t != "function" && (s = new Promise((u, o) => {
        t = function(d, l) {
          d ? u(d) : o(l);
        };
      }));
      let i = !0, r = 0;
      e.length === 0 && t && t(!0);
      const a = {};
      if (e.forEach((u) => {
        u.validate("", (o, d) => {
          o || (i = !1), Object.assign(a, d), typeof t == "function" && ++r === e.length && t(i, a);
        });
      }), s)
        return s;
    },
    // 添加初始值
    addInitValue(e) {
      const t = e || n({}, this.defaultValues);
      this.options.forEach((s) => {
        t[s.prop] = re(this.getInitValueByKey(s.prop, t, s));
      }), this.model = n(n({}, this.model), t), this.$nextTick(() => {
        var s;
        this.$emit("onMounted", this.model), (s = this.$emitter) == null || s.emit("onMounted"), this.isMounted = !0;
      });
    },
    /** 获取初始值 */
    getInitValueByKey(e, t, s) {
      const i = t || n({}, this.defaultValues), r = s || this.options.find((u) => u.prop === e);
      if (!r) {
        console.warn("[VersaForm Warn][Form]unknow prop.");
        return;
      }
      const a = S(i, e);
      return a && typeof r.initValue != "undefined" ? r.initValue : a && typeof r.initValue == "undefined" ? i[e] : r.initValue;
    },
    /** item组件props */
    bindFormItemProps(e) {
      const t = Object.keys(Ve.props).reduce((s, i) => f(n({}, s), {
        [i]: e[i]
      }), {});
      return n(f(n({}, t), {
        optionConfig: n({}, e)
      }), e.formItemProps || {});
    },
    // 绑定属性
    bindProps(e) {
      const t = {
        disabled: e.status === "disabled"
      };
      return e.element === "el-date-picker" && Object.assign(t, n({
        "start-placeholder": "开始日期",
        "range-separator": "至",
        "end-placeholder": "结束日期"
      }, Vt[e.type || "date"])), Object.assign(t, f(n({}, e), {
        class: `versa-form-item-element ${e.class || ""}`
      })), z(t, [
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
function Rt(e, t, s, i, r, a) {
  const u = g("VersaFormItem"), o = g("ElSpace"), d = g("ElRow");
  return m(), _(R(s.component), {
    class: q([
      "versa-form",
      {
        "versa-form--inline": s.inline,
        [`versa-form--label-${e.labelPosition}`]: !!e.labelPosition
      }
    ])
  }, {
    default: y(() => [
      a.layout ? (m(), _(d, {
        key: 0,
        gutter: 20
      }, {
        default: y(() => [
          (m(!0), b(x, null, P(a.deployOptions, (l) => (m(), _(o, {
            key: l.prop,
            span: l.colSpan
          }, {
            default: y(() => [
              j(u, V({ ref_for: !0 }, a.bindFormItemProps(l), {
                prop: l.prop,
                label: l.label || "",
                rules: l.rules,
                status: l.status
              }), {
                default: y(() => [
                  l.slotName ? N(e.$slots, l.slotName, V({
                    key: 0,
                    data: a.model,
                    ref_for: !0
                  }, l)) : (m(), _(R(l.element), V({ key: 1 }, k(a.bindEvent(l)), { ref_for: !0 }, a.bindProps(l), {
                    modelValue: a.model[l.prop],
                    "onUpdate:modelValue": (h) => a.model[l.prop] = h
                  }), null, 16, ["modelValue", "onUpdate:modelValue"]))
                ]),
                _: 2
              }, 1040, ["prop", "label", "rules", "status"])
            ]),
            _: 2
          }, 1032, ["span"]))), 128))
        ]),
        _: 3
      })) : (m(!0), b(x, { key: 1 }, P(a.deployOptions, (l) => (m(), _(u, V({ ref_for: !0 }, a.bindFormItemProps(l), {
        key: l.prop,
        prop: l.prop,
        label: l.label || "",
        rules: l.rules,
        status: l.status
      }), {
        default: y(() => [
          l.slotName ? N(e.$slots, l.slotName, V({
            key: 0,
            data: a.model,
            ref_for: !0
          }, l)) : (m(), _(R(l.element), V({ key: 1 }, k(a.bindEvent(l)), { ref_for: !0 }, a.bindProps(l), {
            modelValue: a.model[l.prop],
            "onUpdate:modelValue": (h) => a.model[l.prop] = h
          }), null, 16, ["modelValue", "onUpdate:modelValue"]))
        ]),
        _: 2
      }, 1040, ["prop", "label", "rules", "status"]))), 128)),
      N(e.$slots, "footer", O(I({ model: a.model, actionType: e.actionType })))
    ]),
    _: 3
  }, 8, ["class"]);
}
const se = /* @__PURE__ */ D(Ft, [["render", Rt]]), kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: se
}, Symbol.toStringTag, { value: "Module" }));
const zt = T(ee, ["reset", "create", "search"]), Yt = {
  name: "versa-filter",
  components: {
    VersaForm: se,
    VersaCard: te,
    VersaButton: $,
    ElSpace: Y
  },
  mixins: [le, he, de],
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
      return typeof this.actions == "function" && (e = this.actions(this.formValues)), e == null ? void 0 : e.map((t) => typeof t == "string" ? zt[t] : M(t) && S(t, "actionName") && S(t, "actionType") || t != null && t.is ? f(n({}, t), {
        disabled: typeof t.disabled == "function" ? t.disabled.bind(this, this.formValues) : t.disabled
      }) : null).filter(Boolean);
    }
  },
  methods: {
    // 设置表单值
    setValues(e) {
      this.formValues = n(n({}, this.formValues), e);
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
      return C(this, null, function* () {
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
              z(e, ["actionType", "actionName", "action", "usePageModal"])
            );
            break;
          default:
            e.validate && (yield (s = this.$refs.formRef) == null ? void 0 : s.validate()), (i = e.action) == null || i.call(e, this.formValues, t, n({}, e));
            break;
        }
      });
    }
  }
}, Et = { class: "versa-filter__action" }, Bt = { class: "versa-filter__footer" };
function Wt(e, t, s, i, r, a) {
  const u = g("VersaButton"), o = g("ElSpace"), d = g("VersaForm"), l = g("VersaCard");
  return m(), _(l, {
    class: q([
      "versa-filter",
      {
        "versa-filter--emptyFooter": !e.$slots.footer
      }
    ]),
    title: e.filterTitle
  }, {
    default: y(() => [
      j(d, {
        ref: "formRef",
        modelValue: r.formValues,
        "onUpdate:modelValue": t[0] || (t[0] = (h) => r.formValues = h),
        options: s.options,
        defaultValues: e.defaultFilters,
        "label-width": e.labelWidth,
        labelSuffix: e.labelSuffix,
        onOnMounted: a.onMounted
      }, U({
        footer: y(() => [
          L("section", Et, [
            j(o, {
              class: "versa-filter__action--wrap",
              size: 20
            }, {
              default: y(() => [
                (m(!0), b(x, null, P(a.filterActions, (h) => (m(), b(x, null, [
                  h.is ? (m(), _(R(h.is), V({
                    key: 0,
                    ref_for: !0
                  }, h, k(h.on || {})), null, 16)) : (m(), _(u, V({
                    key: h.actionType,
                    type: h.type,
                    ref_for: !0
                  }, h, {
                    onClick: (c, v) => a.onAction(h, v)
                  }), {
                    default: y(() => [
                      Q(F(h.actionName), 1)
                    ]),
                    _: 2
                  }, 1040, ["type", "onClick"]))
                ], 64))), 256)),
                N(e.$slots, "btns", O(I(e.proxyPageCore({ formValues: r.formValues }))))
              ]),
              _: 3
            })
          ])
        ]),
        _: 2
      }, [
        P(Object.keys(e.$slots).filter(
          (h) => h !== "footer"
        ), (h) => ({
          name: h,
          fn: y((c) => [
            N(e.$slots, h, O(I(c)))
          ])
        }))
      ]), 1032, ["modelValue", "options", "defaultValues", "label-width", "labelSuffix", "onOnMounted"]),
      L("div", Bt, [
        N(e.$slots, "footer")
      ])
    ]),
    _: 3
  }, 8, ["class", "title"]);
}
const Ie = /* @__PURE__ */ D(Yt, [["render", Wt]]), Ut = {
  inject: {
    injectedProvide: {
      from: je,
      default: {}
    }
  },
  computed: {
    globalConfig() {
      return Me(this.injectedProvide);
    }
  }
};
const Ht = T(ee, ["remove", "edit", "detail"]), Te = {
  name: "versa-table",
  mixins: [oe, he, de, Ut],
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
      return (e = this.toolOptions) == null ? void 0 : e.map((t) => M(t) && S(t, "actionName") && S(t, "actionType") || t != null && t.is ? f(n({}, t), {
        on: _e(t.on),
        disabled: typeof t.disabled == "function" ? t.disabled.bind(this, this.multipleSelection) : t.disabled
      }) : null).filter(Boolean);
    },
    renderOptions() {
      var e, t;
      return (t = (e = this.options) == null ? void 0 : e.map((s) => {
        const i = n({}, s);
        return i.formatter || (i.formatter = (r) => {
          var a;
          return J(r[i.prop]) ? i.filterNull || ((a = this.fillNull) != null ? a : "") : M(i.mapSource) ? i.mapSource[r[i.prop]] : r[i.prop];
        }), i.type === "index" && !i.index && (i.index = (r) => `${r < 9 ? "0" : ""}${r + 1}`), i.type === "index" && !i.align && (i.align = "center"), delete i.children, i;
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
      return C(this, null, function* () {
        var e, t;
        try {
          const s = this.formatFilter(n(n({}, z(this.innerParams, ["total"])), this.queryParams));
          this.loading = !0;
          let i;
          if (mt(this.api))
            i = yield this.api(s);
          else {
            const r = yt(this.apiMethod) === "GET";
            i = yield (e = this.globalConfig) == null ? void 0 : e.$$axios({
              url: this.api,
              method: this.apiMethod,
              [r ? "params" : "data"]: s
            });
          }
          if (i = yield (t = this.formatResults) == null ? void 0 : t.call(this, i || {}), this.listKey)
            this.dataSource = G(i, this.listKey) || [];
          else {
            const r = Object.keys((i == null ? void 0 : i.data) || {}).find(
              (a) => /list$/i.test(a)
            );
            this.dataSource = G(i, `data.${r || ""}`) || [];
          }
          this.innerParams.total = G(i, this.totalKey || "data.total") || 0;
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
      var r;
      const i = z(e, [
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
          f(n({}, i), {
            actionType: e.actionType
          })
        );
        return;
      }
      switch (e.actionType) {
        case "create":
          this.dispatch("versa-page", "VersaFormPageOnCreate", {});
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
          (r = e.action) == null || r.call(e, t, s, f(n({}, e), {
            clearRowSelection: this.clearRowSelection
          }));
          break;
      }
    },
    /** 操作栏编辑 */
    filterActions(e, ...t) {
      let s = typeof e == "string" ? e.split(",") : e;
      return typeof e == "function" && (s = e(...t)), s == null ? void 0 : s.map((i) => typeof i == "string" ? Ht[i] : M(i) && S(i, "actionName") && S(i, "actionType") || i != null && i.is ? f(n({}, i), {
        on: _e(i.on),
        disabled: typeof i.disabled == "function" ? i.disabled.bind(this, t[0]) : i.disabled
      }) : null).filter(Boolean);
    }
  },
  render() {
    const e = (t) => t.map((s) => {
      var i;
      return s.slotName ? p(
        Z,
        n({
          "show-overflow-tooltip": !0
        }, s),
        {
          default: ({ row: r, column: a, $index: u }) => {
            var o, d;
            return (d = (o = this.$slots)[s.slotName]) == null ? void 0 : d.call(
              o,
              this.proxyPageCore({ row: r, column: a, $index: u })
            );
          }
        }
      ) : s.type === "selection" ? p(Z, n({
        "reserve-selection": !0
      }, s)) : s.actions ? p(Z, s, {
        default: ({ row: r, column: a, $index: u }) => p(
          Y,
          {},
          {
            default: () => this.filterActions(
              s.actions,
              r,
              a,
              u
            ).map((o) => o.is ? p(g(o.is), n(n({}, o), o.on)) : p(
              $,
              f(n({
                type: "primary",
                link: !0
              }, o), {
                onClick: (d, l) => this.onAction(o, r, l)
              }),
              { default: () => o.actionName }
            ))
          }
        )
      }) : ((i = s.children) == null ? void 0 : i.length) > 0 ? p(Z, ...z(s, ["children"]), {
        default: () => e(s.children)
      }) : p(Z, n({
        "show-overflow-tooltip": !0
      }, s));
    });
    return Ce(
      p(
        te,
        {
          class: "versa-table",
          title: this.headline
        },
        {
          headerRight: () => [
            p(
              Y,
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
                    ...this.tools.map((i) => i.is ? p(g(i.is), n(n({}, i), i.on)) : p(
                      $,
                      f(n({}, i), {
                        onClick: (r, a) => this.onAction(
                          i,
                          this.multipleSelection,
                          a
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
              p(
                it,
                f(n({
                  style: { width: "100%" }
                }, this.extraTableProps), {
                  data: this.dataSource,
                  "row-key": this.rowKey,
                  onSelectionChange: this.handleSelectionChange,
                  ref: "table"
                }),
                {
                  empty: () => {
                    var i, r, a;
                    return (a = (r = (i = this.$slots).empty) == null ? void 0 : r.call(
                      i,
                      this.proxyPageCore({
                        multipleSelection: this.multipleSelection,
                        clearRowSelection: this.clearRowSelection
                      })
                    )) != null ? a : p(rt, { description: "暂无数据" });
                  },
                  default: () => e(this.renderOptions)
                }
              ),
              this.needPagination && this.innerParams.total > 0 ? p(at, f(n({
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
      [[xe.directive, this.loading]]
    );
  }
};
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
    VersaForm: se,
    VersaButton: $,
    ElSpace: Y,
    ElDialog: lt
  },
  directives: {
    loading: xe.directive
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
        n({}, this.formProps)
      );
    },
    /** 弹窗操作栏 */
    dialogActions() {
      let e = typeof this.actions == "string" ? this.actions.split(",") : this.actions;
      return typeof this.actions == "function" && (e = this.actions(this.formValues)), e == null ? void 0 : e.map((t) => typeof t == "string" ? Zt[t] : M(t) && S(t, "actionName") && S(t, "actionType") || t != null && t.is ? f(n({}, t), {
        disabled: typeof t.disabled == "function" ? t.disabled.bind(this, this.formValues) : t.disabled
      }) : null).filter(Boolean);
    },
    /** 透传的props */
    undefProps() {
      return V(
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
      return C(this, null, function* () {
        var t;
        let e = n({}, this.defaultValues);
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
      return C(this, null, function* () {
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
            (i = e.action) == null || i.call(e, this.formValues, t, f(n({}, e), {
              close: this.close
            }));
            break;
        }
      });
    },
    /** 点击确认 */
    onConfirm(e) {
      return C(this, null, function* () {
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
function qt(e, t, s, i, r, a) {
  const u = g("VersaForm"), o = g("VersaButton"), d = g("ElSpace"), l = Ee("loading");
  return a.dialogVisible ? (m(), _(R(s.panelType), V({
    key: 0,
    "destroy-on-close": "",
    modelValue: a.dialogVisible,
    "onUpdate:modelValue": t[1] || (t[1] = (h) => a.dialogVisible = h)
  }, a.undefProps, { "before-close": a.beforeClose }), {
    default: y(() => [
      Ce((m(), _(u, V(a.mergedFormProps, {
        class: "versa-modal__form",
        ref: "formRef",
        autoInitValue: !1,
        modelValue: r.formValues,
        "onUpdate:modelValue": t[0] || (t[0] = (h) => r.formValues = h)
      }), U({
        footer: y((h) => [
          N(e.$slots, "modalFooter", O(I(f(n({}, h), { loading: r.loading, refresh: a.initForm }))))
        ]),
        _: 2
      }, [
        P(Object.keys(e.$slots).filter(
          (h) => h !== "footer"
        ), (h) => ({
          name: h,
          fn: y((c) => [
            N(e.$slots, h, O(I(c)))
          ])
        }))
      ]), 1040, ["modelValue"])), [
        [l, r.loading]
      ]),
      a.dialogActions.length ? (m(), _(d, {
        key: 0,
        size: 20,
        class: "versa-modal__footer"
      }, {
        default: y(() => [
          (m(!0), b(x, null, P(a.dialogActions, (h) => (m(), b(x, {
            key: h.actionType
          }, [
            h.is ? (m(), _(R(h.is), V({
              key: 0,
              ref_for: !0
            }, h, k(h.on || {})), null, 16)) : W("", !0),
            j(o, V({ ref_for: !0 }, h, {
              onClick: (c, v) => a.onAction(h, v)
            }), {
              default: y(() => [
                Q(F(h.actionName), 1)
              ]),
              _: 2
            }, 1040, ["onClick"])
          ], 64))), 128))
        ]),
        _: 1
      })) : W("", !0)
    ]),
    _: 3
  }, 16, ["modelValue", "before-close"])) : W("", !0);
}
const pe = /* @__PURE__ */ D(Gt, [["render", qt]]);
const Qt = {
  components: {
    VersaFilter: Ie,
    VersaTable: Te,
    VersaModal: pe
  },
  name: "versa-page",
  provide() {
    return {
      [Ne]: Le(() => ({
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
      const e = Object.keys(oe.props).reduce(
        (t, s) => f(n({}, t), {
          [s]: this[s]
        }),
        {}
      );
      return e.formatFilter = (t) => {
        const s = n({}, t);
        if (M(this.keyMap))
          for (const i in this.keyMap) {
            if (!Object.hasOwnProperty.call(this.keyMap, i))
              continue;
            const r = this.keyMap[i];
            typeof r == "string" && (s[r] = s[i], delete s[i]), Array.isArray(r) && (r.forEach((a, u) => {
              var o;
              s[a] = (o = s[i]) == null ? void 0 : o[u];
            }), delete s[i]);
          }
        return this.formatFilter(s);
      }, e;
    },
    /** 列表组件通用属性透传 */
    filterProps() {
      return Object.keys(le.props).reduce(
        (t, s) => f(n({}, t), {
          [s]: this[s]
        }),
        {}
      );
    },
    /** 弹窗组件参数 */
    modalProps() {
      return n(n({
        width: "700px"
      }, this.detailProps), this.actionParams);
    },
    /** filter事件透传 */
    filterListeners() {
      return H(
        T(this.$attrs, []),
        (e, t) => t.replace("onOn", "on")
      );
    },
    /** table事件透传 */
    tableListeners() {
      return H(
        T(this.$attrs, []),
        (e, t) => t.replace("onOn", "on")
      );
    }
  },
  created() {
    this.$emitter = new ue(), this.$emitter.on("VersaFormPageOnCreate", (e, t = {}) => {
      this.onAction("create", n({ defaultValues: {} }, t));
    }), this.$emitter.on(
      "VersaFormPageOnUpdate",
      (e = {}, t = {}) => {
        this.onAction("edit", n({ defaultValues: e }, t));
      }
    ), this.$emitter.on(
      "VersaFormPageOnDetail",
      (...s) => C(this, [...s], function* (e = {}, t = {}) {
        this.onAction("detail", n({ defaultValues: e }, t));
      })
    ), this.$emitter.on(
      "VersaFormPageUsePageModal",
      (...s) => C(this, [...s], function* (e = {}, t = {}) {
        this.onAction("usePageModal", n({ defaultValues: e }, t));
      })
    ), this.$emitter.on("VersaFormPageOnRemove", (e) => C(this, null, function* () {
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
        s && (this.queryParams = n({}, e));
      });
    },
    /** 初始化成 */
    onMounted(e) {
      var t;
      this.autoLoad && ((t = this.$refs.filterRef) == null || t.validate((s) => {
        s ? this.queryParams = n({}, e) : this.$refs.filterRef.clearValidate();
      }));
    },
    /** 搜索 */
    onSearch(e) {
      this.queryParams = n({}, e);
    },
    /** 内置操作回调 */
    onAction(e = "create", t = {}) {
      var s, i;
      this.actionParams = n({
        title: (i = (s = ee[e]) == null ? void 0 : s.actionName) != null ? i : "",
        status: ["detail", "usePageModal"].includes(e) ? "preview" : "edit",
        actions: ["detail", "usePageModal"].includes(e) ? "" : void 0,
        formatBefore: e === "create" ? null : this.detailProps.formatBefore,
        actionType: e,
        onOk: (r) => C(this, null, function* () {
          var a;
          yield (a = this[e === "create" ? "onCreate" : "onUpdate"]) == null ? void 0 : a.call(
            this,
            r
          ), this.refresh();
        })
      }, t), this.panelVisible = !0;
    },
    /** 刷新列表 */
    refresh(e) {
      this.queryParams = e || n({}, this.queryParams);
    }
  }
}, Jt = { class: "versa-page" };
function Kt(e, t, s, i, r, a) {
  const u = g("VersaFilter"), o = g("VersaTable"), d = g("VersaModal");
  return m(), b("div", Jt, [
    j(u, V({ ref: "filterRef" }, a.filterProps, {
      options: s.filterOptions,
      defaultFilters: e.defaultFilters,
      onOnReset: a.onReset,
      onOnSearch: a.onSearch,
      onOnMounted: a.onMounted,
      onOnFilterChange: a.onFilterChange
    }, k(a.filterListeners)), {
      btns: y((l) => [
        N(e.$slots, "btns", O(I(l)))
      ]),
      _: 3
    }, 16, ["options", "defaultFilters", "onOnReset", "onOnSearch", "onOnMounted", "onOnFilterChange"]),
    j(o, V(a.tableProps, {
      autoLoad: !1,
      options: s.tableOptions,
      queryParams: r.queryParams,
      onOnSelectChange: a.onSelectChange
    }, k(a.tableListeners)), U({ _: 2 }, [
      P(Object.keys(e.$slots), (l) => ({
        name: l,
        fn: y((h) => [
          N(e.$slots, l, O(I(h)))
        ])
      }))
    ]), 1040, ["options", "queryParams", "onOnSelectChange"]),
    j(d, V(a.modalProps, {
      visible: r.panelVisible,
      "onUpdate:visible": t[0] || (t[0] = (l) => r.panelVisible = l)
    }), U({ _: 2 }, [
      P(Object.keys(e.$slots), (l) => ({
        name: l,
        fn: y((h) => [
          N(e.$slots, l, O(I(h)))
        ])
      }))
    ]), 1040, ["visible"])
  ]);
}
const Xt = /* @__PURE__ */ D(Qt, [["render", Kt]]);
const es = {
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
      const t = n({}, e);
      return delete t.label, delete t.value, t;
    },
    /** 点击回调 */
    onAction(e) {
      var r;
      if (!this.labelInValue) {
        this.$emit("command", e, this);
        return;
      }
      const t = (r = this.mergedOptions) == null ? void 0 : r.find((a) => e === a.value), s = T(t, ["label", "value"]), i = H(
        s,
        (a, u) => this.labelInValue[u] || u
      );
      this.$emit("command", i, this);
    }
  },
  render() {
    var i, r;
    if ((M(this.text) && !this.text.text || !this.text) && !this.$slots.default)
      return null;
    const e = f(n({
      placement: "bottom"
    }, this.$attrs), {
      onCommand: this.onAction,
      class: "versa-dropdown",
      ref: "versaDropdown"
    }), t = this.mergedOptions.map((a) => {
      const u = f(n({}, this.bindProps(a)), {
        command: a.value,
        class: "versa-dropdown-item"
      });
      return p(ot, u, {
        default: () => a.label
      });
    }), s = [];
    if (this.$attrs["split-button"])
      s.push(M(this.text) ? this.text.text : this.text);
    else if (typeof this.text == "string") {
      const a = [this.text];
      this.icon && a.push(p("i", { class: this.icon })), s.push(
        p(
          $,
          {
            type: "primary",
            link: !0,
            disabled: this.$attrs.disabled,
            loading: this.isLoading
          },
          { default: () => a }
        )
      );
    } else
      M(this.text) ? s.push(
        p(
          $,
          f(n({
            type: "primary",
            link: !0
          }, this.text), {
            disabled: this.$attrs.disabled,
            loading: this.isLoading
          }),
          { default: () => this.text.text }
        )
      ) : s.push((r = (i = this.$slots).default) == null ? void 0 : r.call(i));
    return p(nt, e, {
      default: () => s,
      dropdown: () => p(
        ut,
        { slot: "dropdown" },
        { default: () => t }
      )
    });
  }
}, ts = {
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
}, ss = {
  ref: "measureRef",
  style: { padding: "0", border: "0", height: "0" }
};
function is(e, t, s, i, r, a) {
  return m(), b("td", ss, null, 512);
}
const rs = /* @__PURE__ */ D(ts, [["render", is]]);
class ie {
  constructor(t) {
    const { type: s, values: i, status: r, mounted: a = A, isNew: u = !1 } = t;
    switch (this.type = s, this.values = i, this.temporaryValues = i, this.isNew = u, this.type) {
      case "dialog":
      case "inline":
        this.status = "preview";
        break;
      case "sync":
        this.status = r;
    }
    this.mounted = a;
  }
}
const as = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTEzNi44NjMsMTI5Ljg2NGgtNS4xMzF2LTUuMTMxYS45MzQuOTM0LDAsMSwwLTEuODY4LDB2NS4xMzJoLTUuMTMxYS45MzQuOTM0LDAsMSwwLDAsMS44NjhoNS4xMzJ2NS4xMzJhLjkzNC45MzQsMCwxLDAsMS44NjgsMHYtNS4xMzRoNS4xMzJhLjkzNC45MzQsMCwxLDAsMC0xLjg2OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjMuOCAtMTIzLjgpIi8+PC9zdmc+";
const B = T(ee, [
  "save",
  "cancel",
  "edit",
  "up",
  "down",
  "remove"
]), ls = {
  name: "versa-repeater",
  inheritAttrs: !1,
  components: {
    VersaForm: Se(() => Promise.resolve().then(() => kt)),
    VersaButton: $,
    VersaModal: pe,
    VersaMeasureCell: rs,
    ElSpace: Y
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
      IconPlus: as
    };
  },
  watch: {
    modelValue: {
      handler(e) {
        var t;
        this.formList = (t = e == null ? void 0 : e.map((s) => this.formList.find((r) => r.values === s || r.temporaryValues === s || s[this.rowKey] && r.values[this.rowKey] === s[this.rowKey] || s.__rowKey && r.values.__rowKey === s.__rowKey) || new ie({
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
      const e = n({}, this.defaultValues);
      return this.options.forEach((t) => {
        const s = S(e, t.prop);
        s && typeof t.initValue != "undefined" ? e[t.prop] = t.initValue : s && typeof t.initValue == "undefined" || (typeof t.initValue == "undefined" ? e[t.prop] = null : e[t.prop] = t.initValue);
      }), e;
    },
    /** 是否存在操作列 */
    hasOperateColumn() {
      if (this.status !== "edit")
        return !1;
      const e = this.formList.length;
      let t = 0, s = 0;
      this.formList.forEach((a, u) => {
        this.decideHasBtn("hasDelete", a.values, u) || (t += 1), this.decideHasBtn("hasUpdate", a.values, u) || (s += 1);
      });
      const i = e ? t < e : this.hasDelete, r = e ? s < e : this.hasUpdate;
      return this.type === "sync" ? i : i || r;
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
        const r = {
          width: 60,
          label: "序号",
          prop: "__index",
          slotName: "index",
          useCustomPreview: !0,
          itemAlign: "center"
        };
        2 & this.fixedMode ? t.unshift(f(n({}, r), { fixed: "right" })) : i || 1 & this.fixedMode ? e.unshift(f(n({}, r), { fixed: "left" })) : s.unshift(r);
      }
      if (this.hasOperateColumn) {
        const r = {
          label: "操作",
          slotName: "operate",
          prop: "__operate",
          useCustomPreview: !0
        };
        4 & this.fixedMode ? e.push(f(n({}, r), { fixed: "left" })) : i || 8 & this.fixedMode ? t.push(f(n({}, r), { fixed: "right" })) : s.push(r);
      }
      return [].concat(e, s, t).map((r) => {
        var o, d;
        let a = "", u = "";
        if (r.fixed) {
          const l = r.fixed === "right", h = l ? "right" : "left", c = l ? [...t].reverse() : e;
          let v = 0;
          c.some((w) => {
            const E = w.prop === r.prop;
            return E || (v += this.fixedColumnWidth[w.prop] || 0), E;
          }), a = `position: sticky; ${h}: ${v}px;z-index: 2`, (l && ((o = t[0]) == null ? void 0 : o.prop) === r.prop || !l && ((d = e.slice(-1)[0]) == null ? void 0 : d.prop) === r.prop) && (u += ` versa-repeater__table-row-fixed--${h}`);
        }
        return f(n({}, r), {
          width: void 0,
          label: void 0,
          __width: r.width,
          __label: r.label,
          __fixedClass: u,
          formItemProps: {
            class: `versa-repeater__table-row--cell versa-repeater__table-row--${r.itemAlign || this.itemAlign}` + u,
            itemStyle: a,
            contentStyle: r.width ? `width:${r.width - 20}px` : ""
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
      ].map((e) => f(n({}, e), {
        width: void 0
      }));
    },
    /** 弹窗组件参数 */
    modalProps() {
      return n({
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
      var r;
      if (i === "mounted") {
        e.values = t, !e.isNew && this.$emit("update:modelValue", this.getValues()), (r = e.mounted) == null || r.call(e, e);
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
      return C(this, null, function* () {
        const [i, r] = yield this.handleAsyncAction(
          "save",
          e,
          this.formList.length
        );
        if (!i)
          return;
        const { formCore: a, dialogType: u } = this.actionParams;
        a.values = r, u === "add" && this.formList.push(a), this.$emit("update:modelValue", this.getValues()), s.close();
      });
    },
    /** 是否有自定义指定按钮 */
    decideHasBtn(e, t, s) {
      const i = this[e];
      let r = !0;
      return typeof i == "boolean" ? r = i : typeof i == "function" && (r = i(t, s, { globalStatus: this.status })), r;
    },
    /** 操作栏编辑 */
    filterActions(e, t) {
      const s = [], { values: i } = e, r = this.type === "inline" && e.status === "edit";
      r && this.decideHasBtn("hasUpdate", i, t) && (s.push(B.save), s.push(B.cancel)), ["inline", "dialog"].includes(this.type) && e.status === "preview" && this.decideHasBtn("hasUpdate", i, t) && s.push(B.edit), t !== 0 && this.decideHasBtn("hasMoveUp", i, t) && s.push(B.up), t !== this.formList.length - 1 && this.decideHasBtn("hasMoveDown", i, t) && s.push(B.down), !r && this.decideHasBtn("hasDelete", i, t) && s.push(B.remove);
      let a = Array.isArray(this.actions) ? this.actions : [this.actions];
      typeof this.actions == "function" && (a = this.actions(i, t, {
        globalStatus: this.status
      }));
      const u = a == null ? void 0 : a.map((o) => M(o) && S(o, "actionName") && S(o, "actionType") || o != null && o.is ? f(n({}, o), {
        disabled: typeof o.disabled == "function" ? o.disabled.bind(this, rest[0]) : o.disabled
      }) : null).filter(Boolean);
      return [...s, ...u];
    },
    /** 新增 */
    onAdd() {
      return C(this, null, function* () {
        const e = this.formList.length;
        if (e >= this.maxLength || !(!this.validateBeforeAdd || (yield this.validate().catch((a) => (console.warn("[VersaRepeater] 新增校验失败", a), !1)))))
          return;
        const [s, i] = yield this.handleAsyncAction(
          "add",
          f(n({}, this.initValue), { __rowKey: `repeater_${gt()}` }),
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
        const r = new ie({
          values: i,
          type: this.type,
          status: "edit",
          isNew: this.type === "inline",
          mounted: (a) => {
            this.type === "inline" && (a.temporaryValues = a.values, a.values = re(a.values), a.status = "edit");
          }
        });
        this.formList.push(r);
      });
    },
    /** 操作按钮 */
    onAction(e, t, s, i) {
      return C(this, null, function* () {
        var a, u, o;
        const { values: r } = t;
        if (e.usePageModal) {
          this.visible = !0, this.actionParams = n({
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
            const [d, l] = yield this.handleAsyncAction(
              "update",
              t.values,
              s
            );
            if (!d)
              return;
            this.type === "dialog" ? (this.visible = !0, this.actionParams = {
              title: "新增",
              formCore: t,
              defaultValues: l
            }) : this.type === "inline" && (t.temporaryValues = t.values, t.values = l, t.status = "edit");
            break;
          }
          case "save": {
            if (!(yield (u = (a = this.$refs.repeaterRows) == null ? void 0 : a[s]) == null ? void 0 : u.validate().catch((c) => (console.warn("[VersaRepeater] 保存校验失败", c), !1))))
              return;
            const [l, h] = yield this.handleAsyncAction(
              "save",
              t.values,
              s
            );
            if (!l)
              return;
            t.temporaryValues = h, t.values = h, t.status = "preview", t.isNew = !1, this.$emit("update:modelValue", this.getValues()), this.$emit("onValueChange", t, s);
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
            (o = e.action) == null || o.call(e, r, i, n({}, e));
            break;
          }
        }
      });
    },
    /** 校验 */
    validate(e) {
      var a, u;
      let t;
      typeof e != "function" && (t = new Promise((o, d) => {
        e = function(l, h) {
          l ? o(l) : d(h);
        };
      }));
      let s = !0, i = 0;
      !((a = this.$refs.repeaterRows) != null && a.length) && e && e(!0);
      const r = {};
      if ((u = this.$refs.repeaterRows) == null || u.forEach((o, d) => {
        o.validate((l, h) => {
          l || (s = !1, Object.assign(r, { [d]: h })), typeof e == "function" && ++i === this.$refs.repeaterRows.length && e(s, r);
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
      return C(this, null, function* () {
        var u, o, d;
        const i = re(t);
        let r = null, a = !0;
        try {
          r = (d = yield (o = (u = this.asyncHandler)[e]) == null ? void 0 : o.call(u, i, s)) != null ? d : !0;
        } catch (l) {
          result = !1;
        }
        if (typeof r == "boolean")
          a = r, r = r ? i : null;
        else if (r === void 0)
          a = !0, r = i;
        else if (M(r)) {
          const { success: l, values: h } = r || {};
          a = l, r = h;
        }
        return [a, r];
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
}, os = {
  class: "versa-repeater",
  ref: "formRef"
}, ns = { class: "versa-repeater__table" }, us = ["width"], ds = { class: "versa-repeater__table-header" }, hs = { class: "versa-repeater__table-row" }, ps = { class: "versa-repeater__table-body" };
function cs(e, t, s, i, r, a) {
  const u = g("VersaMeasureCell"), o = g("VersaButton"), d = g("ElSpace"), l = g("VersaForm"), h = g("VersaModal");
  return m(), b("div", os, [
    L("div", {
      ref: "scrollRef",
      class: q([
        "versa-repeater__scroll",
        {
          "versa-repeater__scroll-pinged--left": r.pingedLeft,
          "versa-repeater__scroll-pinged--right": r.pingedRight
        }
      ]),
      onScroll: t[0] || (t[0] = (...c) => a.onScroll && a.onScroll(...c))
    }, [
      L("table", ns, [
        L("colgroup", null, [
          (m(!0), b(x, null, P(a.deployOptions, (c) => (m(), b("col", {
            width: c.__width || "auto"
          }, null, 8, us))), 256))
        ]),
        L("thead", ds, [
          L("tr", hs, [
            (m(!0), b(x, null, P(a.deployOptions, (c) => (m(), b("th", {
              class: q([
                "versa-repeater__table-header--cell",
                `versa-repeater__table-row--${c.itemAlign || c.itemAlign}`,
                c.__fixedClass
              ]),
              style: Be(c.formItemProps.itemStyle)
            }, F(c.__label), 7))), 256))
          ])
        ]),
        L("tbody", ps, [
          L("tr", null, [
            (m(!0), b(x, null, P(a.deployOptions, (c) => (m(), _(u, {
              key: c.prop,
              measure: !!c.fixed,
              onOnResize: (v) => a.onResize(c, v)
            }, null, 8, ["measure", "onOnResize"]))), 128))
          ]),
          (m(!0), b(x, null, P(r.formList, (c, v) => (m(), _(l, {
            component: "tr",
            isRepeater: "",
            ref_for: !0,
            ref: "repeaterRows",
            class: "versa-repeater__table-row",
            options: a.deployOptions,
            status: c.status,
            defaultValues: c.values,
            key: `${c.values.rowKey || ""}-${v}-${c.values.__rowKey || ""}`,
            modelValue: c.values,
            onOnMounted: (w) => a.onValueChange(c, w, v, "mounted"),
            onInput: (w) => a.onValueChange(c, w, v)
          }, U({ _: 2 }, [
            a.hasOperateColumn ? {
              name: "operate",
              fn: y(() => [
                j(d, null, {
                  default: y(() => [
                    (m(!0), b(x, null, P(a.filterActions(c, v), (w) => (m(), b(x, null, [
                      w.is ? (m(), _(R(w.is), V({
                        key: 0,
                        ref_for: !0
                      }, w, k(w.on || {})), null, 16)) : (m(), _(o, V({
                        key: 1,
                        type: "primary",
                        link: "",
                        ref_for: !0
                      }, w, {
                        onClick: (E, K) => a.onAction(w, c, v, K)
                      }), {
                        default: y(() => [
                          Q(F(w.actionName), 1)
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
              fn: y(() => [
                L("span", null, F(typeof s.index == "function" ? s.index(v) : s.index), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["options", "status", "defaultValues", "modelValue", "onOnMounted", "onInput"]))), 128))
        ])
      ])
    ], 34),
    a.wheatherShowAddBtn ? (m(), _(o, {
      key: 0,
      link: "",
      type: "primary",
      class: "versa-repeater__add",
      actionIcon: r.IconPlus,
      onClick: a.onAdd
    }, {
      default: y(() => [
        Q(F(s.addText), 1)
      ]),
      _: 1
    }, 8, ["actionIcon", "onClick"])) : W("", !0),
    j(h, V(a.modalProps, {
      visible: r.visible,
      "onUpdate:visible": t[1] || (t[1] = (c) => r.visible = c)
    }), U({ _: 2 }, [
      P(Object.keys(e.$slots), (c) => ({
        name: c,
        fn: y((v) => [
          N(e.$slots, c, O(I(v)))
        ])
      }))
    ]), 1040, ["visible"])
  ], 512);
}
const $e = /* @__PURE__ */ D(ls, [["render", cs]]), fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" })), ms = {
  name: "versa-provide",
  provide() {
    return {
      [je]: Le(() => ({
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
function ys(e, t, s, i, r, a) {
  return N(e.$slots, "default");
}
const gs = /* @__PURE__ */ D(ms, [["render", ys]]), bs = [
  Xt,
  Ie,
  Te,
  se,
  pe,
  $,
  Oe,
  Ae,
  es,
  Pe,
  $e,
  te,
  gs
], ui = (e) => {
  bs.forEach((t) => {
    e.component(ne(Ye(t.name)), t);
  });
};
export {
  $ as VersaButton,
  te as VersaCard,
  Oe as VersaCheckboxGroup,
  es as VersaDropdown,
  Ie as VersaFilter,
  se as VersaForm,
  pe as VersaModal,
  Xt as VersaPage,
  gs as VersaProvide,
  Ae as VersaRadioGroup,
  $e as VersaRepeater,
  Pe as VersaSelect,
  Te as VersaTable,
  ui as install
};
