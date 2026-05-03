const nim2: string = "052168767";
const duaDigitTerakhir: number = parseInt(nim2.slice(-2));
const digitKetigaDariBelakang: number = parseInt(nim2[nim2.length - 3]);
const beda = digitKetigaDariBelakang + 1;

const deret: number[] = [];

for (let i = 0; i <= 10; i ++) {
  deret.push(duaDigitTerakhir + i * beda);
}

console.log(deret.join(", "));