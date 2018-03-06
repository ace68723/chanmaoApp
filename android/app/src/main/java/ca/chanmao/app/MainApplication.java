package ca.chanmao.app;

import android.support.annotation.Nullable;

import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.soloader.SoLoader;
import com.microsoft.codepush.react.CodePush;
import com.theweflex.react.WeChatPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }


  @Nullable
  @Override
  public String getJSBundleFile() {
    return CodePush.getJSBundleFile();
  }



  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
            new MapsPackage(),
            new WeChatPackage(),
            new RNDeviceInfo(),
            new RealmReactPackage(),
            new NativePackage(),
            new CodePush("3h54HiPlCHlTlQsTwIxIkYoHvbfmc889ad22-4792-484d-b870-7cc05a2db9bd", MainApplication.this, BuildConfig.DEBUG)
//            new VectorIconsPackage()
    );



  }



  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public void onCreate() {
    super.onCreate();

  }
}
