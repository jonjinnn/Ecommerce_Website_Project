function handleSessionData(resultDataJson) {
    let item_list = $("#item_list_body");
    let sub_total = 0.0;
    item_list.html("");

    for (let i = 0; i < resultDataJson.length; i++) {
        let itemHTML = "";
        itemHTML += '<tr> <td>'+ resultDataJson[i]["id"] + '</td>'
            + '<td>' + resultDataJson[i]["model"] + '</td>'
            + '<td>' + resultDataJson[i]["memory"] + '</td>'
            + '<td>' + resultDataJson[i]["color"] + '</td>'
            + '<td>' + resultDataJson[i]["price"] + '</td>'
            + '<td>' + resultDataJson[i]["qty"] + '</td>'
            + '</tr>';
        item_list.append(itemHTML);
        sub_total += parseFloat(resultDataJson[i]["price"]) * parseInt(resultDataJson[i]["qty"]);
    }
    let total = (sub_total == 0)? 0 : (sub_total + 5.95);
    let ship = (sub_total == 0)? 0 : 5.95;
    let price = '<tr><td></td><td></td><td></td><td></td><td><b id="sub_total" value="'+sub_total+'">Sub Total: $'+sub_total+'.00</b></td></tr>'
        + '<tr><td></td><td></td><td></td><td></td><td><b id="tax" value="0">Tax (0.0%): $0.00</b></td></tr>'
        + '<tr><td></td><td></td><td></td><td></td><td><b id="ship_price" value="'+ship+'">Delivery fee: $'+ship+'</b></td></tr>'
        +  '<tr><td></td><td></td><td></td><td></td><td><b id="total_price" value="'+total+'">Order Total : $'+total+'</b></td></tr>';

    item_list.append(price);

    document.getElementById("choice1").checked = true;
}


jQuery.ajax({
    dataType: "json",
    method: "GET",
    url: "api/cart" ,
    success: (resultData) => handleSessionData(resultData)
});

function getTax (zip)
{
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function ()
    { // 4 means finished, and 200 means okay.
        if (xhr.readyState == 4 && xhr.status == 200)
        { // Data should look like "Fairfax, Virginia"
            let result = xhr.responseText;
            $("#tax").attr("value", result);
            price_update();
        }
    }
    xhr.open ("POST", "tax", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send ("zip="+zip);

    getPlace(zip);
}

function getPlace(zip)
{
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function ()
    { // 4 means finished, and 200 means okay.
        if (xhr.readyState == 4 && xhr.status == 200)
        { // Data should look like "Fairfax, Virginia"
            var result = xhr.responseText;
            var place = result.split(", ");
            document.getElementById("city").value = place[0];
            document.getElementById("state").value = place[1];
        }
    }
    xhr.open ("POST", "getCityState", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send ("zip="+zip);
}

function price_update() {
    let ship = 0;
    let subtotal = parseInt($("#sub_total").attr("value"));
    let tax = parseFloat($("#tax").attr("value"));
    if(subtotal > 0) {
        if (document.getElementById("choice1").checked) {
            ship = 5.95;
        } else if (document.getElementById("choice2").checked) {
            ship = 10.95;
        } else if (document.getElementById("choice3").checked) {
            ship = 16.95;
        } else if (document.getElementById("choice4").checked) {
            ship = 6.95;
        }
    }
    $("#ship_price").text("Delivery fee: $"+ship);
    $("#ship_price").attr("value", ship);

    console.log(subtotal);
    let tax_price = tax*subtotal;
    let total = subtotal + ship + tax_price;
    $("#tax").text("tax ("+(tax*100)+"%): $"+tax_price);
    $("#total_price").text("Order Total: $"+total.toFixed(2));
    $("#total_price").attr("value", total.toFixed(2));
}



let checkout_form = $("#checkout_form");
//print confirmation page
function handleCheckoutResult(resultDataJson) {
    document.title = "Confirmation page";
    document.body.innerHTML = resultDataJson;
}

function checkEXP(input) {
    if (/^[0|1][0-9][/][0-9]{2}$/.test(input) )
    {
        let month = input.substring(0,2);
        if(parseInt(month) > 12) {
            return false; }

        let year = input.substring(3,5);
        let today = new Date();
        let current_month = today.getMonth() + 1;
        if (current_month < 10) {current_month = "0" + current_month;}
        let current_year = today.getFullYear() %100;

        return ( year > current_year || (year == current_year && month >= current_month));
    }
    else
        return false; }

function submitCheckoutForm(formSubmitEvent) {
    console.log("submit checkout form");

    formSubmitEvent.preventDefault();
    if(parseInt($("#sub_total").attr("value")) == 0)
        $("#error_message").text("Your cart is currently empty");
    else if(!checkEXP(document.getElementById('exp').value.trim()))
        $("#error_message").text("your card is expired");
    else {
        $.ajax(
            "api/checkout", {
                method: "POST",
                // Serialize the check out form to the data sent by POST request
                data: checkout_form.serialize(),
                success: handleCheckoutResult
            }
        );
    }
}

checkout_form.submit(submitCheckoutForm);
