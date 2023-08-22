let i =1
setInterval(()=>{
    console.log(i)
    i+=1
    if(i===5){
        process.exit()
    }
},1000)