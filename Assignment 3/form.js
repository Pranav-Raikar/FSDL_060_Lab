$(document).ready(function() {
    // --- JQUERY OPERATIONS ---
    
    // Set background-image using jQuery CSS property
    $("body").css("background", "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)");

    // Change button text using jQuery
    $("#submitBtn").text("Create Account");

    // Add attribute using jQuery
    $("#username").attr("placeholder", "Enter Full Name");

    // Form Submit Event
    $("#regForm").on("submit", function(e) {
        e.preventDefault();
        
        // --- ACCESSING ELEMENTS (DOM & JQUERY) ---
        
        // Access HTML form data using jQuery
        const user = $("#username").val().trim();
        const email = $("#email").val().trim();
        const phone = $("#phone").val().trim();
        const pass = $("#password").val();
        const confPass = $("#confirmPassword").val();
        
        // Accessing element using getElementById (DOM)
        const msg = document.getElementById("msg");
        const nodeArea = document.getElementById("nodeArea");
        const statusImg = document.getElementById("statusImg");

        // --- VALIDATIONS (JavaScript) ---

        // a) All fields mandatory (checks for empty or spaces)
        if (!user || !email || !phone || !pass || !confPass) {
            msg.innerHTML = "All fields are mandatory!";
            msg.style.color = "red";
            return;
        }

        // b) Phone number: Only numeric and 10 digits
        if (!/^\d{10}$/.test(phone)) {
            msg.innerHTML = "Phone must be 10 numeric digits.";
            msg.style.color = "red";
            return;
        }

        // c) Email Validation (Regex)
        // Letters before @, 3 letters between @ and ., 2 or 3 letters after .
        const emailRegex = /^[a-zA-Z]+@[a-zA-Z]{3}\.[a-zA-Z]{2,3}$/;
        if (!emailRegex.test(email)) {
            msg.innerHTML = "Email format error (e.g., user@abc.com)";
            msg.style.color = "red";
            return;
        }

        // d) Password Validation
        // Length 7+, 1 Capital, 1 Digit, 1 Special char (&, $, #, @)
        const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[&amp;$#@]).{7,}$/;
        if (!passRegex.test(pass)) {
            msg.innerHTML = "Password: 7+ chars, 1 Upper, 1 Digit, 1 Special.";
            msg.style.color = "red";
            return;
        }

        // e) Password Match
        if (pass !== confPass) {
            msg.innerHTML = "Passwords do not match!";
            msg.style.color = "red";
            return;
        }

        // --- DOM MANIPULATION ---

        // Change the text using innerHTML property
        msg.innerHTML = "Registration Successful!";
        
        // Change CSS properties (color and position)
        msg.style.color = "#10b981";
        msg.style.fontWeight = "bold";

        // Change image source after successful click/validation
        statusImg.src = "https://cdn-icons-png.flaticon.com/512/190/190411.png";
        statusImg.style.display = "block";

        // Add a text node and attach it to a parent node
        nodeArea.innerHTML = ""; // Clear previous entries
        nodeArea.style.display = "block";
        const welcomeText = document.createTextNode("Success! Node added for " + user);
        const para = document.createElement("p");
        para.appendChild(welcomeText);
        nodeArea.appendChild(para);

        // jQuery: Change CSS of button on success
        $("#submitBtn").css("background-color", "#10b981").text("Registered");
    });
});

// Extra: Function to demonstrate "Delete a node"
function deleteNotification() {
    const node = document.getElementById("nodeArea");
    if (node.lastChild) {
        node.removeChild(node.lastChild); // Delete a node
    }
}