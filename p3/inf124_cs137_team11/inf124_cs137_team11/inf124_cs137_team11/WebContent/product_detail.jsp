<%@ page import="java.sql.*" contentType="text/html;charset=UTF-8" language="java" %>
<%
    Class.forName("com.mysql.jdbc.Driver").newInstance();
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/phonedb?useSSL=false&allowPublicKeyRetrieval=true",
            "root", "Wz112585");
    String id = request.getParameter("p_id");
    String query = "SELECT * FROM phones WHERE id = ?";
    PreparedStatement statement = connection.prepareStatement(query);
    statement.setString(1, id);
    ResultSet rs = statement.executeQuery();
    System.out.println(id);
%>

<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="product_detail.css" />
    <script src="https://code.jQuery.com/jQuery-3.6.0.min.js"></script>

    <title>detailed Desciption page</title>
</head>

<body>
<!--top logo bar-->
<div id="logo-bar">
    <div id="title">G11 eCommerce</div>
</div>

<!--top navigation bar-->
<div class="top_nav">
    <a class="active" href="index.jsp">Products</a>
    <a href="team.html">Team</a>
    <a href="about.html">About</a>
    <a style="float: right" href="view_ordered.jsp">View ordered</a>
    <a style="float: right" href="cart.html">Checkout</a>
</div>

<!-- Display phone image -->
<div class="column_left">
    <div class="container_display">
        <!--Item title info-->
        <h1 id="product_title"></h1>

        <!--image slideshow   jQuery("#photo_1").attr("src", "images/pid_" +id.substring(1) +"/1.png");-->
        <br>
        <div class="slider_container" id = "slider_photos">
            <img class="slider_pic" id="photo_1" src= "<%="images/pid_" + id.substring(1) + "/1.png"%>"/>
            <img class="slider_pic" id="photo_2" src= "<%="images/pid_" + id.substring(1) + "/2.png"%>"/>
            <img class="slider_pic" id="photo_3" src= "<%="images/pid_" + id.substring(1) + "/3.png"%>"/>

            <a class="left_arrow" onclick="plusDivs(-1)">&#10094;</a>
            <a class="right_arrow" onclick="plusDivs(1)">&#10095;</a>
        </div>
        <br><br>
        <% if(rs.next()) {%>
        <!--detailed description-->
        <h2 id="product_desc"> <%=rs.getString("description")%></h2> <br>
    </div>
</div>

<!-- Display form-control for add to cart -->
<br>
<div class="column_right">
    <div class="container_display">
        <div class="container_cart">
            <div class="form-control">
                <p id="product_memory">Memory: <%=rs.getString("memory")%></p>
                <p id="product_color">Color: <%=rs.getString("color")%></p>
                <p id="product_id">Id: <%=id%></p>
                <p id="product_price">Price: <%=rs.getString("price")%></p>
            </div>
            <% } %>
            <div id="error_message" style="text-align: left; color: #ff0000"></div>

            <div>
                <form ACTION="#" id="add_form" METHOD="GET">
                    <input type="number" name="quantity" id= "<%="qty_" +id%>" min="0" max="99" value= "0"/>
                    <input type="submit" value="Add to cart" id= "<%="btn_" + id%>" />
                </form>
            </div>
        </div>
    </div>
</div>
<% rs.close();
    statement.close();%>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="product_detail.js"></script>
<script type="text/javascript">
    var index = 1;
    var shipping_method = "choice1"
    showDivs(index);

    function plusDivs(n) {
        showDivs(index += n);
    }
    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("slider_pic");
        if (n > x.length) {index = 1}
        if (n < 1) {index = x.length}
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[index-1].style.display = "block";
    }
</script>
</body>
</html>

