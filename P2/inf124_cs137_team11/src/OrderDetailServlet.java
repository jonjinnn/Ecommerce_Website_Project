import com.google.gson.JsonObject;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

@WebServlet(name = "OrderDetailServlet", urlPatterns = "/orderdetail")

public class OrderDetailServlet extends HttpServlet {
    private DataSource dataSource;
    public void init(ServletConfig config) {

        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/phonedb");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("text/html"); // Response type
        HttpSession session = request.getSession(true);

        PrintWriter out = response.getWriter();

        out.println("<div id=\"logo-bar\">\n" +
                "    <div id=\"title\">G11 eCommerce</div>\n" +
                "</div>\n" +
                "\n" +
                "<!--    top navigation bar-->\n" +
                "<div class=\"top_nav\">\n" +
                "    <a href=\"index.html\">Products</a>\n" +
                "    <a href=\"team.html\">Team</a>\n" +
                "    <a href=\"about.html\">About</a>\n" +
                "    <a href=\"view_ordered.html\">View ordered</a>\n" +
                "</div>");
        out.println("<h2> Thank you for your order </h2><>br>");
        out.println("<h4> Items Order </h4> <br>");
        out.println(" <table id=cart_table >\n" +
                "        <!-- Create a table header -->\n" +
                "        <thead>\n" +
                "        <tr style=\"background-color:#abcfe094;\">\n" +
                "            <!-- Titles of each column-->\n" +
                "            <th>SaleId</th>\n" +
                "            <th>Model</th>\n" +
                "            <th>Memory</th>\n" +
                "            <th>Color</th>\n" +
                "            <th>Unit Price</th>\n" +
                "            <th>Qty</th>\n" +
                "        </tr>\n" +
                "        </thead>\n" +
                "        <tbody id=item_list_body>\n");

        // Get a connection from dataSource and let resource manager close the connection after usage.
        try (Connection conn = dataSource.getConnection()) {
            String email = request.getParameter("email");
            Timestamp timestamp = new Timestamp(new Date().getTime());
            ArrayList<String> items = (ArrayList<String>) session.getAttribute("items");

            for(int i =0; i< items.size(); i++){
                Statement statement = conn.createStatement();
                String sql = "Select s.id as saleId, s.qty as qty, phones.* " +
                        "FROM (SELECT * FROM sales where customerEmail = '" + email +"' " +
                        "AND saleDate = '" + timestamp.toString().substring(0,10) + "') as s " +
                        "JOIN phones ON phones.id = '" + items.get(i) + "'";
                System.out.println(sql);
                ResultSet rs = statement.executeQuery(sql);
                if(rs.next()){
                    out.println("<tr> <td>"+ rs.getString("saleId") + "</td>"
                            + "<td>" + rs.getString("model") + "</td>"
                            + "<td>" + rs.getString("memory") + "</td>"
                            + "<td>" + rs.getString("color") + "</td>"
                            + "<td>" + rs.getString("price") + "</td>"
                            + "<td>" + rs.getString("qty") + "</td>"
                            + "</tr>");
                }
                rs.close();
                statement.close();
            }
            out.println(" </tbody>\n" +
                    "    </table>");

            Statement stmt = conn.createStatement();
            String query = "select * from customers where email = '" + email  +"'";
            ResultSet rS = stmt.executeQuery(query);
            if(rS.next()){
                out.println("<div>Deliver To: " + rS.getString("firstname") +" " + rS.getString("lastname") +"<br>"
                        + "Email: " + rS.getString("email") + "<br>"
                        + "Phone: " + rS.getString("phone") + "<br>"
                        + "Address: "+rS.getString("address") + "</div>");
            }
            //empty session
            items = new ArrayList<>();
            ArrayList<Integer> quantity = new ArrayList<>();
            session.setAttribute("items", items);
            session.setAttribute("qty", quantity);

            response.setStatus(200);
        } catch (Exception e) {
            // write error message JSON object to output
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());

            // set response status to 500 (Internal Server Error)
            response.setStatus(500);
        } finally {
            out.close();
        }
        // always remember to close db connection after usage. Here it's done by try-with-resources
    }
}
