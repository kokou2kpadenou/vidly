import http from "./httpService";

const customersURL = "customers";

function customerURL(customerId) {
  return `${customersURL}/${customerId}`;
}

export function getCustomers() {
  return http.get(customersURL);
}

export function deleteCustomer(customerId) {
  return http.delete(customerURL(customerId));
}

export function getCustomer(customerId) {
  return http.get(customerURL(customerId));
}

export function saveCustomer(customer) {
  // put if exist

  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(customerURL(customer._id), body);
  }
  // push if not exist
  return http.post(customersURL, customer);
}
