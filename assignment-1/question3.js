var nim3 = "052168767";
var duaDigitAkhir = parseInt(nim3.slice(-2));
var batas = duaDigitAkhir + 10;
function isPrima(n) {
    if (n < 2)
        return false;
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0)
            return false;
    }
    return true;
}
var prima = [];
for (var i = 1; i <= batas; i++) {
    if (isPrima(i))
        prima.push(i);
}
console.log(prima);
