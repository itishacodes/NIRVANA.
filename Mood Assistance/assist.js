document.addEventListener("DOMContentLoaded", function () {
  const chatBody = document.querySelector(".chat-body");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const emotionButtons = document.querySelectorAll(".emotion");
  const quickReplyContainer = document.createElement("div");
  quickReplyContainer.className = "quick-replies";
  chatBody.appendChild(quickReplyContainer);

  let negativeEmotionCount = 0;

  // Function to add messages to the chat window
  function appendMessage(message, className, delay = 500) {
    const messageDiv = document.createElement("div");
    messageDiv.className = className;

    // Show typing indicator before bot messages
    if (className === "bot-message") {
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "typing-indicator";
      typingIndicator.textContent = "Mitr is typing...";
      chatBody.appendChild(typingIndicator);
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        chatBody.removeChild(typingIndicator);
        messageDiv.textContent = message;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, delay);
    } else {
      messageDiv.textContent = message;
      chatBody.appendChild(messageDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  // Start chat with greeting
  function startChat() {
    appendMessage(
      "🌟 Hello! I'm Mitr. How are you feeling today?",
      "bot-message",
      1000
    );
  }

  // Function to handle user input
  function handleUserInput() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, "user-message");
    userInput.value = "";
    processMessage(message.toLowerCase());
  }

  // Function to process user messages and respond
  function processMessage(message) {
    if (/happy|good|great|awesome/i.test(message)) {
      appendMessage(
        "That's wonderful! Keep smiling and spreading positivity! 😊",
        "bot-message"
      );
      showQuickReplies(["Share a quote", "Suggest a fun activity"]);
    } else if (/sad|down|depressed|miserable/i.test(message)) {
      negativeEmotionCount++;
      appendMessage(
        "I'm here for you. You're not alone. 💙 Want to talk more about it?",
        "bot-message"
      );
      showQuickReplies([
        "Motivate me",
        "Suggest an exercise",
        "Give me journaling tips",
      ]);
    } else if (/anxious|nervous|worried/i.test(message)) {
      negativeEmotionCount++;
      appendMessage(
        "Take a deep breath. Everything will be okay. Try some mindfulness exercises. 🌿",
        "bot-message"
      );
      showQuickReplies([
        "Suggest a relaxation technique",
        "Give me an inspiring quote",
      ]);
    } else if (/stressed|overwhelmed/i.test(message)) {
      negativeEmotionCount++;
      appendMessage(
        "That sounds tough. Try taking short breaks and being kind to yourself. 🧘‍♂️",
        "bot-message"
      );
      showQuickReplies(["Recommend a book", "Share a calming thought"]);
    } else if (/calm|relaxed/i.test(message)) {
      appendMessage(
        "That's great to hear! Keep up the peaceful vibes. 🌊",
        "bot-message"
      );
      showQuickReplies([
        "Give me a daily affirmation",
        "Suggest a wellness tip",
      ]);
    } else if (/motivate/i.test(message)) {
      appendMessage(getMotivationalQuote(), "bot-message");
    } else if (/suggest an exercise/i.test(message)) {
      appendMessage(getExerciseSuggestion(), "bot-message");
    } else if (/recommend a book/i.test(message)) {
      appendMessage(
        "📖 Try reading *The Power of Now* by Eckhart Tolle for mindfulness and peace.",
        "bot-message"
      );
    } else if (/share a quote/i.test(message)) {
      appendMessage(getMotivationalQuote(), "bot-message");
    } else if (/journaling|give me journaling tips/i.test(message)) {
      // ✅ FIXED CASE
      appendMessage(
        "Try writing down your thoughts for 5 minutes daily. It helps clear your mind! 📝",
        "bot-message"
      );
    } else {
      appendMessage("I'm here to listen. Tell me more. 💙", "bot-message");
    }

    if (negativeEmotionCount >= 3) {
      suggestSupportOptions();
    }
  }

  function sendMessage(option = null) {
    let inputField = document.getElementById("user-input");
    let chatBody = document.getElementById("chat-body");

    let userMessage = option || inputField.value.trim();
    if (userMessage === "") return;

    // Display user message
    let userMessageElement = document.createElement("div");
    userMessageElement.textContent = userMessage;
    userMessageElement.style.textAlign = "right";
    userMessageElement.style.margin = "5px";
    userMessageElement.style.padding = "8px";
    userMessageElement.style.background = "#cce5ff";
    userMessageElement.style.borderRadius = "8px";
    chatBody.appendChild(userMessageElement);

    let botResponse = getBotResponse(userMessage);

    // Display bot response
    setTimeout(() => {
      let botMessageElement = document.createElement("div");
      botMessageElement.textContent = botResponse;
      botMessageElement.style.textAlign = "left";
      botMessageElement.style.margin = "5px";
      botMessageElement.style.padding = "8px";
      botMessageElement.style.background = "#d4edda";
      botMessageElement.style.borderRadius = "8px";
      chatBody.appendChild(botMessageElement);
      chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to bottom
    }, 500);

    if (!option) inputField.value = ""; // Clear input field after sending
  }

  function getBotResponse(input) {
    let normalizedInput = input.trim().toLowerCase();

    switch (normalizedInput) {
      case "journaling":
      case "give me journaling tips":
        return "Try writing down your thoughts for 5 minutes daily. It helps clear your mind! 📝";
      case "exercise":
        return "Exercise releases endorphins and improves mood. Try yoga or a quick walk! 💪";
      case "meditation":
        return "Meditation helps reduce stress. Try 5-minute guided meditation sessions! 🧘‍♂️";
      case "talk to a friend":
        return "Socializing boosts mental health! Call a friend or meet up for coffee. ☕";
      case "breathing exercises":
        return "Try the 4-7-8 breathing technique: Inhale for 4 sec, hold for 7 sec, exhale for 8 sec. 🌬";
      case "self-care":
        return "Self-care is important! Take a warm bath, read a book, or listen to music. 🎶";
      default:
        return "I'm here to support you. Let me know what you need help with! 💙";
    }
  }

  function showQuickReplies(options) {
    quickReplyContainer.innerHTML = "";
    options.forEach((option) => {
      let button = document.createElement("button");
      button.textContent = option;
      button.className = "quick-reply";
      button.addEventListener("click", () => {
        processMessage(option.toLowerCase()); // ✅ Pass correct text
      });
      quickReplyContainer.appendChild(button);
    });
  }

  // Function to suggest support options if user feels down repeatedly
  function suggestSupportOptions() {
    appendMessage(
      "💙 It seems like you're feeling down a lot. Remember, talking to a close friend, journaling, or reading positive quotes can help. You are not alone!",
      "bot-message"
    );
    showQuickReplies([
      "Talk to a friend",
      "Start journaling",
      "Read positive quotes",
    ]);
    negativeEmotionCount = 0; // Reset count after suggestion
  }

  // Function to get a random motivational quote
  function getMotivationalQuote() {
    const quotes = [
      "🌟 'Believe you can and you're halfway there.' - Theodore Roosevelt",
      "💪 'You are stronger than you think.'",
      "💙 'Every storm runs out of rain. Keep going.'",
      "✨ 'Happiness can be found even in the darkest times, if one only remembers to turn on the light.'",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  // Function to get a random exercise suggestion
  function getExerciseSuggestion() {
    const exercises = [
      "🧘 Try deep breathing: Inhale for 4 seconds, hold for 4, exhale for 4.",
      "🚶‍♂️ Take a 10-minute walk outdoors to refresh your mind.",
      "🎵 Listen to calming music and close your eyes for a minute.",
      "📖 Write down three things you're grateful for today.",
    ];
    return exercises[Math.floor(Math.random() * exercises.length)];
  }

  // Event listener for send button
  sendButton.addEventListener("click", handleUserInput);

  // Event listener for Enter key
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleUserInput();
    }
  });

  // Event listeners for emotion buttons
  emotionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const emotion = button.textContent.trim();
      appendMessage(emotion, "user-message");
      processMessage(emotion.toLowerCase());
    });
  });
  const toggleButton = document.getElementById("dark-mode-toggle");

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Change button text dynamically
    if (document.body.classList.contains("dark-mode")) {
      toggleButton.innerHTML = "☀️ Light Mode";
    } else {
      toggleButton.innerHTML = "🌙 Dark Mode";
    }

    // Save preference to localStorage
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
  });

  // Check localStorage for saved preference
  window.onload = () => {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      toggleButton.innerHTML = "☀️ Light Mode";
    }
  };

  // Initialize chat
  startChat();
});
