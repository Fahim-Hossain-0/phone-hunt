const loadPhone = async (searchText,isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json()
  // console.log(data.data)
  displayPhone(data.data,isShowAll)
}
const displayPhone = (phones,isShowAll) => {
  // console.log(phones) 
  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.innerHTML= '';

  const showAllBtn = document.getElementById('show-all-btn')
  
if(phones.length >12 && !isShowAll){
  showAllBtn.classList.remove('hidden')
}
else{
  showAllBtn.classList.add('hidden')
}
if(!isShowAll){
  phones = phones.slice(0,12)
}

  phones.forEach(phone =>{
    // console.log(phone)
    const phoneDiv = document.createElement('div');
    phoneDiv.classList =`card card-compact bg-base-100 w-96 shadow-xl my-16 `;
    phoneDiv.innerHTML = `<figure>
                      <img
                        src="${phone.image}"
                        alt="${phone.image}" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title my-3">${phone.phone_name}</h2>
                      <p>There are many variations of passages of available, but the majority have suffered</p>
                      <div class="card-actions justify-center">
                        <button onclick = "showDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary mt-3">Show Details</button>
                      </div>
                    </div>`;
                    phoneContainer.appendChild(phoneDiv);
  });
  toggleLoadingSpnner(false)
}

const showDetails = async (id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  // console.log(data.data)
  showPhoneDetails(data.data)

}
const showPhoneDetails = (phone)=>{
  show_details_modal.showModal()
  const phoneDetailsContainer = document.getElementById("show_details_modal")
  const phoneDetails = document.createElement('div')
  phoneDetails.classList.add('modal-box')
  phoneDetails.innerHTML = `
  <img src="${phone.image}" alt="" class ="text-center">
  <h3 class="text-lg font-bold mb-2 mt-4">${phone.name}</h3>
      <p class="text-sm font-semibold">Storage:<span>${phone.mainFeatures.storage}</span></p>
      <p class="text-sm font-semibold my-2">Display Size:<span>${phone.mainFeatures.displaySize}</span></p>
      <p class="text-sm font-semibold my-2">Chipset:<span>${phone.mainFeatures.chipSet}</span></p>
      <p class="text-sm font-semibold my-2">Memory:<span>${phone.mainFeatures.memory}</span></p>
      <p class="text-sm font-semibold my-2">Slug:<span>${phone.slug}</span></p>
      <p class="text-sm font-semibold my-2">Release data:<span>${phone?.releaseDate}</span></p>
      <p class="text-sm font-semibold my-2">Brand:<span>${phone.brand}</span></p>
      <p class="text-sm font-semibold my-2">GPS:<span>${phone?.others?.GPS}</span></p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn bg-red-600 text-white">Close</button>
        </form>
      </div>`
  phoneDetailsContainer.appendChild(phoneDetails)
}

const searchPhone = (isShowAll) =>{
  toggleLoadingSpnner(true)
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;
  loadPhone(searchText,isShowAll)
}

const toggleLoadingSpnner =(isLoading)=>{
  const loadingSpinner = document.getElementById("loading-spinner")
  if(isLoading){
    loadingSpinner.classList.remove('hidden')

  }
else{
  loadingSpinner.classList.add('hidden')
}
}

const handleShowAll = () =>{
  searchPhone(true)
}

// const showDetails = (phone) =>{
//   const
// }

loadPhone('apple')
// searchPhone()

// displayPhone()