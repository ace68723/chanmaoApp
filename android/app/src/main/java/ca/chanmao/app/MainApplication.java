package ca.chanmao.app;



import android.support.annotation.Nullable;
import com.facebook.react.BuildConfig;
import com.facebook.react.ReactPackage;

import cn.jpush.reactnativejpush.JPushPackage;
import io.realm.react.RealmReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.theweflex.react.WeChatPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;
//import ca.chanmao.app.AlipayReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactApplication;
import com.robinpowered.react.Intercom.IntercomPackage;
import com.horcrux.svg.SvgPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.theweflex.react.WeChatPackage;

import com.facebook.react.ReactInstanceManager;

// Add CodePush imports
import com.microsoft.codepush.react.ReactInstanceHolder;
import com.microsoft.codepush.react.CodePush;

// Intercom
import com.robinpowered.react.Intercom.IntercomPackage;
import io.intercom.android.sdk.Intercom;

public class MainApplication extends NavigationApplication implements ReactInstanceHolder {
    private boolean SHUTDOWN_TOAST = false;
    private boolean SHUTDOWN_LOG = false;
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Override
    public void onCreate() {
      super.onCreate();
      Intercom.initialize(this, "android_sdk-c22c92b36f43ead676c4a4ac73f0aae91b821819", "hz77kaf5");
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new RNDeviceInfo(),
                new RealmReactPackage(),
                new WeChatPackage(),
                new VectorIconsPackage(),
                new AlipayReactPackage(),
                new MainReactPackage(),
            new IntercomPackage(),
            new SvgPackage(),
                new NativePackage(),
            new MapsPackage(),
                new WeChatPackage(),
                new CodePush("wxAMv-nMqU-Z_07d7hJUUGbhQflU842cf145-347a-42da-b8ba-6819059e5be5", MainApplication.this, BuildConfig.DEBUG),
                new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
        );
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Nullable
    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    @Override
    public String getJSBundleFile() {
        // Override default getJSBundleFile method with the one CodePush is providing
        return CodePush.getJSBundleFile();
    }

    @Override
    public ReactInstanceManager getReactInstanceManager() {
        // CodePush must be told how to find React Native instance
        return getReactNativeHost().getReactInstanceManager();
    }
}
