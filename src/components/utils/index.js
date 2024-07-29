import upperFirst from "lodash/upperFirst";

export const isEmpty = (value) => ['', null, undefined].includes(value);

export const noop = (v) => v;

export const isObject = v => Object.prototype.toString.call(v).toLocaleLowerCase() === '[object object]';

export const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export function toArray(origin) {
    if (origin === null || origin === undefined) {
        return [];
    }
    if (Array.isArray(origin)) {
        return origin;
    }
    return [origin];
}

/**
 * @method toDesensitive
 * @desc 敏感信息脱敏
 *  @param {String} string 需要脱敏的数据
 * @param {String, Function} sensitiveType 类型
 * @returns 
 */
export const toDesensitive = (value, sensitiveType) => {
    if (!value) return '';
    let newValue = value.toString();

    // 大陆手机号的掩码规则"137****9050"
    if (sensitiveType === 'cellphone') return newValue.replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2');

    // 身份证
    if (sensitiveType === 'identity') return newValue.replace(/^(.{4})(?:\d+)(.{4})$/, '$1**********$2');

    // 其他规则处理函数
    if (typeof sensitiveType === 'function') return sensitiveType(value);
};

export const gen = () => Math.random().toString(36).slice(2);

export const formatEventName = (obj = {}) => {
    const res = {};
    for (const name in obj) {
        res[/^on[A-Z].*/.test(name) ? name : `on${upperFirst(name)}`] = obj[name];
    }
    return res;
}