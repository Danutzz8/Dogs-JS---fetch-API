let timer                             // we named this 2 variables at the rop of page timer & deleteFirst... and using 2 preset function we can reset on change
let deleteFirstImageDelay

// this is where we fetch first API with breeds
//=========================================
async function start() {
   try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all')
    const data = await response.json()
    createBreedList(data.message);
   } catch (e) {                        // wrapped in try/catch method in case we have an error fetching the data
    console.log('error');
   }
}

start()

// this function is to add the list of fetched breeds on to HTML
//===========================================================
function createBreedList(breedList) {
    document.querySelector('#breed').innerHTML = `
    <select onchange="loadByBreed(this.value)">   // onchange attr we tell to do something 
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed) {       // look inside the object with the KEYs method and iterate thru with the map() and return an array and get rid of commas with join('')
            return `<option>${breed}</option>`
        }).join('')};
    </select>
    `;
}

// this is to fetch the second API with pictures
//==================================================
async function loadByBreed(breed) {
    if(breed != 'Choose a dog breed') {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createImage(data.message)   //   to keep this function tidy for only breed will create a separate one bellow for Images
    }

}

// this is the function that adds the pict to HTML  and create the slide show
//============================================= 

 function createImage(images) {
    //  console.log(images);
    
    let currentPosition = 0;
    clearInterval(timer)                  // we named this 2 variables at the rop of page timer & deleteFirst... and using 2 preset function we can reset on change
    clearTimeout(deleteFirstImageDelay)
    
    if (images.length > 1) {
        document.querySelector('.slideshow').innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div>
    `;

    currentPosition += 2
    if (images.length == 2) currentPosition = 0  // this is if we only have 2 pict in the array and will loop thru
    timer = setInterval(nextSlide, 3000)
    } else {                                       // this is if we have only one picture in the array available
        document.querySelector('.slideshow').innerHTML = `                       
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide"></div>
        `;
    }

    // creating the slide show ============================
    function nextSlide() {
        document.querySelector('#slideshow').insertAdjacentHTML('beforeend', `<div class="slide" style="background-image: url('${images[currentPosition]}');"></div>`)
        deleteFirstImageDelay = setTimeout(() => {
            document.querySelector('.slide').remove()
        }, 3000);
        if (currentPosition + 1 >= images.length) {
                currentPosition = 0
        } else {
            currentPosition++
        }
    }
 }