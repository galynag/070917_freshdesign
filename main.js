/**
 * Created by Galina on 07.09.2017.
 */
$(document).ready(function () {
    var userForm = {};//массив с введеными данными от пользователя


    //подгрузка щаблона навигационной панели на все страницы к тегу nav
    $('nav').load('templates/nav.html');
    $.getJSON(
      'testdata.json',
        function (data) {
            let testData = data;
            $('#sum').val(testData.sum);
            $('#deadline').val(testData.deadline);
            $('#range-sum').val(testData.sum);
            $('#range-deadline').val(testData.deadline);
            $('#inn').val(testData.inn);
            $('#surname').val(testData.surname);
            $('#name').val(testData.name);
            $('#f_elem_city').val(testData.city);
            userForm = {
                sum : testData.sum,
                deadline : testData.deadline,
                inn : testData.inn,
                surname : testData.surname,
                name : testData.name,
                city : testData.city
            };
            console.log(userForm);
            btnNext1();
            btnNext2();
        }
    );
    //проверка данных при потере фокуса с полей формы (blur())
    $('#sum').blur(function (eventObject) {
        if (eventObject.currentTarget.value >= 1 && eventObject.currentTarget.value <= 10000) {
            if (userForm.sum != eventObject.currentTarget.value) {
                userForm.sum = eventObject.currentTarget.value;
                console.log(userForm.sum);
                console.log(eventObject)
            }
            return true;
        } else {
            $('#sum').val("");
            $('label').attr({"class":"active"});//пришлось везде вставлять, т.к. слетала активность лейбла
            $('#sum').attr({"placeholder":"Нужно указать число от 1 до 10 000"});
            $('#btn1-next').attr({"disabled":"disabled"})
            return false;
        }
    });
    $('#deadline').blur(function (eventObject) {
        if (eventObject.currentTarget.value >= 1 && eventObject.currentTarget.value <= 12) {
            if (userForm.deadline != eventObject.currentTarget.value) {
                userForm.deadline = eventObject.currentTarget.value;
            }
            return true;
        } else {
            $('#deadline').val("");
            $('label').attr({"class":"active"});
            $('#deadline').attr({"placeholder":"Нужно указать число от 1 до 12"});
            $('#btn1-next').attr({"disabled":"disabled"})
            return false;
        }
    });
    $('#inn').blur(function (eventObject) {
        console.log(eventObject);
        calc();
        if (userForm.age === 0) {
            $('#inn').val("");
            $('#inn').attr({"placeholder": "Запрет. Вам еще нет 21 года"});
            return false;
        }
        else if (eventObject.currentTarget.value.length == 10 && userForm.age === 1) {
            if (userForm.inn != eventObject.currentTarget.value) {
                userForm.inn = eventObject.currentTarget.value;
            }
            return true;
        } else {
            $('#inn').attr({"placeholder":"Укажите все 10 символов ИНН"});
            $('#inn').val("");
            $('label').attr({"class":"active"});
            $('#btn2-next').attr({"disabled":"disabled"});
            return false;
        }
    });
    //заполнение полей sum, deadline выбранным значениием в range-field
    //+ если значение в массиве с данными пользователя отличаются, - изменение значений в массиве соответствующих данных
    $('#range-sum').change(function (eventObject) {
        $('#sum').val(eventObject.currentTarget.value);
        if (userForm.sum != eventObject.currentTarget.value) {
            userForm.sum = eventObject.currentTarget.value;
        }
        btnNext1();
    });
    $('#range-deadline').change(function (eventObject) {
        $('#deadline').val(eventObject.currentTarget.value);
        if (userForm.deadline != eventObject.currentTarget.value) {
            userForm.deadline = eventObject.currentTarget.value;
        }
        btnNext1();
    });

    //установка доступности перехода на слудующую форму
    //для шага1
    function btnNext1() {($('#deadline').val() == " " || $('#sum').val() == " ") ? $('#btn1-next').attr({"disabled":"disabled"}): $('#btn1-next').removeAttr("disabled");};
    $('#deadline').change(btnNext1);
    $('#sum').change(btnNext1);
    //для шага2
    function btnNext2() {($('#inn').val() === " " || $('#surname').val() === " " || $('#name').val() === " "|| $('#f_elem_city').val() === " ") ? $('#btn2-next').attr({"disabled":"disabled"}): $('#btn2-next').removeAttr("disabled");};
    $('#inn').change(btnNext2);
    $('#surname').change(btnNext2);
    $('#name').change(btnNext2);
    $('#f_elem_city').change(btnNext2);

    //отправка формы
    $('#btn-submit').click(function() {
        $.ajax({
            type: "POST",
            url: ('form.php'),
            success: function () {
                alert('Форма отправлена.');
            },
            error: function () {
                alert('Ошибка. Форма НЕ отправлена.');
            },
        })
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

    //определение совершенолетия пользователя
    function calc(){
        let bDay = new Date(1900,0,0);
        let today = new Date();
        let innDate = $('#inn').val().slice(0,5);
        console.log(parseInt(innDate));
        bDay.setDate(bDay.getDate() + parseInt(innDate));
        //вычисляем сколько пользователю лет исходя из данных о ИНН, результат фиксируем в массиве с данными пользователя в userForm.age
        ((today.getMonth - bDay.getMonth > 0 && today.getFullYear()-bDay.getFullYear() >= 21) || (today.getFullYear()-bDay.getFullYear() >= 22)) ? userForm.age=1 : userForm.age=0;
        console.log(userForm.age)
    };

    //Заполнение формы на шаге3
    function loadForm() {
        console.log(userForm);
        $(`
            <input disabled name="sum" value="Сумма: ${userForm.sum}">
            <input disabled name="deadline" value="Срок: ${userForm.deadline}">
            <input disabled name="inn" value="ИНН: ${userForm.inn}">
            <input disabled name="surname" value="Фамилия: ${userForm.surname}">
            <input disabled name="name" value="Имя: ${userForm.name}">
            <input disabled name="city" value="Город: ${userForm.city}">`).appendTo('#user-form');
    };
    $('#downloadUserData').click(loadForm);

});
