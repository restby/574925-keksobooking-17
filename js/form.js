'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var fieldsetArr = document.querySelectorAll('fieldset');
  var selectArr = document.querySelectorAll('select');
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
    '1' : '1',
    '2' : '2',
    '3' : '3',
    '100' : '0'
  };
  var guestsAvailableDict = {
    '1' : '1',
    '2' : ['1', '2'],
    '3' : ['1', '2', '3'],
    '100' : '0'
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
    '1': '1',
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': '0'
  };


  // capacityArr.forEach(function (it) {
  //   if (guestsAvailableDict[room].indexOf(parseInt(it.value, 10)) === -1) {
  //     it.setAttribute('disabled', '');
  //   }
  // });


  roomNumberInput.onchange = function () {
    capacityInput.value = guestsValueDict[roomNumberInput.value];
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
  window.form = {
    editsForm: editsForm,
    form: form
  };
})();
