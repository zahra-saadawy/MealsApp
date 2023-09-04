

  $(document).ready(function () {
    serashByName("");
  });


// ----------------Side Bar-------
let closeIcon = $(".close-open");
let linksInnerWidth = $(".nav-tab").innerWidth();
$(".side-nav-menu").css('left', -linksInnerWidth);
function openSideBar(){
    $(".side-nav-menu").animate({left: '0px'}, 500)
    closeIcon.html(' <i class="fas s fa-close fa-2x"></i> ');
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, ((i + 5) * 100));
       
    }   
}
function closeSideBar () { 
    if($(".side-nav-menu").css("left")=='0px'){
        $(".side-nav-menu").animate({left: -linksInnerWidth}, 500);
        closeIcon.html('<i class="fas s fa-bars fa-2x"></i>');
        $(".links li").animate({
            top: 300
        }, 500)
             

    }
 }
closeIcon.click(function (e) { 
//    close nav bar
    if($(".side-nav-menu").css("left")=='0px'){
        closeSideBar();
     }
    // open nav bar
    else{
       openSideBar();
    }
    
    });

// -----------View /Meals----------
async function viewMeals( mealsArray){
  
    let htmlContent ="";
    let len =0;
    if (mealsArray.meals.length> 20){
        len = 20
    }
    else{
        len= mealsArray.meals.length;
    }
    for(let i =0; i<len; i++){
        let id = mealsArray.meals[i].idMeal;
        const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const mealResponse = await meal.json();
        htmlContent+= ` <div class="col-md-3 " onclick="viewMealDetails('${mealsArray.meals[i].idMeal}')">
        <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src= ${mealResponse.meals[0].strMealThumb} alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2 align-items-center d-flex justify-content-start">
                <h3>${mealResponse.meals[0].strMeal}</h3>
            </div>
        </div>
</div>`;
       
    }
    $(".meals-displayed").html(htmlContent);
}

async function viewMealDetails(id){
    const mealRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const mealDetailsResponse = await mealRequest.json();
    let htmlContent =`<div class="row py-5 g-4  text-white">
    <div class="col-md-4">
                <img class="w-100 rounded-3" src=${mealDetailsResponse.meals[0].strMealThumb} alt="">
                    <h2>${mealDetailsResponse.meals[0].strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${mealDetailsResponse.meals[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${mealDetailsResponse.meals[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${mealDetailsResponse.meals[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${mealDetailsResponse.meals[0].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${mealDetailsResponse.meals[0].strIngredient2}</li><li class="alert alert-info m-2 p-1">${mealDetailsResponse.meals[0].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${mealDetailsResponse.meals[0].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${mealDetailsResponse.meals[0].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${mealDetailsResponse.meals[0].strIngredient6}</li>
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
                </ul>

                <a target="_blank" href=${mealDetailsResponse.meals[0].strSource} class="btn btn-success">Source</a>
                <a target="_blank" href=${mealDetailsResponse.meals[0].strYoutube} class="btn btn-danger">Youtube</a>
            </div></div>`;
    let len =0;
   
   
    $(".meals-displayed").html(htmlContent);
    console.log('hi');
}
// ---------Open Search Section
$('.search-link').click(function (e) { 
    closeSideBar()
    $(".meals-displayed").html("");
    $("#searchContainer").css("display", "block");
});
// --------Search Meals by Name
async function serashByName(name){
    let nameRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
   let nameResponse = await nameRequest.json();
   viewMeals(nameResponse) ;
}
$('#nameSearch').keyup(function (e) { 
    serashByName(this.value);
    console.log(this.value);
});

// Search Meals by Letter
async function serashByLetter(letter){
    let letterRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
   let letterResponse = await letterRequest.json();
   viewMeals(letterResponse) ;
}
$('#letterSearch').keyup(function (e) { 
    serashByLetter(this.value);
    console.log(this.value);
});

// Display All Categories
async function dispalyCategories( categories){
   
    let htmlContent ="";
    let len =0;
    if (categories.length> 20){
        len = 20
    }
    else{
        len= categories.length;
    }
    for(let i =0; i<len; i++){
        htmlContent+= `<div onclick="viewMealsPerCategory('${categories[i].strCategory}')" class="col-md-3">
<div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src=${categories[i].strCategoryThumb} alt="" srcset="">
    <div class="meal-layer position-absolute text-center text-black p-2">
        <h3>${categories[i].strCategory}</h3>
        <p>${categories[i].strCategoryDescription}</p>
    </div>
</div>
</div>`;

       
    }
    $(".meals-displayed").html(htmlContent);
}
async function getCategories(){
    let categories = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php `);
    let categoriesRespons = await categories.json();
    dispalyCategories(categoriesRespons.categories) ;
    // console.log(categoriesRespons.categories[0]);
}
$('.categories').click(function (e) { 
    closeSideBar();
    getCategories();    
});
async function viewMealsPerCategory(category){
    const mealsCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    const  mealsCategoryResponse = await mealsCategory.json();
    let htmlContent ="";
    let len =0;
    console.log (mealsCategoryResponse);
    if (mealsCategoryResponse.meals.length> 20){
        len = 20
    }
    else{
        len= mealsCategoryResponse.meals.length;
    }
    for(let i =0; i<len; i++){
       
        htmlContent+= ` <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="viewMealDetails('${mealsCategoryResponse.meals[i].idMeal}')">
            <img class="w-100" src= ${mealsCategoryResponse.meals[i].strMealThumb} alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2 align-items-center d-flex justify-content-start">
                <h3>${mealsCategoryResponse.meals[i].strMeal}</h3>
            </div>
        </div>
</div>`;
       
    }
    $(".meals-displayed").html(htmlContent);
}




// Display All Areas
async function dispalyAreas( areas){
   
    let htmlContent ="";
    let len =0;
    if (areas.length> 20){
        len = 20
    }
    else{
        len= areas.length;
    }
    for(let i =0; i<len; i++){
        htmlContent+= `<div onclick="viewMealsPerArea('${areas[i].strArea}')" class="col-md-3 text-white">
        <div onclick="getAreaMeals('Malaysian')" class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fas fa-4x fa-laptop-house text-white"></i>
        <h3>${areas[i].strArea}</h3>
        </div>
        </div>`;

       
    }
    $(".meals-displayed").html(htmlContent);
}
async function getAreas(){
    let areasRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let areasResponse = await areasRequest.json();
    dispalyAreas(areasResponse.meals) ;
}
$('.areas').click(function (e) { 
    closeSideBar();
    getAreas();    
});
async function viewMealsPerArea(area){
    const mealsArea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area} `)
    const  mealsAreasResponse = await mealsArea.json();
    let htmlContent ="";
    let len =0;
    // console.log (mealsCategoryResponse);
    if (mealsAreasResponse.meals.length> 20){
        len = 20
    }
    else{
        len= mealsAreasResponse.meals.length;
    }
    for(let i =0; i<len; i++){
       
        htmlContent+= ` <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="viewMealDetails('${mealsAreasResponse.meals[i].idMeal}')">
            <img class="w-100" src= ${mealsAreasResponse.meals[i].strMealThumb} alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2 align-items-center d-flex justify-content-start">
                <h3>${mealsAreasResponse.meals[i].strMeal}</h3>
            </div>
        </div>
</div>`;
       
    }
    $(".meals-displayed").html(htmlContent);
}


// Display All Ingredients
async function dispalyIngredients( ingredients){
   
    let htmlContent ="";
    let len =0;
    if (ingredients.length> 20){
        len = 20
    }
    else{
        len= ingredients.length;
    }
    for(let i =0; i<len; i++){
        htmlContent+= `<div class="col-md-3">
        <div onclick="getMealsPerIngredient('${ingredients[i].strIngredient}')" class="rounded-2 text-center  text-white cursor-pointer">
        <i class="fas fa-drumstick-bite fa-4x text-white"></i>
        <h3>${ingredients[i].strIngredient}</h3>
                <p class="text-white">${ingredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
</div>`;

       
       
    }
    $(".meals-displayed").html(htmlContent);
}
async function getIngredients(){
    let ingRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let ingResponse = await ingRequest.json();
    dispalyIngredients(ingResponse.meals) ;
}
$('.ingredients').click(function (e) { 
    closeSideBar();
    getIngredients();    
});
async function getMealsPerIngredient(ingredient){
    const ingredientReq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}
    `)
    const  ingredientResponse = await ingredientReq.json();
    let htmlContent ="";
    let len =0;
    // console.log (mealsCategoryResponse);
    if (ingredientResponse.meals.length> 20){
        len = 20
    }
    else{
        len= ingredientResponse.meals.length;
    }
    for(let i =0; i<len; i++){
       
        htmlContent+= ` <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer text-white" onclick="viewMealDetails('${ingredientResponse.meals[i].idMeal}')">
            <img class="w-100" src= ${ingredientResponse.meals[i].strMealThumb} alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2 align-items-center d-flex justify-content-start">
                <h3>${ingredientResponse.meals[i].strMeal}</h3>
            </div>
        </div>
</div>`;
       
    }
    $(".meals-displayed").html(htmlContent);
}


// ------Contact Us

function displayContactForm() {
    const contactFormHTML = `
      <div class="contact d-flex min-vh-100 justify-content-center align-items-center">
        <div class="container text-center w-75">
          <div class="row g-4">
            <div class="col-md-6">
              <input type="text" class="form-control" id="nameInput" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                Special characters and numbers not allowed
              </div>
            </div>
            <div class="col-md-6">
              <input type="email" class="form-control" id="emailInput" placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                Email not valid *example@yyy.zzz
              </div>
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control" id="phoneInput" placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number
              </div>
            </div>
            <div class="col-md-6">
              <input type="number" class="form-control" id="ageInput" placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid age
              </div>
            </div>
            <div class="col-md-6">
              <input type="password" class="form-control" id="passwordInput" placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
            </div>
            <div class="col-md-6">
              <input type="password" class="form-control" id="rePasswordInput" placeholder="Re-enter Password">
              <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid re-entered password
              </div>
            </div>
          </div>
          <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
      </div>
    `;
    $(".meals-displayed").html(contactFormHTML);
  
    
    $("#nameInput").focus(function () {
      isNameInputFocused = true;
    });
  
    $("#emailInput").focus(function () {
      isEmailInputFocused = true;
    });
  
    $("#phoneInput").focus(function () {
      isPhoneInputFocused = true;
    });
  
    $("#ageInput").focus(function () {
      isAgeInputFocused = true;
    });
  
    $("#passwordInput").focus(function () {
      isPasswordInputFocused = true;
    });
  
    $("#rePasswordInput").focus(function () {
      isRePasswordInputFocused = true;
    });
  
    $(".contact .form-control").keyup(function () {
      validateInputs();
    });
  }
  
  let isNameInputFocused = false;
  let isEmailInputFocused = false;
  let isPhoneInputFocused = false;
  let isAgeInputFocused = false;
  let isPasswordInputFocused = false;
  let isRePasswordInputFocused = false;
  
  // Regex Validations
  function isValidName() {
    return /^[a-zA-Z ]+$/.test($("#nameInput").val());
  }
  
  function isValidEmail() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      $("#emailInput").val()
    );
  }
  
  function isValidPhone() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      $("#phoneInput").val()
    );
  }
  
  function isValidAge() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($("#ageInput").val());
  }
  
  function isValidPassword() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test($("#passwordInput").val());
  }
  
  function isValidRepassword() {
    return $("#rePasswordInput").val() === $("#passwordInput").val();
  }
  
  function validateInputs() {
    if (isNameInputFocused) {
      if (isValidName()) {
        $("#nameAlert").removeClass("d-block");
        $("#nameAlert").addClass("d-none");
      } else {
        $("#nameAlert").removeClass("d-none");
        $("#nameAlert").addClass("d-block");
      }
    }
  
    if (isEmailInputFocused) {
      if (isValidEmail()) {
        $("#emailAlert").removeClass("d-block");
        $("#emailAlert").addClass("d-none");
      } else {
        $("#emailAlert").removeClass("d-none");
        $("#emailAlert").addClass("d-block");
      }
    }
  
    if (isPhoneInputFocused) {
      if (isValidPhone()) {
        $("#phoneAlert").removeClass("d-block");
        $("#phoneAlert").addClass("d-none");
      } else {
        $("#phoneAlert").removeClass("d-none");
        $("#phoneAlert").addClass("d-block");
      }
    }
  
    if (isAgeInputFocused) {
      if (isValidAge()) {
        $("#ageAlert").removeClass("d-block");
        $("#ageAlert").addClass("d-none");
      } else {
        $("#ageAlert").removeClass("d-none");
        $("#ageAlert").addClass("d-block");
      }
    }
  
    if (isPasswordInputFocused) {
      if (isValidPassword()) {
        $("#passwordAlert").removeClass("d-block");
        $("#passwordAlert").addClass("d-none");
      } else {
        $("#passwordAlert").removeClass("d-none");
        $("#passwordAlert").addClass("d-block");
      }
    }
  
    if (isRePasswordInputFocused) {
      if (isValidRepassword()) {
        $("#rePasswordAlert").removeClass("d-block");
        $("#rePasswordAlert").addClass("d-none");
      } else {
        $("#rePasswordAlert").removeClass("d-none");
        $("#rePasswordAlert").addClass("d-block");
      }
    }
  
    if (
      isValidName() &&
      isValidEmail() &&
      isValidPhone() &&
      isValidAge() &&
      isValidPassword() &&
      isValidRepassword()
    ) {
      $("#submitBtn").removeAttr("disabled");
    } else {
      $("#submitBtn").attr("disabled", true);
   
    }}  

$('.contact').click(function (e) { 
    closeSideBar();
    displayContactForm();    
});