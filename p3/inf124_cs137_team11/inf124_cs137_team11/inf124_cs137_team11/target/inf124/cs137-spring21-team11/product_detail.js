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

let add_form = $("#add_form");
function handleAddResult(resultDataJson) {
    if (resultDataJson["status"] === "success") {
        $("#error_message").text(resultDataJson["message"]);
    } else {
        console.log("show error message");
        console.log(resultDataJson["message"]);
        $("#error_message").text(resultDataJson["message"]);
    }
}

function submitAddForm(formSubmitEvent) {
    console.log("submit checkout form");

    formSubmitEvent.preventDefault();
    let id = getParameterByName("p_id");
    let qty = parseInt(document.getElementById("qty_" + id).value);
    let query = '?qty='+qty+"&p_id="+id;

    jQuery.ajax({
        dataType: "json", // Setting return data type
        method: "GET", // Setting request method
        url: "api/items" + query,
        success: handleAddResult // Setting callback function to handle data returned successfully by the SinglePhoneServlet
    });

}

add_form.submit(submitAddForm);
