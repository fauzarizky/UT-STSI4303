var nim = "052168767";
var tinggi = parseInt(nim.slice(-1));
for (var i = 1; i <= tinggi; i++) {
    var baris = "";
    for (var j = 1; j <= i; j++) {
        baris += j + " ";
    }
    console.log(baris);
}
