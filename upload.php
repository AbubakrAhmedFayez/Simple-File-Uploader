<?php

// check if the form was submitted
if (isset($_POST['submit'])) {
  // check if a file was selected
  if (!empty($_FILES['file']['name'])) {
    // get the uploaded file
    $file = $_FILES['file'];

    // get the file details
    $fileName = $file['name'];
    $fileType = $file['type'];
    $fileTempName = $file['tmp_name'];
    $fileError = $file['error'];
    $fileSize = $file['size'];

    // get the file extension
    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));

    // allowed file extensions
    $allowed = array('jpg', 'jpeg', 'png', 'pdf', 'gif');

    // check if the file extension is allowed
    if (in_array($fileActualExt, $allowed)) {
      // check for errors
      if ($fileError === 0) {
        // check file size
        if ($fileSize < 5000000) {
          // create a unique file name
          $fileNameNew = uniqid('', true).".".$fileActualExt;

          // set the file destination
          $fileDestination = 'assets/media/uploads/'.$fileNameNew;

          // move the file to the uploads folder
          move_uploaded_file($fileTempName, $fileDestination);

          // redirect to the index page
          header("Location: success.html");
        } else {
          // file is too large
          echo "Your file is too large.";
        }
      } else {
        // there was an error uploading the file
        echo "There was an error uploading your file.";
      }
    } else {
      // file extension is not allowed
      echo "You cannot upload files of this type.";
    }
  } else {
    // no file was selected
    echo "You must select a file to upload.";
  }
}

?>
