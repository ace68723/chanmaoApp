change the destroy method on node_modules/react-native-navigation/android/app/src/main/java/com/reactnativenavigation/views/LightBox.java

    public void destroy() {
        // content.unmountReactView();
        dismiss();
    }
