const searchEl = document.getElementById("search-txt");
const mealsEl = document.getElementById("meals");
const favMealsEl = document.getElementById("fav-meals");
const searchTermEl = document.getElementById("search-term");
const serachBtnEl = document.getElementById("serach-btn");
const mealPopupEl = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const closePopupEl = document.getElementById("close-popup");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal(){
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

function addMeal(mealData, random = false) {
    console.log(mealData);

    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        ${ random ? `
        <h4>Recipe of the Day</h4>` : ``}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <div class="meal-title">
            <span>${mealData.strMeal}</span>
            <button class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>
    `;

    const btn = meal.querySelector(".fav-btn");
    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active")
        }  else {
            addMealLS(mealData.idMeal)
            btn.classList.add("active")
        }

        fetchFavMeals();
    });

    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();
    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId )));
}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
}




async function getMealById(id){
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );
    const respData = await resp.json();
    const meal = respData.meals[0];
    
    return meal;
}

async function fetchFavMeals() {
    favMealsEl.innerHTML = "";

    const mealIds = getMealsLS();
    for (let i=0; i < mealIds.length ; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealFav(meal);
    }

}

function addMealFav(mealData) {
    const favMeal = document.createElement("li");
    favMeal.innerHTML = `
        <img 
            src="${mealData.strMealThumb}" 
            alt="${mealData.strMeal}">
        <button class="clear">
            <i class="fas fa-window-close"></i>
        </button>
        <span>${mealData.strMeal}</span>
    `;

    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });
    
    favMealsEl.appendChild(favMeal);
}

async function getMealBySearch(term){
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );
    const respData = await resp.json();
    const meals = respData.meals;
    
    console.log(meals);
    return meals;

}

function showMealInfo(mealData) {
    const mealEl = document.createElement("div");
    mealInfoEl.innerHTML = '';

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`);

        } else {
            break;
        }
    };

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img 
            src="${mealData.strMealThumb}" 
            alt="${mealData.strMeal}">
        <p>
            ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    mealPopupEl.classList.remove('hidden'); 
}

serachBtnEl.addEventListener("click", async () => {
    mealsEl.innerHTML = '';
    const search = searchTermEl.value;
    const meals = await getMealBySearch(search);

    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});

closePopupEl.addEventListener("click", () => {
    mealPopupEl.classList.add("hidden");
    
});