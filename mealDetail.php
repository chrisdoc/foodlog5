<?php
$date=$_GET["date"];
?>
<!DOCTYPE html> 
<html>
<head>

    <meta charset="utf-8">
    <meta content="width=device-width, minimum-scale=1, maximum-scale=1" name="viewport">
    <title><?php echo $date;?></title>
 <link rel="stylesheet" type="text/css" href="jquery.mobile.flatui.css" />
<link rel="stylesheet" type="text/css" href="food.css" />
<link rel="stylesheet" href="messi.css" />
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>
<script type="text/javascript" language="javascript" src="Chart.js"></script>
<script type="text/javascript" src="taffy.js"></script>
<script src="jquery.raty.min.js"></script>
 <script src="jquery.quovolver.js" type="text/javascript"></script>
 <script src="messi.js"></script>
 <script type="text/javascript" language="javascript" src="foodlog.js"></script>
   
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
  		$(document).on('pageinit',function() {
      
			mealDate=new Date();
			mealDate.setTime(<?php echo '"'.$date.'"';?>);
		    loadMealData(mealDate);
	  
		  	$("#title").html(mealDate.getDate()+"."+(mealDate.getMonth()+1)+"."+mealDate.getFullYear());
		  	document.title = 'Meals from '+mealDate.getDate()+"."+(mealDate.getMonth()+1)+"."+mealDate.getFullYear();
  				
  			});
		
		</script>
    </div><!-- /page one -->
	
   
</body>
</html>