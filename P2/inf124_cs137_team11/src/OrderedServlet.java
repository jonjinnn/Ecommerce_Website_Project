import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet(name = "OrderedServlet", urlPatterns = "/api/ordered")
public class OrderedServlet extends HttpServlet  {
    private static final long serialVersionUID = 2L;
    private DataSource dataSource;

    public void init(ServletConfig config) {
        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/phonedb");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try (Connection conn = dataSource.getConnection()) {
            String email = request.getParameter("email");
            Statement statement = conn.createStatement();
            String sql = "select t3.*, t4.rating, t4.numVotes from (" +
                    "                    (select t1.qty,t1.customerEmail, t1.phoneId, t1.saleDate, t2.model, t2.category," +
                    "                    t2.price, t2.image_url from" +
                    "                    sales t1 join phones t2" +
                    "                    on t1.phoneId = t2.Id) t3" +
                    "            join ratings t4" +
                    "            on t3.phoneId = t4.phoneId) where customerEmail = '"+ email +"' order by saleDate desc limit 5;";


            ResultSet rs = statement.executeQuery(sql);

            JsonArray jsonArray = new JsonArray();

            while(rs.next()) {
                String phone_id = rs.getString("phoneId");
                String phone_model = rs.getString("model");
                String phone_category = rs.getString("category");
                String phone_price = rs.getString("price");
                String phone_url = rs.getString("image_url");
                String ratings_star = rs.getString("rating");
                String ratings_review = rs.getString("numVotes");
                String saleDate = rs.getString("saleDate");
                String saleQty = rs.getString("qty");
                String customer_email = rs.getString("customerEmail");

                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("phone_id", phone_id);
                jsonObject.addProperty("phone_model", phone_model);
                jsonObject.addProperty("phone_category", phone_category);
                jsonObject.addProperty("phone_price", phone_price);
                jsonObject.addProperty("ratings_star", ratings_star);
                jsonObject.addProperty("ratings_review", ratings_review);
                jsonObject.addProperty("phone_url", phone_url);
                jsonObject.addProperty("sale_date", saleDate);

                jsonArray.add(jsonObject);

            }
            rs.close();
            statement.close();

            // write JSON string to output
            out.write(jsonArray.toString());
            // set response status to 200 (OK)
            response.setStatus(200);
        } catch (Exception e) {
            e.printStackTrace();
            // write error message JSON object to output
            com.google.gson.JsonObject jsonObject = new com.google.gson.JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());

            // set response status to 500 (Internal Server Error)
            response.setStatus(500);
        }finally {
            out.close();
        }
    }
}
