import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

public class TestTest {
    @Test
    public void demo() {

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("java.sql.Driver");
        dataSource.setUrl("jdbc:mysql://3306/hello");
        dataSource.setUsername("root");
        dataSource.setPassword("asd123");
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.execute("create table temp(id int primary key, name varchar(32))");
    }
}

