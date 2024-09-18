# html lecture 2024

## liveServer SSL setup

1. Install openssl
```bash

brew install openssl # mac
sudo apt-get install openssl
```
윈도우의 경우 아래 링크에서 다운로드 후 설치  
windows: https://slproweb.com/products/Win32OpenSSL.html  
또는
https://sourceforge.net/projects/openssl/files/latest/download?source=typ_redirect


2. Create a `key.pem` and `cert.pem` file in the root of the project.

```bash
openssl req -new -x509 -keyout key.pem -out cert.pem -days 365 -nodes
```

3. Add the following settings to the `settings.json` file.

ctrl + , 

vscode 에서 설정파일 열기  

```bash
code .vscode/settings.json
```

```json
{
    "liveServer.settings.https": {
        "enable": true,
        "cert": "cert.pem",
        "key": "key.pem"
    }
}

```
https://127.0.0.1:5500




