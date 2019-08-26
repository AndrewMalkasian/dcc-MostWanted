"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// global variable to contain remain people info by searching
let remainPeople;

// app is the function called to start the entire application
function app(people) {
    let type = "name";
    remainPeople = people;
    searchPeople(people, type);
}

// search people depends on the criteria
function searchPeople(people, trait) {
    console.log("trait", trait);
    let message = getPromptMessage(trait);
    let answers = answerYesNo(message);

    switch (trait) {
        case "name":
            if (answers) {
                let searchResults = searchByName(remainPeople);

                if (searchResults)
                    if (searchResults.length == 0) {
                        searchResults = searchPeople(people, "gender");
                    } 
                    else if (searchResults.length == 1) {
                        // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
                        mainMenu(searchResults[0], people);
                    } 
                    else {
                        remainPeople = searchResults;
                        displayPeople(remainPeople);
                        searchPeople(people, "gender");
                    }
            } 
            else {
                searchPeople(people, "gender");
            }

            break;
        case "gender":
            // search by gender
            if (answers) {
                let searchResults = searchByGender(remainPeople);

                if (searchResults)
                    if (searchResults.length == 0) {
                        searchResults = searchPeople(people, "dob");
                    } 
                    else if (searchResults.length == 1) {
                        // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
                        mainMenu(searchResults[0], people);
                    } 
                    else {
                        remainPeople = searchResults;
                        displayPeople(remainPeople);
                        searchResults = searchPeople(people, "dob");
                    }
            } 
            else {
                searchPeople(people, "dob");
            }

            break;
        case "dob":
            // search by date of birth
            if (answers) {
                let searchResults = searchByDOB(remainPeople);

                if (searchResults)
                    if (searchResults.length == 0) {
                        searchResults = searchPeople(people, "height");
                    } 
                    else if (searchResults.length == 1) {
                        // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
                        mainMenu(searchResults[0], people);
                    } 
                    else {
                        remainPeople = searchResults;
                        displayPeople(remainPeople);
                        searchResults = searchPeople(people, "height");
                    }
            } 
            else {
                searchPeople(people, "height");
            }

            break;
        case "height":
            // search by height
            if (answers) {
                let searchResults = searchByHeight(remainPeople);

                if (searchResults)
                    if (searchResults.length == 0) {
                        searchResults = searchPeople(people, "weight");
                    } 
                    else if (searchResults.length == 1) {
                        // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
                        mainMenu(searchResults[0], people);
                    } 
                    else {
                        remainPeople = searchResults;
                        displayPeople(remainPeople);
                        searchResults = searchPeople(people, "weight");
                    }
            } 
            else {
                searchPeople(people, "weight");
            }

            break;
        case "weight":
            // search by weight
            if (answers) {
                let searchResults = searchByWeight(remainPeople);

                if (searchResults)
                    if (searchResults.length == 0) {
                        searchResults = searchPeople(people, "eyeColor");
                    } 
                    else if (searchResults.length == 1) {
                        // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
                        mainMenu(searchResults[0], people);
                    } 
                    else {
                        remainPeople = searchResults;
                        displayPeople(remainPeople);
                        searchResults = searchPeople(people, "eyeColor");
                    }
            } 
            else {
                searchPeople(people, "eyeColor");
            }

            break;
        case "eyeColor":
            // search by eye color
            if (answers) {
                let searchResults = searchByEyeColor(remainPeople);

                if (searchResults)
                    if (searchResults.length == 0) {
                        searchResults = searchPeople(people, "occupation");
                    } 
                    else if (searchResults.length == 1) {
                        // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
                        mainMenu(searchResults[0], people);
                    } 
                    else {
                        remainPeople = searchResults;
                        displayPeople(remainPeople);
                        searchResults = searchPeople(people, "occupation");
                    }
            } 
            else {
                searchPeople(people, "occupation");
            }

            break;
        case "occupation":
            // search by occupation
            if (answers) {
                let searchResults = searchByOccupation(remainPeople);

                if (searchResults)
                    if (searchResults.length == 0) {
                        alert("There's no such a person!");
                    } 
                    else if (searchResults.length == 1) {
                        // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
                        mainMenu(searchResults[0], people);
                    } 
                    else {
                        remainPeople = searchResults;
                        displayPeople(remainPeople);
                        app(people); // restart app
                    }
            } 
            else {
                alert("There's no such a person!");
            }

            break;
        default:
            console.log("restart app");
            app(people); // restart app
            break;
    }
}

// ask if you know person's trait - yes/no
function answerYesNo(message) {
    let searchType = promptFor(message, yesNo).toLowerCase();

    let response;
    switch (searchType) {
        case "yes":
            response = true;
            break;
        case "no":
            response = false;
            break;
        default:
            answerYesNo(message); // restart answerYesNo
            break;
    }
    return response;
}

//  get the prompt message string according ot the trait
function getPromptMessage(trait) {
    let response = "Do you know the " + trait + " of the person you are looking for? Enter 'yes' or 'no'";
    return response;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
    /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

    if (!person) {
        alert("Could not find that individual.");
        return app(people); // restart
    }

    let displayOption = prompt(
        "Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

    switch (displayOption) {
        case "info":
            // get person's info
            displayPerson(person);
            break;
        case "family":
            // get person's family
            displayFamily(person, people);
            break;
        case "descendants":
            // get person's descendants
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

// function to search people by using name
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
    let lastName = promptFor("What is the person's last name?", chars ).toLowerCase();

    let foundPerson = people.filter(function(person) {
        if (person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName) {
            return true;
        } 
        else {
            return false;
        }
    });

    // TODO: find the person using the name they entered
    return foundPerson;
}

// function to search people by using gender
function searchByGender(people) {
    let gender = promptFor("What is the gender of the person you're looking for? Enter 'male' or 'female'", validateGender);

    let foundPerson = people.filter(function(person) {
        if (person.gender === gender) {
            return true;
        } 
        else {
            return false;
        }
    });

    // TODO: find the person using the name they entered
    return foundPerson;
}

// function to search people by using birthday
function searchByDOB(people) {
    let dob = promptFor("What is the birthday of the person you're looking for? Enter it by using this format: mm/dd/yyyy");

    let foundPerson = people.filter(function(person) {
        if (person.dob === dob) {
            return true;
        } 
        else {
            return false;
        }
    });

    // TODO: find the person using the name they entered
    return foundPerson;
}

// function to search people by using height
function searchByHeight(people) {
    let height = promptFor("What is the height of the person you're looking for? Enter it by using number", validateNumber);

    let foundPerson = people.filter(function(person) {
        if (person.height == height) {
            return true;
        } 
        else {
            return false;
        }
    });

    // TODO: find the person using the name they entered
    return foundPerson;
}

// function to search people by using height
function searchByWeight(people) {
    let weight = promptFor("What is the weight of the person you're looking for? Enter it by using number", validateNumber);

    let foundPerson = people.filter(function(person) {
        if (person.weight == weight) {
            return true;
        } 
        else {
            return false;
        }
    });

    // TODO: find the person using the name they entered
    return foundPerson;
}

// function to search people by using eye color
function searchByEyeColor(people) {
    let eyeColor = promptFor("What is the eye color of the person you're looking for? Enter color name", chars);

    let foundPerson = people.filter(function(person) {
        if (person.eyeColor === eyeColor) {
            return true;
        } 
        else {
            return false;
        }
    });

    // TODO: find the person using the name they entered
    return foundPerson;
}

// function to search people by using occupation
function searchByOccupation(people) {
    let occupation = promptFor("What is the occupation of the person you're looking for?", chars);

    let foundPerson = people.filter(function(person) {
        if (person.occupation === occupation) {
            return true;
        } 
        else {
            return false;
        }
    });

    // TODO: find the person using the name they entered
    return foundPerson;
}

// alerts a list of people
function displayPeople(people) {
    alert(people.map(function(person) {
        return person.firstName + " " + person.lastName;
    })
    .join("\n"));
}

function displayPerson(person) {
    // print all of the information about a person:
    // height, weight, age, name, occupation, eye color.
    let personInfo = "First Name: " + person.firstName + "\n";
    personInfo += "Last Name: " + person.lastName + "\n";
    personInfo += "ID Number: " + person.id + "\n";
    personInfo += "Gender: " + person.gender + "\n";
    personInfo += "Date of Birth: " + person.dob + "\n";
    personInfo += "Height: " + person.height + "\n";
    personInfo += "Weight: " + person.weight + "\n";
    personInfo += "Eye Color: " + person.eyeColor + "\n";
    personInfo += "Occupation: " + person.occupation + "\n";
    personInfo += "Parent ID Number/s: " + person.parents + "\n";
    personInfo += "Spouse ID Number: " + person.currentSpouse + "\n";

    alert(personInfo);
}

// function to show family of the person
function displayFamily(person, people) {
    // get the family members
    let members = [],relation;
    people.filter(function(p) {
        if (p.id != person.id) {
            // get current spouse
            if (p.currentSpouse == person.id) {
                if (p.gender == "male") relation = "Husband";
                if (p.gender == "female") relation = "Wife";

                let member = {
                    relation: relation,
                    info: p
                };
                members.push(member);
                return true;
            }

            // get brothers and sisters of a person
            if (p.parents.length != 0 && arraysEqual(p.parents, person.parents)
            ) {
                if (p.gender == "male") relation = "Brother";
                if (p.gender == "female") relation = "Sister";

                let member = {
                    relation: relation,
                    info: p
                };
                members.push(member);
                return true;
            }

            // get kids of a person
            if (p.parents.length != 0 && p.id != person.id) {
                if (p.parents.includes(person.id)) {
                    if (p.gender == "male") relation = "Son";
                    if (p.gender == "female") relation = "Daughter";
                    let member = {
                        relation: relation,
                        info: p
                    };
                    members.push(member);
                    return true;
                }
            }

            // get parents of a person
            if (person.parents.length != 0 && p.id != person.id) {
                if (person.parents.includes(p.id)) {
                    if (p.gender == "male") relation = "Father";
                    if (p.gender == "female") relation = "Mother";
                    let member = {
                        relation: relation,
                        info: p
                    };
                    members.push(member);
                    return true;
                }
            }
        }
    });

    // display the name of family members
    let personInfo = "";
    if (members.length == 0) personInfo = "There's no result";
    else
        members.forEach(function(m) {
            personInfo += "Relation: " + m.relation + "  First Name: " + m.info.firstName + "  Last Name: " + m.info.lastName + "\n";
        });

    alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim().toLowerCase();
    } 
    while (!response || !valid(response));
    return response;
}

// function to pass into promptFor to validate yes/no answers
function yesNo(input) {
    return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// function to pass in as default promptFor validation
function chars(input) {
    return true; // default validation only
}

function validateNumber(input) {
    return Number.isInteger(parseInt(input));
}

// function to pass into promptFor to validate male/female answers
function validateGender(input) {
    return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

// function to check if 2 arrays are equal
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = arr1.length; i--; ) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;
}