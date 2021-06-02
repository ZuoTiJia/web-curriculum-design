package Web;

import org.springframework.boot.SpringApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


@Repository
public class DataBase {
    private final JdbcTemplate jdbcTemplate;
    static private DataBase dataBase = new DataBase();

    public DataBaseUser user;
    public DataBaseGoods goods;
    public DataBaseRecord record;
    public DataBaseOrderForm orderForm;

    public DataBase() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("java.sql.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/web");
        dataSource.setUsername("root");
        dataSource.setPassword("asd123");
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        user = new DataBaseUser();
        goods = new DataBaseGoods();
    }

    public static DataBaseUser User() {
        return dataBase.user;
    }
    public static DataBaseGoods Goods() {
        return dataBase.goods;
    }
    public static DataBaseOrderForm OrderForm() {
        return dataBase.orderForm;
    }
    public static DataBaseRecord Record() {
        return dataBase.record;
    }


    public class DataBaseUser {
        public User findOneUser(long phoneNumber) {
            String sql = "SELECT * FROM users WHERE phone=?";
            return jdbcTemplate.queryForObject(sql, new User.UserRowMapper(), phoneNumber);
        }

        public void insertUser(User user) {
            String sql = "INSERT INTO users (phone, pass_word, name, user_type, user_address) VALUES (?,?,?,?,?)";
            jdbcTemplate.update(sql, user.getPhone(),
                    user.getPassWord(),
                    user.getName(),
                    user.getUserType().toString(),
                    user.getAddress());
        }
    }
    public class DataBaseGoods {
        public Goods findOneGoods(long goodsId) {

            String sql = "SELECT * FROM goods WHERE id=?";
            return jdbcTemplate.queryForObject(sql, new Goods.GoodsRowMapper(), goodsId);

        }

        public void insertGoods(Goods goods) {
            String sql = "INSERT INTO goods (name, price, business_phone, remnant_inventory, " +
                    "goods_type, `state`, photo_path, `describe`, cumulative_sales) VALUES (?,?,?,?,?,?,?,?,?)";
            jdbcTemplate.update(sql, goods.getName(),
                    goods.getPrice(),
                    goods.getBusinessPhone(),
                    goods.getRemnantInventory(),
                    goods.getGoodsType().toString(),
                    goods.getStatus().toString(),
                    goods.getPhotoName(),
                    goods.getDescribe(),
                    goods.getCumulativeSales());
        }

        public void deleteGoods(long goodsId) {
            String sql = "UPDATE goods SET `state`=\"offShelves\", remnant_inventory=0 " +
                    "where goods_id=?";
            jdbcTemplate.update(sql, goodsId);
        }


        public void updateGoods(long oldGoodsId, Goods newGoods) {
            deleteGoods(oldGoodsId);
            insertGoods(newGoods);
        }

        public List<Goods> findAllGoods() {
            String sql = "SELECT * FROM goods";
            return jdbcTemplate.query(sql, new Goods.GoodsRowMapper()) ;
        }

    }
    public class DataBaseRecord {
        public Iterable<Record> findRecords(long id) {
            String sql = "SELECT * FROM records WHERE id=?";
            return jdbcTemplate.query(sql, new Record.RecordRowMapper(), id);
        }

        public void insertRecord(Record record) {
            String sql = "INSERT INTO records (order_form_id, goods_id, number, record_type, time) VALUES(?,?,?,?,?)";
            jdbcTemplate.update(sql, record.getOrderFormId(),
                    record.getGoodsId(),
                    record.getNumber(),
                    record.getRecordType().toString(),
                    new java.sql.Timestamp(record.getTime().getTime()));
        }

    }

    public class DataBaseOrderForm {

        public OrderForm findOneOrderForm(int id) {
            String sql = "SELECT * FROM order_forms WHERE id=?";
            return jdbcTemplate.queryForObject(sql, new OrderForm.OrderFormRowMapper(), id);
        }

        public void insertOrderForm(OrderForm orderForm) {
            String sql = "INSERT INTO order_forms (custom_id, address, time, total_price) " +
                    "VALUES (?,?,?,?)";
            jdbcTemplate.update(sql, orderForm.getCustomPhone(),
                    orderForm.getAddress(),
                    new java.sql.Timestamp(orderForm.getTime().getTime()),
                    orderForm.getTotalPrice());
        }

        public Iterable<OrderForm> findOrderForms(long customPhone) {
            String sql = "SELECT * FROM order_forms WHERE custom_phone=?";
            return jdbcTemplate.query(sql, new OrderForm.OrderFormRowMapper(), customPhone);
        }

    }
}