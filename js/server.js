'use strict';
(function () {
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking/data';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };

  // функция ошибки - ответа сервера
  var errorPinRender = function () {
    // находим шаблон
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    // var errorBtn = document.querySelector('.error__button');
    // функция перезагрузки страницы
    var refreshPage = function () {
      window.location.reload();
    };
    // функция которая копирует начинку шаблона
    var addErrorMessage = function (_arr) {
      var errorElement = errorTemplate.cloneNode(true);
      return errorElement;
    };
    // создаем контейнер
    var fragment = document.createDocumentFragment();
    fragment.appendChild(addErrorMessage());
    window.pin.mapPins.appendChild(fragment);
    document.querySelector('.error__button').addEventListener('click', refreshPage);
  };

  window.server = {
    load: load,
    errorPinRender: errorPinRender
  };
})();
