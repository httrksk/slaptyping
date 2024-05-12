# SLAP Typing Task

The SLAP Typing Task is a typing game where two players share one computer and one keyboard, cooperating to type a specific string of characters. This task was developed as a tool to measure "teamwork" such as cooperation, communication, and problem-solving ability in an experimental setting.

For more details on the overview, theoretical foundation, implementation, usage, and applications of this task, please refer to the following paper:

> Hattori, Keisuke, SLAP Typing Task: A New Experimental Paradigm for Teamwork Research (May 11, 2024). Available at SSRN: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4824958
> 

## Task Overview

- **Purpose**: To evaluate teamwork, communication, and problem-solving ability through a cooperative task.
- **Method**:
    - Participants are paired up, and each pair shares one keyboard.
    - One player is responsible for the "S" and "A" keys, while the other is responsible for the "L" and "P" keys. They alternately press the keys to input the string "SLAP".
    - The goal is to input the string "SLAP" as many times as possible within the given time limit (default is 60 seconds).
- **Sessions**: There are three typing sessions in total. Between each session, there is a strategy time (default is 90 seconds) for the pair to communicate and plan for achieving a high score in the next session.
- **Evaluation Items**:
    
    For each session:
    
    - Number of correctly typed "SLAP"s ("SLAPs typed")
    - Number of mistypes ("Mistypes")
    - Score ("Score")
    
    The score is defined as the number of SLAPs typed minus a penalty based on the number of mistypes. Researchers can freely set the magnitude of this penalty (default is a 1-point deduction for every 5 mistypes).
    
- **Automatic Score Submission to Google Spreadsheet:**
    
    With an internet connection and appropriate settings, the task data is automatically sent to the researcher's own Google Spreadsheet.
    
- **Cheating Detection Feature:**
    
    If participants improperly use functions such as copy and paste during the typing session, it will be notified to the researcher (without the participants' knowledge). This allows the task to be used for research with experimental designs that detect cheating and other misconduct.
    

## Task Experience

You can experience the actual task at the following demo site:

English version: https://httrksk.github.io/slaptyping/en/

Japanese version: https://httrksk.github.io/slaptyping/jp/

## Significance of the Task

The SLAP Typing Task symbolizes the following four important elements:

1. **Synchronization**: Synchronization of input timing between members
2. **Learning**: Learning and improving the rhythm and timing of collaboration
3. **Adaptability**: Quick adaptation and response to various situations
4. **Persistence**: Perseverance in tackling the task without giving up

This task requires not only keyboard input skills but also nonverbal communication such as synchronizing and adjusting actions as a pair, recognizing problems, learning, quickly adapting to problems, communicating effectively during the strategy time for problem-solving, and team persistence. The word "SLAP" itself is composed of the initials of these elements.

## Developer Information

- Keisuke Hattori
- Professor, School of Business, Aoyama Gakuin University
- [hattori@busi.aoyama.ac.jp](mailto:hattori@busi.aoyama.ac.jp)
- https://httrksk.github.io/

## License and Terms of Use

This program is released under the MIT License. Anyone is free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software under the following conditions. The same rights can be granted to those who receive the software.

The software is provided "as is" without any express or implied warranty. Any warranties, including but not limited to warranties of merchantability and fitness for a particular purpose, are disclaimed. See the MIT License for more details.

**When using this task for research, writing, or publication, please cite the following literature:**

> Hattori, Keisuke, SLAP Typing Task: A New Experimental Paradigm for Teamwork Research (May 11, 2024). Available at SSRN: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4824958
> 

## Installation

1. Clone or download this repository. Use the /en/ folder for the English version or the /jp/ folder for the Japanese version.
2. Place `index.html`, `script.js`, and `style.css` in the appropriate directory on your web server.
3. Open `script.js` and modify the settings at the top as needed.
4. Open `index.html` in a web browser.

## Program Settings

### Parameter Settings

Task parameters can be set at the beginning of `script.js`.

```jsx
// Global settings
let penaltyThreshold = 5; // Mistype penalty threshold
let typingDuration = 60; // Typing session duration in seconds
let strategyDuration = 90; // Strategy time duration in seconds
let googleSpreadsheetUrl = "YOUR_WebAPP_URL"; // Google Spreadsheet web app URL

// Settings end here
```

- `penaltyThreshold`: Set the threshold for the mistype penalty deduction. The default is 5 (i.e., for every 5 mistypes, 1 point is deducted from the number of SLAPs typed to determine the score).
- `typingDuration`: Set the time limit (in seconds) for each typing session. The default is 60 seconds. By adjusting this time, you can adjust how much the team task emphasizes persistence.
- `strategyDuration`: Set the length (in seconds) of the strategy time between sessions. The default is 90 seconds. By adjusting this time, you can adjust how much the team task emphasizes team communication.
- `googleSpreadsheetUrl`: By setting the web application URL of your Google Spreadsheet (described later), you can automatically collect participant performance data.

### Google Spreadsheet Setup

The SLAP Typing Task allows you to automatically save participant performance data to a Google Spreadsheet. To use this feature, you need to set up Google Apps Script by following these steps:

1. Create a new spreadsheet on Google Drive and set the column (variable) names in the first row as `ID1`, `ID2`, `SLAP1`, `TC1`, `SCORE1`, `CHEATED1`, `SLAP2`, `TC2`, `SCORE2`, `CHEATED2`, `SLAP3`, `TC3`, `SCORE3`, `CHEATED3`, `TIMESTAMP`.
2. In the spreadsheet, select "Tools" > "Script editor" to open the Google Apps Script editor.
3. In the editor, enter the following code (overwrite the existing code):
    
    ```jsx
    function doPost(e) {
      var sheet = SpreadsheetApp.getActiveSheet();
      var data = JSON.parse(e.postData.contents);
      var rowData = [
        data.id1,
        data.id2,
        data.slap1,
        data.tc1,
        data.score1,
        data.cheated1,
        data.slap2,
        data.tc2,
        data.score2,
        data.cheated2,
        data.slap3,
        data.tc3,
        data.score3,
        data.cheated3,
        new Date(),
      ];
      sheet.appendRow(rowData);
      return ContentService.createTextOutput(
        JSON.stringify({ result: "success" })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    ```
    
4. Save the script and select "Deploy" > "New deployment".
5. In the "Deploy" dialog, select "Web app", set "Execute as" to yourself ([YOUR_NAME@gmail.com](mailto:YOUR_NAME@gmail.com)), and set "Who has access" to "Anyone".
6. Click the "Deploy" button and copy the displayed web application URL.
7. Paste the copied web application URL into the `googleSpreadsheetUrl` variable in the `script.js` file.

Once these steps are completed, the task results will be automatically saved to the Google Spreadsheet, allowing researchers to aggregate and analyze the data on the spreadsheet. The task results are sent after all three typing sessions are completed, including the score data for all three sessions.

The submitted data includes `ID1` and `ID2` for participant IDs 1 and 2, respectively. `SLAP1`, `TC1`, `SCORE1`, and `CHEATED1` represent the number of SLAPs typed, total characters typed, score, and copy & paste usage history (1 if used) for the first typing session, while `SLAP2`, `SLAP3`, etc. represent the data for the second and third sessions. `CHEATED` is set to 1 if copy & paste was used at least once during that session, and 0 if not used.

## Acknowledgments

In creating this program, I received advice from Mai Yamada of Meikai University. Also, the students in my seminar at Aoyama Gakuin University participated in the task many times for debugging and designing the optimal typing and strategy times and penalties. I am grateful to them.


