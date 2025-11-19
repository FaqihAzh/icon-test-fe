const fibonacci = (n) => {
  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

console.log(fibonacci(10)> "Fibonacci 10");

const bestProfit = (prices) => {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];
    const profit = currentPrice - minPrice;
    if (profit > maxProfit) maxProfit = profit;
    if (currentPrice < minPrice) minPrice = currentPrice;
  }

  return maxProfit;
}

// Soal
console.log(bestProfit([7, 8, 3, 10, 8]), "Keuntungan Saham Terbaik"); 
console.log(bestProfit([5, 12, 11, 12, 10]), "Keuntungan Saham Terbaik");
console.log(bestProfit([7, 18, 27, 10, 29]), "Keuntungan Saham Terbaik"); 
console.log(bestProfit([20, 17, 15, 14, 10]), "Keuntungan Saham Terbaik");

const countNumbers = (arr) => {
  return arr.filter(item => typeof item === 'number').length;
}

// Soal
console.log(countNumbers(['b', 7, 'h', 6, 'h', 'k', 'i', 5, 'g', 7, 8]), "Jumlah Angka"); 
console.log(countNumbers([7, 'b', 8, 5, 6, 9, 'n', 'f', 'y', 6, 9]), "Jumlah Angka"); 
console.log(countNumbers(['u', 'h', 'b', 'n', 7, 6, 5, 1, 'g', 7, 9]), "Jumlah Angka");