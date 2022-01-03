function getParameterByName(target) {
    // Get request URL
    let url = window.location.href;
    // Encode target parameter name to url encoding
    target = target.replace(/[\[\]]/g, "\\$&");

    // Ues regular expression to find matched parameter value
    let regex = new RegExp("[?&]" + target + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    // Return the decoded parameter value
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function handleDataResult(resultData) {
    let id = resultData[0]["id"];
    jQuery("#photo_1").attr("src", "images/pid_" +id.substring(1) +"/1.png");
    jQuery("#photo_2").attr("src", "images/pid_" +id.substring(1) +"/2.png");
    jQuery("#photo_3").attr("src", "images/pid_" +id.substring(1) +"/3.png");

    jQuery("#product_title").text(resultData[0]['model']);
    jQuery("#product_title").attr("value", id);

    jQuery("#product_desc").text(resultData[0]['description']);
    jQuery("#product_price").text("Full Price: $" + resultData[0]['price']);
    jQuery("#product_id").text("Item ID: " + id);
    jQuery("#product_price").attr("value", resultData[0]['price']);
    jQuery("#item_id").attr("id", id);

    jQuery("#product_memory").text("Memory: " + resultData[0]['memory']);
    jQuery("#product_color").text("Color: " + resultData[0]['color']);

    let add_btn= jQuery("#add_form");
    let btnHTML = '<input type="number" name="quantity" id="qty_' + id + '" min="0" max="99" value= "0"/>'
                + '<input type="button" value="Add to cart" id="btn_' + id + '" >';
    add_btn.append(btnHTML);
    document.getElementById("btn_" + id ).onclick = function() {addItems(id)};
}

function addItems(id) {
    let qty = parseInt(document.getElementById("qty_" + id).value);
    let query = '?qty='+qty+"&p_id="+id;

    jQuery.ajax({
        dataType: "json", // Setting return data type
        method: "GET", // Setting request method
        url: "api/items" + query,
        success: handleAddResult // Setting callback function to handle data returned successfully by the SinglePhoneServlet
    });
}

function handleAddResult(resultDataJson) {
    if (resultDataJson["status"] === "success") {
        $("#error_message").text(resultDataJson["message"]);
    } else {
        console.log("show error message");
        console.log(resultDataJson["message"]);
        $("#error_message").text(resultDataJson["message"]);
    }
}

let pId = getParameterByName('p_id');
jQuery.ajax({
    dataType: "json",  // Setting return data type
    method: "GET",// Setting request method
    url: "api/single-phone?id=" + pId,
    success: (resultData) => handleDataResult(resultData) // Setting callback function to handle data returned successfully by the SinglePhoneServlet
});