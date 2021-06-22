package Web;

import org.springframework.boot.SpringApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
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
        orderForm = new DataBaseOrderForm();
        record = new DataBaseRecord();
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
            return jdbcTemplate.query(sql, new Goods.GoodsRowMapper());
        }

        public List<Goods> findAllBooks() {
            String sql = "SELECT * FROM goods WHERE goods_type='Book'";
            return jdbcTemplate.query(sql, new Goods.GoodsRowMapper());
        }
        public List<Goods> findAllFood() {
            String sql = "SELECT * FROM goods WHERE goods_type='Food'";
            return jdbcTemplate.query(sql, new Goods.GoodsRowMapper());
        }

        public List<Goods> findAllElectronics() {
            String sql = "SELECT * FROM goods WHERE goods_type='Electronics'";
            return jdbcTemplate.query(sql, new Goods.GoodsRowMapper());
        }

        public List<Goods> findRandom5Goods() {
            String sql = "SELECT * FROM goods ORDER BY RAND() LIMIT 5";
            return jdbcTemplate.query(sql, new Goods.GoodsRowMapper());
        }
    }
    public class DataBaseRecord {
        public List<Record> findRecords(int id) {
            String sql = "SELECT * FROM records WHERE id=?";
            return jdbcTemplate.query(sql, new Record.RecordRowMapper(), id);
        }

        public void insertRecord(Record record) {
            String sql = "INSERT INTO records (order_form_id, goods_id, `number`, record_type) VALUES(?,?,?,?)";
            jdbcTemplate.update(sql, record.getOrderFormId(),
                    record.getGoodsId(),
                    record.getNumber(),
                    record.getRecordType().toString());
        }
        public List<Record.RecordGoodsDetail> findRecordGoodsDetail(int orderId) {
            String sql = "SELECT records.goods_id AS id, records.number AS number, " +
                    "goods.name AS name, goods.price AS price " +
                    "FROM records LEFT JOIN goods " +
                    "ON records.goods_id = goods.id " +
                    "WHERE records.order_form_id = ?";
            return jdbcTemplate.query(sql, new Record.RecordGoodsDetail.RecordGoodsDetailMapRow(), orderId);

        }

    }

    public class DataBaseOrderForm {

        public OrderForm findOneOrderForm(int id) {
            String sql = "SELECT * FROM order_forms WHERE id=?";
            return jdbcTemplate.queryForObject(sql, new OrderForm.OrderFormRowMapper(), id);
        }

//        public void insertOrderForm(OrderForm orderForm) {
//            String sql = "INSERT INTO order_forms (custom_id,, total_price) " +
//                    "VALUES (?,?,?)";
//            jdbcTemplate.update(sql, orderForm.getCustomPhone(),
//                    new java.sql.Timestamp(orderForm.getTime().getTime()),
//                    orderForm.getTotalPrice());
//        }

        public List<OrderForm> findOrderForms(long customPhone) {
            String sql = "SELECT * FROM order_forms WHERE custom_phone=?";
            return jdbcTemplate.query(sql, new OrderForm.OrderFormRowMapper(), customPhone);
        }



        public int insertAndGetKey(OrderForm orderForm) {
            String sql = "INSERT INTO order_forms (custom_phone, total_price) " +
                    "VALUES (?,?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement ps = con.prepareStatement(sql, new String[] {"id"});

                    ps.setLong(1, orderForm.getCustomPhone());
                    ps.setDouble(2, orderForm.getTotalPrice());

                    return ps;
                }
            }, keyHolder);
            int a = keyHolder.getKey().intValue();
            return a;
        }
    }
}