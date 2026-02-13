function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('ja-JP', { hour12: false });
  document.getElementById('clock').textContent = timeString;
}

// 1秒ごとに更新
setInterval(updateClock, 1000);
updateClock(); // 読み込み時にも実行