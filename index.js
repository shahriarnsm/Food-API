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

const loadmeal = async (searchItem) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`
    fetching(url)
}

// Home Page ===================>
const loadmeal2 = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    fetching(url)
}
loadmeal2();
// <================================

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
        <div class="card h-100">
            <img  height="70%" src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${shortInstrustions}</p>
                <button onclick = "loadMealDetail(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                    Details
                </button>
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
    <h4>Catagory: ${meal.strCategory}</h4>
    <h5>Region: ${meal.strArea}</h5>
    <p>${meal.strInstructions}</p> 
        
    <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" width="100%" height="300" style="border:none;">
    </iframe>
    `
    // console.log(meal.strYoutube);
}
// <iframe width="100%" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" frameborder="0" allowfullscreen></iframe>

// <===============================================