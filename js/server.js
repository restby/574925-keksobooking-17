'use strict';
(function () {
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking/data';
    xhr.responseType = 'json';
    // получает данные с сервера
    xhr.addEventListener('load', function () {
      // проверяет статус
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    // выводит сообщение об ошибке в случае если ошибка соединения
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    // выводит сообщение об ошибке в случае если вышло время ожидания ответа
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };

  // отправка формы
  var upload = function (data, onSuccess) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  // функция ошибки - ответа сервера
  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    // функция перезагрузки страницы
    var refreshPage = function () {
      window.location.reload();
    };
    // функция которая копирует начинку шаблона Error
    var addErrorMessage = function (_arr) {
      var errorElement = errorTemplate.cloneNode(true);
      return errorElement;
    };
    // создает контейнер
    var fragment = document.createDocumentFragment();
    fragment.appendChild(addErrorMessage());
    document.querySelector('.map__pins').appendChild(fragment);
    document.querySelector('.error__button').addEventListener('click', refreshPage);
  };
  window.server = {
    load: load,
    upload: upload,
    errorHandler: errorHandler
  };
})();
