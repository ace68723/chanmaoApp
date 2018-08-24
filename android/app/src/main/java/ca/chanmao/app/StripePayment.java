package ca.chanmao.app;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.stripe.android.Stripe;
import com.stripe.android.TokenCallback;
import com.stripe.android.model.Card;
import com.stripe.android.model.Token;

import static java.security.AccessController.getContext;

/**
 * Created by aiden on 2018-02-26.
 */

public class StripePayment {



    public void gettoken(Context mContext,String cardNumber,int expMonth,int expYear,String cvc)
    {
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
        String key="pk_test_MsgqDWzRTfpOKl5mBwX0J0u2";

        if (card.validateCard()) {
            Log.d("teststripe","startjudge");
            Stripe stripe = new Stripe(mContext);
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

                        }
                        public void onError(Exception error) {
                            // 显示本地错误信息
                            Log.d("teststripe", String.valueOf(error));
                        }
                    }
            );
        }
        else if (!card.validateNumber()){//卡号有误
            Log.d("teststripe","The card number that you entered is invalid");
        } else if (!card.validateExpiryDate()) {//过期时间有误
            Log.d("teststripe","The expiration date that you entered is invalid");
        } else if (!card.validateCVC()) {//CVC验证码有误
            Log.d("teststripe","The CVC code that you entered is invalid");
        } else {//卡片详情有误
        Log.d("teststripe","The card details that you entered are invalid");
        }
    }
}
