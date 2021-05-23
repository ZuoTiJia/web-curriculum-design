package Web;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class Login {
    final static String key = "Hello World";

    public static boolean checkToken(String md5, long phone) {
        String str = String.valueOf(phone) + key;
        MessageDigest md;
        BigInteger bigInteger = null;
        try {

            md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes(StandardCharsets.UTF_8));
            bigInteger = new BigInteger(md.digest());

        } catch (Exception e) {

            e.printStackTrace();
        }
        return bigInteger.toString().equals(md5);
    }
    public static long getCookiePhone(Cookie[] cookies) {
        if(cookies != null) {
            for(Cookie cookie: cookies) {
                if(cookie.getName().equals("phone")) {
                    return Long.parseLong(cookie.getValue());
                }
            }
        }
        return 0;
    }
    public static String getCookieToken(Cookie[] cookies) {
        if(cookies != null) {
            for(Cookie cookie: cookies) {
                if(cookie.getName().equals("token")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
    public static boolean checkLogin(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies == null) {
            return false;
        }
        long phone = 0;
        String token = null;
        if(cookies != null) {
            for(Cookie cookie: cookies) {
                if(cookie.getName().equals("phone")) {
                    phone = Long.parseLong(cookie.getValue());
                }
                if(cookie.getName().equals("token")) {
                    token = cookie.getValue();
                }
            }
        }
        if(phone == 0 || token == null)
            return false;
        return checkToken(token, phone);
    }

    public static String generateToken(long phone) {
        String str = String.valueOf(phone) + key;
        MessageDigest md;
        BigInteger bigInteger = null;
        try {

            md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            bigInteger = new BigInteger(md.digest());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return bigInteger.toString();
    }
}
