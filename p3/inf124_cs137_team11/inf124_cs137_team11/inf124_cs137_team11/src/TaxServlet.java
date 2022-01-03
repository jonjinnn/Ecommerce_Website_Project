import java.io.IOException;
import java.io.PrintWriter;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletConfig;
import javax.sql.DataSource;
import java.sql.*;

@WebServlet(urlPatterns = {"/tax"})
public class TaxServlet extends HttpServlet {
    private DataSource dataSource;
    public void init (ServletConfig config)
    {
        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/phonedb");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String zip = request.getParameter("zip");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try (Connection conn = dataSource.getConnection()) {
            String query = "Select * from taxRates where zipCode = ?";
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setString(1,zip);
            ResultSet rs = statement.executeQuery();
            if(rs.next())
                out.write(rs.getString("tax"));
            else
                out.write("0");

            statement.close();
            rs.close();

        }  catch (Exception e){
            e.printStackTrace();
            response.setStatus(500);
        } finally {
            out.close();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }


}
