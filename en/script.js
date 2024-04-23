/*
Copyright (c) 2024 Keisuke Hattori

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/




// Global settings
let penaltyThreshold = 5; // Penalty threshold for mistypes
let typingDuration = 60; // Duration of input session in seconds
let strategyDuration = 90; // Strategy time in seconds
let googleSpreadsheetUrl = 'https://script.google.com/macros/s/AKfycbwxxXBIPdTMWauw22onm0-9M_j2R7HiyiQjTyamROOb-HVwFqGzgaJSbc5tFJvbEHhZpg/exec'; // Google Spreadsheet's webapplication URL


//
//


let sessionCount = 0;
let sessionCounts = [{ slaps: 0, chars: 0, cheated: false, score: 0 }, { slaps: 0, chars: 0, cheated: false, score: 0 }, { slaps: 0, chars: 0, cheated: false, score: 0 }];

let userId1, userId2;

function confirmId() {
  userId1 = document.getElementById('userId1').value;
  userId2 = document.getElementById('userId2').value;
  const fullWidthPattern = /[^\x00-\x7F]+/;

  if (userId1.trim() === '' || userId2.trim() === '') {
    alert('Please enter your ID.');
  } else if (fullWidthPattern.test(userId1) || fullWidthPattern.test(userId2)) {
    alert('Please enter your ID using alphanumeric characters only.');
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
    document.getElementById('sessionNumber').innerText = `Session ${sessionCount + 1}`;
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

    document.getElementById('result').innerText = `This session's score: ${score}`;
}

function updateSessionRecords() {
    let recordText = `Session Records (ID: ${userId1} and ${userId2}):<br>`;
    for (let i = 0; i <= sessionCount; i++) {
        let count = sessionCounts[i];
        let sessionLabel = count.cheated ? `Session ${i + 1}*: ` : `Session ${i + 1}: `;
        let mistypedCount = count.chars - (count.slaps * 4);
        let record = `${sessionLabel}SLAPs typed ${count.slaps}; Mistypes ${mistypedCount}; Score ${count.score};<br>`;
        recordText += record;
    }
    document.getElementById('record').innerHTML = recordText;
}



function strategyTime() {
    document.getElementById('strategyTime').innerHTML = `${strategyDuration} sec strategy time for the team.<br>The next session will start as soon as the countdown reaches zero.`;
    countdown(strategyDuration, startTypingSession);
}

function displayFinalRecord() {
    updateSessionRecords();
    document.getElementById('strategyTime').innerHTML = "The task is now complete. Please keep the screen as it is.<br>Thank you.";
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
    let penaltyText = penaltyThreshold > 0 ? `However, for every ${penaltyThreshold} mistypes, 1 point will be deducted from your score.` : '';
    let rulesText = `Game Rules Detail:<br>
    1. Players will work in pairs, with the player seated on the left (id1) responsible for typing the keys 'A' and 'S', while the player on the right (id2) will type the keys 'L' and 'P'. Within the time limit, your team's task is to type the word 'SLAP' as many times and as accurately as possible in the text input area on the screen.<br>
    2. The number of times 'SLAP' is entered will be your score (points).${penaltyText}<br>
    3. Each session lasts ${typingDuration} seconds, and there are a total of 3 sessions. Between sessions, there will be ${strategyDuration} seconds of strategy time for you and your partner to discuss and plan your approach.`;

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









