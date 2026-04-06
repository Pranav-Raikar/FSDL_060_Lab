<?php
include 'db.php';

$error   = "";
$success = "";
$student = null;

// Load student record
if (isset($_GET['roll'])) {
    $roll    = $_GET['roll'];
    $result  = mysqli_query($conn, "SELECT * FROM students WHERE roll_no = '$roll'");
    $student = mysqli_fetch_assoc($result);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $roll    = $_POST['roll_no'];
    $first   = $_POST['first_name'];
    $last    = $_POST['last_name'];
    $contact = $_POST['contact'];

    // PHP Validation
    if (empty($first) || empty($last) || empty($contact)) {
        $error = "All fields are required.";
    } elseif (!preg_match('/^[0-9]{10}$/', $contact)) {
        $error = "Contact must be 10 digits.";
    } else {
        $sql = "UPDATE students SET first_name='$first', last_name='$last', contact='$contact'
                WHERE roll_no='$roll'";

        if (mysqli_query($conn, $sql)) {
            $success = "Student updated successfully!";
            $result  = mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll'");
            $student = mysqli_fetch_assoc($result);
        } else {
            $error = "Update failed!";
        }
    }

    // Keep form filled on error
    if ($error) {
        $student = ['roll_no'=>$roll, 'first_name'=>$first, 'last_name'=>$last, 'contact'=>$contact];
    }
}
?>

<html>
<head><title>Update Student</title></head>
<body>

<h2>Update Student Details</h2>

<a href="view.php">View All Students</a> |
<a href="insert.php">Register New Student</a>

<br><br>

<?php if ($error)   echo "<p style='color:red'>$error</p>"; ?>
<?php if ($success) echo "<p style='color:green'>$success</p>"; ?>

<?php if ($student): ?>
<form method="POST" action="">

    Roll No: <input type="text" name="roll_no" value="<?= $student['roll_no'] ?>" readonly> <br><br>
    First Name: <input type="text" name="first_name" value="<?= $student['first_name'] ?>" required> <br><br>
    Last Name: <input type="text" name="last_name" value="<?= $student['last_name'] ?>" required> <br><br>
    Contact: <input type="text" name="contact" value="<?= $student['contact'] ?>" required> <br><br>

    <input type="submit" value="Update Student">
    <a href="view.php">Cancel</a>

</form>
<?php else: ?>
    <p>Student not found.</p>
<?php endif; ?>

</body>
</html>
