import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.*;
import java.sql.*;

@WebServlet(name = "RateServlet", urlPatterns = "/api/rate")
public class RateServlet extends HttpServlet {
    private DataSource dataSource;

    public void init(ServletConfig config) {
        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/phonedb");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        com.google.gson.JsonObject jObj = new com.google.gson.Gson().fromJson(getBody(req), com.google.gson.JsonObject.class);

        System.out.println(jObj.get("newRating"));
        System.out.println(jObj.get("newNumReview"));
        System.out.println(jObj.get("phoneId"));

        try (Connection conn = dataSource.getConnection()){


            String phoneId = String.valueOf(jObj.get("phoneId"));
            String sql = "update ratings set rating = ?, numVotes=? where phoneId = "+ phoneId + "";
            PreparedStatement preparedStmt = conn.prepareStatement(sql);
            System.out.println(String.valueOf(jObj.get("phoneId")));

            // preparedStmt.setString   (3, "p6");
            preparedStmt.setFloat   (1, Float.valueOf(String.valueOf(jObj.get("newRating"))));
            preparedStmt.setInt   (2, Integer.valueOf(String.valueOf(jObj.get("newNumReview"))));

            preparedStmt.executeUpdate();

            preparedStmt.close();
            conn.close();

            com.google.gson.JsonObject jsonObject = new com.google.gson.JsonObject();
            jsonObject.addProperty("status", "Success");
            // write JSON string to output
            out.write(jsonObject.toString());
            // set response status to 200 (OK)
            resp.setStatus(200);

        } catch (Exception e) {
            e.printStackTrace();
            // write error message JSON object to output
            com.google.gson.JsonObject jsonObject = new com.google.gson.JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());

            // set response status to 500 (Internal Server Error)
            resp.setStatus(500);
        }finally {
            out.close();
        }
    }

    public static String getBody(HttpServletRequest request)  {

        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;

        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            // throw ex;
            return "";
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {

                }
            }
        }

        body = stringBuilder.toString();
        return body;
    }
}

