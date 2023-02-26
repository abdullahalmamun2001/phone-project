const loadData=async(searchText)=>{
    const url=` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res=await fetch(url)
    const data=await res.json()
    displyData(data.data);
    

}

const displyData=(phones)=>{
    const phoneContainer=document.getElementById('phone-container');
    phoneContainer.textContent="";
    phones=phones.slice(0,20);

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
document.getElementById('search-btn').addEventListener('click',function(){

    // loading toggle 
    toggleSpiner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    loadData(searchText)
    
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

loadData();