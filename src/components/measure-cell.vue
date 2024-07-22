<template>
    <td ref="measureRef" style="padding: 0; border: 0; height: 0"></td>
</template>

<script>
export default {
    props: {
        /** 是否监听尺寸变化 */
        measure: Boolean,
    },
    emits: ['onResize'],
    mounted() {
        this.$nextTick(() => {
            if (!this.$refs.measureRef || !this.measure) {
                return;
            }
            this.observer = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    this.$emit('onResize', { width: entry.contentRect.width });
                });
            });

            this.observer.observe(this.$refs.measureRef);
        });
    },
    beforeUnmount() {
        this.measure && this.$refs.measureRef && this.observer?.unobserve(this.$refs.measureRef);
    },
};
</script>

<style lang="scss"></style>
