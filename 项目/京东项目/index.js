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
  r.open("POST", "http://127.0.0.1:8084/login");
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
  r.open("GET", "http://127.0.0.1:8084/getBooks");
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
  r.open("GET", "http://127.0.0.1:8084/getBooks");
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
  obj.className = "p";
  var objNode1 = document.createTextNode(name); //创建文字节点
  objNode1.className = "p1"
  var objNode2 = document.createTextNode(price); //创建文字节点
  var input = document.createElement("input");
  input.type = "button";
  input.value = "加入购物车";
  //addEventListener 调用传参数的方法
  input.addEventListener("click", function () {
    addcar(name, price)
  });
  str.appendChild(obj);
  obj.appendChild(objNode1);
  obj.appendChild(objNode2);
  obj.appendChild(input);
}

//localStorage 只能存string，所以还是保存成json string吧。。。
function addcar (bookname, price) {
  //每个用户都应该是单独的一个购物车，用name当做key,购买的书名当做value
  var name = localStorage.getItem("name") + "-car"
  var books = localStorage.getItem(name);
  console.log(books)
  book = [{ "bookname": bookname, "price": price, "sum": "1" }];
  if (books == null) {
    //第一次的时候，购物车的空的，直接用刚才创建的数组就行
    books = book;
  } else {
    //这里需要判断，如果之前有，就不再存放了，修改数量在购物车中进行加减
    console.log("购物车不为空，需要组装");
    books = JSON.parse(books);
    var flag = true;

    for (i = 0; i < books.length; i++) {
      if (bookname == books[i].bookname) {
        //如果有相同的书名，flag为false，后面就不执行 往数组里面添加的动作了
        flag = false;
      }
    }
    // flag还是true的话， 就是没有相同的
    if (flag) {
      books = books.concat(book)
    }
  }
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

// 显示购物车
function showCar () {
  //从local拿到数据
  var name = localStorage.getItem("name") + "-car";
  var books = localStorage.getItem(name)
  books = JSON.parse(books)
  console.log(books.length)
  var car = document.getElementById("car");
  car.style.display = "block";
  for (i = 0; i < books.length; i++) {
    var bookname = books[i].bookname;
    var price = books[i].price;
    var sum = books[i].sum;
    var p = document.createElement("p"); //添加哪类节点
    var span1 = document.createElement("div")
    var span2 = document.createElement("div")
    var span3 = document.createElement("div")
    var span4 = document.createElement("div")

    console.log(span1)
    var objNode1 = document.createTextNode(bookname); //创建文字节点
    var objNode2 = document.createTextNode(price); //创建文字节点

    //数量前后增加 - + 号
    var objadd = document.createElement("input")
    objadd.value = "+";
    objadd.type = "button"
    console.log(price)
    //这样传参数，爽的一批~ 点完 + 号去调用刷新购物车
    objadd.onclick = function () {
      return refreshCar(bookname, price);
    }

    var objadd2 = document.createElement("input")
    objadd2.value = "-";
    objadd2.type = "button"
    objadd2.onclick = function () {
      alert("---");
    }
    var objNode3 = document.createTextNode(sum); //创建文字节点
    //小记要计算价格了
    var allprice = parseInt(price) * parseInt(sum)

    var objNode4 = document.createTextNode(allprice); //创建文字节点
    span1.appendChild(objNode1)
    span2.appendChild(objNode2)
    span3.appendChild(objNode3)
    span4.appendChild(objNode4)
    span1.className = "div"
    span2.className = "div"
    span3.className = "div"
    span4.className = "div"
    p.appendChild(span1)
    p.appendChild(span2)
    p.appendChild(objadd2)
    p.appendChild(span3)
    p.appendChild(objadd)
    p.appendChild(span4)
    car.appendChild(p)
  }

}

//点击加减号修改小记金额 == 其实就是修改local中的数量，然后再刷新 购物车页面？
//也不用，先临时修改小记，然后修改local数据，下次进来也是对的
//在这里去刷新购物车
function refreshCar (obj, price) {
  console.log("点击完加号的书名-" + obj)
  console.log(price)
  //接下来这个方法就是 1.修改local数量 2.修改小记金额
  //
}


function showinsertcar (name, price) { //添加子节点
  var str = document.getElementById("show");
  var obj = document.createElement("p"); //添加哪类节点
  var objNode1 = document.createTextNode(name); //创建文字节点
  var objNode2 = document.createTextNode(price); //创建文字节点
  var input = document.createElement("input");
  input.type = "button";
  input.value = "加入购物车";
  //addEventListener 调用传参数的方法，哈哈哈~
  input.addEventListener("click", function () {
    addcar(name, price)
  });
  str.appendChild(obj);
  obj.appendChild(objNode1);
  obj.appendChild(objNode2);
  obj.appendChild(input);
}

//结算按钮旁边计算选中的商品数量
function checkNumber () {
  var rs = cars.rows;
  var endSum = 0;
  for (var i = 1; i < rs.length; i++) {
    if (rs[i].cells[0].children[0].checked) {
      endSum += parseInt(rs[i].cells[4].children[1].innerHTML);
      console.log("sum", endSum)
      document.getElementById("number").innerHTML = endSum;
    }
    // if (!rs[i].cells[0].children[0].checked) {
    //   document.getElementById("number").innerHTML = 0;
    // }
  }
}