var preFilled = { "preM" : "sample message" }

addPreFilledItem(preFilled.preM);

var data = localStorage.getItem('currentList') ?
  JSON.parse(localStorage.getItem('currentList')) :
  {
    current: [],
    trash: []
  }

renderData();

document.getElementById('add').onclick = function() {
  var value = document.getElementById('item').value;
  if (value) addItem(value);
}

document.getElementById('item').addEventListener('keydown', function(e) {
  var value = this.value;
  if (value && e.code === 'Enter') addItem(value);
});

document.getElementById('cleanUp').onclick = function () {
  document.getElementById('item').value = '';
}

document.getElementById('clearAll').addEventListener('click', function () {
  if (data.current.length) {
    moveToTrash();
    document.getElementById('current').innerHTML = '';
    addPreFilledItem("sample message");
  }
});

function dataUpdated() {
  localStorage.setItem('currentList', JSON.stringify(data));
}

function renderData() {
  if (data.current.length) {
    for (var i = 0; i < data.current.length; i++) {
      var value = data.current[i];
      addItemCurrent(value);
    }
  }
}

function addItem(value) {
  addItemCurrent(value);
  document.getElementById('item').value = '';
  data.current.push(value);
  dataUpdated();
}

function addPreFilledItem(text) {
  var list = document.getElementById('current');

  var item = document.createElement('li');
  item.innerText = text;

  var clear = document.createElement('button');
  clear.classList.add('clear');
  clear.innerHTML = 'delete';

  item.appendChild(clear);

  list.insertBefore(item, list.childNodes[0]);
}

function addItemCurrent(text) {
  var list = document.getElementById('current');

  var item = document.createElement('li');
  item.innerText = text;

  var clear = document.createElement('button');
  clear.classList.add('clear');
  clear.innerHTML = 'delete';

  clear.addEventListener('click', clearMessage);

  item.appendChild(clear);

  list.insertBefore(item, list.childNodes[0]);
}

function clearMessage() {
  var item = this.parentNode;
  var parent = item.parentNode;
  var value = item.innerText;

  data.current.splice(data.current.indexOf(value), 1);
  data.trash.push(value);
  dataUpdated();

  parent.removeChild(item);
}

function moveToTrash() {
  for (var i = 0; i < data.current.length; i++) {
    var value = getFakeValue(data.current[i]);
    data.trash.push(value);
  }
  data.current = [];
  dataUpdated();
}

function getFakeValue(value) {
  const str = 'delete';
  return value + str;
}
