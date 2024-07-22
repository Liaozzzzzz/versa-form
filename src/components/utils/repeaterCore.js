import { noop } from '.';

class RepeaterCore {

    constructor(props) {
        const { type, values, status, mounted = noop, isNew = false } = props;

        // 变量
        this.type = type;
        this.values = values;
        this.temporaryValues = values;
        this.isNew = isNew;

        // 表单状态
        switch (this.type) {
            case 'dialog':
            case 'inline':
                this.status = 'preview';
                break;
            case 'sync':
                this.status = status;
            default:
        }

        // 函数类
        this.mounted = mounted;
    }
}

export default RepeaterCore;