
<?php
  $name=$_GET["name"];
  $fat=floatVal($_GET["fat"]);
  $sugar=floatVal($_GET["sugar"]);
  $df=floatVal($_GET["df"]);
  $kh=floatVal($_GET["kh"]);
  $kcal=floatVal($_GET["kcal"]);
?>


<!DOCTYPE html> 
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title><?php echo $name;?></title> 
	 <link rel="stylesheet" type="text/css" href="jquery.mobile.flatui.css" />
	<link rel="stylesheet" type="text/css" href="food.css" />
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="http://code.jquery.com/mobile/latest/jquery.mobile.js">
	</script>
	<script src="Chart.js"/></script>
</head> 

	
<body> 

<!-- Start of first page: #one -->
<div data-role="page" id="main">

	<div data-role="header">
		<h1><?php echo $name;?></h1>
	</div>

	<div data-role="content" >	
		<table>
		  <tr>
		    <td><canvas id="canvas" height="150" width="150"></canvas></td>
		    <td><ul>
		        <li class="square fat"> <a class="nutrition">fat</a> </li>
		        <li class="square sugar"> <a class="nutrition">sugar</a> </li>
		        <li class="square df"> <a class="nutrition">df</a> </li>
		        <li class="square carbon"> <a class="nutrition">carbohydrates</a> </li>
		      </ul></td>
		  </tr>
		</table>
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
  
		  </script>
	
	</div><!-- /content -->
</div><!-- /page one -->



</body>
</html>