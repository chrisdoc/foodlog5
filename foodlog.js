var items=[];
var foodDB = TAFFY();
var mealDB=TAFFY();
foodDB.store("fooditems");
mealDB.store("mealitems");
//var patt=/(?<=\()(.*?)(?=\))/;
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
					.append('<li>' + '<a href="" onclick="displayDetails('+id +');">' + '<img style="border-radius: 10px;" src="' + thumbsrc + '" class="ui-li-thumb">' + '<h3 class="ui-li-heading">' + $(this)
					.find("description")
					.find("name")
					.text() + '</h3>' + '<p class="ui-li-desc">' + group + '</p>' + '</a>' + '</li>');




				content = '<div data-role="page" id="id_' + id + '" data-url="id_' + id + '">' + '<div data-role="header">' + '<a href="#" data-rel="back" data-icon="back">Back</a>' + '<h1>' + name + '</h1>' + '</div>' + '<div data-role="content">' + '<p>' + '<div data-role="fieldcontain" class="result">' + '</div>' + '</p>' + 'fat: ' + fat + ' sugar: ' + sugar + ' df: ' + df + " kh" + kh + '<canvas id="canvas_' + id + '" height="150" width="150"></canvas>' + '</div>' + '</div>';





				$('body')
					.append(content)
					.trigger('create');


				var doughnutData = [{
					value: fat * 10,
					color: "#F7464A"
				}, {
					value: sugar * 10,
					color: "#46BFBD"
				}, {
					value: df * 10,
					color: "#FDB45C"
				}, {
					value: kh * 10,
					color: "#949FB1"
				}

				];

				var myDoughnut = new Chart(document.getElementById("canvas_" + id)
					.getContext("2d"))
					.Doughnut(doughnutData);

				/*Tell JQM to enhance the page with the required classes.*/
				$(id)
					.page();
				//alert("result");
			}

			);
			
			
			$('#result-listview')
				.listview('refresh');
			$.mobile.loading("hide");
		},
		fail: function() {
			alert("fail");
		}
	});
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
