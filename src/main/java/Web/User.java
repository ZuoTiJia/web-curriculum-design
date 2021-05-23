package Web;


import org.springframework.data.annotation.Id;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

enum UserType {
    Admin, Business, Customer;
}


public class User {
    private long phone;
    private String passWord;
    private String name;
    private UserType userType;
    private String address;
    public User(){}
    public static class UserLogger {
        private long phone;
        private String passWord;

        public long getPhone() {
            return phone;
        }

        public String getPassWord() {
            return passWord;
        }
    }


    public String getAddress() {
        return address;
    }

    public long getPhone() {
        return phone;
    }

    public UserType getUserType() {
        return userType;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    boolean checkPassWord(String passWord) {
        return passWord.equals(this.passWord);
    }


    public static class UserRowMapper implements RowMapper<User> {
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User res =  new User();
            res.phone = rs.getLong("phone");
            res.passWord    = rs.getString("pass_word");
            res.name    = rs.getString("name");
            res.userType = UserType.valueOf(rs.getString("user_type"));
            res.address = rs.getString("user_address");
            return res;
        }
    }
}
