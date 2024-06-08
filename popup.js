/* popup.js */

/* 
------------------------------------------------------------
HTML要素の取得
taskValue、taskSubmit、taskList、selectedTaskDisplayは、各要素のクラス名やID名を基にHTMLの要素を取得します。
taskToDeleteは、削除するタスクを一時的に保持するための変数です。
------------------------------------------------------------
*/
//constは定数を宣言するためのキーワード（再代入不可）
//document:現在のHTML全体を示すオブジェクト
//getElementsByClassName:documentオブジェクトのメソッド
taskValue = document.getElementsByClassName('task_value')[0];
const taskSubmit = document.getElementsByClassName('task_submit')[0];
const taskList = document.getElementsByClassName('task_list')[0];
const selectedTaskDisplay = document.getElementById('selected-task-display');
let taskToDelete = null;



/* 
-----------------------------------------------------------
キーダウンイベントのリッスン
ドキュメント全体に対してkeydownイベントのリスナーを追加する
ここでは，Enterキーが押されたとき，デフォルトの動作をキャンセル（なにもしないように）する
-----------------------------------------------------------
*/
// キーダウンイベントをリッスンする最悪の手段
document.addEventListener('keydown', function(event) {
  // Enterキーが押された場合
  if (event.key === 'Enter' || event.keyCode === 13) {
    // イベントをキャンセルする
    event.preventDefault();
    // 何も実行しない
  }
});



/*
-------------------------------------------------------------------
タスクの追加機能
addTasks関数：タスクを追加するための関数です。
listItemを作成してタスクの内容を設定します。
削除、編集、選択ボタンを追加します。
各ボタンにイベントリスナーを追加します。
-------------------------------------------------------------------
*/
//関数宣言
const addTasks = (task) => {
  //定数の宣言：新しく作成された<li>要素を保持
  const listItem = document.createElement('li');

  //定数の宣言：tasklist要素にlistItem要素を子として受け取る
  const showItem = taskList.appendChild(listItem);

  //リストアイテムの内容をタスクの内容に設定
  showItem.innerHTML = task;
  

  // 削除・編集・選択ボタンの作成
  const deleteButton = document.createElement('button');
  const editButton = document.createElement('button');
  const SelectButton = document.createElement('button');
  
  //ボタンの表示テキストをSelectにする
  SelectButton.innerHTML = 'Select';

  //SelectButtunをlistItem要素の子として追加
  listItem.appendChild(SelectButton);

  //ボタンの表示テキストをEditにする
  editButton.innerHTML = 'Edit';

  //editButtunをlistItem要素の子として追加
  listItem.appendChild(editButton);

  //ボタンの表示テキストをDeleteにする
  deleteButton.innerHTML = 'Delete';

  //deleteButtunをlistItem要素の子として追加
  listItem.appendChild(deleteButton);

/*
-----------------------------------------------------------
削除ボタンクリック時のイベント発動
-----------------------------------------------------------
*/
  // 削除ボタンをクリックし、イベントを発動（タスクが削除）
  deleteButton.addEventListener('click', evt => {
    //イベントのデフォルト動作をキャンセル
    evt.preventDefault();

    //taskToDelete変数にdeleteButtonを代入（後で削除するボタンが特定される）
    taskToDelete = deleteButton;

    //confirmDialog要素の表示スタイルを'flex'に設定し、ダイアログを表示します。
    confirmDialog.style.display = 'flex';
  });

/*
-----------------------------------------------------------
選択ボタンクリック時のイベント発動
-----------------------------------------------------------
*/

  // 選択ボタンをクリックし、イベントを発動
  SelectButton.addEventListener('click', evt => {
    //イベントのデフォルト動作をキャンセル
    evt.preventDefault();

    //displaySelectedTask関数を呼び出し、選択されたタスクを表示します。（taskは選択されたタスクの内容）
    displaySelectedTask(task);
  });

/*
----------------------------------------------------------
編集ボタンクリック時のイベント発動
---------------------------------------------------------
*/
  editButton.addEventListener('click', evt => {
    //イベントのデフォルト動作をキャンセル
    evt.preventDefault();

    //editTasks関数を呼び出し，タスクを編集する（editButtonは編集ボタン）
    editTasks(editButton);
  });
};



/* 
--------------------------------------------------
選択されたタスクを表示する関数
--------------------------------------------------
*/
// 選択されたタスク名を表示する関数
function displaySelectedTask(task) {
  selectedTaskDisplay.textContent = task;
}


/*
-------------------------------------------------
タスクの削除機能
deleteTasks関数：指定されたタスクを削除するための関数です。
chosenTaskを取得し、リストから削除します。
loadTasks関数でタスクを読み込み、削除されたタスクを配列から削除します。
-------------------------------------------------------------------
*/
// 削除ボタンにタスクを消す機能を付与
const deleteTasks = (deleteButton, task) => {
  const chosenTask = deleteButton.closest('li');
  taskList.removeChild(chosenTask);
  selectedTaskDisplay.textContent = ''; // 選択されたタスク名をクリア
};




/* 
-----------------------------------------------------------------------
タスクの編集機能
editTasks関数：指定されたタスクを編集するための関数です。
新しいタスク内容をプロンプトで入力させます。
新しい内容が入力された場合、タスクの内容を更新し、ローカルストレージも更新します。
---------------------------------------------------------------------------
*/
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



/* 
---------------------------------------------------------------------------
タスクの追加ボタンのイベントリスナー
追加ボタンをクリックしたときの処理です。
フォームのデフォルトの動作をキャンセルします。
タスクを追加し、ローカルストレージに保存します。
----------------------------------------------------------------------------
*/
// 追加ボタンをクリックし、イベントを発動（タスクが追加）
taskSubmit.addEventListener('click', evt => {
  evt.preventDefault();
  const task = taskValue.value;
  addTasks(task);
  taskValue.value = '';
});


/*
----------------------------------------------------------------------------
削除時の確認ダイヤログのボタンのイベントリスナー
confirmYesとconfirmNoのクリックイベントをリッスンします。
Yesボタンがクリックされた場合、タスクを削除します。
Noボタンがクリックされた場合、ダイアログを非表示にします。
-----------------------------------------------------------------------------
*/
// 確認ダイアログのボタンのイベントリスナー
confirmYes.addEventListener('click', () => {
  deleteTasks(taskToDelete);
  confirmDialog.style.display = 'none';
});

confirmNo.addEventListener('click', () => {
  confirmDialog.style.display = 'none';
});



/*
ここからはポモドーロタイマーのスクリプトです
*/

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