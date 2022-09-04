
      const clock = document.getElementById('clock');
      setInterval(() => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();

        clock.innerHTML = `${hour} : ${minute} : ${second}`;
      }, 1000);
    