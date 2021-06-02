package Web;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.RowMapper;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.SQLException;

enum GoodsType {
    //书，食物，服装，日用品，电子产品
    Book, Food, Clothing, Commodity, Electronics;
}
enum GoodsState {
    onSale, offShelves;
}
public class Goods  {
    public static String filePath = "/home/ccx/JetBrain/IDEAProjects/Web/src/main/resources/static/picture/";

    //id 必填
    private  int id;

    //商品名字 必填
    private String name;

    //价格  必填
    private double price;

    //所属商户id 必填
    private long businessPhone;

    //剩余库存 必填
    private int remnantInventory;

    //商品类型
    private GoodsType goodsType;

    private GoodsState state;



    //图片路径
    private String photoName;


    //文字描述
    private String describe;

    //累计销量
    private int cumulativeSales;



    public Goods() {}

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public long getBusinessPhone() {
        return businessPhone;
    }

    public GoodsState getState() {
        return state;
    }

    public GoodsType getGoodsType() {
        return goodsType;
    }

    public String getPhotoName() {
        return photoName;
    }
    public byte[] getPhoto() {
        try {
            String path =  filePath + photoName;
            System.out.println(path);
            InputStream inputStream = getClass().getResourceAsStream(filePath + this.photoName);
            
            return IOUtils.toByteArray(inputStream);

        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }



    public int getRemnantInventory() {
        return remnantInventory;
    }

    public String getDescribe() {
        return describe;
    }

    public int getCumulativeSales() {
        return cumulativeSales;
    }

    public GoodsState getStatus() {
        return state;
    }

    public static class GoodsRowMapper implements RowMapper<Goods> {

        @Override
        public Goods mapRow(ResultSet rs, int rowNum) throws SQLException {
            Goods res= new Goods();
            res.id    = rs.getInt("id");
            res.name  = rs.getString("name");
            res.price = rs.getDouble("price");
            res.businessPhone    = rs.getLong("business_phone");
            res.goodsType  = GoodsType.valueOf(rs.getString("goods_type"));
            res.remnantInventory = rs.getInt("remnant_inventory");
            res.state     = GoodsState.valueOf(rs.getString("state"));

            res.photoName         = rs.getString("photo_path");
            res.describe         = rs.getString("describe");
            res.cumulativeSales  = rs.getInt("cumulative_sales");
            return res;
        }
    }
}