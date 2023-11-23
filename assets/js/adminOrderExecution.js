var amendBtn=document.getElementsByClassName("amendBtn");
const number_of_stocks=document.getElementById("number-of-stocks");
const quote_symbol=document.getElementById("quote-symbol");
const quote_cost_unit=document.getElementById("quote-cost-unit");
const quote_total_cost=document.getElementById("quote-total-cost");
const quote_total_brokrage=document.getElementById("quote-total-brokrage");
const quote_total_cost_before=document.getElementById("quote-total-cost-before");
const cancel_btn_qoute_box=document.getElementById("cancel-btn");
const cancel_btn_qoute_box_2=document.getElementById("cancel-btn-2");
const quote_box_container=document.getElementById("quote-box-container");
const quote_box_container_2=document.getElementById("quote-box-container-2");
const quote_order_id=document.getElementById("quote-order-id");
const quote_order_id_2=document.getElementById("quote-order-id-2");
const quote_identifier=document.getElementById("quote-identifier");
const delete_btn=document.getElementsByClassName("delete-btn");
for(let i=0;i<amendBtn.length;i++){
    amendBtn[i].addEventListener("click",function(event){
        quote_box_container.style.display="flex";
        number_of_stocks.max=Number(event.target.getAttribute("quantity"));
        number_of_stocks.value=Number(event.target.getAttribute("quantity"));
        quote_symbol.value=event.target.getAttribute("symbol");
        console.log(quote_symbol.value);
        quote_cost_unit.value=parseFloat(Number(event.target.getAttribute("costPerUnit"))).toFixed(2);
        quote_total_brokrage.value=0.5*number_of_stocks.value;
        quote_total_cost_before.value=parseFloat(Number(quote_cost_unit.value)*Number(number_of_stocks.value)).toFixed(2);
        quote_total_cost.value=parseFloat(Number(event.target.getAttribute("totalCost"))).toFixed(2);
        quote_order_id.value=event.target.getAttribute("idd");
        quote_identifier.value=event.target.getAttribute("identifier");
    })
}
number_of_stocks.addEventListener("input",function(event){
    quote_total_cost_before.value=parseFloat(Number(quote_cost_unit.value)*Number(number_of_stocks.value)).toFixed(2);
    quote_total_cost.value=Number(quote_total_cost_before.value);
    quote_total_brokrage.value=0.5*number_of_stocks.value;
    quote_total_cost.value=Number(quote_total_brokrage.value)+Number(quote_total_cost_before.value);
});
cancel_btn_qoute_box.addEventListener("click",function(event){
    event.preventDefault();
    quote_box_container.style.display="none";
})
cancel_btn_qoute_box_2.addEventListener("click",function(event){
    event.preventDefault();
    quote_box_container_2.style.display="none";
})
for(let i=0;i<delete_btn.length;i++){
    delete_btn[i].addEventListener("click",function(event){
        quote_box_container_2.style.display="flex";
        console.log("kkkkk");
        quote_order_id_2.value=event.target.getAttribute("idd");
    })
}