<?php

require_once "./config.php";

if(isset($_POST['name'])){
			$name = $_POST['name'];
				$model = '';
				$color = '';
			if(isset($_POST['model'])){
				$model = $_POST['model'];
			}
			if(isset($_POST['color'])){
				$color = $_POST['color'];
			}	
			$query = "insert into tbl_mobile (name,model,color) values ('" . $name ."','". $model ."','" . $color ."')";
			$dbcontroller = new DBController();
			$result = $dbcontroller->executeQuery($query);
			if($result != 0){
				$result = array('success'=>1);
				return $result;
			}
		}