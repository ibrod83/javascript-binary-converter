export function isNumeric(n:any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  export function isNumericString(n:any) {
    return !isNaN(parseFloat(n)) && isFinite(n) && typeof n === 'string';
  }

  export function isFloat(number:number){
   return  typeof number === 'number' && !Number.isInteger(number)
  }

  export function isBigInt(number:number|bigint){
    return typeof number === 'bigint' || (number > 4294967295 || number < -2147483647)
  }

  export function getClosestDividable(divided:number, divisor:number){
    let modulo =divided % divisor;
    while(modulo !== 0){       
        divided++
        modulo =  divided % divisor
    }
    return divided;
}
