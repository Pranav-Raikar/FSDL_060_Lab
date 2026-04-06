<?php
include 'db.php';

$student  = null;
$searched = false;

if (isset($_GET['roll']) && $_GET['roll'] != '') {
    $searched = true;
    $roll     = $_GET['roll'];
    $result   = mysqli_query($conn, "SELECT * FROM students WHERE roll_no = '$roll'");
    $student  = mysqli_fetch_assoc($result);
}
?>

<html>
<head><title>Search Student</title></head>
<body>

<h2>Search Student by Roll No</h2>

<a href="insert.php">Register New Student</a> |
<a href="view.php">View All Students</a>

<br><br>

<form method="GET" action="">
    Enter Roll No: <input type="text" name="roll" value="<?= isset($_GET['roll']) ? $_GET['roll'] : '' ?>">
    <input type="submit" value="Search">
</form>

<br>

<?php if ($searched): ?>
    <?php if ($student): ?>
        <h3>Student Found:</h3>
        <table border="1" cellpadding="8" cellspacing="0">
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td>First Name</td><td><?= $student['first_name'] ?></td></tr>
            <tr><td>Last Name</td> <td><?= $student['last_name']  ?></td></tr>
            <tr><td>Roll No</td>   <td><?= $student['roll_no']    ?></td></tr>
            <tr><td>Contact</td>   <td><?= $student['contact']    ?></td></tr>
        </table>
        <br>
        <a href="update.php?roll=<?= $student['roll_no'] ?>">Edit this Student</a>
    <?php else: ?>
        <p style="color:red">No student found with Roll No: <?= $_GET['roll'] ?></p>
    <?php endif; ?>
<?php endif; ?>

</body>
</html>
