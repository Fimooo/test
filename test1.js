
//200
//23,45,23,100,50,200

function bag(money,arr){
    let count = 0;
    arr.sort((a,b)=>(a-b));
    for(let i = 0; i < arr.length; i++){
        count += arr[i];
        if(count > money){
            return ( count - arr[i] )
        }
    }
}
console.log(bag(180,[50,42,9,15,105,63,14,30]))