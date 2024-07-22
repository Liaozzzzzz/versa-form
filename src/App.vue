<template>
    <el-tabs v-model="activeName" class="app">
        <el-tab-pane lazy label="page" name="page">
            <PageTest />
        </el-tab-pane>
        <el-tab-pane lazy label="form" name="form">
            <PageForm />
        </el-tab-pane>
        <el-tab-pane lazy label="repeater" name="repeater">
            <RepeaterTest />
        </el-tab-pane>
        <el-tab-pane lazy label="FormCard" name="FormCard">
            <FormCard />
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import PageTest from './views/page/index.vue';
import PageForm from './views/form/index.vue';
import RepeaterTest from './views/repeater/index.vue';
import FormCard from './views/form-card/index.vue';

export default {
    components: {
        PageTest,
        PageForm,
        RepeaterTest,
        FormCard
    },
    data() {
        return {
            activeName: 'page'
        };
    },
    methods: {}
};
</script>

<style lang="scss">
body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background-color: #eee;
}

.app {
    padding: 0 20px;
}
</style>
