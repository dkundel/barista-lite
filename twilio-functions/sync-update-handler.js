// Create a Twilio function and configure it as webhook
exports.handler = function(context, event, callback) {
  console.log(event);
  if (
    event.EventType !== 'list_item_updated' ||
    event.ListUniqueName !== 'orders'
  ) {
    callback(null, undefined);
    return;
  }

  const { status, phoneNumber, order } = JSON.parse(event.ItemData);
  const orderNumber = event.ItemIndex;

  if (status !== 'finished' && status !== 'cancelled') {
    callback(null, undefined);
    return;
  }

  let message = `Your order #${orderNumber} for ${order} has been ${status}`;

  const twilioClient = context.getTwilioClient();
  twilioClient.messages
    .create({ from: context.PHONE_NUMBER, to: phoneNumber, body: message })
    .then(x => {
      return twilioClient.sync
        .services(event.ServiceSid)
        .syncLists(event.ListUniqueName)
        .syncListItems(orderNumber)
        .remove();
    })
    .then(x => {
      callback(null, 'Sent');
    })
    .catch(err => callback(err));
};
