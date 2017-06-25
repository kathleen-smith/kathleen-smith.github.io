<?php

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

  $errors = array('error' => false, 'fields' => array());
  $data   = array(
    'name'  => null,
    'email' => null,
    'notes' => true
  );

  if(isset($_POST)) {
    function clean_up($value) {
        return trim(htmlspecialchars($value, ENT_QUOTES));
    }
    $_POST = array_map('clean_up', $_POST); // the data in $_POST is trimmed

    $email = false;
    $name  = false;
    $notes = '';

    if(isset($_POST['name'])) {
      $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_EMPTY_STRING_NULL);
    }

    if(isset($_POST['email'])) {
      $email = filter_var(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL), FILTER_VALIDATE_EMAIL, FILTER_FLAG_EMPTY_STRING_NULL);
    }

    if(isset($_POST['notes'])) {
      $notes = filter_var($_POST['notes'], FILTER_SANITIZE_STRING, FILTER_FLAG_EMPTY_STRING_NULL);
    }

    $post_data = array(
      'name'  => $name,
      'email' => $email,
      'notes' => $notes
    );
    $post_data = array_filter($post_data);

    $data = array_replace($data, $post_data);

    foreach($data as $key => $value) {
      if(is_null($value) || $value === false) {
        $errors['error']    = true;
        $errors['fields'][] = $key;
      }
    }

    if($errors['error'] === false) {

      //Create message
      $messageArr = [];
      $messageArr[] = '*Name*';
      $messageArr[] = $name;
      $messageArr[] = '';
      $messageArr[] = '*Email:*';
      $messageArr[] =  $email;
      $messageArr[] = '';
      if($notes) {
        $messageArr[] = '*Message:*';
        $messageArr[] =  $notes;
      }

      $message = implode("\r\n", $messageArr);

      // In case any of our lines are larger than 70 characters, we should use wordwrap()
      $message = wordwrap($message, 70, "\r\n");

      $headers = 'From: kathleenmrasmith@gmail.com' . "\r\n" .
      'Reply-To: kathleenmrasmith@gmail.com' . "\r\n" .
      'X-Mailer: PHP/' . phpversion();

      // Send
      $to = 'kathleenmrasmith@gmail.com';
      $subject = 'Message from ' . $name . ' via portfolio!';
      mail($to, $subject, $message, $headers);
    }
  }

  header('Content-type: application/json');
  echo json_encode(array('errors' => $errors, 'data' => $data));
  exit;
}

?>
