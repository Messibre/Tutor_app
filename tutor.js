function createTutorProfile(tutor) {
  // tutor: { name, imageUrl, gender, phone, address, subject, experience, bio }
  const card = document.createElement("div");
  card.className = "tutor-card";

  // Image
  const img = document.createElement("img");
  img.src = tutor.imageUrl || "default-profile.png";
  img.alt = `${tutor.name}'s photo`;
  img.className = "tutor-image";
  card.appendChild(img);

  // Name
  const name = document.createElement("h2");
  name.textContent = tutor.name;
  card.appendChild(name);

  // Gender
  const gender = document.createElement("p");
  gender.textContent = `Gender: ${tutor.gender}`;
  card.appendChild(gender);

  // Phone
  const phone = document.createElement("p");
  phone.textContent = `Phone: ${tutor.phone}`;
  card.appendChild(phone);

  // Address
  const address = document.createElement("p");
  address.textContent = `Address: ${tutor.address}`;
  card.appendChild(address);

  // Subject
  const subject = document.createElement("p");
  subject.textContent = `Subject: ${tutor.subject}`;
  card.appendChild(subject);

  // Experience (optional)
  if (tutor.experience) {
    const exp = document.createElement("p");
    exp.textContent = `Experience: ${tutor.experience} years`;
    card.appendChild(exp);
  }

  // Bio (optional)
  if (tutor.bio) {
    const bio = document.createElement("p");
    bio.textContent = tutor.bio;
    card.appendChild(bio);
  }

  // Contact button
  const contactBtn = document.createElement("button");
  contactBtn.textContent = "Contact Tutor";
  contactBtn.onclick = () => {
    window.open(`tel:${tutor.phone}`);
  };
  card.appendChild(contactBtn);

  // Rating display
  const ratingDiv = document.createElement("div");
  ratingDiv.className = "rating";
  const avgRating = tutor.ratings?.length
    ? (
        tutor.ratings.reduce((sum, r) => sum + r.value, 0) /
        tutor.ratings.length
      ).toFixed(1)
    : 0;
  ratingDiv.innerHTML = `⭐ ${avgRating} (${
    tutor.ratings?.length || 0
  } reviews)`;
  card.appendChild(ratingDiv);

  // Action buttons
  const actionDiv = document.createElement("div");
  actionDiv.className = "tutor-actions";
  actionDiv.style.marginTop = "15px";
  actionDiv.style.textAlign = "center";

  const favoriteBtn = document.createElement("button");
  favoriteBtn.textContent = "❤️ Add to Favorites";
  favoriteBtn.className = "tutor-action-btn";
  favoriteBtn.onclick = () => addToFavorites(tutor._id);

  const rateBtn = document.createElement("button");
  rateBtn.textContent = "⭐ Rate Tutor";
  rateBtn.className = "tutor-action-btn";
  rateBtn.onclick = () => rateTutor(tutor._id, tutor.name);

  actionDiv.appendChild(favoriteBtn);
  actionDiv.appendChild(rateBtn);
  card.appendChild(actionDiv);

  return card;
}

function createTutorSignupForm(onSubmit) {
  const form = document.createElement("form");
  form.className = "tutor-signup-form";

  // Helper to create labeled input
  function addField(labelText, name, type = "text", required = true) {
    const label = document.createElement("label");
    label.textContent = labelText;
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    if (required) input.required = true;
    label.appendChild(input);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  }

  addField("Name", "name");
  addField("Email", "email", "email");
  addField("Password", "password", "password");

  // Enhanced image upload field
  const imageLabel = document.createElement("label");
  imageLabel.textContent = "Profile Image";
  const imageContainer = document.createElement("div");
  imageContainer.style.margin = "10px 0";

  const imageUrlInput = document.createElement("input");
  imageUrlInput.type = "url";
  imageUrlInput.name = "imageUrl";
  imageUrlInput.placeholder = "Or enter image URL";
  imageUrlInput.style.marginBottom = "10px";

  const imageFileInput = document.createElement("input");
  imageFileInput.type = "file";
  imageFileInput.name = "imageFile";
  imageFileInput.accept = "image/*";
  imageFileInput.style.marginBottom = "10px";

  const imagePreview = document.createElement("img");
  imagePreview.id = "signup-image-preview";
  imagePreview.style.width = "80px";
  imagePreview.style.height = "80px";
  imagePreview.style.borderRadius = "50%";
  imagePreview.style.objectFit = "cover";
  imagePreview.style.border = "2px solid var(--gray-300)";
  imagePreview.style.display = "none";
  imagePreview.style.marginTop = "10px";

  const imageHelp = document.createElement("div");
  imageHelp.textContent = "Upload an image file or provide an image URL";
  imageHelp.style.fontSize = "12px";
  imageHelp.style.color = "var(--gray-500)";

  imageContainer.appendChild(imageUrlInput);
  imageContainer.appendChild(document.createElement("br"));
  imageContainer.appendChild(imageFileInput);
  imageContainer.appendChild(document.createElement("br"));
  imageContainer.appendChild(imagePreview);
  imageContainer.appendChild(imageHelp);

  imageLabel.appendChild(imageContainer);
  form.appendChild(imageLabel);
  form.appendChild(document.createElement("br"));

  // Add image preview functionality
  imageFileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  imageUrlInput.addEventListener("input", function (e) {
    if (e.target.value) {
      imagePreview.src = e.target.value;
      imagePreview.style.display = "block";
    } else {
      imagePreview.style.display = "none";
    }
  });

  addField("Gender", "gender");
  addField("Phone", "phone", "tel");
  addField("Address", "address");
  addField("Subject", "subject");
  addField("Experience (years)", "experience", "number");
  // Bio textarea
  const bioLabel = document.createElement("label");
  bioLabel.textContent = "Bio";
  const bioInput = document.createElement("textarea");
  bioInput.name = "bio";
  bioInput.rows = 3;
  bioLabel.appendChild(bioInput);
  form.appendChild(bioLabel);
  form.appendChild(document.createElement("br"));

  // Submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Sign Up";
  form.appendChild(submitBtn);

  form.onsubmit = function (e) {
    e.preventDefault();
    const data = {};
    Array.from(form.elements).forEach((el) => {
      if (el.name) {
        // Handle file inputs separately
        if (el.type === "file" && el.files && el.files.length > 0) {
          data[el.name] = el.files[0]; // Store the file object
        } else {
          data[el.name] = el.value;
        }
      }
    });
    if (onSubmit) onSubmit(data);
  };

  return form;
}

// Account type selection before signup
const signupFormContainer = document.getElementById("signup-form-container");
const listContainer = document.getElementById("tutors-list");
signupFormContainer.innerHTML = "";
const accountTypeDiv = document.createElement("div");
accountTypeDiv.style.textAlign = "center";
accountTypeDiv.style.marginBottom = "24px";
const accountLabel = document.createElement("h3");
accountLabel.textContent = "Create an account as:";
accountTypeDiv.appendChild(accountLabel);
const tutorBtn = document.createElement("button");
tutorBtn.textContent = "Tutor";
tutorBtn.style.margin = "0 12px";
const parentBtn = document.createElement("button");
parentBtn.textContent = "Parent";
parentBtn.style.margin = "0 12px";
accountTypeDiv.appendChild(tutorBtn);
accountTypeDiv.appendChild(parentBtn);
signupFormContainer.appendChild(accountTypeDiv);

// Create login form
function createLoginForm() {
  const loginFormContainer = document.getElementById("login-form-container");
  loginFormContainer.innerHTML = "";

  const form = document.createElement("form");
  form.className = "login-form";

  // Account type selection
  const accountTypeDiv = document.createElement("div");
  accountTypeDiv.style.textAlign = "center";
  accountTypeDiv.style.marginBottom = "24px";

  const accountLabel = document.createElement("h3");
  accountLabel.textContent = "Login as:";
  accountTypeDiv.appendChild(accountLabel);

  const tutorLoginBtn = document.createElement("button");
  tutorLoginBtn.textContent = "Tutor";
  tutorLoginBtn.type = "button";
  tutorLoginBtn.style.margin = "0 12px";

  const parentLoginBtn = document.createElement("button");
  parentLoginBtn.textContent = "Parent";
  parentLoginBtn.type = "button";
  parentLoginBtn.style.margin = "0 12px";

  accountTypeDiv.appendChild(tutorLoginBtn);
  accountTypeDiv.appendChild(parentLoginBtn);
  form.appendChild(accountTypeDiv);

  // Login form fields
  const emailField = document.createElement("div");
  emailField.innerHTML = `
    <label>Email:</label><br>
    <input type="email" name="email" placeholder="example@gmail.com" required style="width: 100%; padding: 8px; margin: 5px 0;">
  `;
  form.appendChild(emailField);

  const passwordField = document.createElement("div");
  passwordField.innerHTML = `
    <label>Password:</label><br>
    <input type="password" name="password" required style="width: 100%; padding: 8px; margin: 5px 0;">
  `;
  form.appendChild(passwordField);

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Login";
  submitBtn.style.marginTop = "16px";
  form.appendChild(submitBtn);

  let currentUserType = "tutor";

  tutorLoginBtn.onclick = () => {
    currentUserType = "tutor";
    tutorLoginBtn.style.backgroundColor = "#007bff";
    parentLoginBtn.style.backgroundColor = "";
  };

  parentLoginBtn.onclick = () => {
    currentUserType = "parent";
    parentLoginBtn.style.backgroundColor = "#007bff";
    tutorLoginBtn.style.backgroundColor = "";
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const endpoint =
        currentUserType === "tutor"
          ? "/api/tutors/login"
          : "/api/parents/login";
      const response = await fetch(window.getApiUrl(endpoint), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const user = await response.json();
        const userWithType = { ...user, userType: currentUserType };
        localStorage.setItem("currentUser", JSON.stringify(userWithType));

        // Update navigation for logged in user
        updateNavigationForLoggedInUser(userWithType);

        showNotification(`Welcome back, ${user.name}!`, "success");

        // Show appropriate dashboard
        if (currentUserType === "tutor") {
          showTutorDashboard(user);
        } else {
          showParentDashboard(user);
        }
      } else {
        const error = await response.json();
        showNotification(
          `Login failed: ${error.error || "Invalid credentials"}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Login failed. Please try again.", "error");
    }
  };

  loginFormContainer.appendChild(form);
}

// Create signup form (updated)
function createSignupForm() {
  const signupFormContainer = document.getElementById("signup-form-container");
  signupFormContainer.innerHTML = "";

  const accountTypeDiv = document.createElement("div");
  accountTypeDiv.style.textAlign = "center";
  accountTypeDiv.style.marginBottom = "24px";
  const accountLabel = document.createElement("h3");
  accountLabel.textContent = "Create an account as:";
  accountTypeDiv.appendChild(accountLabel);
  const tutorBtn = document.createElement("button");
  tutorBtn.textContent = "Tutor";
  tutorBtn.style.margin = "0 12px";
  const parentBtn = document.createElement("button");
  parentBtn.textContent = "Parent";
  parentBtn.style.margin = "0 12px";
  accountTypeDiv.appendChild(tutorBtn);
  accountTypeDiv.appendChild(parentBtn);
  signupFormContainer.appendChild(accountTypeDiv);

  tutorBtn.onclick = () => showTutorForm();
  parentBtn.onclick = () => showParentForm();
}

// Show tutor signup form
function showTutorForm() {
  const signupFormContainer = document.getElementById("signup-form-container");
  signupFormContainer.innerHTML = "";
  signupFormContainer.appendChild(
    createTutorSignupForm(async (data) => {
      try {
        // Handle image file upload
        const imageFile = data.imageFile;
        if (imageFile) {
          // Convert file to base64 data URL
          const reader = new FileReader();
          reader.onload = function (e) {
            data.imageUrl = e.target.result;
            delete data.imageFile; // Remove file object
            submitTutorSignup(data);
          };
          reader.readAsDataURL(imageFile);
        } else {
          delete data.imageFile; // Remove file object if no file
          submitTutorSignup(data);
        }
      } catch (error) {
        console.error("Error:", error);
        showNotification("Signup failed. Please try again.", "error");
      }
    })
  );

  async function submitTutorSignup(data) {
    try {
      const response = await fetch(window.getApiUrl("/api/tutors"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newTutor = await response.json();
        listContainer.appendChild(createTutorProfile(newTutor));

        // Log in the new tutor automatically
        const userWithType = { ...newTutor, userType: "tutor" };
        localStorage.setItem("currentUser", JSON.stringify(userWithType));
        updateNavigationForLoggedInUser(userWithType);

        showNotification(
          "Tutor signup successful! You are now logged in.",
          "success"
        );
        showTutorDashboard(newTutor);
      } else {
        const error = await response.json();
        showNotification(
          `Signup failed: ${error.error || "Unknown error"}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Signup failed. Please try again.", "error");
    }
  }
}
// Show parent signup form
function createParentSignupForm(onSubmit) {
  const form = document.createElement("form");
  form.className = "tutor-signup-form";
  function addField(labelText, name, type = "text", required = true) {
    const label = document.createElement("label");
    label.textContent = labelText;
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    if (required) input.required = true;
    label.appendChild(input);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  }
  addField("Name", "name");
  addField("Email", "email", "email");
  addField("Password", "password", "password");
  addField("Phone", "phone", "tel", false);
  addField("Address", "address", "text", false);
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Sign Up";
  form.appendChild(submitBtn);
  form.onsubmit = function (e) {
    e.preventDefault();
    const data = {};
    Array.from(form.elements).forEach((el) => {
      if (el.name) data[el.name] = el.value;
    });
    if (onSubmit) onSubmit(data);
  };
  return form;
}
function showParentForm() {
  signupFormContainer.innerHTML = "";
  signupFormContainer.appendChild(
    createParentSignupForm(async (data) => {
      try {
        const response = await fetch(window.getApiUrl("/api/parents/signup"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const newParent = await response.json();

          // Log in the new parent automatically
          const userWithType = { ...newParent, userType: "parent" };
          localStorage.setItem("currentUser", JSON.stringify(userWithType));
          updateNavigationForLoggedInUser(userWithType);

          showNotification(
            "Parent signup successful! You are now logged in.",
            "success"
          );
          showParentDashboard(newParent);
        } else {
          const error = await response.json();
          showNotification(`Signup failed: ${error.error || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error:", error);
        showNotification("Signup failed. Please try again.", "error");
      }
    })
  );
}
tutorBtn.onclick = showTutorForm;
parentBtn.onclick = showParentForm;

// Function to load tutors from the database
async function loadTutors() {
  try {
    const response = await fetch("http://localhost:3001/api/tutors");
    if (response.ok) {
      const tutors = await response.json();
      listContainer.innerHTML = "";
      tutors.forEach((tutor) => {
        listContainer.appendChild(createTutorProfile(tutor));
      });
    } else {
      console.error("Failed to load tutors");
      // Fallback to empty state
      listContainer.innerHTML = "<p>No tutors available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error loading tutors:", error);
    listContainer.innerHTML =
      "<p>Error loading tutors. Please try again later.</p>";
  }
}

// Dashboard functions
function showTutorDashboard(tutor) {
  // Ensure tutorDashboard is initialized
  if (!tutorDashboard) {
    tutorDashboard = document.getElementById("tutor-dashboard");
  }
  showSection(tutorDashboard);
  const dashboardContent = document.getElementById("tutor-dashboard-content");
  dashboardContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h3>Welcome back, ${tutor.name}!</h3>
      <p>Manage your tutor profile and track your performance</p>
      <div style="margin-top: 10px;">
        <span class="status-badge ${
          tutor.status
        }">${tutor.status.toUpperCase()}</span>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
      <!-- Profile Management -->
      <div class="dashboard-card">
        <h4>📝 Profile Management</h4>
        <div style="margin: 15px 0;">
          <button class="dashboard-btn" onclick="editTutorProfile('${
            tutor._id
          }')">
            ✏️ Edit Profile
          </button>
          <button class="dashboard-btn" onclick="updateTutorStatus('${
            tutor._id
          }')">
            🔄 Update Status
          </button>
        </div>
        <div class="profile-summary">
          <p><strong>Subject:</strong> ${tutor.subject || "Not set"}</p>
          <p><strong>Experience:</strong> ${tutor.experience || 0} years</p>
          <p><strong>Phone:</strong> ${tutor.phone || "Not provided"}</p>
          <p><strong>Address:</strong> ${tutor.address || "Not provided"}</p>
        </div>
      </div>
      
      <!-- Quick Stats -->
      <div class="dashboard-card">
        <h4>📊 Quick Stats</h4>
        <div id="tutor-stats">
          <div class="stat-item">
            <span class="stat-number" id="total-ratings">-</span>
            <span class="stat-label">Total Ratings</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" id="avg-rating">-</span>
            <span class="stat-label">Average Rating</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" id="profile-views">-</span>
            <span class="stat-label">Profile Views</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Ratings Section -->
    <div class="dashboard-card">
      <h4>⭐ My Ratings & Reviews</h4>
      <div id="tutor-ratings">Loading ratings...</div>
    </div>
    
    <!-- Recent Activity -->
    <div class="dashboard-card">
      <h4>📈 Recent Activity</h4>
      <div id="recent-activity">
        <p>No recent activity</p>
      </div>
    </div>
  `;

  loadTutorRatings(tutor._id);
  loadTutorStats(tutor._id);
  updateNavForLoggedInUser("tutor");
}

// Update navigation for logged-in users
function updateNavForLoggedInUser(userType) {
  const nav = document.querySelector("nav");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Add logout button
  if (!document.getElementById("logout-btn")) {
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-btn";
    logoutBtn.className = "nav-btn";
    logoutBtn.textContent = "Logout";
    logoutBtn.style.backgroundColor = "#dc2626";
    logoutBtn.onclick = logout;
    nav.appendChild(logoutBtn);
  }

  // Add dashboard button
  if (!document.getElementById("dashboard-btn")) {
    const dashboardBtn = document.createElement("button");
    dashboardBtn.id = "dashboard-btn";
    dashboardBtn.className = "nav-btn";
    dashboardBtn.textContent =
      userType === "tutor" ? "My Dashboard" : "My Dashboard";
    dashboardBtn.onclick = () => {
      if (userType === "tutor") {
        showTutorDashboard(currentUser);
      } else {
        showParentDashboard(currentUser);
      }
    };
    nav.appendChild(dashboardBtn);
  }
}

// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  location.reload(); // Refresh page to reset state
}

function showParentDashboard(parent) {
  // Ensure parentDashboard is initialized
  if (!parentDashboard) {
    parentDashboard = document.getElementById("parent-dashboard");
  }
  showSection(parentDashboard);
  const dashboardContent = document.getElementById("parent-dashboard-content");
  dashboardContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h3>Welcome back, ${parent.name}!</h3>
      <p>Manage your favorite tutors and track your rating history</p>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
      <!-- My Favorites -->
      <div class="dashboard-card">
        <h4>❤️ My Favorite Tutors</h4>
        <div id="parent-favorites">Loading favorites...</div>
      </div>
      
      <!-- Quick Stats -->
      <div class="dashboard-card">
        <h4>📊 My Activity</h4>
        <div id="parent-stats">
          <div class="stat-item">
            <span class="stat-number" id="favorites-count">-</span>
            <span class="stat-label">Favorite Tutors</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" id="ratings-given">-</span>
            <span class="stat-label">Ratings Given</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" id="avg-rating-given">-</span>
            <span class="stat-label">Avg Rating Given</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Rating History -->
    <div class="dashboard-card">
      <h4>⭐ My Rating History</h4>
      <div id="parent-ratings">Loading rating history...</div>
    </div>
    
    <!-- Recent Activity -->
    <div class="dashboard-card">
      <h4>📈 Recent Activity</h4>
      <div id="parent-recent-activity">
        <p>No recent activity</p>
      </div>
    </div>
  `;

  loadParentFavorites(parent._id);
  loadParentRatings(parent._id);
  loadParentStats(parent._id);
  updateNavForLoggedInUser("parent");
}

// Search and filter functionality
let allTutors = []; // Store all tutors for filtering

// Enhanced loadTutors function with search/filter support
async function loadTutorsWithFilter() {
  try {
    const response = await fetch("http://localhost:3001/api/tutors");
    if (response.ok) {
      allTutors = await response.json();
      displayTutors(allTutors);
    } else {
      console.error("Failed to load tutors");
      listContainer.innerHTML = "<p>No tutors available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error loading tutors:", error);
    listContainer.innerHTML =
      "<p>Error loading tutors. Please try again later.</p>";
  }
}

// Display tutors with optional filtering
function displayTutors(tutors) {
  listContainer.innerHTML = "";
  if (tutors.length === 0) {
    listContainer.innerHTML = "<p>No tutors found matching your criteria.</p>";
    return;
  }
  tutors.forEach((tutor) => {
    listContainer.appendChild(createTutorProfile(tutor));
  });
}

// Search functionality
function setupSearchAndFilter() {
  const searchInput = document.getElementById("search-input");
  const subjectFilter = document.getElementById("subject-filter");
  const searchBtn = document.getElementById("search-btn");

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedSubject = subjectFilter.value;

    let filteredTutors = allTutors;

    // Filter by search term
    if (searchTerm) {
      filteredTutors = filteredTutors.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(searchTerm) ||
          tutor.subject.toLowerCase().includes(searchTerm) ||
          (tutor.bio && tutor.bio.toLowerCase().includes(searchTerm))
      );
    }

    // Filter by subject (case-insensitive)
    if (selectedSubject) {
      filteredTutors = filteredTutors.filter(
        (tutor) =>
          tutor.subject &&
          tutor.subject.toLowerCase() === selectedSubject.toLowerCase()
      );
    }

    displayTutors(filteredTutors);
  }

  // Event listeners
  searchBtn.onclick = performSearch;
  searchInput.onkeypress = (e) => {
    if (e.key === "Enter") performSearch();
  };
  subjectFilter.onchange = performSearch;

  // Clear search
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear";
  clearBtn.style.padding = "8px 16px";
  clearBtn.style.marginLeft = "10px";
  clearBtn.onclick = () => {
    searchInput.value = "";
    subjectFilter.value = "";
    displayTutors(allTutors);
  };
  document.getElementById("search-filters").appendChild(clearBtn);
}

// Load tutors when the page loads
loadTutorsWithFilter();

// Check if user is already logged in
function checkLoginStatus() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const user = JSON.parse(currentUser);
    updateNavigationForLoggedInUser(user);
    if (user.userType === "tutor") {
      showTutorDashboard(user);
    } else if (user.userType === "parent") {
      showParentDashboard(user);
    }
  } else {
    updateNavigationForLoggedOutUser();
  }
}

// Update navigation when user is logged in
function updateNavigationForLoggedInUser(user) {
  const loginBtn = document.getElementById("show-login");
  const signupBtn = document.getElementById("show-signup");
  const logoutBtn = document.getElementById("logout-btn");

  // Hide login and signup buttons
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";

  // Show logout button
  logoutBtn.style.display = "inline-block";
  logoutBtn.textContent = `Logout (${user.name})`;
}

// Update navigation when user is logged out
function updateNavigationForLoggedOutUser() {
  const loginBtn = document.getElementById("show-login");
  const signupBtn = document.getElementById("show-signup");
  const logoutBtn = document.getElementById("logout-btn");

  // Show login and signup buttons
  loginBtn.style.display = "inline-block";
  signupBtn.style.display = "inline-block";

  // Hide logout button
  logoutBtn.style.display = "none";
}

// Logout functionality
function logout() {
  localStorage.removeItem("currentUser");
  updateNavigationForLoggedOutUser();

  // Show the tutors section and hide dashboards
  showSection(tutorsSection);
  document.getElementById("show-tutors").classList.add("active");

  // Clear any active states from other nav buttons
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    if (btn.id !== "show-tutors") {
      btn.classList.remove("active");
    }
  });
}

// Check login status on page load
// Move this inside DOMContentLoaded to ensure DOM elements are available
// checkLoginStatus();

// Setup search and filter after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize DOM element references
  signupSection = document.getElementById("signup-section");
  loginSection = document.getElementById("login-section");
  tutorsSection = document.getElementById("tutors-section");
  tutorDashboard = document.getElementById("tutor-dashboard");
  parentDashboard = document.getElementById("parent-dashboard");

  // Setup search and filter
  setupSearchAndFilter();

  // Check login status after DOM is ready
  checkLoginStatus();

  // Add logout button event listener
  document.getElementById("logout-btn").addEventListener("click", logout);
});

// Tutor dashboard functions
async function loadTutorRatings(tutorId) {
  try {
    const response = await fetch(`http://localhost:3001/api/tutors/${tutorId}`);
    if (response.ok) {
      const tutor = await response.json();
      const ratingsContainer = document.getElementById("tutor-ratings");

      if (tutor.ratings && tutor.ratings.length > 0) {
        ratingsContainer.innerHTML = tutor.ratings
          .map(
            (rating) => `
          <div class="rating-item">
            <div class="rating-header">
              <span class="rating-stars">${"★".repeat(
                rating.value
              )}${"☆".repeat(5 - rating.value)}</span>
              <span class="rating-date">${new Date(
                rating.createdAt
              ).toLocaleDateString()}</span>
            </div>
            ${
              rating.comment
                ? `<p class="rating-comment">"${rating.comment}"</p>`
                : ""
            }
          </div>
        `
          )
          .join("");
      } else {
        ratingsContainer.innerHTML =
          "<p>No ratings yet. Keep teaching to get reviews!</p>";
      }
    }
  } catch (error) {
    console.error("Error loading tutor ratings:", error);
    document.getElementById("tutor-ratings").innerHTML =
      "<p>Error loading ratings</p>";
  }
}

async function loadTutorStats(tutorId) {
  try {
    const response = await fetch(`http://localhost:3001/api/tutors/${tutorId}`);
    if (response.ok) {
      const tutor = await response.json();

      // Calculate stats
      const totalRatings = tutor.ratings ? tutor.ratings.length : 0;
      const avgRating =
        totalRatings > 0
          ? (
              tutor.ratings.reduce((sum, r) => sum + r.value, 0) / totalRatings
            ).toFixed(1)
          : 0;

      // Update stats display
      document.getElementById("total-ratings").textContent = totalRatings;
      document.getElementById("avg-rating").textContent = avgRating;
      document.getElementById("profile-views").textContent = "0"; // Placeholder
    }
  } catch (error) {
    console.error("Error loading tutor stats:", error);
  }
}

// Edit tutor profile function
function editTutorProfile(tutorId) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const editForm = document.createElement("div");
  editForm.innerHTML = `
    <div class="edit-profile-modal">
      <div class="modal-content">
        <h3>Edit Your Profile</h3>
        <form id="edit-profile-form">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" name="name" value="${currentUser.name}" required>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" name="email" value="${
              currentUser.email
            }" required>
          </div>
          <div class="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value="${currentUser.phone || ""}">
          </div>
          <div class="form-group">
            <label>Address:</label>
            <input type="text" name="address" value="${
              currentUser.address || ""
            }">
          </div>
          <div class="form-group">
            <label>Subject:</label>
            <input type="text" name="subject" value="${
              currentUser.subject || ""
            }" required>
          </div>
          <div class="form-group">
            <label>Experience (years):</label>
            <input type="number" name="experience" value="${
              currentUser.experience || 0
            }" min="0">
          </div>
          <div class="form-group">
            <label>Bio:</label>
            <textarea name="bio" rows="3">${currentUser.bio || ""}</textarea>
          </div>
          <div class="form-group">
            <label>Profile Image:</label>
            <div style="display: flex; align-items: center; gap: 15px; margin: 10px 0;">
              <img id="current-image" src="${
                currentUser.imageUrl || "default-profile.png"
              }" 
                   style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gray-300);">
              <div>
                <input type="file" id="image-upload" accept="image/*" style="margin-bottom: 10px;">
                <div style="font-size: 12px; color: var(--gray-500);">
                  Upload a new profile image (JPG, PNG, GIF)
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="dashboard-btn">Save Changes</button>
            <button type="button" class="dashboard-btn" onclick="closeEditModal()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(editForm);

  // Add image preview functionality
  document
    .getElementById("image-upload")
    .addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("current-image").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

  document.getElementById("edit-profile-form").onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updateData = Object.fromEntries(formData.entries());

    // Handle image upload
    const imageFile = document.getElementById("image-upload").files[0];
    if (imageFile) {
      // For now, we'll convert to base64 and store as data URL
      // In production, you'd upload to a cloud service like Cloudinary
      const reader = new FileReader();
      reader.onload = function (e) {
        updateData.imageUrl = e.target.result;
        submitUpdate(updateData, tutorId);
      };
      reader.readAsDataURL(imageFile);
    } else {
      submitUpdate(updateData, tutorId);
    }
  };

  async function submitUpdate(updateData, tutorId) {
    try {
      const response = await fetch(window.getApiUrl(`/api/tutors/${tutorId}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedTutor = await response.json();
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...updatedTutor, userType: "tutor" })
        );
        showNotification("Profile updated successfully!", "success");
        closeEditModal();
        showTutorDashboard(updatedTutor);
      } else {
        showNotification("Failed to update profile", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotification("Error updating profile", "error");
    }
  }
}

// Update tutor status function
function updateTutorStatus(tutorId) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const newStatus =
    currentUser.status === "available" ? "unavailable" : "available";

  if (confirm(`Are you sure you want to set your status to ${newStatus}?`)) {
    updateTutorStatusAPI(tutorId, newStatus);
  }
}

async function updateTutorStatusAPI(tutorId, status) {
  try {
    const response = await fetch(
      `http://localhost:3001/api/tutors/${tutorId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    if (response.ok) {
      const updatedTutor = await response.json();
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...updatedTutor, userType: "tutor" })
      );
      showNotification(`Status updated to ${status}!`, "success");
      showTutorDashboard(updatedTutor);
    } else {
      showNotification("Failed to update status", "error");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    showNotification("Error updating status", "error");
  }
}

function closeEditModal() {
  const modal = document.querySelector(".edit-profile-modal");
  if (modal) modal.remove();
}

// Parent dashboard functions
async function loadParentFavorites(parentId) {
  try {
    const response = await fetch(window.getApiUrl(`/api/parents/${parentId}`));
    if (response.ok) {
      const parent = await response.json();
      const favoritesContainer = document.getElementById("parent-favorites");

      if (parent.favorites && parent.favorites.length > 0) {
        favoritesContainer.innerHTML = parent.favorites
          .map(
            (tutor) => `
          <div class="favorite-tutor-item">
            <div class="tutor-info">
              <h5>${tutor.name}</h5>
              <p><strong>Subject:</strong> ${tutor.subject}</p>
              <p><strong>Experience:</strong> ${tutor.experience} years</p>
            </div>
            <div class="tutor-actions">
              <button class="dashboard-btn" onclick="rateTutor('${tutor._id}', '${tutor.name}')">
                ⭐ Rate
              </button>
              <button class="dashboard-btn" onclick="removeFromFavorites('${parentId}', '${tutor._id}')" style="background: #dc2626;">
                ❌ Remove
              </button>
            </div>
          </div>
        `
          )
          .join("");
      } else {
        favoritesContainer.innerHTML =
          "<p>No favorite tutors yet. Browse tutors and add them to your favorites!</p>";
      }
    }
  } catch (error) {
    console.error("Error loading parent favorites:", error);
    document.getElementById("parent-favorites").innerHTML =
      "<p>Error loading favorites</p>";
  }
}

async function loadParentRatings(parentId) {
  try {
    const response = await fetch(window.getApiUrl(`/api/parents/${parentId}`));
    if (response.ok) {
      const parent = await response.json();
      const ratingsContainer = document.getElementById("parent-ratings");

      if (parent.ratingHistory && parent.ratingHistory.length > 0) {
        ratingsContainer.innerHTML = parent.ratingHistory
          .map(
            (rating) => `
          <div class="rating-history-item">
            <div class="rating-header">
              <h5>${rating.tutor.name}</h5>
              <span class="rating-stars">${"★".repeat(
                rating.rating
              )}${"☆".repeat(5 - rating.rating)}</span>
            </div>
            <p><strong>Subject:</strong> ${rating.tutor.subject}</p>
            ${
              rating.comment
                ? `<p class="rating-comment">"${rating.comment}"</p>`
                : ""
            }
            <p class="rating-date">Rated on ${new Date(
              rating.createdAt
            ).toLocaleDateString()}</p>
            <button class="dashboard-btn" onclick="editRating('${parentId}', '${
              rating.tutor._id
            }', ${rating.rating}, '${rating.comment || ""}')">
              ✏️ Edit Rating
            </button>
          </div>
        `
          )
          .join("");
      } else {
        ratingsContainer.innerHTML =
          "<p>No ratings given yet. Rate tutors to see your history here!</p>";
      }
    }
  } catch (error) {
    console.error("Error loading parent ratings:", error);
    document.getElementById("parent-ratings").innerHTML =
      "<p>Error loading rating history</p>";
  }
}

async function loadParentStats(parentId) {
  try {
    const response = await fetch(window.getApiUrl(`/api/parents/${parentId}`));
    if (response.ok) {
      const parent = await response.json();

      // Calculate stats
      const favoritesCount = parent.favorites ? parent.favorites.length : 0;
      const ratingsGiven = parent.ratingHistory
        ? parent.ratingHistory.length
        : 0;
      const avgRatingGiven =
        ratingsGiven > 0
          ? (
              parent.ratingHistory.reduce((sum, r) => sum + r.rating, 0) /
              ratingsGiven
            ).toFixed(1)
          : 0;

      // Update stats display
      document.getElementById("favorites-count").textContent = favoritesCount;
      document.getElementById("ratings-given").textContent = ratingsGiven;
      document.getElementById("avg-rating-given").textContent = avgRatingGiven;
    }
  } catch (error) {
    console.error("Error loading parent stats:", error);
  }
}

// Rate a tutor function
function rateTutor(tutorId, tutorName) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const ratingModal = document.createElement("div");
  ratingModal.innerHTML = `
    <div class="edit-profile-modal">
      <div class="modal-content">
        <h3>Rate ${tutorName}</h3>
        <form id="rating-form">
          <div class="form-group">
            <label>Rating (1-5 stars):</label>
            <select name="rating" required>
              <option value="1">1 Star - Poor</option>
              <option value="2">2 Stars - Fair</option>
              <option value="3">3 Stars - Good</option>
              <option value="4">4 Stars - Very Good</option>
              <option value="5">5 Stars - Excellent</option>
            </select>
          </div>
          <div class="form-group">
            <label>Comment (optional):</label>
            <textarea name="comment" rows="3" placeholder="Share your experience..."></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="dashboard-btn">Submit Rating</button>
            <button type="button" class="dashboard-btn" onclick="closeRatingModal()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(ratingModal);

  document.getElementById("rating-form").onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ratingData = {
      tutorId: tutorId,
      rating: parseInt(formData.get("rating")),
      comment: formData.get("comment"),
    };

    try {
      const response = await fetch(
        window.getApiUrl(`/api/parents/${currentUser._id}/rate`),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ratingData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...result.parent, userType: "parent" })
        );
        showNotification("Rating submitted successfully!", "success");
        closeRatingModal();
        showParentDashboard(result.parent);
      } else {
        showNotification("Failed to submit rating", "error");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      showNotification("Error submitting rating", "error");
    }
  };
}

// Edit rating function
function editRating(parentId, tutorId, currentRating, currentComment) {
  const ratingModal = document.createElement("div");
  ratingModal.innerHTML = `
    <div class="edit-profile-modal">
      <div class="modal-content">
        <h3>Edit Your Rating</h3>
        <form id="edit-rating-form">
          <div class="form-group">
            <label>Rating (1-5 stars):</label>
            <select name="rating" required>
              <option value="1" ${
                currentRating === 1 ? "selected" : ""
              }>1 Star - Poor</option>
              <option value="2" ${
                currentRating === 2 ? "selected" : ""
              }>2 Stars - Fair</option>
              <option value="3" ${
                currentRating === 3 ? "selected" : ""
              }>3 Stars - Good</option>
              <option value="4" ${
                currentRating === 4 ? "selected" : ""
              }>4 Stars - Very Good</option>
              <option value="5" ${
                currentRating === 5 ? "selected" : ""
              }>5 Stars - Excellent</option>
            </select>
          </div>
          <div class="form-group">
            <label>Comment (optional):</label>
            <textarea name="comment" rows="3" placeholder="Share your experience...">${currentComment}</textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="dashboard-btn">Update Rating</button>
            <button type="button" class="dashboard-btn" onclick="closeRatingModal()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(ratingModal);

  document.getElementById("edit-rating-form").onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ratingData = {
      tutorId: tutorId,
      rating: parseInt(formData.get("rating")),
      comment: formData.get("comment"),
    };

    try {
      const response = await fetch(
        window.getApiUrl(`/api/parents/${parentId}/rate`),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ratingData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...result.parent, userType: "parent" })
        );
        showNotification("Rating updated successfully!", "success");
        closeRatingModal();
        showParentDashboard(result.parent);
      } else {
        showNotification("Failed to update rating", "error");
      }
    } catch (error) {
      console.error("Error updating rating:", error);
      showNotification("Error updating rating", "error");
    }
  };
}

// Remove from favorites
async function removeFromFavorites(parentId, tutorId) {
  if (
    confirm("Are you sure you want to remove this tutor from your favorites?")
  ) {
    try {
      const response = await fetch(
        window.getApiUrl(`/api/parents/${parentId}/favorites/${tutorId}`),
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const parent = await response.json();
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...parent, userType: "parent" })
        );
        showNotification("Tutor removed from favorites!", "success");
        showParentDashboard(parent);
      } else {
        showNotification("Failed to remove from favorites", "error");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      showNotification("Error removing from favorites", "error");
    }
  }
}

// Add to favorites (to be called from tutor profile)
async function addToFavorites(tutorId) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.userType !== "parent") {
    showNotification("Please log in as a parent to add favorites", "warning");
    return;
  }

  try {
    const response = await fetch(
      window.getApiUrl(`/api/parents/${currentUser._id}/favorites`),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutorId }),
      }
    );

    if (response.ok) {
      const parent = await response.json();
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...parent, userType: "parent" })
      );
      showNotification("Tutor added to favorites!", "success");
    } else {
      showNotification("Failed to add to favorites", "error");
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    showNotification("Error adding to favorites", "error");
  }
}

function closeRatingModal() {
  const modal = document.querySelector(".edit-profile-modal");
  if (modal) modal.remove();
}

// Page navigation logic - moved to top to avoid temporal dead zone
let signupSection, loginSection, tutorsSection, tutorDashboard, parentDashboard;

// Navigation functions
function showSection(sectionToShow) {
  // Initialize sections if not already initialized
  if (!signupSection) signupSection = document.getElementById("signup-section");
  if (!loginSection) loginSection = document.getElementById("login-section");
  if (!tutorsSection) tutorsSection = document.getElementById("tutors-section");
  if (!tutorDashboard)
    tutorDashboard = document.getElementById("tutor-dashboard");
  if (!parentDashboard)
    parentDashboard = document.getElementById("parent-dashboard");

  // Hide all sections
  if (signupSection) signupSection.style.display = "none";
  if (loginSection) loginSection.style.display = "none";
  if (tutorsSection) tutorsSection.style.display = "none";
  if (tutorDashboard) tutorDashboard.style.display = "none";
  if (parentDashboard) parentDashboard.style.display = "none";

  // Show the requested section
  sectionToShow.style.display = "block";

  // Update active nav button
  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.classList.remove("active"));
}

// Navigation event listeners
document.getElementById("show-tutors").onclick = () => {
  if (!tutorsSection) tutorsSection = document.getElementById("tutors-section");
  showSection(tutorsSection);
  document.getElementById("show-tutors").classList.add("active");
};

document.getElementById("show-login").onclick = () => {
  if (!loginSection) loginSection = document.getElementById("login-section");
  showSection(loginSection);
  document.getElementById("show-login").classList.add("active");
  createLoginForm();
};

document.getElementById("show-signup").onclick = () => {
  if (!signupSection) signupSection = document.getElementById("signup-section");
  showSection(signupSection);
  document.getElementById("show-signup").classList.add("active");
  createSignupForm();
};

// Dark/Light mode toggle
const toggleModeBtn = document.getElementById("toggle-mode");
toggleModeBtn.onclick = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  if (newTheme === "dark") {
    toggleModeBtn.textContent = "☀️ Light Mode";
  } else {
    toggleModeBtn.textContent = "🌙 Dark Mode";
  }
};

// Mobile-friendly notification system
function showNotification(message, type = "info", duration = 4000) {
  const notification = document.getElementById("notification");
  const messageEl = notification.querySelector(".notification-message");
  const iconEl = notification.querySelector(".notification-icon");

  // Set message
  messageEl.textContent = message;

  // Set type and icon
  notification.className = `notification ${type}`;
  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };
  iconEl.textContent = icons[type] || icons.info;

  // Show notification
  notification.style.display = "block";
  setTimeout(() => notification.classList.add("show"), 100);

  // Auto hide after duration
  setTimeout(() => hideNotification(), duration);
}

function hideNotification() {
  const notification = document.getElementById("notification");
  notification.classList.remove("show");
  setTimeout(() => (notification.style.display = "none"), 300);
}

// Initialize theme on page load - Dark mode default
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark"; // Default to dark
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme =
    savedTheme === "light"
      ? "light"
      : savedTheme === "dark"
      ? "dark"
      : prefersDark
      ? "dark"
      : "dark"; // Default to dark instead of light

  document.documentElement.setAttribute("data-theme", theme);
  if (theme === "dark") {
    toggleModeBtn.textContent = "☀️ Light Mode";
  } else {
    toggleModeBtn.textContent = "🌙 Dark Mode";
  }

  // Add notification close button event listener
  document
    .querySelector(".notification-close")
    .addEventListener("click", hideNotification);
});
