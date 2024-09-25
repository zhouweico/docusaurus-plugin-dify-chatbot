module.exports = function (context, options) {
  const {
    token,
    baseUrl,
    isDev,
    draggable,
    dragAxis,
    containerProps,
    inputs,
    bubbleButtonStyle,
  } = options;

  return {
    name: 'dify-chatbot-plugin',
    injectHtml: true,
    injectHtml: (html) => {
      const embedCode = `
        <script>
          window.difyChatbotConfig = {
            token: '${token}',
            isDev: ${isDev || false},
            baseUrl: '${baseUrl || (isDev ? 'https://dev.udify.app' : 'https://udify.app')}',
            containerProps: ${JSON.stringify(containerProps || {})},
            draggable: ${draggable || false},
            dragAxis: '${dragAxis || 'both'}',
            inputs: ${JSON.stringify(inputs || {})}
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

      return html.replace(
        '</body>',
        `${embedCode}</body>`
      );
    },
  };
};
