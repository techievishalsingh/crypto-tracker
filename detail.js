// https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false

function loaddetail(){
    const url_string = window.location.href;
    const url_obj = new URL(url_string);
    const params =new URLSearchParams(url_obj.search);
    
    if(!params.has('id')){
        window.location.href='/';
    }
    fetch('https://api.coingecko.com/api/v3/coins/'+params.get('id')+'?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
    
    .then(convertToJSON)
    .then(render);

    fetch('https://api.coingecko.com/api/v3/coins/'+params.get('id')+'/market_chart?vs_currency=inr&days=30&interval=daily')
    .then(convertToJSON)
    .then(renderChart);
}

function render(data){
    //  console.log(data);
    const name= `${data.name} (${data.symbol.toUpperCase()})`;
    const description= data.description.en;
    const inr=data.market_data.current_price.inr;
    const usd=data.market_data.current_price.usd;
    const eur=data.market_data.current_price.eur;
    const gbp=data.market_data.current_price.gbp;
    const logo=data.image.large;

    document.getElementById('coin-name-detail').innerHTML=name;
    document.getElementById('coin-description-detail').innerHTML=description;
    document.getElementById("logo-image").src=logo;

    document.getElementById("inr-price").innerHTML=inr;
    document.getElementById("usd-price").innerHTML=usd;
    document.getElementById("eur-price").innerHTML=eur;
    document.getElementById("gbp-price").innerHTML=gbp;
}

window.onload= function(){
    loaddetail();
    // renderChart();
}


// For Price History part

function renderChart(data){
  // console.log(data);
  const prices =data.prices;
  // console.log(prices);
  const timestamps=[];
  const price_inr=[];

  for(let i=0;i<prices.length;i++){
    const single_price=prices[i];
 //specifying the date and month from timestamp
    const date_obj= new Date(single_price[0]);
     console.log(date_obj);
    const date_coin= date_obj.getDate();
    // console.log(day);
    const month=date_obj.getMonth();
    let time_Hour=date_obj.getHours();//to get hours
    let time_minutes=date_obj.getMinutes();

    if(time_Hour<10){
      time_Hour = "0" + time_Hour;
    }
    if(time_minutes<10){
      time_Hour = "0" + time_minutes;
    }//this if statement of hour and minutes is given if the value is
    //less than 10 then we append 0 before so it look in more formated way
 //End of specifying date time etc;
    timestamps.push(`${date_coin}/${month}/${time_Hour}:${time_minutes}`);
    price_inr.push(single_price[1]);
  }

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: timestamps,
      datasets: [{
      label: 'Price (In INR)',
      data: price_inr,
      borderWidth: 1,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.26, //describes the curve of the chart
    }]
  },
  options: {
    plugins: {
      legend:{
        display:false,
      }
    }
  }
});
}



// This is for the api of bar chat
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=1&interval=daily

