/**
 * Created by Galina on 07.09.2017.
 */
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