package ca.chanmao.app.cmAlipay;


import android.app.Activity;
import android.text.TextUtils;

import com.alipay.sdk.app.PayTask;
import ca.chanmao.app.MainActivity;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

public class Alipay extends ReactContextBaseJavaModule {


    public Alipay(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Alipay";
    }
    @ReactMethod
    public void show(final String orderInfo, final Promise promise) {
        System.out.println(orderInfo);
        promise.resolve(00000000000);

    }
    @ReactMethod
    public void pay(final String orderInfo, final Promise promise) {
        Runnable payRunnable = new Runnable() {
            @Override
            public void run() {
                Activity activty = MainActivity.getActivity();
                PayTask alipay = new PayTask(activty);
                Map<String, String> result = alipay.payV2(orderInfo, true);

                PayResult payResult = new PayResult((Map<String, String>) result);
                String resultInfo = payResult.getResult();
                String resultStatus = payResult.getResultStatus();
                String memo = payResult.getMemo();
                try {
                    if (TextUtils.equals(resultStatus, "9000")) {
                        promise.resolve(resultInfo);
                    } else {
                        promise.reject("error", memo);
                    }
                } catch (Exception e) {
                    promise.reject("error", e.getMessage());
                }


            }
        };
        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }


}