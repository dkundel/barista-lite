// Create a Twilio function and configure it as webhook
exports.handler = function(context, event, callback) {
  // We are only interest in the item update events of the orders list
  // Exit early for other events
  if (
    event.EventType !== 'list_item_updated' ||
    event.ListUniqueName !== 'orders'
  ) {
    callback(null, undefined);
    return;
  }

  // Parse the data of the list item
  const { status, phoneNumber, order } = JSON.parse(event.ItemData);
  const orderNumber = event.ItemIndex;

  // If the status changed to anything that isn't
  // finished/cancelled we'll ignore it
  if (status !== 'finished' && status !== 'cancelled') {
    callback(null, undefined);
    return;
  }

  let message = `Your order #${orderNumber} for ${order} has been ${status}`;

  // Send an SMS to the person who ordered the coffee
  const twilioClient = context.getTwilioClient();
  twilioClient.messages
    .create({ from: context.PHONE_NUMBER, to: phoneNumber, body: message })
    .then(x => {
      // If the SMS was successfully sent, remove the item from the list
      return twilioClient.sync
        .services(event.ServiceSid)
        .syncLists(event.ListUniqueName)
        .syncListItems(orderNumber)
        .remove();
    })
    .then(x => {
      callback(null, undefined);
    })
    .catch(err => callback(err));
};
