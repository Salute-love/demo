var moveItem = document.getElementsByTagName("label");

for (let i = 0; i < moveItem.length; i++) {
  //动态设置label元素id
  moveItem[i].setAttribute("id", "" + i);
  moveItem[i].setAttribute("text", i);
  moveItem[i].ondragstart = function (ev) {
    //dataTransfer.setData() 方法设置被拖数据的数据类型和值
    ev.dataTransfer.setData("Text", this.id);
  };
  let label = moveItem[i];
  // 鼠标放到label上，高亮显示当前的label
  let bg;
  label.onmouseover = function () {
    // 鼠标放到label上的时候，应该记录label当前的颜色
    bg = this.style.backgroundColor;

    this.style.backgroundColor = "skyblue";
  };
  // 2.2 鼠标离开label，还原原来的颜色
  label.onmouseout = function () {
    // 鼠标离开，还原原来的颜色
    this.style.backgroundColor = bg;
  };
}



//左－〉右
document.getElementById("right").ondragover = function (ev) {
  ev.preventDefault(); //阻止向上冒泡
};
document.getElementById("right").ondrop = function (ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("Text");
  var elem = document.getElementById(id); //当前拖动的元素
  var toElem = ev.toElement.id; //放置位置
  if (toElem == "right") {
    //如果为container,元素放置在末尾
    this.appendChild(elem);
  } else {
    //如果为container里的元素，则插入该元素之前
    this.insertBefore(elem, document.getElementById(toElem));
  }
};

//右－〉左
document.getElementById("left").ondragover = function (ev) {
  ev.preventDefault(); //阻止向上冒泡
};
document.getElementById("left").ondrop = function (ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("Text");
  var elem = document.getElementById(id);
  var toElem = ev.toElement.id;
  if (toElem == "left") {
    //如果为container,元素放置在末尾
    this.appendChild(elem);
  } else {
    //如果为container里的元素，则插入该元素之前
    this.insertBefore(elem, document.getElementById(toElem));
  }
};

var left = document.querySelector('#left')
var right = document.querySelector('#right')

Array.from(moveItem, x => {
  x.onclick = () => {
    if (x.parentElement.id === 'left') {
      var rightChild = [...document.querySelectorAll('#right > label'), x]
      for (let i = 0; i < rightChild.length; i++) {
        for (let j = i; j < rightChild.length; j++) {
          if (rightChild[i].getAttribute('text') > rightChild[j].getAttribute('text')) {
            let max = rightChild[j]
            rightChild[j] = rightChild[i]
            rightChild[i] = max
          }
        }
      }
      document.querySelector('#right').innerHTML = ''
      Array.from(rightChild, x => {
        right.appendChild(x)
      })
    } else{
      var leftChild = [...document.querySelectorAll('#left > label'), x]
      for (let i = 0; i < leftChild.length; i++) {
        for (let j = i; j < leftChild.length; j++) {
          if (leftChild[i].getAttribute('text') > leftChild[j].getAttribute('text')) {
            let max = leftChild[j]
            leftChild[j] = leftChild[i]
            leftChild[i] = max
          }
        }
      }
      document.querySelector('#left').innerHTML = ''
      Array.from(leftChild, x => {
        left.appendChild(x)
      })
    }
  }
})