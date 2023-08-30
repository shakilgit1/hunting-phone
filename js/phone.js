const loadPhone = async (searchText='13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}; 

const displayPhones = (phones, isShowAll) =>{
    //  console.log(phones);
        // step 1
    const phoneContainer = document.getElementById('phone-container');
    // clearing before searching content 
    phoneContainer.textContent = '';
    
    // condition show all button 
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show all', isShowAll);
    // display only first 12 phones if not press show all button
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        // console.log(phone);
        //step 2
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
        //step 3
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick ="showDetails('${phone.slug}')" class="btn btn-primary">show details</button>
          </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard); 
    });
    // hide loading 
    toggleLoadingSpinner(false);

};

// step 4
// handle Search
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// show all handler 
const showAll = () =>{
    handleSearch(true);
}

// show details button
const showDetails = async (id) =>{
    // console.log('show clicked', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone);
    showModal(phone);

};

// default calling
loadPhone();

// show modal
const showModal = (phone) =>{
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>Gps:</span>${phone?.others?.GPS || 'No Gps'}</p>
    <p><span>Gps:</span>${phone?.others?.GPS? phone.others.GPS : 'No Gps'}</p>
    `
    // show the modal
    show_details_modal.showModal();
};

