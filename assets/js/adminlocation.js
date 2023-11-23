var deleteIPAdressBtn=document.getElementsByClassName('ip-address-delete-link');
var deleteUserForm=document.getElementById('delete-user-yes-no');
var deleteUserNo=document.getElementById('delete-user-no');
var deleteUserYes=document.getElementById('delete-user-yes');
var ipaddress_display=document.getElementById('ipaddress-display');
var addipformbtn=document.getElementById("add-ip-form-btn");
var addipform=document.getElementById("add-ip-form");
var addlocationcancel=document.getElementById("add-location-cancel");
var addlocationconfirm=document.getElementById("add-location-confirm");
var write_IP_Address=document.getElementById("write_IP_Address");
for (var i = 0; i < deleteIPAdressBtn.length; i++) {
    deleteIPAdressBtn[i].addEventListener('click',function(event){
        event.preventDefault();
        console.log(this);
        const ipaddress=this.getAttribute("ipaddress");
        ipaddress_display.innerHTML=ipaddress;
        deleteUserYes.href=`/admin/deleteLocation/${ipaddress}`;
        deleteUserForm.style.display="flex";
    })
}
deleteUserNo.addEventListener('click',function(event){
    event.preventDefault();
    deleteUserForm.style.display="none";
})
addipformbtn.addEventListener('click',function(event){
    event.preventDefault();
    addipform.style.display="flex";
})
addlocationcancel.addEventListener('click',function(event){
    event.preventDefault();
    addipform.style.display="none";
})
write_IP_Address.addEventListener('change',function(){
    addlocationconfirm.href=`/admin/addlocation/${write_IP_Address.value}`;
})