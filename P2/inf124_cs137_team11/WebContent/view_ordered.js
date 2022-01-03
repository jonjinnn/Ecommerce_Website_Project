function handlePhoneResult(resultData) {
    console.log("handlePhoneResult: populating movie table from resultData");
    console.log(window.location.search);

    document.cookie = "url="+window.location;
    //change select option value

    function selectElement(id, valueToSelect) {
        let element = document.getElementById(id);
        element.value = valueToSelect; }

    // Populate the star table
    // Find the empty table body by id "star_table_body"
    //let phoneTableBodyElement = jQuery("#view_ordered_table_body");
    let orderedListElement = '';
    if(resultData.length==0)
        $("#error_message").text("No user found");

    let table_head = jQuery("#table_head");
    let orderListElem = `<h1 style="text-align: center;">The last 5 products ordered</h1>
                        <br>
                        <table id=phone_table class="table table-striped" style="margin-left: 10%">
                        <!-- Create a table header -->

                        <thead >
                            <tr style="background-color:#abcfe094;">
                                    <!-- Titles of each column-->
                                    <th>Phone model</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Order Date</th>
                                    <th>Rating</th>
                                    <th>Reviews</th>
                                    <th>Rate</th>
                                </tr>
                               </thead>
    <tbody>  
                                `
    //table_head.html(orderListElem);
    orderedListElement += orderListElem;
    // Iterate through resultData, no more than 10 entries
    for (let i = 0; i < resultData.length; i++){
        let phone = resultData[i];
        let phoneModel = phone.phone_model;
        let phoneCategory = phone.phone_category;
        let phonePrice = phone.phone_price;
        let rating = parseFloat(phone.ratings_star).toFixed(2);
        let review = phone.ratings_review;
        let saleDate = phone.sale_date;
        //let phoneUrl = phone.phone_url;
        let phoneId = phone.phone_id;
        //let orderDate = phone.orderDate;


        let orderedElement = `<tr>
                                <td>${phoneModel}</td>
                                <td>${phoneCategory}</td>
                                <td>${phonePrice}</td>
                                <td>${saleDate}</td>
                                <td>${rating}</td>
                                <td>${review}</td>
                                <td>
                                    <div class="modal-review__rating-order-wrap">
                                          <span data-rating-value="1" onclick='rateProduct(1, "${phoneId}", ${rating}, ${review})'></span>
                                          <span data-rating-value="2" onclick='rateProduct(2, "${phoneId}", ${rating}, ${review})'></span>
                                          <span data-rating-value="3" onclick='rateProduct(3, "${phoneId}", ${rating}, ${review})'></span>
                                          <span data-rating-value="4" onclick='rateProduct(4, "${phoneId}", ${rating}, ${review})'></span>
                                          <span data-rating-value="5" onclick='rateProduct(5, "${phoneId}", ${rating}, ${review})'></span>
                                    </div>
                                </td>
                            </tr>`
        orderedListElement += orderedElement;
    }
    let endBody = `</tbody>
</table>`
    orderedListElement += endBody;

    //let orderedListElementContainer = jQuery("#table_body");
    table_head.html(orderedListElement);
    $('.modal-review__rating-order-wrap > span').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().attr('data-rating-value', $(this).data('rating-value'));
    });
}

function rateProduct(ratingValue, phoneId, oldRating, oldNumReview) {
    let newRating = ((oldRating * oldNumReview) + ratingValue) / (oldNumReview + 1);
    let newNumReview = oldNumReview + 1;
    let rating = {"newRating": newRating, "phoneId": phoneId, "newNumReview": newNumReview};

    $.ajax({
        type: "POST",
        url: "api/rate",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(rating),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){console.log(data);},
        error: function(errMsg) {
            console.log(errMsg);
        }
    });
}

let email_form = $("#email_form");
function submitEmailForm(formSubmitEvent) {
    console.log("submit email form");

    formSubmitEvent.preventDefault();

    $.ajax(
        "api/ordered", {
            method: "GET",
            // Serialize the login form to the data sent by POST request
            data: email_form.serialize(),
            success: handlePhoneResult
        }
    );
}

// Bind the submit action of the form to a handler function
email_form.submit(submitEmailForm);

