
<?php
  $name=$_GET["name"];
  $thumbsrc=$_GET["thumbsrc"];
  $fat=floatVal($_GET["fat"]);
  $sugar=floatVal($_GET["sugar"]);
  $df=floatVal($_GET["df"]);
  $kh=floatVal($_GET["kh"]);
  $kcal=floatVal($_GET["kcal"]);
  $amount=$_GET["amount"];
  $unit=$_GET["unit"];
  $group=$_GET["group"];
  $rank=floatVal($_GET["rank"]);
  $contents=$_GET["contents"];
  $content=explode("#", urldecode($contents));
?>


<!DOCTYPE html> 
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title><?php echo $name;?></title> 
	 <link rel="stylesheet" type="text/css" href="jquery.mobile.flatui.css" />
	<link rel="stylesheet" type="text/css" href="food.css" />
	<link rel="stylesheet" type="text/css" media="screen" href="style.css">
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	 <script src="jquery.raty.min.js"></script>
	 <script src="http://code.jquery.com/mobile/latest/jquery.mobile.js"></script>
	 <script type="text/javascript" src="jquery.quovolver.js"></script>
	<script src="Chart.js"/></script>
	<script type="text/javascript">
		$(document).ready(function() {
		
			$('blockquote').quovolver();
		
		});
		</script>
</head> 

	
<body> 

<!-- Start of first page: #one -->
<div data-role="page" id="main">

	<div data-role="header">
		<h1><?php echo $name;?></h1>
	</div>
	
	<div data-role="content" >	
		
		
		<div class="ui-grid-a">
            <div class="ui-block-a">
            	<?php echo '<img class="foodimg" src="'.$thumbsrc.'" alt="Smiley face">'; ?>
            </div>
            <div class="ui-block-b">
				<ul  style="margin-left:20px;">
						        <li> <div class="textlarge"><?php echo $name;?></div> </li>
								<li></li>
						        <li> <div class="textmiddle"><?php echo $group;?></div> </li>
								 <li> <div class="textmiddle"><?php echo $amount." ".$unit." has ".$kcal." kCal";?></div> </li>
				</ul>
            </div>
			
            <div class="ui-block-a">
            	<canvas id="canvas" height="150" width="150"></canvas>
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
				<div class="textmiddle">User rating: </div>
	        </div>
	        <div class="ui-block-b">
	        	<div id="star"></div>
	        </div>
		</div>
		
		<div>
			
			
			
		</div>
        
        
		
		<script>
		    var doughnutData = [
		    {
		      value: <?php echo $fat;?>,
		      color:"#F7464A"
		    },
		    {
		      value : <?php echo $sugar;?>,
		      color : "#46BFBD"
		    },
		    {
		      value : <?php echo $df;?>,
		      color : "#FDB45C"
		    },
		    {
		      value : <?php echo $kh;?>,
		      color : "#949FB1"
		    }

		    ];

		    var myDoughnut = new Chart(document.getElementById("canvas").getContext("2d")).Doughnut(doughnutData);
  		  $('#star').raty({ readOnly: true,score: <?php echo $rank/2.0;?>, });
		  </script>
		  <?php
		 
		  $quote="<blockquote>
			  			<p>%s</p>
			  			
			  		</blockquote>";
		  foreach ($content as &$c) {
			  
			 
		      echo sprintf($quote,$c);
		  }
		  // $arr is now array(2, 4, 6, 8)
		  unset($c);
		  
		  ?>
	</div><!-- /content -->
</div><!-- /page one -->



</body>
</html>