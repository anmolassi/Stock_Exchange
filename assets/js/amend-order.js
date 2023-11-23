var amendBtn=document.getElementsByClassName("amendBtn");
const number_of_stocks=document.getElementById("number-of-stocks");
const quote_symbol=document.getElementById("quote-symbol");
const quote_cost_unit=document.getElementById("quote-cost-unit");
const quote_total_cost=document.getElementById("quote-total-cost");
const quote_total_brokrage=document.getElementById("quote-total-brokrage");
const quote_total_cost_before=document.getElementById("quote-total-cost-before");
const cancel_btn_qoute_box=document.getElementById("cancel-btn");
const quote_box_container=document.getElementById("quote-box-container");
const quote_order_id=document.getElementById("quote-order-id");
for(let i=0;i<amendBtn.length;i++){
    amendBtn[i].addEventListener("click",function(event){
        quote_box_container.style.display="flex";
        //number_of_stocks.max=Number(event.target.getAttribute("quantity"))-1;
        number_of_stocks.value=Number(event.target.getAttribute("quantity"));
        quote_symbol.value=event.target.getAttribute("symbol");
        quote_cost_unit.value=parseFloat(Number(event.target.getAttribute("costPerUnit"))).toFixed(2);
        quote_total_brokrage.value=0.5*number_of_stocks.value;
        quote_total_cost_before.value=parseFloat(Number(quote_cost_unit.value)*Number(number_of_stocks.value)).toFixed(2);
        quote_total_cost.value=parseFloat(Number(quote_total_brokrage.value)+Number(quote_total_cost_before.value)).toFixed(2);
        quote_order_id.value=event.target.getAttribute("idd");
    })
}
number_of_stocks.addEventListener("input",function(event){
    quote_total_cost_before.value=parseFloat(Number(quote_cost_unit.value)*Number(number_of_stocks.value)).toFixed(2);
    // quote_total_cost.value=Number(quote_total_cost_before.value);
    quote_total_brokrage.value=0.5*number_of_stocks.value;
    quote_total_cost.value=parseFloat(Number(quote_total_brokrage.value)+Number(quote_total_cost_before.value)).toFixed(2);
});
cancel_btn_qoute_box.addEventListener("click",function(event){
    event.preventDefault();
    quote_box_container.style.display="none";
})