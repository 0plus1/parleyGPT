const sendMessage = async (api: any, text: string, parentMessageId: string = null) => {
  if (!parentMessageId) {
    const res = await api.sendMessage(text);
    return res;
  }
  const res = await api.sendMessage(text, {
    parentMessageId
  });
  return res;
};

export default sendMessage;