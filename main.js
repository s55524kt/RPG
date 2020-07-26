//名前
let plyName = prompt("名前を入力してください");
let flag = true;
//プレイヤーデータ
let plyLv = 1;
let plyHp = 6;
let plyHpmax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 50, 100, 175, 200, 250, 300, 400, 550];
let plyImg = document.getElementById("plyImg");
let plySt = new Array(6);
for (let i = 0; i < 6; i++) {
  plySt[i] = document.getElementById(plySt[i]);
}
//敵データ
let eneImg = document.getElementById("eneImg");
let eneSt = new Array(4);
for (let i = 0; i < 4; i++) {
  eneSt[i] = document.getElementById(eneSt[i]);
}
let eneLv = 1;
let eneHp = 10;
let eneHpMax0 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 500];
let eneAtt0 = [2, 3, 4, 5, 7, 7, 8, 9, 15, 30];
let eneKill0 = 0;
let eneExp0 = [1, 2, 3, 4, 6, 8, 9, 10, 11, 0];
let eneCnt = 5;
let eneCntMax0 = 5;
//敵の名前
const enename0 = [
  "スライム",
  "コウモリ",
  "ミツキー",
  "ヘビ",
  "オオカミ",
  "いきもの",
  "ゆうれい",
  "小さな巨人",
  "冷たい火の玉",
  "ウラガンキン",
];
eneSt0.textContent = enename0[eneLv - 1];
//背景データ
let color = document.getElementById("background");
let bg = [
  "greenyellow",
  "greenyellow",
  "greenyellow",
  "aqua",
  "aqua",
  "aqua",
  "purple",
  "purple",
  "purple",
  "#ff7f27",
];
//大爆発の処理
let bom = document.getElementById("bom");
bom.addEventListener("click", () => {
  eneSec.textContent = "ゲームオーバー";
  eneSec.style.color = "red";
  flag = false;
});
//仲間を呼ぶ
let na = document.getElementById("nakama");
na.addEventListener("click", () => {
  if (flag) {
    alert("しかし何も起こらなかった");
  } else {
    flag = true;
    alert("仲間の回復で復活した!");
    eneSec.textContent = "時が止まった";
  }
});
//プレイヤー名
plySt0.textContent = plyName;
//プレイヤー回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyHp += plyHeal;
    plyImg.src = "RPG/playerC.png";
    if (plyHp > plyHpmax) {
      plyHp = plyHpmax;
    }
    plySt2.textContent = "HP:" + plyHp;
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "RPG/playerA.png";
  }
});
//敵を攻撃
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "RPG/enemyB" + (eneLv - 1) + ".png";
    if (eneHp > plyAtt) {
      eneHp -= plyAtt;
    } else {
      eneHp = eneHpMax0[eneLv - 1];
      eneKill0++;
      eneSt4.textContent = "倒した回数:" + eneKill0;

      //経験値の処理
      plyExp += eneExp0[eneLv - 1];
      plySt5.textContent = "経験値:" + plyExp;
      plyExpNext -= eneExp0[eneLv - 1];

      //レベルアップの処理
      if (plyExpNext <= 0) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        plySt1.textContent = "レベル:" + plyLv;
        plyHpmax += 3;
        plyHp = plyHpmax;
        plySt2.textContent = "HP:" + plyHp;
        plyAtt += 2;
        plySt3.textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法" + plyHeal;
        //武器をもらう
        if (plyLv == 5) {
          alert("落ちてた剣を拾った(攻撃力+5)");
          plyAtt += 5;
          plySt3.textContent = "攻撃力:" + plyAtt;
        }
        if (plyLv == 7) {
          alert("拾った防具を着た(最大体力+10)");
          plyHpmax += 10;
          plyHp = plyHpmax;
          plySt2.textContent = "HP:" + plyHp;
        }
      }
      plySt6.textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
    //ゲームクリアの処理
    if (eneLv == 10 && eneHp < plyAtt) {
      eneImg.src = "RPG/clear.png";
      eneHp = 0;
      eneSt2.textContent = "HP:0";
      flag = false;
    }
  }
  eneSt2.textContent = "HP:" + eneHp;
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "RPG/enemyA" + (eneLv - 1) + ".png";
  }
});
//敵が時間ごとに攻撃攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (flag) {
    if (eneCnt > 0) {
      eneCnt--;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    } else {
      plyImg.src = "RPG/playerB.png";
      if (plyHp > eneAtt0[eneLv - 1]) {
        plyHp -= eneAtt0[eneLv - 1];
        plySt2.textContent = "HP:" + plyHp;
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
      } else {
        plyHp = 0;
        clearInterval(loop);
        flag = false;
        plySt2.textContent = "HP:" + plyHp;
        eneSec.textContent = "ゲームオーバー";
      }
      setTimeout(() => {
        if (flag) {
          eneCnt = eneCntMax0;
          plyImg.src = "RPG/playerA.png";
        }
      }, 500);
    }
  }
}, 1000);
//次のモンスターに行く
let right = document.getElementById("right");
right.addEventListener("click", () => {
  if (flag) {
    eneLv++;
    eneImg.src = "RPG/enemyA" + (eneLv - 1) + ".png";
    eneSt0.textContent = enename0[eneLv - 1];
    //背景
    color.style.backgroundColor = bg[eneLv - 1];
    //モンスターの強さ
    eneHp = eneHpMax0[eneLv - 1];
    eneSt1.textContent = "レベル:" + eneLv;
    eneSt2.textContent = "HP:" + eneHpMax0[eneLv - 1];
    eneSt3.textContent = "攻撃力:" + eneAtt0[eneLv - 1];
    //熊で次を押したとき
    if (eneLv >= 10) {
      eneLv = 10;
      eneSt1.textContent = "レベル:" + eneLv;
      eneImg.src = "RPG/enemyA" + (eneLv - 1) + ".png";
      eneSt0.textContent = enename0[eneLv - 1];
      eneHp = eneHpMax0[eneLv - 1];
      eneSt2.textContent = "HP:" + eneHpMax0[eneLv - 1];
      eneSt3.textContent = "攻撃力:" + eneAtt0[eneLv - 1];
    }
  }
});
//逃げる動作
let left = document.getElementById("left");
left.addEventListener("click", () => {
  if (flag) {
    eneLv--;
    console.log(bg[eneLv - 1]);
    eneImg.src = "RPG/enemyA" + (eneLv - 1) + ".png";
    eneSt0.textContent = enename0[eneLv - 1];
    //背景
    color.style.backgroundColor = bg[eneLv - 1];
    //モンスターの強さ
    eneHp = eneHpMax0[eneLv - 1];
    eneSt1.textContent = "レベル:" + eneLv;
    eneSt2.textContent = "HP:" + eneHpMax0[eneLv - 1];
    eneSt3.textContent = "攻撃力:" + eneAtt0[eneLv - 1];
    //スライムで戻るを押したとき
    if (eneLv <= 0) {
      eneLv = 1;
      eneSt1.textContent = "レベル:" + eneLv;
      eneImg.src = "RPG/enemyA" + (eneLv - 1) + ".png";
      eneSt0.textContent = enename0[eneLv - 1];
      eneHp = eneHpMax0[eneLv - 1];
      eneSt2.textContent = "HP:" + eneHpMax0[eneLv - 1];
      eneSt3.textContent = "攻撃力:" + eneAtt0[eneLv - 1];
    }
  }
});
