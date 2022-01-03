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
import java.sql.*;
import javax.servlet.RequestDispatcher;
import java.util.ArrayList;
import java.util.Date;

@WebServlet(name = "CheckoutServlet", urlPatterns = "/api/checkout")
public class CheckoutServlet extends HttpServlet {
    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    private DataSource dataSource;
    public void init(ServletConfig config) {

        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/phonedb");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json"); // Response mime type

        // Output stream to STDOUT
        PrintWriter out = response.getWriter();

        try (Connection conn = dataSource.getConnection()) {
            HttpSession session = request.getSession();
            ArrayList<String> items = (ArrayList<String>) session.getAttribute("items");
            ArrayList<Integer> quantity = (ArrayList<Integer>) session.getAttribute("qty");


            //personal information
            String lastname = request.getParameter("lastname");
            String firstname = request.getParameter("firstname");
            String email = request.getParameter("email");
            String phone = request.getParameter("phone");
            String address = request.getParameter("address") + " " + request.getParameter("apt")
                    + ", " + request.getParameter("city") + ", "
                    + request.getParameter("state") + " " + request.getParameter("zip");

            //credit card
            String name = request.getParameter("name");
            String exp = "20" + request.getParameter("exp").substring(3, 5) + "/"
                    + request.getParameter("exp").substring(0, 2) +
                    "/" + request.getParameter("exp").substring(0, 2);
            String cardId = request.getParameter("num");


            String customer = "INSERT INTO customers (firstname,lastname,ccId,address,email,phone) VALUES ('"
                    + firstname + "','" + lastname + "','" + cardId + "','" + address + "','" + email + "','" + phone + "')";
            String card = "INSERT IGNORE INTO creditcards (id,name,expiration) VALUES ('"
                    + cardId + "','" + name + "','" + exp + "')";
            System.out.println(customer);
            System.out.println(card);
            Statement statement = conn.createStatement();
            statement.executeUpdate(card);
            statement.executeUpdate(customer);

            Timestamp timestamp = new Timestamp(new Date().getTime());

            for (int i = 0; i < items.size(); i++) {
                String insertSale = "INSERT INTO sales (customerEmail,phoneId,qty,saleDate) VALUES ('" + email + "','"
                        + items.get(i) + "','" + quantity.get(i) + "','" + timestamp + "')";
                statement.executeUpdate(insertSale);
            }

            /// get sales ID
            statement.close();

            //forward to OrderDetailServlet
            RequestDispatcher dispatcher = request.getRequestDispatcher("/orderdetail");
            dispatcher.forward(request, response);

        }
        catch (Exception e) {
            System.out.println(e);
            // write error message JSON object to output
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());

            // set response status to 500 (Internal Server Error)
            response.setStatus(500);
        } finally {
            out.close();
        }

    }
}
