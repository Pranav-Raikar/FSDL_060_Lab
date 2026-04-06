<?php
include 'db.php';

$error = "";
$success = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $first   = $_POST['first_name'];
    $last    = $_POST['last_name'];
    $roll    = $_POST['roll_no'];
    $pass    = $_POST['password'];
    $confirm = $_POST['confirm_password'];
    $contact = $_POST['contact'];

    // PHP Validation
    if (empty($first) || empty($last) || empty($roll) || empty($pass) || empty($contact)) {
        $error = "All fields are required.";
    } elseif ($pass != $confirm) {
        $error = "Passwords do not match.";
    } elseif (!preg_match('/^[0-9]{10}$/', $contact)) {
        $error = "Contact must be 10 digits.";
    } elseif (strlen($pass) < 6) {
        $error = "Password must be at least 6 characters.";
    } else {
        $hashed = password_hash($pass, PASSWORD_DEFAULT);
        $sql = "INSERT INTO students (first_name, last_name, roll_no, password, contact)
                VALUES ('$first', '$last', '$roll', '$hashed', '$contact')";

        if (mysqli_query($conn, $sql)) {
            $success = "Student registered successfully!";
        } else {
            $error = "Roll No already exists!";
        }
    }
}
?>

<html>
<head><title>Insert Student</title></head>
<body>

<h2>Student Registration Form</h2>

<a href="view.php">View All Students</a> |
<a href="search.php">Search Student</a>

<br><br>

<?php if ($error)   echo "<p style='color:red'>$error</p>"; ?>
<?php if ($success) echo "<p style='color:green'>$success</p>"; ?>

<form method="POST" action="">

    First Name: <input type="text" name="first_name" required> <br><br>
    Last Name: <input type="text" name="last_name" required> <br><br>
    Roll No: <input type="text" name="roll_no" required> <br><br>
    Password: <input type="password" name="password" required> <br><br>
    Confirm Password: <input type="password" name="confirm_password" required> <br><br>
    Contact: <input type="text" name="contact" required> <br><br>

    <input type="submit" value="Register Student">

</form>

</body>
</html>
