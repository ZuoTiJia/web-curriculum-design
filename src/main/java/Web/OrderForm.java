package Web;

import org.springframework.data.annotation.Id;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

public class OrderForm {
    public static class Order {
        public static class GoodsNumber {
            private int goodsId;
            private int number;

            public int getGoodsId() {
                return goodsId;
            }

            public int getNumber() {
                return number;
            }
        }
        private long customPhone;
        private GoodsNumber[] goodsNumbers;
        private double totalPrice;

        public long getCustomPhone() {
            return customPhone;
        }

        public GoodsNumber[] getGoodsNumbers() {
            return goodsNumbers;
        }

        public double getTotalPrice() {
            return totalPrice;
        }
    }

    private int id;
    private long customPhone;
    private java.util.Date time;
    private double totalPrice;

    private List<Record> recordList;

    public long getId() {
        return id;
    }

    public long getCustomPhone() {
        return customPhone;
    }

    public Date getTime() {
        return time;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public OrderForm(long customPhone, double totalPrice) {
        this.customPhone = customPhone;
        this.totalPrice = totalPrice;
    }

    public OrderForm() {

    }

    public static class OrderFormRowMapper implements RowMapper<OrderForm> {

        @Override
        public OrderForm mapRow(ResultSet rs, int rowNum) throws SQLException {
            OrderForm res = new OrderForm();
            res.id = rs.getInt("id");
            res.customPhone = rs.getLong("custom_phone");
            res.time = rs.getTimestamp("time");
            res.totalPrice = rs.getDouble("total_price");
            return res;
        }
    }
}
