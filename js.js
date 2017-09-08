/**
 * Created by Galina on 07.09.2017.
 */
$(document).ready(function () {
    let testData = {};
    $('nav').load('templates/nav.html');
    $.getJSON(
      'testdata.json',
        function (data) {
            testData = data;
            $('#sum').val(testData.sum);
            $('#deadline').val(testData.deadline);
            $('#range-sum').val(testData.sum);
            $('#range-deadline').val(testData.deadline);
            $('#inn').val(testData.inn);
            $('#surname').val(testData.surname);
            $('#name').val(testData.name);
            $('#f_elem_city').val(testData.city);
        }
    );
    //проверка данных при потере фокуса с поля (blur())
    $('#sum').blur(function (eventObject) {
        if (eventObject.delegateTarget.value >= 1 && eventObject.delegateTarget.value <= 10000) {
            return true;
        } else {
            $('#sum').val("");
            $('#sum').attr({"placeholder":"Нужно указать число от 1 до 10 000"});
            return false;
        }
    });
    $('#deadline').blur(function (eventObject) {
        if (eventObject.delegateTarget.value >= 1 && eventObject.delegateTarget.value <= 12) {
            alert('right');
            return true;
        } else {
            $('#deadline').val("");
            $('#deadline').attr({"placeholder":"Нужно указать число от 1 до 12"});
            return false;
        }
    });
    //автозаполнение для поля Город
    $('#f_elem_city').autocomplete({
        source: function (request, response) {
            $.getJSON(
                'http://gd.geobytes.com/AutoCompleteCity?callback=?&q='+request.term,
                function (data) {
                    response(data);
                }
            );
        },
        minLength: 3, //автозаполнение запускается только после ввода пользователем не меньше 3 символов
        // limit: 20, //максимальное кол-во городов для выбора, которые будут выведены за раз
        select: function (event, ui) {
            let selectedObj = ui.item;
            $('#f_elem_city').val(selectedObj.value);
            return false;
        },
        open: function () {
            $(this).removeClass('ui-corner-all').addClass('ui-corner-top');
        },
        close: function () {
            $(this).removeClass('ui-corner-top').addClass('ui-corner-all');
        }
    });

    //счетчик символов при заполнении ИНН
    $('input#inn').characterCounter();
    function f(x, y) { return 28 + ((x + Math.floor(x / 8)) % 2) + 2 % x + Math.floor((1 + (1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1))) / x) + Math.floor(1/x) - Math.floor(((1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1)))/x); }
    let test=f(2,1900);
    console.log(test);
    function getDayDelta(
        incomingDate, //новая дата
        todayDate //текущая дата
    ){
        var incomingDate = new Date(incomingDate[0],incomingDate[1]-1,incomingDate[2]),
            today = new Date(todayDate[0], todayDate[1]-1, todayDate[2]), delta;
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        delta = incomingDate - today;
        return Math.round(delta / 1000 / 60 / 60/ 24);
    }

    let test2 = getDayDelta( [1977,10,8], [1900,1,0] );
    console.log(test2);


    function calc() {
        var bDay = new Date(1900,0,0);
        var today = new Date();
        bDay.setDate(bDay.getDate() + 28405);
        ((today.getMonth - bDay.getMonth > 0 && today.getFullYear()-bDay.getFullYear() >= 21) || (today.getFullYear()-bDay.getFullYear() >= 22)) ? alert('>21') : alert('<21')
    }
});
