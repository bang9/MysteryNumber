# MysteryNumber

Signed APK 만들기
Google Play Store에 배포해보자.

먼저 signed release APK를 만들어야 한다.

## 1. Signing key 생성

Keytool로 Private Signing key를 만든다.
keytool.exe는 JDK를 설치한 bin폴더에 있음 (C:\Program Files\Java\jdk1.8.0_121\bin)

자바는 '키 저장소'를 단일 파일 안에서 관리하고 있다.
현재 키 저장소에 담겨있는 키를 확인하려면 keytool -list로 확인한다.
keytool 오류: java.lang.Exception: 키 저장소 파일이 존재하지 않음: ...\.keystore
한번도 키를 만든적이 없으면 키 저장소도 없고 키도 없다.
그럼 키 저장소는 어떻게 만드나? 키 저장소만 만드는 방법은 없고 최초로 키를 만들면 저장소도 자동으로 생긴다.

자 그럼 keytool -genkey로 키를 만들어 보자.

```
$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

비밀번호를 입력하고 모두 엔터만 쳐서 skip

다음에 대해 유효 기간이 10,000일인 2,048비트 RSA 키 쌍 및 자체 서명된 인증서(SHA256withRSA)를 생성하는 중
        : CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown
<my-key-alias>에 대한 키 비밀번호를 입력하십시오.
        (키 저장소 비밀번호와 동일한 경우 Enter 키를 누름):

마지막 엔터를 치면 my-release-key.keystore 파일이 생성된다.
(위의 예에서는 keystore를 직접 1회성으로 지정했으므로 다시 keytool -list 해봐도 저장소는 없다.)

이 keystore 파일은 10,000일 동안 사용가능한 single key를 가지고 있다.
ailas가 나중에 앱을 signing 할때 사용할 이름이니 잘 기억해두자.

keystore 파일은 private하게 유지해야 함. version control에 올리지 말것!

gradle 변수 설정
- 위 keystore파일을 android/app 폴더에 복사
- android/gradle.properties 파일아래 내용 추가하고 저장

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

- 별표는 아까 입력한 비밀번호
- 이 값들은 나중에 우리 app signing시 사용할 global gradle 변수
- Play Store에 한번 배포한 상태에서 signing key를 바꾸고 싶다면 다른 패키지 이름으로 재배포해야 함. (다른 패키지명을 입력한다는 것은 다운로드 횟수와 별점 정보다 날아간다는 뜻!) 그러니 이 keystore 파일을 잘 보관할 것!!

app의 gradle config에서 signing config 설정
- android/app/build.gradle 파일 수정

```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

release APK 생성
- android/app 폴더에 react.gradle 파일이 없다면
```
$ mkdir -p android/app/src/main/assets
$ react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
$ cd android
$ ./gradlew assembleRelease
```

마지막 assembleRelease까지 하면 android/app/build/outputs/apk/app-release.apk 라는 apk 파일이 생긴다.
앱을 설치하려면 root에서 다음과 같이 명령어 입력

```
cd android && gradlew installRelease
```

Proguard로 APK 크기 줄이기 (옵션)
옵션을 적용하지 않은 경우 apk는 7,479KB이다.
Proguard는 APK의 크기를 살짝 줄여준다. (사용하지 않는 코드를 제거)
Proguard는 가끔 library 별로 설정이 필요하다고 한다.
android/app/build.gradle에서 아래 옵션을 true로 변경하면 된다.
```
    buildTypes {
        release {
            ...
            minifyEnabled true
        }
    }
```

------------FIRE BASE 참고

https://medium.com/react-native-development/build-a-chat-app-with-firebase-and-redux-part-1-8a2197fb0f88
https://medium.com/@jamesmarino/getting-started-with-react-native-and-firebase-ab1f396db549
