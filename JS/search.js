 function searchdata() {
    const CurrentURl =window.location.href;
    const url_obj= new URL(CurrentURl);
    const params = new URLSearchParams(url_obj.search);
    if(!params.has("q")){
        return;
    }
document.getElementsByName("q")[0].value =params.get('q');
// console.log(document.getElementsByName('q'));
fetch('https://api.coingecko.com/api/v3/search?query='+ params.get('q'))
.then(convertToJSON)
.then(render);


}
function render(data){
    //  console.log(data.coins);
    for(let i=0;i < data.coins.length;i++){
        const singlecoins=data.coins[i];
        console.log(singlecoins);
        const index=i+1;
        const logo=singlecoins.thumb;
        const name= singlecoins.name;
        const symbol=singlecoins.symbol;
        const coinID=singlecoins.id;
        create_single_card(index,logo,name,symbol,coinID);
    }
}

function create_single_card(index,logo,name,symbol,coinID){

    if(index < 10){
        index=index + "&nbsp;&nbsp";
    }

    const card_para =document.createElement("p");
    card_para.innerHTML=index;

    const card_img =document.createElement("img");
    card_img.src=logo;
    card_img.alt="Coin image"

    const card_h_name =document.createElement("h3");
    card_h_name.innerHTML=name;

    const card_symbol_name =document.createElement("h3");
    card_symbol_name.innerHTML=symbol;

    const card_info =document.createElement("a")
    card_info.innerHTML="More Info";
    card_info.href='../detail.html?id=' + coinID;

    const search_result_card =document.createElement("div");
    search_result_card.classList.add('single-search-result','card');
    search_result_card.appendChild(card_para);
    search_result_card.appendChild(card_img);
    search_result_card.appendChild(card_h_name);
    search_result_card.appendChild(card_symbol_name);
    search_result_card.appendChild(card_info);

   document.getElementById("search-results").appendChild(search_result_card);
    // <div class="single-search-result card">
    //           <p>1</p>
    //           <img src="/assets/Images/logo.png" alt="coin image" srcset="">
    //           <h3>Bitcoin</h3>
    //           <h3>BTC</h3>
    //           <button>More Info</button>
    //       </div>
}

window.onload =function(){
    searchdata()
}