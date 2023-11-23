var deleteUserBtn=document.getElementById('delete-user');
var deleteUserForm=document.getElementById('delete-user-yes-no');
var deleteUserNo=document.getElementById('delete-user-no');
deleteUserBtn.addEventListener('click',function(event){
    event.preventDefault();
    deleteUserForm.style.display="flex";
})
deleteUserNo.addEventListener('click',function(event){
    event.preventDefault();
    deleteUserForm.style.display="none";
})