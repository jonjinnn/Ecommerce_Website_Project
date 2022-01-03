import React, { Component } from "react";
import PhoneDataService from "../services/phone.service";
import { Link } from "react-router-dom";
import "./phones-list.component.css"

export default class PhonesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchModel = this.onChangeSearchModel.bind(this);

    //temp
    this.onChangeSearchCategory = this.onChangeSearchCategory.bind(this);
    this.onChangeSearchPrice = this.onChangeSearchPrice.bind(this);
    // end temp

    this.retrievePhones = this.retrievePhones.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePhone = this.setActivePhone.bind(this);
    this.removeAllPhones = this.removeAllPhones.bind(this);
    this.searchModel = this.searchModel.bind(this);

    //temp
    this.searchCategory = this.searchCategory.bind(this); // temp
    this.searchPrice = this.searchPrice.bind(this); // temp
    // end temp

    this.state = {
      phones: [],
      currentPhone: null,
      currentIndex: -1,
      searchModel: "",
      searchCategory: "", // temp
      searchPrice: "", // temp
    };
  }

  componentDidMount() {
    this.retrievePhones();
  }

  onChangeSearchModel(e) {
    const searchModel = e.target.value;

    this.setState({
      searchModel: searchModel,
      searchCategory: "",
      searchPrice: ""
    });
  }

  // temp
  onChangeSearchCategory(e) {
    const searchCategory = e.target.value

    this.setState({
      searchCategory: searchCategory,
      searchModel: "",
      searchPrice: ""
    });
  }

  onChangeSearchPrice(e) {
    const searchPrice = e.target.value

    this.setState({
      searchPrice: searchPrice,
      searchModel: "",
      searchCategory: ""
    });
  }
  // end temp

  retrievePhones() {
    PhoneDataService.getAll()
      .then(response => {
        this.setState({
          phones: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePhones();
    this.setState({
      currentPhone: null,
      currentIndex: -1
    });
  }

  setActivePhone(phone, index) {
    this.setState({
      currentPhone: phone,
      currentIndex: index
    });
  }

  removeAllPhones() {
    PhoneDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchModel() {
    this.setState({
      currentPhone: null,
      currentIndex: -1
    });

    PhoneDataService.findByModel(this.state.searchModel)
      .then(response => {
        this.setState({
          phones: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // temp
  searchCategory() {
    this.setState({
      currentPhone: null,
      currentIndex: -1
    });

    PhoneDataService.findByCategory(this.state.searchCategory)
        .then(response => {
          this.setState({
            phones: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  searchPrice() {
    this.setState({
      currentPhone: null,
      currentIndex: -1
    });

    PhoneDataService.findByPrice(this.state.searchPrice)
        .then(response => {
          this.setState({
            phones: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }
  // end temp

  render() {
    const { searchCategory, searchPrice, searchModel, phones, currentPhone, currentIndex } = this.state;

    return (
      <div id="border-box" className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Model"
              value={searchModel}
              onChange={this.onChangeSearchModel}
            />

            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchModel}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by Category"
                value={searchCategory}
                onChange={this.onChangeSearchCategory}
            />

            <div className="input-group-append">
              <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchCategory}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by Price"
                value={searchPrice}
                onChange={this.onChangeSearchPrice}
            />

            <div className="input-group-append">
              <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchPrice}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Phones List</h4>

          <ol class="a" className="list-group">
            {phones &&
              phones.map((phone, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePhone(phone, index)}
                  key={index}
                >
                  {phone.model}
                </li>
              ))}
          </ol>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPhones}
          >
            Remove All
          </button>
        </div>

        <div className="col-md-6">
          {currentPhone ? (
            <div>
              <h4>Phone</h4>
              <div>
                <label>
                  <strong>Model:</strong>
                </label>{" "}
                {currentPhone.model}
              </div>

              <div>
                <label>
                  <strong>Color:</strong>
                </label>{" "}
                {currentPhone.color}
              </div>

              <div>
                <label>
                  <strong>Memory:</strong>
                </label>{" "}
                {currentPhone.memory}
              </div>

              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentPhone.price}
              </div>

              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPhone.description}
              </div>

              <div>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {currentPhone.category}
              </div>

              <div>
                <label>
                  <strong>Image Url:</strong>
                </label>{" "}
                {currentPhone.image_url}
              </div>

              <div>
                <label>
                  <strong>Number of units available:</strong>
                </label>{" "}
                {currentPhone.numUnits}
              </div>

              <Link
                to={"/phones/" + currentPhone.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p id="click-message">Please click on a Phone...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
