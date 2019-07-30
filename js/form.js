'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var fieldsetArr = document.querySelectorAll('fieldset');
  var selectArr = document.querySelectorAll('select');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinLeftPosition = mainPin.offsetLeft;
  var mainPinTopPosition = mainPin.offsetTop;
  // функция, которая перебирает массив / коллекцию и каждому элементу добавлять атрибут 'disabled'
  var setAttributeDisabled = function (arr) {
    arr.forEach(function (it) {
      it.setAttribute('disabled', '');
    });
  };
  // функция, которая перебирает массив / коллекцию и у каждого элемента удалять атрибут 'disabled'
  var removeAttributeDisabled = function (arr) {
    arr.forEach(function (it) {
      it.removeAttribute('disabled', '');
    });
  };
  setAttributeDisabled(fieldsetArr);
  setAttributeDisabled(selectArr);
  var titleInput = form.querySelector('#title');
  /** запускаем код валидации на кол-во символов с  выдачей сообщений */
  // можно ли тут как-то исправить???????*
  /**
   * var invalidMessages = {
   *  tooShort: 'Заголовок объявления должен состоять минимум из 30 символов',
   *  tooLong: 'Заголовок объявления не должен превышать 100 символов',
   *  valueMissing: 'Обязательное поле'
   * }
   */
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });
  /** */
  var typeInput = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  // массив минимальных цен для атрибутов min и placeholder
  var pricesArr = [0, 1000, 5000, 100000];
  // функция, которая добавляет в атрибуты min и placeholder у элемента формы '#price' значение из массива цен
  var setAttributesMinAndPlaceholder = function (item) {
    priceInput.setAttribute('min', item);
    priceInput.setAttribute('placeholder', item);
  };
  var typeArr = typeInput.querySelectorAll('option');
  // массив из индексов всех вариантов значений элемента формы '#type'
  var typeOptionValue = [];
  typeArr.forEach(function (it) {
    typeOptionValue.push(it.value);
  });
  // функцию которая, по изменению значения select изменяет минимальное значения цены и подпись в поле формы
  typeInput.onchange = function () {
    // получает индекс выбранного значения у элемента формы '#price' и устанавливает соответствующий ему индекс из массива цен
    setAttributesMinAndPlaceholder(pricesArr[typeOptionValue.indexOf(typeInput.value)]);
  };
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  timeInInput.onchange = function () {
    timeOutInput.selectedIndex = this.selectedIndex;
  };
  timeOutInput.onchange = function () {
    timeInInput.selectedIndex = this.selectedIndex;
  };
  /** */
  var roomNumberInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');
  var capacityArr = capacityInput.querySelectorAll('option');
  /*
  var guestsValueDict = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': '0'
  };
  var guestsAvailableDict = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  roomNumberInput.onchange = function (room) {
    capacityInput.value = guestsValueDict[room]
  }
  if(guestsAvailableDict[room].indexOf(parseInt(it.value, 10) === -1) {
    it.setAttribute('disabled', '');
  })
  */
  var guestsValueDict = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': '0'
  };
  var guestsAvailableDict = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  roomNumberInput.onchange = function (room) {
    capacityInput.value = guestsValueDict[room]; /* - такой вариант Не работает: при переключении кол-во комнат, кол-во гостей не изменяется, оно вообще пустым становится */
    capacityInput.value = guestsValueDict[roomNumberInput.value]; /* - этот вариант Работает и переключает, и параметр (room) в функции указывать нет смысла */
    // допустим если оставить вариант №2, дальнейшие мои действия опять мимио(( По идее я должен перебрать массив option у capacityInput, взять у каждого value и сравнить с чем-то
    capacityArr.forEach(function (it) {
      // console.log(guestsAvailableDict[room].indexOf(parseInt(it.value, 10))); /* - выдает ошибку */
      // if (guestsAvailableDict[room].indexOf(parseInt(it.value, 10)) === -1) {
      //   it.setAttribute('disabled', '');
      // } /* - выдает ошибку */
      console.log(guestsAvailableDict[roomNumberInput.value].indexOf(parseInt(it.value, 10))); /* - выдает 4 раза значение: -1 */
      if (guestsAvailableDict[roomNumberInput.value].indexOf(parseInt(it.value, 10)) === -1) {
        it.setAttribute('disabled', '');
      } /* - тогда все условие отрабатывает в одном сценарии все значения равны -1 и все option у capacityInput получают setAttribute('disabled', '')*/
    });
  };
  //   capacityArr.forEach(function (it) {
  //     it.setAttribute('disabled', '');
  //     if (parseInt(it.value, 10) <= parseInt(roomNumberInput.value, 10) && parseInt(it.value, 10) !== 0) {
  //       it.removeAttribute('disabled', '');
  //     }
  //     // it.removeAttribute('disabled', '');
  //     // if (parseInt(it.value, 10) !== parseInt(roomNumberInput.value, 10) && parseInt(it.value, 10) > parseInt(roomNumberInput.value, 10) || parseInt(it.value, 10) === 0) {
  //     //   it.setAttribute('disabled', '');
  //     // } else if (parseInt(it.value, 10) === 0) {
  //     //   it.removeAttribute('disabled', '');
  //     // }
  //   });
  /** */
  var editsForm = function () {
    removeAttributeDisabled(fieldsetArr);
    removeAttributeDisabled(selectArr);
  };

  // // функция ошибки - ответа сервера
  // var errorHandler = function () {
  //   // находит шаблон
  //   var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  //   // функция перезагрузки страницы
  //   var refreshPage = function () {
  //     window.location.reload();
  //   };
  //   // функция которая копирует начинку шаблона Error
  //   var addErrorMessage = function (_arr) {
  //     var errorElement = errorTemplate.cloneNode(true);
  //     return errorElement;
  //   };
  //   // создает контейнер
  //   var fragment = document.createDocumentFragment();
  //   fragment.appendChild(addErrorMessage());
  //   document.querySelector('.map__pins').appendChild(fragment);
  //   document.querySelector('.error__button').addEventListener('click', refreshPage);
  // };

  form.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(form), function () {
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      setAttributeDisabled(fieldsetArr);
      setAttributeDisabled(selectArr);
      document.querySelectorAll('.map__pin').forEach(function (it) {
        if (!it.classList.contains('map__pin--main')) {
          document.querySelector('.map__pins').removeChild(it);
        }
      });
      document.querySelectorAll('.popup').forEach(function (it) {
        map.removeChild(it);
      });
      titleInput.value = '';
      priceInput.value = '';
      mainPin.style.left = mainPinLeftPosition + 'px';
      mainPin.style.top = mainPinTopPosition + 'px';

    });
    evt.preventDefault();
  });

  window.form = {
    editsForm: editsForm,
    form: form,
    map: map,
    mainPin: mainPin
  };
})();
