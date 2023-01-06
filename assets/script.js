// This is the JavaScript for handling file uploads
const fileForm = document.getElementById('file-form');
const fileInput = document.getElementById('file-input');
const submitButton = document.getElementById('submit-button');

// get the progress bar and timer elements
const progressBar = document.querySelector('.progress-bar');
const progressBarFill = progressBar.querySelector('.progress-bar-fill');
const timer = document.querySelector('.timer span');

fileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // check if a file has been selected
  if (!fileInput.value) {
    alert('Please select a file to upload');
    return;
  }

  // disable the submit button to prevent multiple submissions
  submitButton.disabled = true;

  // show the progress bar and timer
  progressBar.style.display = 'block';
  timer.style.display = 'block';

  // get the file
  const file = fileInput.files[0];

  // create a new FormData object
  const formData = new FormData();

  // add the file to the form data
  formData.append('file', file);

  // create an AJAX request
  const xhr = new XMLHttpRequest();

  // POST the form data to the server
  xhr.open('POST', 'upload.php');
  xhr.send(formData);

  // handle the file upload progress
  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      // calculate the progress percentage
      const percent = (event.loaded / event.total) * 100;
      // update the progress bar width
      progressBarFill.style.width = `${percent}%`;
      // update the timer text
      timer.textContent = `${Math.round(percent)}%`;
    }
  });

  // handle the file upload success
  xhr.addEventListener('load', () => {
    // hide the progress bar and timer
    progressBar.style.display = 'none';
    timer.style.display = 'none';
    // enable the submit button
    submitButton.disabled = false;
  });
});
