<%@ page import="java.sql.*" contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="home_style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <title>Project 3 - JSP</title>
</head>

<body>
<!--top logo bar-->
<div id="logo-bar">
    <div id="title">G11 eCommerce</div>
</div>

<!--    top navigation bar-->
<div class="top_nav">
    <a class="active" href="index.jsp">Products</a>
    <a href="team.html">Team</a>
    <a href="about.html">About</a>
    <a style="float: right" href="view_ordered.jsp">View ordered</a>
    <a style="float: right" href="cart.html">Checkout</a>
</div>

<%
    // setup the connection and execute the query
    Class.forName("com.mysql.jdbc.Driver").newInstance();
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/phonedb?useSSL=false&allowPublicKeyRetrieval=true",
            "root", "Wz112585");
    Statement select = connection.createStatement();
    ResultSet rs = select.executeQuery("SELECT * FROM phones join ratings on phones.id = ratings.phoneId");
%>

<!--row column format-->
<div id="phone_table_body" style="margin-left: 10%">

    <% while(rs.next()) {
        String phone_id = rs.getString("id");
        String phone_model = rs.getString("model");
        String phone_price = rs.getString("price");
        Float ratings_star = rs.getFloat("rating");
        String ratings_review = rs.getString("numVotes");
        String phone_url = rs.getString("image_url");
    %>

    <div class="column">
        <a href="product_detail.jsp?p_id=<%= phone_id%>"><img src="<%= phone_url%>"></a>
        <h1><%= phone_model%></h1>
        <h3><%= phone_price%></h3>
        <%
            String ratingStarHtml = "";
            int rating = (int)Math.ceil(ratings_star);
        for(int j=0; j < 5; j ++) {
            if(j<rating)
                ratingStarHtml += "<span style='font-size: 20px' class='fa fa-star checked'></span>";
            else
                ratingStarHtml += "<span style='font-size: 20px' class='fa fa-star'></span>";
        }%>
        <h3><%= ratingStarHtml%></h3>
        <h3 style="font-size: 18px; color: gray"><%= ratings_review%> reviews</h3>
    </div>

   <% } %>
</div>

<!-- Load jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

</body>
</html>