<?php
$date=$_GET["date"];
?>
<!DOCTYPE html> 
<html>
<head>

    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title><?php echo $date;?></title>
    <link href="jquery.mobile.flatui.css" rel="stylesheet" type="text/css">
    <link href="food.css" rel="stylesheet" type="text/css">
    <link href="style.css" media="screen" rel="stylesheet" type="text/css">
    <link href=
    "http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog.min.css"
    rel="stylesheet" type="text/css">
    <script src=
    "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script src="jquery.raty.min.js"></script>
    <script src="http://code.jquery.com/mobile/latest/jquery.mobile.js"></script>
    <script src="taffy.js" type="text/javascript"></script>
    <script src="foodlog.js" type="text/javascript"></script>
    <script src="taffy.extend.group.js" type="text/javascript"></script>
    <script src="jquery.quovolver.js" type="text/javascript"></script>
    <script src=
    "http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog2.min.js"
    type="text/javascript"></script>
    <script src="Chart.js"></script>
    <script>

    </script>
</head>

<body>
    <!-- Start of first page: #one -->

    <div data-role="page" id="main">
        <div data-role="header">
            <h1 id="title"><?php echo $date;?></h1>
        </div>
		

        <div data-role="content">
			
            <ul class="listview" data-inset="true" data-role="listview"
            data-theme="b" id="meal-listview"></ul>
        </div><!-- /content -->
		<script>
		date=new Date(<?php echo '"'.$date.'"';?>);
	    loadMealData();
	  
	  $("#title").html(date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear());
	  document.title = 'Meals from '+date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
		</script>
    </div><!-- /page one -->
	
   
</body>
</html>