function getXmlHttpRequest () {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    return new ActiveXObjcet("Microsoft.XMLHTTP");  // code for IE6, IE5
  }
}

// post
function login () {
  console.log("this is login")
  var r = getXmlHttpRequest();
  r.open("POST", "http://127.0.0.1:8083/login");
  r.onreadystatechange = function () {
    console.log(000)
    if (r.readyState == 4) {
      if (r.status == 200) {
        var t = r.responseText;
        console.log(t)
        if ("1" == t) {
          console.log("登录成功")
          localStorage.setItem("name", document.getElementById("name").value)
          localStorage.setItem("password", document.getElementById("password").value)
          return true;
        } else {
          return false;
        }
      }
    }
  }
  r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  r.send("name=" + document.getElementById("name").value + "&password=" + document.getElementById("password").value);
}

function getBooks () {
  var r = getXmlHttpRequest();
  r.open("GET", "http://127.0.0.1:8083/getBooks");
  r.onreadystatechange = function () {

    // 跨域的时候 此时readyState是4，status = 0
    if (r.readyState == 4) {
      if (r.status == 200) {
        var t = r.responseText;
        var food = JSON.parse(t)
        console.log(food)
        for (i = 0; i < food.length; i++) {
          console.log(food[i].name + food[i].price)
        }
      }
    }
  }
  r.send();
}

/*
加入购物车
（2）功能
（2.1）判断下是否登录过（本地存储中找一下）
（2.2）如果没有登录跳转到登录页面去登录
（2.3）登录过将购买的数据放在本地存储中
如果购买过了就不要在本地存储中添加数据了
*/
function addCar () {

  console.log("this is addCar");
  var name = localStorage.getItem("name");
  if (isEmpty(name)) {
    console.log("没登录")
    window.location.href = "login.html";     //在同当前窗口中打开窗口
  } else {
    console.log("当前登录用户 " + name)

  }

}



function load () {
  console.log("this is load")
  var r = getXmlHttpRequest();
  // r.open("GET", "/study/ajax/food.json");
  r.open("GET", "http://127.0.0.1:8083/getBooks");
  r.onreadystatechange = function () {
    console.log(111)
    var haha = document.getElementById("show");
    console.log(haha)

    if (r.readyState == 4) {
      console.log(r.status)
      //这里跨域了？status=0
      if (r.status == 200) {

        var t = r.responseText;
        console.log("111" + t)
        var food = JSON.parse(t)
        console.log(food)
        for (i = 0; i < food.length; i++) {
          showinsert(food[i].name, food[i].price)
        }
      }
    }
  }
  r.send();

}



function showinsert (name, price) { //添加子节点
  var str = document.getElementById("show");
  var obj = document.createElement("p"); //添加哪类节点
  var objNode1 = document.createTextNode(name); //创建文字节点
  var objNode2 = document.createTextNode(price); //创建文字节点
  var input = document.createElement("input");
  input.type = "button";
  input.value = "加入购物车";
  //addEventListener 调用传参数的方法，哈哈哈~
  input.addEventListener("click", function () {
    addcar(name)
  });
  str.appendChild(obj);
  obj.appendChild(objNode1);
  obj.appendChild(objNode2);
  obj.appendChild(input);
}

//localStorage 只能存string，所以还是保存成json string吧。。。
function addcar (obj) {
  //每个用户都应该是单独的一个购物车，用name当做key,购买的书名当做value
  var name = localStorage.getItem("name") + "-car"
  var books = localStorage.getItem(name);
  console.log(books)
  if (books == null) {
    console.log("购物车为空，新建一个存放商品的array");
    books = new Array();
  }



  console.log("已经加入的 " + books)
  localStorage.setItem(name, JSON.stringify(books))
  console.log(localStorage.getItem(name))
}


//判断字符是否为空的方法
function isEmpty (obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}