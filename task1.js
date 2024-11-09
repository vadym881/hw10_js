const notifications = [
  {
    source: "Facebook",
    text: "You have a new friend request",
    date: "2024-03-11",
  },
  {
    source: "Email",
    text: "Your order has been shipped",
    date: "2024-02-11",
  },
  {
    source: "Twitter",
    text: "New follower: @user123",
    date: "2024-03-11",
  },
];

for (const notification of notificationHandler(notifications)) {
  console.log(notification);
}

function notificationHandler(notifArray) {
  const notifObject = {};
  for (const notification of notifArray) {
    const { source, text, date } = notification;

    if (!notifObject[source]) {
      notifObject[source] = [];
    }
    notifObject[source].push({ text, date });
  }

  notifObject[Symbol.iterator] = function () {
    const currentValue = Object.keys(this)[0];
    let current = Object.keys(this).indexOf(currentValue);
    const lastValue = Object.keys(this).reverse()[0];
    const last = Object.keys(this).indexOf(lastValue);

    return {
      next() {
        if (current <= last) {
          return {
            value: Object.values(notifObject)[current++],
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  };

  return notifObject;
}
