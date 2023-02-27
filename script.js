const loadData=async(searchText,dataLimit)=>{
    const url=` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res=await fetch(url)
    const data=await res.json()
    displyData(data.data,dataLimit);
    // console.log(data.data);
    

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
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button onclick="loadPhoneDetails('${phones.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
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

//search btn handler
document.getElementById('search-btn').addEventListener('click',function(){

    // loading toggle 
    processSeaerch(10);
    
})

// search field handle to Enter key 
document.getElementById("search-field").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        processSeaerch(10);
    }
});

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

const loadPhoneDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails=(phone)=>{
    console.log(phone)
    const modalTitle=document.getElementById('exampleModalLabel');
    modalTitle.innerText=phone.name;
    const phoneDetails=document.getElementById('phone-details');
    phoneDetails.innerHTML=`
    <P>Storage : '${phone.mainFeatures.storage ?phone.mainFeatures.storage :"no storge memory"}'</p>
    <p>ReleaseDate : ${phone.releaseDate}</p>
    <img src="${phone.image}" alt="">
    <p>Brand: ${phone.brand}</p>
    `
}
loadData('apple');