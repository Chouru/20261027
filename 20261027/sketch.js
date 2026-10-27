// 宣告全域變數，用來存放載入的圖片精靈（Sprite Sheet）
let walkSprite;

// 宣告變數記錄角色目前的 X 座標位置
let charX;

// 宣告變數記錄角色目前的 Y 座標位置
let charY;

// 宣告變數設定角色的移動速度（像素）
let speed = 4;

// 宣告變數記錄目前播放的動畫影格（Frame）索引（0 到 5）
let currentFrame = 0;

// 宣告變數作為影格計數器，用來控制動畫播放的速度
let frameCounter = 0;

// 宣告變數記錄角色面向的方向（1 表示向右，-1 表示向左）
let facing = 1;

// 宣告布林變數記錄角色目前是否正在移動
let isMoving = false;

// 預載入函式，在程式執行前優先載入外部圖片資源
function preload() {
  // 載入位於 1/走/walk.png 的橫向圖片精靈圖檔
  walkSprite = loadImage('1/走/walk.png');
}

// 初始化設定函式，於程式啟動時執行一次
function setup() {
  // 建立一個寬高佔滿整個瀏覽器視窗的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 將圖片繪製的對齊基準點設定在圖片正中心
  imageMode(CENTER);
  
  // 初始化角色 X 座標在畫布正中央
  charX = width / 2;
  
  // 初始化角色 Y 座標在畫布正中央
  charY = height / 2;
}

// 繪製迴圈函式，每秒以固定影格率持續重新繪製畫面
function draw() {
  // 將畫布背景顏色設定為指定的色票 #bde0fe
  background('#bde0fe');

  // 每次進入迴圈時，先將移動狀態預設為 false（停止）
  isMoving = false;

  // 檢查使用者是否按下了鍵盤的右方向鍵
  if (keyIsDown(RIGHT_ARROW)) {
    // 將角色的 X 座標向右增加速度值
    charX += speed;
    
    // 設定角色面向右方（比例係數為 1）
    facing = 1;
    
    // 將移動狀態設為 true
    isMoving = true;
  }
  // 檢查使用者是否按下了鍵盤的左方向鍵
  else if (keyIsDown(LEFT_ARROW)) {
    // 將角色的 X 座標向左扣除速度值
    charX -= speed;
    
    // 設定角色面向左方（比例係數為 -1 進行水平鏡射翻轉）
    facing = -1;
    
    // 將移動狀態設為 true
    isMoving = true;
  }

  // 如果角色目前處於移動狀態，則更新動畫影格
  if (isMoving) {
    // 累加影格計數器
    frameCounter++;
    
    // 每經過 6 個繪製影格就切換一次動畫圖片
    if (frameCounter % 6 === 0) {
      // 利用取餘數運算循環切換 6 張圖片（索引 0 到 5）
      currentFrame = (currentFrame + 1) % 6;
    }
  } else {
    // 如果角色沒有移動，則固定顯示第 0 張靜止畫面
    currentFrame = 0;
    
    // 同時將計數器歸零
    frameCounter = 0;
  }

  // 儲存目前的畫布變換狀態
  push();
  
  // 將畫布座標原點平移至角色目前的中心位置（charX, charY）
  translate(charX, charY);
  
  // 根據 facing 的值進行水平縮放（1 為正常向右，-1 為水平翻轉向左）
  scale(facing, 1);

  // 計算圖片精靈中單張圖格的寬度（總寬 757 除以 6 張圖片）
  let frameWidth = walkSprite.width / 6;
  
  // 取得圖片精靈的總高度（150）
  let frameHeight = walkSprite.height;

  // 在平移後的座標原點繪製目前影格對應的裁切圖片
  image(
    walkSprite,           // 來源圖片精靈物件
    0,                    // 繪製在原點的 X 座標
    0,                    // 繪製在原點的 Y 座標
    frameWidth,           // 繪製到畫布上的寬度
    frameHeight,          // 繪製到畫布上的高度
    currentFrame * frameWidth, // 來源圖片中要切割的起始 X 座標
    0,                    // 來源圖片中要切割的起始 Y 座標
    frameWidth,           // 來源圖片中要切割的寬度
    frameHeight           // 來源圖片中要切割的高度
  );

  // 恢復先前儲存的畫布變換狀態
  pop();
}

// 當瀏覽器視窗大小改變時自動觸發的函式
function windowResized() {
  // 自動調整畫布大小以適應新的視窗寬高
  resizeCanvas(windowWidth, windowHeight);
}