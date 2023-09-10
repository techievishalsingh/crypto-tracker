
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr
// https://api.coingecko.com/api/v3/search/trending


function loadcoindata(data){
    const conversionrate =data.bitcoin.inr;
    fetch('https://api.coingecko.com/api/v3/search/trending')
    .then(convertToJSON)
    .then(function(data){
        render(data,conversionrate);
    })
    
}

// This is the window loader function when the window is loaded it will work
function windowloader(){
    // alert("This window is loaded") 
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr')
    .then(convertToJSON)
    .then(loadcoindata);
}
function render(coindata,conversionrate){
    for(let i=0;i<coindata.coins.length;i++){
        const singlecoin= coindata.coins[i].item;
        // console.log(singlecoin);
        const logo=singlecoin.thumb;//Giving this name as you can see .thumb .name .symbol it is already in the backend i.e in the api we are just calling it you can see doing consol.log(coindata)
        const name=`${singlecoin.name} (${singlecoin.symbol})`;
        const price=Math.round(singlecoin.price_btc*conversionrate*10000)/10000;
        // console.log(name,price,logo)
         insertcryptocard(name,price,logo);

    }
    // console.log(coindata,conversionrate);
}

//Here we are manipulating the dom i.e we are removing the html that we created there which is the displaying of the card in transition and replacing with creating that same thing through javascript 

function insertcryptocard(name,price,thumb){
    const price_para =document.createElement('p');
    price_para.innerText=`₹ ${price}`;//here i have got an error where i use () instead of = and the error says it is not a function so remember it further

    const name_head = document.createElement('h1');
    name_head.innerText=name;

    const right_container =document.createElement('div');
    right_container.classList.add('f-left');
    right_container.appendChild(name_head);
    right_container.appendChild(price_para);

    const image_elem =document.createElement('img');
    image_elem.src=thumb;
    image_elem.classList.add('f-left','card-image');
    image_elem.alt="coins image";

    const card_container=document.createElement('div');
    card_container.classList.add('flex-item-small', 'card');
    card_container.appendChild(image_elem);
    card_container.appendChild(right_container);

    document.getElementById("coins_container").appendChild(card_container);
}
// {/* <div class="flex-item-small card">
//               <img class="f-left card-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt="bitcoin image" srcset="">
//               <div class="f-left">
//                 <h1>Bitcoin (BTC) </h1>
//                 <p>₹ 48,49030</p>
//               </div> */}

window.onload=function(){
    windowloader();//windowloader() function is passed in this function so to not create confusion
}