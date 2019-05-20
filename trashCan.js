var data = JSON.parse(localStorage.getItem('currentList'));

renderData();

document.getElementById('clearAll').addEventListener('click', function() {
    if (data.trash.length) {
        data.trash = [];
        dataUpdated();
        console.log(data);
        document.getElementById('trash').innerHTML = '';
    }
});

function renderData() {
    if (data.trash.length) {
        for (var i = 0; i < data.trash.length; i++) {
            var value = data.trash[i];
            value = getTrueValue(value, false);
            addItemCurrent(value);
        }
    }
}

function dataUpdated() {
    localStorage.setItem('currentList', JSON.stringify(data));
}

function getTrueValue(value, ifRecover) {
    var str = ifRecover ? 'kill!recover' : 'delete';
    return value.substring(
        0,
        value.length - str.length
    );
}

function addItemCurrent(text) {
    var list = document.getElementById('trash');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var clear = document.createElement('button');
    clear.classList.add('clear');
    clear.innerHTML = 'kill!';

    clear.addEventListener('click', clearMessage);

    var recover = document.createElement('button');
    recover.classList.add('recover');
    recover.innerHTML = 'recover';

    recover.addEventListener('click', recoverItem);

    buttons.appendChild(clear);
    buttons.appendChild(recover);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}

function recoverItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var value = item.innerText;
    value = getTrueValue(value, true);

    data.current.push(value);
    data.trash.splice(data.trash.indexOf(value), 1);
    dataUpdated();

    parent.removeChild(item);
}

function clearMessage() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var value = item.innerText;
    
    data.trash.splice(data.trash.indexOf(value), 1);
    dataUpdated();

    parent.removeChild(item);
}