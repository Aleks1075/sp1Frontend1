async function fetchData(apiUrl) {
    const response = await fetch(apiUrl);
  if (response.ok) {
    const data = await response.json();
    console.log('API response:', data); // Log the response
    return data;
  } else {
    throw new Error(`Error fetching data from ${apiUrl}`);
  }
  }
  

async function getAllCityInfo() {
    console.log('Getting all city info'); // Debug log
    const apiUrl = 'https://aleksdat.dk/tomcat/sp1/api/cityinfo/danish-zip-codes';
    const data = await fetchData(apiUrl);

    // Create table element and header row
    const table = document.createElement('table');
    table.classList.add('cityinfo');
    const headerRow = table.insertRow();
    const cityHeader = headerRow.insertCell();
    cityHeader.innerHTML = 'City';
    const zipCodeHeader = headerRow.insertCell();
    zipCodeHeader.innerHTML = 'Zip Code';

    // Add data rows to table
    data.forEach(cityinfo => {
        const dataRow = table.insertRow();
        const cityCell = dataRow.insertCell();
        cityCell.innerHTML = cityinfo.city;
        const zipCodeCell = dataRow.insertCell();
        zipCodeCell.innerHTML = cityinfo.zipCode;
    });

    // Replace content div with table
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}

document.getElementById('getAllCityInfoButton').addEventListener('click', getAllCityInfo);

async function getCityInfoByZipCode() {
    console.log('Getting city info by zip code'); // Debug log
    const zipCode = document.getElementById('zipCodeInput').value;
    const apiUrl = `https://aleksdat.dk/tomcat/sp1/api/cityinfo/${zipCode}`;
    const data = await fetchData(apiUrl);

    // Create table element and header row
    const table = document.createElement('table');
    table.classList.add('cityinfo');
    const headerRow = table.insertRow();
    const cityHeader = headerRow.insertCell();
    cityHeader.innerHTML = 'City';
    const zipCodeHeader = headerRow.insertCell();
    zipCodeHeader.innerHTML = 'Zip Code';

    // Add data rows to table
    const dataRow = table.insertRow();
    const cityCell = dataRow.insertCell();
    cityCell.innerHTML = data.city;
    const zipCodeCell = dataRow.insertCell();
    zipCodeCell.innerHTML = data.zipCode;

    // Replace content div with table
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}

document.getElementById('getCityInfoByZipCodeButton').addEventListener('click', getCityInfoByZipCode);

function populateEditPersonForm(person) {
  document.getElementById("personId").value = person.id;
  document.getElementById("editEmail").value = person.email;
  document.getElementById("editFirstName").value = person.firstName;
  document.getElementById("editLastName").value = person.lastName;

  // Prepopulate hobbies, addresses, and phones fields
  const hobby = person.hobbies[0];
  document.getElementById("editHobbyName").value = hobby.name;
  document.getElementById("editHobbyWikiLink").value = hobby.wikiLink;
  document.getElementById("editHobbyCategory").value = hobby.category;
  document.getElementById("editHobbyType").value = hobby.type;

  const address = person.address;
  document.getElementById("editAddressId").value = address.id;
  document.getElementById("editStreet").value = address.street;
  document.getElementById("editAdditionalInfo").value = address.additionalInfo;
  document.getElementById("editZipCode").value = address.cityInfo.zipCode;
  document.getElementById("editCity").value = address.cityInfo.city;

  // Assuming the first phone in the phones array
  const phone = person.phones[0];
  document.getElementById("editPhoneId").value = phone.id;
  document.getElementById("editDescriptionPhone").value = phone.descriptionPhone;
}

async function getAllPersons() {
  console.log("Getting all persons");
  const apiUrl = "https://aleksdat.dk/tomcat/sp1/api/person";
  const data = await fetchData(apiUrl);

  // Create an array containing the person object
  const persons = Array.isArray(data) ? data : [data];

  const table = document.createElement("table");
  table.classList.add("person");
  const headerRow = table.insertRow();
  const idHeader = headerRow.insertCell();
  idHeader.innerHTML = "ID";
  const emailHeader = headerRow.insertCell();
  emailHeader.innerHTML = "Email";
  const firstNameHeader = headerRow.insertCell();
  firstNameHeader.innerHTML = "First Name";
  const lastNameHeader = headerRow.insertCell();
  lastNameHeader.innerHTML = "Last Name";
  const editHeader = headerRow.insertCell();
  editHeader.innerHTML = "Edit";

  if (persons.length > 0) {
    persons.forEach((person) => {
      const dataRow = table.insertRow();
      const idCell = dataRow.insertCell();
      idCell.innerHTML = person.id;
      const emailCell = dataRow.insertCell();
      emailCell.innerHTML = person.email;
      const firstNameCell = dataRow.insertCell();
      firstNameCell.innerHTML = person.firstName;
      const lastNameCell = dataRow.insertCell();
      lastNameCell.innerHTML = person.lastName;
      const editCell = dataRow.insertCell();
      const editButton = document.createElement("button");
      editButton.innerHTML = "Edit";
      editButton.classList.add("edit-button");
      editButton.setAttribute("data-person-id", person.id);
      editCell.appendChild(editButton);

      editButton.addEventListener("click", () => {
        console.log("Selected person data:", person); // Log the person data
        // Prepopulate the "edit-person-form" fields with the selected person's data
        populateEditPersonForm(person); // Call the new function with the person object
      });
    });

    const content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(table);
  } else {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = "No persons found";
  }
}

document.getElementById("getAllPersonsButton").addEventListener("click", getAllPersons);

async function getPersonById() {
    console.log('Getting person by ID'); // Debug log
    const id = document.getElementById('personIdInput').value;
    const apiUrl = `https://aleksdat.dk/tomcat/sp1/api/person/${id}`;
    const data = await fetchData(apiUrl);

    if (data === null) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = `No person found with ID ${id}`;
        return;
    }

    // Create table element and header row
    const table = document.createElement('table');
    table.classList.add('person');
    const headerRow = table.insertRow();
    const idHeader = headerRow.insertCell();
    idHeader.innerHTML = 'ID';
    const firstNameHeader = headerRow.insertCell();
    firstNameHeader.innerHTML = 'First Name';
    const lastNameHeader = headerRow.insertCell();
    lastNameHeader.innerHTML = 'Last Name';
    const emailHeader = headerRow.insertCell();
    emailHeader.innerHTML = 'Email';

    // Add data rows to table
    const dataRow = table.insertRow();
    const idCell = dataRow.insertCell();
    idCell.innerHTML = data.id;
    const firstNameCell = dataRow.insertCell();
    firstNameCell.innerHTML = data.firstName;
    const lastNameCell = dataRow.insertCell();
    lastNameCell.innerHTML = data.lastName;
    const emailCell = dataRow.insertCell();
    emailCell.innerHTML = data.email;

    // Replace content div with table
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}

document.getElementById('getPersonByIdButton').addEventListener('click', getPersonById);

async function getAllHobbies() {
    console.log('Getting all hobbies'); // Debug log
    const apiUrl = 'https://aleksdat.dk/tomcat/sp1/api/hobby';
    const data = await fetchData(apiUrl);
    console.log(data);

    // Create table element and header row
    const table = document.createElement('table');
    table.classList.add('hobby');
    const headerRow = table.insertRow();
    const nameHeader = headerRow.insertCell();
    nameHeader.innerHTML = 'WikiLink';
    const wikiLinkHeader = headerRow.insertCell();
    wikiLinkHeader.innerHTML = 'Name';
    const categoryHeader = headerRow.insertCell();
    categoryHeader.innerHTML = 'Category';
    const typeHeader = headerRow.insertCell();
    typeHeader.innerHTML = 'Type';

    // Add data rows to table
    console.log(data);
    data.hobbies.forEach(hobby => {
    const dataRow = table.insertRow();
    const nameCell = dataRow.insertCell();
    nameCell.innerHTML = hobby.name;
    const wikiLinkCell = dataRow.insertCell();
    wikiLinkCell.innerHTML = hobby.wikiLink;
    const categoryCell = dataRow.insertCell();
    categoryCell.innerHTML = hobby.category;
    const typeCell = dataRow.insertCell();
    typeCell.innerHTML = hobby.type;
});

    // Replace content div with table
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}

document.getElementById('getAllHobbiesButton').addEventListener('click', getAllHobbies);

async function getPersonsByHobby() {
    console.log('Getting persons by hobby'); // Debug log
    const hobbyName = document.getElementById('hobbyInput').value;
    const apiUrl = `https://aleksdat.dk/tomcat/sp1/api/person/hobby/${hobbyName}`;
    const persons = await fetchData(apiUrl);

    // Create table element and header row
    const table = document.createElement('table');
    table.classList.add('persons');
    const headerRow = table.insertRow();
    const firstNameHeader = headerRow.insertCell();
    firstNameHeader.innerHTML = 'First Name';
    const lastNameHeader = headerRow.insertCell();
    lastNameHeader.innerHTML = 'Last Name';
    const emailHeader = headerRow.insertCell();
    emailHeader.innerHTML = 'Email';

    // Add data rows to table
    console.log(persons);
    persons.forEach(person => {
        const dataRow = table.insertRow();
        const firstNameCell = dataRow.insertCell();
        firstNameCell.innerHTML = person.firstName;
        const lastNameCell = dataRow.insertCell();
        lastNameCell.innerHTML = person.lastName;
        const emailCell = dataRow.insertCell();
        emailCell.innerHTML = person.email;
    });

    // Replace content div with table
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}

document.getElementById('getPersonsByHobbyButton').addEventListener('click', getPersonsByHobby);

async function getPersonByPhoneNumber() {
    console.log('Getting person by phone'); // Debug log
    const phoneNumber = document.getElementById('phoneNumberInput').value;
    const apiUrl = `https://aleksdat.dk/tomcat/sp1/api/person/phone/${phoneNumber}`;
    const data = await fetchData(apiUrl);

    if (data === null) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = `No person found with phone number ${phoneNumber}`;
        return;
    }

    // Create table element and header row
    const table = document.createElement('table');
    table.classList.add('person');
    const headerRow = table.insertRow();
    const idHeader = headerRow.insertCell();
    idHeader.innerHTML = 'ID';
    const firstNameHeader = headerRow.insertCell();
    firstNameHeader.innerHTML = 'First Name';
    const lastNameHeader = headerRow.insertCell();
    lastNameHeader.innerHTML = 'Last Name';
    const emailHeader = headerRow.insertCell();
    emailHeader.innerHTML = 'Email';

    // Add data rows to table
    const dataRow = table.insertRow();
    const idCell = dataRow.insertCell();
    idCell.innerHTML = data.id;
    const firstNameCell = dataRow.insertCell();
    firstNameCell.innerHTML = data.firstName;
    const lastNameCell = dataRow.insertCell();
    lastNameCell.innerHTML = data.lastName;
    const emailCell = dataRow.insertCell();
    emailCell.innerHTML = data.email;

    // Replace content div with table
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}

document.getElementById('getPersonByPhoneButton').addEventListener('click', getPersonByPhoneNumber);

async function getPersonsByCity() {
    console.log('Getting persons by city');
    const zipCode = document.getElementById('cityInput').value;
    const apiUrl = `https://aleksdat.dk/tomcat/sp1/api/person/zipCode/${zipCode}`;
    const data = await fetchData(apiUrl);

    // Create table element and header row
    const table = document.createElement('table');
    table.classList.add('persons');
    const headerRow = table.insertRow();
    const idHeader = headerRow.insertCell();
    idHeader.innerHTML = 'ID';
    const firstNameHeader = headerRow.insertCell();
    firstNameHeader.innerHTML = 'First Name';
    const lastNameHeader = headerRow.insertCell();
    lastNameHeader.innerHTML = 'Last Name';
    const emailHeader = headerRow.insertCell();
    emailHeader.innerHTML = 'Email';
    const ageHeader = headerRow.insertCell();
    ageHeader.innerHTML = 'Age';

    // Add data rows to table
    console.log(data);
    data.forEach(person => {
        const dataRow = table.insertRow();
        const idCell = dataRow.insertCell();
        idCell.innerHTML = person.id;
        const firstNameCell = dataRow.insertCell();
        firstNameCell.innerHTML = person.firstName;
        const lastNameCell = dataRow.insertCell();
        lastNameCell.innerHTML = person.lastName;
        const emailCell = dataRow.insertCell();
        emailCell.innerHTML = person.email;
        const ageCell = dataRow.insertCell();
        ageCell.innerHTML = person.age;
    });

    // Replace content div with table
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}

document.getElementById('getPersonsByCityButton').addEventListener('click', getPersonsByCity);

async function getHobbyCount() {
    console.log('Getting hobby count'); // Debug log
    const hobbyName = document.getElementById('hobbyCountInput').value;
    const apiUrl = `https://aleksdat.dk/tomcat/sp1/api/person/personByHobby/${hobbyName}`;
    const count = await fetchData(apiUrl);

    // Display count in content div
    const content = document.getElementById('content');
    content.innerHTML = `Number of people with ${hobbyName}: ${count}`;
}

document.getElementById('getHobbyCountButton').addEventListener('click', getHobbyCount);

function resetForm() {
  document.getElementById("email").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("age").value = "";
  document.getElementById("hobbyName").value = "";
  document.getElementById("hobbyWikiLink").value = "";
  document.getElementById("hobbyCategory").value = "";
  document.getElementById("hobbyType").value = "";
  document.getElementById("addressId").value = "";
  document.getElementById("additionalInfo").value = "";
  document.getElementById("street").value = "";
  document.getElementById("zipCode").value = "";
  document.getElementById("city").value = "";
  document.getElementById("phoneId").value = "";
  document.getElementById("descriptionPhone").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("add-person-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const age = document.getElementById("age").value;

    const hobbyName = document.getElementById("hobbyName").value;
    const hobbyWikiLink = document.getElementById("hobbyWikiLink").value;
    const hobbyCategory = document.getElementById("hobbyCategory").value;
    const hobbyType = document.getElementById("hobbyType").value;

    const addressId = document.getElementById("addressId").value;
    const additionalInfo = document.getElementById("additionalInfo").value;
    const street = document.getElementById("street").value;

    const zipCode = document.getElementById("zipCode").value;
    const city = document.getElementById("city").value;

    const phoneId = document.getElementById("phoneId").value;
    const descriptionPhone = document.getElementById("descriptionPhone").value;

    const personData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      age: age,
      hobbies: [
        {
          name: hobbyName,
          wikiLink: hobbyWikiLink,
          category: hobbyCategory,
          type: hobbyType,
        },
      ],
      address: {
        id: addressId,
        additionalInfo: additionalInfo,
        street: street,
        cityInfo: {
          zipCode: zipCode,
          city: city,
        },
      },
      phones: [
        {
          id: phoneId,
          descriptionPhone: descriptionPhone,
        },
      ],
    };

    try {
      const response = await fetch("https://aleksdat.dk/tomcat/sp1/api/person/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personData),
      });

      if (response.ok) {
        const addedPerson = await response.json();
        console.log("Person added:", addedPerson);
        // Display a success message or update the UI
        resetForm();
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to add person:", error);
      // Display an error message or update the UI
    }
  });
});

// Get a reference to the delete button
const deleteBtn = document.getElementById("delete-btn");

// Add an event listener to the delete button
deleteBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    // Get the ID of the person you want to delete
    const personId = prompt("Enter the ID of the person you want to delete:");

    try {
        const response = await fetch(`https://aleksdat.dk/tomcat/sp1/api/person/${personId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const deletedPerson = await response.json();
            console.log("Person deleted:", deletedPerson);

            // Send the user to the top of the screen
            window.scrollTo(0, 0);

            // Display a success message
            const successMsg = document.getElementById("success-message");
            successMsg.textContent = "Person deleted successfully.";

        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Failed to delete person:", error);
        // Display an error message or update the UI
    }
});

