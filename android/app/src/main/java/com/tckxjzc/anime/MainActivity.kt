package com.tckxjzc.anime

import android.Manifest
import android.content.DialogInterface
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.support.v7.app.AlertDialog
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.view.KeyEvent
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactRootView
import com.facebook.react.common.LifecycleState
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.shell.MainReactPackage
import com.microsoft.codepush.react.CodePush
import com.oblador.vectoricons.VectorIconsPackage
import com.tckxjzc.anime.react.HTMLParsePackage
import org.devio.rn.splashscreen.SplashScreen
import org.devio.rn.splashscreen.SplashScreenReactPackage

class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {
    private lateinit var reactRootView: ReactRootView;
    private lateinit var reactInstanceManager: ReactInstanceManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        SplashScreen.show(this, true);
        reactInstanceManager = ReactInstanceManager.builder()
                .setApplication(application)
//                .setBundleAssetName("index.android.bundle")
                .setJSMainModulePath("index")
                .addPackage(MainReactPackage())
                .addPackage(VectorIconsPackage())
                .addPackage(SplashScreenReactPackage())
                .addPackage(HTMLParsePackage())
                .addPackage(CodePush("ty4rs_m-b-z5e4PGHxjnsDpM2Ztn955c3ac9-d46b-4d2e-843a-fcfc3ec1ec31",applicationContext,BuildConfig.DEBUG))
                .setJSBundleFile(CodePush.getJSBundleFile())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build()

        reactRootView = ReactRootView(this)
        reactRootView.startReactApplication(reactInstanceManager, "Xfsub", null)
        setContentView(reactRootView)
//        this.verifyStoragePermissions()//请求权限

    }

    override fun onStart() {
        super.onStart()
        if (BuildConfig.DEBUG) {
            this.canDrawOverlays()
        }
    }
    private fun canDrawOverlays() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                startActivityForResult(Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:$packageName")), 2)
            }
        }
    }

    private fun verifyStoragePermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            //检测是否有写的权限
            val permission = this.checkSelfPermission(
                    "android.permission.WRITE_EXTERNAL_STORAGE")
            if (permission != PackageManager.PERMISSION_GRANTED) {
                // 没有写的权限，去申请写的权限，会弹出对话框
                this.requestPermissions(arrayOf<String>(Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE),
                        1)
            } else {

            }

        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            1 -> {
                if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Log.e("Test", "授权被允许")
                } else {
                    AlertDialog.Builder(this)
                            .setMessage("拒绝后,应用将无法正常运行")
                            .setPositiveButton("确定", object : DialogInterface.OnClickListener {
                                override fun onClick(dialog: DialogInterface, which: Int) {
                                    dialog.dismiss()
                                }
                            })
                            .create().show()
                }

            }
        }
    }

    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }

    override fun onBackPressed() {

        reactInstanceManager.onBackPressed()

    }

    override fun onPause() {
        super.onPause()

        reactInstanceManager.onHostPause(this)

    }

    override fun onResume() {
        super.onResume()

        reactInstanceManager.onHostResume(this, this)

    }

    override fun onDestroy() {
        super.onDestroy()

        reactInstanceManager.onHostDestroy(this)


        reactRootView.unmountReactApplication()

    }

    override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_MENU) {
            reactInstanceManager.showDevOptionsDialog()
            return true
        }
        return super.onKeyUp(keyCode, event)
    }
}