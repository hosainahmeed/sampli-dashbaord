export const getStatusColor = (paymentStatus) => {
  switch (paymentStatus) {
    case "Success":
      return "green";
    case "Pending":
      return "orange";
    default:
      return "red";
  }
};

export const transformOrders = (orders = []) =>
  orders.map((order) => ({
    key: order._id,
    name: order.items?.[0]?.product?.name || "Unnamed product",
    image:
      order.items?.[0]?.product?.images?.[0] ||
      "https://via.placeholder.com/40",
    length: order.items?.length || 0,
    date: new Date(order.createdAt).toLocaleDateString(),
    status: order.deliveryStatus || "Unknown",
    statusColor: getStatusColor(order.paymentStatus),
  }));
