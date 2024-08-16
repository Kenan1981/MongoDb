*** DAY 1 ***
1-ekranı temizleme

*cls

2-shop isminde bir DB oluşturalım.

*use shop

3-hangi DB deyim

*db

4-tüm DB leri görelim

*show databases

5-customers isminde bir
collection oluşturalım.

*db.createCollection('customers')

6-tüm collectionları görelim

*show collections

ya da 

*db.getCollectionNames()


7-customers collectionını
silelim.

*db.customers.drop()

8-shop DB yi silelim

*db.dropDatabase()


9-yeni bir DB(products)
ve içine bir collection
ekleyelim:electronics

*use products
*db.createCollection('electronics')

10-electronics collectionına
bir document insert edelim.

*db.electronics.insertOne({"name":"TV","price":230})

*db.electronics.insertOne({name:"airpod",price:180})

*db.books.insertOne({"name":"Sefiller","price":120})

NOT:olmayan bir collectiona document
eklemek istersek otomatik collectionı
oluşturup documentı ekler.


11-bir collecitona birden fazla
document ekleyelim.


*db.electronics.insertMany([{"name":"ipod","price":110},{"name":"radio","price":80},
{"name":"iphone","price":250.99,"tax":1.2}])


NOT:insertMany parametre olarak
document dizisi aldığı için []
ile kullanılır.

NOT:String data tipi için
çift/tek tırnak kullanılabilir.


12-tüm documentları listeleyelim.

*db.electronics.find()

13-sadece ilk 2 documentı
görelim.

*db.electronics.find().limit(2)



14-sadece 2-4 arasındaki documentları
görelim.

*db.electronics.find().skip(1).limit(3)


15-name i airpod olan documentları
görelim.

*db.electronics.find({"name":"airpod"})

NOT:find({filter})

16-name i airpod ve price:90
olan documentları görelim

*db.electronics.find({"name":"airpod","price":90})

veya

*db.electronics.find({$and:[{"name":"airpod"},{"price":90}]})



17-name i airpod veya price:80
olan documentları görelim

*db.electronics.find({$or:[{"name":"airpod"},{"price":80}]})

18-sadece belirli fieldları
görelim.

-17deki sonuçlardan 
sadece priceları görelim.

*db.electronics.find({$or:[{"name":"airpod"},{"price":80}]},{"price":1})

-sadece priceları görelim,
_id de olmasın.

db.electronics.find({$or:[{"name":"airpod"},{"price":80}]},{"price":1,"_id":0})

NOT:find({filter},{projection})

NOT:projectionda bazı fieldları 
değeri 0/1 verilmiş ise
değeri verilmeyen 
fieldların değerini 1/0 kabul eder. 

NOT:_id nin projection değeri
default olarak 1 dir.

19-tüm documentları görüntüleyelim
sadece price ve 
name bilgileri gelsin.

*db.electronics.find({},{"name":1,"price":1,"_id":0})

20-yukarıdaki sorguyu 
price değerine göre sıralayalım.


*db.electronics.find({},{"name":1,"price":1,"_id":0}).sort("price")


NOT:sort parametrede verilen
fielda göre default olarak
ASC(artan) olarak sıralak 

NOT:ASC için değer 1
    DESC için değer:-1

21-yukarıdaki sorguyu price değerine
göre azalan sıralayalım.

*db.electronics.find({},{"name":1,"price":1,"_id":0}).sort({"price":-1})

22-name:airpod olan documentları 
price değerine göre azalan
 sıralayalım.

*db.electronics.find({"name":"airpod"}).sort({"price":-1})

23-collectiondaki tüm documentlardan
ilkini görelim


*db.electronics.findOne()

24-collectiondaki name:radio olan 
documentlardan ilkini görelim.

*db.electronics.findOne({"name":"radio"})

**********
Comparison Operators
    Eşitlik     ==> $eq
    Küçüktür    ==> $lt
    Büyüktür    ==> $gt
    Küçük eşit  ==> $lte
    Büyük eşit  ==> $gte
    Eşit değil  ==> $ne
    Dizi içinde ==> $in
    Dizi değil  ==> $nin

**********  

25-price ı 180 olan tüm documentları
görelim

*db.electronics.find({"price":{$eq:180}})

26-price ı 180 veya daha az olan 
tüm documentları görelim

*db.electronics.find({"price":{$lte:180}})

27-yukarıdaki sorguda _id gözükmesin.

*db.electronics.find({"price":{$lte:180}},{"_id":0})

28-price ı 100, 80 veya 230 olan 
documentların sadece name ve price
değerlerini görelim

*db.electronics.find({"price":{$in:[100,80,230]}},{"_id":0})

29-price ı 80, 100 ve 230 olmayan 
documentların sadece name ve price
değerlerini görelim.


*db.electronics.find({"price":{$nin:[100,80,230]}},{"name":1,"price":1,"_id":0})



//=================================================================
//            findOneAndUpdate - findOneAndReplace
//=================================================================

// A - findOneAndReplace() 
//----------------------------
//   1-) belirtilen koşullara uyan ilk dökümanı bulur ve degistirir. 
//   2-) Komut icerisinde belirtilen kisimlari guncellerken bos birakilan 
//       alanlari kaldirir. (API lerdeki PUT metoduna benzetilebilir).
//   3-) Islem sonunda ilgili dokumanin guncellenmemiş halini gosterir.
//       yani ben bunu değiştirdim diye haber veriyor

//       
// B - findOneAndUpdate() 
//----------------------------
///  1-) Belirtilen koşullara uyan ilk dökümanı bulur ve günceller. 
//   2-) Komut icerisinde belirtilen kisimlari guncellerken bos birakilan 
//       alanlari modifiye etmez  (API lerdeki PATCH metoduna benzetilebilir).
//   3-) komutun kosul kismindan sonra degislikileri gerceklestirmek icin bir 
//       atomic operator kullanilir. 
//       ($set (direk değer verilirse), $inc(arttırma azaltma), $mul (çarpma)vb.)
//   4)  Islem sonunda ilgili dokumanin guncellenMEmiş halini gosterir.

//=================================================================
// ÖNEMLİ : !!!  bu 2 kod çalıştığında dökümanın update olmamış hali ekrana gelir.
// SYNTAX : ( {filter}, {update}, {options})


30-price ı 100 den az olan documentlardan
ilkini

name:"mobilphone"
price:250

olan document ile değiştiriniz.