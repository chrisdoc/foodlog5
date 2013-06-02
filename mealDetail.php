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


    function displayMealDetails(date){
        $.mobile.changePage( "mealDetail.php", {
          type: "get",
          data: date,
          changeHash: true
        });
    }

    function loadData(){
        
		var date=new Date(<?php echo '"'.$date.'"';?>);
		mealDB(function () {
		                var d=new Date(this.date);
		                d.setHours(0,0,0,0);
		                return (d-date===0)?true:false;
		            }).each(function(record,recordnumber){
		                var id=record["id"];
		                var amount_eaten=record["amount"];
		                var food=foodDB({id:id});
		                var thumbsrc=food.select("thumbsrc")[0];
		                var name=food.select("name")[0];
		                var amount=food.select("amount")[0];
		                var unit=food.select("unit")[0];
		                var kCal=food.select("kcal")[0];
		              	var total=kCal*amount_eaten/amount;
			            $('#result-listview')
			                .append('<li>'  +'<img style="border-radius: 10px;" src="' + thumbsrc + '" class="ui-li-thumb">' +                   '<h3                class="ui-li-heading">' 							+name+'</h3>' + '<p class="ui-li-desc">'+amount_eaten+' '+unit+', '+total+ ' kCal</p>'  + '</li>');
							
			        });
		           
		
            
        $('#result-listview')
            .listview('refresh');
    }
    $(document).ready(function() {
      loadData();
	  var date=new Date(<?php echo '"'.$date.'"';?>);
	  $("#title").html(date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear());
	  document.title = 'Meals from '+date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
	  
    });

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
            data-theme="b" id="result-listview"></ul>
        </div><!-- /content -->
    </div><!-- /page one -->
</body>
</html>