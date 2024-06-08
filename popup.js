document.addEventListener('DOMContentLoaded', function() {
  var times = 25 * 60; // 残り秒数 (25分)
  changeTimes(times);
  var reset_times = false;
  var isTimerCompleted = false;

  function changeTimes(minutes) {
    var seconds = minutes * 60;
    updateCurrentSeconds(seconds);
  }

  function startAnimation() {
    if (!reset_times) {
      reset_times = true;
      smoothTransition();
    }
  }

  function updateCurrentSeconds(seconds) {
    document.getElementById('currentSeconds').textContent = Math.floor(seconds);
  }

// 中心角を変更する関数
function changeAngle(angle, times_animat) {
  var circleElement = document.querySelector('.circle');

  if(angle < 65){
    document.getElementById('triangle1').style.setProperty('--angle', angle);
  }else if(angle < 125){
    document.getElementById('triangle2').style.setProperty('--angle', angle - 60);
  }else if(angle < 185){
    document.getElementById('triangle3').style.setProperty('--angle', angle - 120);
  }else if(angle < 245){
    document.getElementById('triangle4').style.setProperty('--angle', angle - 180);
  }else if(angle < 305){
    document.getElementById('triangle5').style.setProperty('--angle', angle - 240);
  }else if(angle < 360){
    if(angle < 360){
      document.getElementById('triangle6').style.setProperty('--angle', angle - 300);
    }else{
      document.getElementById('triangle6').style.setProperty('--angle', 65);
    }
  }else{
    reset_angle();
  }

  // 現在の秒数を更新
  if (times_animat - (angle / 360 * times_animat) > 0) {
    updateCurrentSeconds(times_animat - (angle / 360 * times_animat));
  } else {
    updateCurrentSeconds(0);
  }
}

  function reset_angle() {
    var triangleElements = document.querySelectorAll('.triangle1, .triangle2, .triangle3, .triangle4, .triangle5, .triangle6');
    for (var i = 0; i < triangleElements.length; i++) {
      triangleElements[i].style.setProperty('--angle', 0);
    }
  }

  function all_reset() {
    reset_times = false;
  }

  function smoothTransition() {
    var currentAngle = 0;
    var times_animat = document.getElementById('time').value * 60; // 分をカウント時間の秒数に変換
    var duration = 1000 * times_animat;
    var startTime = performance.now();
    var animation = setInterval(function() {
      var elapsed = performance.now() - startTime;
      currentAngle = (360) * (elapsed / duration);
      changeAngle(currentAngle, times_animat);

      if (elapsed >= duration || !reset_times) {
        clearInterval(animation);
        updateCurrentSeconds(times_animat);
        if (times_animat === 0) {
          isTimerCompleted = true;
          var circleElement = document.querySelector('.circle');
          circleElement.style.backgroundColor = '#f3c87d';
          disableStartButton();
        } else {
          reset_angle();
        }
        reset_times = false;
      }
    }, 1000 / 60);
  }

  var startButton = document.querySelector('button[onclick="startAnimation()"]');
  var resetButton = document.querySelector('button[onclick="all_reset()"]');

  startButton.addEventListener('click', startAnimation);
  resetButton.addEventListener('click', all_reset);
});