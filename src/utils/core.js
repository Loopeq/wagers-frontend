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