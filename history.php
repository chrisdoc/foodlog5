
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
    <script src="foodlog.js" type="text/javascript"></script>
    <script src="taffy.extend.group.js" type="text/javascript"></script>
    <script src="jquery.quovolver.js" type="text/javascript"></script>
    <script src=
    "http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog2.min.js"
    type="text/javascript"></script>
    <script src="Chart.js"></script>
    <script>

	var dates=new Array();
    function displayMealDetails(meal){
        $.mobile.changePage( "mealDetail.php", {
          type: "get",
          data: {meal:meal,date:dates[meal]},
          changeHash: true
        });
    }

    function loadData(){
        
        
        mealDB().order("date desc").each(function (record,recordnumber) {
            var d=new Date(record["date"]);
            d.setHours(0,0,0,0);
            if (d in dates) {
                
            }
            else{
                dates[d]=d;
                dates.push(d);
            }
            
        });
		var i=0;
        dates.forEach(function(date){
            var totalKCal=0;
            var c=mealDB(function () {
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
                totalKCal+=kCal*amount_eaten/amount;
            
            });
            
            console.log(totalKCal);
            var dateString=date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
            var jsonDate=date.toJSON();
            $('#result-listview')
                .append('<li>' + '<a href="" onclick="displayMealDetails('+i+');">'  +                   '<h3                class="ui-li-heading">' +dateString+'</h3>' + '<p class="ui-li-desc"> You have consumed ' +totalKCal+ ' kCal</p>' + '</a>' + '</li>');
				i++;
        });
        $('#result-listview')
            .listview('refresh');
    }
    $(document).ready(function() {
      loadData();
    });

    </script>
</head>

<body>
    <!-- Start of first page: #one -->

    <div data-role="page" id="main">
        <div data-role="header">
            <h1>History</h1>
        </div>

        <div data-role="content">
            <ul class="listview" data-inset="true" data-role="listview"
            data-theme="b" id="result-listview"></ul>
        </div><!-- /content -->
    </div><!-- /page one -->
</body>
</html>