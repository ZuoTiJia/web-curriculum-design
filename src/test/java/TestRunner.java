import org.junit.runner.JUnitCore;
import org.junit.runner.notification.Failure;
import org.junit.runner.Result;

public class TestRunner {
    public static void main(String[] args) {
        Result result = JUnitCore.runClasses(TestTest.class);
        for(Failure failure: result.getFailures()) {
            System.out.println(failure.toString());
        }
        System.out.println("测试结果:" + result.wasSuccessful());
    }
}
