(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,t,n){e.exports=n(25)},25:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(5),c=n(0),i=n.n(c),p=n(22),u=n.n(p),s=n(23),d=n(12),m=n.n(d),l=(n(71),n(32),n(33),{partidas:[]}),f=n(34),b=new f("sk_test_VN9W1bQmxaKq2e4j6x81ry870rkwYEXe");function w(){return y.apply(this,arguments)}function y(){return(y=Object(o.a)(a.a.mark(function e(){var t;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(l)),m()("<a href="+t+">download JSON</a>").appendTo("#root"),e.next=4,b.receipts.create({payment_form:f.PaymentForm.EFECTIVO,items:l.partidas});case 4:e.sent;case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}function E(){var e=Object(s.a)(),t=e.register,n=e.handleSubmit;return i.a.createElement("form",{onSubmit:n(function(e){return function(e){var t=e.precio,n={product:{description:"VENTA",product_key:"01010101",price:t,unit_key:"ACT"}};l.partidas.push(n),m()("<p>"+n.product.price+" </p>").appendTo("#root"),console.log(n.product.price)}(e)})},i.a.createElement("input",Object.assign({type:"number"},t("precio"),{placeholder:"Precio"})),i.a.createElement("button",{onClick:w}," Hacer Recibo"),i.a.createElement("input",{type:"submit"}))}var h=document.getElementById("root");u.a.render(i.a.createElement(E,null),h)},32:function(e,t,n){}},[[24,1,2]]]);
//# sourceMappingURL=main.9eaee06b.chunk.js.map