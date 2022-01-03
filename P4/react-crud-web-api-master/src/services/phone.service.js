import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/phones");
  }

  get(id) {
    return http.get(`/phones/${id}`);
  }

  create(data) {
    return http.post("/phones", data);
  }

  update(id, data) {
    return http.put(`/phones/${id}`, data);
  }

  delete(id) {
    return http.delete(`/phones/${id}`);
  }

  deleteAll() {
    return http.delete(`/phones`);
  }

  findByModel(model) {
    return http.get(`/phones?model=${model}`);
  }

  // temp
  findByCategory(category) {
    return http.get(`/phones?category=${category}`);
  }

  findByPrice(price) {
    return http.get(`/phones?price=${price}`);
  }
  // end temp
}

export default new TutorialDataService();