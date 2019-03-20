const renderDog = (dog) => {
  $('.dogsList').append($(`
  <li>
    ${dog.name} - ${dog.breed} - ${dog.size}
  </li>
  `))
}


const loadAllDogs = () => {
  $('.dogsList').empty()

  // load dogs
  // /dogs also works
  $.ajax('http://localhost:5000/dogs')
  .done((response) => {
    // console.log('dogs!', response.dogs)
    response.dogs.forEach(renderDog)
  })
}


loadAllDogs()


$('#new-dog').submit(function (e) {
  e.preventDefault()

  // $(this) refers to the FORM
  const serializedDog = $(this).serialize()

  $.post('/dogs', serializedDog, (response) => {
    console.log('response', response)
    loadAllDogs()
    // go clear the form...
  })

})