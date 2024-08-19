
import type { App } from "vue";

declare const installer: {
    install: (app: App) => void;
};

export * from './types/components';

export default installer;