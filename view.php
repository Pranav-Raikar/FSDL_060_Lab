<?php
include 'db.php';

// Delete operation
if (isset($_GET['delete'])) {
    $roll = $_GET['delete'];
    $sql  = "DELETE FROM students WHERE roll_no = '$roll'";
    mysqli_query($conn, $sql);
    echo "<p style='color:red'>Student deleted successfully!</p>";
}

$result = mysqli_query($conn, "SELECT * FROM students");
?>

<html>
<head><title>All Students</title></head>
<body>

<h2>All Student Records</h2>

<a href="insert.php">Register New Student</a> |
<a href="search.php">Search Student</a>

<br><br>

<table border="1" cellpadding="8" cellspacing="0">
    <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Roll No</th>
        <th>Contact</th>
        <th>Actions</th>
    </tr>

    <?php while ($row = mysqli_fetch_assoc($result)): ?>
    <tr>
        <td><?= $row['id'] ?></td>
        <td><?= $row['first_name'] ?></td>
        <td><?= $row['last_name'] ?></td>
        <td><?= $row['roll_no'] ?></td>
        <td><?= $row['contact'] ?></td>
        <td>
            <a href="update.php?roll=<?= $row['roll_no'] ?>">Edit</a> |
            <a href="view.php?delete=<?= $row['roll_no'] ?>"
               onclick="return confirm('Are you sure you want to delete this student?')">Delete</a>
        </td>
    </tr>
    <?php endwhile; ?>

</table>

</body>
</html>
