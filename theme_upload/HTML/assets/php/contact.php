<?php
// Data post from form
$data = $_POST;
if(empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode(array('code' => 0));
}
// Continue process with data
//
echo json_encode(array('code' => 1));
