function luhnSumDoubleFromRight(num: string): number {
  let sum = 0;
  let dbl = true; // CMS: double alternate digits beginning with the rightmost digit

  for (let i = num.length - 1; i >= 0; i--) {
    const d = num.charCodeAt(i) - 48;
    if (d < 0 || d > 9) return NaN;

    let x = d;
    if (dbl) {
      x = x * 2;
      if (x > 9) x -= 9;
    }
    sum += x;
    dbl = !dbl;
  }
  return sum;
}

function expectedNpiCheckDigit(base9: string): number | null {
  if (!/^\d{9}$/.test(base9)) return null;
  const total = 24 + luhnSumDoubleFromRight(base9); // CMS constant for 80840
  return (10 - (total % 10)) % 10;
}

export function isValidNpi(npi10: string): boolean {
  if (!/^\d{10}$/.test(npi10)) return false;
  const base9 = npi10.slice(0, 9);
  const claimed = npi10.charCodeAt(9) - 48;
  const expected = expectedNpiCheckDigit(base9);
  console.log('expected:', expected, 'claimed:', claimed);
  return expected !== null && expected === claimed;
}
