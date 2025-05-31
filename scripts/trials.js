// const mypromise = new Promise((resolve, reject) =>{
//     const success = false;
//     if(success){
//         resolve("Operation was successful");
//     }else{
//         reject("Operation was unsuccessful");
//     }

// });

// mypromise
//     .then((result)=>{
//         console.log(result);
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
    

// const myPromise = new Promise(function(resolve,reject){
//     const success = true;
//     if(success){
//         resolve("Promise was honored");
//     }else{
//         reject("Promise failed");
//     }
// });

// async function runasync(result){
//     try{
//         const result = await myPromise;
//         console.log(result);

//     }
//     catch(error){
//         console.log(error);
//     }
// }

// runasync()


async function loadData(){
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.error("Error fetching data", error)
    }
}
loadData()