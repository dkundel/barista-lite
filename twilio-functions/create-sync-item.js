// Create a Twilio function and configure trigger it in Twilio Studio.
// Expects two parameters passed:
// - order: The actual order
// - phoneNumber: The phone number who sent the order
exports.handler = function(context, event, callback) {
  const ORDER_LIST = 'orders';
  const SERVICE_SID = context.SERVICE_SID || 'enter Sync Service Sid';

  const orderData = {
    order: event.order,
    phoneNumber: event.phoneNumber,
    status: 'open'
  };

  // Create a sync list item for the order
  const twilioClient = context.getTwilioClient();
  twilioClient.sync
    .services(SERVICE_SID)
    .syncLists(ORDER_LIST)
    .syncListItems.create({ data: orderData })
    .then(x => {
      callback(null, undefined);
    })
    .catch(err => callback(err));
};
