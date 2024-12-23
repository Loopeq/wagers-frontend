import moment from 'moment-timezone'

export function format_period(period, type) {
    let temp = type.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    )
    let prefix = ' Игра'
    if (period === 3 || period === 4 || period == 5 || period == 6){
        prefix = String(period - 2) + ' Четверть'
    }
    else if (period !== 0){ 
        prefix = String(period) + " Тайм"
    }

    let result = temp + " - " + prefix
    return result
}

export function format_date(date) {

    let utc_time = moment.tz(date, 'UTC')
    let msc_time = utc_time.clone().tz('Europe/Moscow');
    msc_time = msc_time.format().toString()
    let current = new Date()
    current = current.toString()

    let temp = msc_time.split("T")
    let time = temp[1].split(":").slice(0, 2).join(':')
    let server_date = temp[0].split('-')

    if (server_date[2] === current.split(" ")[2]) {
        return time
    }
    else if (parseInt(server_date[2]) === parseInt(current.split(" ")[2]) + 1){
        return 'Завтра ' + time
    }
    else {
        let month;
        switch (parseInt(server_date[1].trim())){
            case 1: month = 'Янв.'; break
            case 2: month = 'Февр.'; break
            case 3: month = 'Март'; break
            case 4: month = 'Апр.'; break
            case 5: month = 'Май'; break
            case 6: month = 'Июнь'; break
            case 7: month = 'Июль'; break
            case 8: month = 'Авг.'; break 
            case 9: month = 'Сент.'; break
            case 10: month = 'Окт.'; break
            case 11: month = 'Нояб.'; break
            case 12: month = 'Дек.'; break 
        }
        return month + ' ' + server_date[2] + " " + time
    }

}

export function point_diff(oldPoint, newPoint){
    let diff = (oldPoint - newPoint).toFixed(2)
    if (diff < 0){ return `(+${-diff})`}
        return `(-${diff})`
}