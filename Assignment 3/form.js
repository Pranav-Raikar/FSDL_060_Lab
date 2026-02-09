$(document).ready(function() {
    // jQuery: Modern Background
    $("body").css({
        "background": "radial-gradient(circle at top left, #4f46e5, #0f172a)",
        "background-attachment": "fixed"
    });

    const validations = {
        username: (val) => val.length < 3 ? "Name must be at least 3 characters." : "",
        // Added Age Validation logic
        age: (val) => {
            if (val === "") return "Age is required.";
            const ageNum = parseInt(val);
            return (isNaN(ageNum) || ageNum < 18 || ageNum > 100) ? "Age must be between 18 and 100." : "";
        },
        email: (val) => {
            const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]{2,5}\.[a-zA-Z]{2,3}$/;
            return !regex.test(val) ? "Format: letters@abc.com (Domain 2-5 chars)." : "";
        },
        phone: (val) => !/^\d{10}$/.test(val) ? "Must be exactly 10 digits." : "",
        password: (val) => {
            const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/;
            return !regex.test(val) ? "7+ chars, 1 Capital, 1 Digit, 1 Special (&$#@)." : "";
        },
        confirmPassword: (val) => val !== $("#password").val() ? "Passwords do not match." : ""
    };

    function validateField(field) {
        const id = $(field).attr('id');
        const val = $(field).val().trim();
        const errorMsg = validations[id] ? validations[id](val) : "";
        const errorLabel = $(`#${id}Error`);

        if (errorMsg) {
            errorLabel.text(errorMsg).addClass('visible');
            $(field).css("border-color", "#ef4444");
            return false;
        } else {
            errorLabel.removeClass('visible').text("");
            $(field).css("border-color", "#10b981");
            return true;
        }
    }

    // Attach real-time listener to all inputs
    $("input").on("input", function() {
        validateField(this);
        if ($(this).attr('id') === 'password') validateField($("#confirmPassword")[0]);
    });

    $("#regForm").on("submit", function(e) {
        e.preventDefault();
        
        let isValid = true;
        $("input").each(function() {
            if (!validateField(this)) isValid = false;
        });

        const finalMsg = document.getElementById("finalMsg"); 
        
        if (isValid) {
            finalMsg.innerHTML = "Registration Successful!"; 
            $(finalMsg).css({
                "display": "block",
                "color": "#065f46",
                "background": "#d1fae5"
            }).fadeIn();
            $("#submitBtn").text("Account Created").css("background", "#10b981").prop("disabled", true);
        } else {
            $(finalMsg).text("Please fix the errors above.").css({
                "display": "block",
                "color": "#991b1b",
                "background": "#fee2e2"
            }).fadeIn();
        }
    });
});