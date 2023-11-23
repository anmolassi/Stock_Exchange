var amendBtn=document.getElementsByClassName("amendBtn");
const number_of_stocks=document.getElementById("number-of-stocks");
const quote_symbol=document.getElementById("quote-symbol");
const quote_cost_unit=document.getElementById("quote-cost-unit");
const quote_sell_cost_unit=document.getElementById("quote-sell-cost-unit");
const quote_total_cost=document.getElementById("quote-total-cost");
const quote_total_brokrage=document.getElementById("quote-total-brokrage");
const quote_total_cost_before=document.getElementById("quote-total-cost-before");
const cancel_btn_qoute_box=document.getElementById("cancel-btn");
const quote_box_container=document.getElementById("quote-box-container");
const quote_order_id=document.getElementById("quote-order-id");
const earning=document.getElementById("earning");
const quote_identifier=document.getElementById("quote-identifier");
var priceFunctionInterval;
for(let i=0;i<amendBtn.length;i++){
    amendBtn[i].addEventListener("click",function(event){
        quote_box_container.style.display="flex";
        number_of_stocks.max=Number(event.target.getAttribute("quantity"));
        number_of_stocks.value=Number(event.target.getAttribute("quantity"));
        quote_symbol.value=event.target.getAttribute("symbol");
        console.log(event.target.getAttribute("symbol"));
        quote_cost_unit.value=parseFloat(Number(event.target.getAttribute("costPerUnit"))).toFixed(2);
        quote_sell_cost_unit.value=parseFloat(Number(event.target.getAttribute("currentCost"))).toFixed(2);
        quote_total_brokrage.value=0.5*number_of_stocks.value;
        quote_total_cost_before.value=parseFloat(Number(quote_sell_cost_unit.value)*Number(number_of_stocks.value)).toFixed(2);
        quote_total_cost.value=parseFloat(Number(quote_total_cost_before.value)-Number(quote_total_brokrage.value)).toFixed(2);
        let x=Number(quote_sell_cost_unit.value)-1-Number(quote_cost_unit.value);
        let investment=parseFloat(x*Number(number_of_stocks.value)).toFixed(2);
        earning.value=investment;
        quote_identifier.value=event.target.getAttribute("identifier");
        quote_order_id.value=event.target.getAttribute("idd");
        priceFunctionInterval=setInterval(priceUpdate,4000,event.target.getAttribute("identifier"));
    })
}
number_of_stocks.addEventListener("input",function(event){
    quote_total_cost_before.value=parseFloat(Number(quote_cost_unit.value)*Number(number_of_stocks.value)).toFixed(2);
    quote_total_cost.value=Number(quote_total_cost_before.value);
    quote_total_brokrage.value=0.5*number_of_stocks.value;
    quote_total_cost.value=Number(quote_total_brokrage.value)+Number(quote_total_cost_before.value);
});
function priceUpdate(identifier){
    $.ajax({
        url: `https://stock-exchange.azurewebsites.net/getCurrentCost/${identifier}`,
        type: "get",
        success: function (data) {
            console.log(data);
            quote_sell_cost_unit.value=parseFloat(Number(data.lastPrice)).toFixed(2);
            quote_total_brokrage.value=0.50*number_of_stocks.value;
            let ab=(data.lastPrice*number_of_stocks.value);
            quote_total_cost_before.value=parseFloat(ab).toFixed(2);
            ab=(data.lastPrice*number_of_stocks.value)-(0.50*number_of_stocks.value);
            quote_total_cost.value=parseFloat(ab).toFixed(2);
            let x=Number(quote_sell_cost_unit.value)-1-Number(quote_cost_unit.value);
            let investment=parseFloat(x*Number(number_of_stocks.value)).toFixed(2);
            earning.value=investment;
        },
        complete: function (data) {
        },
    });
}
cancel_btn_qoute_box.addEventListener("click",function(event){
    event.preventDefault();
    clearInterval(priceFunctionInterval);
    quote_box_container.style.display="none";
})