
// G
// CODE According to specification
function click_filter_element(event) {

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  event.currentTarget.classList.toggle("selected");
  update_programmes();
}


// G
// CODE according to specification
function create_filter_element(data) {

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */
  let button = document.querySelector("button");
  button.classList.add(data.class);
  button.addEventListener("click", toggle_cities);
  const create_li = document.createElement("li");
  data.parent.append(create_li);
  create_li.classList.add(data.class);
  create_li.textContent = data.textContent;
  create_li.addEventListener("click", click_filter_element);

  return create_li;
}


// VG
// CODE according to specification
function add_group_toggling(filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */

}

// VG
// CODE according to specifications
function toggle_cities(event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */
  let all_cities = document.querySelectorAll("#country_filter li");
  let button = document.querySelector("button");
  button.classList.toggle("selected");

  function test_function(params) {
    if (button.classList !== ("selected")) {
      params.classList.toggle("selected");
      update_programmes();
    }
  }

  array_each(all_cities, test_function);
}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city
// CREATE_COUNTRIES_CITIES_FILTERS
// ARGUMENTS
// Funktionen tar inte emot n??gra argument.
//
// SIDE EFFECT:
// N??r funktionen anropas, anropas de funktioner som finns i (create_country & create_city), med array_each.
//
//
// RETURV??RDE:
// Funktionen returnerar ingenting.
//
//
// CREATE_COUNTRY
// ARGUMENT:
// Funktionen tar emot ett argument (country) som ??r en variabel som representerar varje index i arrayen COUNTRIES
//
// SIDE EFFECTS:
// Funktionen skapar en div med klassen country och klassen filter_container samt ger den id fr??n arrayen (country + nyckeln, med namn id, fr??n arrayen). 
// - Funktionen appendar DOM-elementet till country_filter > ul.
// - Den ger DOM-elementet titel av indexet "name" i arrayen, samt skapar en ul med klassen "filter_list".
//
// Funktionen anropar TEST_FUNCTION som returnerar en array med alla st??der som har samma countryID som country.id.
//
//
// RETURN
// Funktionen returnerar ingenting
//

// CREATE_CITY
//
// ARGUMENT
// Funktionen tar emot ett argument (city) som ??r en variabel som prepresenterar varje index i arrayen city (en array som skapas i test funktionen create_country).
//
// SIDE EFFECTS:
// Funktionen skapar ett objekt (li-element i create_filter_element) med olika nycklar. Nycklarna ??r parent, class och textContent.
// - parent: objektet appendas till sin r??tta f??r??lder, s?? att r??tt stad hamnar under r??tt land. 
// - class: objektet f??r klassen selected
// - textContent: variabeln med nyckeln "name"
//
//Funktionen ger ett data-id till objektet som ??r baserat p?? stadens namn.
function create_countries_cities_filters() {
  function create_country(country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city(city) {

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.
// function create_levels_filter() {
//   function create_level(level) {
//     const dom = create_filter_element({
//       parent: document.querySelector("#level_filter > ul"),
//       class: "selected",
//       textContent: level.name,
//     });
//     dom.dataset.id = level.id;
//   }
//   array_each(LEVELS, create_level);
// }
// // Create Subjects Filter
// function create_subjects_filter() {
//   function create_subject(subject) {
//     const dom = create_filter_element({
//       parent: document.querySelector("#subject_filter > ul"),
//       class: "selected",
//       textContent: subject.name,
//     });
//     dom.dataset.id = subject.id;
//   }
//   array_each(SUBJECTS, create_subject);
// }
// // Create Search Field
// function create_language_filter() {
//   function create_element(data) {
//     const dom = create_filter_element({
//       parent: document.querySelector("#language_filter > ul"),
//       class: "selected",
//       textContent: data.name,
//     });
//     dom.dataset.id = data.id;
//   }
//   array_each(LANGUAGES, create_element);
// }

// CREATE_FILTER
//
// ARGUMENT: Funktionen tar emot tv?? argument. 
// - Filter_type (En variabel med en str??ng som h??nvisar parent till r??tt f??r??lder) 
// - DATA(En variabel som h??nvisar till r??tt array)
//
// SIDE-EFFECTS:
// Funktionen anropar create med array_each(DATA, create). Funktionen create skapar ett objekt med nyklarna parent, class och textContent.
// parent:  V??ljer ut element p?? HTML sidan med "filter_type" och filter som id.
// class: DOM-elementet f??r klassen selected.
// textContent: DOM-elementet f??r textcontent baserad p?? array[i] nyckeln (data.name)
// Funktionen ger ett data-id till objektet (dom) som ??r baserat p?? array.name.
//
//
// Funktionen anropas tre olika g??nger i index.js med de olika arrays (LANGUAGE, SUBJECTS, LEVELS).
//
// RETURV??RDE:
// Funktionen returnerar ingenting. 
//

function create_filter(filter_type, DATA) {
  function create(data) {
    const dom = create_filter_element({
      parent: document.querySelector(`#${filter_type}_filter > ul`),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(DATA, create);
}


// G / VG (see details in specification)
// CODE according to specifications
function create_programme(programme) {

  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */
  document.querySelector("#programmes > p").innerHTML = "";

  let sun_days = CITIES[UNIVERSITIES[programme.universityID].cityID].sun;

  let li_dom = document.createElement("li");
  li_parent = document.querySelector("#programmes >ul").append(li_dom);
  li_dom.classList.add("programme");
  li_dom.innerHTML = `
    <div class="first_div">
    <p><b>${programme.name}</b></p>
    <p>${UNIVERSITIES[programme.universityID].name}</p>
    <p>${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, ${COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID].name}</p >
    <p>${LEVELS[programme.levelID - 1].name}, ${SUBJECTS[programme.subjectID].name}, ${LANGUAGES[programme.languageID].name}</p>
    </div >
    <div class="more_info"></div>
    <div class="bottom_programme">${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, sun-index: ${CITIES[UNIVERSITIES[programme.universityID].cityID].sun} (${percenter(sun_days, 365)}%)</div>
  `;

  let all_city_pictures = CITIES[UNIVERSITIES[programme.universityID].cityID].imagesNormal.length;
  let random_number = get_random_number(all_city_pictures, 1);
  let name_of_city = CITIES[UNIVERSITIES[programme.universityID].cityID].name.toLocaleLowerCase();
  let normal_jpg = `_normal_${random_number}.jpg`;
  li_dom.style.backgroundImage = `url(./media/geo_images/${name_of_city}${normal_jpg})`;


}

array_each(PROGRAMMES, create_programme);

// G
// CODE according to the specification
function update_programmes() {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

  let numbers_of_programmes = read_filters();
  let programmes_shown_before = document.querySelector("#programmes > ul");
  let programmes_paragraf = document.querySelector("#programmes > p");

  if (numbers_of_programmes.length === 0) {
    programmes_paragraf.innerHTML = "Inga program upfyller nuvarande filter.";
    programmes_shown_before.innerHTML = "";
  }
  array_each(numbers_of_programmes, create_programme);
}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it

// READ_FILTERS
//
// ARGUMENT:
// Funktionen tar inte emot n??gra argument.
//
//
// SIDE-EFFECTS:
// 
// City
// Vi b??rjar med att skapa en variabel som ??r en referens till en nodelist som ??r alla selekterade li i country_filter.
// Vi anropar array_each med variabeln med nodelistan och en callback funktion. 
// Detta generar en en array(a)med nodelitstan plus nycklarna ID f??r varje element ??versatta till en str??ng.
// 
// Universitet
// loopar vi igenom alla element i arryen skapad i den tidigare funktionen och skapar en ny variabel av varje index i arrayen. 
// D??refter loopar UNIVERSITIES igenom och en ny variabel skapas f??r varje index. 
// Dessa tv?? varaiblar j??mf??rs med deras ???Id???.
// Om dessa matchas pushas dom in i en ny array(b).
//
// PROGRAMME
// En tom array deklarerar (X).
// array_each anropas med parametrarna array(b) och en callback funktion. 
// I callbackfunktionen s?? skapas en ny variabel av varje index i och dess id. 
// D??refter loopas PROGRAMMES och varje index blir en ny variabel(c). 
// Om varje index av PROGRAMMES nyckel ???id???, matchar med tidigare etablerad variabel av array(b). 
// Om funktionen returnerar true pushas c in i x.
// Kommande tre funktioner g??r samma sak men med olika v??rden. (LEVELS, LANGUAGES, SUBJECTS)
// En ny variabel skapas med referens till en nodelist av selekterade li element fr??n vardera f??r??lder med namn baserat p?? de olika v??rden (Z) (_selected_dom).
// En tom array deklareras. (r)
// Via array_each anropas  Z och callback-funktion. 
// Callback funtion omvandlar varje index i Z???s nyckelns id till en str??ng. 
// X v??rde uppdateras genom array_filter som anropas med v??rdena x och test_funktionerna.
// Test funktionen returnerar varje index fr??n r om den inkluderar X.Z.???s id.
// En variabel deklareras som ??r en referens till input-elements v??rde. (u)
// Om variabelns v??rde ??r inte ??r tomt k??rs test function. 
// Test function returnerar en ny array om index av X med nyckeln name inkluderas (u).
// X v??rde uppdateras genom array_filter som anropas med v??rdena (X och test_function).
//
// RETURV??RDE:
// Funktionen returnerar array programmes.
function read_filters() {

  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
