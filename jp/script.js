/*
Copyright (c) 2024 Keisuke Hattori

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


// グローバル設定
let penaltyThreshold = 5; // ミスタイプのペナルティ閾値
let typingDuration = 60; // 入力セッションの秒数
let strategyDuration = 90; // 作戦タイムの秒数
let googleSpreadsheetUrl = 'https://script.google.com/macros/s/AKfycbwxxXBIPdTMWauw22onm0-9M_j2R7HiyiQjTyamROOb-HVwFqGzgaJSbc5tFJvbEHhZpg/exec'; // Google SpreadsheetのウェブアプリURL

//設定はここまで



let sessionCount = 0;
let sessionCounts = [{ slaps: 0, chars: 0, cheated: false, score: 0 }, { slaps: 0, chars: 0, cheated: false, score: 0 }, { slaps: 0, chars: 0, cheated: false, score: 0 }];

let userId1, userId2;



function confirmId() {
  userId1 = document.getElementById('userId1').value;
  userId2 = document.getElementById('userId2').value;
  const fullWidthPattern = /[^\x00-\x7F]+/;

  if (userId1.trim() === '' || userId2.trim() === '') {
    alert('IDを入力してください。');
  } else if (fullWidthPattern.test(userId1) || fullWidthPattern.test(userId2)) {
    alert('IDは半角英数字で入力してください。');
  } else {
    document.getElementById('userId1').style.display = 'none';
    document.getElementById('userId2').style.display = 'none';
    document.getElementById('confirmIdButton').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';
  }
}





document.getElementById('startButton').addEventListener('click', function() {
    this.style.display = 'none';
    startSession();
});

function startSession() {
    if (sessionCount < 3) {
        countdown(3, startTypingSession);
    } else {
        displayFinalRecord();
    }
}

function countdown(duration, callback) {
    let timeLeft = duration;
    const countdownElement = document.getElementById('countdown');
    countdownElement.innerText = timeLeft;

    function decrementTime() {
        timeLeft--;
        countdownElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            countdownElement.innerText = '';
            callback();
        } else {
            setTimeout(decrementTime, 1000);
        }
    }

    setTimeout(decrementTime, 1000);
}



function startTypingSession() {
    document.getElementById('sessionNumber').innerText = `セッション ${sessionCount + 1}`;
    document.getElementById('strategyTime').innerText = '';
    document.getElementById('result').innerText = '';
    sessionCounts[sessionCount].cheated = false;
    document.getElementById('textInput').disabled = false;
    document.getElementById('textInput').value = '';
    document.getElementById('textInput').focus();

    document.getElementById('textInput').addEventListener('copy', function(e) {
        sessionCounts[sessionCount].cheated = true;
    });
    document.getElementById('textInput').addEventListener('paste', function(e) {
        sessionCounts[sessionCount].cheated = true;
    });

    document.getElementById('textInput').addEventListener('keydown', function(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault();
			}
	 if (event.key === ' ' || event.key === 'Enter' || event.key === 'Spacebar' ||
            ((event.ctrlKey || event.metaKey) && event.key !== 'c' && event.key !== 'v')) {
            event.preventDefault();
        }
	});
	
	    document.getElementById('textInput').addEventListener('keypress', function(event) {
        if (event.repeat) {
            event.preventDefault();
        }
	});


    countdown(typingDuration, endTypingSession);
}

function endTypingSession() {
    document.getElementById('textInput').disabled = true;
    updateResult();
    updateSessionRecords();

    if (sessionCount < 2) {
        sessionCount++;
        strategyTime();
    } else {
        displayFinalRecord();
    }
}

function updateResult() {
    const text = document.getElementById('textInput').value.toUpperCase();
    const slapCount = (text.match(/SLAP/g) || []).length;
    const charCount = text.length;
    let mistypedCount = charCount - (slapCount * 4);
    let penalty = Math.floor(mistypedCount / penaltyThreshold);
    let score = slapCount - penalty;
    sessionCounts[sessionCount] = { slaps: slapCount, chars: charCount, cheated: sessionCounts[sessionCount].cheated, score: score };

    document.getElementById('result').innerText = `今回のスコア: ${score}`;
}


function updateSessionRecords() {
    let recordText = `各セッションの記録 (ID: ${userId1} and ${userId2}):<br>`;
    for (let i = 0; i <= sessionCount; i++) {
        let count = sessionCounts[i];
        let sessionLabel = count.cheated ? `セッション ${i + 1}*: ` : `セッション ${i + 1}: `;
        let mistypedCount = count.chars - (count.slaps * 4);
        let record = `${sessionLabel}SLAP入力数 ${count.slaps}; ミスタイプ数 ${mistypedCount}; スコア ${count.score};<br>`;
        recordText += record;
    }
    document.getElementById('record').innerHTML = recordText;
}



function strategyTime() {
    document.getElementById('strategyTime').innerHTML = `${strategyDuration} 秒間の作戦タイムです。<br>次のセッションはカウントダウンが 0 になると同時に開始されます。`;
    countdown(strategyDuration, startTypingSession);
}

function displayFinalRecord() {
    updateSessionRecords();
    document.getElementById('strategyTime').innerHTML = "SLAPタスクはこれで終了です。画面をそのままにお待ちください。<br>ありがとうございました。";
    sendGameData();
}

function sendGameData() {
  const data = {
    id1: userId1,
    id2: userId2,
    slap1: sessionCounts[0].slaps,
    tc1: sessionCounts[0].chars,
    score1: sessionCounts[0].score,
    slap2: sessionCounts[1].slaps,
    tc2: sessionCounts[1].chars,
    score2: sessionCounts[1].score,
    slap3: sessionCounts[2].slaps,
    tc3: sessionCounts[2].chars,
    score3: sessionCounts[2].score,
    cheated1: sessionCounts[0].cheated ? 1 : 0,
    cheated2: sessionCounts[1].cheated ? 1 : 0,
    cheated3: sessionCounts[2].cheated ? 1 : 0,
  };

  // ランダムな遅延を設定（0秒から10秒）
  const delay = Math.random() * 3000;

  setTimeout(() => {
    fetch(googleSpreadsheetUrl, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    })
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));
  }, delay);
}


function updateGameRules() {
    let penaltyText = penaltyThreshold > 0 ? `しかし、ミスタイプ ${penaltyThreshold} 文字につきスコアから1点が引かれます。` : '';
    let rulesText = `ゲームルール詳細:<br>
    1. プレイヤーはペアで作業し、左側に座るプレイヤー（id1）は「A」と「S」のキーをタイピングし、右側に座るプレイヤー（id2）は「L」と「P」のキーをタイピングします。制限時間内に、画面のテキスト入力エリアに、「SLAP」という一続きの単語をできるだけ多く・正確にタイピングするのがあなたのチームのタスクです。<br>
    2. 入力された「SLAP」の回数があなたのスコア（点数）になります。${penaltyText}<br>
    3. 各セッションは ${typingDuration}秒間続き、合計で3回のセッションがあります。セッションの間には、パートナーとの作戦を話し合い計画を立てるための${strategyDuration}秒の戦略時間が設けられています。`;

    document.getElementById('rulesTooltip').innerHTML = rulesText;
}

document.getElementById('gameRules').addEventListener('mouseover', function() {
    document.getElementById('rulesTooltip').style.visibility = 'visible';
});

document.getElementById('gameRules').addEventListener('mouseout', function() {
    document.getElementById('rulesTooltip').style.visibility = 'hidden';
});




window.onload = function() {
    updateGameRules();
    document.getElementById('confirmIdButton').addEventListener('click', confirmId);
};



