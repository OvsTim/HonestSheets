import i18n from './../utils/i18n';

interface SerializedError {
  name?: string;
  message: string;
  code: string;
  stack?: string;
}

function instanceOfSerializedError(er: any): er is SerializedError {
  return 'code' in er && 'message' in er;
}

export function handleBaseError(er: any): string {
  console.log('er', JSON.stringify(er.response));

  // if (instanceOfSerializedError(er)) {
  //   return er.message;
  // } else {
  //   return er.message;
  // }
  if (er.response && er.response.status) {
    switch (er.response.status) {
      case 500:
        return 'Произошла ошибка выполнения запроса. Проверьте правильность заполненных данных и повторите попытку';
      case 404:
        return 'Запрашиваемый ресурс не найден';
      case 401:
        return 'Требуется заново авторизоваться в приложении.';
      case 429:
        return 'Превышено количество попыток входа. Повторите попытку позже';
      case 422:
        if (er.response.data.message) {
          return er.response.data.message;
        } else {
          return 'Неизвестная ошибка';
        }

      default:
        return 'Неизвестная ошибка';
    }
  } else {
    return 'Неизвестная ошибка';
  }

  // //todo: обработать серверную ошибку
  //
  // return i18n.t('errors:400');
}
