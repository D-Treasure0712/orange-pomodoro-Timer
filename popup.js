const taskValue = document.getElementsByClassName('task_value')[0];
const taskSubmit = document.getElementsByClassName('task_submit')[0];
const taskList = document.getElementsByClassName('task_list')[0];
const selectedTaskDisplay = document.getElementById('selected-task-display');
let taskToDelete = null;

// キーダウンイベントをリッスンする最悪の手段
document.addEventListener('keydown', function(event) {
  // Enterキーが押された場合
  if (event.key === 'Enter' || event.keyCode === 13) {
    // イベントをキャンセルする
    event.preventDefault();
    // 何も実行しない
  }
});

// 追加ボタンを作成
const addTasks = (task) => {
  // 入力したタスクを追加・表示
  const listItem = document.createElement('li');
  const showItem = taskList.appendChild(listItem);
  showItem.innerHTML = task;
  

  // タスクに削除ボタンを付与
  const deleteButton = document.createElement('button');
  const editButton = document.createElement('button');
  const SelectButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  listItem.appendChild(deleteButton);
  SelectButton.innerHTML = 'Select';
  listItem.appendChild(SelectButton);
  editButton.innerHTML = 'Edit';
  listItem.appendChild(editButton);

  // 削除ボタンをクリックし、イベントを発動（タスクが削除）
  deleteButton.addEventListener('click', evt => {
    evt.preventDefault();
    taskToDelete = deleteButton;
    confirmDialog.style.display = 'flex';
    // deleteTasks(deleteButton);
  });

  // 選択ボタンをクリックし、イベントを発動
  SelectButton.addEventListener('click', evt => {
    evt.preventDefault();
    displaySelectedTask(task);
  });

//編集機能（ボタン）
  editButton.addEventListener('click', evt => {
    evt.preventDefault();
    editTasks(editButton);
  });

};

// 選択されたタスク名を表示する関数
function displaySelectedTask(task) {
  selectedTaskDisplay.textContent = task;
}



// 削除ボタンにタスクを消す機能を付与
const deleteTasks = (deleteButton) => {
  const chosenTask = deleteButton.closest('li');
  taskList.removeChild(chosenTask);
  selectedTaskDisplay.textContent = ''; // 選択されたタスク名をクリア
};

// 編集機能
const editTasks = (editButton) => {
    const taskList = editButton.closest('li');
    const taskText = taskList.firstChild.textContent;
  
    // プロンプトでタスクの新しい内容を入力
    const newTaskText = prompt('新しいタスク内容を入力してください', taskText);
  
    // 新しい内容が入力された場合
    if (newTaskText !== null && newTaskText.trim() !== '') {
      // タスクの内容を更新
      taskList.firstChild.textContent = newTaskText;
    };
};
  
// 追加ボタンをクリックし、イベントを発動（タスクが追加）
taskSubmit.addEventListener('click', evt => {
  evt.preventDefault();
  const task = taskValue.value;
  addTasks(task);
  taskValue.value = '';
});

taskSubmit.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
      e.preventDefault();
      const task = taskValue.value;
      addTasks(task);
      //taskValue.value = '';}
  }
});

// 確認ダイアログのボタンのイベントリスナー
confirmYes.addEventListener('click', () => {
  deleteTasks(taskToDelete);
  confirmDialog.style.display = 'none';
});

confirmNo.addEventListener('click', () => {
  confirmDialog.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {

/*
  // 選択したタスクを取得して表示
  chrome.storage.sync.get('selectedTask', function(data) {
    const selectedTask = data.selectedTask || '';
    selectedTaskElement.textContent = selectedTask;
  });
*/

  var times = 25 * 60; // 残り秒数 (25分)
  var times_interval = 5 * 60; // interval time 5min
  var circleElement = document.querySelector('.circle2');
  changeTimes(times);
  var reset_times = false;
  var isTimerCompleted = false;
  var interval_session = false;
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒

  function changeTimes(seconds) {
    // var seconds = minutes * 60;
    updateCurrentSeconds(seconds);
  }

  async function startAnimation() {
    startButton.style.display = 'none';
    stopButton.style.display = '';
    if (!reset_times) {
      reset_times = true;
      // smoothTransition(times);
      let set = 1;
      let count_limit = set * 2;
      for(let count = 0; count < count_limit; count++){
        if(interval_session == false){
          await smoothTransition(times,0);
          await sleep(times*1000);
          reset_times = true;
          await smoothTransition(times_interval,1);
        }else{
          await smoothTransition(times_interval,1);
          // await sleep(times_interval*1000);
        }
        interval_session = !interval_session;
      }
    }
  }

  function updateCurrentSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Add leading zero if necessary
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (remainingSeconds < 10) {
      remainingSeconds = '0' + remainingSeconds;
    }

    document.getElementById('currentSeconds').textContent = minutes + ':' + remainingSeconds;
  }

// 中心角を変更する関数
  function changeAngle(angle, times_animat, bunki) {
    if(bunki == 0){
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
        circleElement.style.display = 'none';
      }
    }
    if(bunki == 1){
      if(angle < 65){
        document.getElementById('triangle10').style.setProperty('--angle', angle);
      }else if(angle < 125){
        document.getElementById('triangle20').style.setProperty('--angle', angle - 60);
      }else if(angle < 185){
        document.getElementById('triangle30').style.setProperty('--angle', angle - 120);
      }else if(angle < 245){
        document.getElementById('triangle40').style.setProperty('--angle', angle - 180);
      }else if(angle < 305){
        document.getElementById('triangle50').style.setProperty('--angle', angle - 240);
      }else if(angle < 360){
        if(angle < 360){
          document.getElementById('triangle60').style.setProperty('--angle', angle - 300);
        }else{
          document.getElementById('triangle60').style.setProperty('--angle', 65);
        }
      }else{
        circleElement.style.display = '';
        reset_angle1();
      }
    }

      // 現在の秒数を更新
      let remainingSeconds = times_animat - (angle / 360 * times_animat);
      if (remainingSeconds > 0) {
        updateCurrentSeconds(remainingSeconds);
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
  function reset_angle1() {
    var triangleElements = document.querySelectorAll('.triangle10, .triangle20, .triangle30, .triangle40, .triangle50, .triangle60');
    for (var i = 0; i < triangleElements.length; i++) {
      triangleElements[i].style.setProperty('--angle', 0);
      startButton.style.display = '';
      stopButton.style.display = 'none';
    }
  }

  function all_reset() {
    circleElement.style.display = '';
    reset_angle()
    reset_angle1()
    reset_times = false;
  }

  async function smoothTransition(times_animat, bunki) {
    var currentAngle = 0;
    var duration = 1000 * times_animat;
    var startTime = performance.now();
    var animation = setInterval(function() {
      var elapsed = performance.now() - startTime;
      currentAngle = (360) * (elapsed / duration);
      changeAngle(currentAngle, times_animat, bunki);

      if (elapsed >= duration || !reset_times) {
        clearInterval(animation);
        updateCurrentSeconds(times_animat);
        if (times_animat === 0) {
          isTimerCompleted = true;
        } else {
          reset_angle();
        }
        reset_times = false;
      }
    }, 1000 / 60);
  }

  // var startButton = document.querySelector('button[onclick="startAnimation()"]');
  // var resetButton = document.querySelector('button[onclick="all_reset()"]');
  var startButton = document.getElementById('startStopButton');
  var resetButton = document.getElementById('resetButton');
  var stopButton = document.getElementById('stopButton');
  var restartButton = document.getElementById('resatartButton');

  stopButton.style.display = 'none';
  restartButton.style.display = 'none';

  startButton.addEventListener('click', startAnimation);
  resetButton.addEventListener('click', all_reset);
  // stopButton.addEventListener("click", stop); 

});