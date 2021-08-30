<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');                   
$mail->isHTML(true);
    
$mail->setFrom('MChouse@site.ru', 'MChouse');
$mail->addAddress('bragina_marina@mail.ru'); 
$mail->Subject = 'Новый отзыв';

    
$body = '<h1>Пришел новый отзыв!</h1>';

if(trim(!empty($_POST['first name']))) {
  $body.='<p><strong>Имя:</strong> '.$_POST['first name'].'</p>';
}

if(trim(!empty($_POST['last name']))) {
  $body.='<p><strong>Фамилия:</strong> '.$_POST['last name'].'</p>';
}

if(trim(!empty($_POST['review-text']))) {
  $body.='<p><strong>Отзыв:</strong> '.$_POST['review-text'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
  $message = 'Ошибка';
} else {
  $message = 'Отзыв отправлен';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

