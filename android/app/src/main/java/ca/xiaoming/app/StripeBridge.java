package ca.xiaoming.app;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.stripe.android.Stripe;
import com.stripe.android.TokenCallback;
import com.stripe.android.model.Card;
import com.stripe.android.model.Token;

/**
 * Created by aiden on 2018-02-26.
 */

public class StripeBridge extends ReactContextBaseJavaModule {
    ReactApplicationContext mReactContext;
    public StripeBridge(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext=reactContext;
    }

    @Override
    public String getName() {
        return "StripeBridge";
    }
    @ReactMethod
    public void pay(String cardNumber, int expMonth, int expYear, String cvc, final Promise promise){
        try {
            Log.d("teststripe","startreactmethod");
            Log.d("teststripe","gettoken");


            String cardNum=cardNumber;
            int cardExpMonth=expMonth;
            int cardExpYear=expYear;
            String cardCVC=cvc;
            Card card = new Card(
                    cardNum, //卡号
                    cardExpMonth, //卡片过期月份
                    cardExpYear, //卡片过期年份
                    cardCVC //CVC验证码
            );
            //for stripe configure pk_live_XQlHKvkQ8N9yPEHlslQvaS7U   pk_test_MsgqDWzRTfpOKl5mBwX0J0u2
            String key="pk_live_XQlHKvkQ8N9yPEHlslQvaS7U";

            if (card.validateCard()) {
                Log.d("teststripe","startjudge");
                Stripe stripe = new Stripe(mReactContext);
                //调用创建token方法
                stripe.createToken(
                        card,//传入card对象
                        key,
                        new TokenCallback() {
                            //这里的token打印出来是一串json数据,其中的    token需要用getId()来得到
                            public void onSuccess(Token token) {
                                // 这里生成得到了token,你需要将它发送到自己服务器,然后服务器利用这个token和支付金额去向    Stripe请求扣费
//                            submitPaymentInfo(token.getId(),"12.20");//提交支付信息
                                Log.d("teststripe",token.getId());
                                promise.resolve(token.getId());

                            }
                            public void onError(Exception error) {
                                // 显示本地错误信息
                                Log.d("teststripe", String.valueOf(error));
                                promise.reject("-1", "there were no token"+error);
                            }
                        }
                );
            }
            else if (!card.validateNumber()){//卡号有误
                Log.d("teststripe","The card number that you entered is invalid");
                promise.reject("-2", "The card number that you entered is invalid");
            } else if (!card.validateExpiryDate()) {//过期时间有误
                Log.d("teststripe","The expiration date that you entered is invalid");
                promise.reject("-3", "The expiration date that you entered is invalid");
            } else if (!card.validateCVC()) {//CVC验证码有误
                Log.d("teststripe","The CVC code that you entered is invalid");
                promise.reject("-4", "The CVC code that you entered is invalid");
            } else {//卡片详情有误
                Log.d("teststripe","The card details that you entered are invalid");
                promise.reject("-5", "The card details that you entered are invalid");
            }
        } catch (Exception e)
        {
            e.printStackTrace();
            promise.reject(e);
        }
    }


}
