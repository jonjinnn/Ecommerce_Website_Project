<%@ page import="java.sql.*" contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.text.DecimalFormat" %>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="home_style.css">
    <title style="text-align: center;">View ordered</title>
</head>

<body>
<!--top logo bar-->
<div id="logo-bar">
    <div id="title">G11 eCommerce</div>
</div>

<!--    top navigation bar-->
<div class="top_nav">
    <a href="index.jsp">Products</a>
    <a href="team.html">Team</a>
    <a href="about.html">About</a>
    <a style="float: right" class="active" href="view_ordered.jsp">View ordered</a>
    <a style="float: right" href="cart.html">Checkout</a>
</div>

<%
    // setup the connection and execute the query
    Class.forName("com.mysql.jdbc.Driver").newInstance();
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/phonedb?useSSL=false&allowPublicKeyRetrieval=true",
            "root", "Wz112585");
    Statement select = connection.createStatement();
    String email = request.getParameter("email");
    String sql = "select t3.*, t4.rating, t4.numVotes from (" +
            "                    (select t1.qty,t1.customerEmail, t1.phoneId, t1.saleDate, t2.model, t2.category," +
            "                    t2.price, t2.image_url from" +
            "                    sales t1 join phones t2" +
            "                    on t1.phoneId = t2.Id) t3" +
            "            join ratings t4" +
            "            on t3.phoneId = t4.phoneId) where customerEmail = '"+ email +"' order by saleDate desc limit 5;";
    ResultSet rs = select.executeQuery(sql);
%>

<form action="" method="GET" id="email_form">
    <br>
    <label for="email">Email</label>
    <input required type="email" name="email" id="email" placeholder="Enter your email">
    <input type="submit" value="Show order">
</form>
<div id="error_message" style="text-align: center; color: red"></div>

<div id = "table_head" style="margin-left: 5%; margin-right: 5%">

        <tbody>
        <h1 style="text-align: center;">The last 5 products ordered</h1>
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
        <% while(rs.next()) {
        String phone_id = rs.getString("phoneId");
        String phone_model = rs.getString("model");
        String phone_category = rs.getString("category");
        String phone_price = rs.getString("price");
        String phone_url = rs.getString("image_url");
        Float ratings_star = rs.getFloat("rating");
        String ratings_review = rs.getString("numVotes");
        String saleDate = rs.getString("saleDate");
        String saleQty = rs.getString("qty");
        String customer_email = rs.getString("customerEmail");
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);
        String rating = df.format(ratings_star);
    %>
        <tr>
            <td><%=phone_model%></td>
            <td><%=phone_category%></td>
            <td><%=phone_price%></td>
            <td><%=saleDate%></td>
            <td><%=rating%></td>
            <td><%=ratings_review%></td>
            <td>
                <div class="modal-review__rating-order-wrap">
                    <span data-rating-value="1" onclick='rateProduct(1, "<%=phone_id%>", <%=rating%>, <%=ratings_review%>)'></span>
                    <span data-rating-value="2" onclick='rateProduct(2, "<%=phone_id%>", <%=rating%>, <%=ratings_review%>)'></span>
                    <span data-rating-value="3" onclick='rateProduct(3, "<%=phone_id%>", <%=rating%>, <%=ratings_review%>)'></span>
                    <span data-rating-value="4" onclick='rateProduct(4, "<%=phone_id%>", <%=rating%>, <%=ratings_review%>)'></span>
                    <span data-rating-value="5" onclick='rateProduct(5, "<%=phone_id%>", <%=rating%>, <%=ratings_review%>)'></span>
                </div>
            </td>
        </tr>

       <%} %>
    </tbody>
    </table>
</div>

<script>
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
            success: function (data) {
                console.log(data);
            },
            error: function (errMsg) {
                console.log(errMsg);
            }
        });
    }
</script>

<!-- Load jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>

<script>
    $('.modal-review__rating-order-wrap > span').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $(this).parent().attr('data-rating-value', $(this).data('rating-value'));
    });
</script>

</body>
</html>
