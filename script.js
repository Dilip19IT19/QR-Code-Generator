

document.querySelector(".btn").addEventListener("click",function()
{
  let str=document.querySelector("input").value.trim();
  if(str.length==0)
  {
    return;
  }
  
  console.log("button clicked");

  let outer_box=document.querySelector(".div1");
  outer_box.classList.add("qr_code_box");
  let inner_box=document.querySelector(".div2");
  inner_box.classList.add("inner_box");
  let qr=document.querySelector("img");
  document.querySelector(".btn").innerHTML="Creating QR Code...";
  qr.src=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${str}`;

  document.querySelector("img").addEventListener("load",function()
  {
    document.querySelector(".btn").innerHTML="Generate QR Code";
  })

  
  fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${str}`)
  .then((res)=>{
    return res.blob();
  })
  .then((data)=>{
    let anchor=document.createElement("a");
    anchor.classList.add("download");
    document.querySelector(".container").appendChild(anchor);
    let tempURL=URL.createObjectURL(data);
    anchor.href=tempURL;
    anchor.download="qr-code.png";
    let img=document.createElement("img");
    anchor.appendChild(img);
    img.src="./downloading.png";
    img.style.width="30px";
    img.style.height="30px";

    document.querySelector("input").addEventListener("keyup",function()
  {
    document.querySelector(".div1").classList.remove("qr_code_box");
    document.querySelector(".div2").classList.remove("inner_box");
    document.querySelector("img").src="";

    let container=document.querySelector(".container");
  
    container.removeChild(anchor);
    

  })

  })
  .catch((err)=>{
    alert("QR code can't be downloaded!");
  })
  



  

})