<!DOCTYPE html> 
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title><?php echo $name;?></title> 
	 <link rel="stylesheet" type="text/css" href="jquery.mobile.flatui.css" />
	<link rel="stylesheet" type="text/css" href="food.css" />
	<link rel="stylesheet" type="text/css" media="screen" href="style.css">
	<link rel="stylesheet" type="text/css" href="http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog.min.css" /> 
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	 <script src="jquery.raty.min.js"></script>
	 <script src="http://code.jquery.com/mobile/latest/jquery.mobile.js"></script>
	 <script type="text/javascript" src="taffy.js"></script>
	 <script type="text/javascript" src="foodlog.js"></script>
	 <script type="text/javascript" src="taffy.extend.group.js"></script>
	 <script type="text/javascript" src="jquery.quovolver.js"></script>
	 <script type="text/javascript" src="http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog2.min.js"></script>
	 
	<script src="Chart.js"/></script>
	
</head> 

	
<body> 

<!-- Start of first page: #one -->
<div data-role="page" id="main">

	<div data-role="header">
		<h1>History</h1>
	</div>
	
	<div data-role="content" >	
	

		<ul id="result-listview" class="listview" data-role="listview" data-theme="b" data-inset="true">
			
		</ul>
		
		<script>
		
		var dates=[];
		
		mealDB().order("date desc").each(function (record,recordnumber) {
			
			var id=record["id"];
			var amount_eaten=record["amount"];
			var food=foodDB({id:id});
			var thumbsrc=food.select("thumbsrc")[0];
			var name=food.select("name")[0];
			var amount=food.select("amount")[0];
			var unit=food.select("unit")[0];
			var kCal=food.select("kcal")[0];
			
			var date = new Date(record["date"]);
			
			var d=new Date(record["date"]);
			d.setHours(0,0,0,0);
			if (d in dates) {
			    
			}
			else{
				dates[d]=d;
				dates.push(d);
			}
			
			var k=kCal*amount_eaten/amount;
			$('#result-listview')
				.append('<li>' + '<a href="" onclick="displayDetails('+id +');">' + '<img style="border-radius: 10px;" src="' + thumbsrc + '" class="ui-li-thumb">' + 					'<h3 				class="ui-li-heading">' +name+" ("+amount+" "+unit+", "+k+" kCal)"+'</h3>' + '<p class="ui-li-desc">' + date.toLocaleString() + '</p>' + '</a>' + '</li>');
		}); // alerts the value of the balance column for each record
		
		alert(dates.length);
		
		</script>
		 
		 
	</div><!-- /content -->
</div><!-- /page one -->



</body>
</html>