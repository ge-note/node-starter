
      const clock = document.getElementById('clock');
      clock.innerHTML = getTime();

      setInterval(() => {
        clock.innerHTML = getTime();
      }, 1000);

      // 获取时间
      function getTime() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        return `${padZero(hour)} : ${padZero(minute)} : ${padZero(second)}`;
      }

      // 补0
      function padZero(num) {
        return num < 9 ? `0${num}` : num;
      }
    