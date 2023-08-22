const {odd, even} = require('./var') // 현재 폴더의 var.js 모듈 가져다가 쓰겠다!

function checkOddOrEven(num){
    if(num%2===1){
        // 홀수입니다 => var (odd)
        return odd
    }else{
        // 짝수입니다 => var (even)
        return even
    }
}
module.exports = checkOddOrEven