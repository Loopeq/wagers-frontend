import moment from 'moment-timezone';

export default {
    install(app) {
        app.config.globalProperties.$formatDate = function(isoString) {
            if(!isoString) return 
            const utcTime = moment.tz(isoString, 'UTC');
            const mscTime = utcTime.clone().tz("Europe/Moscow");
            const now = moment().tz('Europe/Moscow');

            const diffInMinutes = now.diff(mscTime, 'minutes');

            if (Math.abs(diffInMinutes) <= 3) {
                return 'Сейчас';
            }

            if (Math.abs(diffInMinutes) < 60) {
                if (diffInMinutes < 0) {
                    return `Через ${Math.abs(diffInMinutes)} мин.` 
                }
                return `${diffInMinutes} мин.`;
            }
            
            if (mscTime.isSame(now, 'day')) {
                return `${mscTime.format('HH:mm')}`;
            }
            
            // if (mscTime.isSame(now.clone().subtract(1, 'day'), 'day')) {
            //     return `Вчера ${mscTime.format('HH:mm')}`;
            // }
            
            // if (mscTime.isSame(now.clone().add(1, 'day'), 'day')) {
            //     return `Завтра ${mscTime.format('HH:mm')}`;
            // }
            
            return mscTime.format('DD/MM HH:mm');
            
        };
    }
};
