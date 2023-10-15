const fetching = async (url) =>{
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMeals(data.meals))
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayMeals(data.meals);
    }
    catch(error){
        console.log(error);
    }
    
}



// Home Page ===================>
const loadmeal2 = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    fetching(url)
}

loadmeal2();
// <================================


const loadmeal = async (searchItem) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`
    fetching(url);
}

const displayMeals = meals => {
    // console.log(meals);
    // Make a container 
    const mealContainer = document.getElementById('meals-container')
    mealContainer.innerHTML = '';
    meals.forEach(meal => {
        // console.log(meal.idMeal);

        // Create Childe for each element 
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col')

        // set content of the child elements 
        const shortInstrustions = meal.strInstructions.slice(0, 200) + '...';
        mealDiv.innerHTML = `
        <div class="card mb-5 border-light shadow-lg " style="width:558px ; height: 300px">
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="${meal.strMealThumb}" class="img-fluid rounded-start-3" style="width: 300px; height: 300px" alt="...">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                    <h5 class="card-title d-flex align-items-center food-name">${meal.strMeal}</h5>
                    <p class="card-text d-flex align-items-center food-des justified-text">
                    ${shortInstrustions} <br>
                    </p>
                    <button onclick = "loadMealDetail(${meal.idMeal})" type="button" class="btn-detail" data-bs-toggle="modal" data-bs-target="#mealDetails">
                        View Details
                    </button>
                    </div>
                </div>
            </div>
        </div>
            `

        mealContainer.appendChild(mealDiv);
    })

}



const searchMeal = () =>{
    const searchText = document.getElementById('search-field').value;
    // console.log(searchText);
    loadmeal(searchText);


    // Clear the input field
    document.getElementById('search-field').value = '';
}





// Modal Content =============================>
// const loadMealDetail = idMeal => {
//     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
//     fetch (url)
//     .then (res => res.json())
//     .then (data => displaymealDetails(data.meals[0]))
//     console.log(idMeal);
// }

const loadMealDetail = async(idMeal) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displaymealDetails(data.meals[0]);
    }
    catch(error){
        console.log(error);
    }
}

const displaymealDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealdetailbody = document.getElementById('mealDetailsBody');
    mealdetailbody.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" width="100%" height="450" style="border:none;">
    </iframe>
    <h2 class= "m-name py-2"><span class="cat">Catagory : </span>${meal.strCategory}</h2>
    <h5 class= "m-name py-2"> <span class="cat">Region : </span>${meal.strArea}</h5>
    <p class="justified-text m-name"> <span class="cat">Instructions : </span>${meal.strInstructions}</p> 
        
    `
    // console.log(meal.strYoutube);
}
// <iframe width="100%" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" frameborder="0" allowfullscreen></iframe>

// <===============================================

document.getElementById("reload").addEventListener("click", function() {
    location.reload(); // Reload the page
});