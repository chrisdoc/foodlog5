<?php 

 $name=$_GET['name'];
 $id=$_GET['id'];
 $unit=$_GET['unit'];
 $amount=$_GET['amount'];
 
 ?>
<!DOCTYPE html> 
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>jQuery Mobile Framework - Dialog Example</title> 
<link rel="stylesheet" type="text/css" href="food.css" />
 <link rel="stylesheet" type="text/css" href="jquery.mobile.flatui.css" />
 <link rel="stylesheet" type="text/css" href="http://cdn-dev.aldu.net/jquery.mobiscroll/latest/jquery.mobiscroll.min.css" />
 <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
 <script src="jquery.raty.min.js"></script>
 <script src="http://code.jquery.com/mobile/latest/jquery.mobile.js"></script>
 <script src="http://cdn-dev.aldu.net/jquery.mobiscroll/latest/jquery.mobiscroll.min.js"></script>
 <script type="text/javascript" src="jquery.quovolver.js"></script>
<script type="text/javascript" src="taffy.js"></script>
 <script type="text/javascript" src="foodlog.js"></script>
<script src="Chart.js"/></script>
<script>
$(document).ready(function() {
  $("#save").click(function() {
	
	});
	setTimeout( function() {
	           $('.ui-dialog').dialog('close');
	      }), 1000);
});

</script>
</head> 
<body> 

<div data-role="dialog" id="dialog">
	
		<div data-role="header" data-theme="d">
			<h1>Dialog</h1>

		</div>

		<div data-role="content" data-theme="c">
			<h1><?php echo $name;?></h1>
			<div class="ui-grid-a">
	            <div class="ui-block-a">
	            	<p class="textmedium">Amount in <?php echo $unit;?></p>
	            </div>
	            <div class="ui-block-b">
					<input type="number" name="amount" min="1" max="3000" value=<?php echo '"'.$amount.'"';?>>
	            </div>
			</div>
			<input name="time" type="time" />
			
			
			
			<a href="#" id="save" data-role="button" data-rel="#" data-theme="b">Sounds good</a>       
			<a href="#" data-role="button" data-rel="back" data-theme="c">Cancel</a>    
		</div>
	</div>

	

</body>
</html>
