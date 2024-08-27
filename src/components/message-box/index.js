import omit from "lodash/omit";
import { h } from "vue";
import { ElMessageBox } from "element-plus";
import "element-plus/theme-chalk/src/message-box.scss";
import "./styles.scss";
import { isEmpty } from "../utils";
import IconWarning from "../assets/warning.svg";
import IconClose from "../assets/close.svg";

const VersaMessageBox = (props) => {
  return ElMessageBox({
    message: () => {
      return h("div", { class: "versa-message-box__container" }, [
        h("img", {
          src: IconClose,
          class: "versa-message-box__close",
          onClick: () => {
            ElMessageBox.close();
          },
        }),
        h(
          "div",
          {
            class: "versa-message-box__content",
          },
          [
            h("img", {
              src: IconWarning,
              class: "versa-message-box__icon",
            }),
            h("div", { class: "versa-message-box__wrap" }, [
              isEmpty(props.title)
                ? undefined
                : h(
                    "div",
                    {
                      class: "versa-message-box__title",
                    },
                    props.title
                  ),
              h("div", {
                class: "versa-message-box__message",
                innerHTML: props.message,
              }),
            ]),
          ]
        ),
      ]);
    },
    showCancelButton: true,
    ...omit(props, ["title", "message", "type"]),
    customClass: `versa-message-box ${props.customClass || ""}`,
  });
};

export default VersaMessageBox;
