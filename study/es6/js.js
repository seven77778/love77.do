//购物车表格数据
var count = 0;
var totalPrice = 0;
function addproduct (name, price) {
  //计数
  var i = 0;
  i++;
  alert("成功添加到购物车")
  $("#carttable").append("<tr><td><input type='checkbox' class='sc' onclick='checknotcheck()'></td><td name='name1'>" + name + "</td><td id='price'>" + price + "</td><td><input type='button' value='删除' onclick='deleteOne(this)'></td></tr>");
  count += i;
  $("#cartnum").html(count);


}

//购物车的显示、隐藏
function switchto () {
  $('#items-list').css('display', 'none');
  $('#cartpage').css('display', 'block');
}

function switchback () {
  $('#items-list').css('display', 'flex');
  $('#cartpage').css('display', 'none');
}

//删除单行
function deleteOne (obj) {
  $(obj).parent().parent().remove();
  count--
  $("#cartnum").html(count)
}


//全选功能
$("#checkAll").click(function () {
  if (this.checked == true) {
    $('.sc').prop('checked', true)
  } else {
    $('.sc').prop('checked', false)
  }
})


//**************小哼哼来了 
function delall () {
  console.log(123)
  $("#carttable").html("")
  count = 0
  $("#cartnum").html(count);
  totalPrice = 0;
  refresh();
}

function pay () {
  console.log(999)
  delall();
  totalPrice = 0;
  refresh();



}

// 刷新显示的价格
function refresh () {
  $("#money").html(totalPrice);
}

$("#haha").click(function () {
  console.log(123)
  $("span[name='money']").html("121212122")
})

//单选
function checknotcheck () {

  var checkAll = $("#carttable .sc");
  var checkItem = $("#checkAll");

  console.log($(this).is(".all"))
  console.log($(this).is(".sc"))



  if ($(this).is("#checkAll")) {
    if (!$(this).is(':checked')) {
      checkItem.prop("checked", false);
    } else {
      checkItem.prop("checked", true);
    }
  } else if ($(this).is(".sc")) {
    var count = 0;
    checkItem.each(function () {
      if ($(this).prop("checked") == false) {
        count++;
      }
    });
    console.log("选中的-" + count)
    if (count == 0) {
      checkAll.prop("checked", true);
    } else {
      checkAll.prop("checked", false);
    }
  }

  freshPrice()
}


//更新价格
function freshPrice () {
  sum = 0;
  var tab = document.getElementById("carttable");
  var rs = tab.rows;
  for (var i = 1; i < rs.length; i++) {
    if (rs[i].cells[0].children[0].checked) {
      sum += parseFloat(rs[i].cells[2].innerHTML)
    }
    console.log(sum);
    $("span[name='money']").html(sum)
  }



}




//结算
//+
//-