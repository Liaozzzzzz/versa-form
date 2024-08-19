var Re = Object.defineProperty, $e = Object.defineProperties;
var Be = Object.getOwnPropertyDescriptors;
var ge = Object.getOwnPropertySymbols;
var Ue = Object.prototype.hasOwnProperty, We = Object.prototype.propertyIsEnumerable;
var Me = (e, t, s) => t in e ? Re(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, n = (e, t) => {
  for (var s in t || (t = {}))
    Ue.call(t, s) && Me(e, s, t[s]);
  if (ge)
    for (var s of ge(t))
      We.call(t, s) && Me(e, s, t[s]);
  return e;
}, m = (e, t) => $e(e, Be(t));
var _ = (e, t, s) => new Promise((i, r) => {
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
import Ze from "lodash/camelCase";
import ue from "lodash/upperFirst";
import { h as c, unref as _e, resolveComponent as M, openBlock as f, createElementBlock as b, normalizeClass as J, createElementVNode as C, toDisplayString as x, renderSlot as V, createVNode as D, withCtx as g, Fragment as j, renderList as S, createBlock as w, resolveDynamicComponent as k, mergeProps as v, toHandlers as Y, createTextVNode as Z, createCommentVNode as F, defineAsyncComponent as Ce, normalizeProps as O, guardReactiveProps as z, createSlots as H, withDirectives as Ie, resolveDirective as He, computed as je, normalizeStyle as Qe } from "vue";
import P from "lodash/pick";
import Q from "lodash/mapKeys";
import de from "tiny-emitter";
import R from "lodash/omit";
import { ElOption as be, ElOptionGroup as Ge, ElSelect as Je, ElMessageBox as ve, ElButton as qe, ElPopconfirm as Ke, ElSpace as $, ElTooltip as Xe, ElRadioButton as et, ElRadio as tt, ElRadioGroup as st, ElIcon as it, ElImage as rt, ElCheckboxButton as at, ElCheckbox as lt, ElCheckboxGroup as ot, ElRow as nt, ElTable as ut, ElEmpty as dt, ElPagination as ht, ElLoading as Se, ElTableColumn as U, ElDialog as ct, ElDrawer as pt, ElDropdownItem as ft, ElDropdown as mt, ElDropdownMenu as yt, ElMessage as gt } from "element-plus";
import "element-plus/es/components/space/style/css";
import ae from "lodash/cloneDeep";
import "element-plus/es/components/row/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/option-group/style/css";
import G from "lodash/get";
import Mt from "dayjs";
import bt from "async-validator";
import "element-plus/es/components/tooltip/style/css";
import vt from "lodash/debounce";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/popconfirm/style/css";
import "element-plus/es/components/message-box/style/css";
import "element-plus/es/components/radio/style/css";
import "element-plus/es/components/radio-button/style/css";
import "element-plus/es/components/radio-group/style/css";
import { Plus as wt, Delete as Nt } from "@element-plus/icons-vue";
import Lt from "lodash/ceil";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/image/style/css";
import "element-plus/es/components/checkbox-button/style/css";
import "element-plus/es/components/checkbox/style/css";
import "element-plus/es/components/checkbox-group/style/css";
import _t from "lodash/isFunction";
import Ct from "lodash/upperCase";
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
import "element-plus/es/components/message/style/css";
const q = (e) => ["", null, void 0].includes(e), A = (e) => e, L = (e) => Object.prototype.toString.call(e).toLocaleLowerCase() === "[object object]", I = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function X(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
const It = (e, t) => {
  if (!e)
    return "";
  let s = e.toString();
  if (t === "cellphone")
    return s.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2");
  if (t === "identity")
    return s.replace(/^(.{4})(?:\d+)(.{4})$/, "$1**********$2");
  if (typeof t == "function")
    return t(e);
}, jt = () => Math.random().toString(36).slice(2), we = (e = {}) => {
  const t = {};
  for (const s in e)
    t[/^on[A-Z].*/.test(s) ? s : `on${ue(s)}`] = e[s];
  return t;
};
const Ve = {
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
        return this.multiple ? t : q(t[0]) && this.mergedHasAll ? this.valueOfAll : t[0];
      },
      set(e) {
        var r, a;
        if (!this.labelInValue || e === this.valueOfAll || q(e)) {
          this.$emit(
            "update:modelValue",
            e === this.valueOfAll ? null : e
          );
          return;
        }
        const t = X(e), i = ((a = (r = this.mergedOptions) == null ? void 0 : r.filter(
          (u) => t.includes(u.value)
        )) != null ? a : []).map((u) => {
          let o = P(u, ["label", "value"]);
          return L(this.labelInValue) && (o = Q(o, (d, l) => this.labelInValue[l] || l)), o;
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
      return c(
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
      }, u = ((d = r.children) == null ? void 0 : d.length) > 0, o = (h = (l = r.children) == null ? void 0 : l.map((p) => {
        const y = {
          props: {
            label: p.label,
            value: p.value,
            disabled: p.disabled
          }
        };
        return c(be, y);
      })) != null ? h : [];
      return c(u ? Ge : be, a, {
        default: () => o
      });
    }), t = Object.keys(this.$slots).map((r) => r === "default" ? this.$slots[r]() : this.$slots[r]()), s = [...e, ...t], i = m(n({
      teleported: !1
    }, this.$attrs), {
      multiple: this.multiple,
      modelValue: this.innerValue,
      "onUpdate:modelValue": (r) => this.innerValue = r,
      class: `versa-select ${this.$attrs.class || ""}`,
      ref: "versaSelectRef"
    });
    return c(Je, i, {
      default: () => s
    });
  }
}, St = {
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
    return c(
      "div",
      { class: "versa-form-item__label-wrap", style: s },
      {
        default: () => e
      }
    );
  }
}, Vt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmNjO29wYWNpdHk6MDt9LmJ7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTc1NiAtMTk4KSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTc1NiAxOTgpIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik05LjgyMyw4NS42MzFhNy42NzUsNy42NzUsMCwwLDEtNy42NjctNy42NjcuNzg0Ljc4NCwwLDEsMSwxLjU2NywwQTYuMSw2LjEsMCwxLDAsNi4zOTIsNzIuOTJhLjc4My43ODMsMCwxLDEtLjg4Mi0xLjI5Myw3LjY2Nyw3LjY2NywwLDEsMSw0LjMxMywxNFpNMS4wNzYsNzkuMzU4YS41NzUuNTc1LDAsMCwxLS4zMzQtLjEuNTg3LjU4NywwLDAsMS0uMTQ4LS44MTdsMS41MjYtMi4yYS41ODcuNTg3LDAsMSwxLC45NjUuNjY5bC0xLjUyNiwyLjJBLjU4Ny41ODcsMCwwLDEsMS4wNzYsNzkuMzU4Wk00LjgsNzguNjg0YS41NzUuNTc1LDAsMCwxLS4zMzQtLjFsLTIuMi0xLjUyNmEuNTg3LjU4NywwLDAsMSwuNjY5LS45NjVsMi4yLDEuNTI2QS41ODcuNTg3LDAsMCwxLDQuOCw3OC42ODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzU2LjYxNiAxMjkuNykiLz48L2c+PC9zdmc+", Dt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZhOGE4O29wYWNpdHk6MDt9LmJ7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTYyMyAtMTk3KSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYyMyAxOTcpIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0xNS44MTgsMTUuOGMtLjI4Mi4yODQtLjk3LjE3LS45Ny4xN2wtMy4wODEtMy4wODRhNy4yNCw3LjI0LDAsMSwxLDEuMTIzLTEuMTIzbDMuMDgxLDMuMDgxcy4xMjYuNjc3LS4xNTMuOTU2Wk0xMi45Niw3LjI0OGE1LjcsNS43LDAsMSwwLTUuNyw1LjcsNS43LDUuNywwLDAsMCw1LjctNS43WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYyNS42OTggMTk5LjAwNikiLz48L2c+PC9zdmc+", De = Symbol("PageCore"), Ae = Symbol("Provide"), ee = {
  reset: {
    actionType: "reset",
    actionName: "重置",
    actionIcon: Vt
  },
  search: {
    type: "primary",
    actionType: "search",
    actionName: "查询",
    actionIcon: Dt
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
}, At = {
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
      from: De,
      default: {}
    },
    formCore: {
      from: "VersaForm",
      default: () => ({})
    }
  },
  computed: {
    pageCore() {
      return _e(this.injectedPageCore);
    }
  },
  methods: {
    proxyPageCore(e) {
      return new Proxy(e != null && e.$ ? e : n(n({}, e), this.pageCore), {
        get: (t, s) => ["formCore", "pageCore"].includes(s) ? this[s] : I(this.pageCore, s) ? Reflect.get(this.pageCore, s) : Reflect.get(t, s),
        set(t, s, i) {
          return Reflect.set(t, s, i);
        }
      });
    }
  }
};
const Tt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0Ny45OTgiIHZpZXdCb3g9IjAgMCA0OCA0Ny45OTgiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOiNmZmJlMWI7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTA0Ljc3NSw0OC41NTlhMjQsMjQsMCwxLDAsMjQsMjRBMjQsMjQsMCwwLDAsMTA0Ljc3NSw0OC41NTlabTAsMzkuODc1YTMuMDU5LDMuMDU5LDAsMSwxLDMuMDU5LTMuMDU5QTMuMDU5LDMuMDU5LDAsMCwxLDEwNC43NzUsODguNDM0Wm0zLjA2LTEyLjk4MWEzLjA1OSwzLjA1OSwwLDAsMS02LjExOSwwVjYyLjRhMy4wNTksMy4wNTksMCwwLDEsNi4xMTksMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04MC43NzUgLTQ4LjU1OSkiLz48L3N2Zz4=", xt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MzkiIGhlaWdodD0iMTIuNzM2IiB2aWV3Qm94PSIwIDAgMTIuNzM5IDEyLjczNiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6IzY2NjtmaWxsLXJ1bGU6ZXZlbm9kZDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMS42MDguMjA4LDYuMzc1LDUuNDQxLDEuMTQyLjIwOEEuNjgxLjY4MSwwLDAsMCwuNjc1LjAyMWEuNjI3LjYyNywwLDAsMC0uNDU3LjIuNjI3LjYyNywwLDAsMC0uMi40NTcuNjgxLjY4MSwwLDAsMCwuMTg3LjQ2N2w1LjIzNiw1LjIzTC4yMDgsMTEuNjA4YS42MzcuNjM3LDAsMCwwLS4xNzcuNjQ0LjYuNiwwLDAsMCwuNDU3LjQ2Ny42NjcuNjY3LDAsMCwwLC42NTQtLjE3N0w2LjM3NSw3LjMwOWw1LjIzMyw1LjIzM2EuNjYxLjY2MSwwLDAsMCwuOTM0LS45MzRMNy4zMDksNi4zNzVsNS4yMzMtNS4yMzNBLjYzNy42MzcsMCwwLDAsMTIuNzE5LjVhLjYuNiwwLDAsMC0uNDY3LS40NjcuNjM3LjYzNywwLDAsMC0uNjQ0LjE3NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAwNiAtMC4wMDcpIi8+PC9zdmc+", Ot = (e) => ve(m(n({
  message: () => c("div", { class: "versa-message-box__container" }, [
    c("img", {
      src: xt,
      class: "versa-message-box__close",
      onClick: () => {
        ve.close();
      }
    }),
    c(
      "div",
      {
        class: "versa-message-box__content"
      },
      [
        c("img", {
          src: Tt,
          class: "versa-message-box__icon"
        }),
        c("div", { class: "versa-message-box__wrap" }, [
          q(e.title) ? void 0 : c(
            "div",
            {
              class: "versa-message-box__title"
            },
            e.title
          ),
          c("div", {
            class: "versa-message-box__message",
            innerHTML: e.message
          })
        ])
      ]
    )
  ]),
  showCancelButton: !0
}, R(e, ["title", "message", "type"])), {
  customClass: `versa-message-box ${e.customClass || ""}`
}));
const E = {
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
      return n({
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
      return vt(
        (e) => {
          if (!this.isMessageBox)
            return this.$emit("click", e, this.proxyPageCore(this));
          Ot(this.confirmProps).then(() => {
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
    const e = m(n({}, R(this.$attrs, [
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
    }), t = c(qe, e, {
      default: () => {
        var s, i;
        return [
          this.$attrs.actionIcon ? c("span", {
            class: "versa-button__icon",
            style: `background:url(${this.$attrs.actionIcon}) center center no-repeat;`
          }) : null,
          this.text || ((i = (s = this.$slots).default) == null ? void 0 : i.call(s))
        ];
      }
    });
    return this.isPopconfirm ? c(
      Ke,
      m(n({}, this.confirmProps), {
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
  for (const [i, r] of t)
    s[i] = r;
  return s;
}, zt = {
  components: {
    VersaButton: E,
    ElSpace: $
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
      return (t = (e = this.actions) == null ? void 0 : e.map((s) => L(s) && I(s, "actionName") && I(s, "actionType") || s != null && s.is ? m(n({}, s), {
        disabled: typeof s.disabled == "function" ? s.disabled.bind(this) : s.disabled
      }) : null).filter(Boolean)) != null ? t : [];
    }
  },
  methods: {
    /** 操作按钮回调函数 */
    onAction(e, t) {
      return _(this, null, function* () {
        var s;
        (s = e.action) == null || s.call(e, this.formValues, t, e);
      });
    }
  }
}, Pt = {
  key: 0,
  class: "versa-card__header"
}, Et = { class: "versa-card__title" }, kt = { class: "versa-card__action" }, Yt = { class: "versa-card__content" };
function Ft(e, t, s, i, r, a) {
  const u = M("VersaButton"), o = M("ElSpace");
  return f(), b("div", {
    class: J(["versa-card", { "versa-card--hasTitle": s.title }])
  }, [
    s.title ? (f(), b("div", Pt, [
      C("div", Et, x(s.title), 1),
      C("div", kt, [
        V(e.$slots, "headerRight", {}, () => [
          D(o, { size: 20 }, {
            default: g(() => [
              (f(!0), b(j, null, S(a.toolActions, (d) => (f(), b(j, null, [
                d.is ? (f(), w(k(d.is), v({
                  key: d.is,
                  ref_for: !0
                }, d, Y(d.on || {})), null, 16)) : (f(), w(u, v({
                  key: d.type,
                  size: "small",
                  ref_for: !0
                }, d, {
                  onClick: (l, h) => a.onAction(d, h)
                }), {
                  default: g(() => [
                    Z(x(d.actionName), 1)
                  ]),
                  _: 2
                }, 1040, ["onClick"]))
              ], 64))), 256))
            ]),
            _: 1
          })
        ])
      ])
    ])) : F("", !0),
    C("div", Yt, [
      V(e.$slots, "default")
    ])
  ], 2);
}
const te = /* @__PURE__ */ T(zt, [["render", Ft]]), Rt = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg4OTUyOTY3NzIwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MzkiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTg3NC4wNDU0NCAxNDkuOTU0NTZhMzAuNzIgMzAuNzIgMCAwIDEgMCA0My40NTg1NkwxOTMuNDEzMTIgODc0LjA0NTQ0YTMwLjcyIDMwLjcyIDAgMSAxLTQzLjQ1ODU2LTQzLjQ1ODU2TDgzMC41ODY4OCAxNDkuOTU0NTZhMzAuNzIgMzAuNzIgMCAwIDEgNDMuNDU4NTYgMHogbS0xNC4yOTUwNCAxNjUuODg4QzkzNi41NTA0IDM3My4zMDk0NCA5ODMuMDQgNDQ0LjY4MjI0IDk4My4wNCA1MTJjMCAxNTMuMzEzMjgtMjI4LjEwNjI0IDMwNy4yLTQ3MS4wNCAzMDcuMi00My45NTAwOCAwLTg3LjQ3MDA4LTQuNzUxMzYtMTI5Ljc2MTI4LTEzLjk0Njg4YTMwLjcyIDMwLjcyIDAgMSAxIDEzLjA2NjI0LTYwLjA0NzM2QzQzMy4zMzYzMiA3NTMuNDc5NjggNDcyLjQ3MzYgNzU3Ljc2IDUxMiA3NTcuNzZjMjEyLjk1MTA0IDAgNDA5LjYtMTMyLjY2OTQ0IDQwOS42LTI0NS43NiAwLTQ0Ljg5MjE2LTM1LjkwMTQ0LTEwMC4wMDM4NC05OC42NTIxNi0xNDYuOTY0NDhhMzAuNzIgMzAuNzIgMCAwIDEgMzYuODAyNTYtNDkuMTkyOTZ6TTUxMiAyMDQuOGM0NC4zMzkyIDAgODguMjY4OCA0Ljg1Mzc2IDEzMC45MDgxNiAxNC4yMTMxMmEzMC43MiAzMC43MiAwIDAgMS0xMy4xNjg2NCA2MC4wMDY0QTU0OS42NjI3MiA1NDkuNjYyNzIgMCAwIDAgNTEyIDI2Ni4yNEMyOTkuMDQ4OTYgMjY2LjI0IDEwMi40IDM5OC45MDk0NCAxMDIuNCA1MTJjMCA0NS4zODM2OCAzNi43MDAxNiAxMDEuMTkxNjggMTAwLjY1OTIgMTQ4LjQzOTA0YTMwLjcyIDMwLjcyIDAgMSAxLTM2LjUxNTg0IDQ5LjQxODI0Qzg4LjM5MTY4IDY1Mi4xMDM2OCA0MC45NiA1ODAuMDE0MDggNDAuOTYgNTEyYzAtMTUzLjMxMzI4IDIyOC4xMDYyNC0zMDcuMiA0NzEuMDQtMzA3LjJ6IG0xNzIuNDIxMTIgMjgzLjA5NTA0YTE3NC4wOCAxNzQuMDggMCAwIDEtMTk3LjAxNzYgMTk2LjQ2NDY0IDMwLjcyIDMwLjcyIDAgMSAxIDguNjAxNi02MC44MjU2IDExMi42NCAxMTIuNjQgMCAwIDAgMTI3LjU0OTQ0LTEyNy4xODA4IDMwLjcyIDMwLjcyIDAgMSAxIDYwLjg2NjU2LTguNDU4MjR6TTUxMiAzMzcuOTJjOC4zNTU4NCAwIDE2LjYyOTc2IDAuNTkzOTIgMjQuODIxNzYgMS43NjEyOGEzMC43MiAzMC43MiAwIDEgMS04LjcwNCA2MC44MjU2IDExMi42NCAxMTIuNjQgMCAwIDAtMTI3LjU2OTkyIDEyOC4wMjA0OCAzMC43MiAzMC43MiAwIDEgMS02MC43ODQ2NCA4LjkwODhBMTc0LjA4IDE3NC4wOCAwIDAgMSA1MTIgMzM3LjkyeiIgZmlsbD0iIzcwNzA3MCIgcC1pZD0iMTY0MCI+PC9wYXRoPjwvc3ZnPg==", $t = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg4OTUzMDE1MjgyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1NDUiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTUxMiAyMDQuOGMyNDIuOTMzNzYgMCA0NzEuMDQgMTUzLjg4NjcyIDQ3MS4wNCAzMDcuMlM3NTQuOTMzNzYgODE5LjIgNTEyIDgxOS4yIDQwLjk2IDY2NS4zMTMyOCA0MC45NiA1MTJzMjI4LjEwNjI0LTMwNy4yIDQ3MS4wNC0zMDcuMnogbTAgNjEuNDRDMjk5LjA0ODk2IDI2Ni4yNCAxMDIuNCAzOTguOTA5NDQgMTAyLjQgNTEyczE5Ni42NDg5NiAyNDUuNzYgNDA5LjYgMjQ1Ljc2IDQwOS42LTEzMi42Njk0NCA0MDkuNi0yNDUuNzYtMTk2LjY0ODk2LTI0NS43Ni00MDkuNi0yNDUuNzZ6IG0wIDcxLjY4YTE3NC4wOCAxNzQuMDggMCAxIDEgMCAzNDguMTYgMTc0LjA4IDE3NC4wOCAwIDAgMSAwLTM0OC4xNnogbTAgNjEuNDRhMTEyLjY0IDExMi42NCAwIDEgMCAwIDIyNS4yOCAxMTIuNjQgMTEyLjY0IDAgMCAwIDAtMjI1LjI4eiIgZmlsbD0iIzcwNzA3MCIgcC1pZD0iMTU0NiI+PC9wYXRoPjwvc3ZnPg==";
const Bt = {
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
      eyeClose: Rt,
      eyeOpen: $t,
      visilbe: !1
    };
  },
  computed: {
    renderValue() {
      return [null, void 0].includes(this.value) ? "" : this.visilbe ? this.value : It(this.value + "", this.sensitiveType);
    }
  },
  methods: {
    onToggle() {
      this.visilbe = !this.visilbe;
    }
  }
}, Ut = {
  key: 0,
  class: "versa-sensitive"
}, Wt = ["src"];
function Zt(e, t, s, i, r, a) {
  return a.renderValue ? (f(), b("span", Ut, [
    Z(x(a.renderValue) + " ", 1),
    C("img", {
      class: "versa-sensitive__icon",
      src: r.visilbe ? r.eyeClose : r.eyeOpen,
      onClick: t[0] || (t[0] = (...u) => a.onToggle && a.onToggle(...u))
    }, null, 8, Wt)
  ])) : F("", !0);
}
const Te = /* @__PURE__ */ T(Bt, [["render", Zt]]), Ht = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZjZGNkO29wYWNpdHk6MDt9LmJ7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE2NSAtODIpIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTY1IDgyKSIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNDAsNDhhOCw4LDAsMSwxLDgtOEE4LDgsMCwwLDEsNDAsNDhabTAtMS4wNjdBNi45MzMsNi45MzMsMCwxLDAsMzMuMDY3LDQwLDYuOTMzLDYuOTMzLDAsMCwwLDQwLDQ2LjkzM1ptLjY2Ny01LjQzOHYuMzc0SDM5LjMzM3YtLjM3NGEzLjQsMy40LDAsMCwxLC45OC0yLjI3OGMuNDQxLS40Ny40MjktLjQ1Ny41NTUtLjYwNmExLjUyNiwxLjUyNiwwLDAsMCwuNDY1LTEuMDEsMS4zMzMsMS4zMzMsMCwwLDAtMi42NjcsMEgzNy4zMzNhMi42NjcsMi42NjcsMCwxLDEsNS4zMzMsMCwyLjc3OSwyLjc3OSwwLDAsMS0uNzc4LDEuODY4Yy0uMDg3LjEtLjE4MS4yMS0uMy4zMzUtLjA0NS4wNDgtLjA5MS4xLS4xNTMuMTYzbC0uMTUzLjE2M0EyLjExOCwyLjExOCwwLDAsMCw0MC42NjcsNDEuNDk1Wm0tLjEsMS45MzhhLjguOCwwLDAsMSwwLDEuMTM3LjgwOC44MDgsMCwwLDEtMS4xMjksMCwuOC44LDAsMCwxLDAtMS4xMzcuOC44LDAsMCwxLDEuMTI5LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTM1IDUyKSIvPjwvZz48L3N2Zz4=", Ne = {
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
      return typeof this.labelType == "string" ? m(n({}, e), {
        type: this.labelType
      }) : L(this.labelType) ? n(n({}, e), this.labelType) : e;
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
      return /.*date.*/.test(t) ? X(this.fieldValue).map((i) => q(i) ? null : typeof e == "string" ? Mt(i).format(e) : i).filter(Boolean).join(" ~ ") : typeof e == "function" ? e(this.fieldValue, this.optionConfig) : this.fieldValue;
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
    },
    tooltipOptions() {
      return this.tooltip ? n({
        placement: "top"
      }, typeof this.tooltip == "string" ? {
        content: this.tooltip
      } : this.tooltip) : null;
    }
  },
  created() {
    this.$emitter = new de(), this.$emitter.on("addField", (e) => {
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
          const o = `on${ue(u)}`;
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
        }), o[this.prop] = s, new bt(o).validate(
          { [this.prop]: this.fieldValue },
          { firstFields: !0 },
          (l, h) => {
            var p;
            this.validateState = l ? "error" : "success", this.validateMessage = l ? l[0].message : "", l && (i = !1, u[this.prop].push(...h[this.prop])), typeof t == "function" && ++r === a && t(i, i ? {} : u), (p = this.VersaForm) == null || p.$emit(
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
    var u, o, d, l, h, p, y, N, B, K, fe, me, ye;
    const e = [];
    if (this.interceptPreview) {
      const { sensitiveType: ie, sensitive: Fe } = this.optionConfig;
      e.push(
        Fe ? c(Te, {
          value: this.previewText,
          sensitiveType: typeof ie == "function" ? ie(this.omsForm.model) : ie
        }) : (d = (o = (u = this.previewText) == null ? void 0 : u.toString) == null ? void 0 : o.call(u)) != null ? d : this.previewText
      );
    } else
      e.push(...(h = (l = this.$slots).default) == null ? void 0 : h.call(l)), this.status !== "preview" && this.proxyEvent(e);
    const t = this.validateState === "error" && this.showMessage && this.VersaForm.showMessage, s = this.labelConfig.type === "card", i = !!this.tips && !t && !s && this.status !== "preview";
    t && e.push(
      c("transition", { name: "el-zoom-in-top" }, [
        (K = (y = (p = this.$slots).error) == null ? void 0 : y.call(p, {
          error: this.validateMessage
        })) != null ? K : c(
          "div",
          {
            class: [
              "versa-form-item__error",
              {
                "versa-form-item__error--inline": typeof this.inlineMessage == "boolean" ? this.inlineMessage : (B = (N = this.VersaForm) == null ? void 0 : N.inlineMessage) != null ? B : !1
              }
            ]
          },
          [this.validateMessage]
        )
      ])
    ), this.hasToolTip && (this.tooltipOptions ? e.push(
      c(
        Xe,
        n({}, this.tooltipOptions),
        {
          default: () => c("img", {
            src: Ht,
            class: "versa-form-item__tooltip"
          })
        }
      )
    ) : e.push(
      c("span", {
        class: "versa-form-item__tooltip"
      })
    ));
    const r = [
      c(
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
          style: n({}, this.$attrs.contentStyle)
        },
        {
          default: () => e
        }
      )
    ];
    s || r.unshift(
      c(
        St,
        {
          isAutoWidth: this.labelStyle.width === "auto",
          updateAll: this.VersaForm.labelWidth === "auto"
        },
        {
          default: () => [
            this.label || this.$slots.label ? c(
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
    const a = c(
      s ? te : "div",
      m(n({
        ref: "VersaFormItem",
        class: [
          "versa-form-item",
          `versa-form-item--${this.status}`,
          {
            "versa-form-item--feedback": (fe = this.VersaForm) == null ? void 0 : fe.statusIcon,
            "is-error": this.validateState === "error",
            "is-validating": this.validateState === "validating",
            "is-success": this.validateState === "success",
            "is-required": this.isRequired || this.required,
            "is-no-asterisk": (me = this.VersaForm) == null ? void 0 : me.hideRequiredAsterisk,
            [`versa-form-item--${this.sizeClass}`]: !!this.sizeClass,
            "versa-form-item--card": s,
            "versa-form-item--mb": s
          },
          this.$attrs.class
        ]
      }, s ? m(n({}, this.labelConfig), {
        title: this.label
      }) : {}), {
        style: this.$attrs.itemStyle
      }),
      {
        default: () => [r]
      }
    );
    return !s && this.tips ? c("div", {}, [
      a,
      i ? c("div", {
        class: [
          "versa-form-item__tips",
          {
            "versa-form-item--mb": i
          }
        ],
        style: {
          "margin-left": this.labelStyle.width === "auto" ? (ye = this.VersaForm) == null ? void 0 : ye.autoLabelWidth : this.labelStyle.width
        },
        innerHTML: this.tips
      }) : null
    ]) : a;
  }
}, xe = {
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
        let s = P(t, ["label", "value"]);
        L(this.labelInValue) && (s = Q(
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
      const t = m(n({}, e), { border: this.border });
      return delete t.label, delete t.value, t;
    }
  },
  render() {
    if (this.isPreview)
      return c(
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
      const i = m(n({}, this.bindProps(s)), {
        value: s.value
      });
      return c(this.button ? et : tt, i, {
        default: () => s.label
      });
    }), t = m(n({}, this.$attrs), {
      modelValue: this.innerValue,
      // 拦截el-select的input事件， 外部v-model走自定义逻辑
      "onUpdate:modelValue": (s) => this.innerValue = s,
      class: "versa-radio-group",
      ref: "versaRadioGroup"
    });
    return c(st, t, {
      default: () => e
    });
  }
}, Oe = {
  inject: {
    injectedProvide: {
      from: Ae,
      default: {}
    }
  },
  computed: {
    globalConfig() {
      return _e(this.injectedProvide);
    }
  }
};
const Qt = {
  name: "versa-image-upload",
  components: { Plus: wt, Delete: Nt, ElIcon: it, ElImage: rt },
  mixins: [Oe],
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
      return _(this, null, function* () {
        var i, r, a, u, o, d, l, h, p;
        const t = (r = (i = e.target) == null ? void 0 : i.files) != null ? r : [];
        if (t.length === 0 || t.length > 1)
          return;
        if (t[0].size > this.maxSize) {
          (u = (a = this.globalConfig) == null ? void 0 : a.toastError) == null || u.call(
            a,
            `最大支持${Lt(this.maxSize / 1e3, 2)}kb大小的文件`
          );
          return;
        }
        if (!((o = this.accept) == null ? void 0 : o.split(";").some((y) => t[0].name.endsWith(y)))) {
          (l = (d = this.globalConfig) == null ? void 0 : d.toastError) == null || l.call(d, `仅支持${this.accept}格式的文件`);
          return;
        }
        try {
          const y = (p = yield (h = this.onUpload) == null ? void 0 : h.call(this, t[0])) != null ? p : t[0];
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
}, Gt = { class: "versa-image-upload" }, Jt = {
  key: 1,
  class: "versa-image-upload__preview"
}, qt = /* @__PURE__ */ C("div", { class: "versa-image-upload__preview--mask" }, null, -1), Kt = ["accept"];
function Xt(e, t, s, i, r, a) {
  const u = M("Plus"), o = M("ElIcon"), d = M("ElImage"), l = M("Delete");
  return f(), b("div", Gt, [
    r.previewSrc ? (f(), b("div", Jt, [
      D(d, v({
        class: "versa-image-upload__preview--pic",
        fit: "cover",
        src: r.previewSrc,
        "zoom-rate": 1.2,
        "max-scale": 7,
        "min-scale": 0.2
      }, e.$attrs, { "preview-src-list": a.previewSrcList }), null, 16, ["src", "preview-src-list"]),
      s.status === "edit" ? (f(), b(j, { key: 0 }, [
        qt,
        D(o, {
          class: "versa-image-upload__preview--remove",
          onClick: a.onRemove
        }, {
          default: g(() => [
            D(l)
          ]),
          _: 1
        }, 8, ["onClick"])
      ], 64)) : F("", !0)
    ])) : (f(), w(o, {
      key: 0,
      class: "versa-image-upload__icon",
      onClick: a.onClickUpload
    }, {
      default: g(() => [
        D(u)
      ]),
      _: 1
    }, 8, ["onClick"])),
    C("input", {
      ref: "inputRef",
      style: { opacity: "0", width: "1px", height: "1px", left: "-999px", position: "fixed", "z-index": "-999" },
      type: "file",
      accept: s.accept,
      onChange: t[0] || (t[0] = (...h) => a.handleChange && a.handleChange(...h))
    }, null, 40, Kt)
  ]);
}
const ze = /* @__PURE__ */ T(Qt, [["render", Xt]]), Pe = {
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
          let u = P(a, ["label", "value"]);
          return L(this.labelInValue) && (u = Q(u, (o, d) => this.labelInValue[d] || d)), u;
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
      const t = m(n({}, e), { border: this.border });
      return delete t.label, delete t.value, delete t.checked, t;
    }
  },
  render() {
    if (this.isPreview)
      return c(
        "div",
        {
          ref: "renderText",
          class: "versa-form__item--preview"
        },
        { default: () => this.previewText }
      );
    const e = this.mergedOptions.map((s) => {
      const i = m(n({}, this.bindProps(s)), {
        value: s.value
      });
      return c(this.button ? at : lt, i, {
        default: () => s.label
      });
    }), t = m(n({}, this.$attrs), {
      modelValue: this.innerValue,
      "onUpdate:modelValue": (s) => this.innerValue = s,
      class: `versa-checkbox-group ${this.$attrs.class || ""}`,
      ref: "versaCheckboxGroup"
    });
    return c(ot, t, {
      default: () => e
    });
  }
}, le = {
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
}, oe = {
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
}, ne = {
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
}, ce = {
  methods: {
    dispatch(e, t, ...s) {
      var a;
      for (var i = this.$parent || this.$root, r = i.$options.name; i && (!r || r !== e); )
        i = i.$parent, i && (r = i.$options.name);
      i && ((a = i.$emitter) == null || a.emit(t, ...s));
    }
  }
};
const Le = {
  "versa-select": "versa-select",
  "versa-checkbox-group": "versa-checkbox-group",
  "versa-radio-group": "versa-radio-group",
  "versa-form": "versa-form",
  "versa-repeater": "versa-repeater",
  "versa-image-upload": "versa-image-upload",
  "versa-repeater": "versa-repeater"
}, es = {
  name: "versa-form",
  components: {
    ElRow: nt,
    ElSpace: $,
    VersaSelect: Ve,
    VersaFormItem: Ne,
    VersaRadioGroup: xe,
    VersaCheckboxGroup: Pe,
    VersaImageUpload: ze,
    VersaRepeater: Ce(() => Promise.resolve().then(() => Ds))
  },
  mixins: [le, ce],
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
      }) : t.when === void 0 ? !0 : t.when).map((t) => m(n({}, t), {
        element: Le[t.element] || t.element,
        useCustomPreview: typeof t.useCustomPreview == "boolean" ? t.useCustomPreview : !!Le[t.element],
        rules: typeof t.rules == "function" ? t.rules(this.model, t, { actionType: this.actionType }) : t.rules,
        colSpan: t.single ? 24 : ~~(24 / this.columns),
        status: typeof t.status == "function" ? t.status(this.model, t, {
          actionType: this.actionType,
          globalStatus: this.globalStatus
        }) : t.status || this.innerStatusMap[t.prop] || this.globalStatus
      }));
    },
    /** 是否需要处理tooltip提示占位 */
    hasToolTip() {
      return this.deployOptions.some((e) => !!e.tooltip);
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
    this.$emitter = new de(), this.$emitter.on("addField", (t) => {
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
      const t = L(e[0]) ? e[0] : { [e[0]]: e[1] };
      for (const s in t)
        I(t, s) && (this.innerStatusMap[s] = t[s]);
    },
    /** 获取表单状态 */
    getStatus(e) {
      var t;
      if (typeof e == "string")
        return (t = this.deployOptions.find((s) => s.prop === e)) == null ? void 0 : t.status;
      if (Array.isArray(e))
        return this.deployOptions.reduce((s, i) => e.includes(i.prop) ? m(n({}, s), { [i.prop]: i.status }) : s, {});
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
        t[s.prop] = ae(this.getInitValueByKey(s.prop, t, s));
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
      const a = I(i, e);
      return a && typeof r.initValue != "undefined" ? r.initValue : a && typeof r.initValue == "undefined" ? i[e] : r.initValue;
    },
    /** item组件props */
    bindFormItemProps(e) {
      const t = Object.keys(Ne.props).reduce((s, i) => m(n({}, s), {
        [i]: e[i]
      }), {});
      return n(m(n({}, t), {
        optionConfig: n({}, e)
      }), e.formItemProps || {});
    },
    // 绑定属性
    bindProps(e) {
      const t = {
        disabled: e.status === "disabled"
      };
      return e.element === "el-date-picker" && Object.assign(t, n({
        placeholder: `请选择${e.label || ""}`,
        "start-placeholder": "开始日期",
        "range-separator": "至",
        "end-placeholder": "结束日期"
      }, At[e.type || "date"])), typeof e.element == "string" && /select/i.test(e.element) && Object.assign(t, {
        placeholder: `请选择${e.label || ""}`
      }), typeof e.element == "string" && /input/i.test(e.element) && Object.assign(t, {
        placeholder: `请输入${e.label || ""}`
      }), Object.assign(t, m(n({}, e), {
        class: `versa-form-item__element ${e.class || ""}`
      })), R(t, [
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
function ts(e, t, s, i, r, a) {
  const u = M("VersaFormItem"), o = M("ElSpace"), d = M("ElRow");
  return f(), w(k(s.component), {
    class: J([
      "versa-form",
      {
        "versa-form--inline": s.inline,
        [`versa-form--label-${e.labelPosition}`]: !!e.labelPosition
      }
    ])
  }, {
    default: g(() => [
      a.layout ? (f(), w(d, {
        key: 0,
        gutter: 20
      }, {
        default: g(() => [
          (f(!0), b(j, null, S(a.deployOptions, (l) => (f(), w(o, {
            key: l.prop,
            span: l.colSpan
          }, {
            default: g(() => [
              D(u, v({ ref_for: !0 }, a.bindFormItemProps(l), {
                hasToolTip: a.hasToolTip,
                prop: l.prop,
                label: l.label || "",
                rules: l.rules,
                status: l.status
              }), {
                default: g(() => [
                  l.slotName ? V(e.$slots, l.slotName, v({
                    key: 0,
                    data: a.model,
                    ref_for: !0
                  }, l)) : (f(), w(k(l.element), v({ key: 1 }, Y(a.bindEvent(l)), { ref_for: !0 }, a.bindProps(l), {
                    modelValue: a.model[l.prop],
                    "onUpdate:modelValue": (h) => a.model[l.prop] = h
                  }), null, 16, ["modelValue", "onUpdate:modelValue"]))
                ]),
                _: 2
              }, 1040, ["hasToolTip", "prop", "label", "rules", "status"])
            ]),
            _: 2
          }, 1032, ["span"]))), 128))
        ]),
        _: 3
      })) : (f(!0), b(j, { key: 1 }, S(a.deployOptions, (l) => (f(), w(u, v({ ref_for: !0 }, a.bindFormItemProps(l), {
        hasToolTip: a.hasToolTip,
        key: l.prop,
        prop: l.prop,
        label: l.label || "",
        rules: l.rules,
        status: l.status
      }), {
        default: g(() => [
          l.slotName ? V(e.$slots, l.slotName, v({
            key: 0,
            data: a.model,
            ref_for: !0
          }, l)) : (f(), w(k(l.element), v({ key: 1 }, Y(a.bindEvent(l)), { ref_for: !0 }, a.bindProps(l), {
            modelValue: a.model[l.prop],
            "onUpdate:modelValue": (h) => a.model[l.prop] = h
          }), null, 16, ["modelValue", "onUpdate:modelValue"]))
        ]),
        _: 2
      }, 1040, ["hasToolTip", "prop", "label", "rules", "status"]))), 128)),
      V(e.$slots, "footer", O(z({ model: a.model, actionType: e.actionType })))
    ]),
    _: 3
  }, 8, ["class"]);
}
const se = /* @__PURE__ */ T(es, [["render", ts]]), ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: se
}, Symbol.toStringTag, { value: "Module" }));
const is = P(ee, ["reset", "create", "search"]), rs = {
  name: "versa-filter",
  components: {
    VersaForm: se,
    VersaCard: te,
    VersaButton: E,
    ElSpace: $
  },
  mixins: [oe, ce, he],
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
      return typeof this.actions == "function" && (e = this.actions(this.formValues)), e == null ? void 0 : e.map((t) => typeof t == "string" ? is[t] : L(t) && I(t, "actionName") && I(t, "actionType") || t != null && t.is ? m(n({}, t), {
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
      return _(this, null, function* () {
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
              R(e, ["actionType", "actionName", "action", "usePageModal"])
            );
            break;
          default:
            e.validate && (yield (s = this.$refs.formRef) == null ? void 0 : s.validate()), (i = e.action) == null || i.call(e, this.formValues, t, n({}, e));
            break;
        }
      });
    }
  }
}, as = { class: "versa-filter__action" }, ls = { class: "versa-filter__footer" };
function os(e, t, s, i, r, a) {
  const u = M("VersaButton"), o = M("ElSpace"), d = M("VersaForm"), l = M("VersaCard");
  return f(), w(l, {
    class: J([
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
        modelValue: r.formValues,
        "onUpdate:modelValue": t[0] || (t[0] = (h) => r.formValues = h),
        options: s.options,
        defaultValues: e.defaultFilters,
        "label-width": e.labelWidth,
        labelSuffix: e.labelSuffix,
        onOnMounted: a.onMounted
      }, H({
        footer: g(() => [
          C("section", as, [
            D(o, {
              class: "versa-filter__action--wrap",
              size: 20
            }, {
              default: g(() => [
                (f(!0), b(j, null, S(a.filterActions, (h) => (f(), b(j, null, [
                  h.is ? (f(), w(k(h.is), v({
                    key: 0,
                    ref_for: !0
                  }, h, Y(h.on || {})), null, 16)) : (f(), w(u, v({
                    key: h.actionType,
                    type: h.type,
                    ref_for: !0
                  }, h, {
                    onClick: (p, y) => a.onAction(h, y)
                  }), {
                    default: g(() => [
                      Z(x(h.actionName), 1)
                    ]),
                    _: 2
                  }, 1040, ["type", "onClick"]))
                ], 64))), 256)),
                V(e.$slots, "btns", O(z(e.proxyPageCore({ formValues: r.formValues }))))
              ]),
              _: 3
            })
          ])
        ]),
        _: 2
      }, [
        S(Object.keys(e.$slots).filter(
          (h) => h !== "footer"
        ), (h) => ({
          name: h,
          fn: g((p) => [
            V(e.$slots, h, O(z(p)))
          ])
        }))
      ]), 1032, ["modelValue", "options", "defaultValues", "label-width", "labelSuffix", "onOnMounted"]),
      C("div", ls, [
        V(e.$slots, "footer")
      ])
    ]),
    _: 3
  }, 8, ["class", "title"]);
}
const Ee = /* @__PURE__ */ T(rs, [["render", os]]);
const ns = P(ee, ["remove", "edit", "detail"]), ke = {
  name: "versa-table",
  mixins: [ne, ce, he, Oe],
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
      return (e = this.toolOptions) == null ? void 0 : e.map((t) => L(t) && I(t, "actionName") && I(t, "actionType") || t != null && t.is ? m(n({}, t), {
        on: we(t.on),
        disabled: typeof t.disabled == "function" ? t.disabled.bind(this, this.multipleSelection) : t.disabled
      }) : null).filter(Boolean);
    },
    renderOptions() {
      var e, t;
      return (t = (e = this.options) == null ? void 0 : e.map((s) => {
        const i = n({}, s);
        return i.formatter || (i.formatter = (r) => {
          var a, u, o;
          return q(r[i.prop]) ? i.filterNull || ((a = this.fillNull) != null ? a : "") : L(i.mapSource) ? i.mapSource[r[i.prop]] : Array.isArray(i.mapSource) ? (o = (u = i.mapSource.find(
            (d) => d.value === r[i.prop]
          )) == null ? void 0 : u.label) != null ? o : "" : r[i.prop];
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
      return _(this, null, function* () {
        var e, t;
        try {
          const s = this.formatFilter(n(n({}, R(this.innerParams, ["total"])), this.queryParams));
          this.loading = !0;
          let i;
          if (_t(this.api))
            i = yield this.api(s);
          else {
            const r = Ct(this.apiMethod) === "GET";
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
      const i = R(e, [
        "actionType",
        "actionName",
        "actionIcon",
        "action",
        "usePageModal"
      ]);
      if (e.usePageModal) {
        this.dispatch("versa-page", "VersaFormPageUsePageModal", t, m(n({}, i), {
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
          (r = e.action) == null || r.call(e, t, s, m(n({}, e), {
            clearRowSelection: this.clearRowSelection
          }));
          break;
      }
    },
    /** 操作栏编辑 */
    filterActions(e, ...t) {
      let s = typeof e == "string" ? e.split(",") : e;
      return typeof e == "function" && (s = e(...t)), s == null ? void 0 : s.map((i) => typeof i == "string" ? ns[i] : L(i) && I(i, "actionName") && I(i, "actionType") || i != null && i.is ? m(n({}, i), {
        on: we(i.on),
        disabled: typeof i.disabled == "function" ? i.disabled.bind(this, t[0]) : i.disabled
      }) : null).filter(Boolean);
    }
  },
  render() {
    const e = (t) => t.map((s) => {
      var i;
      return s.slotName ? c(
        U,
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
      ) : s.type === "selection" ? c(U, n({
        "reserve-selection": !0
      }, s)) : s.actions ? c(U, s, {
        default: ({ row: r, column: a, $index: u }) => c(
          $,
          {},
          {
            default: () => this.filterActions(
              s.actions,
              r,
              a,
              u
            ).map((o) => o.is ? c(M(o.is), n(n({}, o), o.on)) : c(
              E,
              m(n({
                type: "primary",
                link: !0
              }, o), {
                onClick: (d, l) => this.onAction(o, r, l)
              }),
              { default: () => o.actionName }
            ))
          }
        )
      }) : ((i = s.children) == null ? void 0 : i.length) > 0 ? c(U, ...R(s, ["children"]), {
        default: () => e(s.children)
      }) : s.sensitive ? c(U, s, {
        default: ({ row: r, column: a }) => c(Te, {
          value: r[a.property],
          sensitiveType: typeof s.sensitiveType == "function" ? s.sensitiveType(r) : s.sensitiveType
        })
      }) : c(U, n({
        "show-overflow-tooltip": !0
      }, s));
    });
    return Ie(
      c(
        te,
        {
          class: "versa-table",
          title: this.headline
        },
        {
          headerRight: () => [
            c(
              $,
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
                    ...this.tools.map((i) => i.is ? c(M(i.is), n(n({}, i), i.on)) : c(
                      E,
                      m(n({}, i), {
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
              c(
                ut,
                m(n({
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
                    )) != null ? a : c(dt, { description: "暂无数据" });
                  },
                  default: () => e(this.renderOptions)
                }
              ),
              this.needPagination && this.innerParams.total > 0 ? c(ht, m(n({
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
      [[Se.directive, this.loading]]
    );
  }
};
const us = {
  cancel: {
    actionType: "cancel",
    actionName: "取消"
  },
  confirm: {
    actionType: "confirm",
    actionName: "确认",
    type: "primary"
  }
}, ds = {
  name: "versa-modal",
  components: {
    VersaForm: se,
    VersaButton: E,
    ElSpace: $,
    ElDialog: ct,
    ElDrawer: pt
  },
  directives: {
    loading: Se.directive
  },
  mixins: [le],
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
      return Object.keys(le.props).reduce(
        (e, t) => (typeof this[t] != "undefined" && Object.assign(e, {
          [t]: this[t]
        }), e),
        n({}, this.formProps)
      );
    },
    /** 弹窗操作栏 */
    dialogActions() {
      let e = typeof this.actions == "string" ? this.actions.split(",") : this.actions;
      return typeof this.actions == "function" && (e = this.actions(this.formValues)), e == null ? void 0 : e.map((t) => typeof t == "string" ? us[t] : L(t) && I(t, "actionName") && I(t, "actionType") || t != null && t.is ? m(n({}, t), {
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
      return _(this, null, function* () {
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
      return _(this, null, function* () {
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
            (i = e.action) == null || i.call(e, this.formValues, t, m(n({}, e), {
              close: this.close
            }));
            break;
        }
      });
    },
    /** 点击确认 */
    onConfirm(e) {
      return _(this, null, function* () {
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
function hs(e, t, s, i, r, a) {
  const u = M("VersaForm"), o = M("VersaButton"), d = M("ElSpace"), l = He("loading");
  return a.dialogVisible ? (f(), w(k(s.panelType), v({
    key: 0,
    "destroy-on-close": "",
    modelValue: a.dialogVisible,
    "onUpdate:modelValue": t[1] || (t[1] = (h) => a.dialogVisible = h)
  }, a.undefProps, { "before-close": a.beforeClose }), {
    default: g(() => [
      Ie((f(), w(u, v(a.mergedFormProps, {
        class: "versa-modal__form",
        ref: "formRef",
        autoInitValue: !1,
        modelValue: r.formValues,
        "onUpdate:modelValue": t[0] || (t[0] = (h) => r.formValues = h)
      }), H({
        footer: g((h) => [
          V(e.$slots, "modalFooter", O(z(m(n({}, h), { loading: r.loading, refresh: a.initForm }))))
        ]),
        _: 2
      }, [
        S(Object.keys(e.$slots).filter(
          (h) => h !== "footer"
        ), (h) => ({
          name: h,
          fn: g((p) => [
            V(e.$slots, h, O(z(p)))
          ])
        }))
      ]), 1040, ["modelValue"])), [
        [l, r.loading]
      ]),
      a.dialogActions.length ? (f(), w(d, {
        key: 0,
        size: 20,
        class: "versa-modal__footer"
      }, {
        default: g(() => [
          (f(!0), b(j, null, S(a.dialogActions, (h) => (f(), b(j, {
            key: h.actionType
          }, [
            h.is ? (f(), w(k(h.is), v({
              key: 0,
              ref_for: !0
            }, h, Y(h.on || {})), null, 16)) : F("", !0),
            D(o, v({ ref_for: !0 }, h, {
              onClick: (p, y) => a.onAction(h, y)
            }), {
              default: g(() => [
                Z(x(h.actionName), 1)
              ]),
              _: 2
            }, 1040, ["onClick"])
          ], 64))), 128))
        ]),
        _: 1
      })) : F("", !0)
    ]),
    _: 3
  }, 16, ["modelValue", "before-close"])) : F("", !0);
}
const pe = /* @__PURE__ */ T(ds, [["render", hs]]);
const cs = {
  components: {
    VersaFilter: Ee,
    VersaTable: ke,
    VersaModal: pe
  },
  name: "versa-page",
  provide() {
    return {
      [De]: je(() => ({
        queryParams: this.queryParams,
        filterValues: this.filterValues,
        selectionValues: this.selectionValues
      }))
    };
  },
  mixins: [ne, oe],
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
      const e = Object.keys(ne.props).reduce(
        (t, s) => m(n({}, t), {
          [s]: this[s]
        }),
        {}
      );
      return e.formatFilter = (t) => {
        const s = n({}, t);
        if (L(this.keyMap))
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
      return Object.keys(oe.props).reduce(
        (t, s) => m(n({}, t), {
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
      return Q(
        P(this.$attrs, []),
        (e, t) => t.replace("onOn", "on")
      );
    },
    /** table事件透传 */
    tableListeners() {
      return Q(
        P(this.$attrs, []),
        (e, t) => t.replace("onOn", "on")
      );
    }
  },
  created() {
    this.$emitter = new de(), this.$emitter.on("VersaFormPageOnCreate", (e, t = {}) => {
      this.onAction("create", n({ defaultValues: {} }, t));
    }), this.$emitter.on(
      "VersaFormPageOnUpdate",
      (e = {}, t = {}) => {
        this.onAction("edit", n({ defaultValues: e }, t));
      }
    ), this.$emitter.on(
      "VersaFormPageOnDetail",
      (...s) => _(this, [...s], function* (e = {}, t = {}) {
        this.onAction("detail", n({ defaultValues: e }, t));
      })
    ), this.$emitter.on(
      "VersaFormPageUsePageModal",
      (...s) => _(this, [...s], function* (e = {}, t = {}) {
        this.onAction("usePageModal", n({ defaultValues: e }, t));
      })
    ), this.$emitter.on("VersaFormPageOnRemove", (e) => _(this, null, function* () {
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
        onOk: (r) => _(this, null, function* () {
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
}, ps = { class: "versa-page" };
function fs(e, t, s, i, r, a) {
  const u = M("VersaFilter"), o = M("VersaTable"), d = M("VersaModal");
  return f(), b("div", ps, [
    D(u, v({ ref: "filterRef" }, a.filterProps, {
      options: s.filterOptions,
      defaultFilters: e.defaultFilters,
      onOnReset: a.onReset,
      onOnSearch: a.onSearch,
      onOnMounted: a.onMounted,
      onOnFilterChange: a.onFilterChange
    }, Y(a.filterListeners)), {
      btns: g((l) => [
        V(e.$slots, "btns", O(z(l)))
      ]),
      _: 3
    }, 16, ["options", "defaultFilters", "onOnReset", "onOnSearch", "onOnMounted", "onOnFilterChange"]),
    D(o, v(a.tableProps, {
      autoLoad: !1,
      options: s.tableOptions,
      queryParams: r.queryParams,
      onOnSelectChange: a.onSelectChange
    }, Y(a.tableListeners)), H({ _: 2 }, [
      S(Object.keys(e.$slots), (l) => ({
        name: l,
        fn: g((h) => [
          V(e.$slots, l, O(z(h)))
        ])
      }))
    ]), 1040, ["options", "queryParams", "onOnSelectChange"]),
    D(d, v(a.modalProps, {
      visible: r.panelVisible,
      "onUpdate:visible": t[0] || (t[0] = (l) => r.panelVisible = l)
    }), H({ _: 2 }, [
      S(Object.keys(e.$slots), (l) => ({
        name: l,
        fn: g((h) => [
          V(e.$slots, l, O(z(h)))
        ])
      }))
    ]), 1040, ["visible"])
  ]);
}
const ms = /* @__PURE__ */ T(cs, [["render", fs]]);
const ys = {
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
      const t = (r = this.mergedOptions) == null ? void 0 : r.find((a) => e === a.value), s = P(t, ["label", "value"]), i = Q(
        s,
        (a, u) => this.labelInValue[u] || u
      );
      this.$emit("command", i, this);
    }
  },
  render() {
    var i, r;
    if ((L(this.text) && !this.text.text || !this.text) && !this.$slots.default)
      return null;
    const e = m(n({
      placement: "bottom"
    }, this.$attrs), {
      onCommand: this.onAction,
      class: "versa-dropdown",
      ref: "versaDropdown"
    }), t = this.mergedOptions.map((a) => {
      const u = m(n({}, this.bindProps(a)), {
        command: a.value,
        class: "versa-dropdown-item"
      });
      return c(ft, u, {
        default: () => a.label
      });
    }), s = [];
    if (this.$attrs["split-button"])
      s.push(L(this.text) ? this.text.text : this.text);
    else if (typeof this.text == "string") {
      const a = [this.text];
      this.icon && a.push(c("i", { class: this.icon })), s.push(
        c(
          E,
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
      L(this.text) ? s.push(
        c(
          E,
          m(n({
            type: "primary",
            link: !0
          }, this.text), {
            disabled: this.$attrs.disabled,
            loading: this.isLoading
          }),
          { default: () => this.text.text }
        )
      ) : s.push((r = (i = this.$slots).default) == null ? void 0 : r.call(i));
    return c(mt, e, {
      default: () => s,
      dropdown: () => c(
        yt,
        { slot: "dropdown" },
        { default: () => t }
      )
    });
  }
}, gs = {
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
}, Ms = {
  ref: "measureRef",
  style: { padding: "0", border: "0", height: "0" }
};
function bs(e, t, s, i, r, a) {
  return f(), b("td", Ms, null, 512);
}
const vs = /* @__PURE__ */ T(gs, [["render", bs]]);
class re {
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
const ws = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMmY4OGZmO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTEzNi44NjMsMTI5Ljg2NGgtNS4xMzF2LTUuMTMxYS45MzQuOTM0LDAsMSwwLTEuODY4LDB2NS4xMzJoLTUuMTMxYS45MzQuOTM0LDAsMSwwLDAsMS44NjhoNS4xMzJ2NS4xMzJhLjkzNC45MzQsMCwxLDAsMS44NjgsMHYtNS4xMzRoNS4xMzJhLjkzNC45MzQsMCwxLDAsMC0xLjg2OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjMuOCAtMTIzLjgpIi8+PC9zdmc+";
const W = P(ee, [
  "save",
  "cancel",
  "edit",
  "up",
  "down",
  "remove"
]), Ns = {
  name: "versa-repeater",
  inheritAttrs: !1,
  components: {
    VersaForm: Ce(() => Promise.resolve().then(() => ss)),
    VersaButton: E,
    VersaModal: pe,
    VersaMeasureCell: vs,
    ElSpace: $
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
      IconPlus: ws
    };
  },
  watch: {
    modelValue: {
      handler(e) {
        var t;
        this.formList = (t = e == null ? void 0 : e.map((s) => this.formList.find((r) => r.values === s || r.temporaryValues === s || s[this.rowKey] && r.values[this.rowKey] === s[this.rowKey] || s.__rowKey && r.values.__rowKey === s.__rowKey) || new re({
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
        const s = I(e, t.prop);
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
        2 & this.fixedMode ? t.unshift(m(n({}, r), { fixed: "right" })) : i || 1 & this.fixedMode ? e.unshift(m(n({}, r), { fixed: "left" })) : s.unshift(r);
      }
      if (this.hasOperateColumn) {
        const r = {
          label: "操作",
          slotName: "operate",
          prop: "__operate",
          useCustomPreview: !0
        };
        4 & this.fixedMode ? e.push(m(n({}, r), { fixed: "left" })) : i || 8 & this.fixedMode ? t.push(m(n({}, r), { fixed: "right" })) : s.push(r);
      }
      return [].concat(e, s, t).map((r) => {
        var o, d;
        let a = "", u = "";
        if (r.fixed) {
          const l = r.fixed === "right", h = l ? "right" : "left", p = l ? [...t].reverse() : e;
          let y = 0;
          p.some((N) => {
            const B = N.prop === r.prop;
            return B || (y += this.fixedColumnWidth[N.prop] || 0), B;
          }), a = `position: sticky; ${h}: ${y}px;z-index: 2`, (l && ((o = t[0]) == null ? void 0 : o.prop) === r.prop || !l && ((d = e.slice(-1)[0]) == null ? void 0 : d.prop) === r.prop) && (u += ` versa-repeater__table-row-fixed--${h}`);
        }
        return m(n({}, r), {
          width: void 0,
          label: void 0,
          __width: r.width,
          __label: r.label,
          __fixedClass: u,
          formItemProps: {
            class: `versa-repeater__table-row--cell versa-repeater__table-row--${r.itemAlign || this.itemAlign}` + u,
            itemStyle: a,
            contentStyle: Object.assign(
              {},
              r.width ? { width: `${r.width - 20}px` } : {}
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
      ].map((e) => m(n({}, e), {
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
      return _(this, null, function* () {
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
      r && this.decideHasBtn("hasUpdate", i, t) && (s.push(W.save), s.push(W.cancel)), ["inline", "dialog"].includes(this.type) && e.status === "preview" && this.decideHasBtn("hasUpdate", i, t) && s.push(W.edit), t !== 0 && this.decideHasBtn("hasMoveUp", i, t) && s.push(W.up), t !== this.formList.length - 1 && this.decideHasBtn("hasMoveDown", i, t) && s.push(W.down), !r && this.decideHasBtn("hasDelete", i, t) && s.push(W.remove);
      let a = Array.isArray(this.actions) ? this.actions : [this.actions];
      typeof this.actions == "function" && (a = this.actions(i, t, {
        globalStatus: this.status
      }));
      const u = a == null ? void 0 : a.map((o) => L(o) && I(o, "actionName") && I(o, "actionType") || o != null && o.is ? m(n({}, o), {
        disabled: typeof o.disabled == "function" ? o.disabled.bind(this, e) : o.disabled
      }) : null).filter(Boolean);
      return [...s, ...u];
    },
    /** 新增 */
    onAdd() {
      return _(this, null, function* () {
        const e = this.formList.length;
        if (e >= this.maxLength || !(!this.validateBeforeAdd || (yield this.validate().catch((a) => (console.warn("[VersaRepeater] 新增校验失败", a), !1)))))
          return;
        const [s, i] = yield this.handleAsyncAction(
          "add",
          m(n({}, this.initValue), { __rowKey: `repeater_${jt()}` }),
          e
        );
        if (!s)
          return;
        if (this.type === "dialog") {
          this.visible = !0, this.actionParams = {
            title: "新增",
            dialogType: "add",
            formCore: new re({
              values: i,
              type: this.type,
              status: "edit"
            })
          };
          return;
        }
        const r = new re({
          values: i,
          type: this.type,
          status: "edit",
          isNew: this.type === "inline",
          mounted: (a) => {
            this.type === "inline" && (a.temporaryValues = a.values, a.values = ae(a.values), a.status = "edit");
          }
        });
        this.formList.push(r);
      });
    },
    /** 操作按钮 */
    onAction(e, t, s, i) {
      return _(this, null, function* () {
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
            if (!(yield (u = (a = this.$refs.repeaterRows) == null ? void 0 : a[s]) == null ? void 0 : u.validate().catch((p) => (console.warn("[VersaRepeater] 保存校验失败", p), !1))))
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
      return _(this, null, function* () {
        var u, o, d;
        const i = ae(t);
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
        else if (L(r)) {
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
}, Ls = {
  class: "versa-repeater",
  ref: "formRef"
}, _s = { class: "versa-repeater__table" }, Cs = ["width"], Is = { class: "versa-repeater__table-header" }, js = { class: "versa-repeater__table-row" }, Ss = { class: "versa-repeater__table-body" };
function Vs(e, t, s, i, r, a) {
  const u = M("VersaMeasureCell"), o = M("VersaButton"), d = M("ElSpace"), l = M("VersaForm"), h = M("VersaModal");
  return f(), b("div", Ls, [
    C("div", {
      ref: "scrollRef",
      class: J([
        "versa-repeater__scroll",
        {
          "versa-repeater__scroll-pinged--left": r.pingedLeft,
          "versa-repeater__scroll-pinged--right": r.pingedRight
        }
      ]),
      onScroll: t[0] || (t[0] = (...p) => a.onScroll && a.onScroll(...p))
    }, [
      C("table", _s, [
        C("colgroup", null, [
          (f(!0), b(j, null, S(a.deployOptions, (p) => (f(), b("col", {
            width: p.__width || "auto"
          }, null, 8, Cs))), 256))
        ]),
        C("thead", Is, [
          C("tr", js, [
            (f(!0), b(j, null, S(a.deployOptions, (p) => (f(), b("th", {
              class: J([
                "versa-repeater__table-header--cell",
                `versa-repeater__table-row--${p.itemAlign || p.itemAlign}`,
                p.__fixedClass
              ]),
              style: Qe(p.formItemProps.itemStyle)
            }, x(p.__label), 7))), 256))
          ])
        ]),
        C("tbody", Ss, [
          C("tr", null, [
            (f(!0), b(j, null, S(a.deployOptions, (p) => (f(), w(u, {
              key: p.prop,
              measure: !!p.fixed,
              onOnResize: (y) => a.onResize(p, y)
            }, null, 8, ["measure", "onOnResize"]))), 128))
          ]),
          (f(!0), b(j, null, S(r.formList, (p, y) => (f(), w(l, {
            component: "tr",
            isRepeater: "",
            ref_for: !0,
            ref: "repeaterRows",
            class: "versa-repeater__table-row",
            options: a.deployOptions,
            status: p.status,
            defaultValues: p.values,
            key: `${p.values.rowKey || ""}-${y}-${p.values.__rowKey || ""}`,
            modelValue: p.values,
            onOnMounted: (N) => a.onValueChange(p, N, y, "mounted"),
            onInput: (N) => a.onValueChange(p, N, y)
          }, H({ _: 2 }, [
            a.hasOperateColumn ? {
              name: "operate",
              fn: g(() => [
                D(d, null, {
                  default: g(() => [
                    (f(!0), b(j, null, S(a.filterActions(p, y), (N) => (f(), b(j, null, [
                      N.is ? (f(), w(k(N.is), v({
                        key: 0,
                        ref_for: !0
                      }, N, Y(N.on || {})), null, 16)) : (f(), w(o, v({
                        key: 1,
                        type: "primary",
                        link: "",
                        ref_for: !0
                      }, N, {
                        onClick: (B, K) => a.onAction(N, p, y, K)
                      }), {
                        default: g(() => [
                          Z(x(N.actionName), 1)
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
    a.wheatherShowAddBtn ? (f(), w(o, {
      key: 0,
      link: "",
      type: "primary",
      class: "versa-repeater__add",
      actionIcon: r.IconPlus,
      onClick: a.onAdd
    }, {
      default: g(() => [
        Z(x(s.addText), 1)
      ]),
      _: 1
    }, 8, ["actionIcon", "onClick"])) : F("", !0),
    D(h, v(a.modalProps, {
      visible: r.visible,
      "onUpdate:visible": t[1] || (t[1] = (p) => r.visible = p)
    }), H({ _: 2 }, [
      S(Object.keys(e.$slots), (p) => ({
        name: p,
        fn: g((y) => [
          V(e.$slots, p, O(z(y)))
        ])
      }))
    ]), 1040, ["visible"])
  ], 512);
}
const Ye = /* @__PURE__ */ T(Ns, [["render", Vs]]), Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ye
}, Symbol.toStringTag, { value: "Module" })), As = {
  name: "versa-provide",
  provide() {
    return {
      [Ae]: je(() => ({
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
      default: (e) => gt({ message: e, type: "error" })
    }
  },
  data() {
    return {};
  }
};
function Ts(e, t, s, i, r, a) {
  return V(e.$slots, "default");
}
const xs = /* @__PURE__ */ T(As, [["render", Ts]]), Os = [
  ms,
  Ee,
  ke,
  se,
  pe,
  E,
  Pe,
  xe,
  ys,
  Ve,
  Ye,
  te,
  xs,
  ze
], ji = (e) => {
  Os.forEach((t) => {
    e.component(ue(Ze(t.name)), t);
  });
};
export {
  E as VersaButton,
  te as VersaCard,
  Pe as VersaCheckboxGroup,
  ys as VersaDropdown,
  Ee as VersaFilter,
  se as VersaForm,
  Ot as VersaMessageBox,
  pe as VersaModal,
  ms as VersaPage,
  xs as VersaProvide,
  xe as VersaRadioGroup,
  Ye as VersaRepeater,
  Ve as VersaSelect,
  ke as VersaTable,
  ji as default
};
