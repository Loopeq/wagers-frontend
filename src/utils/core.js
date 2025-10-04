const ERROR_CODES = {
    LOGIN_NOT_FOUND: 'Пользователь с таким логином не найден',
    INCORRECT_PASSWORD: 'Неправильный пароль',
    auth: 'Пожалуйста войдите в систему'
}

export function error(code){
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}

export function capitalizer(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatOdd(american) {
    if (american > 0) {
        return (1 + american / 100).toFixed(3);
    } else if (american < 0) {
        return (1 + 100 / Math.abs(american)).toFixed(3);
    } else {
        throw new Error("American odds cannot be 0");
    }
  }