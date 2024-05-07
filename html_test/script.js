document.addEventListener("DOMContentLoaded", function () {
  const circles = document.querySelectorAll(".circle");
  const handPointer = document.getElementById("handPointer");
  let lastCircle = null; // To keep track of the last circle with a red border
  let isPaused = false; // To pause hand animation during the 5-second countdown

  function animatePointer() {
    if (!isPaused) {
      circles.forEach((circle, index) => {
        setTimeout(() => {
          if (lastCircle) {
            lastCircle.classList.remove("red-border"); // Remove the red border from the last circle
          }

          const circleRect = circle.getBoundingClientRect();
          const handPointerRect = handPointer.getBoundingClientRect();

          // Calculate center positions
          const circleCenterX = circleRect.left + circleRect.width / 2;
          const circleCenterY = circleRect.top + circleRect.height / 2;
          const handPointerCenterX = handPointerRect.width / 2;
          const handPointerCenterY = handPointerRect.height / 2;

          // Adjust hand pointer to circle center
          const moveX = circleCenterX - handPointerCenterX;
          const moveY = circleCenterY - handPointerCenterY;

          handPointer.style.transform = `translate(${moveX}px, ${moveY}px)`;

          // Change border after the hand pointer has moved
          setTimeout(() => {
            circle.classList.add("red-border");
            lastCircle = circle; // Update the lastCircle to the current one
          }, 500); // Adjust this time to match the duration of the pointer movement
        }, index * 1000);
      });

      // Restart the animation to loop continuously
      setTimeout(animatePointer, circles.length * 1000 + 1000); // Loops the animation
    }
  }

  const countdownElement = document.getElementById("countdownTimer");
  let time = 30; // 30 seconds for the countdown

  function updateCountdown() {
    if (time > 0) {
      countdownElement.textContent = time;
      time--;
      setTimeout(updateCountdown, 1000);
    } else if (time === 0) {
      countdownElement.textContent = "Time's up!";
      isPaused = true; // Pause the hand animation
      setTimeout(() => {
        // Start a new 5-second countdown
        time = 5;
        countdownElement.textContent = time;
        updateShortCountdown();
      }, 1000);

      document.getElementById("countdownCircle").style.backgroundColor =
        "black";
      document.getElementById("countdownCircle").style.opacity = "0.5";
      document.getElementById("pleasebet").innerHTML = "";

      function animateDivs() {
        const circles = document.querySelectorAll(".circle");

        circles.forEach((circle, index) => {
          setTimeout(() => {
            circle.style.backgroundColor = "black";
            circle.style.opacity = "0.5";

            // Reset to default background color and opacity after animation
            setTimeout(() => {
              circle.style.backgroundColor = ""; // Set to default background color
              circle.style.opacity = ""; // Set to default opacity
            }, 50); // Reset after one second
          }, index * 50); // Set a delay of one second for each div
        });

        // Call animateDivs function recursively to loop the animation
        animationTimeout = setTimeout(animateDivs, 50 * circles.length);
      }

      // Start the animation
      animateDivs();
    }
  }

  function updateShortCountdown() {
    if (time > 0) {
      countdownElement.textContent = time;
      time--;
      setTimeout(updateShortCountdown, 1000);
    } else {
      countdownElement.textContent = "Go!";
      isPaused = false; // Resume hand animation
      animatePointer(); // Restart pointer animation
      clearTimeout(animationTimeout);
      openreslutmodel();
      setTimeout(function () {
        location.reload();
      }, 5000);
    }
  }

  animatePointer(); // Initial call to start the hand animation
  updateCountdown(); // Initial call to start the countdown
});

var betamount;

function betbutton(count) {
  betamount = count;
}

var selectedCount = 6;

function seletectimg(img) {
  var selectedDiv = document.getElementById(img.toString());
  var selectedDivs = document.querySelectorAll('.circle[style*="lightgreen"]');

  if (selectedDivs.length >= 6 && !selectedDiv.style.backgroundColor) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    return;
  }

  if (selectedDiv.style.backgroundColor !== "lightgreen") {
    selectedDiv.style.backgroundColor = "lightgreen";
    selectedCount--;
  } else {
    selectedDiv.style.backgroundColor = "";
    selectedCount++;
  }

  if (selectedCount < 0) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  imgvalue = img;
}

var imgvalue;

function checkJsonArray(jsonArray) {
  jsonArray.forEach((item) => {
    if (item === "10") {
      document.getElementById("rimg").src = "./image1.png";
    } else if (item === "15") {
      document.getElementById("rimg").src = "./image2.png";
    } else if (item === "20") {
      document.getElementById("rimg").src = "./image3.png";
    } else if (item === "25") {
      document.getElementById("rimg").src = "./image4.png";
    } else if (item === "30") {
      document.getElementById("rimg").src = "./image5.png";
    } else if (item === "35") {
      document.getElementById("rimg").src = "./image6.png";
    } else if (item === "40") {
      document.getElementById("rimg").src = "./image7.png";
    } else if (item === "45") {
      document.getElementById("rimg").src = "./image8.png";
    }

    if (jsonArray.includes(imgvalue)) {
      var tottalpoint = betamount * imgvalue;

      document.getElementById("totalpoint").innerHTML = tottalpoint;
    }

    // Add more else if conditions for other values as needed
  });
}

// Now you can call this function from other places in your code
fetch("your_server_endpoint")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse JSON response
  })
  .then((jsonArray) => {
    // Call the function and pass the JSON array as a parameter
    checkJsonArray(jsonArray);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function openreslutmodel() {
  var modal = document.getElementById("resultpop");
  modal.style.display = "block";

  var span = document.getElementsByClassName("close1")[0];

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";

      location.reload();
    }
  };
}

function populateHTML(jsonArray) {
  // Select the container element where you want to append the HTML
  var container = document.getElementById("container");

  // Iterate over the JSON array
  jsonArray.forEach((item) => {
    document.getElementById("topscoreimg").src = item.img;

    document.getElementById("topscorename").src = item.name;

    document.getElementById("topscoreimg2").src = item.img2;

    document.getElementById("topscorename2").src = item.name2;

    document.getElementById("topscoreimg3").src = item.img3;

    document.getElementById("topscorename3").src = item.name3;

    // Set inner HTML of the div to include image and name
    div.innerHTML = `<img src="${item.img}" alt="${item.name}"> <p>${item.name}</p>`;

    // Append the div to the container
    container.appendChild(div);
  });
}

// Fetch JSON data and call the function
fetch("your_server_endpoint")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse JSON response
  })
  .then((jsonArray) => {
    // Call the function and pass the JSON array as a parameter
    populateHTML(jsonArray);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Get the modal
// Get the modal element
document.addEventListener("DOMContentLoaded", function () {
  var leaderboardModal = document.getElementById("leaderbordpop");
  var closeButton = document.querySelector(".close3");

  function openModal() {
    leaderboardModal.style.display = "block";
  }

  function closeModal() {
    leaderboardModal.style.display = "none";
  }

  if (closeButton) {
    closeButton.onclick = closeModal;
  }

  window.onclick = function (event) {
    if (event.target == leaderboardModal) {
      closeModal();
    }
  };

  // Move the openleaderbord function inside the DOMContentLoaded event listener
  function openleaderbord() {
    openModal();
  }

  // Get the button element for opening the leaderboard
  var openLeaderboardButton = document.getElementById("openLeaderboardButton");

  // Add event listener to the button
  if (openLeaderboardButton) {
    openLeaderboardButton.onclick = openleaderbord;
  }
});

function leaderbord(jsonArray) {
  // Select the container element where you want to append the HTML
  var container = document.getElementById("container");

  // Iterate over the JSON array
  jsonArray.forEach((item) => {
    document.getElementById("lbp1").src = item.img;
    document.getElementById("lbn1").src = item.name;
    document.getElementById("lbs1").src = item.score;

    document.getElementById("lbp2").src = item.img2;
    document.getElementById("lbn2").src = item.name2;
    document.getElementById("lbs2").src = item.score2;

    document.getElementById("lbp3").src = item.img3;
    document.getElementById("lbn3").src = item.name3;
    document.getElementById("lbs3").src = item.score3;

    document.getElementById("lbp4").src = item.img4;
    document.getElementById("lbn4").src = item.name4;
    document.getElementById("lbs4").src = item.score4;

    document.getElementById("lbp5").src = item.img5;
    document.getElementById("lbn5").src = item.name5;
    document.getElementById("lbs5").src = item.score5;

    // Set inner HTML of the div to include image and name
    div.innerHTML = `<img src="${item.img}" alt="${item.name}"> <p>${item.name}</p>`;

    // Append the div to the container
    container.appendChild(div);
  });
}

// Fetch JSON data and call the function
fetch("your_server_endpoint")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse JSON response
  })
  .then((jsonArray) => {
    // Call the function and pass the JSON array as a parameter
    populateHTML(jsonArray);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function resultlist(jsonArray) {
  // Select the container element where you want to append the HTML
  var container = document.getElementById("container");

  // Iterate over the JSON array
  jsonArray.forEach((item) => {
    document.getElementById("i1").src = item.img;

    document.getElementById("i2").src = item.img2;

    document.getElementById("i3").src = item.img3;

    document.getElementById("i4").src = item.img4;

    document.getElementById("i5").src = item.img5;

    // Set inner HTML of the div to include image and name
    div.innerHTML = `<img src="${item.img}" alt="${item.name}"> <p>${item.name}</p>`;

    // Append the div to the container
    container.appendChild(div);
  });
}

// Fetch JSON data and call the function
fetch("your_server_endpoint")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse JSON response
  })
  .then((jsonArray) => {
    // Call the function and pass the JSON array as a parameter
    populateHTML(jsonArray);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
