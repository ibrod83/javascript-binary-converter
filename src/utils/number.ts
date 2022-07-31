export function isNumeric(n:any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  export function isNumericString(n:any) {
    return !isNaN(parseFloat(n)) && isFinite(n) && typeof n === 'string';
  }