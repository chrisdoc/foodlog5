<?php

$id=$_GET["foodid"];
?>

<!DOCTYPE html> 
<html>

<head>

    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">

    <title><?php echo $name;?></title>
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
    <script src="taffy.extend.group.js" type="text/javascript"></script>
    <script src="jquery.quovolver.js" type="text/javascript"></script>
    <script src="http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog2.min.js"
    type="text/javascript"></script>
    <script src="Chart.js"></script>
	<script src="foodlog.js" type="text/javascript"></script>
    
</head>

<body>
    <!-- Start of first page: #one -->

    <div data-role="page" id="main">
        <div data-role="header">
            <h1 id="food_header"></h1>
        </div>

  	  	
		<div data-role="content" >	
		
		
			<div class="ui-grid-a">
	            <div class="ui-block-a">
	            	<img id="food_img" class="foodimg" alt="">
	            </div>
	            <div class="ui-block-b">
					<ul  style="margin-left:20px;">
							        <li> <div class="textlarge" id="food_name"></div> </li>
									<li></li>
							        <li> <div class="textmiddle" id="food_group"></div> </li>
									 <li> <div class="textmiddle" id="food_amount_unit"></div> </li>
					</ul>
	            </div>
			
	            <div class="ui-block-a">
	            	<canvas id="food_canvas" height="150" width="150"></canvas>
	            </div>
	            <div class="ui-block-b">
					<ul>
							        <li class="square fat"> <a class="nutrition">fat</a> </li>
							        <li class="square sugar"> <a class="nutrition">sugar</a> </li>
							        <li class="square df"> <a class="nutrition">df</a> </li>
							        <li class="square carbon"> <a class="nutrition">carbohydrates</a> </li>
					</ul>
	            </div>
		        <div class="ui-block-a">
					<div class="textmiddle" id="food_rating">User rating: </div>
		        </div>
		        <div class="ui-block-b">
		        	<div id="food_star"></div>
		        </div>
			</div>
		
		
		
			<script>
		$(document).bind('pageinit',function() {
      
				loadFoodData(<?php echo $id;?>);
			});
			
	  	
			  </script>
		 
		 
		</div><!-- /content -->
		
    </div><!-- /page one -->
	
</body>
</html>