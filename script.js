const loadData=async(searchText,dataLimit)=>{
    const url=` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res=await fetch(url)
    const data=await res.json()
    displyData(data.data,dataLimit);
    

}


const displyData=(phones,dataLimit)=>{
    const phoneContainer=document.getElementById('phone-container');
    phoneContainer.textContent="";
    //show 10 phone display
    const showBtn =document.getElementById('show-btn');
    if(dataLimit && phones.length>10){
        phones=phones.slice(0,10);
        showBtn.classList.remove('d-none')
    }
    else{
        showBtn.classList.add('d-none');
    }

    
    //watnig massage
    const warningMassage=document.getElementById('no-found-massage');
    if(phones.length===0){
        warningMassage.classList.remove('d-none');
    }
    else{
        warningMassage.classList.add('d-none')
    }
    phones.forEach(phones => {
        const createDiv=document.createElement('div');
        createDiv.classList.add('col')
        createDiv.innerHTML=`
        <div class="col">
            <div class="card">
                <img src="${phones.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h4>${phones.brand}</h4>
                    <h5 class="card-title">${phones.phone_name}</h5>
                    <p class="card-text"> ${phones.slug}</p>
                </div>
            </div>
        </div>
    `;
        phoneContainer.appendChild(createDiv);
        });
    toggleSpiner(false);
}
const processSeaerch=(dataLimit)=>{
    toggleSpiner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    loadData(searchText,dataLimit)
}
document.getElementById('search-btn').addEventListener('click',function(){

    // loading toggle 
    processSeaerch(10);
    
})

const toggleSpiner=isLoading=>{
    const loderSection=document.getElementById('loder');
    if(isLoading){
        loderSection.classList.remove('d-none')
    }
    else{
        loderSection.classList.add('d-none')
    }
}
document.getElementById('show-all-btn').addEventListener('click',function(){
    processSeaerch();
})

loadData();