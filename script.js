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

setInterval(updateClock, 1000);
updateClock();
updateBackground(); // 背景更新を実行