var getRandName = function (count) {

	var nameSpace = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	var r = Math.random() * count;
	r = Math.round(r);
	return nameSpace[r];

}

var getMaxLength = function(arr) {

	var maxLength = 0;
	var maxLengthArr = 0;

	for (var i=0; i<arr.length; i++) {

		if (arr[i].length > maxLength) {

			maxLength = arr[i].length;
			maxLengthArr = i;

		}

	}

	return arr[maxLengthArr];

}

var compareArrays = function(arr1, arr2) {

	if (arr1.length != arr2.length) return false;

	for (var i=0; i<arr1.length; i++) {

		if (arr1[i] != arr2[i]) return false;

	}

	return true;

}

var getMaxFreq = function(arr) {

	var maxFreq = 0;
	var maxFreqArray = 0;
	var freq = 0;

	for (var i=0; i<arr.length; i++) { // Берем по порядку подмассивы

		for (var j=0; j<arr.length; j++) { // Сравниваем с другими подмассивами

			if (compareArrays(arr[i], arr[j])) {

				freq++;

			}

		}

		if (freq > maxFreq) {

			maxFreq = freq;
			maxFreqArray = i;

		}

		freq = 0;

	}

	arr[maxFreqArray].push(maxFreq);

	return arr[maxFreqArray];

}

var arr = [];

var parse = function(arr, precision) {

	var length = arr.length;

	var result = []; // Буфер для всех результатов
	var word = ''; // Временный буфер для промежуточного результата
	var noise = 0; // Флаг наличия результата в 'шуме'

	var offset = 0; //

	for (var i = 0; i<length; i++) { // Пробегаем массив от начала до конца

		for (var j = i+1; j<length; j++) { // Бежим от текущего элемента до конца

			if (arr[i] === arr[j]) { // Если найден такой же символ

				var iOffset = i;
				var jOffset = j;
				var symbolsPath = 0;
				precision = (precision < length) ? precision : length; // Каллибруем рамки поиска с пропуском
				word = [];

				for (var m=0; m<length; m++) { // Пробегаем по следующим потенциально похожим символам до текущего или до конца строки

					for (var n=0; n<precision; n++) { // Допускаем 'шум' в заданных пределах

						if ((iOffset+m+n) < jOffset) { // Левый пакет не может пересекаться с правым

							if (arr[iOffset+m+n] === arr[jOffset+m]) { // Перескакиваем через n символов от эталона

								if ((iOffset+m+n) == jOffset+m) continue; // Если наткнулись на один и тот же, просто пропускаем

								iOffset += n;
								noise = 1;
								if (arr[jOffset+m]) word.push(arr[jOffset+m]);
								break; // Выходим из шума и продолжаем поиск этой последовательности

							} else if (arr[iOffset+m] === arr[jOffset+m+n]) { // Перескакиваем через n символов от искомого

								if (iOffset+m == (jOffset+m+n)) continue;

								jOffset += n;
								noise = 1;
								if (arr[jOffset+m+n]) word.push(arr[jOffset+m+n]);
								break; // Выходим из шума и продолжаем поиск

							}

						} else break;

					}

					symbolsPath = m; // Запоминаем где остановились

					if (!noise) { // Если нет совпадений

						break; // И ищем следующую последовательность

					} else noise = 0; // Если есть, то опускаем флаг и ищем дальше

				}

				j += symbolsPath;
				symbolsPath = 0;

				if (word.length > 1) result.push(word);

			}

		}

	}

	console.log(arr);
	console.log(result);

	console.log(getMaxLength(result));
	console.log(getMaxFreq(result));

}

var eventEmitter = function(config, callback) {

	var counter = config.events || 100
	var unique = (config.unique - 1) || 2;
	var precision = config.precision || 2;

	while(counter--) {

		callback(getRandName(unique));

	}

	parse(arr, precision);

}

console.time('time');

var eventHandler = function(event) {

	arr.push(event);

}

var config = {
	unique: 3, // Количество уникальных событий
	precision: 20, // Уровень шума (допустимое количество не нужных символов между искомыми)
	events: 20
}

eventEmitter(config, eventHandler);
console.timeEnd('time');
