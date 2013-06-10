var items=[];
var foodDB = TAFFY();
var mealDB=TAFFY();
foodDB.store("fooditems");
mealDB.store("mealitems");
localStorage.mealDBBackup=mealDB().stringify()	
localStorage.foodDBBackup=foodDB().stringify()
//var patt=/(?<=\()(.*?)(?=\))/;



var dates=new Array();
var date;


function loadFoodData(id){
	var item=foodDB({id:id}).first();
	console.log("show item "+id);
	$('#food_header').text(item.name);
	$('#food_name').text(item.name);
	$('#food_group').text(item.grouo);
	var kcal_text=item.amount+" "+item.unit+" has "+item.kcal+" kcal";
	$('#food_amount_unit').text(kcal_text);
	var thumbsrc= item.thumbsrc;
	if(!thumbsrc){
		thumbsrc="images/afs.png";
	}
	$("#food_img").attr("src", thumbsrc)
	

    var foodData = [
    {
      value: Number(item.fat),
      color:"#F7464A"
    },
    {
      value : Number(item.sugar),
      color : "#46BFBD"
    },
    {
      value : Number(item.df),
      color : "#FDB45C"
    },
    {
      value : Number(item.kh),
      color : "#949FB1"
    }

    ];

    
	var canvas=document.getElementById("food_canvas");
	if(canvas!=null){
		var myDoughnut = new Chart(document.getElementById("food_canvas").getContext("2d")).Doughnut(foodData);
	}
  	$('#food_star').raty({ readOnly: true,score: item.rank/2.0});

	//$('blockquote_food').quovolver();
}

function loadMealData(mealDate){
	$('#meal-listview')
		.empty();
	$('#meal-listview').listview().listview('refresh');
	mealDB(function () {
	                var d=new Date(this.date);
	                d.setHours(0,0,0,0);
	                return (d-mealDate===0)?true:false;
	            }).each(function(record,recordnumber){
	                var id=record["id"];
	                var amount_eaten=record["amount"];
	                var food=foodDB({id:id});
	                var thumbsrc=food.select("thumbsrc")[0];
					if(!thumbsrc){
						thumbsrc="images/afs.png";
					}
	                var name=food.select("name")[0];
	                var amount=food.select("amount")[0];
	                var unit=food.select("unit")[0];
	                var kCal=food.select("kcal")[0];
	              	var total=kCal*amount_eaten/amount;
					var date=new Date(record["date"]);
					
		            $('#meal-listview')
		                .append('<li id="divider">' +'<a href="" onclick="displayFoodDetails('+id+');">' +'<img style="border-radius: 10px;" src="' + thumbsrc + '" class="ui-li-thumb">' +                   '<h3                class="ui-li-heading">' 							+name+'</h3>' + '<p class="ui-li-desc">'+date.toLocaleTimeString()+' '+amount_eaten+' '+unit+', '+total+ ' kCal</p>'  + '</a></li>');
						
		        });
				
        
    $('#meal-listview')
        .listview('refresh');
}


function displayMealDetails(meal){
    $.mobile.changePage( "mealDetail.php", {
      type: "get",
      data: {meal:meal,date:dates[meal].getTime()},
      changeHash: true
    });
   
}

function displayFoodDetails(id){
    $.mobile.changePage( "foodDetail.php", {
      type: "get",
      data: {foodid:id},
      changeHash: true
    });
}


function loadHistoryData(){
	$('#history-listview')
		.empty();
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
			if(!thumbsrc){
				thumbsrc="images/afs.png";
			}
            var name=food.select("name")[0];
            var amount=food.select("amount")[0];
            var unit=food.select("unit")[0];
            var kCal=food.select("kcal")[0];
            totalKCal+=kCal*amount_eaten/amount;
        
        });
        
        console.log(totalKCal);
        var dateString=date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
        var jsonDate=date.toJSON();
        $('#history-listview')
            .append('<li id="divider">' + '<a href="" onclick="displayMealDetails('+i+');">'  +                   '<h3                class="ui-li-heading">' +dateString+'</h3>' + '<p class="ui-li-desc"> You have consumed ' +totalKCal+ ' kCal</p>' + '</a>' + '</li>');
			i++;
    });
	$('history-listview').listview().listview('refresh');
   /* $('#result-listview')
        .listview('refresh');*/
}

function searchDB(data) {
	items=[];
	var food = $('#searchField')
		.val();
	$.mobile.showPageLoadingMsg();

	$.ajax({
		//http://localhost:8020/redirect?dest=http://fddb.info/api/v8/search/item.xml?lang=de&q=banane&apikey=HREPF3HUMKOUKKZTAK647
		//url:"http://localhost:8020/redirect?dest=http://fddb.info/api/v8/search/item.xml?lang=de&q="+food+"&apikey=HREPF3	HUMKOUKKZTAK647",
		url: "http://193.170.124.133/miniProxy.php/http://fddb.info/api/v8/search/item.xml?lang=de&q=" + food + "&apikey=HREPF3HUMKOUKKZTAK647", //"http://193.170.124.131/?method=search&param="+food,
		type: "GET",
		dataType: "xml",
		success: function(xml) {
			$('#result-listview')
				.empty();
			$(xml)
				.find('item')
				.each(function() {
					tempArray=[];
				var dataxml = $(this)
					.find("data");
				var desc = $(this)
					.find("description");

				var thumbsrc = $(this)
					.find("thumbsrc")
					.text();
					if(!thumbsrc){
						thumbsrc="images/afs.png";
					}
				var name = desc.find("name")
					.text();
				var group = desc.find("group")
					.text();
				var id = $(this)
					.find("id")
					.text();
				var contents=[];
				var content=$(this).find("content").find("celement").each(function(){
					contents.push($(this).find("content").text())
				});	
				var rank = $(this).find("foodrank").text();

				var kcal = dataxml.find("kcal")
					.text();
				
				var fat = dataxml.find("fat_gram")
					.text();
				var kh = dataxml.find("kh_gram")
					.text();
				var sugar = dataxml.find("sugar_gram")
					.text();
				var df = dataxml.find("df_gram")
					.text();
				var amount = dataxml.find("amount")
						.text();
						var unit = dataxml.find("amount_measuring_system")
								.text();
								first=unit.lastIndexOf("(")+1;
								last=unit.indexOf(")");
								unit=unit.substr(first,unit.length);
								unit=unit.replace(/\)/g,"");
				item={id:id,name:name,unit:unit,group:group,kcal:kcal,fat:fat,kh:kh,sugar:sugar,df:df,thumbsrc:thumbsrc,amount:amount,rank:rank,contents:contents.join("#")};
				items["id_"+id.toString()]=item;
				
				
				var count=foodDB({"id":parseInt(id)}).count();
				if(count==0){
					foodDB.merge('[{"id":'+parseInt(id)+',"name":"'+name+'","unit":"'+unit+'","grouo":"'+group+'","kcal":"'+kcal+'","fat":"'+fat+'","kh":"'+kh+'","sugar":"'+sugar+'","df":"'+df+'","thumbsrc":"'+thumbsrc+'","amount":"'+amount+'","rank":"'+rank+'"}]');
				}
				$('#result-listview')
					.append('<li id="divider">' + '<a href="" onclick="displayDetails('+id +');">' + '<img style="border-radius: 10px;" src="' + thumbsrc + '" class="ui-li-thumb">' + '<h3 class="ui-li-heading">' + $(this)
					.find("description")
					.find("name")
					.text() + '</h3>' + '<p class="ui-li-desc">' + group + '</p>' + '</a>' + '</li>');

			}

			);
			$('#result-listview').listview().listview('refresh');
			
			$.mobile.loading("hide");
		},
		fail: function() {
			alert("fail");
		}
	});
}
function calculateTodaysKcal(){
    
        var totalKCal=0;
		var date= new Date();
		date.setHours(0,0,0,0);
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
		console.log("totalKCal: "+totalKCal);
        return(totalKCal);
      
	
}

function displayDetails(id){
	//alert(id);
	//alert(JSON.stringify(items["id_"+id]));
	$.mobile.changePage( "detail.php", {
	  type: "get",
	  data: items["id_"+id],
	  changeHash: true
	});
}
function changePage(id) {
	$.mobile.changePage($(id), {transition : "slide"});
}
function initSettings(){
		loadFromLocalStorage();
  		$('#age').change(function() {
		  updateKcal();
		});
		$('#gender').change(function() {
		  updateKcal();
		});
		$('#height').change(function() {
		  updateKcal();
		});
		$('#weight').change(function() {
		  updateKcal();
		});

	      $( "#btn_save" )
	      .button()
	      .click(function( event ) {
	        event.preventDefault();
			//$('#settings_form').submit();
			
	        localStorage.age=$('#age').val();
	        localStorage.height=$('#height').val();
	        localStorage.weight=$('#weight').val();
	        localStorage.gender=$('#gender').val();
	        localStorage.daily_limit=$('#daily_limit').val();
	        localStorage.meal_limit=$('#meal_limit').val();
			
			$("#popupSaved").popup("open");
			window.setTimeout(function() {$('#popupSaved').popup("close")}, 2000);
			
	      });
}
loadFromLocalStorage=function(){
	restore('age');
	restore("height");
	restore("weight");
	restore("daily_limit");
	restore("meal_limit");
	if (localStorage.getItem("gender") != null) {
		
		var optionValue=localStorage.gender;
		$("#gender").val(optionValue);
	}
	

}
restore=function(name){
	if (localStorage.getItem(name) != null) {
		$('#'+name).val(parseInt(localStorage.getItem(name)));
	}
}
updateKcal=function(){
    var weight=$('#weight').val();
    var height=$('#height').val();
    var age=$('#age').val();
    var kcal=0;
    if($('#gender').val()=="male"){
		
		kcal = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    else if($('#gender').val()=="female"){
    	
    	kcal = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    kcal=new Number(kcal)
    $('#daily_limit').val(Math.round(kcal));
  
}

function initDetailPage(){
 	var d = new Date();
	var ds=d.getHours()+":"+d.getUTCMinutes();
	if(d.getUTCMinutes()<10){
		var ds=d.getHours()+":0"+d.getUTCMinutes();
	}
	
	
	console.log("timestring: "+ds);
	$('#time').val(ds);
	
	$('#popup_option').popup( );
	$("#popupAdded").popup();
    setTimeout(function () {
	//	$('#popup_option').popup();
	//	$("#popupAdded").popup();
       }, 300);
	$("#add_meal").click(function() {
		var amount = parseInt($('#amount').val());
		//var id=<?php echo $id;?>;
		var id=currentItem.id;
		console.log($('#time').val())
		var now=$('#time').val().split(":");
		
		d.setHours(now[0]);
		d.setMinutes(now[1]);
		console.log(d);
		var kcal=amount/currentItem.amount*currentItem.kcal;
		var todaysKcal=calculateTodaysKcal();
		
		if(todaysKcal+kcal>=localStorage.daily_limit){
			
								$('#limit_text').text("You have exceeded your daily limit, do you wanna continue?");
								$('#closebtn').closest('.ui-btn').show();
								$('#okbtn').closest('.ui-btn').show();
								$('#okbtn').click(function(){
									console.log({date:d.toJSON(),id:id,amount:amount})
									mealDB.insert({date:d.toJSON(),id:id,amount:amount});
									$( '#popup_option' ).popup( 'close', { transition: "flow" } );
								});
			                    $( '#popup_option' ).popup( 'open', { transition: "flow" } );
		}
		else if(kcal>=localStorage.meal_limit){

								$('#limit_text').text("You have exceeded your meal limit, do you wanna continue?");
								$('#closebtn').closest('.ui-btn').show();
								$('#okbtn').closest('.ui-btn').show();
								$('#okbtn').click(function(){
									console.log({date:d.toJSON(),id:id,amount:amount})
									mealDB.insert({date:d.toJSON(),id:id,amount:amount});
									$( '#popup_option' ).popup( 'close', { transition: "flow" } );
								});
			                    $( '#popup_option' ).popup( 'open', { transition: "flow" } );
		}
		else{
			mealDB.insert({date:d.toJSON(),id:id,amount:amount});
			$("#popupAdded").popup("open");
			window.setTimeout(function() {$('#popupAdded').popup("close")}, 1000);
			
		}
				
	});
}
