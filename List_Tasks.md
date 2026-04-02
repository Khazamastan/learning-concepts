Can you help me write react/js implemetation with detailed explanation fro each of below items, create separated folder for each items, read title/question/remarks/remarksMarkdown

[
    {
        "title": "Interactive Color Picker with Throttle"
    },
    {
        "title": "Promise Scheduler"
    },
    {
        "title": "Progress Bar with Controls"
    },
    {
        "title": "Flipping Card Component"
    },
    {
        "title": "ComposeAsync"
    },
    {
        "title": "Phone Home Screen"
    },
    {
        "title": "Domain Operation Simulator"
    },
    {
        "title": "Implement listenTo function"
    },
    {
        "title": "Company Structure Validator"
    },
    {
        "title": "Compare Semantic Versions"
    },
    {
        "title": "Build Boggle Dictionary"
    },
    {
        "title": "Shopping Cart Checkout"
    },
    {
        "title": "Implement a Timeout-Based API Wrapper with Optional Retry"
    },
    {
        "title": " Measure Function Execution Time"
    },
    {
        "title": "useObjectState"
    },
    {
        "title": "Cinema Hall Layout Structure"
    },
    {
        "title": "Breadcrumb Chain Problem"
    },
    {
        "title": "Build an API Client"
    },
    {
        "title": "Function Call Counter"
    },
    {
        "title": "Straws on the Board"
    },
    {
        "title": "Chess Path Finder Visualiser"
    },
    {
        "title": "Count Total Comments "
    },
    {
        "title": "String Compression and Decompression"
    },
    {
        "title": "Dynamic Table Generator"
    },
    {
        "title": "What would be the return value (if any)?",
        "question": "What would be the output of the following code snippet and why?\r\n\r\n 
js\r\nfunction init() {\r\n  try {\r\n    return 1;\r\n  } finally {\r\n    return 2;\r\n  }\r\n}\r\n\r\n// What would be the return value (if any)?\r\ninit();\r\n
",
        "remarks": "<p>The answer would be option 3 and the return value would be 2.</p>\n<p>Return does not immediately return control the caller like you might expect.</p>\n<p>It actually creates a &#39;Completion Record&#39;, which tells the runtime why the function stopped running, and any associated data (return value, exception, etc).</p>\n<p>It is at this time (once the function has returned but before control is passed back to the caller) that finally blocks are run.</p>\n<p>The finally block also creates a completion record. The runtime now has two completion records with different return values, and it has to pick between them.</p>\n<p>It picks the one from the finally block because that&#39;s what the spec says it should do.</p>\n",
        "remarksMarkdown": "The answer would be option 3 and the return value would be 2.\r\n\r\nReturn does not immediately return control the caller like you might expect.\r\n\r\nIt actually creates a 'Completion Record', which tells the runtime why the function stopped running, and any associated data (return value, exception, etc).\r\n\r\nIt is at this time (once the function has returned but before control is passed back to the caller) that finally blocks are run.\r\n\r\nThe finally block also creates a completion record. The runtime now has two completion records with different return values, and it has to pick between them.\r\n\r\nIt picks the one from the finally block because that's what the spec says it should do."
    },
    {
        "title": "Implement Event-Driven Key-Value Store"
    },
    {
        "title": "Implement Promisify Polyfill"
    },
    {
        "title": "Build a Multi Step Form"
    },
    {
        "title": "How to create a Drag and Drop List Component?"
    },
    {
        "title": "How to create analytics SDK in JavaScript?"
    },
    {
        "title": "Build a Two-Player Line Board Game",
        "question": "In this coding challenge, the candidate needs to build a board game that has a grid of 12x12 and allows two players to compete.\r\n\r\n## Requirements\r\n\r\n1. **Layout**\r\n\r\n   * The UI should be divided into two sections:\r\n\r\n     * **Game Board** (on the left): a 12x12 grid.\r\n     * **Information Panel** (on the right): displays game status and history.\r\n\r\n2. **Gameplay Mechanics**\r\n\r\n   * The game is turn-based and supports **two players**:\r\n\r\n     * Player One: Red\r\n     * Player Two: Green\r\n   * On a player’s turn, they can **click an empty circle** on the grid to place their marker (a filled circle of their color).\r\n   * Once placed, a circle **cannot be changed**.\r\n\r\n3. **Game Logic**\r\n\r\n   * Players alternate turns.\r\n   * The first player to align **five consecutive circles** in any direction (horizontal, vertical, or diagonal) wins.\r\n   * When a player wins:\r\n\r\n     * Display the winner in the Information Panel.\r\n     * Disable further interaction with the board.\r\n\r\n4. **Information Panel Features**\r\n\r\n   * Show the **current turn** and **winner** (if any).\r\n   * Maintain a **history of all moves**.\r\n   * Allow users to **navigate to any past move** to see the board state at that point.\r\n   * Include an option to **reverse the move history** (e.g., most recent move shown first or last).\r\n\r\n## Mock-up\r\n\r\n- Initial Board\r\n!Mockup 1\r\n\r\n- Game Moves\r\n!Mockup 2\r\n\r\n- Winner Selection\r\n!Mockup 3\r\n\r\n## Demo\r\n\r\n<iframe width=\"100%\" height=\"315\" src=\"https://imagekit.io/player/embed/devtoolstech/question-images/line-board-game/Screen%20Recording%202025-05-09%20at%201.56.27%E2%80%AFPM_EqSrQZrJCn.mov/ik-video.mp4?updatedAt=1746779250130&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fdevtoolstech%2Fquestion-images%2Fline-board-game%2FScreen%2520Recording%25202025-05-09%2520at%25201.56.27%25E2%2580%25AFPM_EqSrQZrJCn.mov%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1746779250130&updatedAt=1746779250130\" title=\"ImageKit video player\" frameBorder=\"0\" allow=\"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen\"> </iframe>\r\n\r\n## Evaluation Criteria\r\n\r\n* Clean, modular, and readable code.\r\n* Accurate implementation of game logic and UI state transitions.\r\n* Effective use of component architecture and state management.\r\n* Bonus points for responsive layout and polished UI/UX.\r\n\r\n## Submission\r\n\r\nStart the timer, complete your solution, and submit it. Ideally, you should finish this question within 90 mins. \r\n\r\nShare your solution with us on twitter or linkedin.",
        "remarks": "",
        "remarksMarkdown": ""
    },
    {
        "title": "How to group array of objects by key?"
    },
    {
        "title": "How to implement custom Array.prototype.square method?"
    },
    {
        "title": "Build a Virtual DOM to actual HTML DOM Convertor | DOM Renderer"
    },
    {
        "title": "How to detect overlapping circles in React.js? Uber Frontend Interview Question"
    },
    {
        "title": "How to implement a chainable Add function to calculate the sum of numbers?"
    },
    {
        "title": "How to implement Array.isArray? JavaScript Interview Question | Array Polyfills"
    },
    {
        "title": "How to implement Array.prototype.filter? JavaScript Interview Question | Array Polyfills"
    },
    {
        "title": "How to implement an Asynchronous Task Runner with Concurrency Control? Rippling Frontend Interview Question"
    },
    {
        "title": "How to build a Transfer List UI component?"
    },
    {
        "title": "How to implement auto-retry Promise on Rejection? | Frontend Problem Sovling"
    },
    {
        "title": "How to implement a prize calculator? JavaScript Interview Question"
    },
    {
        "title": "Implement Count By | JavaScript Problem Solving"
    },
    {
        "title": "How to build color memory game in React.js? Frontend Coding Challenge"
    },
    {
        "title": "How to build an Avatar Picker? Frontend UI Coding Challenge"
    },
    {
        "title": "How to implement feature flag functionality? Atlassian Frontend Interview Question"
    },
    {
        "title": "How to build Circles Game in React.js? Frontend Coding Challenge"
    },
    {
        "title": "How to build an Interactive JIRA Velocity Bar Chart? Atlassian Browser Coding Round Interview Question"
    },
    {
        "title": "How to create an grid lights interactive shape? Uber Frontend Interview Question | JavaScript | React.js",
        "question": "In this question, the candidate needs to create a shape (Grid Lights) based on a given 2D array. A shape is a collection of empty boxes placed at values that are true in the provided array.\r\n\r\nMany users have reported that this question was asked in the frontend coding round of companies like Uber.\r\n\r\nYou might be given a 2D array and needs to create the shape and along with interactivity or shape would be created as part of the initial code.\r\n\r\n## Functional Requirement\r\n\r\n- Create an empty box where array value is 1.\r\n- User can select a box. Upon selection the box background color should change to #0bcc59.\r\n- Once all boxes are selected then the boxes should auto-deselect based on the order of selection.\r\n- Deselection should be non-interruptible as in once started, we can't stop it.\r\n- During de-selection, user should not be able to select a new box as in disable any box interaction.\r\n\r\n## Mockup\r\n\r\n- Shape with empty boxes\r\n\r\n!Shape with empty boxes\r\n\r\n- Shape with some filled boxes\r\n\r\n!Shape with some filled boxes\r\n\r\n## Demo & Solution\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/DCoIeGt4g7M\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>\r\n\r\n\r\n## Submission\r\n\r\nStart the timer, complete your solution, test your solution against the test cases provided by the platform, and submit it. Ideally, you should finish this question within 30 mins. \r\n\r\nShare your solution with us on twitter or linkedin.\r\n",
        "remarks": "<p>Checkout our solution here: </p>\n<div>\n<iframe></iframe>\n</div>",
        "remarksMarkdown": "Checkout our solution here: \r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/DCoIeGt4g7M\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>"
    },
    {
        "title": "How to build a Confluence-like Sidebar with Tree Structure? | Atlassian Frontend Interview Question | React.js"
    },
    {
        "title": "Implement a Credit Card Masker | Klarna Frontend Interview Question | JavaScript"
    },
    {
        "title": "Write a function to return the count of numbers in an Array | MakeMyTrip Frontend Interview Question"
    },
    {
        "title": "How to create a loading animation? | Frontend Coding Challenge | React.js | JavaScript"
    },
    {
        "title": "How to build a Pagination component in React.js? | Razorpay Interview Question | JavaScript"
    },
    {
        "title": "How to implement a function to convert a string input into an object? | Razorpay Interview Question | JavaScript "
    },
    {
        "title": "How to find the most frequent word in a paragraph? Frontend Problem Solving | JavaScript "
    },
    {
        "title": "Implement a function that returns the number of parameters expected by a function in JavaScript"
    },
    {
        "title": "Build Country Capital Game | Microsoft Frontend Interview Question | JavaScript | React.js",
        "question": "In this frontend coding challenge, the candidate needs to implement a game to match countries with their capitals.\r\n\r\nMany users reported that this question was asked in the frontend interview process of **Microsoft**.\r\n\r\n## Functional Requirements\r\n\r\n- Implement a component <Game /> that will receive an object data as a prop. Each key of the object would be a country and corresponding value would be its capital.\r\n\r\n
js\r\nconst DATA = {\r\n    'India': 'Delhi',\r\n    'Russia': 'Moscow',\r\n    'China': 'Berlin',\r\n     ...\r\n}\r\n
\r\n- Render the list of countries and capitals in the random order on the UI.\r\n- The aim of the game is to select the country and its capitals.\r\n- The user can select 2 options. The default border color of an option should be #414141.\r\n- Selected option should have blue color border.\r\n- If the user selection is correct the selected options border color should change to #66cc99 and both options should disappear from the screen after 1000 ms.\r\n- If the user selection is incorrect then the selected options border color should change to red and reset after 1000 ms.\r\n- When there are no options left on the screen then show a message Congratulations.\r\n\r\n## Demo\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/Iv1gZN900uc\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>\r\n\r\n## Mockups\r\n\r\n- Initial Screen with all options in random order\r\n\r\n!Initial Screen\r\n\r\n- Selected Options\r\n\r\n!Selected Option\r\n\r\n- Incorrect Options\r\n\r\n!Incorrect Options\r\n\r\n- Correct Options\r\n\r\n!Correct Options\r\n\r\n- Remaining Options\r\n\r\n!Remaining Options\r\n\r\n- Final Screen\r\n\r\n!Final Screen\r\n\r\n## Submission\r\n\r\nPlease start the timer before starting and finish your solution within 30 mins. Share your solution with us on Twitter or LinkedIn.\r\n",
        "remarks": "<p>Checkout our solution:</p>\n<div>\n<iframe></iframe>\n</div>",
        "remarksMarkdown": "Checkout our solution:\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/Iv1gZN900uc\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>"
    },
    {
        "title": "How to implement pipe utility? | Razorpay Interview Question | JavaScript"
    },
    {
        "title": "How to build a moving dot animation? | Frontend Coding Challenge"
    },
    {
        "title": "How to build a Like Button? | Frontend Coding Challenge"
    },
    {
        "title": "How to check deep equality between JavaScript objects? | Zeta Frontend Interview Question"
    },
    {
        "title": "Build a FAQ page | Frontend Coding Challenge | React.js | HTML | CSS | JavaScript"
    },
    {
        "title": "Implement promiseMerge | Frontend Problem Solving | JavaScript"
    },
    {
        "title": "Build a GIF Search Engine | Frontend Coding Challenge | React.js | JavaScript"
    },
    {
        "title": "Build a Room Reservation System | Frontend Coding Challenge "
    },
    {
        "title": "Implement a function that creates an array of values not included in other array | Lodash Difference | JavaScript Interview Question  "
    },
    {
        "title": "Implement a function to convert all object keys to camel case | JavaScript Interview Question"
    },
    {
        "title": "Implement a function to split an array into groups of a certain length | Chunk | JavaScript Interview Question | Lodash Polyfills"
    },
    {
        "title": "Build a Simple Price Calculator | Frontend Coding Challenge | Razorpay Interview Question"
    },
    {
        "title": "What is the output of the following code snippet? | JavaScript Fundamentals | Frontend Interview Question",
        "question": "If we have the following code snippet then what would be the output if we execute it?\r\n\r\n
js\r\nconst name = { firstName: \"devtools\", lastName: \"tech\" };\r\nconst nameCopy = name;\r\n\r\nnameCopy.firstName = \"dev\";\r\n\r\n// what would be the output of the following?\r\nconsole.log(name);\r\n
",
        "remarks": "<p>The answer would be <code>Option 3</code> as in JavaScript <code>nameCopy</code> is a reference to the <code>name</code> object. Any changes done through <code>nameCopy</code> would reflect on the original object. If we want to stop this reflection then we need deep copy the object using methods like <code>window.structuredClone</code> or methods like <code>deepClone</code>, <code>clone</code> provided by famous libraries such as <code>lodash</code>.</p>\n",
        "remarksMarkdown": "The answer would be Option 3 as in JavaScript nameCopy is a reference to the name object. Any changes done through nameCopy would reflect on the original object. If we want to stop this reflection then we need deep copy the object using methods like window.structuredClone or methods like deepClone, clone provided by famous libraries such as lodash."
    },
    {
        "title": "Build a Counter App | Frontend Coding Challenge"
    },
    {
        "title": "Implement a function to generate a range of numbers | Range I | JavaScript Interview Question | Lodash Polyfills"
    },
    {
        "title": "How to implement getElementsByTagName? | Frontend Problem Solving | JavaScript Interview Question"
    },
    {
        "title": "How to implement getElementsByClassName? | Frontend Problem Solving | JavaScript Interview Question"
    },
    {
        "title": "Implement a function that accepts a callback and restricts its invocation to at most N times | Lodash Polyfills | Frontend Problem Solving"
    },
    {
        "title": "Implement a function that accepts a callback and restricts its invocation to at most once | Lodash Polyfills | Frontend Problem Solving"
    },
    {
        "title": "Implement Promise Polyfill | JavaScript Interview Question | Promise Polyfills | Frontend Problem Soving "
    },
    {
        "title": "How to build an Auto Collapsible Accordion? UI Coding Challenge | Frontend Interview Question | React.js | HTML | CSS"
    },
    {
        "title": "Debug and Fix the Feedback Modal Component in React.js | Frontend Coding Challenge | Debugging Round | JavaScript"
    },
    {
        "title": "How to Sort an Array of Objects by Property Values? | Frontend Problem Solving | JavaScript Interview Questions | Lodash Polyfill"
    },
    {
        "title": "How to mimic componentDidUpdate using React Hooks? useDidUpdate Custom Hook | React Interview Question | JavaScript"
    },
    {
        "title": "How to implement String.prototype.repeat? | String Polyfills | Frontend Problem Solving | JavaScript Interview Question"
    },
    {
        "title": "Implement Tuple Function | LinkedIn Frontend Interview Question | JavaScript Problem Solving"
    },
    {
        "title": "How to animate multiple progress bars in a sequence? | Uber Frontend Interview Question | React.js | JavaScript | HTML | CSS"
    },
    {
        "title": "Design a Login Page | Version 1 | React.js | HTML | CSS | JavaScript | Frontend Projects for Beginners"
    },
    {
        "title": "How to implement Deep Filter Functionality? | AWS Frontend Interview Question | JavaScript | Problem Solving | Amazon"
    },
    {
        "title": "Implement cloneDeep from Lodash | Frontend Problem Solving | JavaScript Interview Question"
    },
    {
        "title": "Implement jQuery.css method | Frontend Interview Question | JavaScript"
    },
    {
        "title": "How to create Notifications List Component? Razorpay Interview Question | React.js | JavaScript | HTML | CSS"
    },
    {
        "title": "How to set value in an object by path? | Implement Lodash Set Method | JavaScript Interview Question"
    },
    {
        "title": "How to build a File Explorer? Atlassian Frontend Machine Coding Round Question | JavaScript Interview Question | React.js",
        "question": "In this question, you need to build a fully functional File Explorer. **It is a commonly asked question for intermediate level. We have seen this question asked in the interview process of companies like Google, Cars24, Atlassian, and many more.**\r\n\r\n## Functional Specifications\r\n\r\n- Can be used to create folders, sub-folders, and files.\r\n- The files menu should be collapsible. The Icon should change based on the Menu's state.\r\n- Files & Folders should have proper icons.\r\n- Folder state could be open or close. Icon should be based on the Folder's state.\r\n- A folder's content could be sub-folders/files. The contents should only be visible whenever a folder is in open state. \r\n- Each node (file/folder) should be properly indented based on the depth/level. \r\n- One should be only able to add a new file/folder to an existing folder.\r\n- One should be able to delete any file or folder.\r\n- One should be able to rename any file or folder. Show an in-place input for renaming.\r\n- If the newly created file name is empty then it should be deleted automatically.\r\n- If a rename operation is performed on an existing file and the name provided is empty then we should showcase an error.\r\n- Highlight the node name on hover.\r\n- Node controls should be only visible on hover.\r\n- Try to use all the best practices and organise your code into reusable components/functions.\r\n\r\n## Demo\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/MYSOsNXjauU\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>\r\n\r\n\r\n## Mockup\r\n\r\n- File Menu Explorer\r\n\r\n!Mockup 1\r\n\r\n- In-place rename functionality\r\n\r\n!In-place rename functionality\r\n\r\n- Name & Icon highlight on hover\r\n\r\n!Name & Icon Highlight\r\n\r\n!Mockup 1\r\n\r\n!Mockup 2\r\n\r\n## Submission\r\n\r\nPlease start the timer before starting and finish your solution within 90 mins. Share your solution with us on Twitter or LinkedIn.",
        "remarks": "<p>More Frontend Challenges -- <a href=\"https://youtube.com/devtoolstech/videos\">https://youtube.com/devtoolstech/videos</a></p>\n",
        "remarksMarkdown": "More Frontend Challenges -- https://youtube.com/devtoolstech/videos"
    },
    {
        "title": "How to create a utility to invert an object? | Frontend Problem Solving | JavaScript Interview Question"
    },
    {
        "title": "How to create a timer with progress bar? | Machine Coding Round | React.js | HTML | CSS | JavaScript"
    },
    {
        "title": "How to implement Array.prototype.sort? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.reverse? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.fill? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.shift? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to convert RGB to HEX? JavaScript Interview Question | Frontend Problem Solving"
    },
    {
        "title": "How to create a toggle function in JavaScript? | Frontend Problem Solving | JavaScript Interview Question"
    },
    {
        "title": "How to create OTP Input Component? | Frontend Coding Challege | JavaScript | HTML | CSS | React.js",
        "question": "In this coding challenge, you need to create an OTP input field.\r\n\r\n## Specifications\r\n\r\n- Input field should take exactly 6 numbers.\r\n- Only numbers should be allowed as valid input.\r\n- Component should support Backspace, Delete, Shift + Tab, Left Arrow Key, and Right Arrow Key for navigation and operations.\r\n- Component should support paste functionality if the input is correct (6 numbers).\r\n- Submit button should only be activate when entered OTP length is equal to 6.\r\n- Whenever an input is active then it should be highlighted.\r\n\r\n## Demo\r\n\r\n<video width=\"100%\" height=\"100%\" controls>\r\n<source src=\"https://ik.imagekit.io/devtoolstech/question-images/OTP_Input_Component/otp-component-demo_Z82JLgWNm.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1671633013334\" />\r\n</video>\r\n\r\n## Resources\r\n\r\n- Input Active Color: yellow\r\n\r\n## Bonus\r\n\r\n- Once you are done with the above mentioned requirements then you can extend the question to add a timer that starts on load with an expiry of 1 minutes. After expiry, all submissions should fail.\r\n\r\nTo know more about custom timer, checkout --\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/JqA9kdvEuxQ?start=159\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div> \r\n\r\n## Submission\r\n\r\nPlease start the timer before starting and finish your solution within 60 mins. Share your solution with us on Twitter or LinkedIn.",
        "remarks": "",
        "remarksMarkdown": ""
    },
    {
        "title": "How to create a vertical menu in React.js? | Beginner Frontend Coding Challenge | UI Machine Coding Round | JavaScript"
    },
    {
        "title": "How to create useWhyDidYouUpdate hook in React.js? | JavaScript Interview Question | Frontend Problem Solving | Custom React Hooks"
    },
    {
        "title": "How to create useSSR hook in React.js? | JavaScript Interview Question | Frontend Problem Solving"
    },
    {
        "title": "How to create useScript hook in React.js? | JavaScript Interview Question | Frontend Problem Solving"
    },
    {
        "title": "How to create useCopyToClipboard hook in React.js? | JavaScript Interview Question | Frontend Problem Solving | Custom React Hooks"
    },
    {
        "title": "How to create useAsync hook in React.js? | JavaScript Interview Question | Frontend Problem Solving | Custom React Hooks"
    },
    {
        "title": "How to create usePrevious hook in React.js? | JavaScript Interview Question | Frontend Problem Solving"
    },
    {
        "title": "How to fix and build an Age Validator? | Pair Programming | Frontend Coding Challenge | ReactJS | JavaScript"
    },
    {
        "title": "Can you identify the behaviour of following code snippet? | JavaScript Output Questions | Problem Solving | JavaScript Copy",
        "question": "If asked to glance over the following code snippet and identify the behaviour of the duplicate function then what do you think is happening in the following code snippet?\r\n\r\n\r\n
js\r\nconst original = {\r\n  id: 'xhdyt0123',\r\n  link: 'https://www.youtube.com/watch?v=_eaCs-pzaVg',\r\n  metadata: {\r\n    title: 'Build Your Own Redux',\r\n    description: 'In this video we are going to see how we an build our own Redux',\r\n  },\r\n  published: true\r\n}\r\n\r\nconst duplicate = (original) => {\r\n  if (!original.published) {\r\n    throw new Error('Your post needs to published before duplication'); \r\n  }\r\n\r\n  const copy = {\r\n    id: +new Date(),\r\n    link: original.link,\r\n    metadata: original.metadata,\r\n    published: original.published\r\n  };\r\n\r\n  copy.metadata.title = `Copy of ${original.metadata.title}`;\r\n\r\n  return copy;\r\n};\r\n\r\nduplicate(original);\r\n
",
        "remarks": "<p>The answer would be <code>Option 4</code> because the function <code>duplicate</code> accidentally changes the title of the original video post&#39;s <code>title</code> too as non-primitive data-types are passed by reference in JavaScript. </p>\n",
        "remarksMarkdown": "The answer would be Option 4 because the function duplicate accidentally changes the title of the original video post's title too as non-primitive data-types are passed by reference in JavaScript. "
    },
    {
        "title": "Build a Text to Audio Animated Mini Project | Frontend Coding Challenge | JavaScript | CSS | Web Animations"
    },
    {
        "title": "Build A Simple Cryptocurrency Portfolio Manager App | Frontend Coding Challenge | JavaScript Interview Question | React.js | HTML "
    },
    {
        "title": "How to implement Array.prototype.push? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "Is Fetch API part of JavaScript Engine or JavaScript Runtime?",
        "question": null,
        "remarks": "<p>Different APIs like Fetch API, DOM API, Web Storage API are part of the <a href=\"https://devtools.tech/questions/all?searchTerm=javascript\">JavaScript</a> Runtime like Browser.</p>\n<p>Browser APIs (or web APIs) are the APIs that come built-in with the browsers. They allow developers to perform complex operations without dealing with the sophisticated lower-level code. There are a number of browser APIs for manipulating the DOM, making network requests, managing client-side storage, and retrieving device media streams, etc.</p>\n",
        "remarksMarkdown": "Different APIs like Fetch API, DOM API, Web Storage API are part of the JavaScript Runtime like Browser.\r\n\r\nBrowser APIs (or web APIs) are the APIs that come built-in with the browsers. They allow developers to perform complex operations without dealing with the sophisticated lower-level code. There are a number of browser APIs for manipulating the DOM, making network requests, managing client-side storage, and retrieving device media streams, etc."
    },
    {
        "title": "What would be the output of the following code? (Based on Spread Operator)",
        "question": "
js\r\nfunction sum(x, y, z) {\r\n  return x + y + z;\r\n}\r\n\r\nconst numbers = [1, 2, 3];\r\n\r\nconsole.log(sum(...numbers));\r\n
",
        "remarks": "<p>The answer would be <code>Option 3</code> as we are using the <code>Spread Syntax</code> here. The array <code>numbers</code> would be expanded into its elements and the function <code>sum</code> receives 3 arguments <code>x = 1</code>, <code>y = 2</code>, and <code>z = 3</code> respectively.</p>\n<p>Read more about Spread Syntax <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax\">here</a>.</p>\n<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<p><a href=\"https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\">https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw</a></p>\n<p><a href=\"https://devtools.tech/lists/all\">https://devtools.tech/lists/all</a></p>\n<p><a href=\"https://devtools.tech/questions/all?type=3\">https://devtools.tech/questions/all?type=3</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\">https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2</a></p>\n<p><a href=\"https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\">https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\">https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59</a></p>\n<p><a href=\"https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\">https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0</a></p>\n<p><a href=\"https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\">https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM</a></p>\n<p><a href=\"https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\">https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n",
        "remarksMarkdown": "The answer would be Option 3 as we are using the Spread Syntax here. The array numbers would be expanded into its elements and the function sum receives 3 arguments x = 1, y = 2, and z = 3 respectively.\r\n\r\nRead more about Spread Syntax here.\r\n\r\n## Recommended Resources\r\n\r\nhttps://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\r\n\r\nhttps://devtools.tech/lists/all\r\n\r\nhttps://devtools.tech/questions/all?type=3\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\r\n\r\nhttps://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\r\n\r\nhttps://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\r\n\r\nhttps://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\r\n\r\nhttps://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC"
    },
    {
        "title": "What would be the output of the following code? (Based on Array Slice)",
        "question": "
js\r\nconst array = [1,2,3,4,5];\r\n\r\nconsole.log(array.slice(2,4));\r\n
",
        "remarks": "<p>The answer would be <code>Option 1</code> as the <code>slice</code> method returns a shallow copy of a portion of an array into a new array object selected from <code>start</code> to <code>end</code> (<strong>end not included</strong>) where start and end represent the index of items in that array. The original array will not be modified.</p>\n<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<p><a href=\"https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\">https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw</a></p>\n<p><a href=\"https://devtools.tech/lists/all\">https://devtools.tech/lists/all</a></p>\n<p><a href=\"https://devtools.tech/questions/all?type=3\">https://devtools.tech/questions/all?type=3</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\">https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2</a></p>\n<p><a href=\"https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\">https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\">https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59</a></p>\n<p><a href=\"https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\">https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0</a></p>\n<p><a href=\"https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\">https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM</a></p>\n<p><a href=\"https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\">https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n",
        "remarksMarkdown": "The answer would be Option 1 as the slice method returns a shallow copy of a portion of an array into a new array object selected from start to end (**end not included**) where start and end represent the index of items in that array. The original array will not be modified.\r\n\r\n## Recommended Resources\r\n\r\nhttps://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\r\n\r\nhttps://devtools.tech/lists/all\r\n\r\nhttps://devtools.tech/questions/all?type=3\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\r\n\r\nhttps://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\r\n\r\nhttps://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\r\n\r\nhttps://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\r\n\r\nhttps://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC"
    },
    {
        "title": "Which function is used to serialize an object into a JSON string in Javascript?",
        "question": null,
        "remarks": "<p>The JSON.stringify() function is used to convert a JSON object into string format.</p>\n<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<p><a href=\"https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\">https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw</a></p>\n<p><a href=\"https://devtools.tech/lists/all\">https://devtools.tech/lists/all</a></p>\n<p><a href=\"https://devtools.tech/questions/all?type=3\">https://devtools.tech/questions/all?type=3</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\">https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2</a></p>\n<p><a href=\"https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\">https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\">https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59</a></p>\n<p><a href=\"https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\">https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0</a></p>\n<p><a href=\"https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\">https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM</a></p>\n<p><a href=\"https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\">https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n",
        "remarksMarkdown": "The JSON.stringify() function is used to convert a JSON object into string format.\r\n\r\n## Recommended Resources\r\n\r\nhttps://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\r\n\r\nhttps://devtools.tech/lists/all\r\n\r\nhttps://devtools.tech/questions/all?type=3\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\r\n\r\nhttps://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\r\n\r\nhttps://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\r\n\r\nhttps://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\r\n\r\nhttps://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC"
    },
    {
        "title": "What is the process in which an object or data structure is converted to series of bytes for easy storage or network transfer?",
        "question": null,
        "remarks": "<p>Serialization is the conversion of an object to a series of bytes, so that the object can be easily saved to persistent storage or streamed across a communication link. The byte stream can then be deserialized - converted into a replica of the original object.</p>\n<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<p><a href=\"https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\">https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw</a></p>\n<p><a href=\"https://devtools.tech/lists/all\">https://devtools.tech/lists/all</a></p>\n<p><a href=\"https://devtools.tech/questions/all?type=3\">https://devtools.tech/questions/all?type=3</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\">https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2</a></p>\n<p><a href=\"https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\">https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\">https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59</a></p>\n<p><a href=\"https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\">https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0</a></p>\n<p><a href=\"https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\">https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM</a></p>\n<p><a href=\"https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\">https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n",
        "remarksMarkdown": "Serialization is the conversion of an object to a series of bytes, so that the object can be easily saved to persistent storage or streamed across a communication link. The byte stream can then be deserialized - converted into a replica of the original object.\r\n\r\n## Recommended Resources\r\n\r\nhttps://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\r\n\r\nhttps://devtools.tech/lists/all\r\n\r\nhttps://devtools.tech/questions/all?type=3\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\r\n\r\nhttps://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\r\n\r\nhttps://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\r\n\r\nhttps://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\r\n\r\nhttps://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC"
    },
    {
        "title": "What will be the output of the following code snippet? JavaScript Min, Max",
        "question": "
js\r\nconst isMinGreater = Math.min() > Math.max();\r\nconst isMaxGreater = Math.max() > Math.min();\r\n\r\nconsole.log(isMinGreater, isMaxGreater);\r\n
",
        "remarks": "<p>In <a href=\"https://devtools.tech/questions/all?searchTerm=javascript\">Javascript</a> <code>Math.max()</code> is lesser than <code>Math.min()</code> because <code>Math.max()</code> returns <code>-Infinity</code> and <code>Math.min()</code> returns <code>Infinity</code>.</p>\n<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<p><a href=\"https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\">https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw</a></p>\n<p><a href=\"https://devtools.tech/lists/all\">https://devtools.tech/lists/all</a></p>\n<p><a href=\"https://devtools.tech/questions/all?type=3\">https://devtools.tech/questions/all?type=3</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\">https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2</a></p>\n<p><a href=\"https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\">https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\">https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59</a></p>\n<p><a href=\"https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\">https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0</a></p>\n<p><a href=\"https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\">https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM</a></p>\n<p><a href=\"https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\">https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n",
        "remarksMarkdown": "In Javascript Math.max() is lesser than Math.min() because Math.max() returns -Infinity and Math.min() returns Infinity.\r\n\r\n## Recommended Resources\r\n\r\nhttps://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\r\n\r\nhttps://devtools.tech/lists/all\r\n\r\nhttps://devtools.tech/questions/all?type=3\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\r\n\r\nhttps://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\r\n\r\nhttps://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\r\n\r\nhttps://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\r\n\r\nhttps://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC"
    },
    {
        "title": "What is the use of the <noscript> tag in Javascript?",
        "question": "In the question, you need to select the correct behavior of the noscript tag.",
        "remarks": "<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<p><a href=\"https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\">https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw</a></p>\n<p><a href=\"https://devtools.tech/lists/all\">https://devtools.tech/lists/all</a></p>\n<p><a href=\"https://devtools.tech/questions/all?type=3\">https://devtools.tech/questions/all?type=3</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\">https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2</a></p>\n<p><a href=\"https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\">https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\">https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59</a></p>\n<p><a href=\"https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\">https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0</a></p>\n<p><a href=\"https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\">https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM</a></p>\n<p><a href=\"https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\">https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n",
        "remarksMarkdown": "## Recommended Resources\r\n\r\nhttps://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\r\n\r\nhttps://devtools.tech/lists/all\r\n\r\nhttps://devtools.tech/questions/all?type=3\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\r\n\r\nhttps://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\r\n\r\nhttps://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\r\n\r\nhttps://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\r\n\r\nhttps://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC"
    },
    {
        "title": "How the comparison happens with switch cases in JavaScript?",
        "question": "The switch statement is used to perform different actions based on different conditions in JavaScript.",
        "remarks": "<p>The switch expression is evaluated once. Then an <code>===</code> based comparison is performed i.e. both the value of the expression and its datatype is compared. If there is a match, the associated block of code is executed else the default code block is executed.</p>\n<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<p><a href=\"https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\">https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw</a></p>\n<p><a href=\"https://devtools.tech/lists/all\">https://devtools.tech/lists/all</a></p>\n<p><a href=\"https://devtools.tech/questions/all?type=3\">https://devtools.tech/questions/all?type=3</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\">https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2</a></p>\n<p><a href=\"https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\">https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\">https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59</a></p>\n<p><a href=\"https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\">https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0</a></p>\n<p><a href=\"https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\">https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM</a></p>\n<p><a href=\"https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\">https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n",
        "remarksMarkdown": "The switch expression is evaluated once. Then an === based comparison is performed i.e. both the value of the expression and its datatype is compared. If there is a match, the associated block of code is executed else the default code block is executed.\r\n\r\n## Recommended Resources\r\n\r\nhttps://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\r\n\r\nhttps://devtools.tech/lists/all\r\n\r\nhttps://devtools.tech/questions/all?type=3\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\r\n\r\nhttps://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\r\n\r\nhttps://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\r\n\r\nhttps://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\r\n\r\nhttps://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC"
    },
    {
        "title": "Which of the following keywords are used to define a variable in JavaScript?",
        "question": "A variable is a “named storage” for data. We can use variables to store different types of data.",
        "remarks": "<p>Answer would be <code>Option 4</code> as we can use <code>var</code>, <code>let</code>, and <code>const</code> to create variables in the <a href=\"https://devtools.tech/questions/all?searchTerm=javascript\">JavaScript</a> language.</p>\n<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<p><a href=\"https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\">https://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw</a></p>\n<p><a href=\"https://devtools.tech/lists/all\">https://devtools.tech/lists/all</a></p>\n<p><a href=\"https://devtools.tech/questions/all?type=3\">https://devtools.tech/questions/all?type=3</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\">https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2</a></p>\n<p><a href=\"https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\">https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\">https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59</a></p>\n<p><a href=\"https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\">https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0</a></p>\n<p><a href=\"https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\">https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM</a></p>\n<p><a href=\"https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\">https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n",
        "remarksMarkdown": "Answer would be Option 4 as we can use var, let, and const to create variables in the JavaScript language.\r\n\r\n## Recommended Resources\r\n\r\nhttps://devtools.tech/lists/s/top-javascript-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\r\n\r\nhttps://devtools.tech/lists/all\r\n\r\nhttps://devtools.tech/questions/all?type=3\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\r\n\r\nhttps://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\r\n\r\nhttps://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\r\n\r\nhttps://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\r\n\r\nhttps://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC"
    },
    {
        "title": "What is the paradigm of JavaScript language?",
        "question": "A paradigm can be defined as an approach to solving a problem. A programming paradigm is a way to solve problems by using a programming language.\r\n\r\nJavaScript is the language of the web. In the question, you need to answer what is the paradigm of JavaScript language?",
        "remarks": "<p><a href=\"https://devtools.tech/questions/all?searchTerm=javascript\">JavaScript</a> is a <a href=\"https://devtools.tech/questions/all?searchTerm=prototype\">prototype</a>-based, multi-paradigm scripting language that is dynamic, and supports object-oriented, imperative, and functional programming styles.</p>\n<p>You can read more about JavaScript programming paradigm <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript\">here</a>.</p>\n<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<p><a href=\"https://devtools.tech/lists/all\">https://devtools.tech/lists/all</a></p>\n<p><a href=\"https://devtools.tech/questions/all?type=3\">https://devtools.tech/questions/all?type=3</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\">https://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2</a></p>\n<p><a href=\"https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\">https://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7</a></p>\n<p><a href=\"https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\">https://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59</a></p>\n<p><a href=\"https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\">https://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0</a></p>\n<p><a href=\"https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\">https://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM</a></p>\n<p><a href=\"https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\">https://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n",
        "remarksMarkdown": "JavaScript is a prototype-based, multi-paradigm scripting language that is dynamic, and supports object-oriented, imperative, and functional programming styles.\r\n\r\nYou can read more about JavaScript programming paradigm here.\r\n\r\n## Recommended Resources\r\n\r\nhttps://devtools.tech/lists/all\r\n\r\nhttps://devtools.tech/questions/all?type=3\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-your-codebase-or-custom-eslint-rules-or-advanced-javascript-or-devtools-tech---rid---KgSipm8RngCFwwtI7bh2\r\n\r\nhttps://devtools.tech/resources/s/implementation-of-reduce-polyfill-or-devtools-tech---rid---RPwJsAj15EZKfZsMT4V7\r\n\r\nhttps://devtools.tech/resources/s/how-to-improve-performance-of-your-website-or-cumulative-layout-shift-or-part-1---rid---iFdJmQ4rTsUUv72yhH59\r\n\r\nhttps://devtools.tech/resources/s/build-your-own-redux-or-part-1-or-advanced-frontend---rid---MNkFAzvLnmds66wD3JV0\r\n\r\nhttps://devtools.tech/resources/s/create-your-own-redux-or-part-2-or-createstore-api-or-advanced-frontend---rid---H9EEn90tE3Jag6zCfNkM\r\n\r\nhttps://devtools.tech/resources/s/what-every-react-developer-should-know-or-part-1-or-stale-closures---rid---x3PZ2ib2HWoab1RdaT2H\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC"
    },
    {
        "title": "How to implement Array.prototype.pop? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.unshift? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "Create a Progress Bar | Frontend Coding Challenge | DevKode DOM Challenge"
    },
    {
        "title": "Create a Color Spotter Game | Frontend Coding Challenge | DevKode DOM Challenge | JavaScript | HTML | CSS | ReactJS "
    },
    {
        "title": "Create a Chess Board | Frontend Coding Challenge | DevKode DOM Challenge | JavaScript | HTML | CSS | React"
    },
    {
        "title": "Create Pixel Art Grid | Frontend Coding Challenge | DevKode DOM Challenge"
    },
    {
        "title": "Implement Star Rating Widget | Frontend Coding Challenge | DevKode Challenge"
    },
    {
        "title": "How to implement Array.prototype.every? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.some? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.includes? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.lastIndexOf? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.findLastIndex? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.findLast? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.findIndex? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.find? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "How to implement Array.prototype.at? JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "Design and Implement localStorage API | Frontend Problem Solving | JavaScript Interview Question"
    },
    {
        "title": "Implement Reduce Polyfill from Scratch | Frontend Problem Solving | JavaScript Interview Question"
    },
    {
        "title": "How to implement a Developer Builder Interface? | Frontend Problem Solving | JavaScript Interview Question "
    },
    {
        "title": "Implement lodash.pick from scratch | Problem Solving | Frontend Interview Question"
    },
    {
        "title": "Build a Simple HTML Calculator | Frontend Coding Challenge | Vanilla JavaScript | Machine Coding Round "
    },
    {
        "title": "Clone Trello Board | Frontend Coding Challenge | Machine Coding Round"
    },
    {
        "title": "Implement a function to read a field inside a nested object | AWS Frontend Interview Question | JavaScript Interview Question"
    },
    {
        "title": "Build A Dictionary App | React.js | Frontend Coding Challenge"
    },
    {
        "title": "How to implement DOM like structure tree!? | Frontend Interview Question | Advanced JavaScript",
        "question": "In this question, you need to implement the following code so that when the interviewer calls vDocument.render()\r\nthen the following HTML structure as a string with proper indentation should be returned.\r\n\r\nYou can also optionally print the output in the console along with returning it.\r\n\r\nDemo:\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/CAzMsXUe2I0?start=50\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>\r\n\r\n**IMPORTANT:** You cannot use actual DOM APIs. You need to implement everything on your own.\r\n\r\n
javascript\r\nconst vDocument = new VDocument();\r\nconst body = vDocument.createElement(\"body\");\r\nconst div = vDocument.createElement(\"div\");\r\n\r\ndiv.innerHTML = \"Hello, I am a div!\";\r\nbody.appendChild(div);\r\nvDocument.appendChild(body);\r\n\r\n// proper html structure \r\nconst html = vDocument.render();\r\n
\r\n\r\nOutput:\r\n\r\n
html\r\n<html>\r\n\t<body>\r\n\t\t<div>\r\n\t\t\tHello, I am a div!\r\n\t\t</div>\r\n\t</body>\r\n</html>\r\n
\r\n\r\n*You can use spaces or tabs to indent your output. However, test cases check for multiples of 4 spaces per tag level.*\r\n\r\nThis question is designed to test various important topics like OOPS, Inheritance, Candidate's problem solving skills, understanding of DOM, how well the candidate can structure code. So, try to write as clean code as possible.\r\n\r\nYou can check our answer here.\r\n\r\n## Submission\r\n\r\nStart the timer and try to finish as soon as possible. You can record your solving process or take a screenshot of your final code and share it on Twitter/LinkedIn and tag @devtoolstech",
        "remarks": "<p>For our answer, checkout: </p>\n<p><a href=\"https://devtools.tech/resources/s/dom-api-programming-question-or-frontend-interview-questions---rid---AA4msQuDtbwicYNMLOt3\">https://devtools.tech/resources/s/dom-api-programming-question-or-frontend-interview-questions---rid---AA4msQuDtbwicYNMLOt3</a></p>\n",
        "remarksMarkdown": "For our answer, checkout: \r\n\r\nhttps://devtools.tech/resources/s/dom-api-programming-question-or-frontend-interview-questions---rid---AA4msQuDtbwicYNMLOt3"
    },
    {
        "title": "What is the output of the following code? - Promise Scheduling | Event Loop | JavaScript Quiz",
        "question": "What would be the output of the following code snippet?\r\n\r\n
js\r\nconsole.log(1);\r\n\r\nsetTimeout(() => console.log(2));\r\n\r\nPromise.resolve().then(() => console.log(3));\r\n\r\nPromise.resolve().then(() => setTimeout(() => console.log(4)));\r\n\r\nPromise.resolve().then(() => console.log(5));\r\n\r\nsetTimeout(() => console.log(6));\r\n\r\nconsole.log(7);\r\n
",
        "remarks": "<p>Answer would be <code>Option 3</code> i.e. <code>1 7 3 5 2 6 4</code>.</p>\n<p>Let us understand why:</p>\n<ol>\n<li><code>console.log(1)</code> executes immediately and it outputs <code>1</code>.</li>\n<li><code>setTimeout(() =&amp;gt; console.log(2));</code> schedules a callback to the macrotask queue.</li>\n<li><code>Promise.resolve().then(() =&amp;gt; console.log(3));</code> schedules a callback to the microtask queue.</li>\n<li><code>Promise.resolve().then(() =&amp;gt; setTimeout(() =&amp;gt; console.log(4)));</code> schedules a callback to the microtask queue.</li>\n<li><code>Promise.resolve().then(() =&amp;gt; console.log(5));</code> schedules a callback to the microtask queue.</li>\n<li><code>setTimeout(() =&amp;gt; console.log(6));</code> schedules a callback to the macrotask queue.</li>\n<li><code>console.log(7);</code> executes immediately and it outputs <code>7</code>.</li>\n</ol>\n<p>So far, we have <code>1 7</code> as output. Now,</p>\n<p>Since <code>microtasks</code> takes precedence over <code>macrotasks</code>.</p>\n<p>The callback scheduled via line no. 3 (<code>console.log(3);</code>) executes and is printed to console.</p>\n<ul>\n<li>Output so far: <code>1 7 3</code></li>\n</ul>\n<p>The callback scheduled via line no. 4 executes and sets a new macrotasks as <code>setTimeout</code> callbacks are added <code>macrotasks queue</code>.</p>\n<p>The callback schedules via line no. 5 executes and is printed to console.</p>\n<ul>\n<li>Output so far <code>1 7 3 5</code></li>\n</ul>\n<p>Now, comes the turn of macrotasks as all the microtasks are over.</p>\n<p>The callback scheduled via line no. 2, 6, 4 are executed in order and printed to console.</p>\n<p>Final output <code>1 7 3 5 2 6 4</code></p>\n<p>To develop a deeper understanding of the Promises, Event Loop, Macrotasks/Microtasks queues, checkout </p>\n<p><a href=\"https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\">https://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC</a></p>\n<p><a href=\"https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\">https://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O</a></p>\n",
        "remarksMarkdown": "Answer would be Option 3 i.e. 1 7 3 5 2 6 4.\r\n\r\nLet us understand why:\r\n\r\n1. console.log(1) executes immediately and it outputs 1.\r\n2. setTimeout(() => console.log(2)); schedules a callback to the macrotask queue.\r\n3. Promise.resolve().then(() => console.log(3)); schedules a callback to the microtask queue.\r\n4. Promise.resolve().then(() => setTimeout(() => console.log(4))); schedules a callback to the microtask queue.\r\n5. Promise.resolve().then(() => console.log(5)); schedules a callback to the microtask queue.\r\n6. setTimeout(() => console.log(6)); schedules a callback to the macrotask queue.\r\n7. console.log(7); executes immediately and it outputs 7.\r\n\r\nSo far, we have 1 7 as output. Now,\r\n\r\nSince microtasks takes precedence over macrotasks.\r\n \r\nThe callback scheduled via line no. 3 (console.log(3);) executes and is printed to console.\r\n- Output so far: 1 7 3\r\n\r\nThe callback scheduled via line no. 4 executes and sets a new macrotasks as setTimeout callbacks are added macrotasks queue.\r\n\r\nThe callback schedules via line no. 5 executes and is printed to console.\r\n- Output so far 1 7 3 5\r\n\r\nNow, comes the turn of macrotasks as all the microtasks are over.\r\n\r\nThe callback scheduled via line no. 2, 6, 4 are executed in order and printed to console.\r\n\r\nFinal output 1 7 3 5 2 6 4\r\n\r\nTo develop a deeper understanding of the Promises, Event Loop, Macrotasks/Microtasks queues, checkout \r\n\r\nhttps://devtools.tech/resources/s/javascript-promises-fundamentals-every-engineer-should-know-or-part-2-or-event-loop-or-microtasks---rid---oBrzK6Mt7HNAnKBT3ogC\r\n\r\nhttps://devtools.tech/resources/s/things-every-engineer-should-know-about-promises-in-javascript-or-frontend-fundamentals---rid---CpzShsPEajyOwTavUu5O\r\n"
    },
    {
        "title": "Build User Avatar Screen | Frontend Coding Challenge | JavaScript Interview Question | Machine Coding Round"
    },
    {
        "title": "How to build a UI Card with Tabs? | Frontend Coding Challenge | JavaScript Interview Question | React"
    },
    {
        "title": "Implement your own Testing Library | Frontend Problem Solving | JavaScript Interview Question"
    },
    {
        "title": "How to implement custom map function with limit on number of operations? | Paytm Frontend Interview Question | JavaScript Interview Questions | Frontend Problem Solving "
    },
    {
        "title": "Build an Autocomplete using React.js | Type One | Frontend Coding Challenge | JavaScript Interview Question"
    },
    {
        "title": "How to create an object without prototype? | JavaScript Interview Question | Beginner"
    },
    {
        "title": "Build an Ecommerce Product Listing Page using React.js | Frontend Coding Challenge | Advanced JavaScript"
    },
    {
        "title": "How to build a Text Converter? | Frontend Coding Challenge | React.js | Beginner"
    },
    {
        "title": "How to create an overlapping image gallery? | Frontend Coding Challenge | HTML | CSS | Beginner"
    },
    {
        "title": "How to generate CSS selector for the target element? | Frontend Interview Question | Advanced JavaScript"
    },
    {
        "title": "How to implement Array indexOf from scratch? | JavaScript Interview Question | Problem Solving | JavaScript Polyfills"
    },
    {
        "title": "Create a Dictionary of Dates | Frontend Interview Questions | Problem Solving Practice"
    },
    {
        "title": "How to build a Password Strength Checker in React.js | Frontend Interview Question | JavaScript "
    },
    {
        "title": "How to implement memoize function | JavaScript Interview Question | Problem Solving"
    },
    {
        "title": "How to implement Event Emitter in JavaScript? | Facebook Interview Question",
        "question": "In this question, the candidate needs to implement an Event Emitter class that can be used for the publisher-subscriber mechanism in JavaScript.\r\n\r\nMany users have reported that this question was asked in the interview process of Meta/Facebook, Google, and many other top product companies.\r\n\r\n## Syntax \r\n\r\n
js\r\nconst emitter = new Emitter();\r\n
\r\n\r\nAllows you to subscribe to some event\r\n\r\n
js\r\nconst sub1 = emitter.subscribe('event_name', callback1);\r\n// you can have multiple callbacks to the same event\r\nconst sub2 = emitter.subscribe('event_name', callback2);\r\n
\r\n\r\nYou can emit the event you want with this API\r\n(you can receive 'n' number of arguments)\r\n\r\n
js\r\nemitter.emit('event_name', foo, bar);\r\n
\r\n\r\nAnd allows you to release the subscription like this\r\n(but you should be able to still emit from sub2)\r\n\r\n
js\r\nsub1.release();\r\n
\r\n\r\nIf we try to release a subscription multiple times, it should throw a TypeError.\r\n\r\n## Demo & Solution\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/7DJCpgc6V94\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>",
        "remarks": "<p>Check out our solution</p>\n<div>\n<iframe></iframe>\n</div>\n\n<p>One possible implementation could be</p>\n<pre><code class=\"language-js\">class Emitter {\n  constructor() {\n    /**\n     * This does not make the subscriptions private\n     *\n     * We can look into using Private class features\n     * but as of writing this solution, they are not 100% supported\n     * https://caniuse.com/?search=private\n     *\n     * We can also look into creating getter/setter methods\n     **/\n    this._subscriptions = new Map();\n  }\n\n  subscribe(eventName, callback) {\n    // check if eventName is already exists in our subscriptions\n    if (!this._subscriptions.has(eventName)) {\n      this._subscriptions.set(eventName, new Map());\n    }\n\n    // creating an unique subscription id\n    const subscriptionId = Symbol();\n    const eventSubscriptions = this._subscriptions.get(eventName);\n\n    // storing the callback provided by the user\n    eventSubscriptions.set(subscriptionId, callback);\n\n    return {\n      release: () =&amp;gt; {\n        // if subscriptionId is present in the eventSubscriptions\n        // then release it\n        if (eventSubscriptions.has(subscriptionId)) {\n          eventSubscriptions.delete(subscriptionId);\n        } else {\n          throw new Error(&#39;This subscription has already been released&#39;);\n        }\n      },\n    };\n  }\n\n  emit(eventName, ...args) {\n    // invoking all callbacks on emit\n    if (this._subscriptions.has(eventName)) {\n      const eventSubscriptions = this._subscriptions.get(eventName);\n      \n      for (const [, callback] of eventSubscriptions) {\n        callback(...args);\n      }\n    }\n  }\n}\n</code></pre>\n<p>For more frontend-related content, visit:</p>\n<p><a href=\"https://youtube.com/c/devtoolstech\">https://youtube.com/c/devtoolstech</a></p>\n<p><a href=\"https://devtools.tech/questions/all\">https://devtools.tech/questions/all</a></p>\n<p><a href=\"https://devtools.tech/resources/all\">https://devtools.tech/resources/all</a></p>\n",
        "remarksMarkdown": "Check out our solution\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/7DJCpgc6V94\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>\r\n\r\nOne possible implementation could be\r\n\r\n
js\r\nclass Emitter {\r\n  constructor() {\r\n    /**\r\n     * This does not make the subscriptions private\r\n     *\r\n     * We can look into using Private class features\r\n     * but as of writing this solution, they are not 100% supported\r\n     * https://caniuse.com/?search=private\r\n     *\r\n     * We can also look into creating getter/setter methods\r\n     **/\r\n    this._subscriptions = new Map();\r\n  }\r\n\r\n  subscribe(eventName, callback) {\r\n    // check if eventName is already exists in our subscriptions\r\n    if (!this._subscriptions.has(eventName)) {\r\n      this._subscriptions.set(eventName, new Map());\r\n    }\r\n\r\n    // creating an unique subscription id\r\n    const subscriptionId = Symbol();\r\n    const eventSubscriptions = this._subscriptions.get(eventName);\r\n\r\n    // storing the callback provided by the user\r\n    eventSubscriptions.set(subscriptionId, callback);\r\n\r\n    return {\r\n      release: () => {\r\n        // if subscriptionId is present in the eventSubscriptions\r\n        // then release it\r\n        if (eventSubscriptions.has(subscriptionId)) {\r\n          eventSubscriptions.delete(subscriptionId);\r\n        } else {\r\n          throw new Error('This subscription has already been released');\r\n        }\r\n      },\r\n    };\r\n  }\r\n\r\n  emit(eventName, ...args) {\r\n    // invoking all callbacks on emit\r\n    if (this._subscriptions.has(eventName)) {\r\n      const eventSubscriptions = this._subscriptions.get(eventName);\r\n      \r\n      for (const [, callback] of eventSubscriptions) {\r\n        callback(...args);\r\n      }\r\n    }\r\n  }\r\n}\r\n
\r\n\r\nFor more frontend-related content, visit:\r\n\r\nhttps://youtube.com/c/devtoolstech\r\n\r\nhttps://devtools.tech/questions/all\r\n\r\nhttps://devtools.tech/resources/all"
    },
    {
        "title": "What does this function print? JavaScript Quiz | Interview Question",
        "question": "What would be the output of the following code snippet if we execute it as it is.\r\n\r\n
js\r\nlet number;\r\nfor (var i = 0; i < 5; i++) {\r\n  number = i;\r\n  setTimeout(function() {\r\n    console.log(number);\r\n  }, 1000);\r\n}\r\n
",
        "remarks": "<p>Of course, this is more of a trick question. However, such questions force you to focus on reading the code better. Here, the variable <code>i</code> is defined using <code>var</code> so it is function scoped and the variable <code>number</code> is a global variable and is updated on every loop iteration.  </p>\n<p>Now, a lot of people might mistake and choose <code>Option 4</code> as the loop will break when <code>i</code> becomes <code>5</code>. However, in this case, the variable <code>number</code> would not be updated when <code>i = 5</code>. Hence, the code will print <code>4</code> five times.</p>\n",
        "remarksMarkdown": "Of course, this is more of a trick question. However, such questions force you to focus on reading the code better. Here, the variable i is defined using var so it is function scoped and the variable number is a global variable and is updated on every loop iteration.  \r\n\r\nNow, a lot of people might mistake and choose Option 4 as the loop will break when i becomes 5. However, in this case, the variable number would not be updated when i = 5. Hence, the code will print 4 five times."
    },
    {
        "title": "Implement classNames() | JavaScript Interview Question"
    },
    {
        "title": "Can you shuffle an array? | JavaScript Interview Question"
    },
    {
        "title": "Implement a Currency Formatting Utility | JavaScript Interview Question"
    },
    {
        "title": "Create a Flat version of a nested Object | Breadcrumbs Computation | JavaScript Interview Question "
    },
    {
        "title": "Implement Accordion Component in React.js | JavaScript Interview Question",
        "question": "In the Machine Coding rounds, the candidates are usually asked to come up with a solution for a given problem statement or they might be asked to implement a UI component from the ground up. In this question, you would need to build an Accordion component and the markup of it should look like the following:\r\n\r\n
js\r\n<Accordion collapsible>\r\n  <AccordionItem id=\"1\">\r\n    <AccordionToggle>Devtools Tech? 🤔</AccordionToggle>\r\n    <AccordionPanel>\r\n      The aim with Devtools Tech is to create a platform for Frontend\r\n      Engineers where we all can improve, invest in ourselves, and grow by\r\n      learning from high quality real world programming content. This is a\r\n      platform where you can practice actual interview questions, watch\r\n      courses, read blogs, and keep track of your progress across various\r\n      domains and topics.\r\n    </AccordionPanel>\r\n  </AccordionItem>\r\n  <AccordionItem id=\"2\">\r\n    <AccordionToggle>Is it Free?</AccordionToggle>\r\n    <AccordionPanel>\r\n      Yes, the platform and YouTube both are completely free!\r\n    </AccordionPanel>\r\n  </AccordionItem>\r\n</Accordion>\r\n
\r\n\r\nOr you can also have the API as following:\r\n\r\n
js\r\n<Accordion collapsible>\r\n  <Accordion.Item id=\"1\">\r\n    <Accordion.Toggle>Devtools Tech? 🤔</Accordion.Toggle>\r\n    <Accordion.Panel>\r\n      The aim with Devtools Tech is to create a platform for Frontend\r\n      Engineers where we all can improve, invest in ourselves, and grow by\r\n      learning from high quality real world programming content. This is a\r\n      platform where you can practice actual interview questions, watch\r\n      courses, read blogs, and keep track of your progress across various\r\n      domains and topics.\r\n    </Accordion.Panel>\r\n  </Accordion.Item>\r\n  <Accordion.Item id=\"2\">\r\n    <Accordion.Toggle>Is it Free?</Accordion.Toggle>\r\n    <Accordion.Panel>\r\n      Yes, the platform and YouTube both are completely free!\r\n    </Accordion.Panel>\r\n  </Accordion.Item>\r\n</Accordion>\r\n
\r\n\r\nThe demo of the component:\r\n \r\n<video width=\"100%\" height=\"100%\" controls>\r\n<source src=\"https://ik.imagekit.io/devtoolstech/question-images/Accordion-Demo_85XGwuwXJ.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1649695817293\" type=\"video/mp4\" />\r\n</video>\r\n\r\n\r\nLive Demo:\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/dkh9-zICMQg?start=500\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>",
        "remarks": "<p>You can find our solution here:</p>\n<p><a href=\"https://www.youtube.com/watch?v=dkh9-zICMQg\">https://www.youtube.com/watch?v=dkh9-zICMQg</a></p>\n",
        "remarksMarkdown": "You can find our solution here:\r\n\r\nhttps://www.youtube.com/watch?v=dkh9-zICMQg"
    },
    {
        "title": "Implement clearAllTimeout in JavaScript | Facebook Interview Question"
    },
    {
        "title": "Explain Box Model in CSS | Frontend Interview Questions",
        "question": "In CSS, everything has a box around it. Understanding these boxes is key to being able to create layouts with CSS, or to align items with other items. \r\n\r\nExplain in detail what do you mean by Box Model, how it works and all the terminology that relates to it.",
        "remarks": "<p>Resources related to Box Model:</p>\n<p><a href=\"https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model\">https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model</a></p>\n<p><a href=\"https://www.w3schools.com/css/css_boxmodel.asp\">https://www.w3schools.com/css/css_boxmodel.asp</a></p>\n",
        "remarksMarkdown": "Resources related to Box Model:\r\n\r\nhttps://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model\r\n\r\nhttps://www.w3schools.com/css/css_boxmodel.asp"
    },
    {
        "title": "How would you implement pagination in a frontend application? | JavaScript Interview Questions | Frontend Architecture",
        "question": "In a real world high traffic web application there can be multiple types of pagination like infinite scroll, next/prev navigation, number based, and so on.\r\n\r\nIf you have to implement this then how would you do it? What would be the API contract, third party packages (if any), data storage, tech stack?\r\n\r\nUse this question to write down your thoughts and develop a clear approach.",
        "remarks": "<p>More frontend interview questions -- <a href=\"https://youtube.com/c/devtoolstech\">https://youtube.com/c/devtoolstech</a></p>\n<p>More programming questions --\n<a href=\"https://devtools.tech/questions/all\">https://devtools.tech/questions/all</a></p>\n",
        "remarksMarkdown": "More frontend interview questions -- https://youtube.com/c/devtoolstech\r\n\r\nMore programming questions --\r\nhttps://devtools.tech/questions/all"
    },
    {
        "title": "How would you implement Promise.race from scratch? | Promise Polyfills | JavaScript Interview Questions"
    },
    {
        "title": "What is the output of the following code snippet? | JavaScript Fundamentals",
        "question": "Let us consider the following code snippet, in which we are fetching a question based on the  questionId.\r\n\r\n\r\n
js\r\nconst User = require(\"../models/User\");\r\nconst Question = require(\"../models/Question\");\r\nconst { getCurrentSession } = require('../utils');\r\n\r\nasync function getQuestion(questionId) {\r\n  const isIdInvalid = !questionId || !questionId.trim().length;\r\n\r\n  if (isIdInvalid) {\r\n    throw new Error(\"Bad Request\");\r\n  }\r\n\r\n  const question = await Question.getQuestionById(questionId);\r\n \r\n  // assume we have this utility to find current session\r\n  // computes to an object with proper user data\r\n  const session = getCurrentSession();\r\n\r\n  if (session) {    \r\n    // computes to false\r\n    const isAuthorRequest = question.author.id === session.user.id;\r\n    const author = isAuthorRequest ? session.user : await User.getUserById(question.author.id);\r\n  }  \r\n\r\n  return {\r\n    ...question,\r\n    author: author || null,\r\n  };\r\n};\r\n\r\nconst question = await getQuestion('Iahbvfkg5H86a6KL8yBD');\r\n\r\nconsole.log(question);\r\n
\r\n\r\nAssume that all the functions getQuestionById, getUserById, getCurrentSession return proper data.\r\n\r\nIf we run this code snippet then what would be the output?",
        "remarks": "<p>Answer would be <code>Option 3</code> because the variable <code>author</code> is declared inside the code-block created by the <code>if</code> statement. Accessing the variable outside its scope would throw a <code>ReferenceError</code>.</p>\n<p>To know more about Scoping, checkout --</p>\n<p><a href=\"https://devtools.tech/blog/scoping-in-javascript-explained-or-javascript-interview-questions---rid---Iahbvfkg5H86a6KL8yBD?ref=scoping-mcq\">https://devtools.tech/blog/scoping-in-javascript-explained-or-javascript-interview-questions---rid---Iahbvfkg5H86a6KL8yBD</a></p>\n",
        "remarksMarkdown": "Answer would be Option 3 because the variable author is declared inside the code-block created by the if statement. Accessing the variable outside its scope would throw a ReferenceError.\r\n\r\nTo know more about Scoping, checkout --\r\n\r\nhttps://devtools.tech/blog/scoping-in-javascript-explained-or-javascript-interview-questions---rid---Iahbvfkg5H86a6KL8yBD"
    },
    {
        "title": "How to implement Promise.all? | Promise Polyfills | Advanced JavaScript Interview Question"
    },
    {
        "title": "Implement Currying | JavaScript Interview Questions"
    },
    {
        "title": "Implement Throttling in JavaScript | Walmart Frontend Interview Question"
    },
    {
        "title": "Implement Debounce Function | Flipkart UI - JavaScript Interview Questions",
        "question": "## Problem Statement\r\n\r\nIn modern web applications, performance optimization is critical, especially when dealing with high-frequency events like typing, scrolling, or resizing. One common technique used to optimize such scenarios is **debouncing**.\r\n\r\nDebouncing ensures that a function is only executed after a specified delay has passed since the last time it was invoked. This helps reduce unnecessary function calls and improves performance.\r\n\r\nYour task is to implement a debounce function that takes a callback function and a delay time, and returns a new debounced version of that function.\r\n\r\n## Function Signature\r\n\r\n
javascript\r\nfunction debounce(fn, delay) {\r\n  // your implementation\r\n}\r\n
\r\n\r\n### Arguments\r\n\r\n* fn (Function): The function to debounce\r\n* delay (number): The delay in milliseconds (or abstract time units for testing)\r\n\r\n## Returns\r\n\r\n* (Function): A debounced version of the input function\r\n\r\n## Requirements\r\n\r\n1. The debounced function should delay invoking fn until after delay time has passed since the last invocation.\r\n2. If the debounced function is called multiple times within the delay period, only the **last call** should be executed.\r\n3. The original function func should be invoked with the correct this context and arguments.\r\n4. Only one execution should occur after rapid consecutive calls.\r\n\r\n## Example\r\n\r\n### Input\r\n\r\n
javascript\r\nconst callback = () => console.log(\"Executed\");\r\n\r\nconst debouncedFn = debounce(callback, 3);\r\n\r\ndebouncedFn();\r\ndebouncedFn();\r\ndebouncedFn();\r\ndebouncedFn();\r\ndebouncedFn();\r\n
\r\n\r\n#### Conceptual Timeline\r\n\r\nBefore debouncing:\r\n\r\n
\r\n─A─B─C─ ─D─ ─ ─ ─ ─ ─E─ ─F─G\r\n
\r\n\r\nAfter debouncing (delay = 3):\r\n\r\n
\r\n─ ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ ─ ─ G\r\n
\r\n\r\n#### Expected Behavior\r\n\r\n* The function should be executed only once after the burst of rapid calls.",
        "remarks": "<h2 id=\"solution\">Solution</h2>\n<pre><code class=\"language-js\">function debounce(fn, delay) {\n  var timer;\n\n  return function executedFunction() {\n    var args = Array.prototype.slice.call(arguments);\n    var context = this;\n\n    clearTimeout(timer);\n\n    timer = setTimeout(function() {\n      fn.apply(context, args);\n    }, delay);\n  }\n}\n</code></pre>\n",
        "remarksMarkdown": "## Solution\r\n\r\n
js\r\nfunction debounce(fn, delay) {\r\n  var timer;\r\n\r\n  return function executedFunction() {\r\n    var args = Array.prototype.slice.call(arguments);\r\n    var context = this;\r\n\r\n    clearTimeout(timer);\r\n\r\n    timer = setTimeout(function() {\r\n      fn.apply(context, args);\r\n    }, delay);\r\n  }\r\n}\r\n
"
    },
    {
        "title": "Build A Mini Clone Of Google Calendar View",
        "question": "In this question, we have to create the functionality of a day calendar. This is somewhat similar to what see in solutions like Google Calendar.\r\n\r\n- Implement a Calendar, that shows the events for a single day.\r\n- The events list is provided as an array of objects where each object has a title, start time, end time, and color code.\r\n- The calendar should have 12 hours display. (AM - PM format)\r\n- Handle the events clashes gracefully to display all the conflicting events.\r\n- Display the Title and Timings on the event block\r\n- As the challenge is UI-centric, prioritize the display of events and clash management.\r\n\r\n### Assumptions:\r\n\r\n- The events in the array can be in any random order.\r\n- Event's end time will always be higher than the start time with a non zero duration.\r\n\r\n## Mockups\r\n\r\n- Non-conflicting meetings\r\n\r\n!Non-conflicting meetings\r\n\r\n- Conflicting Meetings\r\n\r\n!Conflicting Meetings\r\n\r\n- Interaction\r\n\r\n!Interaction\r\n\r\nThis is an interesting question that can have multiple levels. \r\n\r\nFor SDE 1, show the UI for non-overlapping meetings.\r\nFor SDE 2+, show the UI for over-lapping meetings too.\r\n\r\n## Submission\r\n\r\nPlease start the timer before starting and finish your solution within 120 mins. Share your solution with us on Twitter or LinkedIn.\r\n",
        "remarks": "<p>Some solutions from the community:</p>\n<p><a href=\"https://codepen.io/aminbe/pen/vYeeVRz\">https://codepen.io/aminbe/pen/vYeeVRz</a></p>\n<p><a href=\"https://output.jsbin.com/napekisiwe\">https://output.jsbin.com/napekisiwe</a></p>\n<p><a href=\"https://codesandbox.io/s/blue-fire-5vukw?file=/index.js\">https://codesandbox.io/s/blue-fire-5vukw?file=/index.js</a></p>\n",
        "remarksMarkdown": "Some solutions from the community:\r\n\r\nhttps://codepen.io/aminbe/pen/vYeeVRz\r\n\r\nhttps://output.jsbin.com/napekisiwe\r\n\r\nhttps://codesandbox.io/s/blue-fire-5vukw?file=/index.js"
    },
    {
        "title": "Build An Audio Recorder From Scratch | JavaScript Interview Question | React"
    },
    {
        "title": "What would be the output? [JavaScript Inheritance]",
        "question": "Let us talk about JavaScript Inheritance today. This is an interesting question that I recently came across. \n\nWhat do you think would be the output of the following code snippet?\n\n
js\nclass Person {\n\tconstructor(name) {\n\t\tthis.name = name;\n\t}\n\n\tprint = () => {\n\t\tconsole.log(this.name);\n\t}\n};\n\nclass Employee extends Person {\n\tconstructor(name, id) {\n\t\tsuper(name);\n\t\tthis.id = id;\n\t}\n\n\tprint() {\n\t\tconsole.log(this.name, this.id);\n\t}\n};\n\nconst one = new Person('one');\none.print();\n\nconst two = new Employee('two', 2);\ntwo.print();\n
",
        "remarks": "<p>Watch short explanation here -- <a href=\"https://www.youtube.com/watch?v=7bsA6Poxvy4&amp;list=PL4ruoTJ8LTT8250F2ZrYVmRO6o5gWZKpG&amp;index=1\">https://www.youtube.com/watch?v=7bsA6Poxvy4&amp;list=PL4ruoTJ8LTT8250F2ZrYVmRO6o5gWZKpG&amp;index=1</a></p>\n<p>Explanation by <a href=\"https://www.linkedin.com/in/lakshya-thakur/\">Lakshya Thakur</a></p>\n<p>The Person class print() being an arrow function would be associated with object instance when created.</p>\n<p>The Employee print() being a regular one, would be available on Employee’s prototype.</p>\n<p>In case of <code>one.print()</code>, the output seems reasonable.</p>\n<p>In case of <code>two.print()</code>, one might expect the method overriding to work from initial impression. But in this case, <code>two</code> is an object created using Employee which extends Person. Now Person had print() method associated with instance. Meanwhile, Employee’s print() is available on its prototype.</p>\n<p>So <code>two</code> being an instance of Employee will look for print() in its instance first which it will find no thanks to Person’s implementation. And so <strong>proto</strong> of <code>two</code> will never be looked for print().</p>\n",
        "remarksMarkdown": "Watch short explanation here -- https://www.youtube.com/watch?v=7bsA6Poxvy4&list=PL4ruoTJ8LTT8250F2ZrYVmRO6o5gWZKpG&index=1\n\nExplanation by Lakshya Thakur\n\nThe Person class print() being an arrow function would be associated with object instance when created.\n\nThe Employee print() being a regular one, would be available on Employee’s prototype.\n\nIn case of one.print(), the output seems reasonable.\n\nIn case of two.print(), one might expect the method overriding to work from initial impression. But in this case, two is an object created using Employee which extends Person. Now Person had print() method associated with instance. Meanwhile, Employee’s print() is available on its prototype.\n\nSo two being an instance of Employee will look for print() in its instance first which it will find no thanks to Person’s implementation. And so __proto__ of two will never be looked for print().\n"
    },
    {
        "title": "How to build a custom timer hook in React.js? | useTimer | JavaScript Interview Question",
        "question": "Create a custom hook called useTimer that provides the following API\r\n\r\n
js\r\nconst TOTAL_TIME = 5;\r\nconst { isRunning, start, stop, seconds } = useTimer(TOTAL_TIME);\r\n
\r\n\r\n- Show two buttons on the screen start & stop.\r\n- One button to start the timer. When the timer is running then show remaining seconds on the screen.\r\n- Another button to stop the timer. When the timer stops/reaches to 0 then it resets to total time and shows “No Timer Running” on the screen.\r\n\r\nVideo Demo:\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/JqA9kdvEuxQ?start=159\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>\r\n\r\nDemo Link: https://d0uo7.csb.app/",
        "remarks": "<p>You can view our solution here -- </p>\n<p><a href=\"https://www.youtube.com/watch?v=JqA9kdvEuxQ&amp;list=PL4ruoTJ8LTT96O258zzjRwdiNxzDoas-G\">https://www.youtube.com/watch?v=JqA9kdvEuxQ&amp;list=PL4ruoTJ8LTT96O258zzjRwdiNxzDoas-G</a></p>\n",
        "remarksMarkdown": "You can view our solution here -- \r\n\r\nhttps://www.youtube.com/watch?v=JqA9kdvEuxQ&list=PL4ruoTJ8LTT96O258zzjRwdiNxzDoas-G"
    },
    {
        "title": "What would the output of the following code snippet? [Promises in JavaScript]",
        "question": "What would be the output of the following code snippet if we run this as it is?\n\n
js\nfunction processing() {\n  return Promise.reject(\"Something went wrong!\");\n}\n\nfunction init() {\n  try {\n    return processing();\n  } catch (err) {\n    console.log(\"Error in processing.\");\n  }\n}\n\ninit().then(() => {\n  console.log(\"End\");\n});\n
",
        "remarks": "<p>Answer would be <code>Option 4</code> because in function <code>processing</code> our error is async in nature. Traditional <code>try/catch</code> blocks doesn&#39;t catch async errors in the promise chain because of their sync nature. You might say they work in case of <code>async/await</code> syntax. Yes, they work because when we are using <code>await</code> keyword then we are kind of suspending the execution of the function till promised is resolved so it behaves in a sync manner.</p>\n<p>To understand better and checkout more tutorials, checkout -- <a href=\"https://bit.ly/devtools-yv\">https://bit.ly/devtools-yv</a></p>\n",
        "remarksMarkdown": "Answer would be Option 4 because in function processing our error is async in nature. Traditional try/catch blocks doesn't catch async errors in the promise chain because of their sync nature. You might say they work in case of async/await syntax. Yes, they work because when we are using await keyword then we are kind of suspending the execution of the function till promised is resolved so it behaves in a sync manner.\n\nTo understand better and checkout more tutorials, checkout -- https://bit.ly/devtools-yv"
    },
    {
        "title": "What would be the output of the following code? [Scoping in JavaScript]",
        "question": " Consider the follow code snippet. What would be the output if we invoke the print function?\n\n
js\nvar name = \"Yomesh\";\n\nfunction print(name) {\n  console.log(name);\n  var name = \"Ajay\";\n  console.log(name); \n} \n\nprint(name);\n
",
        "remarks": "<p>Answer would be <code>Option 3</code> because of multiple of factors.</p>\n<ol>\n<li>We are using <code>var</code> here to declare the variable.</li>\n<li>The variable <code>name</code> already exists in the global scope.</li>\n<li>If we think in terms of hoisting then you might think answer would be <code>Option 1</code> because inside the <code>print</code> function, <code>name</code> variable would be hoisted to the top and value would be <code>undefined</code>. However, one thing to remember about hoisting is that it is true that variable declarations are hoisted to the top but if the variable is already initialised with a value then the value is retained. </li>\n<li>We are capturing the variable in function arguments.</li>\n</ol>\n<p>More about hoisting:</p>\n<p><a href=\"https://developer.mozilla.org/en-US/docs/Glossary/Hoisting#only_declarations_are_hoisted\">https://developer.mozilla.org/en-US/docs/Glossary/Hoisting#only_declarations_are_hoisted</a></p>\n<p>More about var:</p>\n<p><a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var\">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var</a></p>\n<p>For more tutorials and courses, visit: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be Option 3 because of multiple of factors.\n\n1. We are using var here to declare the variable.\n2. The variable name already exists in the global scope.\n3. If we think in terms of hoisting then you might think answer would be Option 1 because inside the print function, name variable would be hoisted to the top and value would be undefined. However, one thing to remember about hoisting is that it is true that variable declarations are hoisted to the top but if the variable is already initialised with a value then the value is retained. \n4. We are capturing the variable in function arguments.\n\nMore about hoisting:\n\nhttps://developer.mozilla.org/en-US/docs/Glossary/Hoisting#only_declarations_are_hoisted\n\nMore about var:\n\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var\n\nFor more tutorials and courses, visit: https://bit.ly/devtools-yt\n\n"
    },
    {
        "title": "How would you implement createStore function from Redux?"
    },
    {
        "title": "What would be the output? [Object Destructuring]",
        "question": "Let say we have a variable state which represents our current application state.\n\n
js\nconst state = {\n  user: {\n    id: null,\n    name: '', // empty string\n    subscribe: false,\n    link: '', // empty string\n  },\n};\n
\n\nWe want to destructure user information.\n\n
js\nfunction getUser() {\n  const {\n    user: {\n      id = 1,\n      name = 'Devtools Tech',\n      subscribe = true,\n      link = 'https://bit.ly/devtools-yt',\n    } = {},\n  } = state;\n\n  return {\n    userId: id,\n    name,\n    subscribe,\n    link,\n  };\n}\n
 \n\nNow, what would be the output if we call getUser function.\n\n
js\nconsole.log(getUser());\n
",
        "remarks": "<p>Answer would be <code>Option 2</code> because while destructing of objects, default values would only be assigned when the key doesn&#39;t exist or value is <code>undefined</code>. If the <code>state</code> is the following</p>\n<pre><code class=\"language-js\">const state = {\n  user: {\n    id: undefined,\n    name: undefined,\n    subscribe: undefined,\n    link: undefined,\n  },\n};\n</code></pre>\n<p>and now if we destructure</p>\n<pre><code class=\"language-js\">function getUser() {\n  const {\n    user: {\n      id = 1,\n      name = &#39;Devtools Tech&#39;,\n      subscribe = true,\n      link = &#39;https://bit.ly/devtools-yt&#39;,\n    } = {},\n  } = state;\n\n  return {\n    userId: id,\n    name,\n    subscribe,\n    link,\n  };\n}\n\nconsole.log(getUser());\n</code></pre>\n<p>Output would be:</p>\n<pre><code class=\"language-js\">{\n  &quot;userId&quot;: 1,\n  &quot;name&quot;: &quot;Devtools Tech&quot;,\n  &quot;subscribe&quot;: true,\n  &quot;link&quot;: &quot;https://bit.ly/devtools-yt&quot;\n}\n</code></pre>\n<p>Always remember, <code>null</code>, <code>false</code>, <code>&#39;&#39;</code>, and <code>0</code> are all still values!</p>\n<p>For more amazing tutorials, tips, and tricks: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be Option 2 because while destructing of objects, default values would only be assigned when the key doesn't exist or value is undefined. If the state is the following\n\n
js\nconst state = {\n  user: {\n    id: undefined,\n    name: undefined,\n    subscribe: undefined,\n    link: undefined,\n  },\n};\n
\n\nand now if we destructure\n\n
js\nfunction getUser() {\n  const {\n    user: {\n      id = 1,\n      name = 'Devtools Tech',\n      subscribe = true,\n      link = 'https://bit.ly/devtools-yt',\n    } = {},\n  } = state;\n\n  return {\n    userId: id,\n    name,\n    subscribe,\n    link,\n  };\n}\n\nconsole.log(getUser());\n
 \n\nOutput would be:\n\n
js\n{\n  \"userId\": 1,\n  \"name\": \"Devtools Tech\",\n  \"subscribe\": true,\n  \"link\": \"https://bit.ly/devtools-yt\"\n}\n
\n\nAlways remember, null, false, '', and 0 are all still values!\n\nFor more amazing tutorials, tips, and tricks: https://bit.ly/devtools-yt"
    },
    {
        "title": "How to create a function calculator? [Programming Interview Question]"
    },
    {
        "title": "How to create a flat version of a deeply nested array? [Programming Interview Question]",
        "question": "## Problem Statement\r\nYou are given a deeply nested array containing numbers and other nested arrays of arbitrary depth. Implement a method called flatten on the Array prototype that returns a new array with all values flattened into a single-level array.\r\n\r\nThe method must work for existing arrays as well as any arrays created in the future.\r\n\r\n## Requirements\r\n\r\n1. It must not modify the original array.\r\n2. It must handle arrays nested to any depth.\r\n3. It should return a new flattened array.\r\n4. Do not use existing built-in methods to flat the array.\r\n\r\n## Function Signature\r\n\r\n
javascript\r\nArray.prototype.flatten = function() {\r\n  // your implementation\r\n};\r\n
\r\n\r\n## Arguments\r\n\r\n* None.\r\n\r\n## Returns:\r\n\r\n* A new array containing all elements flattened into a single level.\r\n\r\n## Examples\r\n\r\n
javascript\r\nvar input = [\r\n  1, 2, 3,\r\n  [4],\r\n  [5, 6, [7], [8, [9, [10]]]],\r\n  11, 12, 13,\r\n  [14, [[[[[15, [16]]]]]]],\r\n  17, 18,\r\n  [19, [20, [21, [22, [23, [24, [[[[[25]]]]]]]]]]]\r\n];\r\n\r\nvar flatArray = input.flatten();\r\n\r\n// Expected output:\r\n// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]\r\n
\r\n\r\n## Demo\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/bqKcfTfer0Q?start=60\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>\r\n\r\n## Submission\r\n\r\nStart the timer, complete your solution, test your solution against the test cases provided by the platform, and submit it. Ideally, you should finish this question within 30 mins. \r\n\r\nShare your solution with us on twitter or linkedin",
        "remarks": "<h2 id=\"solutions\">Solutions</h2>\n<h3 id=\"version-1-recursion\">Version 1 (Recursion)</h3>\n<pre><code class=\"language-js\">function flatten() {\n  /**\n   * Loop over the array: 0 -- arr.length\n   * if currentElement is an array\n   *  do some processing\n   * else\n   *  use the currentElement directly\n   */\n\n  const output = [];\n\n  function processing(arr) {\n    /**\n     * input: [1,2,[3]]\n     * 0: 1 -&amp;gt; [1]\n     * 1: 2 -&amp;gt; [1,2]\n     * 2: [3] -&amp;gt; processing([3]) -&amp;gt; 0 - length -&amp;gt; [1,2,3]\n     */\n    for (let i = 0; i &amp;lt; arr.length; i++) {\n      const currentElement = arr[i];\n\n      if (Array.isArray(currentElement)) {\n        processing(currentElement);\n      } else {\n        output.push(currentElement);\n      }\n    }\n  }\n\n  processing(this);\n  return output;\n}\n\nArray.prototype.flatten = flatten;\n</code></pre>\n<h3 id=\"version-2-iterative\">Version 2 (Iterative)</h3>\n<pre><code class=\"language-js\">function flatten() {\n  /**\n   * Goal:\n   * Convert a deeply nested array into a flat array.\n   *\n   * Instead of recursion, we use a stack to avoid\n   * call stack overflow for very deep arrays.\n   */\n\n  const result = [];\n\n  /**\n   * We copy the original array into a stack.\n   * Why?\n   * - We don’t want to modify the original array.\n   * - We will simulate recursion manually using this stack.\n   *\n   * Example:\n   * input: [1, 2, [3]]\n   * stack: [1, 2, [3]]\n   */\n  const stack = [...this];\n\n  /**\n   * Loop until stack becomes empty\n   * Each iteration:\n   *  - Remove the last element (LIFO behavior)\n   *  - If it&#39;s an array → expand it\n   *  - If it&#39;s a value → push into result\n   */\n  while (stack.length) {\n    const value = stack.pop();\n\n    /**\n     * If current value is an array:\n     * Example:\n     *   stack: [1, 2, [3, 4]]\n     *   pop() → [3, 4]\n     *\n     * We push its elements back into stack\n     * so they can be processed individually.\n     */\n    if (Array.isArray(value)) {\n      stack.push(...value);\n    } else {\n      /**\n       * If it&#39;s a primitive (number/string/etc),\n       * push directly into result.\n       *\n       * Example:\n       *   value: 3\n       *   result: [3]\n       */\n      result.push(value);\n    }\n  }\n\n  /**\n   * Important:\n   * Because stack is LIFO (Last In First Out),\n   * the order of elements becomes reversed.\n   *\n   * So we reverse the result at the end\n   * to maintain original left-to-right order.\n   */\n  return result.reverse();\n};\n\nArray.prototype.flatten = flatten;\n</code></pre>\n<h2 id=\"video-solution\">Video Solution</h2>\n<div>\n<iframe></iframe>\n</div>\n\n<p>It is a good question in which interviewer can ask a lot of concepts ranging from Prototype Chain, Closures, Arrow functions, and more. It is mostly asked in SDE 1 / SDE 2 interviews.</p>\n",
        "remarksMarkdown": "## Solutions\r\n\r\n### Version 1 (Recursion)\r\n\r\n
js\r\nfunction flatten() {\r\n  /**\r\n   * Loop over the array: 0 -- arr.length\r\n   * if currentElement is an array\r\n   *  do some processing\r\n   * else\r\n   *  use the currentElement directly\r\n   */\r\n\r\n  const output = [];\r\n\r\n  function processing(arr) {\r\n    /**\r\n     * input: [1,2,[3]]\r\n     * 0: 1 -> [1]\r\n     * 1: 2 -> [1,2]\r\n     * 2: [3] -> processing([3]) -> 0 - length -> [1,2,3]\r\n     */\r\n    for (let i = 0; i < arr.length; i++) {\r\n      const currentElement = arr[i];\r\n\r\n      if (Array.isArray(currentElement)) {\r\n        processing(currentElement);\r\n      } else {\r\n        output.push(currentElement);\r\n      }\r\n    }\r\n  }\r\n\r\n  processing(this);\r\n  return output;\r\n}\r\n\r\nArray.prototype.flatten = flatten;\r\n
\r\n\r\n### Version 2 (Iterative)\r\n\r\n
js\r\nfunction flatten() {\r\n  /**\r\n   * Goal:\r\n   * Convert a deeply nested array into a flat array.\r\n   *\r\n   * Instead of recursion, we use a stack to avoid\r\n   * call stack overflow for very deep arrays.\r\n   */\r\n\r\n  const result = [];\r\n\r\n  /**\r\n   * We copy the original array into a stack.\r\n   * Why?\r\n   * - We don’t want to modify the original array.\r\n   * - We will simulate recursion manually using this stack.\r\n   *\r\n   * Example:\r\n   * input: [1, 2, [3]]\r\n   * stack: [1, 2, [3]]\r\n   */\r\n  const stack = [...this];\r\n\r\n  /**\r\n   * Loop until stack becomes empty\r\n   * Each iteration:\r\n   *  - Remove the last element (LIFO behavior)\r\n   *  - If it's an array → expand it\r\n   *  - If it's a value → push into result\r\n   */\r\n  while (stack.length) {\r\n    const value = stack.pop();\r\n\r\n    /**\r\n     * If current value is an array:\r\n     * Example:\r\n     *   stack: [1, 2, [3, 4]]\r\n     *   pop() → [3, 4]\r\n     *\r\n     * We push its elements back into stack\r\n     * so they can be processed individually.\r\n     */\r\n    if (Array.isArray(value)) {\r\n      stack.push(...value);\r\n    } else {\r\n      /**\r\n       * If it's a primitive (number/string/etc),\r\n       * push directly into result.\r\n       *\r\n       * Example:\r\n       *   value: 3\r\n       *   result: [3]\r\n       */\r\n      result.push(value);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Important:\r\n   * Because stack is LIFO (Last In First Out),\r\n   * the order of elements becomes reversed.\r\n   *\r\n   * So we reverse the result at the end\r\n   * to maintain original left-to-right order.\r\n   */\r\n  return result.reverse();\r\n};\r\n\r\nArray.prototype.flatten = flatten;\r\n
\r\n\r\n## Video Solution\r\n\r\n<div style=\"position:relative; padding-bottom: 56.25%; height: 0; margin-bottom: 20px;\">\r\n<iframe\r\nstyle=\"position:absolute; top: 0; left: 0; width:100%; height: 100%;\" src=\"https://www.youtube.com/embed/bqKcfTfer0Q?start=60\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</div>\r\n\r\nIt is a good question in which interviewer can ask a lot of concepts ranging from Prototype Chain, Closures, Arrow functions, and more. It is mostly asked in SDE 1 / SDE 2 interviews."
    },
    {
        "title": "What would be the output of the following code snippet? [Prototypes & Scopes]",
        "question": "
js\nvar name = \"Puneet\";\n\nfunction Engineer() {\n\tthis.name = \"Yomesh\";\n}\n\nconsole.log(new Engineer().name);\nEngineer.prototype.name = \"Saloni\";\nEngineer.prototype.channel = \"https://bit.ly/devtools-yt\";\nconsole.log(new Engineer().channel);\nconsole.log(new Engineer().name);\n
",
        "remarks": "<p>Answer would be <code>Option 3</code>. Final object would look like</p>\n<pre><code class=\"language-js\">{\n  name: &quot;Yomesh&quot;,\n  __proto__: {\n    name: &quot;Saloni&quot;,\n    channel: &quot;https://bit.ly/devtools-yt&quot;\n  }\n}\n</code></pre>\n<p>While searching for property <code>name</code>, first look up would be on the direct enumerable properties of the object and since that exists (<code>this.name = &quot;Yomesh&quot;</code>), it would be printed. If no direct property is present then <code>Prototype</code> chain is traversed and in that case value would be <code>Saloni</code>. In case of <code>channel</code> property, <code>Prototype</code> chain is traversed and value is printed.</p>\n<p>For more amazing tech content, checkout our YouTube channel -- <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be Option 3. Final object would look like\n\n
js\n{\n  name: \"Yomesh\",\n  __proto__: {\n    name: \"Saloni\",\n    channel: \"https://bit.ly/devtools-yt\"\n  }\n}\n
\n\nWhile searching for property name, first look up would be on the direct enumerable properties of the object and since that exists (this.name = \"Yomesh\"), it would be printed. If no direct property is present then Prototype chain is traversed and in that case value would be Saloni. In case of channel property, Prototype chain is traversed and value is printed.\n\nFor more amazing tech content, checkout our YouTube channel -- https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output of the following code snippet? [ES6 Classes]",
        "question": "
js\r\nfunction parseData(data) {\r\n  /* Some computation */\r\n  return data;\r\n};\r\n\r\nclass User {\r\n  constructor(name, data) {\r\n    const parsedData = parseData(data);\r\n\r\n    this.name = name;\r\n    this.data = parsedData;\r\n\r\n    return parsedData;\r\n  }\r\n\r\n  getData() {\r\n    return this.data;\r\n  }\r\n}\r\n\r\nconst yomesh = new User('Yomesh', {\r\n  youtubeChannel: 'https://bit.ly/devtools-yt',\r\n  shouldSubscribe: true\r\n});\r\n\r\n// What would be the output of the following statement?\r\nconsole.log(yomesh.getData());\r\n
",
        "remarks": "<p>Answer would be <code>Option 3 -- Error</code> because <code>Class</code> in JavaScript is (mostly) just syntactical sugar. The underlying working is same as the constructor function. Since, in the code snippet we are creating an instance, using the <code>new</code> operator, but returning a non-primitive value from the constructor so implicit <code>this</code> will be lost and instance won&#39;t have any <code>getData</code> method to call.</p>\n<p>To understand how <code>new</code> operator works, watch <a href=\"https://www.youtube.com/watch?v=1FkZwBpti0o\" target=\"_blank\">https://www.youtube.com/watch?v=1FkZwBpti0o</a>. The behaviour and concepts explained in the video applies to ES6 Classes also.</p>\n",
        "remarksMarkdown": "Answer would be Option 3 -- Error because Class in JavaScript is (mostly) just syntactical sugar. The underlying working is same as the constructor function. Since, in the code snippet we are creating an instance, using the new operator, but returning a non-primitive value from the constructor so implicit this will be lost and instance won't have any getData method to call.\r\n\r\nTo understand how new operator works, watch <a href=\"https://www.youtube.com/watch?v=1FkZwBpti0o\" target=\"_blank\">https://www.youtube.com/watch?v=1FkZwBpti0o</a>. The behaviour and concepts explained in the video applies to ES6 Classes also."
    },
    {
        "title": "How to implement the Increment function?"
    },
    {
        "title": "How do you implement the following code snippet? [Property Access Increment]"
    },
    {
        "title": "What would be the output? [New Operator | Explicit Primitive Return]",
        "question": "
js\nfunction Person(name) {\n  this.name = name;\n\n  function person() {\n    return {\n      name: 'Prithvi'\n    };\n  }\n\n  var person = {\n    name: 'Ajay'\n  };\n\n  var person = false;\n\n  return person;\n}\n\nvar yomesh = new Person('Yomesh');\nconsole.log(yomesh);\n
",
        "remarks": "<p>Answer would be <code>Option 6</code>. To know more, checkout -- <a href=\"https://www.youtube.com/watch?v=1FkZwBpti0o&amp;list=PL4ruoTJ8LTT83ayHmUe4bGz8HouruE9hK?ref=code-devtools-tech\">https://youtu.be/1FkZwBpti0o</a></p>\n",
        "remarksMarkdown": "Answer would be Option 6. To know more, checkout -- <a href=\"https://www.youtube.com/watch?v=1FkZwBpti0o&list=PL4ruoTJ8LTT83ayHmUe4bGz8HouruE9hK?ref=code-devtools-tech\">https://youtu.be/1FkZwBpti0o</a>"
    },
    {
        "title": "What would be the output? [New Operator | Explicit Non Primitive Return]",
        "question": "
js\nfunction Person(name) {\n  this.name = name;\n\n  var person = {\n    name: 'Ajay'\n  };\n\n  function person() {\n    return {\n      name: 'Prithvi'\n    };\n  }\n\n  return person;\n}\n\nvar yomesh = new Person('Yomesh');\nconsole.log(yomesh);\n
",
        "remarks": "<p>Answer would be <code>Option 4</code>. To know more, checkout -- <a href=\"https://www.youtube.com/watch?v=1FkZwBpti0o&amp;list=PL4ruoTJ8LTT83ayHmUe4bGz8HouruE9hK?ref=code-devtools-tech\">https://youtu.be/1FkZwBpti0o</a></p>\n",
        "remarksMarkdown": "Answer would be Option 4. To know more, checkout -- <a href=\"https://www.youtube.com/watch?v=1FkZwBpti0o&list=PL4ruoTJ8LTT83ayHmUe4bGz8HouruE9hK?ref=code-devtools-tech\">https://youtu.be/1FkZwBpti0o</a>"
    },
    {
        "title": "What would be the output? (Different ways of Prototype calls)",
        "question": "
js\nfunction Person(name) {\n  this.name = name;\n}\n\nPerson.prototype.sayName = function () {\n  console.log(this.name);\n}\n\nvar yomesh = new Person('yomesh');\n\nconsole.log(yomesh.sayName());\nconsole.log(Person.prototype.sayName());\nconsole.log(Object.getPrototypeOf(yomesh).sayName());\nconsole.log(yomesh.__proto__.sayName());\n
",
        "remarks": "<p>Answer would be <code>Option 2</code> because in the first case <code>this === yomesh</code> and in rest of the cases <code>this === Person.prototype</code> during invocation.  </p>\n",
        "remarksMarkdown": "Answer would be Option 2 because in the first case this === yomesh and in rest of the cases this === Person.prototype during invocation.  "
    },
    {
        "title": "What do you think would be the output? [HTML Collection | NodeList]",
        "question": "Suppose we have the following HTML structure.\n\n
html\n<div>Hello World</div>\n<div>How are you?</div>\n
\n\nWhat would be the output if we run the following code snippet?\n\n
js\nvar divs = document.getElementsByTagName(\"div\");\n\nfor ( var i = 0; i<divs.length; i++ ) {\n\tdivs[i].appendChild(document.createElement(\"div\"));\n}\n\nconsole.log(divs.length);\n
",
        "remarks": "<p>This would lead to an infinite loop as <code>document.getElementsByClassName()</code> is an <code>HTMLCollection</code> and is live.</p>\n<p>Checkout the following for more clarity -- <a href=\"https://stackoverflow.com/questions/28163033/when-is-nodelist-live-and-when-is-it-static#:~:text=An%20HTMLCollection%20is%20a%20list,the%20underlying%20document%20is%20changed\">https://stackoverflow.com/questions/28163033/when-is-nodelist-live-and-when-is-it-static#:~:text=An%20HTMLCollection%20is%20a%20list,the%20underlying%20document%20is%20changed</a>.</p>\n<p>Visit: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a> for more amazing programming tutorials.</p>\n",
        "remarksMarkdown": "This would lead to an infinite loop as document.getElementsByClassName() is an HTMLCollection and is live.\n\nCheckout the following for more clarity -- https://stackoverflow.com/questions/28163033/when-is-nodelist-live-and-when-is-it-static#:~:text=An%20HTMLCollection%20is%20a%20list,the%20underlying%20document%20is%20changed.\n\nVisit: https://bit.ly/devtools-yt for more amazing programming tutorials."
    },
    {
        "title": "Explain how \"this\" works in JavaScript?",
        "question": "Explain how this works in JavaScript and how value of \"this\" is resolved?\n\n> Use this question to formulate your thoughts and write them down below to practice how are you going to answer in a real world interview.",
        "remarks": "<p>There&#39;s no simple explanation for <code>this</code>; it is one of the most confusing concepts in JavaScript. The value of <code>this</code> depends on how the function is called. Some general rule of thumb are following:</p>\n<ol>\n<li>If the <code>new</code> keyword is used when calling the function, this inside the function is a brand new object.</li>\n<li>If <code>apply</code>, <code>call</code>, or <code>bind</code> are used to call/create a function, <code>this</code> inside the function is the object that is passed in as the argument.</li>\n<li>If a function is called as a method, such as <code>obj.method()</code>  — <code> this</code> is the object that the function is a property of.</li>\n<li>If a function is invoked as a free function invocation, meaning it was invoked without any of the conditions present above, <code>this</code> is the global object. In a browser, it is the <code>window</code> object. If in strict mode (&#39;use strict&#39;), this will be <code>undefined</code> instead of the <code>global object</code>.</li>\n<li>If multiple of the above rules apply, the rule that is higher wins and will set the this value.</li>\n<li>If the function is an ES2015 arrow function, it ignores all the rules above and receives the <code>this</code> value of its surrounding scope at the time it is created.</li>\n</ol>\n<p>Read more here -- <a href=\"https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3/?ref=code-devtools-tech\" target=\"_blank\">https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3/</a></p>\n",
        "remarksMarkdown": "There's no simple explanation for this; it is one of the most confusing concepts in JavaScript. The value of this depends on how the function is called. Some general rule of thumb are following:\n\n1. If the new keyword is used when calling the function, this inside the function is a brand new object.\n2. If apply, call, or bind are used to call/create a function, this inside the function is the object that is passed in as the argument.\n3. If a function is called as a method, such as obj.method()  —  this is the object that the function is a property of.\n4. If a function is invoked as a free function invocation, meaning it was invoked without any of the conditions present above, this is the global object. In a browser, it is the window object. If in strict mode ('use strict'), this will be undefined instead of the global object.\n5. If multiple of the above rules apply, the rule that is higher wins and will set the this value.\n6. If the function is an ES2015 arrow function, it ignores all the rules above and receives the this value of its surrounding scope at the time it is created.\n\nRead more here -- <a href=\"https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3/?ref=code-devtools-tech\" target=\"_blank\">https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3/</a>"
    },
    {
        "title": "What will be the output of the following code snippet? (in operator)",
        "question": "
js\nconst first = 2 in [1, 2];\nconst second = '2' in [0, 1, 2];\n\nconsole.log(first, second);\n
",
        "remarks": "<p>The <strong><code>in</code></strong> operator returns <code>true</code> if the specified property is in the specified object or its prototype chain. Also remember, property names are strings!</p>\n<p>Read more here: <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in\">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in</a></p>\n",
        "remarksMarkdown": "The **in** operator returns true if the specified property is in the specified object or its prototype chain. Also remember, property names are strings!\n\nRead more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in"
    },
    {
        "title": "What is the output of the following? (Exotic Array Objects JavaScript)",
        "question": "
js\nlet items = [];\n\nitems[null] = \"foo\";\nconsole.log(items.length);\nitems[100] = \"bar\";\nconsole.log(items.length);\n
",
        "remarks": "<p>Arrays are exotic objects in JavaScript and they behave differently than ordinary objects. To know more about this behavior, checkout: <a href=\"https://www.youtube.com/watch?v=-5Nmn68xxSU\">https://www.youtube.com/watch?v=-5Nmn68xxSU</a></p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Arrays are exotic objects in JavaScript and they behave differently than ordinary objects. To know more about this behavior, checkout: https://www.youtube.com/watch?v=-5Nmn68xxSU\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "Switch Statement Output",
        "question": "What is the output?\n\n
js\nconst a = \"1\";\n\nswitch (+a) {\n  case \"1\":\n    console.log(\"🍕\");\n    break;\n  case 1:\n    console.log(\"🚀\");\n    break;\n  default:\n    console.log(\"👻\");\n}\n
",
        "remarks": "<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "For useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "Difference between Defer and Async keywords?",
        "question": "What are the differences between the keyword async and defer?\n\n
html\n<p>Hello World</p>\n\n<script type=\"text/javascript\" src=\"/script2.js\" async></script>\n<script type=\"text/javascript\" src=\"/script1.js\" defer></script>\n<script type=\"text/javascript\" src=\"/script3.js\" defer></script>\n<script type=\"text/javascript\" src=\"/script4.js\" async></script>\n
",
        "remarks": "<p>Learn here: <a href=\"https://medium.com/@puneetahuja_23950/script-tag-defer-and-async-2aa3cc82e5cb\">https://medium.com/@puneetahuja_23950/script-tag-defer-and-async-2aa3cc82e5cb</a></p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Learn here: https://medium.com/@puneetahuja_23950/script-tag-defer-and-async-2aa3cc82e5cb\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output of the following code snippet? (Prototype method invocation)",
        "question": "
js\nfunction Person(name) {\n  this.name = name;\n}\nPerson.prototype.getName = () => {\n  return this.name;\n};\nconst yomesh = new Person('Yomesh');\nconsole.log(yomesh.getName());\n
",
        "remarks": "<p>Answer would be <code>Option 2</code> because the snippet above is using an arrow function for <code>getName</code>. Arrow functions cannot create a context and therefore <code>this</code> will be the global object in non-strict mode.</p>\n",
        "remarksMarkdown": "Answer would be Option 2 because the snippet above is using an arrow function for getName. Arrow functions cannot create a context and therefore this will be the global object in non-strict mode."
    },
    {
        "title": "What would be the output? (Array sum problem)",
        "question": "
js\nfunction sum(first, ...middle, last) {\n  return first + middle.reduce((acc, num) => acc + num, 0) + last;\n}\n\nconsole.log(sum(1, 2, 3, 4, 5));\n
",
        "remarks": "<p>Answer would be <code>Option 4</code> because the above code snippet will throw an error <code>Uncaught SyntaxError: Rest parameter must be last formal parameter</code> i.e. Rest parameter should always be the last parameter in function definition as it combines all the remaining arguments into an array.</p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be Option 4 because the above code snippet will throw an error Uncaught SyntaxError: Rest parameter must be last formal parameter i.e. Rest parameter should always be the last parameter in function definition as it combines all the remaining arguments into an array.\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output? (Based on setTimeout)",
        "question": "
js\nfunction sayName() {\n  setTimeout(() => {\n    console.log(this.name);\n  }, 1000);\n}\nsayName.call({\n  name: 'Yomesh'\n});\n
",
        "remarks": "<p>Answer would be <code>Option 3</code> because we are passing an arrow function to the <code>setTimeout</code>. Arrow functions retains the scope of their definition. Hence, when the arrow function will be called then context will be same as <code>sayName</code> function.</p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be Option 3 because we are passing an arrow function to the setTimeout. Arrow functions retains the scope of their definition. Hence, when the arrow function will be called then context will be same as sayName function.\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "Would the output be the same for the following code snippet?",
        "question": "
js\nvar nums1 = [1, 2, 3, 4];\nvar squared1 = nums1.map(x => x * x);\n\nvar nums2 = new Array(4);\nnums2 = nums2.map((x, i) => i + 1);\nvar squared2 = nums2.map(x => x * x);\n\nconsole.log(squared1, squared2);\n\n
\n\nOutput of the both arrays would be the same? As in  [1, 4, 9, 16]?",
        "remarks": "<p>Output of both the arrays would be not be the same.</p>\n<pre><code class=\"language-js\">squared1 array - [1, 4, 9, 16]\nsquared2 array - [empty x 4]\n</code></pre>\n<p>When we create an array using the Array constructor providing the length of the array as argument then it returns empty slots as array elements. Function like map, forEach checks if the property/key exists on the array and then only invokes the passed callback. Hence, we will get the value of <code>squared2</code> as <code>[empty x 4]</code>.</p>\n<p>To fix this, we either copy the array or use <code>.fill</code>.</p>\n<pre><code class=\"language-js\">var nums2 = new Array(4);\nnums2 = [...nums2];\n\nor\n\nvar nums2 = new Array(4).fill(0);\n</code></pre>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Output of both the arrays would be not be the same.\n\n
js\nsquared1 array - [1, 4, 9, 16]\nsquared2 array - [empty x 4]\n
\n\nWhen we create an array using the Array constructor providing the length of the array as argument then it returns empty slots as array elements. Function like map, forEach checks if the property/key exists on the array and then only invokes the passed callback. Hence, we will get the value of squared2 as [empty x 4].\n\nTo fix this, we either copy the array or use .fill.\n\n
js\nvar nums2 = new Array(4);\nnums2 = [...nums2];\n\nor\n\nvar nums2 = new Array(4).fill(0);\n
 \n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output? (Based on Temporal Dead Zone)",
        "question": "
js\nvar firstname = computeName();\n\nlet name = \"Yomesh\";\n\nfunction computeName() {\n  return `${name} Gupta`;\n}\n\nconsole.log(firstname);\n
",
        "remarks": "<p>Answer would be Option 3 i.e. <code>Uncaught ReferenceError: name is not defined</code> as in the line no. 1 <code>computeName()</code> call jumps control flow to the execution of the function which tries to access the variable <code>name</code> which is still in the Temporal Dead Zone. Hence, it is not accessible. </p>\n<p>To know more, visit -- <a href=\"https://medium.com/@yomesh.gupta/understanding-temporal-dead-zone-in-javascript-53a735a682\">https://medium.com/@yomesh.gupta/understanding-temporal-dead-zone-in-javascript-53a735a682</a></p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be Option 3 i.e. Uncaught ReferenceError: name is not defined as in the line no. 1 computeName() call jumps control flow to the execution of the function which tries to access the variable name which is still in the Temporal Dead Zone. Hence, it is not accessible. \n\nTo know more, visit -- <a href=\"https://medium.com/@yomesh.gupta/understanding-temporal-dead-zone-in-javascript-53a735a682\" rel=\"noopener\">https://medium.com/@yomesh.gupta/understanding-temporal-dead-zone-in-javascript-53a735a682</a>\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output? (Based on Array prototype forEach)",
        "question": "
js\nvar first = [1, , 3];\n\nvar second = [...first];\n\nfirst.forEach((value, index) => {\n  console.log(index, value);\n});\n\nsecond.forEach((value, index) => {\n  console.log(index, value);\n});\n
",
        "remarks": "<p>The answer would be <code>Option 1</code> because the length of the first array would be <code>3</code>. <code>first</code> is a sparse array i.e. array with empty slots in between. The indices in sparse array itself doesn&#39;t exist rather than having <code>undefined</code> as value.</p>\n<pre><code class=\"language-js\">console.log(first.length); // 3\n\nfirst[0] -- 1\nfirst[1] -- empty slot\nfirst[2] -- 3\n\nSince the array is just an object then its representation would be\n// first\n{\n    &quot;0&quot;: 1,\n    &quot;2&quot;: 3\n}\n</code></pre>\n<p>Now, when we use the spread operator to create a copy then it will iterate over the array as in <code>i: 0 to n - 1</code> and set the value <code>second[i] = first[i]</code>. Since, when we access empty slots in an array then the returned value would be <code>undefined</code>, therefore, <code>second[1]</code> would be <code>undefined</code>. By spreading, we just created a dense array.</p>\n<pre><code class=\"language-js\">// second\n{\n    &quot;0&quot;: 1,\n    &quot;1&quot;: undefined,\n    &quot;2&quot;: 3\n}\n</code></pre>\n<p><code>Array.prototype.forEach</code> iterates over the array and check if the indices exist in the array. If yes, then only callback will be invoked with index &amp; value as arguments.</p>\n<p>To know more --</p>\n<p><a href=\"https://github.com/v8/v8/blob/ca6e40d7ba853319c15196fef3f4536c8b3929fe/src/js/array.js#L1059\" target=\"_blank\">https://github.com/v8/v8/blob/ca6e40d7ba853319c15196fef3f4536c8b3929fe/src/js/array.js#L1059</a></p>\n<p><a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach\" target=\"_blank\">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach</a></p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "The answer would be Option 1 because the length of the first array would be 3. first is a sparse array i.e. array with empty slots in between. The indices in sparse array itself doesn't exist rather than having undefined as value.\n\n
js\nconsole.log(first.length); // 3\n\nfirst[0] -- 1\nfirst[1] -- empty slot\nfirst[2] -- 3\n\nSince the array is just an object then its representation would be\n// first\n{\n    \"0\": 1,\n    \"2\": 3\n}\n
\n\nNow, when we use the spread operator to create a copy then it will iterate over the array as in i: 0 to n - 1 and set the value second[i] = first[i]. Since, when we access empty slots in an array then the returned value would be undefined, therefore, second[1] would be undefined. By spreading, we just created a dense array.\n\n
js\n// second\n{\n    \"0\": 1,\n    \"1\": undefined,\n    \"2\": 3\n}\n
\n\nArray.prototype.forEach iterates over the array and check if the indices exist in the array. If yes, then only callback will be invoked with index & value as arguments.\n\nTo know more --\n\n<a href=\"https://github.com/v8/v8/blob/ca6e40d7ba853319c15196fef3f4536c8b3929fe/src/js/array.js#L1059\" target=\"_blank\" rel=\"noreferrer\">https://github.com/v8/v8/blob/ca6e40d7ba853319c15196fef3f4536c8b3929fe/src/js/array.js#L1059</a>\n\n<a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach\" target=\"_blank\" rel=\"noreferrer\">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach</a>\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt\n"
    },
    {
        "title": "What will be the output for the following question in browser ?",
        "question": "
js\nclass Pandav {\n  constructor(name, weapon) {\n    this.name = name\n    this.weapon = weapon\n  }\n}\nclass Kaurav {\n  constructor(name, weapon) {\n    this.name = name\n    this.weapon = weapon\n  }\n}\nclass Guru {\n  constructor(name, weapon) {\n    this.name = name\n  }\n}\n\nvar Duryodhana = new Kaurav('Duryodhana', 'Gada')\nlet Arjuna = new Pandav('Arjuna', 'Gandiva')\nconst Dronacharya = new Guru('Dronacharya')\nconsole.log(\n  Arjuna.weapon,\n  window.Arjuna,\n  Duryodhana.weapon,\n  window.Duryodhana,\n  Dronacharya.name,\n  window.Dronacharya\n)\n
\n",
        "remarks": "<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "For useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What will be the output for the following?",
        "question": "
js\r\nfunction kidsLove(x) {\r\n  console.log(x);\r\n}\r\n[\"JavaScript\",\"Python\"].forEach(num=>kidsLove(num));\r\n\r\nconst menLove=function(x) {\r\n  console.log(x);\r\n};\r\n[\"C++\",\"Java\"].forEach(num=>menLove(num));\r\n\r\nconst legendsLove = (x) => {\r\n  console.log(x);\r\n};\r\n[\"01010\"].forEach(num=>legendsLove(num));\r\n
",
        "remarks": "<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "For useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output of the following code snippet? | Promise Based Output Question | Part Three",
        "question": "
js\r\nfunction processing() {\r\n  return new Promise((resolve, reject) => {\r\n    resolve(1);\r\n    reject(\"Failed\");\r\n    resolve(2);\r\n    console.log(\"After resolve/reject\");\r\n  });\r\n}\r\n\r\nfunction init() {\r\n  processing()\r\n    .then((v) => console.log(v + 1))\r\n    .catch((err) => console.log(err));\r\n}\r\n\r\ninit();\r\n
",
        "remarks": "<p>Answer would be <code>Option 3</code> because <code>resolve</code> and <code>reject</code> doesn&#39;t work like <code>return</code>. Even if they are called, the function completes its execution. Hence, <code>console.log</code> will be called even though <code>resolve/reject</code> is already invoked before and <code>.then callback</code> will be called after that. Yes, <code>resolve/reject</code> will be called once as per order of invocation.</p>\n<p>P.S. There is an exception and we will discuss that in further questions.</p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be Option 3 because resolve and reject doesn't work like return. Even if they are called, the function completes its execution. Hence, console.log will be called even though resolve/reject is already invoked before and .then callback will be called after that. Yes, resolve/reject will be called once as per order of invocation.\r\n\r\nP.S. There is an exception and we will discuss that in further questions.\r\n\r\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output of the following code snippet? | Promise Based Output Question | Part Two",
        "question": "
js\r\nfunction processing() {\r\n  return new Promise((resolve, reject) => {\r\n    resolve(1);\r\n    reject(\"Failed\");\r\n    resolve(2);\r\n  });\r\n}\r\n\r\nfunction init() {\r\n  processing()\r\n    .then((v) => console.log(v + 1))\r\n    .catch((err) => console.log(err));\r\n}\r\n\r\ninit();\r\n
",
        "remarks": "<p>Answer would be <code>Option 4: 2</code> because the <code>resolve</code> or <code>reject</code> only execute once in the order they are called. No matter if there is a <code>reject</code> after <code>resolve</code> or vice versa it won&#39;t be executed.</p>\n",
        "remarksMarkdown": "Answer would be Option 4: 2 because the resolve or reject only execute once in the order they are called. No matter if there is a reject after resolve or vice versa it won't be executed."
    },
    {
        "title": "What will be the output of the following code snippet? (Based on setTimeout) | JavaScript Quiz",
        "question": "
js\r\nfor (var i = 0; i < 5; i++) {\r\n  setTimeout(function () {\r\n    console.log(i);\r\n  }, 10);\r\n}\r\n
",
        "remarks": "<p>The answer would be <code>Option 2: 55555</code> because </p>\n<ol>\n<li><code>var i</code> in the loop will be defined in outer scope which is equal to</li>\n</ol>\n<pre><code class=\"language-js\">var i;\nfor (i = 0; i &amp;lt; 5; i++) { ... }\n</code></pre>\n<ol>\n<li>Loop will run from <code>0</code> to <code>4</code> but will break when <code>i</code> will be <code>5</code>.</li>\n<li><code>setTimeout</code> will schedule 5 callbacks which will run after at least 10 secs. </li>\n<li>Since, <code>i</code> is defined in the outer scope, its value will be overwritten on each iteration and final value will be <code>5</code>.</li>\n<li>When callbacks are executed, they will get the final value of <code>i</code> i.e. <code>5</code>.</li>\n</ol>\n<p>To capture each value of <code>i</code> in the respective callbacks, there are two popular solutions to the question.</p>\n<ol>\n<li>Changing <code>var</code> to <code>let</code> which we redeclare <code>i</code> on every iteration.</li>\n</ol>\n<pre><code class=\"language-js\">for (let i = 0; i &amp;lt; 5; i++) {\n    setTimeout(function() {\n        console.log(i);\n    }, 10);\n}\n</code></pre>\n<ol start=\"2\">\n<li>Returning an inner function and using closures.</li>\n</ol>\n<pre><code class=\"language-js\">for (var i = 0; i &amp;lt; 5; i++) {\n    setTimeout(function(i) {\n        return function() { console.log(i); }\n    }(i), 10);\n}\n</code></pre>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n<h2 id=\"recommended-resources\">Recommended Resources</h2>\n<ul>\n<li><a href=\"https://devtools.tech/lists/s/top-javascript-array-interview-questions-or-problem-solving-or-array-polyfills---lid---bzcbM8FDmAP0tCcJhKfe\">Top JavaScript Array Interview Questions | Problem Solving | Array Polyfills</a></li>\n<li><a href=\"https://devtools.tech/lists/s/top-javascript-multiple-choice-questions-mcq-with-answers-or-frontend-interview-questions-or-beginner-friendly---lid---C60esU0GU7dK78qyvCUw\">Top JavaScript Multiple Choice Questions (MCQ) with Answers | Frontend Interview Questions | Beginner Friendly</a></li>\n<li><a href=\"https://devtools.tech/questions/s/build-an-autocomplete-using-reactjs-or-type-one-or-frontend-coding-challenge-or-javascript-interview-question---qid---wIsJwxPV1Ka0GdmTIXQX\">Build an Autocomplete using React.js | Type One | Frontend Coding Challenge | JavaScript Interview Question</a></li>\n<li><a href=\"https://devtools.tech/questions/s/how-to-build-a-password-strength-checker-in-react-js-or-frontend-interview-question-or-javascript---qid---tQR3mRIXsSK1tDfCliYj\">How to build a Password Strength Checker in React.js | Frontend Interview Question | JavaScript</a></li>\n<li><a href=\"https://devtools.tech/questions/s/implement-accordion-component-in-reactjs-or-javascript-interview-question---qid---3pRN4mOqn69FJ94mrh1A\">Implement Accordion Component in React.js | JavaScript Interview Question</a></li>\n<li><a href=\"https://devtools.tech/questions/s/build-a-custom-timer-hook-in-reactjs---qid---H5KlkIeowa1LrIn1mSN5\">Build a custom timer hook in React.js?</a></li>\n<li><a href=\"https://devtools.tech/questions/s/how-would-you-implement-createstore-function-from-redux---qid---gDe2UTYeJi0ptBXfuLXL\">How would you implement createStore function from Redux?</a></li>\n</ul>\n",
        "remarksMarkdown": "The answer would be Option 2: 55555 because \r\n\r\n1. var i in the loop will be defined in outer scope which is equal to\r\n\r\n
js\r\nvar i;\r\nfor (i = 0; i < 5; i++) { ... }\r\n
\r\n\r\n1. Loop will run from 0 to 4 but will break when i will be 5.\r\n2. setTimeout will schedule 5 callbacks which will run after at least 10 secs. \r\n3. Since, i is defined in the outer scope, its value will be overwritten on each iteration and final value will be 5.\r\n4. When callbacks are executed, they will get the final value of i i.e. 5.\r\n\r\nTo capture each value of i in the respective callbacks, there are two popular solutions to the question.\r\n\r\n1. Changing var to let which we redeclare i on every iteration.\r\n\r\n
js\r\nfor (let i = 0; i < 5; i++) {\r\n\tsetTimeout(function() {\r\n\t\tconsole.log(i);\r\n\t}, 10);\r\n}\r\n
  \r\n\r\n2. Returning an inner function and using closures.\r\n\r\n
js\r\nfor (var i = 0; i < 5; i++) {\r\n\tsetTimeout(function(i) {\r\n\t\treturn function() { console.log(i); }\r\n\t}(i), 10);\r\n}\r\n
\r\n\r\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt\r\n\r\n## Recommended Resources\r\n\r\n- Top JavaScript Array Interview Questions | Problem Solving | Array Polyfills\r\n- Top JavaScript Multiple Choice Questions (MCQ) with Answers | Frontend Interview Questions | Beginner Friendly\r\n- Build an Autocomplete using React.js | Type One | Frontend Coding Challenge | JavaScript Interview Question\r\n- How to build a Password Strength Checker in React.js | Frontend Interview Question | JavaScript\r\n- Implement Accordion Component in React.js | JavaScript Interview Question\r\n- Build a custom timer hook in React.js?\r\n- How would you implement createStore function from Redux?\r\n"
    },
    {
        "title": "What will be the output for the following question (Copying in JavaScript)?",
        "question": "
js\nlet saiyan = {\n  name: \"Vegeta\",\n  chiBlasts: {\n    low: \"Big bang attack\",\n    med: \"Gallic gun\",\n    high: \"Final flash\",\n  },\n};\n\nlet anotherSaiyan = { ...saiyan };\nanotherSaiyan.name = \"Goku\";\nanotherSaiyan.chiBlasts.high = \"Spirit Bomb\";\n\nlet sonOfSaiyan = Object.assign({}, saiyan);\nsonOfSaiyan.name = \"Trunks\";\nsonOfSaiyan.chiBlasts.high = \"Finish Buster\";\n\nlet sonOfAnotherSaiyan = JSON.parse(JSON.stringify(anotherSaiyan));\nsonOfAnotherSaiyan.name = \"Gohan\";\nsonOfAnotherSaiyan.chiBlasts.high = \"Kamehameha\";\n\nconsole.log(\n  saiyan.name,\n  anotherSaiyan.name,\n  sonOfSaiyan.name,\n  sonOfAnotherSaiyan.name\n);\nconsole.log(\n  saiyan.chiBlasts.high,\n  anotherSaiyan.chiBlasts.high,\n  sonOfSaiyan.chiBlasts.high,\n  sonOfAnotherSaiyan.chiBlasts.high\n);\n
\n",
        "remarks": "<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "For useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What is the time complexity of the following code snippet?",
        "question": "
js\nfunction findIntersection(first, second) {\n  const firstSet = new Set(first);\n\n  return second.reduce((acc, current) => {\n    return firstSet.has(current) ? [...acc, current] : acc;\n  }, []);\n}\n\nfunction init() {\n  const first = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n  const second = [1, 2, 3, 4, 5];\n  console.log(findIntersection(first, second));\n}\n
",
        "remarks": "<p>Answer would be <code>Option 2 --  O(n^2)</code> because</p>\n<pre><code class=\"language-js\">// loops n times i.e. O(n)\nreturn second.reduce((acc, current) =&amp;gt; {\n    // spread operator operation would be O(n) every time\n    return firstSet.has(current) ? [...acc, current] : acc;\n}, []);\n</code></pre>\n<p>Hence, overall time complexity would be <code>O(n^2)</code>.</p>\n<p>P.S. This is not the best way to find intersection and approach can be improved so please do not use this code anywhere. Code is written in a certain way to test logic.</p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be Option 2 --  O(n^2) because\n\n
js\n// loops n times i.e. O(n)\nreturn second.reduce((acc, current) => {\n    // spread operator operation would be O(n) every time\n\treturn firstSet.has(current) ? [...acc, current] : acc;\n}, []);\n
\n\nHence, overall time complexity would be O(n^2).\n\nP.S. This is not the best way to find intersection and approach can be improved so please do not use this code anywhere. Code is written in a certain way to test logic.\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What is the output of the following code?",
        "question": "let num = 0;\n\n async function increment() {\n    num +=  await 2;\n    console.log(num);\n}\n\nincrement();\nnum += 1;\n\nconsole.log(num);",
        "remarks": "<p>The output is 1, 2 because </p>\n<p>when the function <code>increment()</code> is executed and await keyword is found in an async function, then whatever statement is after await starts acting as a Promise resolve, therefore the execution pauses over-there and moves to the line below <code>increment()</code> call. \nThereby executing \n<code>num += 1;\nconsole.log(num);</code> and logging 1.</p>\n<p>When the call stack becomes empty the control returns back to await 2 and now the statement over there is\n<code>num = num + 2</code> the 2nd num over here still being 0, so 0 + 2 = 2.\nTherefore 2 gets logged.</p>\n",
        "remarksMarkdown": "The output is 1, 2 because \n\nwhen the function increment() is executed and await keyword is found in an async function, then whatever statement is after await starts acting as a Promise resolve, therefore the execution pauses over-there and moves to the line below increment() call. \nThereby executing \nnum += 1;\nconsole.log(num); and logging 1.\n\nWhen the call stack becomes empty the control returns back to await 2 and now the statement over there is\nnum = num + 2 the 2nd num over here still being 0, so 0 + 2 = 2.\nTherefore 2 gets logged.\n"
    },
    {
        "title": "What is the output of the following code?",
        "question": "
js\r\nconsole.log(\"a\");\r\n\r\nsetTimeout(() => {\r\n\tconsole.log(\"b\");\r\n}, 1);\r\n\r\nsetTimeout(() => {\r\n\tconsole.log(\"c\");\r\n}, 10);\r\n\r\nsetTimeout(() => {\r\n\tconsole.log(\"d\");\r\n}, 0);\r\n\r\nconsole.log(\"e\");\r\n\r\n
\r\nCredits - Steve Griffith\r\n",
        "remarks": "<h2 id=\"code\">Code</h2>\n<pre><code class=\"language-js\">console.log(&quot;a&quot;);\n\nsetTimeout(() =&amp;gt; console.log(&quot;b&quot;), 1);\nsetTimeout(() =&amp;gt; console.log(&quot;c&quot;), 10);\nsetTimeout(() =&amp;gt; console.log(&quot;d&quot;), 0);\n\nconsole.log(&quot;e&quot;);\n</code></pre>\n<h2 id=\"execution-flow\">Execution Flow</h2>\n<ol>\n<li><p><strong>Synchronous phase</strong></p>\n<ul>\n<li><p><code>&quot;a&quot;</code> prints immediately.</p>\n</li>\n<li><p><code>setTimeout</code> calls schedule their callbacks in the <strong>timer queue</strong>.</p>\n</li>\n<li><p><code>&quot;e&quot;</code> prints immediately.</p>\n<p>👉 Output so far:</p>\n<pre><code class=\"language-js\">a\ne\n</code></pre>\n</li>\n</ul>\n</li>\n<li><p><strong>Timers phase</strong></p>\n<ul>\n<li>Both <code>b</code> (1ms) and <code>d</code> (0ms) are eligible on the next tick.</li>\n<li>Timers are not guaranteed to run at <em>exact</em> ms — they just run <strong>after the minimum delay</strong> and when the call stack is clear.</li>\n<li>Among timers ready at the same time, <strong>execution order follows registration order</strong>.</li>\n<li>So: <code>b</code> runs, then <code>d</code>.</li>\n</ul>\n</li>\n<li><p><strong>Later timer</strong></p>\n<ul>\n<li>After ~10ms, <code>c</code> runs.</li>\n</ul>\n</li>\n</ol>\n<h2 id=\"final-output\">Final Output</h2>\n<pre><code>a\ne\nb\nd\nc\n</code></pre>\n<h2 id=\"key-takeaways-interview-points\">Key Takeaways (interview points)</h2>\n<ul>\n<li><code>setTimeout(fn, 0)</code> does <strong>not</strong> run immediately; it queues <code>fn</code> for the next event-loop tick.</li>\n<li>Timers with very small delays (0ms, 1ms, etc.) usually fire together, in the order they were scheduled.</li>\n<li>Event loop ensures synchronous code finishes first, then queued tasks run.</li>\n</ul>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://youtube.com/devtoolstech\" target=\"_blank\">https://youtube.com/devtoolstech</a></p>\n",
        "remarksMarkdown": "## Code\r\n\r\n
js\r\nconsole.log(\"a\");\r\n\r\nsetTimeout(() => console.log(\"b\"), 1);\r\nsetTimeout(() => console.log(\"c\"), 10);\r\nsetTimeout(() => console.log(\"d\"), 0);\r\n\r\nconsole.log(\"e\");\r\n
\r\n\r\n## Execution Flow\r\n\r\n1. **Synchronous phase**\r\n\r\n   * \"a\" prints immediately.\r\n   * setTimeout calls schedule their callbacks in the **timer queue**.\r\n   * \"e\" prints immediately.\r\n \r\n    👉 Output so far:\r\n   
js\r\n   a\r\n   e\r\n
\r\n\r\n2. **Timers phase**\r\n\r\n   * Both b (1ms) and d (0ms) are eligible on the next tick.\r\n   * Timers are not guaranteed to run at *exact* ms — they just run **after the minimum delay** and when the call stack is clear.\r\n   * Among timers ready at the same time, **execution order follows registration order**.\r\n   * So: b runs, then d.\r\n\r\n3. **Later timer**\r\n\r\n   * After \\~10ms, c runs.\r\n\r\n\r\n## Final Output\r\n\r\n
\r\na\r\ne\r\nb\r\nd\r\nc\r\n
\r\n\r\n## Key Takeaways (interview points)\r\n\r\n* setTimeout(fn, 0) does **not** run immediately; it queues fn for the next event-loop tick.\r\n* Timers with very small delays (0ms, 1ms, etc.) usually fire together, in the order they were scheduled.\r\n* Event loop ensures synchronous code finishes first, then queued tasks run.\r\n\r\nFor useful and amazing **frontend and programming tutorials**: <a href=\"https://youtube.com/devtoolstech\" target=\"_blank\">https://youtube.com/devtoolstech</a>"
    },
    {
        "title": "What should be the output of below code?",
        "question": "const address = Object.seal({\n\tstreet: \"Sector 45\",\n\tcity: \"Gurgaon\",\n});\n\nconst person = {\n\tname: \"Puneet\",\n\taddress,\n};\n\nObject.freeze(person);\n\nObject.seal(person);\n\nperson.name = \"Ahuja\";\nperson.address.city = \"Noida\";\n\nconsole.log(person.name);\nconsole.log(person.address.city);\n",
        "remarks": "",
        "remarksMarkdown": ""
    },
    {
        "title": "What would be the output of the following snippet? (Based on Arithmetic operators)",
        "question": "
js\nlet x = 1;\n\ndo {\n  let y = --x;\n  console.log(x++ + --y);\n} while (x++ < 5);\n
",
        "remarks": "<p>Answer would be option 1. Let us dry run it.</p>\n<p>Iteration 1:</p>\n<pre><code class=\"language-js\">--- x = 1 ---\ny = --x; // y = 0 and x = 0\nconsole.log(x++ + --y) // (0 + (-1)) = -1, and x = 1 now\nwhile(x++ &amp;lt; 5) // (1 &amp;lt; 5) is true, and x = 2 now\n</code></pre>\n<p>Next Iteration:</p>\n<pre><code class=\"language-js\">--- x = 2 ---\ny = --x; // y = 1 and x = 1\nconsole.log(x++ + --y) // (1 + 0) = 1, and x = 2 now\nwhile(x++ &amp;lt; 5) // (2 &amp;lt; 5) is true, and x = 3 now\n</code></pre>\n<p>Next Iteration:</p>\n<pre><code class=\"language-js\">--- x = 3 ---\ny = --x; // y = 2 and x = 2\nconsole.log(x++ + --y) // (2 + 1) = 3, and x = 3 now\nwhile(x++ &amp;lt; 5) // (3 &amp;lt; 5) is true, and x = 4 now\n</code></pre>\n<p>Next Iteration:</p>\n<pre><code class=\"language-js\">--- x = 4 ---\ny = --x; // y = 3 and x = 3\nconsole.log(x++ + --y) // (3 + 2) = 5, and x = 4 now\nwhile(x++ &amp;lt; 5) // (4 &amp;lt; 5) is true, and x = 5 now\n</code></pre>\n<p>Next Iteration:</p>\n<pre><code class=\"language-js\">--- x = 5 ---\ny = --x; // y = 4 and x = 4\nconsole.log(x++ + --y) // (4 + 3) = 7, and x = 5 now\nwhile(x++ &amp;lt; 5) // (5 &amp;lt; 5) is false, and loop breaks\n</code></pre>\n<pre><code>Answer: -1 1 3 5 7\n</code></pre>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be option 1. Let us dry run it.\n\nIteration 1:\n
js\n--- x = 1 ---\ny = --x; // y = 0 and x = 0\nconsole.log(x++ + --y) // (0 + (-1)) = -1, and x = 1 now\nwhile(x++ < 5) // (1 < 5) is true, and x = 2 now\n
 \n\nNext Iteration:\n
js\n--- x = 2 ---\ny = --x; // y = 1 and x = 1\nconsole.log(x++ + --y) // (1 + 0) = 1, and x = 2 now\nwhile(x++ < 5) // (2 < 5) is true, and x = 3 now\n
 \n\nNext Iteration:\n
js\n--- x = 3 ---\ny = --x; // y = 2 and x = 2\nconsole.log(x++ + --y) // (2 + 1) = 3, and x = 3 now\nwhile(x++ < 5) // (3 < 5) is true, and x = 4 now\n
 \n\nNext Iteration:\n
js\n--- x = 4 ---\ny = --x; // y = 3 and x = 3\nconsole.log(x++ + --y) // (3 + 2) = 5, and x = 4 now\nwhile(x++ < 5) // (4 < 5) is true, and x = 5 now\n
 \n\nNext Iteration:\n
js\n--- x = 5 ---\ny = --x; // y = 4 and x = 4\nconsole.log(x++ + --y) // (4 + 3) = 7, and x = 5 now\nwhile(x++ < 5) // (5 < 5) is false, and loop breaks\n
 \n\n
\nAnswer: -1 1 3 5 7\n
\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output of the following? (Based on IIFE in JS)",
        "question": "
js\n(function () {\n  var first = second = 5;\n})();\n\nconsole.log(second);\n
",
        "remarks": "<p>The answer would be 5 even though it seems as if the variable was declared within a function and can&#39;t be accessed outside of it. This is because</p>\n<pre><code class=\"language-js\">var first = second = 5;\n</code></pre>\n<p>is interpreted the following way:</p>\n<pre><code class=\"language-js\">var first = second;\nsecond = 5;\n</code></pre>\n<p>But <code>second</code> is not declared anywhere in the function with <code>var</code> so it is set equal to <code>5</code> in the global scope.</p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "The answer would be 5 even though it seems as if the variable was declared within a function and can't be accessed outside of it. This is because\n\n
js\nvar first = second = 5;\n
\n\nis interpreted the following way:\n\n
js\nvar first = second;\nsecond = 5;\n
\n\nBut second is not declared anywhere in the function with var so it is set equal to 5 in the global scope.\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What will be the output for below in the browser?",
        "question": "
js\n\"use strict\";\n\nlet foo = {\n  barX: function () {\n    console.log(this);\n  },\n  barY: () => {\n    console.log(this);\n  },\n};\n\nlet barX = foo.barX;\nlet barY = foo.barY;\n\nfoo.barX(); // Output1?\nfoo.barY(); // Output2?\nbarX(); // Output3?\nbarY(); // Output4?\n
\n",
        "remarks": "<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "For useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "Output question based on the delete operator in JavaScript",
        "question": "
js\nvar person = \"Yomesh\";\n\nvar deletePerson = () => {\n  delete person;\n  return person;\n};\n\nconsole.log(deletePerson());\n
",
        "remarks": "<p>We can&#39;t delete a <code>local variable</code> that has been declared with <code>var</code>/<code>let</code>/<code>const</code>.</p>\n<p>We can only delete properties of objects. This also includes global variables which are implicit properties of the window object. As per the <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete\" target=\"_blank\">MDN</a> --</p>\n<p>&gt; The JavaScript delete operator removes a property from an object </p>\n<p>If we change the code to the following then delete will work.</p>\n<pre><code class=\"language-js\">window.person = &quot;Yomesh&quot;;\n\nvar deletePerson = () =&amp;gt; {\n  delete window.person;\n  return window.person;\n};\n\nconsole.log(deletePerson()); // undefined\n</code></pre>\n<p>To read more -- <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete\" target=\"_blank\">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete</a></p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n<p>P.S. - Do not forget to share this question with others! :D</p>\n",
        "remarksMarkdown": "We can't delete a local variable that has been declared with var/let/const.\n\nWe can only delete properties of objects. This also includes global variables which are implicit properties of the window object. As per the <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete\" target=\"_blank\" rel=\"noopener\">MDN</a> --\n\n> The JavaScript delete operator removes a property from an object \n\nIf we change the code to the following then delete will work.\n\n
js\nwindow.person = \"Yomesh\";\n\nvar deletePerson = () => {\n  delete window.person;\n  return window.person;\n};\n\nconsole.log(deletePerson()); // undefined\n
\n\nTo read more -- <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete\" target=\"_blank\" rel=\"noopener\">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete</a>\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt\n\nP.S. - Do not forget to share this question with others! :D"
    },
    {
        "title": "Output question based on CSS Pseudo Classes",
        "question": "Consider a huge list of <p> elements. Using CSS select every 2nd element starting from the 3rd element\n\n
html\n<div>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  <p>Para</p>\n  ...\n</div>\n",
        "remarks": "<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "For useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "Nodejs Event Loop",
        "question": "
js\nfunction performNextTick() {\n  process.nextTick(() => {\n    console.log(\"Inside nextTick | outside setTimeout\");\n    setTimeout(() => {\n      console.log(\"Inside nextTick | Inside setTimeout\");\n      process.exit();\n    }, 0);\n  });\n}\n\nsetInterval(() => {\n  console.log(\"setInterval\");\n}, 0);\n\nperformNextTick();\n
\n",
        "remarks": "<p><a href=\"https://www.linkedin.com/feed/update/urn:li:activity:6664781708208025600/\">https://www.linkedin.com/feed/update/urn:li:activity:6664781708208025600/</a></p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "https://www.linkedin.com/feed/update/urn:li:activity:6664781708208025600/\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output? (String Reversal)",
        "question": "
js\nfunction reverse(string) {\n  let i;\n  let temp;\n  const limit = parseInt(string.length / 2, 10);\n\n  for (i = 0; i < limit; i++) {\n    temp = string[i];\n    string[i] = string[string.length - i - 1];\n    string[string.length - i - 1] = temp;\n  }\n\n  return string;\n}\n\nconst reversed = reverse(\"hello\");\nconsole.log(reversed);\n\n
",
        "remarks": "<p>Strings are immutable in JavaScript. Hence, even if we try to overwrite it but original value will never be lost. In order to reverse using this method, we need to convert string into an array first.</p>\n<pre><code class=\"language-js\">function reverse(str) {\n  let i;\n  let temp;\n  const string = str.split(&quot;&quot;);\n  const limit = parseInt(string.length / 2, 10);\n\n  for (i = 0; i &amp;lt; limit; i++) {\n    temp = string[i];\n    string[i] = string[string.length - i - 1];\n    string[string.length - i - 1] = temp;\n  }\n\n  return string;\n}\n\nconst reversed = reverse(&quot;hello&quot;);\nconsole.log(reversed);\n</code></pre>\n<p>P.S. This is not the only way to reverse a string. There are multiple ways to do it.</p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Strings are immutable in JavaScript. Hence, even if we try to overwrite it but original value will never be lost. In order to reverse using this method, we need to convert string into an array first.\n\n
js\nfunction reverse(str) {\n  let i;\n  let temp;\n  const string = str.split(\"\");\n  const limit = parseInt(string.length / 2, 10);\n\n  for (i = 0; i < limit; i++) {\n    temp = string[i];\n    string[i] = string[string.length - i - 1];\n    string[string.length - i - 1] = temp;\n  }\n\n  return string;\n}\n\nconst reversed = reverse(\"hello\");\nconsole.log(reversed);\n
\n\nP.S. This is not the only way to reverse a string. There are multiple ways to do it.\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output on the button click? (Event Handling)",
        "question": "
html\n<div id=\"grandfather\">\n  <div id=\"father\">\n    <!-- What would be the output in the console if the following button#child is clicked -->\n    <button id=\"child\">Click Me</button>\n  </div>\n</div>\n\n<script type=\"text/javascript\">\n  function bindEvent(id) {\n    document\n      .getElementById(id)\n      .addEventListener(\n        \"click\",\n        (e) => console.log(e.target.getAttribute(\"id\")),\n        true\n      );\n  }\n  \n  bindEvent(\"grandfather\");\n  bindEvent(\"father\");\n  bindEvent(\"child\");\n</script>\n
",
        "remarks": "<p>Output would always be <code>child</code> because <code>event.target</code> is a reference to the object onto which the event was dispatched. To get the current HTML Element whose handler is being executed, use the property <code>event.currentTarget</code>.  </p>\n<p>Further resources:</p>\n<p><a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Event/target\" target=\"_blank\">https://developer.mozilla.org/en-US/docs/Web/API/Event/target</a></p>\n<p><a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget\" target=\"_blank\">https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget</a></p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Output would always be `child` because `event.target` is a reference to the object onto which the event was dispatched. To get the current HTML Element whose handler is being executed, use the property `event.currentTarget`.  \n\nFurther resources:\n\n<a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Event/target\" target=\"_blank\" rel=\"noopener\">https://developer.mozilla.org/en-US/docs/Web/API/Event/target</a>\n\n<a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget\" target=\"_blank\" rel=\"noopener\">https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget</a>\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output?",
        "question": "
js\nconst first = 6;\nconst second = \"6\";\nconst third = first + second;\nconst fourth = first - second;\nconst fifth = third + first * first;\nconst sixth = fourth + second * second;\n\nconsole.log(\"Fifth is --\", fifth, typeof fifth);\nconsole.log(\"Sixth is --\", sixth, typeof sixth);\n
",
        "remarks": "<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "For useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output of the following code snippet?",
        "question": "
js\nvar x = 1;\n\nfor (; x < 6; x += 2) {\n  x = x * x;\n}\n\nconsole.log(x);\n
",
        "remarks": "<p>In the above code snippet, <code>x = 1</code> initially and it follows the following steps afterwards</p>\n<ol>\n<li>Check against the limit (6)</li>\n<li>Assign <code>x</code> the new value</li>\n<li>Increment <code>x</code> with <code>2</code></li>\n<li>Repeat</li>\n</ol>\n<pre><code>First iteration [x = 1] :\n\nStep 1 -- 1 &amp;lt; 6 -- true\nStep 2 -- x = 1 * 1 -- 1\nStep 3 -- x += 2 -- 1 += 2 -- 3\n\nSecond iteration [x = 3]:\n\nStep 1 -- 3 &amp;lt; 6 -- true\nStep 2 -- x = 3 * 3 -- 9\nStep 3 -- x += 2 -- 9 += 2 -- 11\n\nThird iteration [x = 11]:\n\nStep 1 -- 11 &amp;lt; 6 -- false\n\nSo, loop breaks now and 11 will be the final value of x\n</code></pre>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "In the above code snippet, `x = 1` initially and it follows the following steps afterwards\n\n1. Check against the limit (6)\n2. Assign `x` the new value\n3. Increment `x` with `2`\n4. Repeat\n\n
\nFirst iteration [x = 1] :\n\nStep 1 -- 1 < 6 -- true\nStep 2 -- x = 1 * 1 -- 1\nStep 3 -- x += 2 -- 1 += 2 -- 3\n\nSecond iteration [x = 3]:\n\nStep 1 -- 3 < 6 -- true\nStep 2 -- x = 3 * 3 -- 9\nStep 3 -- x += 2 -- 9 += 2 -- 11\n\nThird iteration [x = 11]:\n\nStep 1 -- 11 < 6 -- false\n\nSo, loop breaks now and 11 will be the final value of x\n
\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output? [React.js]",
        "question": " What would be the output when we click on \"Add items\" button?\n\n
js\nclass App extends React.Component {\n  state = {\n    items: [],\n  };\n\n  handleClick = () => {\n    const { items } = this.state;\n    this.setState({\n      items: [...items, \"apple\"],\n    });\n    this.setState({\n      items: [...items, \"orange\"],\n    });\n    this.setState({\n      items: [...items, \"mango\"],\n    });\n    this.setState({\n      items: [...items, \"peach\"],\n    });\n  };\n\n  render() {\n    const { items } = this.state;\n    return (\n      <div className=\"App\">\n        {\" \"}\n        {items.length ? (\n          <h2> Items are {JSON.stringify(items)} </h2>\n        ) : (\n          <React.Fragment>\n            <p> No items found </p>{\" \"}\n            <button onClick={this.handleClick}> Add items </button>\n          </React.Fragment>\n        )}{\" \"}\n      </div>\n    );\n  }\n}\n\n
",
        "remarks": "<p>In React version &lt; 17, it understands the execution context (important to note) and batches the <code>setState</code> calls as per that. No matter how many successive <code>setState</code> calls we make in a React event handler, it will only produce a single re-render at the end of the event and reflects the state accordingly.</p>\n<p>To know more, checkout -- <a href=\"https://devtools.tech/understanding-react-setstate/?ref=code-45ffQ8\" target=\"_blank\">https://devtools.tech/understanding-react-setstate/</a></p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "In React version < 17, it understands the execution context (important to note) and batches the `setState` calls as per that. No matter how many successive `setState` calls we make in a React event handler, it will only produce a single re-render at the end of the event and reflects the state accordingly.\n\nTo know more, checkout -- <a href=\"https://devtools.tech/understanding-react-setstate/?ref=code-45ffQ8\" target=\"_blank\" rel=”noopener”>https://devtools.tech/understanding-react-setstate/</a>\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What is the output of the following code snippt? | JavaScript Output Based Question | JavaScript Variable Destructing",
        "question": "
js\r\nvar person = {};\r\n\r\n({\r\n  name: person[\"username\"]\r\n} = {\r\n  username: \"yomeshgupta\",\r\n  email: \"team@devtools.tech\",\r\n  name: \"yomesh\",\r\n});\r\n\r\nconsole.log(person.username, person.name);\r\n
",
        "remarks": "<p>This is sort of an outlier question that I have seen in the whole Frontend Interview process. Many people might even term it is as <strong>poorly written code</strong> and it is true in some sense. You can&#39;t tell what exactly is the intention of the code owner and what is the logic. Since, I have seen this/similar question being asked so here it is.</p>\n<p>Basic crux of this question is that we are de-structuring the <code>name</code> property from the right-hand side object and aliasing it with <code>person.username</code>. Since, <code>person</code> already exists, key-value is set on that object. It won&#39;t work if we remove the <code>( ... )</code> brackets <code>{ name: person[&#39;name&#39;]</code> has no variable declaration. Within brackets, it is executed as an expression. </p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "This is sort of an outlier question that I have seen in the whole Frontend Interview process. Many people might even term it is as **poorly written code** and it is true in some sense. You can't tell what exactly is the intention of the code owner and what is the logic. Since, I have seen this/similar question being asked so here it is.\r\n\r\nBasic crux of this question is that we are de-structuring the `name` property from the right-hand side object and aliasing it with `person.username`. Since, `person` already exists, key-value is set on that object. It won't work if we remove the `( ... )` brackets `{ name: person['name']` has no variable declaration. Within brackets, it is executed as an expression. \r\n\r\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What will be the width of the element?",
        "question": "Consider a div with class container and the following CSS styling. What will be the width of the element?\n\n
css\n.container {\n  width: 100px;\n  height: 100px;\n  padding: 30px;\n  border: 30px solid lightblue;\n  margin: 30px;\n}\n
",
        "remarks": "<p>The width of our elment using the standard box model will actually be <code>220px</code> (100 + 30 + 30 + 30 + 30), as the padding and border are added to the width used for the content box.</p>\n<p><code>Total width of the element = Width + Padding + Border</code></p>\n<p>There is another box model called <strong>Alternative Box Model</strong>. Using this model, any width is the width of the visible box on the page, therefore the content area width is that width minus the width for the padding and border. The following CSS would give the result <code>width = 100px</code>.</p>\n<pre><code class=\"language-css\">.container { \n  box-sizing: border-box; \n}\n</code></pre>\n<p>To read more, visit: <a href=\"https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model\" target=\"_blank\">https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model</a>.</p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "The width of our elment using the standard box model will actually be `220px` (100 + 30 + 30 + 30 + 30), as the padding and border are added to the width used for the content box.\n\n`Total width of the element = Width + Padding + Border`\n\nThere is another box model called **Alternative Box Model**. Using this model, any width is the width of the visible box on the page, therefore the content area width is that width minus the width for the padding and border. The following CSS would give the result `width = 100px`.\n\n
css\n.container { \n  box-sizing: border-box; \n}\n
\n\nTo read more, visit: <a href=\"https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model\" target=\"_blank\" rel=\"noopener\">https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model</a>.\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What would be the output of the following code snippet? | Promise Based Output Question | Part One",
        "question": " This is the first question from a series of questions based on Promise functionality.\r\n\r\n
js\r\nfunction init() {\r\n  throw new Error(\"I am an error\");\r\n  return Promise.resolve(1);\r\n}\r\n\r\ninit()\r\n  .then((v) => console.log(v + 1))\r\n  .catch((err) => console.log(\"Error caught -- \", err));\r\n
",
        "remarks": "<p><code>Option 3</code> would be the right answer because errors are caught by the catch block only when there are part of the promise chain. In the current code snippet, error thrown at line no. 2 is outside the promise chain as the chain is initiated at line no 3. If it would have been like --</p>\n<pre><code class=\"language-js\">function first() {\n  return Promise.resolve(1);\n}\n\nfunction init() {\n  return first()\n    .then(v =&amp;gt; {\n      throw new Error(&quot;I am an error&quot;);\n    })\n    .catch((err) =&amp;gt; console.log(&quot;Error caught -- &quot;, err));\n}\n\ninit();\n</code></pre>\n<p>Then output would be &quot;Error caught -- I am an error&quot; because we throwing an error from a function which is part of the promise chain. </p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "`Option 3` would be the right answer because errors are caught by the catch block only when there are part of the promise chain. In the current code snippet, error thrown at line no. 2 is outside the promise chain as the chain is initiated at line no 3. If it would have been like --\r\n\r\n
js\r\nfunction first() {\r\n  return Promise.resolve(1);\r\n}\r\n\r\nfunction init() {\r\n  return first()\r\n    .then(v => {\r\n      throw new Error(\"I am an error\");\r\n    })\r\n    .catch((err) => console.log(\"Error caught -- \", err));\r\n}\r\n\r\ninit();\r\n
\r\n\r\nThen output would be \"Error caught -- I am an error\" because we throwing an error from a function which is part of the promise chain. \r\n\r\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "Array Comparison Output Question",
        "question": "
js\nfunction compare(input) {\n  return !!(input == 1 || input == 2 || input == 3);\n}\n\nconsole.log(compare(0));\nconsole.log(compare(1));\nconsole.log(compare(2));\nconsole.log(compare(3));\nconsole.log(compare(4));\nconsole.log(compare([1]));\nconsole.log(compare([2]));\nconsole.log(compare([3]));\n
",
        "remarks": "<p>Answer would be <code>Option 1</code> as when we use <code>==</code> then it implicitly type cast operands.Therefore, <code>[1]</code> will become <code>&quot;1&quot;</code> and then <code>1</code>. Similarly, for all arrays type casting will take place.</p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Answer would be `Option 1` as when we use `==` then it implicitly type cast operands.Therefore, `[1]` will become `\"1\"` and then `1`. Similarly, for all arrays type casting will take place.\n\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "What is the output of the following code snippet? | JavaScript Output Based Question | JS Variables",
        "question": "
js\r\nfunction compute() {\r\n  const condition = true;\r\n  if (condition) {\r\n    let a = false;\r\n    let b = false;\r\n  }\r\n  return {\r\n    a: a || null,\r\n    b: b || null\r\n  }\r\n}\r\nvar r = compute();\r\n// What do you think would be the output?\r\nconsole.log(r);\r\n
",
        "remarks": "<p>Variables <code>a</code> and <code>b</code> are blocked scope. They do not exist outside the if condition. If we try to use them then it would be an error as those variables are undeclared in that scope.</p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Variables `a` and `b` are blocked scope. They do not exist outside the if condition. If we try to use them then it would be an error as those variables are undeclared in that scope.\r\n\r\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    },
    {
        "title": "How to implement your own version of .bind method? | JavaScript Interview Question | Bind Polyfill"
    },
    {
        "title": "How to implement lodash groupBy functionality? | JavaScript Interview Question | Frontend Problem Solving"
    },
    {
        "title": "JS Constructor via New Keyword ",
        "question": "
js\nfunction Person() {\n  this.name = \"Yomesh\";\n  return this;\n}\n\nvar person = new Person();\nconsole.log(person.name); // Output 1?\n\nfunction Car() {\n  this.name = \"BMW\";\n  return this.name;\n}\n\nvar car = new Car();\nconsole.log(car.name); // Output 2?\n\nfunction Animal() {\n  var animals = [];\n  animals.push(\"tiger\");\n  animals.alive = true;\n  return animals;\n}\n\nvar animals = new Animal();\nconsole.log(animals.alive, Array.isArray(animals), animals[0] === \"tiger\"); // Output 3?\n\nfunction Rocket() {\n  var rocket = () => {\n    console.log(\"I am an rocket\");\n  };\n  this.engines = 4;\n  return rocket;\n}\n\nvar rocket = new Rocket();\nrocket(); // Is there going to be an error? Output 4?\nconsole.log(rocket.engines); // Output 5?\n\nfunction Company() {\n  this.name = \"OLX\";\n  return {};\n}\n\nvar company = new Company();\nconsole.log(company.name); // Output 6?\n
\n",
        "remarks": "<p>To know how this is working under the hood, check out: <a href=\"https://www.youtube.com/watch?v=1FkZwBpti0o\">https://www.youtube.com/watch?v=1FkZwBpti0o</a></p>\n",
        "remarksMarkdown": "To know how this is working under the hood, check out: https://www.youtube.com/watch?v=1FkZwBpti0o"
    },
    {
        "title": "What is the output of the following code snippet? | JavaScript Bind Output Based Questions",
        "question": "
js\r\nvar foo = 1;\r\nvar change = () => {\r\n  this.foo = 2;\r\n  console.log(this.foo);\r\n};\r\nvar obj = {\r\n  foo: 3\r\n};\r\nvar bounded = change.bind(obj);\r\n\r\n// What would be the output of the following?\r\nconsole.log(foo);\r\nconsole.log(change());\r\nconsole.log(foo);\r\nconsole.log(obj.foo);\r\nconsole.log(bounded());\r\n
",
        "remarks": "<p>Arrow functions always take up the definition scope, not the calling scope. Therefore, <code>.bind</code> doesn&#39;t work with them. </p>\n<p>For useful and amazing <strong>frontend and programming tutorials</strong>: <a href=\"https://bit.ly/devtools-yt\">https://bit.ly/devtools-yt</a></p>\n",
        "remarksMarkdown": "Arrow functions always take up the definition scope, not the calling scope. Therefore, `.bind` doesn't work with them. \r\n\r\nFor useful and amazing **frontend and programming tutorials**: https://bit.ly/devtools-yt"
    }
]