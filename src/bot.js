import ChatEngineCore from 'chat-engine';
import typingIndicator from 'chat-engine-typing-indicator';
import util from './util';

export default (ChatEngineHumanClient, bot, chatBotURL) => {
  // Create a ChatEngine instance for the ChatBot to correspond from
  // by using the same connection info as the human's ChatEngine connection.
  const ChatEngineBotClient = ChatEngineCore.create({
    publishKey: ChatEngineHumanClient.pnConfig.publishKey,
    subscribeKey: ChatEngineHumanClient.pnConfig.subscribeKey,
  }, {
    globalChannel: ChatEngineHumanClient.global.channel,
  });

  // Connect Stephen ChatBot's Client
  ChatEngineBotClient.connect(bot.uuid, {
    name: bot.name,
    uuid: bot.uuid,
  });

  ChatEngineBotClient.on('$.ready', function(data) {
    // Make a ChatEngine Chat Object of Stephen ChatBot
    let stephenBot = new ChatEngineBotClient.Chat(bot.chatKey, true);

    // Add the Typing Indicator ChatEngine plugin to this 1:1 chat.
    stephenBot.plugin(typingIndicator({
        timeout: 2000,
    }));

    stephenBot.on('$.connected', () => {
      stephenBot.on('message', (payload) => {
        // When the human sends Stephen ChatBot a message,
        // make a reply by passing the message to Amazon Lex.
        if (payload.sender.uuid !== bot.uuid) {
          stephenBot.typingIndicator.startTyping();

          util.post(chatBotURL, {
            body: {
              data: {
                lex: {
                  botAlias: 'StephenChatEngineExample',
                  botName: 'StephenChatEngineExample',
                  contentType: 'text/plain; charset=utf-8',
                  inputText: payload.data.text,
                  userId: 'ChatEngineVueDemo',
                },
              },
            },
          }).then((res) => {
            stephenBot.typingIndicator.stopTyping();
            // ChatEngine publish Stephen ChatBot's reply made by Lex.
            stephenBot.emit('message', {
              text: res.lex_text,
            });
          });
        }
      });
    });
  });
};
