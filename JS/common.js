function convertToJSON(response){
    return response.json();
}

document.getElementById('nav-search-button').addEventListener('click',function (){
    window.location.href="/CRYPTO-TRACKER/search.html";
})

document.getElementById('main-title').addEventListener('click',function(){
    window.location.href='/CRYPTO-TRACKER/index.html';
})
