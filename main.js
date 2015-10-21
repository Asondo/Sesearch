var randValueFrom = function (array) { // wwwwwwwws

	var length = array.length - 1;
	var r = Math.random() * length;
	r = Math.round(r);
	return array[r];

}

var getMaxLengthArrays = function(arr) { // add new commit from sub routine

	var maxLength = 0;
	var result = [];

	// Находим максимальную длину подпоследовательности
	for (var i=0; i<arr.length; i++) { // add new commit from sub routine again

		if (arr[i].length > maxLength) {

			maxLength = arr[i].length;
			// maxLengthArr = i;

		}

	}

	// Находим все подпоследовательности такой длины
	for (var i=0; i<arr.length; i++) { // Add some fixes in master

		if (arr[i].length == maxLength) {

			result.push(arr[i]);

		}

	}

	return result;

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

var isInArray = function(value, arr) {

	for (var i=0; i<arr.length; i++) {

		if (arr[i] == value) return true;

	}

	return false;

}

var createDoubleArray = function(length) {

	var arr = [];
	var length = length;

	while(length--) {

		arr[length] = [];

	}

	return arr;

}

var copyArray = function(from, to) {

	// to = [];

	for (var i=0; i<from.length; i++) {

		to[i] = from[i];

	}

}

var getValuesByIndexes = function(arrIndexes, arr) { // массив индексов в массив значений

	var result = [];

	for (var i=0; i<arrIndexes.length; i++) {

		result[i] = arr[arrIndexes[i]];

	}

	return result;

}

var deleteEvenIndex = function(arr) { // Удаляем все y-индексы из массива

	var result = [];
	var counter = 0;

	for (var i=0; i<arr.length; i+=2) {

		result.push(arr[i]);

	}

	return result;

}

var deleteSameSubarrays = function(arr) {

	for (var i=0; i<arr.length; i++) {

		for (var j=0; j<arr.length; j++) {

			if (i!=j) if (compareArrays(arr[i],arr[j])) {

				arr.splice(j,1);
				j--;

			}

		}

	}

}

var getDoubleElemList = function(arr) {

	var result = [];

	for (var i=0; i<arr.length; i++) {

		if (arr[i].length == 2) {

			result.push(arr[i]);

		}

	}

}

var arr = [];

var search = function(arr) {

	var allCombinations = [];
	var length = arr.length;
	var table = createDoubleArray(length); // length X length // Вспомогательный массив
	var previousY = 0;
	var prevValueFound = 0;

	for (var y=0; y<length; y++) { // Пробегаем по строкам

		for (var x=y+1; x<length; x++) { // По столбцам

			if (arr[y] === arr[x]) { // Если равны

				table[y][x] = [[x,y]]; // Запоминаем это совпадение

				previousY = y - 1; // // Поднимаемся по строке вверх

				while(previousY >= 0) { // Если эта строка существует

					for (var previousX=previousY+1; previousX<x; previousX++) { // Ищем совпадения найденные ранее в заданной области

						if (table[previousY][previousX]) { // Если есть совпадение с символом

							var subseq = table[previousY][previousX];
							if (!subseq) subseq = [];

							// Проходим по найденным ранее подпоследовательностям
							for (var num=0; num<subseq.length; num++) {

								console.log('y = ' + y + ', x = ' + x + ', prevY = ' + previousY + ', prevX = ' + previousX + ', subseqN = ' + num);

								//Переносим комбинации без этого совпадения в текущую ячейку
								if (!isInArray(x, subseq[num]) && !isInArray(y, subseq[num])) { // Если такого элемента еще не было

									var newSubSeq = [];

									// Копируем предыдущие значения
									copyArray(subseq[num], newSubSeq);

									// Добавляем совпадение в цепочку
									newSubSeq.push(x);
									newSubSeq.push(y);

									table[y][x].push(newSubSeq);
									
									// Скидываем новую комбинацию в общий список
									allCombinations.push(newSubSeq);

									console.log(newSubSeq);

								}

							}

						}
					}

					previousY--;

				}

			}

		}

	}

	table = [];

	console.log(arr);

	console.log(allCombinations.length);

	// Проходим по массиву со всеми возможными подпоследовательностями
	for (var i=0; i<allCombinations.length; i++) {

		allCombinations[i] = deleteEvenIndex(allCombinations[i]); // Удаляем все y-индексы
		allCombinations[i] = getValuesByIndexes(allCombinations[i], arr); // Переводим индексы в значения

	}

	// Удаляем все повторяющиеся подпоследовательности
	deleteSameSubarrays(allCombinations);

	// Ищем самую длинную подпоследовательность
	var maxLengthSeqs = getMaxLengthArrays(allCombinations); // Список самых длинных

	console.log(maxLengthSeqs);

}

var createSomeEvents = function(config, callback) {

	var count = config.count || 10;
	var events = config.events || ['A','B','C'];
	var randomise = config.randomise;

	if (randomise) { //  Рандомные события

		while (count--) {

			callback(randValueFrom(events));

		}

	} else { // Строка в том виде, в котором есть

		for (var i=0; i<events.length; i++) {

			callback(events[i]);

		}

	}

	search(arr);

}

console.time('time');

var eventHandler = function(event) {

	arr.push(event);

}

var config = {

	events: ['A','B','C'], // Варианты событий
	count: 10, // Количество событий
	randomise: true, // Случайный поток заданного количества заданных событий (вкл/выкл)

}

createSomeEvents(config, eventHandler);

console.timeEnd('time');
