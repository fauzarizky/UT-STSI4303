var nim2 = "052168767";
var duaDigitTerakhir = parseInt(nim2.slice(-2));
var digitKetigaDariBelakang = parseInt(nim2[nim2.length - 3]);
var beda = digitKetigaDariBelakang + 1;
var deret = [];
for (var i = 0; i <= 10; i++) {
    deret.push(duaDigitTerakhir + i * beda);
}
console.log(deret.join(", "));
