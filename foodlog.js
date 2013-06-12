
/**
@property container for items
*/
var items = [];
/**
@property food database which store all informations about foods
*/
var foodDB = TAFFY();
/**
@property meal database which stores all meals, our history
*/
var mealDB = TAFFY();
//creates or loads a database if it exists
foodDB.store("fooditems");
mealDB.store("mealitems");
//creates a backup of the database
localStorage.mealDBBackup = mealDB().stringify();
localStorage.foodDBBackup = foodDB().stringify();
//var patt=/(?<=\()(.*?)(?=\))/;

//calls the inital settings, this will set initial settings for the settings page
setInitalSettings();

/**
@property an array of dates
*/
var dates = new Array();
/**
@property a temporary date
*/
var date;

/**
 * @method loadFoodData
 * @param {Number} id id of the food
 * @param {String} amount_eaten the kcal the user has already eaten
 * @param {String} key a key which identifies the meal (primary key)
 */
function loadFoodData(id, amount_eaten, key) {
    //loads the food item from the db
    var item = foodDB({
        id: id
    }).first();
    //loads the meal item from the db
    var meal = mealDB({
        key: key
    }).first();
    console.log("show item " + id);

    //updates the website content
    $('#food_header').text(item.name);
    $('#food_name').text(item.name);
    $('#food_group').text(item.grouo);

    var factor = amount_eaten / item.amount;


    $('#food_fat').html("Fat&nbsp;(" + checkVariable(item.fat * factor) + "g)");
    $('#food_sugar').html("Sugar&nbsp;(" + checkVariable(item.sugar * factor) + "g)");
    $('#food_df').html("Dietary&nbsp;fiber&nbsp;(" + checkVariable(item.df * factor) + "g)");
    $('#food_kh').html("Carbohydrates&nbsp;(" + checkVariable(item.kh * factor) + "g)");

    var kcal_text = amount_eaten + " " + item.unit + " á " + item.kcal * factor + " kCal";
    $('#food_amount_unit').text(kcal_text);
    var thumbsrc = item.thumbsrc;
    //shows an alternative picture if the thumbnail is not provided
    if (!thumbsrc) {
        thumbsrc = "images/afs.png";
    }
    $("#food_img").attr("src", thumbsrc)

    /*
	//creates a json object for the pie chart
    var foodData = [
    {
      value: Number(checkVariable(item.fat)),
      color:"#F7464A"
    },
    {
      value : Number(checkVariable(item.sugar)),
      color : "#46BFBD"
    },
    {
      value : Number(checkVariable(item.df)),
      color : "#FDB45C"
    },
    {
      value : Number(checkVariable(item.kh)),
      color : "#949FB1"
    }

    ];
*/

    /*var canvas=document.getElementById("food_canvas");
	canvas.width = canvas.width;
	if(canvas!=null){
		var myDoughnut = new Chart(document.getElementById("food_canvas").getContext("2d")).Doughnut(foodData);
	}*/

    //creates a rating 
    $('#food_star').raty({
        readOnly: true,
        score: item.rank / 2.0
    });

    $('#delete_meal').unbind();

    //event handler for the delete button
    $("#delete_meal").click(function () {
        $('#closeFoodbtn').closest('.ui-btn').show();
        $('#okFoodbtn').closest('.ui-btn').show();
        $('#okFoodbtn').unbind();
        $('#okFoodbtn').click(function () {
            console.log("item deleted");
            mealDB({
                key: key
            }).remove();

        });
        $('#popup_delete').popup('open', {
            transition: "flow"
        });
    });

    //$('blockquote_food').quovolver();
}
/**
 * @method checkVariable checks if a variable is defined or not
 * @param {Number} item a number
 * @return {Number} number a number rounded to 2 digits
 */
function checkVariable(item) {
    return myRound((item < 0 || item == "") ? "0" : item, 2);
}

/**
 * @method myRound rounds a number
 * @param {Number} zahl the number to be rounded
 * @param {Number} n the number of digits to be rounded
 * @return {Number} number a number rounded to n digits
 */
function myRound(zahl, n) {
    var faktor;
    zahl = Number(zahl);
    faktor = Math.pow(10, n);
    return (Math.round(zahl * faktor) / faktor);
}

/**
 * @method loadMealData loads meal data
 * @param {Date} mealDate the date for which meals should be loaded
 */
function loadMealData(mealDate) {
    //initializes the listview
    $('#meal-listview')
        .empty();
    $('#meal-listview').listview().listview('refresh');
    mealDate.setHours(0, 0, 0, 0);
    //loads meals for the specified data
    mealDB(function () {
        var d = new Date(this.date);
        d.setHours(0, 0, 0, 0);
        return (d - mealDate === 0) ? true : false;
    }).each(function (record, recordnumber) { //iterates over all found records and builds listview items
        var id = record["id"];
        var amount_eaten = record["amount"];
        var food = foodDB({
            id: id
        });
        var thumbsrc = food.select("thumbsrc")[0];
        if (!thumbsrc) {
            thumbsrc = "images/afs.png";
        }
        var name = food.select("name")[0];
        var amount = food.select("amount")[0];
        var unit = food.select("unit")[0];
        var kCal = food.select("kcal")[0];
        var total = kCal * amount_eaten / amount;
        var date = new Date(record["date"]);
        var key = record["key"];
        $('#meal-listview')
            .append('<li id="divider">' + '<a href="" onclick="displayFoodDetails(' + id + ',' + amount_eaten + ',' + key + ');">' + '<img style="border-radius: 10px;" src="' + thumbsrc + '" class="ui-li-thumb">' + '<h3                class="ui-li-heading">' + name + '</h3>' + '<p class="ui-li-desc">' + date.toLocaleTimeString() + ' ' + amount_eaten + ' ' + unit + ', ' + total + ' kCal</p>' + '</a></li>');

    });


    $('#meal-listview')
        .listview('refresh');
    //sets the css style of the thumb
    $("img[class='ui-li-thumb']").load(function () {
        $(this).css('margin-top', 13.5);
        $(this).css('max-height', 53);
        $(this).css('margin-left', 10);
    });
}

/**
 * @method displayMealDetails display the meal details page
 * @param {String} meal the meal which should be displayed
 */

function displayMealDetails(meal) {
    //changes to the mealDetail page
    $.mobile.changePage("mealDetail.php", {
        type: "get",
        data: {
            meal: meal,
            date: dates[meal].getTime()
        },
        changeHash: true
    });

}

/**
 * @method displayFoodDetails display the food details page
 * @param {Number} id the id of the food
 * @param {Number} amount the amount the user has taken in
 * @param {String} key the primary key of the meal
 */
function displayFoodDetails(id, amount, key) {
    var item = foodDB({
        id: id
    }).first();
    //changes to the foodDetail page
    $.mobile.changePage("foodDetail.php", {
        type: "get",
        data: {
            foodid: id,
            amount: amount,
            key: key,
            id: item.id,
            name: item.name,
            thumbsrc: item.thumbsrc,
            fat: item.fat,
            sugar: item.sugar,
            df: item.df,
            kh: item.kh,
            kcal: item.kcal,
            unit: item.unit,
            group: item.grouo
        },
        changeHash: true
    });
}

/**
 * @method loadHistoryData loads the users history
 */
function loadHistoryData() {
    //initializes the history listview
    $('#history-listview')
        .empty();
    //iterates over all dates and creates a set of dates this mimics a group by query
    mealDB().order("date desc").each(function (record, recordnumber) {
        var d = new Date(record["date"]);
        d.setHours(0, 0, 0, 0);
        if (d in dates) {

        } else {
            dates[d] = d;
            dates.push(d);
        }

    });
    var i = 0;
    //iterates over each date in the date set
    dates.forEach(function (date) {
        var totalKCal = 0;
        var c = mealDB(function () {
            var d = new Date(this.date);
            d.setHours(0, 0, 0, 0);
            return (d - date === 0) ? true : false;
        }).each(function (record, recordnumber) { //iterates over each record with the same date (day) and sums up the kcal
            var id = record["id"];
            var amount_eaten = record["amount"];
            var food = foodDB({
                id: id
            });
            var thumbsrc = food.select("thumbsrc")[0];
            if (!thumbsrc) {
                thumbsrc = "images/afs.png";
            }
            var name = food.select("name")[0];
            var amount = food.select("amount")[0];
            var unit = food.select("unit")[0];
            var kCal = food.select("kcal")[0];
            totalKCal += kCal * amount_eaten / amount;

        });

        console.log(totalKCal);
        var dateString = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        var jsonDate = date.toJSON();
        //appends a new listview item to the listview
        $('#history-listview')
            .append('<li id="divider">' + '<a href="" onclick="displayMealDetails(' + i + ');">' + '<h3                class="ui-li-heading">' + dateString + '</h3>' + '<p class="ui-li-desc"> You have consumed ' + totalKCal.toFixed(2) + ' kCal</p>' + '</a>' + '</li>');
        i++;
    });
    $('history-listview').listview('refresh');
    //updates the css of the thumbnail
    $("img[class='ui-li-thumb']").load(function () {
        $(this).css('margin-top', 13.5);
        $(this).css('max-height', 53);
        $(this).css('margin-left', 10);
    });


    /* $('#result-listview')
        .listview('refresh');*/
}

/**
 * @method searchDB searches for a food in the fddb and displays the result
 * @param {String} data the name of the food
 */
function searchDB(data) {
    items = [];
    var food = $('#searchField')
        .val();
    $.mobile.showPageLoadingMsg();
    //ajax call to search the db
    $.ajax({
        //http://localhost:8020/redirect?dest=http://fddb.info/api/v8/search/item.xml?lang=de&q=banane&apikey=HREPF3HUMKOUKKZTAK647
        //url:"http://localhost:8020/redirect?dest=http://fddb.info/api/v8/search/item.xml?lang=de&q="+food+"&apikey=HREPF3	HUMKOUKKZTAK647",
        url: "http://193.170.124.133/miniProxy.php/http://fddb.info/api/v8/search/item.xml?lang=en&q=" + food + "&apikey=HREPF3HUMKOUKKZTAK647", //"http://193.170.124.131/?method=search&param="+food,
        type: "GET",
        dataType: "xml",
        success: function (xml) {
            $('#result-listview')
                .empty();
            //parsing the xml data
            $(xml)
                .find('item')
                .each(function () {
                        tempArray = [];
                        //parsing all elements
                        var dataxml = $(this)
                            .find("data");
                        var desc = $(this)
                            .find("description");

                        var thumbsrc = $(this)
                            .find("thumbsrc")
                            .text();
                        if (!thumbsrc) {
                            thumbsrc = "images/afs.png";
                        }
                        var name = desc.find("name")
                            .text();
                        var group = desc.find("group")
                            .text();
                        var id = $(this)
                            .find("id")
                            .text();
                        var contents = [];
                        var content = $(this).find("content").find("celement").each(function () {
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
                        first = unit.lastIndexOf("(") + 1;
                        last = unit.indexOf(")");
                        unit = unit.substr(first, unit.length);
                        unit = unit.replace(/\)/g, "");
                        //json object of all food information which will be saved to the database
                        item = {
                            id: id,
                            name: name,
                            unit: unit,
                            group: group,
                            kcal: kcal,
                            fat: fat,
                            kh: kh,
                            sugar: sugar,
                            df: df,
                            thumbsrc: thumbsrc,
                            amount: amount,
                            rank: rank,
                            contents: contents.join("#")
                        };
                        items["id_" + id.toString()] = item;

                        //checks if the food already exists in the database otherwise it adds it to the database
                        var count = foodDB({
                            "id": parseInt(id)
                        }).count();
                        if (count == 0) {
                            foodDB.merge('[{"id":' + parseInt(id) + ',"name":"' + name + '","unit":"' + unit + '","grouo":"' + group + '","kcal":"' + kcal + '","fat":"' + fat + '","kh":"' + kh + '","sugar":"' + sugar + '","df":"' + df + '","thumbsrc":"' + thumbsrc + '","amount":"' + amount + '","rank":"' + rank + '"}]');
                        }
                        //appends the food to the listview
                        $('#result-listview')
                            .append('<li id="divider">' + '<a href="" onclick="displayDetails(' + id + ');">' + '<img style="border-radius: 10px;" src="' + thumbsrc + '" class="ui-li-thumb">' + '<h3 class="ui-li-heading">' + $(this)
                                .find("description")
                                .find("name")
                                .text() + '</h3>' + '<p class="ui-li-desc">' + group + '</p>' + '</a>' + '</li>');
                    }

            );
            $('#result-listview').listview().listview('refresh');
            //updates the css of the thumbiamge
            $("img[class='ui-li-thumb']").load(function () {
                $(this).css('margin-top', 13.5);
                $(this).css('max-height', 53);
                $(this).css('margin-left', 10);
            });

            $.mobile.loading("hide");
        },
        fail: function () {
            alert("fail");
        }
    });
}

/**
 * @method calculateTodaysKcal calculates the number of calories the user has taken in today
 * @return {Number} totalKCal the number of calories for this day
 */
function calculateTodaysKcal() {

    var totalKCal = 0;
    //the currentdata
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    //loads meals for the current day
    var c = mealDB(function () {
        var d = new Date(this.date);
        d.setHours(0, 0, 0, 0);
        return (d - date === 0) ? true : false;
    }).each(function (record, recordnumber) { //sums up all kcal for the day
        var id = record["id"];
        var amount_eaten = record["amount"];
        var food = foodDB({
            id: id
        });
        var thumbsrc = food.select("thumbsrc")[0];
        var name = food.select("name")[0];
        var amount = food.select("amount")[0];
        var unit = food.select("unit")[0];
        var kCal = food.select("kcal")[0];
        totalKCal += kCal * amount_eaten / amount;

    });
    console.log("totalKCal: " + totalKCal);
    return (totalKCal);


}

/**
 * @method displayDetails displays the food details page
 * @param {Number} id the id of the food
 */
function displayDetails(id) {
    //changes to the details page
    $.mobile.changePage("detail.php", {
        type: "get",
        data: items["id_" + id],
        changeHash: true
    });
}

/**
 * @method changePage changes the page
 * @param {Number} id changes the page to this id
 */
function changePage(id) {
    $.mobile.changePage($(id), {
        transition: "slide"
    });
}

/**
 * @method initSettings inits the settings page with data from local storage
 */
function initSettings() {
    //load the settings from the localStorage
    loadFromLocalStorage();
    $('#age').change(function () {
        updateKcal();
    });
    $('#gender').change(function () {
        updateKcal();
    });
    $('#height').change(function () {
        updateKcal();
    });
    $('#weight').change(function () {
        updateKcal();
    });
    //save button handler
    $("#btn_save")
        .button()
        .click(function (event) {
            event.preventDefault();
            //saves settings to the localStorage
            localStorage.age = $('#age').val();
            localStorage.height = $('#height').val();
            localStorage.weight = $('#weight').val();
            localStorage.gender = $('#gender').val();
            localStorage.daily_limit = $('#daily_limit').val();
            localStorage.meal_limit = $('#meal_limit').val();

            $("#popupSaved").popup("open");
            window.setTimeout(function () {
                $('#popupSaved').popup("close")
            }, 2000);

        });
}

/**
 * @method loadFromLocalStorage loads settings from the localstorage
 */
loadFromLocalStorage = function () {
    //restores values fromt the local storage and updates the ui
    restore('age');
    restore("height");
    restore("weight");
    restore("daily_limit");
    restore("meal_limit");
    if (localStorage.getItem("gender") != null) {

        var optionValue = localStorage.gender;
        $("#gender").val(optionValue);
    }


}

/**
 * @method restore restores data from local storage
 */
restore = function (name) {
    //checks if item exists and updates the ui
    if (localStorage.getItem(name) != null) {
        $('#' + name).val(parseInt(localStorage.getItem(name)));
    }
}

/**
 * @method updateKcal updates the kcal limits on the settings page
 */
updateKcal = function () {
    var weight = $('#weight').val();
    var height = $('#height').val();
    var age = $('#age').val();
    var kcal = 0;
    //calculates the users limits based on is personal information
    if ($('#gender').val() == "male") {

        kcal = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if ($('#gender').val() == "female") {

        kcal = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    kcal = new Number(kcal)
    $('#daily_limit').val(Math.round(kcal));

}

/**
 * @method initDetailPage inits the food details page
 */
function initDetailPage() {
    var d = new Date();
    var ds = d.getHours() + ":" + d.getUTCMinutes();
    var minutes = d.getUTCMinutes();
    var hours = d.getHours();
    //Sets the current time to the input field
    if (d.getUTCMinutes() < 10) {
        minutes = "0" + d.getUTCMinutes();
    }
    if (d.getHours() < 10) {
        hours = "0" + d.getHours();
    }
    var ds = hours + ":" + minutes;

    console.log("timestring: " + ds);
    $('#time').val(ds);

    //initializes the popups
    $('#popup_option').popup();
    $("#popupAdded").popup();

    //adds a handerr for the add button
    $('#add_meal').unbind();
    $("#add_meal").click(function () {
        var amount = parseInt($('#amount').val());
        //var id=<?php echo $id;?>;
        var id = currentItem.id;
        console.log($('#time').val())
        var now = $('#time').val().split(":");

        d.setHours(now[0]);
        d.setMinutes(now[1]);
        console.log(d);
        var kcal = amount / currentItem.amount * currentItem.kcal;
        var todaysKcal = calculateTodaysKcal();
        //Checks if the users has exceed his limits and warns him if he did
        //otherwise it will be stored automatically
        if (todaysKcal + kcal >= localStorage.daily_limit) {

            $('#limit_text').text("You have exceeded your daily limit, do you wanna continue?");
            $('#closebtn').closest('.ui-btn').show();
            $('#okbtn').closest('.ui-btn').show();
            $('#okbtn').unbind();
            $('#okbtn').click(function () { //stores the meal if the user says OK in the dialog
                console.log({
                    date: d.toJSON(),
                    id: id,
                    amount: amount
                });
                console.log("added to history");
                var key = new Date();
                mealDB.insert({
                    date: d.toJSON(),
                    id: id,
                    amount: amount,
                    key: key.getTime()
                });
                $('#popup_option').popup('close', {
                    transition: "flow"
                });
            });
            $('#popup_option').popup('open', {
                transition: "flow"
            });
        } else if (kcal >= localStorage.meal_limit) {

            $('#limit_text').text("You have exceeded your meal limit, do you wanna continue?");
            $('#closebtn').closest('.ui-btn').show();
            $('#okbtn').closest('.ui-btn').show();
            $('#okbtn').unbind();
            $('#okbtn').click(function () { //stores the meal if the user says OK in the dialog
                console.log("added to history");
                console.log({
                    date: d.toJSON(),
                    id: id,
                    amount: amount
                });
                var key = new Date();
                mealDB.insert({
                    date: d.toJSON(),
                    id: id,
                    amount: amount,
                    key: key.getTime()
                });

                $('#popup_option').popup('close', {
                    transition: "flow"
                });
            });
            $('#popup_option').popup('open', {
                transition: "flow"
            });
        } else if (kcal < localStorage.meal_limit && (todaysKcal + kcal) < localStorage.daily_limit) {
            var key = new Date();
            mealDB.insert({
                date: d.toJSON(),
                id: id,
                amount: amount,
                key: key.getTime()
            });
            console.log("added to history");
            console.log({
                date: d.toJSON(),
                id: id,
                amount: amount
            })
            $("#popupAdded").popup("open");
            window.setTimeout(function () {
                $('#popupAdded').popup("close")
            }, 2000);

        }

    });
}

/**
 * @method setInitialSettings sets the settings for the first time
 */
function setInitalSettings() {
    if (localStorage.getItem("settingsset") === null) {
        localStorage.setItem("settingsset", true);
        localStorage.setItem("age", 25);
        localStorage.setItem("height", 180);
        localStorage.setItem("weight", 76);
        localStorage.setItem("gender", "male");
        localStorage.setItem("daily_limit", 2500);
        localStorage.setItem("meal_limit", 500);
    }
}