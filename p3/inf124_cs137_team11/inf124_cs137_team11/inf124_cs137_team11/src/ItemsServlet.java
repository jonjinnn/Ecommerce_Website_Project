import com.google.gson.JsonObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;


// Declaring a WebServlet called ItemServlet, which maps to url "/items"
@WebServlet(name = "ItemServlet", urlPatterns = "/api/items")

public class ItemsServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json"); // Response mime type
        HttpSession session = request.getSession(true);

        PrintWriter out = response.getWriter();
        // Get a connection from dataSource and let resource manager close the connection after usage.
        try  {
            ArrayList<String> items = (ArrayList<String>) session.getAttribute("items");
            ArrayList<Integer> quantity = (ArrayList<Integer>) session.getAttribute("qty");

            String qty = request.getParameter("qty");
            String id = request.getParameter("p_id");
            System.out.println(id + " " + qty);

            JsonObject responseJsonObject = new JsonObject();
            if (!qty.equals("0")) {
                responseJsonObject.addProperty("status", "success");
                responseJsonObject.addProperty("message",  qty + " item(s) added");

                if (items == null) {
                    items = new ArrayList<String>();
                    quantity = new ArrayList<Integer>();
                }

                Boolean isFound = false;

                for (int i = 0; i < items.size(); i++) {
                    if (items.get(i).equals(id)) {
                        quantity.set(i, quantity.get(i) + Integer.parseInt(qty));
                        isFound = true;
                        break;
                    }
                }
                if(!isFound) {
                    synchronized (items) {
                        items.add(id);
                        quantity.add(Integer.parseInt(qty));
                    }
                }
                System.out.println(items.size() + " " + quantity.size());
                session.setAttribute("items", items);
                session.setAttribute("qty", quantity);
            } else {
                responseJsonObject.addProperty("status", "fail");
                responseJsonObject.addProperty("message", "No item added");
            }
            response.getWriter().write(responseJsonObject.toString());

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
