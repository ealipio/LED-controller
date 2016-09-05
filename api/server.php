<?php

if( isset( $_POST['action'] ) ) {
	switch ( $_POST['action'] ) {
		case 'on':
			exec('sudo python on.py');
			echo json_encode(array('status' => 'success on'));
			break;
		default:
			# off...
			exec('sudo python off.py');
			echo json_encode(array('status' => 'success off'));
			break;
	}
}

?>