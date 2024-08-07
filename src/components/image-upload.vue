<template>
  <div class="versa-image-upload">
    <ElIcon
      class="versa-image-upload__icon"
      v-if="!previewSrc"
      @click="onClickUpload"
    >
      <Plus />
    </ElIcon>
    <div v-else class="versa-image-upload__preview">
      <ElImage
        class="versa-image-upload__preview--pic"
        :src="previewSrc"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="previewSrcList"
        fit="cover"
      />
      <template v-if="status === 'edit'">
        <div class="versa-image-upload__preview--mask"></div>
        <ElIcon class="versa-image-upload__preview--remove" @click="onRemove">
          <Delete />
        </ElIcon>
      </template>
    </div>
    <input
      ref="inputRef"
      style="
        opacity: 0;
        width: 1px;
        height: 1px;
        left: -999px;
        position: fixed;
        z-index: -999;
      "
      type="file"
      :accept="accept"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { Plus, Delete } from "@element-plus/icons-vue";
import ceil from "lodash/ceil";
import { ElIcon, ElImage } from "element-plus";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/image/style/css";
import { injectedConfig } from "./mixins/config";

export default {
  name: "versa-image-upload",
  components: { Plus, Delete, ElIcon, ElImage },
  mixins: [injectedConfig],
  props: {
    modelValue: {
      type: [Object, String],
    },
    maxSize: {
      type: Number,
      default: 5 * 1024 * 1024,
    },
    status: {
      type: String,
      default: "edit",
    },
    accept: {
      type: String,
      default: ".png;.jpg;.jpeg",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      previewSrc: "",
    };
  },
  computed: {
    previewSrcList() {
      if (this.status === "edit") {
        return [];
      }

      return typeof this.modelValue === "string"
        ? [this.modelValue]
        : [this.previewSrc];
    },
  },
  watch: {
    modelValue: {
      handler() {
        if (typeof this.modelValue === "string") {
          this.previewSrc = this.modelValue;
        }
      },
      immediate: true,
    },
  },
  methods: {
    onClickUpload() {
      this.$refs.inputRef.value = "";
      this.$refs.inputRef.click();
      this.$refs.inputRef.blur();
    },
    handleChange(e) {
      const files = e.target?.files ?? [];

      if (files.length === 0) {
        // TODO:获取文件异常
        return;
      }
      if (files.length > 1) {
        // TODO: 数量错误
        return;
      }
      // 校验体积
      if (files[0].size > this.maxSize) {
        this.globalConfig?.toastError?.(
          `最大支持${ceil(this.maxSize / 1000, 2)}kb大小的文件`
        );
        return;
      }

      // 文件格式
      const isSupport = this.accept
        ?.split(";")
        .some((item) => files[0].name.endsWith(item));
      if (!isSupport) {
        this.globalConfig?.toastError?.(`仅支持${this.accept}格式的文件`);
        return;
      }

      this.previewSrc = URL.createObjectURL(files[0]);
      this.$emit("update:modelValue", files[0]);
    },
    onRemove() {
      this.$emit("update:modelValue", null);
      this.previewSrc = null;
    },
  },
};
</script>

<style lang="scss">
.versa-image-upload {
  &__icon {
    width: 140px;
    height: 140px;
    border: 1px solid rgb(229, 231, 235);
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    background-color: #fff;
  }

  &__preview {
    position: relative;
    width: 140px;
    height: 140px;
    background-color: #fff;
    user-select: none;

    &--pic {
      width: 100%;
      height: 100%;
      border: 1px solid rgb(229, 231, 235);
      cursor: pointer;
      border-radius: 4px;
    }

    &--mask {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background: rgba(101, 101, 101, 0.6);
      color: #ffffff;
      opacity: 0;
    }

    &--remove {
      display: none;
      position: absolute;
      top: calc(50% - 10px);
      left: calc(50% - 10px);
      z-index: 10;
      width: 20px;
      height: 20px;
      font-size: 20px;
      color: #ffffff;
      cursor: pointer;
    }

    &:hover &--mask {
      opacity: 1;
    }

    &:hover &--remove {
      display: block;
    }
  }
}
</style>
