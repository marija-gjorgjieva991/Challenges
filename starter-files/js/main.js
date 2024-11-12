document.addEventListener("DOMContentLoaded", () => {
  fetch("https://challenges.brainster.tech/ajax_data/data.json")
    .then((response) => response.json())
    .then((data) => {
      if (data.products && Array.isArray(data.products)) {
        const bikesContainer = document.querySelector(".bikes-container");
        const filtersContainer = document.querySelector(".filters-container");

        let totalBikes = data.products.length;
        let maleBikes = 0;
        let femaleBikes = 0;

        const brandCounts = {
          "LE GRAND BIKES": 0,
          KROSS: 0,
          EXPLORER: 0,
          VISITOR: 0,
          PONY: 0,
          FORCE: 0,
          "E-BIKES": 0,
          IDEAL: 0,
        };

        data.products.forEach((bike) => {
          if (bike.gender === "MALE") {
            maleBikes++;
          } else if (bike.gender === "FEMALE") {
            femaleBikes++;
          }

          if (brandCounts.hasOwnProperty(bike.brand.toUpperCase())) {
            brandCounts[bike.brand.toUpperCase()]++;
          }
        });

        const showAllSpan = document.querySelector(".show-all");
        showAllSpan.textContent = totalBikes;
        showAllSpan.classList.add("filter-count");
        filtersContainer.querySelector("p").textContent = "Show all ";
        filtersContainer.querySelector("p").appendChild(showAllSpan);

        const maleSpan = document.querySelector(".male");
        maleSpan.textContent = maleBikes;
        maleSpan.classList.add("filter-count");
        filtersContainer.querySelector("h4:nth-of-type(1) + p").textContent =
          "Male ";
        filtersContainer
          .querySelector("h4:nth-of-type(1) + p")
          .appendChild(maleSpan);

        const femaleSpan = document.querySelector(".female");
        femaleSpan.textContent = femaleBikes;
        femaleSpan.classList.add("filter-count");
        filtersContainer.querySelector(
          "h4:nth-of-type(1) + p + p"
        ).textContent = "Female ";
        filtersContainer
          .querySelector("h4:nth-of-type(1) + p + p")
          .appendChild(femaleSpan);

        const brandList = document.querySelector(".brand-list");
        const brandItems = brandList.querySelectorAll("li");

        brandItems.forEach((item) => {
          const brandName = item
            .querySelector(".brand-name")
            .textContent.trim()
            .toUpperCase();

          if (brandCounts.hasOwnProperty(brandName)) {
            const bikeCount = brandCounts[brandName];
            const countSpan = item.querySelector(".brand-count");
            countSpan.textContent = bikeCount;
          }

          item.addEventListener("click", () => {
            const clickedBrandName = item
              .querySelector(".brand-name")
              .textContent.trim()
              .toUpperCase();
            const filteredBikes = data.products.filter((bike) => {
              const bikeBrand = bike.brand.trim().toUpperCase();
              return bikeBrand === clickedBrandName;
            });

            setActiveFilter(item);
            displayBikes(filteredBikes);
          });
        });

        filtersContainer
          .querySelector("#show-all")
          .addEventListener("click", () => {
            setActiveFilter(filtersContainer.querySelector("#show-all"));
            displayBikes(data.products);
          });

        filtersContainer
          .querySelector("#male")
          .addEventListener("click", () => {
            setActiveFilter(filtersContainer.querySelector("#male"));
            const maleBikes = data.products.filter(
              (bike) => bike.gender === "MALE"
            );
            displayBikes(maleBikes);
          });

        filtersContainer
          .querySelector("#female")
          .addEventListener("click", () => {
            setActiveFilter(filtersContainer.querySelector("#female"));
            const femaleBikes = data.products.filter(
              (bike) => bike.gender === "FEMALE"
            );
            displayBikes(femaleBikes);
          });

        function setActiveFilter(selectedFilter) {
          document
            .querySelectorAll(".filters-container p, .brand-list li")
            .forEach((filter) => filter.classList.remove("active"));

          selectedFilter.classList.add("active");
        }

        function displayBikes(bikes) {
          bikesContainer.innerHTML = "";

          if (bikes.length === 0) {
            bikesContainer.innerHTML = "<p>No bikes found.</p>";
          } else {
            bikes.forEach((bike) => {
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
                </div>
              `;
              bikesContainer.appendChild(card);
            });
          }
        }

        setActiveFilter(filtersContainer.querySelector("#show-all"));
        displayBikes(data.products);
      } else {
        console.error("No products array found in the data:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching bike data:", error);
    });
});
