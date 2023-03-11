const btn = document.getElementById("button");

/*This bold and normal is the style for displaying the text bold in console log
This is used with %c as a format specifier */
const bold = "font-weight: bold";
const normal = "font-weight: normal";

// Adding event listener to the button on the page
btn.addEventListener("click", OpeningCeremony);

// Opening Ceremony function that will run when we click the button on the page.
// I have added extra feature like alert to make the code more interactive.
function OpeningCeremony() {
  // Extra alert feature
  alert("Open the console!");

  //   Console logging after 1000 milliseconds
  setTimeout(() => {
    console.log("Let the games begin");
  }, 1000);

  //   Initiating the score object
  const score = {
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0,
  };

  // Calling the 100m race function while passing the next callback function of long jump and the score object
  Race100M(LongJump, score);
}

function Race100M(longjump, score) {
  /*
    We will use the following algorithm in this function
    1.  To map the random numbers with the object keys we will assume and map
        0 with red
        1 with blue
        2 with green and 
        3 with yellow
        Now the benefit is that we can work with objects and arrays simultaneously.
        Note: This mappiing will remain constant through out the program.
    2.  We will create two arrays in which we will store the random numbers generated between 10 to 15 inclusive 
        and their index will point towards the color which we have mapped and assumed.
        Let original array be scoreRandom and its copy will be scoreRandom2
    3.  Now according to the problem statement we will find the colors with least time and second least time 
        and update the score accordingly.

  */
  setTimeout(() => {
    let scoreRandom = [];
    let scoreRandom2 = [];
    let updatedScore = {
      red: score["red"],
      blue: score["blue"],
      green: score["green"],
      yellow: score["yellow"],
    };

    for (let i = 0; i <= 3; i++) {
      // random numbers will be generated such that there is no repetition to avoid checking for the duplicate items.
      let temp = 0;
      do {
        temp = getRandomInt(10, 15);
      } while (scoreRandom.indexOf(temp) != -1);
      scoreRandom[i] = temp;
      scoreRandom2[i] = scoreRandom[i];
    }

    // sorting the duplicate copy so that the orginal remains intact for reference
    scoreRandom2.sort();

    // Getting the color with least time taken
    const leastIndex = scoreRandom.indexOf(scoreRandom2[0]);
    // Updating the score of the particular color according to the found index
    updateScoreby(leastIndex, updatedScore, 50);

    // Getting the color with second least time taken
    const secondLeastIndex = scoreRandom.indexOf(scoreRandom2[1]);
    // Updating the score of the particular color according to the found index
    updateScoreby(secondLeastIndex, updatedScore, 25);

    // Console logging the results as required at every step
    console.log(
      "%c100M Race Results%c" +
        `:\nThe previous score was as follows: \n1. Red : ${score.red}\n2. Blue : ${score.blue}\n3. Green : ${score.green}\n4. Yellow : ${score.yellow}` +
        `\nThe updated score is as follows: \n1. Red : ${updatedScore.red}\n2. Blue : ${updatedScore.blue}\n3. Green : ${updatedScore.green}\n4. Yellow : ${updatedScore.yellow}` +
        `\n\nThe winner for the %c100M Race%c is %c${winner(updatedScore)}`,
      bold,
      normal,
      bold,
      normal,
      bold
    );

    // Calling the LongJump() function passed as call back and passing them the argument of HighJump() function and updated score object
    longjump(HighJump, updatedScore);
  }, 3000);
}

function LongJump(highjump, previous_score) {
  /*
    Here also we will generate a random digit from 0 to 3
    as we are mapping 
    0 with red
    1 with blue
    2 with green and 
    3 with yellow according to the previous case of 100M race function and update the score as required
  */
  setTimeout(() => {
    // Creating a copy of the previous score because at each step we are required to print the previous score as well as updated score
    const updScore = {
      red: previous_score["red"],
      blue: previous_score["blue"],
      green: previous_score["green"],
      yellow: previous_score["yellow"],
    };

    // According to the mapped values we will get the random digit from 0 to 3 inclusive
    let randomColor = getRandomInt(0, 3);

    // after getting the random digit we will update the score according to the mapped values.
    updateScoreby(randomColor, updScore, 150);

    // Console logging the results as required at every step
    console.log(
      "%cLong Jump Results%c" +
        `:\nThe previous score was as follows: \n1. Red : ${previous_score.red}\n2. Blue : ${previous_score.blue}\n3. Green : ${previous_score.green}\n4. Yellow : ${previous_score.yellow}` +
        `\nThe updated score is as follows: \n1. Red : ${updScore.red}\n2. Blue : ${updScore.blue}\n3. Green : ${updScore.green}\n4. Yellow : ${updScore.yellow}` +
        `\n\nThe winner for the %cLong Jump%c is %c${winner(updScore)}`,
      bold,
      normal,
      bold,
      normal,
      bold
    );

    // Calling the HighJump() function passed as call back and passing them the argument of AwardCeremony() function and updated score object
    highjump(AwardCeremony, updScore);
  }, 2000);
}

function HighJump(awardceremony, previous_score) {
  // Creating a copy of the previous score because at each step we are required to print the previous score as well as updated score
  const updScore = {
    red: previous_score["red"],
    blue: previous_score["blue"],
    green: previous_score["green"],
    yellow: previous_score["yellow"],
  };

  //   Prompting the user to enter the color they want
  let chosenColor;
  const chooseColor = prompt("What colour secured the highest jump?");
  if (chooseColor == null || chooseColor == "") {
    console.log("%cThe High Jump Event was cancelled", bold);
  } else {
    chosenColor = chooseColor.toLowerCase();
    if (
      chosenColor === "red" ||
      chosenColor === "blue" ||
      chosenColor === "green" ||
      chosenColor === "yellow"
    ) {
      updScore[chosenColor] = updScore[chosenColor] + 100;
      //   Cosole logging the results
      console.log(
        "%cHigh Jump Results%c" +
          `:\nThe previous score was as follows: \n1. Red : ${previous_score.red}\n2. Blue : ${previous_score.blue}\n3. Green : ${previous_score.green}\n4. Yellow : ${previous_score.yellow}` +
          `\nThe updated score is as follows: \n1. Red : ${updScore.red}\n2. Blue : ${updScore.blue}\n3. Green : ${updScore.green}\n4. Yellow : ${updScore.yellow}` +
          `\n\nThe winner for the %cHigh Jump%c is %c${winner(updScore)}`,
        bold,
        normal,
        bold,
        normal,
        bold
      );
    } else {
      console.log("%cThe High Jump Event was cancelled", bold);
    }
  }
  // Calling the AwardCeremony() function passed as callback and passing it the argument of updated score
  awardceremony(updScore);
}

function AwardCeremony(final_score) {
  // Creating the final score object copy to perform the sorting operation
  const final_score_copy = {
    red: final_score["red"],
    blue: final_score["blue"],
    green: final_score["green"],
    yellow: final_score["yellow"],
  };

  let final_score_arr;
  final_score_arr = Object.keys(final_score_copy).sort(function (a, b) {
    return final_score_copy[b] - final_score_copy[a];
  });

  //   Console logging the final results
  console.log(
    "%cWelcome to Award Ceremony%c" +
      `\nThe final score of the participants is as follows:` +
      `\n1. Red : %c${final_score.red}%c` +
      `\n2. Blue : %c${final_score.blue}%c` +
      `\n3. Green : %c${final_score.green}%c` +
      `\n4. Yellow : %c${final_score.yellow}%c` +
      `\n\n%c${final_score_arr[0].toUpperCase()}%c cames %cFirst%c with %c${
        final_score[final_score_arr[0]]
      }%c points` +
      `\n%c${final_score_arr[1].toUpperCase()}%c cames %cSecond%c with %c${
        final_score[final_score_arr[1]]
      }%c points` +
      `\n%c${final_score_arr[2].toUpperCase()}%c cames %cThird%c with %c${
        final_score[final_score_arr[2]]
      }%c points`,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal,
    bold,
    normal
  );
}

// Function to update the score by certain value for a given index
function updateScoreby(index, score, num) {
  if (index == 0) {
    score.red = score.red + num;
  } else if (index == 1) {
    score.blue = score.blue + num;
  } else if (index == 2) {
    score.green = score.green + num;
  } else if (index == 3) {
    score.yellow = score.yellow + num;
  }
}

// Function to get the random integer between two given numbers both inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to find the winner
function winner(object) {
  let objArr = [];
  objArr[0] = object.red;
  objArr[1] = object.blue;
  objArr[2] = object.green;
  objArr[3] = object.yellow;
  objArr.sort((a, b) => {
    return a - b;
  });
  switch (objArr[3]) {
    case object.red:
      return "Red";
    case object.blue:
      return "Blue";
    case object.green:
      return "Green";
    case object.yellow:
      return "Yellow";
  }
}
