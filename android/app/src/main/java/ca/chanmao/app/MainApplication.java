package ca.chanmao.app;



import android.support.annotation.Nullable;
import com.facebook.react.BuildConfig;
import com.facebook.react.ReactPackage;
import io.realm.react.RealmReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.theweflex.react.WeChatPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;




public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }


    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new RNDeviceInfo(),
                new RealmReactPackage(),
                new WeChatPackage()
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
}