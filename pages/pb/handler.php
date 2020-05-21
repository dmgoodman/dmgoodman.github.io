<?php 
header("Access-Control-Allow-Origin: *");
$externalIp = file_get_contents('https://docs.google.com/spreadsheets/d/1Bvyksa6J_25ciXkU69vmrVcp38jZO-ENuIqZANwJwIs/pub?gid=0&single=true&output=tsv');
echo $externalIp;