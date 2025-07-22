
export default {
    install(app) {
        app.config.globalProperties.$formatPeriod = function(period, type) {
            if (type == 'moneyline') {return type}
            if (period === 0) { return `${type} - G`}
            else if (period === 1 || period === 2) {return `${type} - ${period} Time`}
            else {return `${type} - ${period - 2} Half`}
        }
    }
};
