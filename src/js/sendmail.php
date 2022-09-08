// <?php
//     use PHPMailer\PHPMailer\PHPMailer;
//     use PHPMailer\PHPMailer\Exception;
//
//     require 'path/to/PHPMailer/src/Exception.php';
//     require 'path/to/PHPMailer/src/PHPMailer.php';
//     require 'path/to/PHPMailer/src/SMTP.php';
//
//     $mail = new PHPMailer(true);
//     $mail-> CharSet = 'UTF-8';
//     $mail-> setLanguage('ru', 'phpmailer/language/');
//     $mail-> IsHTML(true);
//
//     $mail-> setForm('','');
//     $mail-> addAddress('m.erezhepofff@gmail.com');
//     $mail-> Subject('Форма');
//
//     $body = `<h1>Письмо</h1>`;
//
//     if (trim(!empty($_POST['name']))){
//         $body.= `<p><strong>Имя:</strong> '.$_POST['name'].'</p>`
//     }
//     if (trim(!empty($_POST['mail']))){
//         $body.= `<p><strong>E-mail:</strong> '.$_POST['mail'].'</p>`
//     }
//     if (trim(!empty($_POST['number']))){
//         $body.= `<p><strong>Номер:</strong> '.$_POST['number'].'</p>`
//     }
//     if (trim(!empty($_POST['message']))){
//         $body.= `<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>`
//     }
//
//     $mail->Body = $body;
//
// if (!$mail->send()){
//     $message = 'Ошибка';
// }else{
//     $message = 'Данные отправлены!'
// }
// $response = ['message' => $message];
// header('Content-type: application/json');
// echo json_encode($response);
//
//

<?php

$to = "m.erezhepofff@gmail.com";

$name = $_POST['name'];
$mail = $_POST['mail'];
$number = $_POST['number'];
$text = $_POST['text'];

$subject = 'Заявка';
$message = "Имя: ".$name."\nE-mail: ".$mail."\nТелефон: ".$number;
$headers = 'From: info@able-master.kz' . "\r\n" .
    'Reply-To: super.verstka@gmail.comm' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject, $message, $headers)){
	echo '{"message":"OK"}';
}

?>