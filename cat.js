const apiKey = "live_93yxlgthCd7Vp9FEW3M3qOPV6CIFyx9BFEQlgerfPPPZqDRMCCtGpCl6WwEBZ3Ue"; //This is the API of the project which get from this website https://api.thecatapi.com/v1/breeds
const catContainer = document.getElementById("catContainer");
const loadButton = document.getElementById("loadCats");
const breedSelect = document.getElementById("breedSelect");

async function loadBreeds() {
  try {
    const res = await fetch("https://api.thecatapi.com/v1/breeds", { //fetch the data of all breeds of cats, this was used for inserting inner.html option for user to select breed.
      headers: { "x-api-key": apiKey }
    });
    const breeds = await res.json();
    breeds.forEach(b => {
      const option = document.createElement("option");
      option.value = b.id;
      option.textContent = b.name;
      breedSelect.appendChild(option); //inserts the breed in option tag using appendchild
    });
  } catch (err) {
    console.error("Error loading breeds:", err); //displays error.
  }
}

async function fetchCats() {
  const breedId = breedSelect.value;
  if (!breedId) return alert("Please select a breed.");

  try {
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`, { //pass the selected data of user to displayCats function.
      headers: { "x-api-key": apiKey }
    });
    const data = await res.json();
    displayCats(data);
  } catch (err) {
    console.error("Error fetching cats:", err);
  }
}

function displayCats(cats) { //displays the breed information of the cat.
    catContainer.innerHTML = ""; 

    cats.forEach(cat => {
        const breed = cat.breeds[0];

        catContainer.innerHTML += `
            <div class="cat-card">
            <img src="${cat.url}" alt="${breed?.name || 'Cat'}"> 

            <div class="cat-info">
                <h3>${breed?.name || "Unknown Breed"}</h3>
                <p><strong>Origin:</strong> ${breed?.origin || "N/A"}</p>
                <p><strong>Temperament:</strong> ${breed?.temperament || "N/A"}</p>
                <p class="description">
                ${breed?.description || "No description available."}
                </p>
            </div>
            </div>
        `;
    });

}

loadBreeds();

