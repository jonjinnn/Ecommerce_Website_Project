/**
 * This example is following frontend and backend separation.
 *
 * Before this .js is loaded, the html skeleton is created.
 *
 * This .js performs two steps:
 *      1. Use jQuery to talk to backend API to get the json data.
 *      2. Populate the data to correct html elements.
 */

function handlePhoneResult(resultData) {
    console.log("handlePhoneResult: populating phone table from resultData");
    console.log(window.location.search);

    document.cookie = "url="+window.location;
    //change select option value

    function selectElement(id, valueToSelect) {
        let element = document.getElementById(id);
        element.value = valueToSelect; }

    // Populate the phone table
    // Find the empty table body by id "phone_table_body"
    let phonesElement = '';
    // Iterate through resultData, no more than 10 entries
    for (let i = 0; i < resultData.length; i++){
        let phone = resultData[i];
        let phoneModel = phone.phone_model;
        let phonePrice = phone.phone_price;
        let rating = Math.ceil(phone.ratings_star);
        let review = phone.ratings_review;
        let phoneUrl = phone.phone_url;
        let phoneId = phone.phone_id;
        let rate = "";
        for(let j=0; j < 5; j ++) {
           rate += (j < rating)? ' <span style="font-size: 20px" class="fa fa-star checked"></span>' : '<span style="font-size: 20px" class="fa fa-star"></span>';
        }
        let phoneElement =  `<div class="column">
                                <a href="product_detail.html?p_id=${phoneId}"><img src="${phoneUrl}"></a>
                                <h1>${phoneModel}</h1>
                                <h3>${phonePrice}</h3>
                                <h3 >${rate}</h3>
                                <h3 style="font-size: 18px; color: gray">${review} reviews</h3>
                            </div>`;
        phonesElement += phoneElement;
    }

    let phonesElementContainer = jQuery("#phone_table_body");
    phonesElementContainer.html(phonesElement);
}

jQuery.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/phones", // Setting request url, which is mapped by StarsServlet in phones.java
    success: (resultData) => handlePhoneResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});