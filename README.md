node.js用のスクリプト
=======

## add-couchbase-data1.js
* NoSQL Couchbase にテストデータを作成するスクリプト
* 作成する件数は、`i < 1000` の部分を変更
* age の値は乱数で生成

### インストール
* node.js はインストールしておくこと
1. 適当なディレクトリを作成
2. package.jsonファイルを作成
    {
      "devDependencies": {
        "couchbase": "*",
        "crypto": "*",
        "async": "*"
      }
    }
3. npm installで依存モジュールをインストール
4. 同ディレクトリに、add-couchbase-data1.jsファイルを配置する

### 実行
`# node add-couchbase-data1`

### 実行例
    key=3385b5a19bc14f744aa00d34d3785ce0
    doc={
    "user" : "user-1" ,
    "age" : "16"
    }
    
    Inserted : 1
    key=41318a900e67b19efc7aec70831c329e
    doc={
    "user" : "user-2" ,
    "age" : "38"
    }
    
    Inserted : 2
    key=e49f5942dc10f9c8e95d538fd4cba305
    doc={
    "user" : "user-3" ,
    "age" : "55"
    }
    
    Inserted : 3
    Finished!

### ライセンス
* MIT License
