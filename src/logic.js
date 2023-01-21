export const shuffleCards = (arr) => {
    return new Promise((resolve, reject) => {
        console.log("antes del shuffle", arr)
        for(let i = arr.length-1 ; i>0 ;i--){
            let j = Math.floor( Math.random() * (i + 1) ); //random index
            [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
        }
        resolve(arr)
    })
}

export const duplicateCards = (arr) => {
    return new Promise((resolve, reject) => {
        const result = arr.concat(arr)
        console.log(result)
        resolve(result)
    })
}

export const compareCards = () => {
    
}