const ACCESS_KEY = CONFIG.UNSPLASH_ACCESS_KEY;

async function updateBackground() {
  const lastUpdate = localStorage.getItem('lastBgUpdate');
  const today = new Date().toDateString();

  // 前回更新が今日でない場合のみAPIを叩く
  if (lastUpdate !== today) {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=city&orientation=landscape&client_id=${ACCESS_KEY}`);
      const data = await response.json();
      const imageUrl = data.urls.regular;

      // URLを保存し、背景に設定
      localStorage.setItem('cachedBgUrl', imageUrl);
      localStorage.setItem('lastBgUpdate', today);
      document.body.style.backgroundImage = `url('${imageUrl}')`;
    } catch (error) {
      console.error('背景画像の取得に失敗しました', error);
    }
  } else {
    // 保存されているURLを適用
    const cachedUrl = localStorage.getItem('cachedBgUrl');
    if (cachedUrl) {
      document.body.style.backgroundImage = `url('${cachedUrl}')`;
    }
  }
}

// 時計の更新処理（以前のコード）
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('ja-JP', { hour12: false });
}

// script.js に追加
async function updateWeather() {
  const API_KEY = CONFIG.WEATHER_API_KEY;

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      // 緯度経度から取得
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${API_KEY}`
      );
      const data = await response.json();

      const temp = Math.round(data.main.temp);
      const description = data.weather[0].description;
      
      // data.name には通常「市」レベルの名前が入ります
      // もし町名などの細かい名前が返ってくる場合は、管理画面やクエリで調整可能です
      const cityName = data.name; 

      document.getElementById('weather').textContent = `${cityName}: ${description} ${temp}℃`;
    } catch (error) {
      console.error('天気情報の取得に失敗しました', error);
      document.getElementById('weather').textContent = '天気取得エラー';
    }
  });
}

setInterval(updateClock, 1000);
updateClock();
updateWeather();
updateBackground(); // 背景更新を実行