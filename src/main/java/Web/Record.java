package Web;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

enum RecordType {
    Add, Cut;
}


public class Record  {

    private long orderFormId;
    private long goodsId;
    private int number;
    private RecordType recordType;
    private java.util.Date time;

    private Goods goods;

    public long getOrderFormId() {
        return orderFormId;
    }

    public long getGoodsId() {
        return goodsId;
    }

    public int getNumber() {
        return number;
    }

    public RecordType getRecordType() {
        return recordType;
    }

    public Date getTime() {
        return time;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }
    public Record() {

    }
    public Record(int orderFormId, int goodsId, int number, RecordType recordType) {
        this.orderFormId = orderFormId;
        this.goodsId = goodsId;
        this.number = number;
        this.recordType = recordType;
    }

    public static class RecordRowMapper implements RowMapper<Record> {
        @Override
        public Record mapRow(ResultSet rs, int rowNum) throws SQLException {
            Record res = new Record();
            res.orderFormId = rs.getLong("id");
            res.goodsId     = rs.getLong("goods_id");
            res.number      = rs.getInt("number");
            res.recordType  = RecordType.valueOf(rs.getString("record_type"));
            res.time        = rs.getTimestamp("time");
            return res;
        }
    }
}