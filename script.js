const COIN = `<img width="12" height="12" src="./images/coin.png">`,
	  STAR = `<img width="12" height="12" src="./images/star.png">`,
	  itemGEN = ({name, price, harks, lvl, id}) => {
		  if (Storage.data.inventory.includes(id)) return ""
		  var hr = ""
		  harks.forEach(i => {
			  hr += `${i.name}: +${i.value}<br>`
		  })
		  return `<div class="item"><h3 style="margin: 0px">${name}</h3><a> Цена: ${COIN} ${price}<br>${hr}Необходимый уровень: ${lvl}<br></a><button class="button" onclick="buyItem(${id})" style="margin-top: 10;">Купить</button></div>`
		  
	  },
	  gameHTML = `<div class="inv"><a>Инвентарь</a><div class="invi" id="invi"></div></div><div class="gamec" id="gamec" style="max-width: 755px; height: 581px;"><button class="button" onclick="attack()">В бой</button><button class="button" onclick="upg()">Прокачки</button><div class="profile" id="profile"><a id="money" class="inrow" style="margin-left: unset;position: unset;top: unset;"></a><div style="max-height: 11;"><a><br></a></div><a id="exp" value="10" max="100" class="inrow" style="margin-left: unset;position: unset;top: unset;"></a></div></div>`,
	  items=[{
		  name: "Меч гоблина",
		  price: 1000,
		  harks: [
		  {
			  name: "Урон",
			  value: 15,
			  id: 1
		  },
		  {
			  name: "Защита",
			  value: 15,
			  id: 2
		  },
		  {
			  name: "Ловкость",
			  value: 15,
			  id: 3
		  },
		  ],
		  lvl: 2,
		  id: 1
		  },
		  {
		  name: "Меч Дракона",
		  price: 10000000000,
		  harks: [
		  {
			  name: "Урон",
			  value: 35,
			  id: 1
		  },
		  {
			  name: "Защита",
			  value: 35,
			  id: 2
		  },
		  {
			  name: "Ловкость",
			  value: 35,
			  id: 3
		  },
		  {
			  name: "Здоровье",
			  value: 35,
			  id: 4
		  }
		  ],
		  lvl: 5,
		  id: 2
		  }];
// ===============================	  
/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
// ===============================
class Storage {
	static shopOpened = false
	static data = {
				balance: 20823787257800,
				lvl: 3,
				exp: 0,
				mh: 200,
				def: 200,
				dmg: 5,
				l: 0,
				inventory: [],
				weared: []
			}
	
	
	static save() {
		Cookies.set("data", JSON.stringify(this.data), { expires: 365000 })
		return this.data
	}
	
	static get() {
		var cookies = Cookies.get("data")
		if (!cookies) {
			this.data = {
				balance: 0,
				lvl: 0,
				exp: 0,
				inventory: [],
				weared: []
			}
			this.save()
		}
		else {
			this.data = JSON.parse(Cookies.get("data"))
		}
		return this.data
	}
}

class Util {
	static getMaxEXP(lvl) {
		var l = 0
		for (var i = 0;i<lvl;i++) {
			l=Math.ceil(l*1.1+50)
		}
		return l+50
	}
	
	static calcHarks(itemID) {
		var item = items.find(i => i.id == itemID)
		var harks = [0, 0, 0, 0]
		
		item.harks.forEach(i => {
			i.id == 1 ? harks[0] = i.value : i.id == 2 ? harks[1] = i.value : i.id == 3 ? harks[2] = i.value : i.id == 4 ? harks[3] = i.value : 1
		})
		
		return harks
	}
}

function updateBalance() {
	var inrow = document.getElementsByClassName("inrow")
	//Storage.get()
	var balance = Storage.data.balance
	moneyE = []
	for (var i = 0; i< inrow.length; i++){
		if (inrow[i].id == "money") moneyE.push(inrow[i])
	}
	moneyE.forEach(i => i.innerHTML = `${COIN} ${balance}`)
}

function updateLevel() {
	var inrow = document.getElementsByClassName("inrow")
	//Storage.get()
	expE = []
	for (var i = 0; i< inrow.length; i++){
		if (inrow[i].id == "exp") expE.push(inrow[i])
	}
	expE.forEach(i => {
		i.innerHTML = `${STAR} ${Storage.data.lvl}<progress id="expb" value="${Storage.data.exp}" max="${Util.getMaxEXP(Storage.data.lvl)}" style="margin-left: 5px"></progress>
		`
	})
}

function toggleShop() {
	var shop = document.getElementById("shop")
	var game = document.getElementById("game")
	
	Storage.shopOpened = !Storage.shopOpened
	if (Storage.shopOpened) {
		loadShop()
		game.innerHTML = ""
		update()
		
	} else {
		shop.innerHTML = ""
		game.innerHTML = gameHTML
		update()
		updateInv(0)
	}
}

function loadShop() {
	var innerHTML = `<div class="inwindow" id="shopc">`
	itemsh = ""
	items.forEach(i => itemsh+=itemGEN(i))
	if (itemsh == "") itemsh = `<h1 style="margin-left: 10px;margin-right: 10px;">Вы приобрели все предметы :3</h1>`
	var shop = document.getElementById("shop")
	shop.innerHTML=innerHTML+itemsh+"</div>"
}

function buyItem(id) {
	var item = items.find(i => i.id == id)
	if (Storage.data.balance < item.price) return alert("Недостаточно средств!")
	if (Storage.data.lvl < item.lvl) return alert("Недостаточный уровень!") 
	Storage.data.balance -= item.price
	Storage.data.inventory.push(item.id)
	Storage.save()
	loadShop()
	update()
}

function updateInv(page) {
	invi = document.getElementById("invi");
	
	invitems = ""
	for (var b = 0+(page*3); b<3+(page*3); b++) {
		i = Storage.data.inventory[b]
		if(!i) break
		var ii = items.find(iii => iii.id == i)
		var hr = ""
		ii.harks.forEach(i => {
			hr += `${i.name}: +${i.value}<br>`
		})
		invitems+=`<div class="item"><h3 style="margin: 0px">${ii.name}</h3><a>${hr}</a><button class="button" onclick="${Storage.data.weared.find(yyy => yyy == i) ? "unwear" : "wear"}(${ii.id}, ${page})" style="margin-top: 10;">${Storage.data.weared.find(yyy => yyy == i) ? "Снять" : "Надеть"}</button></div>`
	}
	if (page >=1) invitems += `<button class="button" onclick="updateInv(${page-1})"><h2 style="margin: 0;">&lt;</h2></button>`
	if (Storage.data.inventory.length > (page*3+3)) invitems += `<button class="button" onclick="updateInv(${page+1})"><h2 style="margin: 0;">&gt;</h2></button>`
	if (invitems == "") invitems = `<h1 style="margin-left: 10px;margin-right: 10px;">Пусто :(</h1>`
	invi.innerHTML = invitems
	updateProfile()
}

function updateGame() {
	var gamec = document.getElementById("gamec")
	if (gamec) {
	var row = document.getElementById("row")
	gamec.style.maxWidth=row.clientWidth-215-15-3-15
	gamec.style.height = window.innerHeight-43-15-15
	
	profile.style.maxHeight=gamec.style.maxWidth-38-15
	}
}

function wear(id, page) {
	Storage.data.weared.push(id)
	updateInv(page)
	Storage.save()
}

function unwear(id, page) {
	Storage.data.weared.splice(Storage.data.weared.indexOf(id), 1)
	updateInv(page)
	Storage.save()
}

function updateProfile() {
	var profile = document.getElementById("profile");
	profile.innerHTML =`<h4 style="margin-top: 0px">Профиль:</h4><a id="money" class="inrow" style="margin-left: unset;position: unset;top: unset;"></a><div style="max-height: 11;"><a><br></a></div><a id="exp" value="10" max="100" class="inrow" style="margin-left: unset;position: unset;top: unset;"></a>`
	update()
	var dmg = Storage.data.dmg
	var def = Storage.data.def
	var l = Storage.data.l
	var mh = Storage.data.mh
	
	Storage.data.weared.forEach(i => {
		var harks = Util.calcHarks(i)
		dmg+=harks[0]
		def+=harks[1]
		l+=harks[2]
		mh+=harks[3]
	})
	profile.innerHTML+=`<div style="max-height: 8;"><a><br></a></div><a>Здоровье: ${mh}</a><div style="max-height: 5;"><a><br></a></div><a>Защита: ${def}</a><div style="max-height: 5;"><a><br></a></div><a>Ловкость: ${l}</a><div style="max-height: 5;"><a><br></a></div><a>Урон: ${dmg}</a>`
}




function update() {
	updateBalance()
	updateLevel()
	updateGame()
}

function init() {
	update()
	updateInv(0)
}

setTimeout(init, 100)
setInterval(updateGame, 100)