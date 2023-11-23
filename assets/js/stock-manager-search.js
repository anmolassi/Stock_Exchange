const search_stock=document.getElementById("search-stock");
var main_container=document.getElementById("main-container");
const stock_info_box_original_array=main_container.innerHTML;
const stock_info_box=document.getElementsByClassName("stock-info-box");
const quote_box_container=document.getElementById("quote-box-container");
const number_of_stocks=document.getElementById("number-of-stocks");
const quote_symbol=document.getElementById("quote-symbol");
const quote_cost_unit=document.getElementById("quote-cost-unit");
const quote_total_cost=document.getElementById("quote-total-cost");
const quote_total_brokrage=document.getElementById("quote-total-brokrage");
const quote_total_cost_before=document.getElementById("quote-total-cost-before");
const cancel_btn_qoute_box=document.getElementById("cancel-btn");
const purchase_form=document.getElementById("purchase-form");
const quote_identifier=document.getElementById("quote-identifier");
var priceFunctionInterval;
number_of_stocks.addEventListener("input",function(event){
    quote_total_brokrage.value=Number(0.50*number_of_stocks.value);
    let a=parseFloat(Number(quote_cost_unit.value*number_of_stocks.value)).toFixed(2);
    quote_total_cost_before.value=parseFloat(a).toFixed(2);
    a=parseFloat(Number(quote_cost_unit.value*number_of_stocks.value)+Number(0.50*number_of_stocks.value)).toFixed(2);
    quote_total_cost.value=parseFloat(a).toFixed(2);
    // quote_identifier.value=event.target.parentNode.getAttribute("identifier");
    //purchase_form.action=`/placeorder/${event.target.parentNode.getAttribute("identifier")}`
})
search_stock.addEventListener("input",function(event){
    quote_box_container.style.display="none";
    if(search_stock.value==""){
        main_container.innerHTML=stock_info_box_original_array;
    }else{
        let search_value_from_search_box=search_stock.value;
        let regex = new RegExp(search_value_from_search_box, 'gi');
        var str="";
        main_container.innerHTML=stock_info_box_original_array;
        for(let i=0;i<stock_info_box.length;i++){
            if(stock_info_box[i].getAttribute("symbol").match(regex)){
                console.log(stock_info_box[i]);
                str+=(stock_info_box[i].outerHTML);
            }
        }
        main_container.innerHTML="";
        main_container.innerHTML=str;
    }
});
$("#main-container").delegate(".stock-info-box","click",function(event){
    if(event.target.parentNode.getAttribute("identifier")){
        quote_box_container.style.display="flex";
        number_of_stocks.value=1;
        quote_cost_unit.value=event.target.parentNode.getAttribute("lastPrice");
        quote_total_cost_before.value=event.target.parentNode.getAttribute("lastPrice");
        quote_total_cost.value=Number(event.target.parentNode.getAttribute("lastPrice"))+0.50;
        quote_symbol.value=event.target.parentNode.getAttribute("symbol");
        console.log(event.target.parentNode.getAttribute("identifier"));
        quote_identifier.value=event.target.parentNode.getAttribute("identifier");
        priceFunctionInterval=setInterval(priceUpdate,4000,event.target.parentNode.getAttribute("identifier"));
    }
})
function priceUpdate(identifier){
    $.ajax({
        url: `https://stock-exchange.azurewebsites.net/getCurrentCost/${identifier}`,
        type: "get",
        // beforeSend: function () {
        // // $("#quote-symbol").innerHTML="";
        // // $("#quote-cost-unit").innerHTML="";
        // // $("#quote-total-cost").innerHTML="";
        // },
        success: function (data) {
            console.log(data);
            quote_symbol.value=data.symbol;
            quote_cost_unit.value=data.lastPrice;
            quote_total_brokrage.value=0.50*number_of_stocks.value;
            let ab=(data.lastPrice*number_of_stocks.value);
            quote_total_cost_before.value=parseFloat(ab).toFixed(2);
            ab=(0.50*number_of_stocks.value)+(data.lastPrice*number_of_stocks.value);
            quote_total_cost.value=parseFloat(ab).toFixed(2);
            // quote_identifier.value=identifier;
            //purchase_form.action=`/placeorder/${identifier}`
        },
        complete: function (data) {
        },
    });
}
cancel_btn_qoute_box.addEventListener("click",function(event){
    event.preventDefault();
    clearInterval(priceFunctionInterval);
    quote_box_container.style.display="none";
    //purchase_form.action=`/placeorder`;
})