<html>
	<head>
		<title>RPG Game</title>
	</head>
	<body>
		<link rel="stylesheet" href="./style.css">
		<script src="./script.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<div class="row" id="row">
			<a id="money" class="inrow"><img width="12" height="12" src="./images/coin.png"> 0</a>
			<a id="exp" value="10" max="100" class="inrow"><img width="12" height="12" src="./images/star.png"> 0<progress id="expb" value="0" max="0" style="margin-left: 5px"></progress></a>
			<button class="inrow" id="shopButton" onClick="toggleShop()">Магазин</button>
			<div class="inrow" style="max-width: 182; position: absolute; right: 2px; top: 8px"><a>Hosted using <a href="https://pages.github.com/" style="color: white">Github pages</a></a></div>
		</div>
		<div class="window" id="game">
		<div class="inv">
			<a>Инвентарь</a>
			<div class="invi" id="invi">
			
			</div>
		</div>
		<div class="gamec" id="gamec" style="max-width: 755px; height: 581px;">
			<button class="button" onclick="attack()">В бой</button>
			<button class="button" onclick="upg()">Прокачки</button>
			<div class="profile" id="profile">
				<a id="money" class="inrow" style="margin-left: unset;position: unset;top: unset;"><img width="12" height="12" src="./images/coin.png"> 0</a>
				<div style="max-height: 11;">
					<a>
						<br>
					</a>
				</div>
				<a id="exp" value="10" max="100" class="inrow" style="margin-left: unset;position: unset;top: unset;"><img width="12" height="12" src="./images/star.png"> 0<progress id="expb" value="0" max="0" style="margin-left: 5px"></progress></a>
			</div>
		</div>
		</div>
		<div class="window" id="shop">
		</div>
	</body>
</html>
