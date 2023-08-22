setImmediate(()=>{ //check
    console.log('setImmediate 실행!')
})

setTimeout(()=>{    //timer
    console.log('setTimeout 실행!')
}, 0)
//event loop 스케줄링 : timer -> pending -> poll -> ... -> check

//event loop랑은 별개로 현재 실행중인 동작이 완료되면 바로 실행
process.nextTick(()=>{
    console.log('nextTick 실행!')
})
