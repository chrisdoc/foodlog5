<?php

$id=$_GET["foodid"];
$amount=$_GET["amount"];
$key=$_GET["key"];
?>

<!DOCTYPE html> 
<html>

<head>

    <meta charset="utf-8">
    <meta content="width=device-width, minimum-scale=1, maximum-scale=1" name="viewport">
    <title><?php echo $name;?></title>
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
			
	            <div class="ui-block-a" style="margin-top: 3%;padding-left: 30%;">
					<canvas id="food_canvas" style="height: 100%; width: 100%;"></canvas>
				</div>
	            <div class="ui-block-b">
					<ul>
							        <li class="square fat"> <a class="nutrition" id="food_fat">Fat</a> </li>
							        <li class="square sugar"> <a class="nutrition" id="food_sugar">Sugar</a> </li>
							        <li class="square df"> <a class="nutrition" id="food_df">Dietary&nbsp;fiber&nbsp;</a> </li>
							        <li class="square carbon"> <a class="nutrition" id="food_kh">Carbohydrates</a> </li>
					</ul>
	            </div>
		        <div class="ui-block-a">
					<div class="textmiddle" id="food_rating">User rating: </div>
		        </div>
		        <div class="ui-block-b">
		        	<div id="food_star"></div>
		        </div>
				
			</div>
			<div class="ui-grid-solo">
				<div class="ui-block-a" style="width: 90%; margin-left: 5%;margin-top: 5%"><button type="v" data-theme="b" id="delete_meal">Delete meal</button></div>
			</div>
		
		
			<script>
		$(document).bind('pageinit',function() {
      
				loadFoodData(<?php echo $id.",".$amount.",".$key; ?>);
			});
			
	  	
			  </script>
		 
		 
		</div><!-- /content -->
		
		<div data-role="popup" id="popup_delete" data-theme="a" class="ui-corner-bottom ui-content" data-overlay-theme="a">

		     <div data-role="content" >
		        <h3 class="ui-title">Delete!</h3>

		        <p id="limit_text">Are you sure you want to delete this meal?</p>

			 <div class="ui-grid-a">
		           <div class="ui-block-a" id="buttoncontainer">
		               <a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="d" data-corners="true" data-shadow="true" class="ui-btn ui-shadow 					ui-btn-corner-all ui-btn-up-d" id="closeFoodbtn">
		                   Cancel
		               </a>
          
		           </div>
		           <div class="ui-block-b" id="buttoncontainer">
		               <a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="b" data-corners="true" data-shadow="true" class="ui-btn ui-shadow 					ui-btn-corner-all ui-btn-up-b" id="okFoodbtn">
		                   OK
					   </a>
		
          
		           </div>
			   </div>
	
	</div>


       
		
		   <script>
		$('#closeFoodbtn').closest('.ui-btn').hide();
		$('#okFoodbtn').closest('.ui-btn').hide();

		   </script>

      
	    </div>
		
    </div><!-- /page one -->
	
</body>
</html>