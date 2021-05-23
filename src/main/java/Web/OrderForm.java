package Web;

import org.springframework.data.annotation.Id;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

public class OrderForm {

    private long id;
    private long customPhone;
    private String address;
    private java.util.Date time;
    private double totalPrice;

    private List<Record> recordList;

    public long getId() {
        return id;
    }

    public long getCustomPhone() {
        return customPhone;
    }

    public String getAddress() {
        return address;
    }

    public Date getTime() {
        return time;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public OrderForm(){}
    public static class OrderFormRowMapper implements RowMapper<OrderForm> {

        @Override
        public OrderForm mapRow(ResultSet rs, int rowNum) throws SQLException {
            OrderForm res = new OrderForm();
            res.id = rs.getLong("id");
            res.customPhone = rs.getLong("custom_phone");
            res.address = rs.getString("address");
            res.time = rs.getTimestamp("time");
            res.totalPrice = rs.getDouble("total_price");
            return res;
        }
    }

}
