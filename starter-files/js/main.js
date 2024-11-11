fetch("https://challenges.brainster.tech/ajax_data/data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    if (data.products && Array.isArray(data.products)) {
      const bikesContainer = document.querySelector(".bikes-container");

      data.products.forEach((bike) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
				<div class="card-body">
          <img src="./img/${bike.image}.png" alt="${
          bike.name
        }" class="bike-image card-img-top" />
          <div class="bike-details">
            <h4 class="bike-name">${bike.name}</h4>
            <p class="bike-price">${bike.price.toLocaleString()}$</p>
          </div>
        `;
        bikesContainer.appendChild(card);
      });
    } else {
      console.error("No products array found in the data:", data);
    }
  })
  .catch((error) => {
    console.error("Error fetching bike data:", error);
  });
