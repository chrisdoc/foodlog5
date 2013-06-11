
<?php
  $name=$_GET["name"];
  $id=$_GET["id"];
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
	<!--<meta name="viewport" content="width=device-width, initial-scale=1"> -->
	<meta content="width=device-width, minimum-scale=1, maximum-scale=1" name="viewport">
	<title><?php echo $name;?></title> 
 <link rel="stylesheet" type="text/css" href="jquery.mobile.flatui.css" />
<link rel="stylesheet" type="text/css" href="food.css" />
<link rel="stylesheet" href="messi.css" />
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>
<script type="text/javascript" language="javascript" src="Chart.js"></script>
<script type="text/javascript" src="taffy.js"></script>s
<script src="jquery.raty.min.js"></script>
 <script src="jquery.quovolver.js" type="text/javascript"></script>
 <script src="messi.js"></script>
 <script type="text/javascript" language="javascript" src="foodlog.js"></script>
	 
</head> 

	
<body> 

<!-- Start of first page: #one -->
<div data-role="page" id="detail">

	<div data-role="header">
		<h1><?php echo 'Product details'//$name;?></h1>
	</div>
	
	<div data-role="content" >	
	
		<div class="ui-grid-solo" style="text-align: center;margin-top: 2%;">
			<ul >
						        <li> <div class="textlarge" style="font-weight: bold;"><?php echo $name;?></div> </li>
								<li></li>
			</ul>
		</div>
		
		<div class="ui-grid-solo" style="text-align: center;">
			<?php echo '<img class="foodimg" src="'.$thumbsrc.'" alt="Smiley face" style="width: 40%; height: auto; border-top-left-radius: 14px;border-top-right-radius: 14px;border-bottom-right-radius: 14px;border-bottom-left-radius: 14px;">'; ?>
		</div>
		
		<div class="ui-grid-solo" style="text-align: center;margin-top: 1%;">
			<ul >
						        <li> <div class="textmiddle" style="font-style: oblique;"><?php echo $group;?></div> </li>
								 <li> <div class="textmiddle"><?php echo $amount." ".$unit." has ".$kcal." kCal";?></div> </li>
			</ul>
		</div>
		
		<div class="ui-grid-a">
            <div class="ui-block-a" style="margin-top: 3%;padding-left: 0%;text-align: left;width: 85%;">
            	<canvas id="detail_canvas" style="height: 100%; width: 100%;"></canvas>
            </div>
            <div class="ui-block-b" style="margin-top: 3%;width: 20%;margin-left: -38%;">
				<ul>
						        <li class="square fat"> <a class="nutrition">Fat&nbsp;(<?php echo $fat;?>g)</a> </li>
						        <li class="square sugar"> <a class="nutrition">Sugar&nbsp;(<?php echo $sugar;?>g)</a> </li>
						        <li class="square df"> <a class="nutrition">Dietary&nbsp;fiber&nbsp;(<?php echo $df;?>g)</a> </li>
						        <li class="square carbon"> <a class="nutrition">Carbohydrates&nbsp;(<?php echo $kh;?>g)</a> </li>
				</ul>
            </div>
	        <div class="ui-block-a" style="margin-top: 2%;">
				<div class="textmiddle">User rating: </div>
	        </div>
	        <div class="ui-block-b" style="margin-top: 2%;">
	        	<div id="star"></div>
	        </div>
	        <div class="ui-block-a">
				<div class="textmiddle">Amount in <?php echo $unit?>: </div>
	        </div>
	        <div class="ui-block-b">
	        	<input type="number" id="amount" name="amount" min="1" max="3000" value=<?php echo '"'.$amount.'"';?>>
	        </div>
	        <div class="ui-block-a">
				<div class="textmiddle">Time: </div>
	        </div>
	        <div class="ui-block-b">
	        	<input id="time" name="time" type="time"/>
	        </div>
			
			
		</div>
		
		<div class="ui-grid-solo">
			<div class="ui-block-a" style="width: 90%; margin-left: 5%;"><button type="v" data-theme="b" id="add_meal">Add meal</button></div>
		</div>
		
		<div class="ui-grid-solo">
			
			<div class="ui-block-a" style="width: 50%; margin-left: 25%;">
  		  <?php
		  echo '
		  <div class="panels" style="margin-left: 10%;">
		                      <div class="panel" id="panel-1">
								  <div class="quotes">';
  		  $quote='<blockquote>
  			  			%s
		  <cite>Anonymous</cite>
  			  		</blockquote>';
  		  foreach ($content as &$c) {
			  
			 
  		      echo sprintf($quote,$c);
  		  }
		  echo '</div> </div> </div>';
  		 
  		  unset($c);
		  
  		  ?>
			</div>
		</div>

		
		
		<script>
		
	
  
		
		$(document).delegate('#opendialog', 'click', function() {
		  // NOTE: The selector is the hidden DIV element.
		  $('#inlinecontent').simpledialog2({
		      buttons : {
		        'OK': {
		          click: function () { 
		            $('#buttonoutput').text('OK');
		          }
		        },
		        'Cancel': {
		          click: function () { 
		            $('#buttonoutput').text('Cancel');
		          },
		          icon: "delete",
		          theme: "c"
		        }
		      }
		    })
		});
		
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

		   
			var myDoughnut = new Chart(document.getElementById("detail_canvas").getContext("2d")).Doughnut(doughnutData);
	
  		$(document).on('pageinit',function() {
      
  				//$('blockquote').quovolver();
				$('.quotes').quovolver({
					            transitionSpeed : 300,
								autoPlaySpeed : 6000, 
					            autoPlay        : true,
					            equalHeight     : false
					        });
			    
	  		  	$('#star').raty({ readOnly: true,score: <?php echo $rank/2.0;?>, });
				initDetailPage();
			   //Note the comment below from @Taifun.
  			});
			var currentItem={id:<?php echo $id;?>,kcal:<?php echo $kcal;?>,amount:<?php echo $amount;?>};
		  </script>
		 
		 
	</div><!-- /content -->
	<div data-role="popup" id="popupAdded">
	  <p>Meal was added to the diary<p>
	</div>
	<div data-role="popup" id="popup_option" 
	    data-theme="a" class="ui-corner-bottom ui-content" data-overlay-theme="a">

	     <div data-role="content">
	        <h3 class="ui-title">Limit exceeded!</h3>

	        <p id="limit_text">You have exceeded your limits the ticket.</p>

		 <div class="ui-grid-a">
	           <div class="ui-block-a" id="buttoncontainer">
	               <a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="d" data-corners="true" data-shadow="true" class="ui-btn ui-shadow 					ui-btn-corner-all ui-btn-up-d" id="closebtn">
	                   Cancel
	               </a>
          
	           </div>
	           <div class="ui-block-b" id="buttoncontainer">
	               <a href="#" data-role="button" data-inline="true" data-rel="button" data-theme="b" data-corners="true" data-shadow="true" class="ui-btn ui-shadow 					ui-btn-corner-all ui-btn-up-b" id="okbtn">
	                   OK
				   </a>
		
          
	           </div>
		   </div>
	
</div><!-- /page one -->


       
		
	   <script>
	$('#closebtn').closest('.ui-btn').hide();
	$('#okbtn').closest('.ui-btn').hide();

	   </script>

      
    </div>
</div>

</body>
</html>