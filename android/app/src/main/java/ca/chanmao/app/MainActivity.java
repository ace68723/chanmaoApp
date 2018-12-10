package ca.chanmao.app;

import com.reactnativenavigation.controllers.SplashActivity;


import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.soloader.SoLoader;

import cn.jpush.android.api.JPushInterface;

public class MainActivity extends SplashActivity {

    private static Activity mCurrentMainActivity = null;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    protected String getMainComponentName() {
        return "chanmao";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mCurrentMainActivity = this;
        JPushInterface.init(this);
    }

    public static Activity getActivity() {
        Activity activity = mCurrentMainActivity;
        return activity;
    }
    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }
}