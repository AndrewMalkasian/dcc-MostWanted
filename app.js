function app(people){
let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
let searchResults;
// let displayOption;
 switch(searchType){
   case 'yes':
     searchResults = searchByName(people);
     break;
     case 'no':
     searchResults = traitSwitch(people);
     displayPeople(searchResults);
     break;
     default:
     // TODO: search by traits
   app(people); // restart app
     break;
 }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
 mainMenu(searchResults, people);
}
 // TODO: find the person using the name they entered
function traitSwitch (people){
 let userInput = promptFor ("Let's go through some traits. 1: Eye Color, 2: DOB, 3: Height, 4: Weight, 5: Occupation", chars);
     if(userInput == "1"){
       let userInputEyeColor = promptFor("What is the person's eye color?", chars);
       let traitArray = people.filter(function(person){
         if (person.eyeColor.toLowerCase() === userInputEyeColor.toLowerCase()){
           return true;
         }
         else{
           return false;
         }
     })
       return traitArray;
   // }
  }
}
function displayPeople(people){
 alert(people.map(function(person){
   return person.firstName + " " + person.lastName ;
 }).join("\n"));
}
// Menu function to call once you find who you are looking for
/////////////////////////////////////////////////////////////////////////#2////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mainMenu(person, people){
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
function searchByTrait(people){
 let userInputEyeColor = promptFor("What is the person's eye color?", chars);
 let traitArray = people.filter(function(people){
   if (people.eyeColor.toLowerCase() === userInputEyeColor.toLowerCase()){
     return true;
   }
   else{
     return false;
   }
 })
 return traitArray;
}
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