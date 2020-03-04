//Задача №1
//const regexp = /'/g;
//const delsymbol = "";
//
//function delAllSymbols(label, text) {
//    document.body.innerHTML = document.body.innerHTML.replace(label, text);
//}
//
//delAllSymbols(regexp, delsymbol);

//Задача №2
//const regexp = /([a-z])(['])([a-z])/ig;
//const delsymbol = '$1 $3';
//
//function delSelectSymbols(label, text) {
//    document.body.innerHTML = document.body.innerHTML.replace(label, text);
//}
//
//delSelectSymbols(regexp, delsymbol);

//Задача №3
const regExpFio = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
const regExpTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const regExpEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

function checkForm(form) {
    const fioInputValue = document.getElementById('fio').value;
    const telInputValue = document.getElementById('tel').value;
    const emaiInputValue = document.getElementById('email').value;
    
    if (regExpFio.test(fioInputValue)) {
        document.getElementById('err_fio').innerHTML='<span style="color: green">ОК</span>';
        console.log('Данный в поле ФИО введены корректно');
    } else {
        document.getElementById('err_fio').innerHTML='Не корректно введено ФИО.';
        return false;
    } 
    
    if (regExpTel.test(telInputValue)) {
        document.getElementById('err_tel').innerHTML='<span style="color: green">ОК</span>';
        console.log('Данный в поле телефон введены корректно');
    } else {
        document.getElementById('err_tel').innerHTML='Не корректно введен телефон.';
        return false;
    } 
    
    if (regExpEmail.test(emaiInputValue)) {
        document.getElementById('err_email').innerHTML='<span style="color: green">ОК</span>';
        console.log('Данный в поле E-mail введены корректно');
    } else {
        document.getElementById('err_email').innerHTML='Не корректно введен E-mail.';
        return false;
    } 
    return true;
}