<?php
$MYSQL_HOST="localhost";
$MYSQL_USERNAME="defhrorg_ICF";
$MYSQL_PASSWORD="timeof26";
$MYSQL_DATABASE="defhrorg_wo7180";

mysql_connect( "$MYSQL_HOST", "$MYSQL_USERNAME", "$MYSQL_PASSWORD" ) or die( mysql_error( ) );
mysql_select_db( "$MYSQL_DATABASE") or die( mysql_error( $conn ) );


$filename="public_html/horse-data.csv";
$fd = fopen ($filename, "w");

header("Content-Type: application/vnd.ms-excel");

    $sql = "SELECT name, breed, sex, height, age, status, handler_requirement, rider_requirement, post_name, image FROM

     (SELECT DISTINCT horses.id as horseID, horses.post_title as name, horses.post_name as post_name, horseinfo.meta_value as breed
    FROM `wp_gmna_posts` as horses
    INNER JOIN  `wp_gmna_postmeta` as horseinfo
    ON horses.id=horseinfo.post_id
    WHERE horses.post_type = 'horse' AND horseinfo.meta_key='breed') as breed_table

    INNER JOIN

    (SELECT DISTINCT horses.id as horseID, horseinfo.meta_value as sex
    FROM `wp_gmna_posts` as horses
    INNER JOIN  `wp_gmna_postmeta` as horseinfo
    ON horses.id=horseinfo.post_id
    WHERE horses.post_type='horse' AND horseinfo.meta_key='sex') as sex_table

    ON breed_table.horseID = sex_table.horseID
    INNER JOIN

    (SELECT DISTINCT horses.id as horseID, horseinfo.meta_value as height
    FROM `wp_gmna_posts` as horses
    INNER JOIN  `wp_gmna_postmeta` as horseinfo
    ON horses.id=horseinfo.post_id
    WHERE horses.post_type='horse' AND horseinfo.meta_key='height') as height_table

    ON breed_table.horseID = height_table.horseID
    INNER JOIN

    (SELECT DISTINCT horses.id as horseID, horseinfo.meta_value as age
    FROM `wp_gmna_posts` as horses
    INNER JOIN  `wp_gmna_postmeta` as horseinfo
    ON horses.id=horseinfo.post_id
    WHERE horses.post_type='horse' AND horseinfo.meta_key='age') as age_table

    ON breed_table.horseID = age_table.horseID
    INNER JOIN

    (SELECT DISTINCT horses.id as horseID, horseinfo.meta_value as status
    FROM `wp_gmna_posts` as horses
    INNER JOIN  `wp_gmna_postmeta` as horseinfo
    ON horses.id=horseinfo.post_id
    WHERE horses.post_type='horse' AND horseinfo.meta_key='status' AND LCASE(horseinfo.meta_value)='available for adoption') as status_table

    ON breed_table.horseID = status_table.horseID
    INNER JOIN

    (SELECT DISTINCT horses.id as horseID, horseinfo.meta_value as handler_requirement
    FROM `wp_gmna_posts` as horses
    INNER JOIN  `wp_gmna_postmeta` as horseinfo
    ON horses.id=horseinfo.post_id
    WHERE horses.post_type='horse' AND horseinfo.meta_key='handler_requirement') as handler_requirement_table

    ON breed_table.horseID = handler_requirement_table.horseID
    INNER JOIN

    (SELECT DISTINCT horses.id as horseID, horseinfo.meta_value as rider_requirement
    FROM `wp_gmna_posts` as horses
    INNER JOIN  `wp_gmna_postmeta` as horseinfo
    ON horses.id=horseinfo.post_id
    WHERE horses.post_type='horse' AND horseinfo.meta_key='rider_requirement') as rider_requirement_table

    ON breed_table.horseID = rider_requirement_table.horseID
    INNER JOIN

    (SELECT DISTINCT horses.id as horseID, imageinfo.meta_value as image
    FROM `wp_gmna_posts` as horses
    INNER JOIN  `wp_gmna_postmeta` as horseinfo
    ON horses.id=horseinfo.post_id
    INNER JOIN `wp_gmna_postmeta` as imageinfo
    ON horseinfo.meta_value=imageinfo.post_id
    WHERE horses.post_type='horse' AND horseinfo.meta_key='thumbnail' AND imageinfo.meta_key='_wp_attached_file') as image_table

    ON breed_table.horseID = image_table.horseID;";

mysql_query("SET SQL_BIG_SELECTS = 1;");

$result=mysql_query($sql);



if(mysql_num_rows($result)>0){

$fileContent="name,breed,sex,height,age,status,handler_requirement,rider_requirement,post_name,image\n";
    while($data=mysql_fetch_array($result))
    {
    $fileContent.= "".$data['name'].",".$data['breed'].",".$data['sex'].",".$data['height'].",".$data['age'].",".$data['status'].",".$data['handler_requirement'].",".$data['rider_requirement'].",".$data['post_name'].",".$data['image']."\n";
}


$fileContent=str_replace("\n\n","\n",$fileContent);
    fputs($fd, $fileContent);
    fclose($fd);
 } 
header("content-disposition: attachment;filename=$filename"); ?> 