"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/


function searchByTraits (people, searchResults, heightSearchResults, weightSearchResults, birthResults, occupationResults){
    let userInput = promptFor("Search by traits: Eye Color (e) , Height (h), Weight (w), DoB(d), Occupation (o) | Quit(q) or Restart(r)", chars);
    searchResults;
    heightSearchResults;
    weightSearchResults;
    birthResults;
    occupationResults; 
    switch(userInput){
      case "e":
        searchResults = searchByEyeColor(people);
        return searchResults;
        break;
      case "g": 
        genderResults = searchByGender(people);
        return genderResults;
        break;
      case "h":
        heightSearchResults = searchByHeight(people);
        return heightSearchResults;
        break;
      case "w":
        weightSearchResults = searchByWeight(people);
        return weightSearchResults;
        break;
      case "d":
        birthResults = searchByDOB(people);
        return birthResults;
        break;
      case "o":
       occupationResults = searchByOccupation(people);
       return occupationResults;
       break;
       case"r": 
        searchByTraits(people);
       break;
       case"q":
       break;
        default:
          app(people);
          break;
    }
 }

  //additional parameters if needed

function searchByEyeColor (people, userInput){
  userInput = promptFor ("Please enter eye color?", chars);
  let traitArray = people.filter(function(person){
      if (person.eyeColor.toLowerCase() === userInput.toLowerCase()){
        return true;
      }
      else{
        return false;
      }
  });
      return traitArray;
}     

function searchByGender (people, userInput){
  userInput = promptFor ("Please enter eye color?", chars);
  let traitArray = people.filter(function(person){
      if (person.gender.toLowerCase() === userInput.toLowerCase()){
        return true;
      }
      else{
        return false;
      }
  });
      return traitArray;
}     

function searchByHeight(people, userInput){
  userInput = promptFor ("Please enter their height.", chars);
 let traitArray = people.filter(function(person){
      if (person.height == userInput){
        return true;
      }
      else{
        return false;
      }
  });
      return traitArray;
}     
function searchByWeight (people){
  let userInput = promptFor ("Please enter their height.", chars);
  let traitArray = people.filter(function(person){
      if (person.weight === userInput){
        return true;
      }
      else{
        return false;
      }
  });
      return traitArray;
}     
function searchByOccupation(people){
  let userInput = promptFor("Please enter their height?, If unknown, enter 'n/a'", chars);
  let traitArray = people.filter(function(person){
      if (person.occupation.toLowerCase() === userInput.toLowerCase()){
        return true;
      }
      else{
        return false;
      }
  });
      return traitArray;
}     
function searchByDOB (people){
  let userInput = promptFor ("Please enter their date of birth?, If unknown, enter 'n/a'.", chars);
  let traitArray = people.filter(function(person){
      if (person.dob == userInput){ 
        return true;
      }
      else{
        return false;
      }
  });
      return traitArray;
}     
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName ;
  }).join("\n"));
}


// app is the function called to start the entire application
function app(people, searchResults, heightSearchResults, weightSearchResults, birthResults, occupationResults){
let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();

let totalSearchResults = people;
  switch(searchType){
    case 'yes':
      totalSearchResults = searchByName(people);
      break;
    case 'no':
      while(totalSearchResults.length > 1) {
        totalSearchResults = searchByTraits(totalSearchResults);
      }
      break;
    default:
      // TODO: search by traits
    app(people); // restart app
      break;
  }
   // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
   if (totalSearchResults.length === 1) {
    mainMenu(totalSearchResults)
 
  }
  else if ( totalSearchResults.length === 0){
    displayPeople(heightSearchResults);
    alert("nobody matches that search.")
    app(people);
  }
}
  // TODO: find the person using the name they entered



// Menu function to call once you find who you are looking for
/////////////////////////////////////////////////////////////////////////#2////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mainMenu(person, people){
//person = object // people = database
 
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }


  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  
  switch(displayOption){
  
    case "info":
      displayPerson(person);
    
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
////////////////////////////////////////////////////////////////////////////#2//////////////////////////////////////////////////////////////////////////////////////////////////


function searchByName(people){
  let userInputFirstName = promptFor("What is the person's first name?", chars);
  let userInputLastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){

    if(person.firstName.toLowerCase() === userInputFirstName && person.lastName.toLowerCase() === userInputLastName){
      return true;
    }
    else{
      return false;
    }
    
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}



function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Date of Birth: " + person[0].dob + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";
  personInfo += "occupation: " + person[0].occupation + "\n";
  personInfo += "Parents: " + person[0].parents + "\n";
  personInfo += "ID Number: " + person[0].id + "\n";
  personInfo += "Current Spouse: " + person[0].currentSpouse + "\n"; 
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim().toLowerCase();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}



 x
//------------------------------------------------------------------------------------------------------//

// function displayPerson (person){

// }

  // function personDateOfBirth(){

  // }
  // function personHeight(){

  // }
  // function personWeight(){

  // }
  // function personEyeColor (){

  // }
  // function personOccupation(){

  // }
