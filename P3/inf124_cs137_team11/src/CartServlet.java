import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import javax.sql.DataSource;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * This IndexServlet is declared in the web annotation below,
 * which is mapped to the URL pattern /api/Cart.
 */
@WebServlet(name = "CartServlet", urlPatterns = "/api/cart")
public class CartServlet extends HttpServlet {
    private DataSource dataSource;

    public void init(ServletConfig config) {
        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/phonedb");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }
    /**
     * handles GET requests to store session information
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try (Connection conn = dataSource.getConnection()) {

            ArrayList<String> items = (ArrayList<String>) session.getAttribute("items");
            ArrayList<Integer> quantity = (ArrayList<Integer>) session.getAttribute("qty");

            if (items == null) {
                items = new ArrayList<>();
                quantity = new ArrayList<>();
            }

            JsonArray jsonArray = new JsonArray();
            for(int i = 0; i < items.size();i++) {
                String query = "SELECT price, model, color, memory FROM phones WHERE id = '" + items.get(i) + "'";
                Statement statement = conn.createStatement();
                ResultSet rs = statement.executeQuery(query);
                if(rs.next()){
                    JsonObject jsonObject = new JsonObject();
                    jsonObject.addProperty("id", items.get(i));
                    jsonObject.addProperty("model", rs.getString("model"));
                    jsonObject.addProperty("memory", rs.getString("memory"));
                    jsonObject.addProperty("color", rs.getString("color"));
                    jsonObject.addProperty("price", rs.getString("price"));
                    jsonObject.addProperty("qty", quantity.get(i));
                    jsonArray.add(jsonObject);
                }
                rs.close();
                statement.close();
            }

            response.getWriter().write(jsonArray.toString());
        }
        catch (Exception e){
            e.printStackTrace();
            // write error message JSON object to output
            com.google.gson.JsonObject jsonObject = new com.google.gson.JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());

            // set response status to 500 (Internal Server Error)
            response.setStatus(500);
        } finally {
            out.close();
        }
    }
}
