export default function difyChatbotPlugin (context, options) {
  const {
    token,
    baseUrl,
    isDev = false,
    draggable = false,
    dragAxis = 'both',
    containerProps,
    inputs = {},
    bubbleButtonStyle,
  } = options;

  if (!token) {
    throw new Error('Token is required for the Dify Chatbot plugin.');
  }

  const embedCode = `
    <script>
      window.difyChatbotConfig = {
        token: '${token}',
        isDev: ${isDev},
        baseUrl: '${baseUrl || (isDev ? 'https://dev.udify.app' : 'https://udify.app')}',
        containerProps: ${JSON.stringify(containerProps || {})},
        draggable: ${draggable},
        dragAxis: '${dragAxis}',
        inputs: ${JSON.stringify(inputs)}
      };
    </script>
    <script
      src="https://udify.app/embed.min.js"
      id="${token}"
      defer>
    </script>
    <style>
      #dify-chatbot-bubble-button {
        ${bubbleButtonStyle || 'background-color: #1C64F2 !important;'} /* 使用配置项 */
      }
    </style>
  `;

  return {
    name: 'docusaurus-plugin-dify-chatbot',
    injectHtmlTags({content}) {
      return {
        postBodyTags: [`${embedCode}`],
      };
    },
  };
};
